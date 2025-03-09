// File: contracts/scripts/check-earnings.js
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const AIMarketplace = await hre.ethers.getContractFactory("AIMarketplace");
  const contract = await AIMarketplace.attach(process.env.CONTRACT_ADDRESS);
  
  const PROVIDER_ADDRESS = process.env.PROVIDER_ADDRESS;
  
  if (!PROVIDER_ADDRESS) {
    console.error("Error: PROVIDER_ADDRESS not set in environment variables");
    process.exit(1);
  }
  
  // Check earnings
  const earnings = await contract.getEarnings(PROVIDER_ADDRESS);
  console.log(`Provider earnings: ${ethers.utils.formatEther(earnings)} ETN`);
  
  const platformEarnings = await contract.platformEarnings();
  console.log(`Platform earnings: ${ethers.utils.formatEther(platformEarnings)} ETN`);
  
  // Ask if user wants to withdraw earnings
  if (earnings.gt(0)) {
    console.log("Do you want to withdraw your earnings? [y/N]");
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question('', async (answer) => {
      if (answer.toLowerCase() === 'y') {
        try {
          const tx = await contract.withdrawEarnings();
          console.log("Withdrawal transaction submitted:", tx.hash);
          await tx.wait();
          console.log("Withdrawal successful!");
        } catch (error) {
          console.error("Withdrawal failed:", error.message);
        }
      }
      readline.close();
      process.exit(0);
    });
  } else {
    console.log("No earnings to withdraw.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });