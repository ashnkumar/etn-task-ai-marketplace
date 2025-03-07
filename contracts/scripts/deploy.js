const hre = require("hardhat");

async function main() {
  console.log("Deploying PaymentHandler contract to Electroneum testnet...");

  const PaymentHandler = await hre.ethers.getContractFactory("PaymentHandler");
  const paymentHandler = await PaymentHandler.deploy();

  await paymentHandler.deployed();

  console.log(`PaymentHandler deployed to testnet at: ${paymentHandler.address}`);
  console.log(`Verify with: npx hardhat verify --network electroneum_testnet ${paymentHandler.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 