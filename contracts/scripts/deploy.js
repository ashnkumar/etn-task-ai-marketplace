const hre = require("hardhat");

async function main() {
  const environment = process.env.ENVIRONMENT || "testnet";
  const networkName = environment === "mainnet" ? "Electroneum mainnet" : "Electroneum testnet";
  
  console.log(`Deploying AIMarketplace contract to ${networkName}...`);

  const AIMarketplace = await hre.ethers.getContractFactory("AIMarketplace");
  const aiMarketplace = await AIMarketplace.deploy();

  await aiMarketplace.deployed();

  console.log(`AIMarketplace deployed to ${networkName} at: ${aiMarketplace.address}`);
  console.log(`Verify with: npx hardhat verify --network electroneum ${aiMarketplace.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });