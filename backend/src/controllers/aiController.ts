import { Request, Response, NextFunction, RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { checkPayment } from '../utils/blockchain';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Mock responses for fast testing
const mockResponses: Record<string, string> = {
  "What is the capital of France?": "The capital of France is Paris.",
  "Tell me about Electroneum": "Electroneum (ETN) is a mobile-focused cryptocurrency designed for mass adoption.",
  "How does blockchain work?": "Blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, that are linked and secured using cryptography.",
  "What is the test network?": "Testnet is a testing environment that mimics the main Electroneum network. It allows developers to test their applications without using real ETN.",
  "Why use micropayments?": "Micropayments enable pay-per-use business models that weren't feasible before due to high transaction fees. They allow content creators and service providers to monetize their work in smaller increments."
};

// Controller methods with proper typing
const aiController = {
  // Generate a promptId for payment
  generatePromptId: (req: Request, res: Response): void => {
    const { prompt } = req.body;
    
    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }
    
    const promptId = uuidv4();
    
    res.status(200).json({ 
      promptId,
      estimatedCost: "0.01 ETN"  // Fixed cost for MVP
    });
  },
  
  // Verify payment for a specific promptId
  verifyPayment: async (req: Request, res: Response): Promise<void> => {
    const { promptId } = req.params;
    
    if (!promptId) {
      res.status(400).json({ error: 'PromptId is required' });
      return;
    }
    
    try {
      const isPaid = await checkPayment(promptId);
      
      res.status(200).json({ 
        paid: isPaid
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  },
  
  // Generate AI response after payment verification
  generateResponse: async (req: Request, res: Response): Promise<void> => {
    // Extract prompt and promptId from either query params (GET) or request body (POST)
    const prompt = req.method === 'GET' ? req.query.prompt as string : req.body.prompt;
    const promptId = req.method === 'GET' ? req.query.promptId as string : req.body.promptId;
    
    if (!prompt || !promptId) {
      if (req.method === 'GET') {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        res.write(`data: ${JSON.stringify({ error: 'Prompt and promptId are required', done: true })}\n\n`);
        res.end();
      } else {
        res.status(400).json({ error: 'Prompt and promptId are required' });
      }
      return;
    }
    
    try {
      // Removed the second payment verification as requested
      // Note: Payment should still be verified on the frontend before calling this endpoint
      
      // Set up SSE headers for streaming
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders(); // Flush the headers to establish SSE connection
      
      // For MVP/testing, use mock responses to avoid API costs
      if (process.env.NODE_ENV === 'development' && mockResponses[prompt]) {
        console.log(`Using mock response for prompt: "${prompt}"`);
        
        // Stream the mock response character by character to simulate streaming
        const mockResponse = mockResponses[prompt];
        
        // Send response introduction
        res.write(`data: ${JSON.stringify({ content: "", done: false })}\n\n`);
        
        for (let i = 0; i < mockResponse.length; i++) {
          // Simulate typing delay (20-80ms)
          await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 60));
          
          const chunk = mockResponse[i];
          res.write(`data: ${JSON.stringify({ content: chunk, done: false })}\n\n`);
        }
        
        // Send completion message
        res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
        res.end();
        return;
      }
      
      try {
        // Real OpenAI API call with streaming
        console.log(`Calling OpenAI API with streaming for prompt: "${prompt}"`);
        
        const stream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          stream: true,
        });
        
        // Stream the response
        let fullResponse = '';
        
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            fullResponse += content;
            res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
          }
        }
        
        console.log(`Completed streaming OpenAI response (${fullResponse.length} chars)`);
        
        // Send completion message
        res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
        res.end();
      } catch (openaiError) {
        console.error('Error calling OpenAI API:', openaiError);
        
        // Fallback to mock response in case of API error
        if (mockResponses[prompt]) {
          console.log(`Falling back to mock response after OpenAI error`);
          
          const mockResponse = mockResponses[prompt];
          res.write(`data: ${JSON.stringify({ content: mockResponse, done: true })}\n\n`);
          res.end();
          return;
        }
        
        // If no mock response available, provide a generic response
        const errorMessage = `I apologize, but I'm having trouble generating a response right now. Please try again later.`;
        res.write(`data: ${JSON.stringify({ content: errorMessage, done: true })}\n\n`);
        res.end();
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Send error response
      res.write(`data: ${JSON.stringify({ 
        error: 'Failed to generate AI response',
        done: true
      })}\n\n`);
      res.end();
    }
  }
};

export default aiController;