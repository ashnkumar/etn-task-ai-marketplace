const hre = require("hardhat");

async function main() {
  const environment = process.env.ENVIRONMENT || "testnet";
  const networkName = environment === "mainnet" ? "Electroneum mainnet" : "Electroneum testnet";
  
  console.log(`Deploying PaymentHandler contract to ${networkName}...`);

  const PaymentHandler = await hre.ethers.getContractFactory("PaymentHandler");
  const paymentHandler = await PaymentHandler.deploy();

  await paymentHandler.deployed();

  console.log(`PaymentHandler deployed to ${networkName} at: ${paymentHandler.address}`);
  console.log(`Verify with: npx hardhat verify --network electroneum ${paymentHandler.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 