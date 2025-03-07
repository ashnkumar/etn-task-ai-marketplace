import { Request, Response } from 'express';
import { generateRequestId } from '../utils/requestId';
import { checkPayment } from '../utils/blockchain';
import { processServiceRequest } from '../utils/aiService';
import { getServiceById, calculatePrice, services } from '../config/services';

// Controller methods
const serviceController = {
  // List all available services
  listServices: (req: Request, res: Response): void => {
    res.status(200).json({ 
      services: services.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        basePrice: service.basePrice,
        type: service.type
      }))
    });
  },
  
  // Get details for a specific service
  getServiceDetails: (req: Request, res: Response): void => {
    const { serviceId } = req.params;
    
    const service = getServiceById(serviceId);
    
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    
    res.status(200).json({ 
      service: {
        id: service.id,
        name: service.name,
        description: service.description,
        basePrice: service.basePrice,
        type: service.type,
        supportedFiles: service.supportedFiles || []
      }
    });
  },
  
  // Generate a requestId and estimated cost for a service
  generateRequestId: (req: Request, res: Response): void => {
    const { serviceId, input } = req.body;
    
    if (!serviceId || !input) {
      res.status(400).json({ error: 'ServiceId and input are required' });
      return;
    }
    
    const service = getServiceById(serviceId);
    
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    
    // Generate a unique requestId
    const requestId = generateRequestId(service.id.substring(0, 3));
    
    // Calculate estimated cost based on input length and service
    const estimatedCost = calculatePrice(service, input.length);
    
    res.status(200).json({ 
      requestId,
      estimatedCost: estimatedCost + " ETN"
    });
  },
  
  // Verify payment for a specific requestId
  verifyPayment: async (req: Request, res: Response): Promise<void> => {
    const { requestId } = req.params;
    
    if (!requestId) {
      res.status(400).json({ error: 'RequestId is required' });
      return;
    }
    
    try {
      const isPaid = await checkPayment(requestId);
      
      res.status(200).json({ 
        paid: isPaid
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  },
  
  // Process a service request
  processRequest: async (req: Request, res: Response): Promise<void> => {
    const { serviceId, requestId, input, options } = req.body;
    
    if (!serviceId || !requestId || !input) {
      res.status(400).json({ error: 'ServiceId, requestId, and input are required' });
      return;
    }
    
    // Verify the service exists
    const service = getServiceById(serviceId);
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    
    // Check payment status
    try {
      const isPaid = await checkPayment(requestId);
      
      if (!isPaid) {
        res.status(402).json({ error: 'Payment required', status: 'unpaid' });
        return;
      }
      
      // Process the service request
      const result = await processServiceRequest(serviceId, input, options);
      
      res.status(200).json({ 
        status: 'success',
        ...result
      });
    } catch (error: any) {
      console.error('Error processing service request:', error);
      res.status(500).json({ 
        error: 'Service request failed', 
        message: error.message || 'Unknown error'
      });
    }
  }
};

export default serviceController;