require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETN_TESTNET_URL = process.env.ETN_TESTNET_URL || "https://rpc.ankr.com/electroneum_testnet";
const ETN_MAINNET_URL = process.env.ETN_MAINNET_URL || "https://rpc.ankr.com/electroneum";
const ENVIRONMENT = process.env.ENVIRONMENT || "testnet";

// Choose network URL based on environment
const ETN_RPC_URL = ENVIRONMENT === "mainnet" ? ETN_MAINNET_URL : ETN_TESTNET_URL;
const CHAIN_ID = ENVIRONMENT === "mainnet" ? 52014 : 5201420;

module.exports = {
  solidity: "0.8.17",
  networks: {
    electroneum: {
      url: ETN_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: CHAIN_ID
    }
  },
  etherscan: {
    apiKey: process.env.ETN_EXPLORER_API_KEY,
    customChains: [
      {
        network: "electroneum",
        chainId: CHAIN_ID,
        urls: {
          apiURL: ENVIRONMENT === "mainnet" 
            ? "https://blockexplorer.electroneum.com/api" 
            : "https://testnet-blockexplorer.electroneum.com/api",
          browserURL: ENVIRONMENT === "mainnet" 
            ? "https://blockexplorer.electroneum.com" 
            : "https://testnet-blockexplorer.electroneum.com"
        }
      }
    ]
  }
};