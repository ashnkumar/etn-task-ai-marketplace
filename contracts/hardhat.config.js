require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: '../.env' });

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETN_TESTNET_URL = process.env.ETN_TESTNET_URL || "https://rpc.ankr.com/electroneum_testnet";

module.exports = {
  solidity: "0.8.17",
  networks: {
    electroneum_testnet: {
      url: ETN_TESTNET_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 5201420 // Electroneum testnet chain ID
    }
  },
  etherscan: {
    apiKey: process.env.ETN_EXPLORER_API_KEY,
    customChains: [
      {
        network: "electroneum_testnet",
        chainId: 5201420,
        urls: {
          apiURL: "https://testnet-blockexplorer.electroneum.com/api",
          browserURL: "https://testnet-blockexplorer.electroneum.com"
        }
      }
    ]
  }
};