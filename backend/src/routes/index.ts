import { Router } from 'express';
import aiController from '../controllers/aiController';

const router = Router();

router.post('/generate-prompt-id', aiController.generatePromptId);
router.get('/verify-payment/:promptId', aiController.verifyPayment);
router.post('/ask', aiController.generateResponse);
router.get('/ask', aiController.generateResponse);

export default router;