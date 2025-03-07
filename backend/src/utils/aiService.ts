import OpenAI from 'openai';
import { Service, getServiceById } from '../config/services';
import dotenv from 'dotenv';

dotenv.config();

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to process a service request
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

// Process text-based services (chatbot, translation, content writing)
async function processTextService(service: Service, input: string, options: any): Promise<any> {
  // Use OpenAI API
  const completion = await openai.chat.completions.create({
    model: service.aiModel || "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
    temperature: options.temperature || 0.7,
    max_tokens: options.maxTokens || 500,
  });
  
  return { 
    result: completion.choices[0].message?.content || "No response generated",
    serviceType: 'text'
  };
}

// Process image-based services (image generation)
async function processImageService(service: Service, input: string, options: any): Promise<any> {
  // Use DALL-E API
  const response = await openai.images.generate({
    prompt: input,
    n: 1,
    size: options.size || "512x512",
  });
  
  return { 
    result: response.data[0].url || "No image generated",
    serviceType: 'image'
  };
}

// Process code-based services
async function processCodeService(service: Service, input: string, options: any): Promise<any> {
  // Use OpenAI with code-specific prompt
  const codePrompt = `Write code in response to this request. Format your response with proper syntax highlighting with markdown code blocks: ${input}`;
  
  const completion = await openai.chat.completions.create({
    model: service.aiModel || "gpt-3.5-turbo",
    messages: [{ role: "user", content: codePrompt }],
    temperature: options.temperature || 0.3, // Lower temperature for code
    max_tokens: options.maxTokens || 1000,
  });
  
  return { 
    result: completion.choices[0].message?.content || "No code generated",
    serviceType: 'code'
  };
}

// Process data analysis services
async function processDataService(service: Service, input: string, options: any): Promise<any> {
  // For now, handle data analysis using text models
  // In a real implementation, this would be more sophisticated
  const dataPrompt = `Analyze the following data and provide insights: ${input}`;
  
  const completion = await openai.chat.completions.create({
    model: service.aiModel || "gpt-3.5-turbo",
    messages: [{ role: "user", content: dataPrompt }],
    temperature: options.temperature || 0.5,
    max_tokens: options.maxTokens || 1000,
  });
  
  return { 
    result: completion.choices[0].message?.content || "No analysis generated",
    serviceType: 'data'
  };
} 