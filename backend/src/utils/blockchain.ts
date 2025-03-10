import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { PaymentHandlerABI } from '../../shared/contracts/PaymentHandler';

// Make sure environment variables are loaded
dotenv.config();

// Get the contract address directly from environment
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

if (!CONTRACT_ADDRESS) {
  console.error("ERROR: CONTRACT_ADDRESS is not defined in environment variables");
}

console.log("Using contract address:", CONTRACT_ADDRESS);

// Select the appropriate RPC URL based on environment
const ENVIRONMENT = process.env.ENVIRONMENT || 'testnet';
const RPC_URL = ENVIRONMENT === 'mainnet' 
  ? process.env.ETN_MAINNET_URL 
  : process.env.ETN_TESTNET_URL;

// Provider setup
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// Create contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS!, PaymentHandlerABI, provider);

// Map to store payments that have been verified
const verifiedPayments = new Map<string, boolean>();

// Map to store transaction hashes for requestIds
const requestTransactions = new Map<string, string>();

// Function to check if a payment exists for a requestId
export const checkPayment = async (requestId: string): Promise<boolean> => {
  // If we've already verified this payment, return true immediately
  if (verifiedPayments.get(requestId)) {
    return true;
  }

  try {
    // Get the current block number
    const currentBlock = await provider.getBlockNumber();
    
    // Look for events in the last 100 blocks
    const fromBlock = Math.max(0, currentBlock - 100);
    
    console.log(`Checking for payments from block ${fromBlock} to ${currentBlock} for requestId: ${requestId}`);
    
    // Query for PaymentReceived events with the updated event structure
    const events = await contract.queryFilter(
      contract.filters.PaymentReceived(null, null, null, null, null, null, null),
      fromBlock,
      currentBlock
    );
    
    // Check if any event matches our requestId
    const found = events.some(event => {
      const args = event.args;
      // The requestId is now the third parameter in the event
      if (args && args.requestId === requestId) {
        console.log(`Found payment for requestId ${requestId} in transaction ${event.transactionHash}`);
        
        // Store the transaction hash for later use
        requestTransactions.set(requestId, event.transactionHash);
        console.log(`Transaction hash stored: ${event.transactionHash}`);
        
        return true;
      }
      return false;
    });
    
    // If found, store in our map for future quick lookups
    if (found) {
      verifiedPayments.set(requestId, true);
      
      // Skip the ASCII art here since it will be handled in serviceController.ts
      return true;
    }
    
    // Development mode simulation
    if (process.env.NODE_ENV === 'development' && Math.random() > 0.5) {
      console.log(`Development mode: Simulating payment success for requestId ${requestId}`);
      verifiedPayments.set(requestId, true);
      
      // Skip the ASCII art here since it will be handled in serviceController.ts
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking payment:', error);
    
    // In development mode, sometimes return true to allow testing
    if (process.env.NODE_ENV === 'development' && Math.random() > 0.7) {
      console.log(`Development mode: Simulating payment success despite error`);
      verifiedPayments.set(requestId, true);
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
    contract.on("PaymentReceived", (sender, serviceId, requestId, amount, providerAmount, platformFee, timestamp, event) => {
      console.log(`Payment received: ${ethers.utils.formatEther(amount)} ETN`);
      console.log(`From: ${sender}`);
      console.log(`For service: ${serviceId}`);
      console.log(`Request ID: ${requestId}`);
      console.log(`Provider amount: ${ethers.utils.formatEther(providerAmount)} ETN`);
      console.log(`Platform fee: ${ethers.utils.formatEther(platformFee)} ETN`);
      console.log(`At timestamp: ${new Date(timestamp.toNumber() * 1000).toISOString()}`);
      
      // Store the payment in our map
      verifiedPayments.set(requestId, true);
      
      // Store the transaction hash for this requestId
      if (event && event.transactionHash) {
        requestTransactions.set(requestId, event.transactionHash);
        console.log(`Transaction hash: ${event.transactionHash}`);
      }
    });
    
    console.log("Payment listener started successfully");
  } catch (error) {
    console.error("Error starting payment listener:", error);
    console.log("Running in fallback mode - will check for payments on demand");
  }
};

// Function to get transaction hash for a requestId
export const getTransactionHash = (requestId: string): string | null => {
  return requestTransactions.get(requestId) || null;
};