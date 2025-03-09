// frontend/lib/api/index.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Types
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string;
  type: string;
  template_type: string;
  tagline: string;
  instructions: string;
  supportedFiles?: string[];
  image?: string;
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

// Process a service request
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