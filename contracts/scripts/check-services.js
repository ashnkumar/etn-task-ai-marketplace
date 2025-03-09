// File: contracts/scripts/check-services.js
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const contract = await hre.ethers.getContractFactory("AIMarketplace")
    .then(factory => factory.attach(process.env.CONTRACT_ADDRESS));
  
  // List of service IDs to check
  const serviceIds = [
    "smart-contract-auditor",
    "defi-risk-analyzer",
    "tokenomics-architect",
    "crypto-meme-maker",
    "code-summarizer",
    "pitch-polisher",
    "dao-governance-wizard",
    "nft-artwork-generator"
  ];
  
  console.log("Checking registered services...");
  console.log(`Contract address: ${process.env.CONTRACT_ADDRESS}`);
  
  for (const serviceId of serviceIds) {
    try {
      const serviceDetails = await contract.getServiceDetails(serviceId);
      console.log(`✅ Service "${serviceId}" is registered:`);
      console.log(`   Provider: ${serviceDetails.provider}`);
      console.log(`   Fee %: ${serviceDetails.feePercent.toString()}`);
      console.log(`   Active: ${serviceDetails.active}`);
    } catch (error) {
      console.log(`❌ Service "${serviceId}" is NOT registered or has an error:`);
      console.log(`   ${error.message}`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  }); 