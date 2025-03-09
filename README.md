# ETN Task AI Marketplace

A decentralized marketplace for AI services powered by Electroneum (ETN) blockchain micropayments. This platform allows users to access various AI-powered tools and services by paying small amounts of ETN cryptocurrency.

## Features

- **Multiple AI Services**: Access various AI tools including code assistants, image generators, text analyzers, and more
- **Micropayments**: Pay small amounts of ETN for each service use
- **Blockchain Integration**: Transparent, secure payment system using Electroneum blockchain
- **Streaming Responses**: Real-time responses for text-based services
- **Multi-environment Support**: Run on both Electroneum testnet and mainnet

## Project Structure

- `/frontend`: Next.js application with the marketplace UI
- `/backend`: Node.js API server that handles payment verification and AI service execution
- `/contracts`: Solidity smart contracts for handling ETN payments 
- `/shared`: Common files shared across services

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) v16 or later
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MetaMask](https://metamask.io/) browser extension
- ETN tokens (testnet or mainnet, depending on deployment)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/etn-task-ai.git
cd etn-task-ai
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..

# Install contract dependencies
cd contracts
npm install
cd ..

# Alternatively, use the script to install all dependencies at once
npm run install-all
```

### 3. Set Up Environment Variables

The project uses environment files to configure different deployment environments (testnet/mainnet). You'll need to set up these files:

#### Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `.env` and set the following variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `CONTRACT_ADDRESS`: The deployed contract address (leave empty for now if deploying a new contract)
- `ENVIRONMENT`: Set to "testnet" for development or "mainnet" for production

#### Frontend Configuration

```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local` and set the following variables:
- `NEXT_PUBLIC_CONTRACT_ADDRESS`: The deployed contract address (leave empty for now if deploying a new contract)
- `NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID`: 5201420 for testnet, 52014 for mainnet
- `NEXT_PUBLIC_ENV`: Set to "testnet" for development or "mainnet" for production

#### Contracts Configuration

```bash
cd contracts
cp .env.example .env
```

Edit `.env` and set the following variables:
- `PRIVATE_KEY`: Your wallet's private key (for contract deployment)
- `PROVIDER_ADDRESS`: The wallet address that will receive service fees
- `ENVIRONMENT`: Set to "testnet" for development or "mainnet" for production

### 4. Deploy Smart Contract

You need to deploy the smart contract to the Electroneum blockchain:

```bash
cd contracts

# Compile the contract
npx hardhat compile

# Deploy to testnet (default)
npx hardhat run scripts/deploy.js --network electroneum

# Or deploy to mainnet (make sure ENVIRONMENT=mainnet in .env)
# npx hardhat run scripts/deploy.js --network electroneum
```

After deployment, save the contract address and update all `.env` files.

### 5. Register Services

Once the contract is deployed, register the available services:

```bash
cd contracts
npx hardhat run scripts/register-services.js --network electroneum
```

Verify the services were registered successfully:

```bash
npx hardhat run scripts/check-services.js --network electroneum
```

### 6. Start Development Servers

In separate terminal windows, start the backend and frontend servers:

```bash
# Start backend server (http://localhost:4000)
cd backend
npm run dev

# Start frontend server (http://localhost:3000)
cd frontend
npm run dev

# Or use the combined script from the root directory
npm run dev
```

Now, you can access the marketplace at [http://localhost:3000](http://localhost:3000)

## Using the ETN Task AI Marketplace

### 1. Connect Your Wallet

1. Visit [http://localhost:3000](http://localhost:3000)
2. Click "Connect Wallet" in the top right corner
3. Approve the connection in MetaMask
4. If prompted, switch to the Electroneum network

### 2. Set Up Electroneum Network in MetaMask

If you haven't added the Electroneum network to MetaMask, the app will prompt you to add it. Alternatively, you can add it manually:

#### Electroneum Testnet
- Network Name: Electroneum Testnet
- RPC URL: https://rpc.ankr.com/electroneum_testnet
- Chain ID: 5201420
- Currency Symbol: ETN
- Block Explorer URL: https://testnet-blockexplorer.electroneum.com

#### Electroneum Mainnet
- Network Name: Electroneum Mainnet
- RPC URL: https://rpc.ankr.com/electroneum
- Chain ID: 52014
- Currency Symbol: ETN
- Block Explorer URL: https://blockexplorer.electroneum.com

### 3. Getting Testnet ETN

For testing on testnet, you can get free testnet ETN from:
- Electroneum Testnet Faucet (if available)
- Contact the Electroneum community or team for testnet tokens

### 4. Using AI Services

1. Browse the available services on the marketplace homepage
2. Click on a service to view details
3. Enter your input or upload a file (if supported)
4. Click "Process" and confirm the ETN payment in MetaMask
5. Wait for the transaction to be confirmed on the blockchain
6. View your results and download if applicable

## Deployment Options

### Testnet vs. Mainnet

The project supports both testnet and mainnet deployment. For a testnet deployment, make sure all environment files use:
- `ENVIRONMENT=testnet`
- `NEXT_PUBLIC_ENV=testnet`
- `NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID=5201420`

For mainnet, use:
- `ENVIRONMENT=mainnet`
- `NEXT_PUBLIC_ENV=mainnet`
- `NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID=52014`

### Quick Deployment Script

The repository includes a script to streamline deployment:

```bash
./deploy.sh [testnet|mainnet]
```

This script:
1. Sets up the appropriate environment
2. Deploys the contract
3. Updates configuration files with the deployed contract address
4. Registers services

## Troubleshooting

### MetaMask Connection Issues

- Ensure MetaMask is unlocked
- Check that you're connected to the correct Electroneum network
- Try refreshing the page or disconnecting and reconnecting

### Transaction Failures

- Ensure you have enough ETN for gas fees plus the service cost
- Check that the contract address in your environment files matches the deployed contract
- Verify that services were properly registered on the contract

### Backend API Errors

- Check that your OpenAI API key is valid
- Ensure the backend is running and accessible from the frontend
- Verify that the contract address matches between frontend and backend

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Electroneum for the blockchain platform
- OpenAI for the AI APIs
- shadcn/ui for the UI components
- Hardhat for the smart contract development framework