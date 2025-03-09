// File: contracts/scripts/register-services.js
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const AIMarketplace = await hre.ethers.getContractFactory("AIMarketplace");
  const contract = await AIMarketplace.attach(process.env.CONTRACT_ADDRESS);
  
  // Pull provider address from environment variables
  const PROVIDER_ADDRESS = process.env.PROVIDER_ADDRESS;
  
  // Platform fee percentage (e.g., 10%)
  const PLATFORM_FEE = parseInt(process.env.PLATFORM_FEE || "10");
  
  if (!PROVIDER_ADDRESS) {
    console.error("Error: PROVIDER_ADDRESS not set in environment variables");
    process.exit(1);
  }
  
  console.log(`Using provider address: ${PROVIDER_ADDRESS}`);
  console.log(`Platform fee: ${PLATFORM_FEE}%`);
  console.log(`Contract address: ${process.env.CONTRACT_ADDRESS}`);
  
  // List of service IDs from your existing services
  const services = [
    "smart-contract-auditor",
    "defi-risk-analyzer",
    "tokenomics-architect",
    "crypto-meme-maker",
    "code-summarizer",
    "pitch-polisher",
    "dao-governance-wizard",
    "nft-artwork-generator"
  ];
  
  console.log("Registering services...");
  
  for (const serviceId of services) {
    console.log(`Registering service: ${serviceId}`);
    console.log(`Provider address: ${PROVIDER_ADDRESS}`);
    console.log(`Platform fee: ${PLATFORM_FEE}`);
    
    try {
      // Register the service with the provider address from env variables
      const tx = await contract.registerService(
        serviceId,
        PROVIDER_ADDRESS,
        PLATFORM_FEE
      );
      
      console.log(`Transaction hash: ${tx.hash}`);
      console.log("Waiting for confirmation...");
      
      await tx.wait();
      console.log(`Service ${serviceId} registered successfully!`);
    } catch (error) {
      console.error(`Failed to register service ${serviceId}:`, error.message);
      // Continue with other services even if one fails
    }
  }
  
  console.log("Service registration completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });