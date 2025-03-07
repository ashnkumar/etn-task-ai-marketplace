import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { startPaymentListener } from './utils/blockchain';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Start blockchain event listener
  startPaymentListener();
});

export default app;