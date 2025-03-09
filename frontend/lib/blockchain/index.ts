import { ethers } from 'ethers';
import { PaymentHandlerABI, CONTRACT_ADDRESS } from '../../../shared/contracts/PaymentHandler';

// Check if MetaMask is installed
// In frontend/lib/blockchain/index.ts - modify checkIfWalletIsConnected:
export const checkIfWalletIsConnected = async (): Promise<string | null> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      console.log("Make sure you have MetaMask installed!");
      return null;
    }
    
    // Check if the user has explicitly disconnected
    if (localStorage.getItem("wallet_disconnected") === "true") {
      console.log("User has explicitly disconnected, not auto-connecting");
      localStorage.removeItem("wallet_disconnected"); // Clear the flag
      return null;
    }
    
    // Check if we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });
    
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.log("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Connect wallet
// In frontend/lib/blockchain/index.ts - modify the connectWallet function:
export const connectWallet = async (): Promise<string | null> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      alert("Please install MetaMask!");
      return null;
    }
    
    // Check if user has manually disconnected
    const disconnected = localStorage.getItem("wallet_disconnected");
    if (disconnected === "true") {
      // Clear the disconnected state
      localStorage.removeItem("wallet_disconnected");
      // This will cause MetaMask to prompt for connection again
      await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
    }
    
    // Request account access
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
    console.log("Connected to:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const disconnectWallet = (): void => {
  try {
    // Mark the wallet as disconnected in localStorage
    localStorage.setItem("wallet_disconnected", "true");
    console.log("Wallet marked as disconnected");
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
  }
};

// Chain IDs for Electroneum networks
const ELECTRONEUM_TESTNET_CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID || '5201420');
const ELECTRONEUM_MAINNET_CHAIN_ID = 52014;

// Determine the target chain ID based on environment
const targetChainId = process.env.NEXT_PUBLIC_ENV === 'mainnet' 
  ? ELECTRONEUM_MAINNET_CHAIN_ID 
  : ELECTRONEUM_TESTNET_CHAIN_ID;

// Check if wallet is on the correct Electroneum network
export const checkNetwork = async (): Promise<boolean> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      return false;
    }
    
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(chainId, 16);
    
    console.log("Current Chain ID:", currentChainId);
    console.log("Target Chain ID:", targetChainId);
    
    return currentChainId === targetChainId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Switch to the correct Electroneum network
export const switchToElectroneum = async (): Promise<boolean> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      return false;
    }
    
    // For mainnet, use 52014, for testnet 5201420
    const chainId = process.env.NEXT_PUBLIC_ENV === 'mainnet' ? 52014 : 5201420;
    const hexChainId = `0x${chainId.toString(16)}`;
    const networkName = process.env.NEXT_PUBLIC_ENV === 'mainnet' ? 'Electroneum Mainnet' : 'Electroneum Testnet';
    const rpcUrl = process.env.NEXT_PUBLIC_ENV === 'mainnet' 
      ? 'https://rpc.ankr.com/electroneum' 
      : process.env.NEXT_PUBLIC_ETN_TESTNET_URL;
    const explorerUrl = process.env.NEXT_PUBLIC_ENV === 'mainnet' 
      ? 'https://blockexplorer.electroneum.com' 
      : 'https://testnet-blockexplorer.electroneum.com';
    
    console.log(`Attempting to switch to ${networkName}`);
    console.log(`Chain ID: ${chainId} (hex: ${hexChainId})`);
    console.log(`RPC URL: ${rpcUrl}`);
    
    try {
      // Try to switch to the Electroneum network
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          console.log(`Adding Electroneum network to wallet...`);
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: hexChainId,
                chainName: networkName,
                nativeCurrency: {
                  name: 'Electroneum',
                  symbol: 'ETN',
                  decimals: 18,
                },
                rpcUrls: [rpcUrl],
                blockExplorerUrls: [explorerUrl],
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error(`Error adding Electroneum network:`, addError);
          return false;
        }
      }
      console.error(`Error switching to Electroneum network:`, switchError);
      return false;
    }
  } catch (error) {
    console.error(`General error during network switch:`, error);
    return false;
  }
};

// Make payment for a service request
// In the makePayment function, update to include serviceId:
// In makePayment function:
export const makePayment = async (requestId: string, amount: string): Promise<boolean> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      alert("Please install MetaMask!");
      return false;
    }
    
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PaymentHandlerABI, signer);
    
    // Extract service ID from the requestId (assuming format like "lan-xxxx" for language-translator)
    const serviceId = getServiceIdFromRequestId(requestId);
    console.log(`Making payment of ${amount} ETN for service ${serviceId}, request: ${requestId}`);
    
    // Convert amount to wei (remove " ETN" suffix if present)
    const cleanAmount = amount.replace(' ETN', '');
    const weiAmount = ethers.utils.parseEther(cleanAmount);
    
    // The AIMarketplace contract needs BOTH serviceId and requestId
    const tx = await contract.makePayment(serviceId, requestId, { value: weiAmount });
    
    // Wait for transaction to be mined
    await tx.wait();
    
    console.log("Payment successful:", tx.hash);
    return true;
  } catch (error) {
    console.error("Payment failed:", error);
    return false;
  }
};

// Helper function to extract service ID from request ID
function getServiceIdFromRequestId(requestId: string): string {
  // This assumes requestIds are in the format "pre-xxxxxxxx" where "pre" is the prefix
  // corresponding to the service ID
  const prefix = requestId.split('-')[0];
  
  // Map prefixes to full service IDs
  const prefixMap: {[key: string]: string} = {
    "sma": "smart-contract-auditor",
    "def": "defi-risk-analyzer",
    "tok": "tokenomics-architect",
    "cry": "crypto-meme-maker",
    "cod": "code-summarizer",
    "pit": "pitch-polisher",
    "dao": "dao-governance-wizard",
    "nft": "nft-artwork-generator"
  };
  
  return prefixMap[prefix] || "unknown-service";
}