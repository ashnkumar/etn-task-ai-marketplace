import { Router } from 'express';
import serviceController from '../controllers/serviceController';

const router = Router();

// List all services
router.get('/', serviceController.listServices);

// Get details for a specific service
router.get('/:serviceId', serviceController.getServiceDetails);

// Generate a requestId for a service
router.post('/request-id', serviceController.generateRequestId);

// Verify payment for a requestId
router.get('/verify-payment/:requestId', serviceController.verifyPayment);

// Process a service request
router.post('/process', serviceController.processRequest);

export default router;