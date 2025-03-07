import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { startPaymentListener } from './utils/blockchain';

// Load environment variables
dotenv.config();

console.log("Environment variables:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS);
console.log("ETN_TESTNET_URL:", process.env.ETN_TESTNET_URL);

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