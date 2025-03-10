const { Configuration, OpenAIApi } = require('openai');
import { Service, getServiceById } from '../config/services';
import dotenv from 'dotenv';
import { Response } from 'express';

dotenv.config();

// OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to process a service request (non-streaming)
export const processServiceRequest = async (
  serviceId: string,
  input: string,
  options: any = {}
): Promise<any> => {
  // Get service config
  const service = getServiceById(serviceId);
  
  if (!service) {
    throw new Error(`Service ${serviceId} not found`);
  }
  
  console.log(`Processing service request: ${serviceId}`);
  console.log(`Input (first 50 chars): "${input.substring(0, 50)}..."`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  
  // Check for mock responses in development mode
  if (process.env.NODE_ENV === 'development' && service.mockResponses && service.mockResponses[input]) {
    console.log(`Using mock response for service ${serviceId}`);
    return { 
      result: service.mockResponses[input],
      serviceType: service.type
    };
  }
  
  // Process the request based on service type
  try {
    switch (service.type) {
      case 'text':
        return await processTextService(service, input, options);
      case 'image':
        return await processImageService(service, input, options);
      case 'code':
        return await processCodeService(service, input, options);
      case 'data':
        return await processDataService(service, input, options);
      default:
        throw new Error(`Unsupported service type: ${service.type}`);
    }
  } catch (error) {
    console.error(`Error processing ${service.type} service:`, error);
    
    // Fallback to mock response if available
    if (service.mockResponses && service.mockResponses[input]) {
      console.log(`Falling back to mock response for service ${serviceId}`);
      return { 
        result: service.mockResponses[input],
        serviceType: service.type
      };
    }
    
    throw error;
  }
};

// Function to process a service request with streaming
export const processServiceRequestStream = async (
  serviceId: string,
  input: string,
  res: Response,
  options: any = {}
): Promise<void> => {
  // Get service config
  const service = getServiceById(serviceId);
  
  if (!service) {
    res.write('data: {"error": "Service not found"}\n\n');
    res.end();
    return;
  }
  
  console.log(`Processing streaming service request: ${serviceId}`);
  console.log(`Input (first 50 chars): "${input.substring(0, 50)}..."`);
  
  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Check for mock responses in development mode
  if (process.env.NODE_ENV === 'development' && service.mockResponses && service.mockResponses[input]) {
    console.log(`Using mock response for service ${serviceId} (streaming)`);
    
    // Send mock response in chunks to simulate streaming
    const mockResponse = service.mockResponses[input];
    const chunkSize = 10;
    
    // Send an initial empty delta to start the stream
    res.write(`data: ${JSON.stringify({ content: "", done: false })}\n\n`);
    
    for (let i = 0; i < mockResponse.length; i += chunkSize) {
      const chunk = mockResponse.substring(i, i + chunkSize);
      // Add a small delay to simulate real streaming
      await new Promise(resolve => setTimeout(resolve, 50));
      res.write(`data: ${JSON.stringify({ content: chunk, done: false })}\n\n`);
    }
    
    // End the stream
    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
    return;
  }
  
  try {
    switch (service.type) {
      case 'text':
        await streamTextService(service, input, res, options);
        break;
      case 'code':
        await streamCodeService(service, input, res, options);
        break;
      case 'data':
        await streamDataService(service, input, res, options);
        break;
      case 'image':
        // Image generation doesn't support streaming
        const imageResult = await processImageService(service, input, options);
        res.write(`data: ${JSON.stringify({ content: imageResult.result, done: true, serviceType: 'image' })}\n\n`);
        res.end();
        break;
      default:
        res.write(`data: ${JSON.stringify({ error: `Unsupported service type: ${service.type}`, done: true })}\n\n`);
        res.end();
    }
  } catch (error) {
    console.error(`Error processing streaming ${service.type} service:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.write(`data: ${JSON.stringify({ error: `Error: ${errorMessage}`, done: true })}\n\n`);
    res.end();
  }
};

// Process text-based services (chatbot, translation, content writing)
async function processTextService(service: Service, input: string, options: any): Promise<any> {
  console.log(`Processing text service with model: ${service.aiModel || "gpt-4o-mini"}`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Use OpenAI API with the service's system prompt
    const completion = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1500,
    });
    
    const result = completion.choices[0].message?.content || "No response generated";
    console.log(`OpenAI response received, length: ${result.length} chars`);
    console.log(`First 100 chars of response: "${result.substring(0, 100)}..."`);
    
    return { 
      result,
      serviceType: 'text'
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

// Stream text-based services
async function streamTextService(service: Service, input: string, res: Response, options: any): Promise<void> {
  console.log(`Streaming text service with model: ${service.aiModel || "gpt-4o-mini"}`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Use OpenAI API with streaming and the service's system prompt
    const stream = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1500,
      stream: true,
    });
    
    // Send an initial empty delta to start the stream
    res.write(`data: ${JSON.stringify({ content: "", done: false })}\n\n`);
    
    // Process the stream
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
      }
    }
    
    // End the stream
    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
    
    console.log(`Text streaming completed for service ${service.id}`);
  } catch (error) {
    console.error("OpenAI API streaming error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.write(`data: ${JSON.stringify({ error: `Error: ${errorMessage}`, done: true })}\n\n`);
    res.end();
  }
}

// Process image-based services (image generation)
async function processImageService(service: Service, input: string, options: any): Promise<any> {
  console.log(`Processing image generation with prompt: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Combine system prompt with user input for better image generation
    const enhancedPrompt = `${service.system_prompt}\n\nUser request: ${input}`;
    
    // Use DALL-E API
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: options.size || "1024x1024",
    });
    
    const imageUrl = response.data[0].url;
    console.log(`Image generated, URL: ${imageUrl}`);
    
    return { 
      result: imageUrl,
      serviceType: 'image'
    };
  } catch (error) {
    console.error("DALL-E API error:", error);
    throw error;
  }
}

// Process code-based services
async function processCodeService(service: Service, input: string, options: any): Promise<any> {
  console.log(`Processing code service with prompt: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Use OpenAI with code-specific prompt and the service's system prompt
    const completion = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.3, // Lower temperature for code
      max_tokens: options.maxTokens || 1500,
    });
    
    const result = completion.choices[0].message?.content || "No code generated";
    console.log(`Code response received, length: ${result.length} chars`);
    
    return { 
      result,
      serviceType: 'code'
    };
  } catch (error) {
    console.error("OpenAI API error for code generation:", error);
    throw error;
  }
}

// Stream code-based services
async function streamCodeService(service: Service, input: string, res: Response, options: any): Promise<void> {
  console.log(`Streaming code service with prompt: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Use OpenAI with code-specific prompt and streaming, with the service's system prompt
    const stream = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.3,
      max_tokens: options.maxTokens || 1500,
      stream: true,
    });
    
    // Send an initial empty delta to start the stream
    res.write(`data: ${JSON.stringify({ content: "", done: false })}\n\n`);
    
    // Process the stream
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
      }
    }
    
    // End the stream
    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
    
    console.log(`Code streaming completed for service ${service.id}`);
  } catch (error) {
    console.error("OpenAI API streaming error for code:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.write(`data: ${JSON.stringify({ error: `Error: ${errorMessage}`, done: true })}\n\n`);
    res.end();
  }
}

// Process data analysis services
async function processDataService(service: Service, input: string, options: any): Promise<any> {
  console.log(`Processing data analysis with input: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // For now, handle data analysis using text models with the service's system prompt
    const completion = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.5,
      max_tokens: options.maxTokens || 1500,
    });
    
    const result = completion.choices[0].message?.content || "No analysis generated";
    console.log(`Data analysis response received, length: ${result.length} chars`);
    
    return { 
      result,
      serviceType: 'data'
    };
  } catch (error) {
    console.error("OpenAI API error for data analysis:", error);
    throw error;
  }
}

// Stream data analysis services
async function streamDataService(service: Service, input: string, res: Response, options: any): Promise<void> {
  console.log(`Streaming data analysis with input: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // For data analysis using text models with streaming, with the service's system prompt
    const stream = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.5,
      max_tokens: options.maxTokens || 1500,
      stream: true,
    });
    
    // Send an initial empty delta to start the stream
    res.write(`data: ${JSON.stringify({ content: "", done: false })}\n\n`);
    
    // Process the stream
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
      }
    }
    
    // End the stream
    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
    
    console.log(`Data analysis streaming completed for service ${service.id}`);
  } catch (error) {
    console.error("OpenAI API streaming error for data analysis:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.write(`data: ${JSON.stringify({ error: `Error: ${errorMessage}`, done: true })}\n\n`);
    res.end();
  }
}