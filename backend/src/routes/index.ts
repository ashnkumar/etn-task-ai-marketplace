import { Router } from 'express';
import serviceRoutes from './serviceRoutes';

const router = Router();

router.use('/services', serviceRoutes);

export default router;