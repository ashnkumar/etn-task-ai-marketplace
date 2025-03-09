import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Service types
export type ServiceType = 'text' | 'image' | 'code' | 'data';
export type TemplateType = 'text_only' | 'text_and_file' | 'image';

// Service interface
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string;
  type: ServiceType;
  template_type: TemplateType;
  tagline: string;
  instructions: string;
  image?: string;
  author?: string;
}

// Fallback services in case the API is unavailable
export const services: Service[] = [
  {
    id: "smart-contract-auditor",
    name: "Smart Contract Auditor",
    description: "Uncover potential issues in your Solidity contracts.",
    basePrice: "0.20",
    type: "code",
    template_type: "text_and_file",
    tagline: "Uncover potential issues in your Solidity contracts.",
    instructions: "Upload your Solidity file (or snippet) and provide any relevant context. The AI will analyze your code for common vulnerabilities and best-practice compliance, returning a detailed audit report in Markdown.",
    image: "/images/smart-contract-auditor.png",
    author: "ETN Task AI"
  },
  {
    id: "defi-risk-analyzer",
    name: "DeFi Risk Analyzer",
    description: "Assess weaknesses in your DeFi protocol designs.",
    basePrice: "0.15",
    type: "text",
    template_type: "text_only",
    tagline: "Assess weaknesses in your DeFi protocol designs.",
    instructions: "Describe your DeFi protocol's structure, mechanics, and goals. The AI will highlight potential risk factors (economic exploits, liquidity issues, governance attacks, etc.) and suggest mitigations, returning a detailed analysis in Markdown.",
    author: "ETN Task AI"
  },
  {
    id: "tokenomics-architect",
    name: "Tokenomics Architect",
    description: "Shape robust token models for sustainable growth.",
    basePrice: "0.15",
    type: "text",
    template_type: "text_only",
    tagline: "Shape robust token models for sustainable growth.",
    instructions: "Enter your token model's details—distribution, inflation schedule, utility mechanics, etc.—and any known constraints. The AI will refine your tokenomics, offering suggestions on supply schedules, incentive alignment, and governance structures in Markdown.",
    author: "ETN Task AI"
  },
  {
    id: "crypto-meme-maker",
    name: "Crypto Meme Maker",
    description: "Generate fun, on-trend crypto memes from text prompts.",
    basePrice: "0.20",
    type: "image",
    template_type: "image",
    tagline: "Generate fun, on-trend crypto memes from text prompts.",
    instructions: "Enter your meme idea (e.g., 'Bullish dog riding a rocket, comedic style'). The AI will create a humorous on-trend image featuring your concept.",
    author: "ETN Task AI"
  },
  {
    id: "code-summarizer",
    name: "Code Summarizer & Refactor",
    description: "Upload code to receive a succinct summary and improvement tips.",
    basePrice: "0.10",
    type: "code",
    template_type: "text_and_file",
    tagline: "Upload code to receive a succinct summary and improvement tips.",
    instructions: "Provide a snippet or file of code (any language) along with optional notes. The AI will produce a concise explanation of what the code does, highlight potential bugs, and suggest refactoring improvements in Markdown.",
    author: "ETN Task AI"
  },
  {
    id: "pitch-polisher",
    name: "Pitch Polisher",
    description: "Elevate your project pitch or whitepaper with professional polish.",
    basePrice: "0.10",
    type: "text",
    template_type: "text_only",
    tagline: "Elevate your project pitch or whitepaper with professional polish.",
    instructions: "Paste your raw pitch, whitepaper text, or overall project description. The AI will refine the language, style, and structure, returning a professional, compelling version in Markdown with headings and bullet points where relevant.",
    author: "ETN Task AI"
  },
  {
    id: "dao-governance-wizard",
    name: "DAO Governance Wizard",
    description: "Design effective governance frameworks for decentralized organizations.",
    basePrice: "0.15",
    type: "text",
    template_type: "text_only",
    tagline: "Design effective governance frameworks for decentralized organizations.",
    instructions: "Describe your DAO's purpose, membership structure, and voting mechanisms. The AI will propose enhancements for fair, efficient governance in Markdown format.",
    author: "ETN Task AI"
  },
  {
    id: "nft-artwork-generator",
    name: "NFT Artwork Generator",
    description: "Create distinctive NFT visuals from concept prompts.",
    basePrice: "0.25",
    type: "image",
    template_type: "image",
    tagline: "Create distinctive NFT visuals from concept prompts.",
    instructions: "Enter a creative concept (e.g. 'Neon cyberpunk lion with glitch effects'). The AI will generate a unique artwork suiting NFT minting style.",
    author: "ETN Task AI"
  }
];

// Function to get a service by ID
export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export interface ServicesResponse {
  services: Service[];
}

export interface ServiceResponse {
  service: Service;
}

export interface RequestIdResponse {
  requestId: string;
  estimatedCost: string;
}

export interface PaymentVerificationResponse {
  paid: boolean;
}

export interface ProcessRequestResponse {
  status: string;
  result: string;
  serviceType: string;
}

// EventSource Response Handler Type
export type StreamingResponseHandler = {
  onContent: (content: string) => void;
  onError: (error: string) => void;
  onComplete: () => void;
};

// Get all services
export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await axios.get<ServicesResponse>(`${API_URL}/services`);
    return response.data.services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

// Get a specific service
export const getService = async (serviceId: string): Promise<Service | null> => {
  try {
    const response = await axios.get<ServiceResponse>(`${API_URL}/services/${serviceId}`);
    return response.data.service;
  } catch (error) {
    console.error(`Error fetching service ${serviceId}:`, error);
    return null;
  }
};

// Generate a request ID
export const generateRequestId = async (serviceId: string, input: string): Promise<RequestIdResponse | null> => {
  try {
    const response = await axios.post<RequestIdResponse>(`${API_URL}/services/request-id`, {
      serviceId,
      input
    });
    return response.data;
  } catch (error) {
    console.error('Error generating request ID:', error);
    return null;
  }
};

// Verify payment
export const verifyPayment = async (requestId: string): Promise<boolean> => {
  try {
    const response = await axios.get<PaymentVerificationResponse>(`${API_URL}/services/verify-payment/${requestId}`);
    return response.data.paid;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

// Process a service request (non-streaming)
export const processRequest = async (
  serviceId: string,
  requestId: string,
  input: string,
  options: any = {}
): Promise<ProcessRequestResponse | null> => {
  try {
    const response = await axios.post<ProcessRequestResponse>(`${API_URL}/services/process`, {
      serviceId,
      requestId,
      input,
      options
    });
    return response.data;
  } catch (error: any) {
    console.error('Error processing request:', error);
    
    // If the error is a payment required error, return a specific response
    if (error.response?.status === 402) {
      return {
        status: 'unpaid',
        result: 'Payment required',
        serviceType: 'error'
      };
    }
    
    return null;
  }
};

// Process a service request with streaming
export const processRequestStream = (
  serviceId: string,
  requestId: string,
  input: string,
  handlers: StreamingResponseHandler,
  options: any = {}
): { abort: () => void } => {
  const controller = new AbortController();
  const signal = controller.signal;
  
  // Use fetch with streaming
  (async () => {
    try {
      const response = await fetch(`${API_URL}/services/process-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          requestId,
          input,
          options
        }),
        signal
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        handlers.onError(errorData.error || 'Failed to process request');
        return;
      }
      
      if (!response.body) {
        handlers.onError('ReadableStream not supported');
        return;
      }
      
      // Set up the stream reader
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let buffer = '';
      
      while (true) {
        const { value, done } = await reader.read();
        
        if (done) {
          // Process any remaining data in buffer
          if (buffer.trim()) {
            processEventData(buffer, handlers);
          }
          handlers.onComplete();
          break;
        }
        
        // Decode the data
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        
        // Process complete events in the buffer
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || ''; // Keep the last incomplete chunk in the buffer
        
        for (const line of lines) {
          if (line.trim().startsWith('data:')) {
            processEventData(line, handlers);
          }
        }
      }
    } catch (error) {
      if ((error as { name: string }).name === 'AbortError') {
        console.log('Stream aborted by user');
      } else {
        console.error('Stream error:', error);
        handlers.onError((error as Error).message || 'Streaming error occurred');
      }
    }
  })();
  
  // Return an object with the abort method
  return {
    abort: () => controller.abort()
  };
};

// Helper function to process SSE data
function processEventData(eventData: string, handlers: StreamingResponseHandler) {
  const dataPrefix = 'data:';
  if (eventData.trim().startsWith(dataPrefix)) {
    try {
      const jsonStr = eventData.trim().slice(dataPrefix.length).trim();
      const data = JSON.parse(jsonStr);
      
      if (data.error) {
        handlers.onError(data.error);
        return;
      }
      
      if (data.content !== undefined) {
        handlers.onContent(data.content);
      }
      
      if (data.done) {
        handlers.onComplete();
      }
    } catch (error) {
      console.error('Error parsing event data:', error, eventData);
      handlers.onError('Error parsing response');
    }
  }
}