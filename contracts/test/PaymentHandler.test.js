const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaymentHandler", function () {
  let paymentHandler;
  let owner;
  let user;

  beforeEach(async function () {
    // Get signers
    [owner, user] = await ethers.getSigners();
    
    // Deploy contract
    const PaymentHandler = await ethers.getContractFactory("PaymentHandler");
    paymentHandler = await PaymentHandler.deploy();
    await paymentHandler.deployed();
  });

  it("Should set the right owner", async function () {
    expect(await paymentHandler.owner()).to.equal(owner.address);
  });

  it("Should emit event on payment", async function () {
    const promptId = "test-prompt-123";
    const paymentAmount = ethers.utils.parseEther("0.01");
    
    await expect(
      paymentHandler.connect(user).makePayment(promptId, { value: paymentAmount })
    )
      .to.emit(paymentHandler, "PaymentReceived")
      .withArgs(
        user.address, 
        paymentAmount, 
        promptId, 
        await ethers.provider.getBlock().then(b => b.timestamp)
      );
  });
}); 