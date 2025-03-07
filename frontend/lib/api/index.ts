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
  supportedFiles?: string[];
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