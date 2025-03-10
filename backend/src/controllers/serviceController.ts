import { Request, Response } from 'express';
import { generateRequestId } from '../utils/requestId';
import { checkPayment, getTransactionHash } from '../utils/blockchain';
import { processServiceRequest, processServiceRequestStream } from '../utils/aiService';
import { getServiceById, calculatePrice, services } from '../config/services';

// Controller methods
const serviceController = {
  // List all available services
  listServices: (req: Request, res: Response): void => {
    console.log('API: List services request received');
    res.status(200).json({ 
      services: services.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        basePrice: service.basePrice,
        type: service.type,
        template_type: service.template_type,
        tagline: service.tagline,
        image: service.image
      }))
    });
  },
  
  // Get details for a specific service
  getServiceDetails: (req: Request, res: Response): void => {
    const { serviceId } = req.params;
    console.log(`API: Get service details request for serviceId: ${serviceId}`);
    
    const service = getServiceById(serviceId);
    
    if (!service) {
      console.log(`Service not found: ${serviceId}`);
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
        template_type: service.template_type,
        tagline: service.tagline,
        instructions: service.instructions,
        supportedFiles: service.supportedFiles || [],
        image: service.image
      }
    });
  },
  
  // Generate a requestId and estimated cost for a service
  generateRequestId: (req: Request, res: Response): void => {
    const { serviceId, input } = req.body;
    console.log(`API: Generate requestId for service: ${serviceId}`);
    console.log(`Input length: ${input ? input.length : 0}`);
    
    if (!serviceId || !input) {
      console.log('Missing required parameters');
      res.status(400).json({ error: 'ServiceId and input are required' });
      return;
    }
    
    const service = getServiceById(serviceId);
    
    if (!service) {
      console.log(`Service not found: ${serviceId}`);
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    
    // Generate a unique requestId
    const requestId = generateRequestId(serviceId);
    console.log(`Generated requestId: ${requestId}`);
    
    // Calculate estimated cost based on input length and service
    const estimatedCost = calculatePrice(service, input.length);
    console.log(`Estimated cost: ${estimatedCost} ETN`);
    
    res.status(200).json({ 
      requestId,
      estimatedCost: estimatedCost + " ETN"
    });
  },
  
  // Verify payment for a specific requestId
  verifyPayment: async (req: Request, res: Response): Promise<void> => {
    const { requestId } = req.params;
    console.log(`API: Verify payment for requestId: ${requestId}`);
    
    if (!requestId) {
      console.log('RequestId is required');
      res.status(400).json({ error: 'RequestId is required' });
      return;
    }
    
    try {
      const isPaid = await checkPayment(requestId);
      
      // Enhanced log only if payment is verified
      if (isPaid) {
        // ASCII art directly in serviceController for maximum visibility
        console.log('\n\x1b[32m=======================================================\x1b[0m');
        console.log('\x1b[32m██████╗  █████╗ ██╗   ██╗███╗   ███╗███████╗███╗   ██╗████████╗\x1b[0m');
        console.log('\x1b[32m██╔══██╗██╔══██╗╚██╗ ██╔╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝\x1b[0m');
        console.log('\x1b[32m██████╔╝███████║ ╚████╔╝ ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   \x1b[0m');
        console.log('\x1b[32m██╔═══╝ ██╔══██║  ╚██╔╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   \x1b[0m');
        console.log('\x1b[32m██║     ██║  ██║   ██║   ██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   \x1b[0m');
        console.log('\x1b[32m╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   \x1b[0m');
        console.log('\x1b[32m                                                               \x1b[0m');
        console.log('\x1b[32m██╗   ██╗███████╗██████╗ ██╗███████╗██╗███████╗██████╗        \x1b[0m');
        console.log('\x1b[32m██║   ██║██╔════╝██╔══██╗██║██╔════╝██║██╔════╝██╔══██╗       \x1b[0m');
        console.log('\x1b[32m██║   ██║█████╗  ██████╔╝██║█████╗  ██║█████╗  ██║  ██║       \x1b[0m');
        console.log('\x1b[32m╚██╗ ██╔╝██╔══╝  ██╔══██╗██║██╔══╝  ██║██╔══╝  ██║  ██║       \x1b[0m');
        console.log('\x1b[32m ╚████╔╝ ███████╗██║  ██║██║██║     ██║███████╗██████╔╝       \x1b[0m');
        console.log('\x1b[32m  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝╚═════╝        \x1b[0m');
        console.log('\x1b[1;32m=======================================================\x1b[0m');
        console.log('\x1b[1;32m✓ PAYMENT VERIFICATION SUCCESSFUL FOR REQUEST: ' + requestId + '\x1b[0m');
        console.log('\x1b[1;32m=======================================================\x1b[0m');
        
        // Get the actual transaction hash if available
        const txHash = getTransactionHash(requestId);
        
        // Determine transaction URL
        const isMainnet = process.env.ENVIRONMENT === 'mainnet';
        const explorerBaseUrl = isMainnet 
          ? 'https://blockexplorer.electroneum.com/tx/'
          : 'https://blockexplorer.testnet.electroneum.com/tx/';
        
        // Use actual hash if available, otherwise generate a mock one for demo
        const transactionHash = txHash || '0x06ba5e3be13476cb7493167e0fb1a2a0a5fbc24c4f06bf2d7763f02f14f30531';
        const explorerUrl = `${explorerBaseUrl}${transactionHash}`;
        
        console.log('\x1b[1;36m🔍 VIEW TRANSACTION DETAILS: ' + explorerUrl + '\x1b[0m\n');
      } else {
        console.log('Payment verification result: Not paid');
      }
      
      res.status(200).json({ 
        paid: isPaid
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  },
  
  // Process a service request (non-streaming)
  processRequest: async (req: Request, res: Response): Promise<void> => {
    const { serviceId, requestId, input, options } = req.body;
    console.log(`API: Process request for service: ${serviceId}, requestId: ${requestId}`);
    console.log(`Input length: ${input ? input.length : 0}`);
    
    if (!serviceId || !requestId || !input) {
      console.log('Missing required parameters');
      res.status(400).json({ error: 'ServiceId, requestId, and input are required' });
      return;
    }
    
    // Verify the service exists
    const service = getServiceById(serviceId);
    if (!service) {
      console.log(`Service not found: ${serviceId}`);
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    
    // Check payment status
    try {
      console.log(`Verifying payment for requestId: ${requestId}`);
      const isPaid = await checkPayment(requestId);
      
      if (!isPaid) {
        console.log('Payment required');
        res.status(402).json({ error: 'Payment required', status: 'unpaid' });
        return;
      }
      
      console.log('Payment verified, processing request...');
      
      // Process the service request
      const result = await processServiceRequest(serviceId, input, options);
      
      console.log(`Request processed successfully. Result type: ${result.serviceType}`);
      
      // Log first part of result for debugging (truncate for sensitive/large outputs)
      if (result.serviceType === 'image') {
        console.log(`Generated image URL: ${result.result.substring(0, 100)}...`);
      } else {
        console.log(`Result length: ${result.result.length} characters`);
        console.log(`First 100 chars: ${result.result.substring(0, 100)}...`);
      }
      
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
  },
  
  // Process a service request with streaming
  processRequestStream: async (req: Request, res: Response): Promise<void> => {
    const { serviceId, requestId, input, options } = req.body;
    console.log(`API: Process streaming request for service: ${serviceId}, requestId: ${requestId}`);
    console.log(`Input length: ${input ? input.length : 0}`);
    
    if (!serviceId || !requestId || !input) {
      console.log('Missing required parameters');
      res.status(400).json({ error: 'ServiceId, requestId, and input are required' });
      return;
    }
    
    // Verify the service exists
    const service = getServiceById(serviceId);
    if (!service) {
      console.log(`Service not found: ${serviceId}`);
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    
    // Check payment status
    try {
      console.log(`Verifying payment for requestId: ${requestId}`);
      const isPaid = await checkPayment(requestId);
      
      if (!isPaid) {
        console.log('Payment required');
        res.status(402).json({ error: 'Payment required', status: 'unpaid' });
        return;
      }
      
      console.log('Payment verified, processing streaming request...');
      
      // Process the service request with streaming
      await processServiceRequestStream(serviceId, input, res, options);
      
      // Note: The response is handled within processServiceRequestStream
      
    } catch (error: any) {
      console.error('Error processing streaming service request:', error);
      // If headers haven't been sent yet, send a JSON error response
      if (!res.headersSent) {
        res.status(500).json({ 
          error: 'Service request failed', 
          message: error.message || 'Unknown error'
        });
      } else {
        // If headers have been sent (streaming started), send an error event
        res.write(`data: ${JSON.stringify({ error: error.message || 'Unknown error', done: true })}\n\n`);
        res.end();
      }
    }
  }
};

export default serviceController;