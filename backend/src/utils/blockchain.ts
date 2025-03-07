import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

// ABI for the PaymentReceived event
const ABI = [
  "event PaymentReceived(address indexed sender, uint256 amount, string promptId, uint256 timestamp)"
];

// Contract address from environment variable
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Provider setup using Electroneum testnet RPC
const provider = new ethers.providers.JsonRpcProvider(process.env.ETN_TESTNET_URL);

// Create contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS!, ABI, provider);

// Map to store payments that have been verified
const verifiedPayments = new Map<string, boolean>();

// Function to check if a payment exists for a promptId
export const checkPayment = async (promptId: string): Promise<boolean> => {
  // If we've already verified this payment, return true immediately
  if (verifiedPayments.get(promptId)) {
    return true;
  }

  try {
    // Get the current block number
    const currentBlock = await provider.getBlockNumber();
    
    // Look for events in the last 100 blocks (adjust as needed)
    // Electroneum has ~5 second blocks, so 100 blocks is ~8.3 minutes
    const fromBlock = Math.max(0, currentBlock - 100);
    
    console.log(`Checking for payments from block ${fromBlock} to ${currentBlock} for promptId: ${promptId}`);
    
    // Query for PaymentReceived events
    const events = await contract.queryFilter(
      contract.filters.PaymentReceived(null, null, null, null),
      fromBlock,
      currentBlock
    );
    
    // Check if any event matches our promptId
    const found = events.some(event => {
      const args = event.args;
      if (args && args.promptId === promptId) {
        console.log(`Found payment for promptId ${promptId} in transaction ${event.transactionHash}`);
        return true;
      }
      return false;
    });
    
    // If found, store in our map for future quick lookups
    if (found) {
      verifiedPayments.set(promptId, true);
      return true;
    }
    
    // If using development mode and no payment found, simulate a successful payment 50% of the time
    if (process.env.NODE_ENV === 'development' && Math.random() > 0.5) {
      console.log(`Development mode: Simulating payment success for promptId ${promptId}`);
      verifiedPayments.set(promptId, true);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking payment:', error);
    
    // In development mode, sometimes return true to allow testing
    if (process.env.NODE_ENV === 'development' && Math.random() > 0.7) {
      console.log(`Development mode: Simulating payment success despite error`);
      verifiedPayments.set(promptId, true);
      return true;
    }
    
    return false;
  }
};

// Function to listen for new payment events
export const startPaymentListener = () => {
  console.log("Starting payment event listener...");
  console.log("Using contract address:", CONTRACT_ADDRESS);
  
  // Set up event listener for real-time payment notifications
  try {
    contract.on("PaymentReceived", (sender, amount, promptId, timestamp) => {
      console.log(`Payment received: ${ethers.utils.formatEther(amount)} ETN`);
      console.log(`From: ${sender}`);
      console.log(`For prompt: ${promptId}`);
      console.log(`At timestamp: ${new Date(timestamp.toNumber() * 1000).toISOString()}`);
      
      // Store the payment in our map
      verifiedPayments.set(promptId, true);
    });
    
    console.log("Payment listener started successfully");
  } catch (error) {
    console.error("Error starting payment listener:", error);
    console.log("Running in fallback mode - will check for payments on demand");
  }
}; 