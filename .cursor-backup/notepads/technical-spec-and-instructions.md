# Technical Specification: ETN AI Services Marketplace

## Phase 0: Project Setup

This phase covers the initial setup of the project structure, dependencies, and configuration files.

### 0.1 Create Project Directory Structure

**Implementation Details**:
```bash
# Create the main project directory
mkdir etn-task-ai
cd etn-task-ai

# Create subdirectories
mkdir -p frontend backend contracts
```

**Definition of Done**:
- Project directory created with frontend, backend, and contracts subdirectories

### 0.2 Initialize Git Repository

**Implementation Details**:
```bash
# Initialize Git
git init

# Create a .gitignore file
cat > .gitignore << EOL
# Dependencies
node_modules/
.pnp/
.pnp.js

# Environment variables
.env
.env.*
!.env.example

# Build directories
.next/
dist/
build/
out/

# Log files
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
.DS_Store
*.pem
coverage/
.vscode/
EOL
```

**Definition of Done**:
- Git repository initialized
- .gitignore file created with appropriate patterns

### 0.3 Copy Frontend Code from v0 Repository

**Implementation Details**:
Copy all files from the `etn-task-ai-v0` repository to the `frontend` directory:

```bash
# Assuming you have the v0 repo cloned or downloaded
cp -R /path/to/etn-task-ai-v0/* frontend/

# Note: If there are any hidden files (.env, .gitignore, etc.), copy them separately
cp -R /path/to/etn-task-ai-v0/.* frontend/

# Add shadcn/ui components (since you mentioned they weren't synced)
# You'll need to manually copy or install these
```

For the missing UI components folder, you should install the shadcn/ui components:

```bash
cd frontend
# Install dependencies first if they're not already installed
npm install
# Add shadcn/ui components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add label
# Add other components as needed
```

**Definition of Done**:
- Frontend code from v0 repository copied to the frontend directory
- shadcn/ui components installed or copied

### 0.4 Configure Frontend Environment Variables

**Implementation Details**:
Create a `.env.local` file in the frontend directory:

```bash
cd frontend
cat > .env.local << EOL
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api
NEXT_PUBLIC_CONTRACT_ADDRESS=""
NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID=5201420
NEXT_PUBLIC_ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet
NEXT_PUBLIC_ENV=testnet
EOL
```

Also create a `.env.example` as a template:

```bash
cat > .env.example << EOL
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api
NEXT_PUBLIC_CONTRACT_ADDRESS=""
NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID=5201420
NEXT_PUBLIC_ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet
NEXT_PUBLIC_ENV=testnet
EOL
```

**Definition of Done**:
- Frontend environment variables configured
- .env.example file created as a template

### 0.5 Copy Relevant Backend Code from Original Chatbot Project

**Implementation Details**:
Copy essential backend files from the `etn-micropay-ai/backend` directory:

```bash
# Assuming you have the original chatbot repo cloned or downloaded
mkdir -p backend/src/controllers backend/src/routes backend/src/utils

# Copy package.json and modify as needed
cp /path/to/etn-micropay-ai/backend/package.json backend/

# Copy essential source files
cp /path/to/etn-micropay-ai/backend/src/index.ts backend/src/
cp /path/to/etn-micropay-ai/backend/src/routes/* backend/src/routes/
cp /path/to/etn-micropay-ai/backend/src/controllers/* backend/src/controllers/
cp /path/to/etn-micropay-ai/backend/src/utils/* backend/src/utils/

# Create a tsconfig.json if not copied
cat > backend/tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
EOL
```

**Definition of Done**:
- Essential backend code copied from the original chatbot project
- Directory structure set up correctly
- tsconfig.json file created if needed

### 0.6 Configure Backend Environment Variables

**Implementation Details**:
Create a `.env` file in the backend directory:

```bash
cd backend
cat > .env << EOL
PORT=4000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key
CONTRACT_ADDRESS=""
ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum
ENVIRONMENT=testnet
EOL
```

Also create a `.env.example` as a template:

```bash
cat > .env.example << EOL
PORT=4000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key
CONTRACT_ADDRESS=""
ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum
ENVIRONMENT=testnet
EOL
```

**Definition of Done**:
- Backend environment variables configured
- .env.example file created as a template

### 0.7 Copy Smart Contract Code from Original Chatbot Project

**Implementation Details**:
Copy the smart contract files from the `etn-micropay-ai/contracts` directory:

```bash
# Copy Hardhat configuration and scripts
cp /path/to/etn-micropay-ai/contracts/hardhat.config.js contracts/
cp /path/to/etn-micropay-ai/contracts/package.json contracts/

# Create contracts directory structure
mkdir -p contracts/contracts contracts/scripts contracts/test

# Copy contract, deployment script, and tests
cp /path/to/etn-micropay-ai/contracts/contracts/PaymentHandler.sol contracts/contracts/
cp /path/to/etn-micropay-ai/contracts/scripts/deploy.js contracts/scripts/
cp /path/to/etn-micropay-ai/contracts/test/* contracts/test/

# Create a .env file for contract deployment
cat > contracts/.env << EOL
PRIVATE_KEY=your_wallet_private_key
ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum
ETN_EXPLORER_API_KEY=your_explorer_api_key
ENVIRONMENT=testnet
EOL

# Create .env.example
cat > contracts/.env.example << EOL
PRIVATE_KEY=your_wallet_private_key
ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum
ETN_EXPLORER_API_KEY=your_explorer_api_key
ENVIRONMENT=testnet
EOL
```

**Definition of Done**:
- Smart contract code copied from the original chatbot project
- Directory structure set up correctly
- Environment files created

### 0.8 Create Root package.json for Project-wide Commands

**Implementation Details**:
Create a package.json file in the root directory with scripts to run all components:

```bash
cd ..  # Back to project root
cat > package.json << EOL
{
  "name": "etn-task-ai",
  "version": "1.0.0",
  "description": "AI Services Marketplace powered by Electroneum micropayments",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "frontend": "cd frontend && npm run dev",
    "backend": "cd backend && npm run dev",
    "dev": "concurrently \\"npm run backend\\" \\"npm run frontend\\"",
    "install-all": "npm install && cd frontend && npm install && cd ../backend && npm install && cd ../contracts && npm install"
  },
  "keywords": [
    "electroneum",
    "blockchain",
    "ai",
    "marketplace"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
EOL
```

**Definition of Done**:
- Root package.json created with scripts to run frontend, backend, and combined dev environment
- Concurrently package added as a dev dependency

### 0.9 Create Project README

**Implementation Details**:
Create a README.md file in the root directory:

```bash
cat > README.md << EOL
# ETN Task AI - AI Services Marketplace

A marketplace for AI services powered by Electroneum micropayments, allowing users to pay small amounts of ETN cryptocurrency to access various AI-powered tools and services.

## Repository Structure

- \`/frontend\`: Next.js application with the marketplace UI
- \`/backend\`: Node.js API server that handles payment verification and AI service execution
- \`/contracts\`: Solidity smart contracts for handling ETN payments

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- MetaMask wallet with ETN on testnet
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm run install-all
\`\`\`

3. Configure environment variables:
   - Copy all .env.example files to .env in each directory (frontend, backend, contracts)
   - Fill in required values such as API keys and wallet private key

### Development

Run the application in development mode:

\`\`\`bash
npm run dev
\`\`\`

This will start both the frontend (localhost:3000) and backend (localhost:4000).

## License

[MIT](LICENSE)
EOL
```

**Definition of Done**:
- README.md created with project description, structure, and setup instructions



# Technical Specification: ETN AI Services Marketplace

## Phase 1: Smart Contract Development

This phase covers reviewing, updating, and deploying the smart contract that will handle micropayments for the various AI services.

### 1.1 Install Contract Dependencies

**Implementation Details**:
```bash
# Navigate to the contracts directory
cd contracts

# Install dependencies
npm install
```

**Definition of Done**:
- All dependencies listed in package.json are installed without errors

### 1.2 Review and Update the PaymentHandler Contract

**Implementation Details**:
Review the existing `PaymentHandler.sol` contract and ensure it meets the requirements for the marketplace. It should be minimal and only handle the payment functionality.

The contract should already be in `contracts/contracts/PaymentHandler.sol` from our setup phase. Here's what it should look like:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentHandler {
    address public owner;
    
    // Event emitted when a payment is received
    event PaymentReceived(
        address indexed sender,
        uint256 amount,
        string promptId,
        uint256 timestamp
    );
    
    constructor() {
        owner = msg.sender;
    }
    
    // Function to receive payment and emit event
    function makePayment(string memory promptId) external payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        
        emit PaymentReceived(
            msg.sender,
            msg.value,
            promptId,
            block.timestamp
        );
    }
    
    // Function to withdraw funds (only owner)
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
```

This contract is simple and focused:
1. It accepts ETN payments with an associated promptId
2. It emits a PaymentReceived event with payment details
3. It allows the owner to withdraw funds

No changes are needed for the marketplace implementation as this contract is already general enough to handle any service type (not just chatbot prompts). The promptId parameter can be used to identify any type of service request.

**Definition of Done**:
- PaymentHandler.sol contract reviewed and confirmed suitable for the marketplace
- Contract compiles without errors

### 1.3 Update Hardhat Configuration for Flexibility

**Implementation Details**:
Modify the `hardhat.config.js` file to support both testnet and mainnet deployments, controlled by an environment variable:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETN_TESTNET_URL = process.env.ETN_TESTNET_URL || "https://rpc.ankr.com/electroneum_testnet";
const ETN_MAINNET_URL = process.env.ETN_MAINNET_URL || "https://rpc.ankr.com/electroneum";
const ENVIRONMENT = process.env.ENVIRONMENT || "testnet";

// Choose network URL based on environment
const ETN_RPC_URL = ENVIRONMENT === "mainnet" ? ETN_MAINNET_URL : ETN_TESTNET_URL;
const CHAIN_ID = ENVIRONMENT === "mainnet" ? 5201421 : 5201420; // Mainnet: 5201421, Testnet: 5201420

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
```

**Definition of Done**:
- hardhat.config.js updated to support both testnet and mainnet deployments
- Configuration selects the appropriate network based on the ENVIRONMENT variable

### 1.4 Update Deployment Script for Flexibility

**Implementation Details**:
Modify the deployment script (`scripts/deploy.js`) to work with our updated configuration:

```javascript
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
```

**Definition of Done**:
- deploy.js updated to support deployment to both testnet and mainnet
- Script includes logging that clearly indicates which network is being used

### 1.5 Compile Smart Contract

**Implementation Details**:
Compile the smart contract to ensure it's working:

```bash
# Navigate to the contracts directory (if not already there)
cd contracts

# Compile the contract
npx hardhat compile
```

**Definition of Done**:
- Contract compiles successfully without errors
- Artifacts are generated in the artifacts directory

### 1.6 Run Contract Tests

**Implementation Details**:
Run the existing tests to ensure the contract behaves as expected:

```bash
# Run the tests
npx hardhat test
```

The tests should include at least:
- Verifying that the owner is set correctly
- Testing the makePayment function with a valid promptId
- Testing the event emission
- Testing the withdrawal function

If the tests need to be updated, ensure they cover these basic functionalities.

**Definition of Done**:
- All tests pass successfully
- Tests cover basic contract functionality

### 1.7 Deploy to Electroneum Testnet

**Implementation Details**:
Deploy the contract to the Electroneum testnet:

```bash
# Make sure your .env file has the correct values
# PRIVATE_KEY=your_wallet_private_key with testnet ETN
# ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet
# ENVIRONMENT=testnet

# Deploy the contract
npx hardhat run scripts/deploy.js --network electroneum
```

Note the contract address that is output by the deployment script.

**Definition of Done**:
- Contract deployed successfully to Electroneum testnet
- Contract address recorded for use in the frontend and backend

### 1.8 Verify Contract on Testnet Explorer

**Implementation Details**:
Verify the contract on the Electroneum testnet explorer:

```bash
# Make sure ETN_EXPLORER_API_KEY is set in your .env file
npx hardhat verify --network electroneum <DEPLOYED_CONTRACT_ADDRESS>
```

**Definition of Done**:
- Contract verified successfully on Electroneum testnet explorer
- Contract is visible and its code is viewable on the explorer

### 1.9 Update Environment Files with Contract Address

**Implementation Details**:
Update the environment files in both frontend and backend with the deployed contract address:

```bash
# Update backend/.env
sed -i '' "s|CONTRACT_ADDRESS=.*|CONTRACT_ADDRESS=<DEPLOYED_CONTRACT_ADDRESS>|" backend/.env

# Update frontend/.env.local
sed -i '' "s|NEXT_PUBLIC_CONTRACT_ADDRESS=.*|NEXT_PUBLIC_CONTRACT_ADDRESS=<DEPLOYED_CONTRACT_ADDRESS>|" frontend/.env.local
```

Replace `<DEPLOYED_CONTRACT_ADDRESS>` with the actual address from step 1.7.

Note: The `sed` command syntax may vary by operating system. For macOS, use the command as shown. For Linux, remove the empty quotes after `-i`.

**Definition of Done**:
- Backend environment file updated with contract address
- Frontend environment file updated with contract address

### 1.10 Create Contract ABI JavaScript Module

**Implementation Details**:
Extract the contract ABI from the compilation artifacts and create a JavaScript module to be used by the frontend and backend.

```bash
# Navigate to the project root
cd ..

# Create a shared directory for contract ABIs
mkdir -p shared/contracts

# Extract the ABI and create a JavaScript module
cat > shared/contracts/PaymentHandler.js << EOL
const PaymentHandlerABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "promptId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "PaymentReceived",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "promptId",
        "type": "string"
      }
    ],
    "name": "makePayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || process.env.CONTRACT_ADDRESS;

module.exports = {
  PaymentHandlerABI,
  CONTRACT_ADDRESS
};
EOL

# Create symbolic links to the shared directory for frontend and backend
ln -s ../shared frontend/shared
ln -s ../shared backend/shared
```

**Definition of Done**:
- PaymentHandler.js created with the contract ABI
- Symbolic links created in frontend and backend directories



# Technical Specification: ETN AI Services Marketplace

## Phase 2: Backend Development

This phase focuses on setting up the backend API that will handle service requests, payment verification, and integration with AI services.

### 2.1 Install Backend Dependencies

**Implementation Details**:
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Install additional dependencies needed for the marketplace
npm install --save uuid axios cors dotenv express ethers@5.7.2 openai
npm install --save-dev typescript ts-node @types/express @types/cors @types/node @types/uuid nodemon
```

**Definition of Done**:
- All dependencies installed without errors

### 2.2 Create Services Configuration

**Implementation Details**:
Create a configuration file for our marketplace services:

```bash
mkdir -p src/config

cat > src/config/services.ts << EOL
// Service types
export type ServiceType = 'text' | 'image' | 'code' | 'data';

// Service interface
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string; // ETN amount as string, e.g., "0.05"
  priceModel: 'fixed' | 'variable';
  type: ServiceType;
  mockResponses?: Record<string, string>; // For development/testing
  aiModel?: string; // e.g., "gpt-4o-mini" for OpenAI
  supportedFiles?: string[]; // File extensions supported by this service
  maxInputLength?: number; // Maximum input length in characters
}

// Available services
export const services: Service[] = [
  {
    id: "language-translator",
    name: "Language Translator",
    description: "Translate text between over 100 languages with high accuracy.",
    basePrice: "0.05",
    priceModel: "variable",
    type: "text",
    aiModel: "gpt-4o-mini",
    mockResponses: {
      "Translate to French: Hello, how are you?": "Bonjour, comment allez-vous?",
      "Translate to Spanish: I love artificial intelligence": "Me encanta la inteligencia artificial",
    }
  },
  {
    id: "image-generator",
    name: "AI Image Generator",
    description: "Create stunning images from text descriptions.",
    basePrice: "0.20",
    priceModel: "fixed",
    type: "image",
    aiModel: "dall-e-3"
  },
  {
    id: "content-writer",
    name: "Content Writer",
    description: "Generate high-quality articles, blog posts, and marketing copy.",
    basePrice: "0.15",
    priceModel: "variable",
    type: "text",
    aiModel: "gpt-4o-mini",
    maxInputLength: 1000,
    mockResponses: {
      "Write a short blog post about AI and blockchain": "# The Convergence of AI and Blockchain\\n\\nIn recent years, two technologies have emerged as revolutionary forces: artificial intelligence (AI) and blockchain. While they developed independently, their convergence is creating powerful new possibilities.\\n\\nBlockchain provides the decentralized, transparent infrastructure that can address many concerns about AI, including data privacy and algorithm transparency. Meanwhile, AI can enhance blockchain networks with advanced analytics and automated decision-making.\\n\\nProjects combining these technologies are already emerging in various industries:\\n\\n- **Finance**: AI-powered trading on decentralized exchanges\\n- **Healthcare**: Secure, private patient data analysis\\n- **Supply Chain**: Intelligent tracking and verification of goods\\n\\nAs these technologies mature together, we'll see unprecedented applications that leverage the security of blockchain with the intelligence of AI.",
    }
  },
  {
    id: "code-assistant",
    name: "Code Assistant",
    description: "Get help with programming tasks, debugging, and code optimization.",
    basePrice: "0.10",
    priceModel: "variable",
    type: "code",
    aiModel: "gpt-4o-mini",
    supportedFiles: [".js", ".ts", ".py", ".java", ".c", ".cpp"],
    mockResponses: {
      "Write a JavaScript function to sort an array of objects by a property": "```javascript\\nfunction sortArrayByProperty(array, property) {\\n  return array.sort((a, b) => {\\n    if (a[property] < b[property]) return -1;\\n    if (a[property] > b[property]) return 1;\\n    return 0;\\n  });\\n}\\n\\n// Example usage:\\n// const people = [\\n//   { name: 'John', age: 30 },\\n//   { name: 'Alice', age: 25 },\\n//   { name: 'Bob', age: 35 }\\n// ];\\n// const sortedByAge = sortArrayByProperty(people, 'age');\\n// console.log(sortedByAge);\\n```",
    }
  },
  {
    id: "data-analyzer",
    name: "Data Analyzer",
    description: "Extract insights from your data with ML-powered analysis.",
    basePrice: "0.25",
    priceModel: "variable",
    type: "data",
    supportedFiles: [".csv", ".json", ".xlsx"],
    mockResponses: {
      "Analyze this data and provide insights": "## Data Analysis Results\\n\\n### Summary Statistics\\n- **Records**: 1,245\\n- **Time Period**: Jan 2023 - Dec 2023\\n- **Key Metrics**: Revenue increased by 15% year-over-year\\n\\n### Key Findings\\n1. Customer retention improved in Q4 2023\\n2. Product A shows highest growth potential\\n3. Markets in Europe outperforming North America\\n\\n### Recommendations\\n- Increase marketing budget for Product A\\n- Investigate decline in North American market\\n- Focus retention efforts on high-value customer segment",
    }
  }
];

// Function to get a service by ID
export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

// Price calculation function
export function calculatePrice(service: Service, inputLength: number = 0): string {
  if (service.priceModel === 'fixed') {
    return service.basePrice;
  }
  
  // Basic variable pricing based on input length
  const basePrice = parseFloat(service.basePrice);
  
  if (inputLength <= 100) {
    return basePrice.toString();
  } else if (inputLength <= 500) {
    return (basePrice * 1.5).toFixed(2);
  } else {
    return (basePrice * 2).toFixed(2);
  }
}
EOL
```

**Definition of Done**:
- services.ts file created with service definitions
- Service interface and helper functions implemented

### 2.3 Update Blockchain Utility for Payment Verification

**Implementation Details**:
Modify or create the blockchain utility to verify payments for our marketplace services:

```bash
mkdir -p src/utils

cat > src/utils/blockchain.ts << EOL
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { PaymentHandlerABI, CONTRACT_ADDRESS } from '../../shared/contracts/PaymentHandler';

dotenv.config();

// Select the appropriate RPC URL based on environment
const ENVIRONMENT = process.env.ENVIRONMENT || 'testnet';
const RPC_URL = ENVIRONMENT === 'mainnet' 
  ? process.env.ETN_MAINNET_URL 
  : process.env.ETN_TESTNET_URL;

// Provider setup
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// Create contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS!, PaymentHandlerABI, provider);

// Map to store payments that have been verified
const verifiedPayments = new Map<string, boolean>();

// Function to check if a payment exists for a requestId
export const checkPayment = async (requestId: string): Promise<boolean> => {
  // If we've already verified this payment, return true immediately
  if (verifiedPayments.get(requestId)) {
    return true;
  }

  try {
    // Get the current block number
    const currentBlock = await provider.getBlockNumber();
    
    // Look for events in the last 100 blocks (adjust as needed)
    // Electroneum has ~5 second blocks, so 100 blocks is ~8.3 minutes
    const fromBlock = Math.max(0, currentBlock - 100);
    
    console.log(\`Checking for payments from block \${fromBlock} to \${currentBlock} for requestId: \${requestId}\`);
    
    // Query for PaymentReceived events
    const events = await contract.queryFilter(
      contract.filters.PaymentReceived(null, null, null, null),
      fromBlock,
      currentBlock
    );
    
    // Check if any event matches our requestId
    const found = events.some(event => {
      const args = event.args;
      if (args && args.promptId === requestId) {
        console.log(\`Found payment for requestId \${requestId} in transaction \${event.transactionHash}\`);
        return true;
      }
      return false;
    });
    
    // If found, store in our map for future quick lookups
    if (found) {
      verifiedPayments.set(requestId, true);
      return true;
    }
    
    // If using development mode and no payment found, simulate a successful payment 50% of the time
    if (process.env.NODE_ENV === 'development' && Math.random() > 0.5) {
      console.log(\`Development mode: Simulating payment success for requestId \${requestId}\`);
      verifiedPayments.set(requestId, true);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking payment:', error);
    
    // In development mode, sometimes return true to allow testing
    if (process.env.NODE_ENV === 'development' && Math.random() > 0.7) {
      console.log(\`Development mode: Simulating payment success despite error\`);
      verifiedPayments.set(requestId, true);
      return true;
    }
    
    return false;
  }
};

// Function to listen for new payment events
export const startPaymentListener = () => {
  console.log("Starting payment event listener...");
  console.log("Using contract address:", CONTRACT_ADDRESS);
  
  // Set up event listener for real-time payment notifications
  try {
    contract.on("PaymentReceived", (sender, amount, requestId, timestamp) => {
      console.log(\`Payment received: \${ethers.utils.formatEther(amount)} ETN\`);
      console.log(\`From: \${sender}\`);
      console.log(\`For request: \${requestId}\`);
      console.log(\`At timestamp: \${new Date(timestamp.toNumber() * 1000).toISOString()}\`);
      
      // Store the payment in our map
      verifiedPayments.set(requestId, true);
    });
    
    console.log("Payment listener started successfully");
  } catch (error) {
    console.error("Error starting payment listener:", error);
    console.log("Running in fallback mode - will check for payments on demand");
  }
};
EOL
```

**Definition of Done**:
- blockchain.ts file created with payment verification functions
- Event listener for PaymentReceived events implemented

### 2.4 Create AI Service Handler

**Implementation Details**:
Create a utility to handle different AI service requests:

```bash
cat > src/utils/aiService.ts << EOL
import { Configuration, OpenAIApi } from 'openai';
import { Service, getServiceById } from '../config/services';
import dotenv from 'dotenv';

dotenv.config();

// OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to process a service request
export const processServiceRequest = async (
  serviceId: string,
  input: string,
  options: any = {}
): Promise<any> => {
  // Get service config
  const service = getServiceById(serviceId);
  
  if (!service) {
    throw new Error(\`Service \${serviceId} not found\`);
  }
  
  // Check for mock responses in development mode
  if (process.env.NODE_ENV === 'development' && service.mockResponses && service.mockResponses[input]) {
    console.log(\`Using mock response for service \${serviceId}\`);
    return { 
      result: service.mockResponses[input],
      serviceType: service.type
    };
  }
  
  // Process the request based on service type
  try {
    switch (service.type) {
      case 'text':
        return await processTextService(service, input, options);
      case 'image':
        return await processImageService(service, input, options);
      case 'code':
        return await processCodeService(service, input, options);
      case 'data':
        return await processDataService(service, input, options);
      default:
        throw new Error(\`Unsupported service type: \${service.type}\`);
    }
  } catch (error) {
    console.error(\`Error processing \${service.type} service:, error\`);
    
    // Fallback to mock response if available
    if (service.mockResponses && service.mockResponses[input]) {
      console.log(\`Falling back to mock response for service \${serviceId}\`);
      return { 
        result: service.mockResponses[input],
        serviceType: service.type
      };
    }
    
    throw error;
  }
};

// Process text-based services (chatbot, translation, content writing)
async function processTextService(service: Service, input: string, options: any): Promise<any> {
  // Use OpenAI API
  const completion = await openai.createChatCompletion({
    model: service.aiModel || "gpt-4o-mini",
    messages: [{ role: "user", content: input }],
    temperature: options.temperature || 0.7,
    max_tokens: options.maxTokens || 500,
  });
  
  return { 
    result: completion.data.choices[0].message?.content || "No response generated",
    serviceType: 'text'
  };
}

// Process image-based services (image generation)
async function processImageService(service: Service, input: string, options: any): Promise<any> {
  // Use DALL-E API
  const response = await openai.createImage({
    prompt: input,
    n: 1,
    size: options.size || "512x512",
  });
  
  return { 
    result: response.data.data[0].url || "No image generated",
    serviceType: 'image'
  };
}

// Process code-based services
async function processCodeService(service: Service, input: string, options: any): Promise<any> {
  // Use OpenAI with code-specific prompt
  const codePrompt = \`Write code in response to this request. Format your response with proper syntax highlighting with markdown code blocks: \${input}\`;
  
  const completion = await openai.createChatCompletion({
    model: service.aiModel || "gpt-4o-mini",
    messages: [{ role: "user", content: codePrompt }],
    temperature: options.temperature || 0.3, // Lower temperature for code
    max_tokens: options.maxTokens || 1000,
  });
  
  return { 
    result: completion.data.choices[0].message?.content || "No code generated",
    serviceType: 'code'
  };
}

// Process data analysis services
async function processDataService(service: Service, input: string, options: any): Promise<any> {
  // For now, handle data analysis using text models
  // In a real implementation, this would be more sophisticated
  const dataPrompt = \`Analyze the following data and provide insights: \${input}\`;
  
  const completion = await openai.createChatCompletion({
    model: service.aiModel || "gpt-4o-mini",
    messages: [{ role: "user", content: dataPrompt }],
    temperature: options.temperature || 0.5,
    max_tokens: options.maxTokens || 1000,
  });
  
  return { 
    result: completion.data.choices[0].message?.content || "No analysis generated",
    serviceType: 'data'
  };
}
EOL
```

**Definition of Done**:
- aiService.ts file created with service processing functions
- Support for different service types (text, image, code, data)
- Fallback to mock responses for development

### 2.5 Create Request ID Generator Utility

**Implementation Details**:
Create a utility to generate unique request IDs for service requests:

```bash
cat > src/utils/requestId.ts << EOL
import { v4 as uuidv4 } from 'uuid';

// Generate a unique request ID
export function generateRequestId(prefix = 'req'): string {
  return \`\${prefix}-\${uuidv4().substring(0, 8)}\`;
}
EOL
```

**Definition of Done**:
- requestId.ts file created with requestId generation function

### 2.6 Create Controllers for API Endpoints

**Implementation Details**:
Create controllers for our API endpoints:

```bash
mkdir -p src/controllers

cat > src/controllers/serviceController.ts << EOL
import { Request, Response } from 'express';
import { generateRequestId } from '../utils/requestId';
import { checkPayment } from '../utils/blockchain';
import { processServiceRequest } from '../utils/aiService';
import { getServiceById, calculatePrice, services } from '../config/services';

// Controller methods
const serviceController = {
  // List all available services
  listServices: (req: Request, res: Response): void => {
    res.status(200).json({ 
      services: services.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        basePrice: service.basePrice,
        type: service.type
      }))
    });
  },
  
  // Get details for a specific service
  getServiceDetails: (req: Request, res: Response): void => {
    const { serviceId } = req.params;
    
    const service = getServiceById(serviceId);
    
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    
    res.status(200).json({ 
      service: {
        id: service.id,
        name: service.name,
        description: service.description,
        basePrice: service.basePrice,
        type: service.type,
        supportedFiles: service.supportedFiles || []
      }
    });
  },
  
  // Generate a requestId and estimated cost for a service
  generateRequestId: (req: Request, res: Response): void => {
    const { serviceId, input } = req.body;
    
    if (!serviceId || !input) {
      res.status(400).json({ error: 'ServiceId and input are required' });
      return;
    }
    
    const service = getServiceById(serviceId);
    
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    
    // Generate a unique requestId
    const requestId = generateRequestId(service.id.substring(0, 3));
    
    // Calculate estimated cost based on input length and service
    const estimatedCost = calculatePrice(service, input.length);
    
    res.status(200).json({ 
      requestId,
      estimatedCost: estimatedCost + " ETN"
    });
  },
  
  // Verify payment for a specific requestId
  verifyPayment: async (req: Request, res: Response): Promise<void> => {
    const { requestId } = req.params;
    
    if (!requestId) {
      res.status(400).json({ error: 'RequestId is required' });
      return;
    }
    
    try {
      const isPaid = await checkPayment(requestId);
      
      res.status(200).json({ 
        paid: isPaid
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  },
  
  // Process a service request
  processRequest: async (req: Request, res: Response): Promise<void> => {
    const { serviceId, requestId, input, options } = req.body;
    
    if (!serviceId || !requestId || !input) {
      res.status(400).json({ error: 'ServiceId, requestId, and input are required' });
      return;
    }
    
    // Verify the service exists
    const service = getServiceById(serviceId);
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    
    // Check payment status
    try {
      const isPaid = await checkPayment(requestId);
      
      if (!isPaid) {
        res.status(402).json({ error: 'Payment required', status: 'unpaid' });
        return;
      }
      
      // Process the service request
      const result = await processServiceRequest(serviceId, input, options);
      
      res.status(200).json({ 
        status: 'success',
        ...result
      });
    } catch (error: any) {
      console.error('Error processing service request:', error);
      res.status(500).json({ 
        error: 'Service request failed', 
        message: error.message || 'Unknown error'
      });
    }
  }
};

export default serviceController;
EOL
```

**Definition of Done**:
- serviceController.ts file created with controller methods
- Methods implemented for listing services, getting service details, generating request IDs, verifying payments, and processing requests

### 2.7 Create API Routes

**Implementation Details**:
Create routes for our API endpoints:

```bash
mkdir -p src/routes

cat > src/routes/index.ts << EOL
import { Router } from 'express';
import serviceRoutes from './serviceRoutes';

const router = Router();

router.use('/services', serviceRoutes);

export default router;
EOL

cat > src/routes/serviceRoutes.ts << EOL
import { Router } from 'express';
import serviceController from '../controllers/serviceController';

const router = Router();

// List all services
router.get('/', serviceController.listServices);

// Get details for a specific service
router.get('/:serviceId', serviceController.getServiceDetails);

// Generate a requestId for a service
router.post('/request-id', serviceController.generateRequestId);

// Verify payment for a requestId
router.get('/verify-payment/:requestId', serviceController.verifyPayment);

// Process a service request
router.post('/process', serviceController.processRequest);

export default router;
EOL
```

**Definition of Done**:
- index.ts and serviceRoutes.ts files created with API routes
- Routes defined for all controller methods

### 2.8 Update Main Server File

**Implementation Details**:
Update the main server file to use our new routes and services:

```bash
cat > src/index.ts << EOL
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { startPaymentListener } from './utils/blockchain';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
  
  // Start blockchain event listener
  startPaymentListener();
});

export default app;
EOL
```

**Definition of Done**:
- index.ts file updated with routes and middleware
- Server starts the payment listener when initialized

### 2.9 Setup Development Script

**Implementation Details**:
Configure the package.json scripts for development:

```bash
# Update the scripts section in package.json
cat > package.json << EOL
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "axios": "^1.3.4",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "ethers": "^5.7.2",
    "express": "^4.18.2",
    "openai": "^3.2.1",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/node": "^18.15.11",
    "@types/uuid": "^9.0.1",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.3"
  }
}
EOL
```

**Definition of Done**:
- package.json updated with scripts for development
- Dependencies are properly configured

### 2.10 Test Backend Development Server

**Implementation Details**:
Start the development server and ensure it's running:

```bash
# Start the server
npm run dev
```

Verify that the server starts without errors and that you can access the health check endpoint at http://localhost:4000/health.

**Definition of Done**:
- Server starts without errors
- Health check endpoint returns a 200 status with { status: "ok" }


# Technical Specification: ETN AI Services Marketplace

## Phase 3: Frontend Integration

This phase focuses on connecting our frontend UI to the blockchain and backend API.

### 3.1 Install Additional Frontend Dependencies

**Implementation Details**:
```bash
# Navigate to the frontend directory
cd frontend

# Install additional dependencies needed for blockchain integration
npm install ethers@5.7.2 axios
```

**Definition of Done**:
- Dependencies installed without errors

### 3.2 Create API Service Module

**Implementation Details**:
Create a module to handle API requests to our backend:

```bash
mkdir -p src/lib/api

cat > src/lib/api/index.ts << EOL
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Types
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string;
  type: string;
  supportedFiles?: string[];
}

export interface ServicesResponse {
  services: Service[];
}

export interface ServiceResponse {
  service: Service;
}

export interface RequestIdResponse {
  requestId: string;
  estimatedCost: string;
}

export interface PaymentVerificationResponse {
  paid: boolean;
}

export interface ProcessRequestResponse {
  status: string;
  result: string;
  serviceType: string;
}

// Get all services
export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await axios.get<ServicesResponse>(\`\${API_URL}/services\`);
    return response.data.services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

// Get a specific service
export const getService = async (serviceId: string): Promise<Service | null> => {
  try {
    const response = await axios.get<ServiceResponse>(\`\${API_URL}/services/\${serviceId}\`);
    return response.data.service;
  } catch (error) {
    console.error(\`Error fetching service \${serviceId}:\`, error);
    return null;
  }
};

// Generate a request ID
export const generateRequestId = async (serviceId: string, input: string): Promise<RequestIdResponse | null> => {
  try {
    const response = await axios.post<RequestIdResponse>(\`\${API_URL}/services/request-id\`, {
      serviceId,
      input
    });
    return response.data;
  } catch (error) {
    console.error('Error generating request ID:', error);
    return null;
  }
};

// Verify payment
export const verifyPayment = async (requestId: string): Promise<boolean> => {
  try {
    const response = await axios.get<PaymentVerificationResponse>(\`\${API_URL}/services/verify-payment/\${requestId}\`);
    return response.data.paid;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

// Process a service request
export const processRequest = async (
  serviceId: string,
  requestId: string,
  input: string,
  options: any = {}
): Promise<ProcessRequestResponse | null> => {
  try {
    const response = await axios.post<ProcessRequestResponse>(\`\${API_URL}/services/process\`, {
      serviceId,
      requestId,
      input,
      options
    });
    return response.data;
  } catch (error: any) {
    console.error('Error processing request:', error);
    
    // If the error is a payment required error, return a specific response
    if (error.response?.status === 402) {
      return {
        status: 'unpaid',
        result: 'Payment required',
        serviceType: 'error'
      };
    }
    
    return null;
  }
};
EOL
```

**Definition of Done**:
- API service module created with methods to interact with the backend
- Type definitions created for API responses

### 3.3 Create Blockchain Utility Module

**Implementation Details**:
Create a module to handle blockchain interactions:

```bash
mkdir -p src/lib/blockchain

cat > src/lib/blockchain/index.ts << EOL
import { ethers } from 'ethers';
import { PaymentHandlerABI, CONTRACT_ADDRESS } from '../../shared/contracts/PaymentHandler';

// Check if MetaMask is installed
export const checkIfWalletIsConnected = async (): Promise<string | null> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      console.log("Make sure you have MetaMask installed!");
      return null;
    }
    
    // Check if we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });
    
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.log("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Connect wallet
export const connectWallet = async (): Promise<string | null> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      alert("Please install MetaMask!");
      return null;
    }
    
    // Request account access
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
    console.log("Connected to:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Chain IDs for Electroneum networks
const ELECTRONEUM_TESTNET_CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID || '5201420');
const ELECTRONEUM_MAINNET_CHAIN_ID = 5201421;

// Determine the target chain ID based on environment
const targetChainId = process.env.NEXT_PUBLIC_ENV === 'mainnet' 
  ? ELECTRONEUM_MAINNET_CHAIN_ID 
  : ELECTRONEUM_TESTNET_CHAIN_ID;

// Check if wallet is on the correct Electroneum network
export const checkNetwork = async (): Promise<boolean> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      return false;
    }
    
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(chainId, 16);
    
    console.log("Current Chain ID:", currentChainId);
    console.log("Target Chain ID:", targetChainId);
    
    return currentChainId === targetChainId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Switch to the correct Electroneum network
export const switchToElectroneum = async (): Promise<boolean> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      return false;
    }
    
    const hexChainId = \`0x\${targetChainId.toString(16)}\`;
    const networkName = process.env.NEXT_PUBLIC_ENV === 'mainnet' ? 'Electroneum Mainnet' : 'Electroneum Testnet';
    const rpcUrl = process.env.NEXT_PUBLIC_ENV === 'mainnet' 
      ? 'https://rpc.ankr.com/electroneum' 
      : process.env.NEXT_PUBLIC_ETN_TESTNET_URL;
    const explorerUrl = process.env.NEXT_PUBLIC_ENV === 'mainnet' 
      ? 'https://blockexplorer.electroneum.com' 
      : 'https://testnet-blockexplorer.electroneum.com';
    
    try {
      // Try to switch to the Electroneum network
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: hexChainId,
                chainName: networkName,
                nativeCurrency: {
                  name: 'Electroneum',
                  symbol: 'ETN',
                  decimals: 18,
                },
                rpcUrls: [rpcUrl],
                blockExplorerUrls: [explorerUrl],
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error(addError);
          return false;
        }
      }
      console.error(switchError);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Make payment for a service request
export const makePayment = async (requestId: string, amount: string): Promise<boolean> => {
  try {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      alert("Please install MetaMask!");
      return false;
    }
    
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PaymentHandlerABI, signer);
    
    console.log(\`Making payment of \${amount} ETN for request: \${requestId}\`);
    
    // Convert amount to wei (remove " ETN" suffix if present)
    const cleanAmount = amount.replace(' ETN', '');
    const weiAmount = ethers.utils.parseEther(cleanAmount);
    
    // Make payment
    const tx = await contract.makePayment(requestId, { value: weiAmount });
    
    // Wait for transaction to be mined
    await tx.wait();
    
    console.log("Payment successful:", tx.hash);
    return true;
  } catch (error) {
    console.error("Payment failed:", error);
    return false;
  }
};
EOL
```

**Definition of Done**:
- Blockchain utility module created with wallet connection and payment functions
- Environment-based configuration for testnet/mainnet

### 3.4 Create WalletContext for State Management

**Implementation Details**:
Create a context provider to manage wallet connection state:

```bash
mkdir -p src/context

cat > src/context/WalletContext.tsx << EOL
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { checkIfWalletIsConnected, connectWallet, checkNetwork, switchToElectroneum } from '@/lib/blockchain';

interface WalletContextType {
  walletAddress: string | null;
  isConnecting: boolean;
  isCorrectNetwork: boolean;
  connectWallet: () => Promise<void>;
  switchNetwork: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  isConnecting: false,
  isCorrectNetwork: false,
  connectWallet: async () => {},
  switchNetwork: async () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Initialize: check if wallet is already connected
  useEffect(() => {
    const initWallet = async () => {
      const address = await checkIfWalletIsConnected();
      setWalletAddress(address);
      
      if (address) {
        const correctNetwork = await checkNetwork();
        setIsCorrectNetwork(correctNetwork);
      }
    };
    
    initWallet();
  }, []);

  // Handle wallet connection
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    try {
      const address = await connectWallet();
      setWalletAddress(address);
      
      if (address) {
        const correctNetwork = await checkNetwork();
        setIsCorrectNetwork(correctNetwork);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle network switching
  const handleSwitchNetwork = async () => {
    if (!walletAddress) return;
    
    try {
      const switched = await switchToElectroneum();
      setIsCorrectNetwork(switched);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isConnecting,
        isCorrectNetwork,
        connectWallet: handleConnectWallet,
        switchNetwork: handleSwitchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
EOL
```

**Definition of Done**:
- WalletContext.tsx created with wallet state and functions
- Context provider component ready for use in the app

### 3.5 Update Root Layout to Include WalletProvider

**Implementation Details**:
Modify the root layout to include our WalletProvider:

```bash
# Create or update the layout component
cat > src/app/layout.tsx << EOL
import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { WalletProvider } from "@/context/WalletContext";
import "./globals.css";
import TopBar from "@/components/top-bar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ETN Task AI",
  description: "A marketplace for AI services powered by Electroneum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <WalletProvider>
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
EOL
```

**Definition of Done**:
- Root layout updated to include the WalletProvider
- Component structure maintained with TopBar and Footer

### 3.6 Update TopBar Component to Use WalletContext

**Implementation Details**:
Update the TopBar component to use our wallet context:

```bash
cat > src/components/top-bar.tsx << EOL
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

export default function TopBar() {
  const { walletAddress, isConnecting, isCorrectNetwork, connectWallet, switchNetwork } = useWallet();
  
  const handleWalletAction = async () => {
    if (!walletAddress) {
      await connectWallet();
    } else if (!isCorrectNetwork) {
      await switchNetwork();
    } else {
      // For disconnect functionality, we'd need to track this in the context
      // For now, we'll just show the wallet address when connected
    }
  };
  
  // Format the wallet address for display
  const formatAddress = (address: string) => {
    return \`\${address.substring(0, 6)}...\${address.substring(address.length - 4)}\`;
  };
  
  // Determine button text based on wallet state
  const getButtonText = () => {
    if (isConnecting) return "Connecting...";
    if (!walletAddress) return "Connect Wallet";
    if (!isCorrectNetwork) return "Switch Network";
    return formatAddress(walletAddress);
  };
  
  // Determine button variant based on wallet state
  const getButtonVariant = () => {
    if (!walletAddress) return "outline";
    if (!isCorrectNetwork) return "destructive";
    return "outline";
  };

  return (
    <header className="w-full border-b border-border bg-card">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground">
            <Zap size={18} />
          </div>
          <span className="text-lg font-semibold">ETN Task AI</span>
        </Link>

        <div>
          <Button 
            onClick={handleWalletAction} 
            variant={getButtonVariant() as any}
            disabled={isConnecting}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
    </header>
  );
}
EOL
```

**Definition of Done**:
- TopBar component updated to use the WalletContext
- Wallet connection status and actions implemented

### 3.7 Create Service Detail Page Logic

**Implementation Details**:
Update the service detail page to integrate with our API and blockchain services:

```bash
cat > src/app/service/[slug]/page.tsx << EOL
"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import StreamingLog from "@/components/streaming-log";
import ImagePreview from "@/components/image-preview";
import { useWallet } from "@/context/WalletContext";
import { generateRequestId, getService, verifyPayment, processRequest } from "@/lib/api";
import { makePayment } from "@/lib/blockchain";

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const { walletAddress, isCorrectNetwork, connectWallet, switchNetwork } = useWallet();

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // For payment
  const [requestId, setRequestId] = useState<string | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<string>("0.00 ETN");

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceData = await getService(params.slug);
        if (!serviceData) {
          notFound();
        }
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.slug]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // File handling would go here
    // For this MVP, we're focusing on text inputs
  };

  // Generate request ID and get cost estimate
  const handlePrepareRequest = async () => {
    if (!input.trim()) {
      setError("Please enter your input");
      return;
    }

    if (!walletAddress) {
      await connectWallet();
      return;
    }

    if (!isCorrectNetwork) {
      await switchNetwork();
      return;
    }

    setError(null);
    setIsPaying(true);
    
    try {
      const response = await generateRequestId(service.id, input);
      if (response) {
        setRequestId(response.requestId);
        setEstimatedCost(response.estimatedCost);
      } else {
        throw new Error("Failed to generate request ID");
      }
    } catch (err) {
      console.error("Error preparing request:", err);
      setError("Failed to prepare request. Please try again.");
      setIsPaying(false);
    }
  };

  // Make payment and process request
  const handleProcessRequest = async () => {
    if (!requestId || !walletAddress) return;

    setIsProcessing(true);
    
    try {
      // Make payment
      const paymentSuccess = await makePayment(requestId, estimatedCost);
      
      if (!paymentSuccess) {
        setError("Payment failed. Please try again.");
        setIsProcessing(false);
        setIsPaying(false);
        return;
      }

      // Verify payment (with retry)
      let isPaid = false;
      let attempts = 0;
      
      while (!isPaid && attempts < 10) {
        attempts++;
        isPaid = await verifyPayment(requestId);
        
        if (isPaid) {
          break;
        }
        
        // Wait 1 second before trying again
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      if (!isPaid) {
        setError("Payment verification failed. If you made a payment, please try processing again.");
        setIsProcessing(false);
        setIsPaying(false);
        return;
      }

      // Process the request
      const processingResult = await processRequest(service.id, requestId, input);
      
      if (processingResult) {
        // Handle different service types
        if (processingResult.serviceType === 'image' && typeof processingResult.result === 'string') {
          setImageUrl(processingResult.result);
        } else {
          setResult(processingResult.result);
        }
      } else {
        throw new Error("Failed to process request");
      }
    } catch (err) {
      console.error("Error processing request:", err);
      setError("Failed to process request. Please try again.");
    } finally {
      setIsProcessing(false);
      setIsPaying(false);
      // Reset requestId to allow new requests
      setRequestId(null);
    }
  };

  // Cancel payment
  const handleCancelPayment = () => {
    setIsPaying(false);
    setRequestId(null);
  };

  if (loading) {
    return (
      <div className="container max-w-5xl py-6 md:py-8 px-4">
        <div className="flex items-center justify-center h-[300px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return notFound();
  }

  return (
    <div className="container max-w-5xl py-6 md:py-8 px-4">
      <Link href="/" className="inline-flex items-center text-sm text-primary mb-6 hover:underline">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to marketplace
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Service Info & Input */}
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{service.name}</h1>
            <p className="text-sm text-primary mt-1">ETN Task AI Service</p>
            <p className="mt-4 text-sm text-muted-foreground">{service.description}</p>
          </div>

          <div className="border border-border rounded-lg p-5 bg-card/50">
            <h2 className="text-sm font-medium mb-3">Instructions</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enter your input below and click "Process" to start. 
              You'll be asked to pay {service.basePrice} ETN (or more for longer inputs) 
              using your Electroneum wallet.
            </p>
          </div>

          {!isPaying ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="prompt">Your input</Label>
                <Textarea
                  id="prompt"
                  placeholder="Enter your input here..."
                  className="min-h-[180px] bg-card border-border resize-none"
                  disabled={isProcessing}
                  value={input}
                  onChange={handleInputChange}
                />
              </div>

              {service.supportedFiles && service.supportedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="file">Upload file (optional)</Label>
                  <Input 
                    id="file" 
                    type="file" 
                    className="bg-card border-border h-12" 
                    disabled={isProcessing}
                    onChange={handleFileUpload}
                  />
                  <p className="text-xs text-muted-foreground">
                    Supported formats: {service.supportedFiles.join(', ')}
                  </p>
                </div>
              )}

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="pt-2">
                <Button 
                  onClick={handlePrepareRequest} 
                  className="w-full md:w-auto" 
                  disabled={isProcessing || !input.trim()}
                >
                  {isProcessing ? "Processing..." : \`Process with \${service.basePrice}+ ETN\`}
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Final price may vary depending on input length.
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-border rounded-lg p-5 bg-card">
              <h2 className="text-lg font-medium mb-3">Confirm Payment</h2>
              <p className="mb-1">Cost: <span className="font-semibold">{estimatedCost}</span></p>
              <p className="text-sm text-muted-foreground mb-4">
                Your input: {input.length > 100 ? input.substring(0, 100) + "..." : input}
              </p>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleProcessRequest} 
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? "Processing..." : "Confirm & Pay"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCancelPayment}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Output */}
        <div className="w-full md:w-1/2 h-[500px] md:h-auto">
          {service.type === "image" ? (
            <ImagePreview isProcessing={isProcessing} imageUrl={imageUrl} />
          ) : (
            <StreamingLog isProcessing={isProcessing} output={result} />
          )}
        </div>
      </div>
    </div>
  );
}
EOL
```

**Definition of Done**:
- Service detail page updated to integrate with APIs and blockchain
- Complete user flow implemented: input → request payment → make payment → get result

### 3.8 Update StreamingLog Component

**Implementation Details**:
Update the StreamingLog component to handle our results:

```bash
cat > src/components/streaming-log.tsx << EOL
"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface StreamingLogProps {
  isProcessing?: boolean;
  output?: string | null;
}

export default function StreamingLog({ isProcessing = false, output = null }: StreamingLogProps) {
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);

  // Simulate processing steps when isProcessing is true
  useEffect(() => {
    if (!isProcessing) return;

    const steps = [
      "Initializing task...",
      "Processing input...",
      "Analyzing content...",
      "Generating response...",
      "Applying formatting...",
      "Optimizing output...",
      "Finalizing results...",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < steps.length) {
        setProcessingSteps(prev => [...prev, steps[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      setProcessingSteps([]);
    };
  }, [isProcessing]);

  // Format output with markdown-like syntax
  const formatOutput = (text: string) => {
    return text
      // Code blocks
      .replace(/```([\\s\\S]*?)```/g, '<pre class="bg-muted p-3 rounded-md my-2 overflow-x-auto text-xs font-mono">$1</pre>')
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold mt-3 mb-2">$2</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-md font-bold mt-3 mb-1">$1</h3>')
      // Bold
      .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\\*(.*?)\\*/g, '<em>$1</em>')
      // Lists
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      // Line breaks
      .replace(/\\n/g, '<br/>');
  };

  return (
    <div className="h-full border border-border rounded-lg bg-card p-5 overflow-y-auto">
      {!isProcessing && !output ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <p>Task output will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {isProcessing && (
            <>
              {processingSteps.map((step, index) => (
                <div key={index} className="text-sm">
                  <span className="text-primary">&gt;</span> {step}
                </div>
              ))}
              
              {processingSteps.length < 7 && (
                <div className="flex items-center text-sm gap-2">
                  <Loader2 className="h-3 w-3 animate-spin text-primary" />
                  <span>Processing...</span>
                </div>
              )}
            </>
          )}
          
          {output && (
            <div 
              className="text-sm" 
              dangerouslySetInnerHTML={{ __html: formatOutput(output) }}
            />
          )}
        </div>
      )}
    </div>
  );
}
EOL
```

**Definition of Done**:
- StreamingLog component updated to display processing steps and output
- Basic formatting added to make the output more readable

### 3.9 Update ImagePreview Component

**Implementation Details**:
Update the ImagePreview component to handle image results:

```bash
cat > src/components/image-preview.tsx << EOL
"use client"

import { useState } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface ImagePreviewProps {
  isProcessing?: boolean;
  imageUrl?: string | null;
}

export default function ImagePreview({ isProcessing = false, imageUrl = null }: ImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-full border border-border rounded-lg bg-card overflow-hidden relative">
      {isProcessing ? (
        <div className="h-full flex flex-col items-center justify-center gap-3 p-5">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Generating image...</p>
        </div>
      ) : (
        <>
          {imageUrl ? (
            <div className="relative h-full w-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              <Image
                src={imageUrl}
                alt="Generated image"
                fill
                className="object-contain"
                onLoadingComplete={() => setIsLoading(false)}
                onError={() => {
                  // If image fails to load, show a placeholder
                  setIsLoading(false);
                }}
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground p-5">
              <p>Generated image will appear here</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
EOL
```

**Definition of Done**:
- ImagePreview component updated to display generated images
- Loading state added for image loading

### 3.10 Update Homepage to Fetch Services from API

**Implementation Details**:
Update the homepage to fetch and display services from our API:

```bash
cat > src/app/page.tsx << EOL
"use client";

import { useState, useEffect } from "react";
import { services } from "@/lib/services";
import ServiceCard from "@/components/service-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { getServices } from "@/lib/api";

export default function Home() {
  const [apiServices, setApiServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getServices();
        setApiServices(services);
      } catch (error) {
        console.error("Error fetching services:", error);
        // Fallback to local services if API fails
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, []);
  
  // Filter services based on search query
  const filteredServices = searchQuery.trim() === "" 
    ? (apiServices.length > 0 ? apiServices : services) 
    : (apiServices.length > 0 ? apiServices : services).filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="flex flex-col">
      <div className="container px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search AI services..." 
              className="pl-10 bg-card border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="w-full bg-card border-y border-border py-4 mb-8">
        <p className="text-center text-muted-foreground max-w-2xl mx-auto px-4">
          Welcome to our AI Agents Marketplace. Choose a service, pay in ETN, and get your job done quickly!
        </p>
      </div>

      <div className="container px-4 pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No services found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm italic">More services coming soon...</p>
        </div>
      </div>
    </div>
  );
}
EOL
```

**Definition of Done**:
- Homepage updated to fetch services from the API
- Loading state and fallback to local services added
- Search functionality implemented

### 3.11 Update Service Card Component

**Implementation Details**:
Update the service card component to work with our API data format:

```bash
cat > src/components/service-card.tsx << EOL
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceProps {
  service: {
    id: string;
    name: string;
    description: string;
    basePrice: string;
    type?: string;
    image?: string;
  };
}

export default function ServiceCard({ service }: ServiceProps) {
  // Generate a placeholder image if none is provided
  const imageSrc = service.image || \`/placeholder.svg?text=\${service.name}\`;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-border">
      <div className="relative h-36 w-full">
        <Image 
          src={imageSrc} 
          alt={service.name} 
          fill 
          className="object-cover" 
          priority
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-base font-semibold">{service.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
          {service.description}
        </p>
        <p className="mt-2 text-primary font-medium text-sm">{service.basePrice}+ ETN</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={\`/service/\${service.id}\`} className="w-full">
          <Button variant="outline" className="w-full text-xs">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
EOL
```

**Definition of Done**:
- ServiceCard component updated to handle API service format
- Placeholder image handling added for services without images

### 3.12 Add Local Services Fallback

**Implementation Details**:
Create a local fallback for services in case the API is unavailable:

```bash
mkdir -p src/lib

cat > src/lib/services.ts << EOL
// Service types
export type ServiceType = 'text' | 'image' | 'code' | 'data';

// Service interface
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string;
  type: ServiceType;
  image?: string;
}

// Fallback services in case the API is unavailable
export const services: Service[] = [
  {
    id: "language-translator",
    name: "Language Translator",
    description: "Translate text between over 100 languages with high accuracy.",
    basePrice: "0.05",
    type: "text"
  },
  {
    id: "image-generator",
    name: "AI Image Generator",
    description: "Create stunning images from text descriptions.",
    basePrice: "0.20",
    type: "image"
  },
  {
    id: "content-writer",
    name: "Content Writer",
    description: "Generate high-quality articles, blog posts, and marketing copy.",
    basePrice: "0.15",
    type: "text"
  },
  {
    id: "code-assistant",
    name: "Code Assistant",
    description: "Get help with programming tasks, debugging, and code optimization.",
    basePrice: "0.10",
    type: "code"
  },
  {
    id: "data-analyzer",
    name: "Data Analyzer",
    description: "Extract insights from your data with ML-powered analysis.",
    basePrice: "0.25",
    type: "data"
  }
];

// Function to get a service by ID
export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}
EOL
```

**Definition of Done**:
- Local services fallback created for use when the API is unavailable
- Service interface and helper functions defined

### 3.13 Test Frontend Integration

**Implementation Details**:
Start the frontend development server and ensure it's integrated correctly:

```bash
# Start the frontend
npm run dev
```

Verify that the frontend can:
1. Connect to a wallet
2. Fetch services from the API (or use fallback)
3. Navigate to service detail pages
4. Make payment requests and verify payments
5. Display results from the AI services

**Definition of Done**:
- Frontend starts without errors
- Wallet connection works
- Service listing and navigation work
- Integration with smart contract and backend API works


# Technical Specification: ETN AI Services Marketplace

## Phase 4: Testing and Debugging

This phase focuses on comprehensive testing of all components to ensure the application works as expected.

### 4.1 Set Up End-to-End Testing Environment

**Implementation Details**:
Create a test script that runs all the necessary services:

```bash
# Navigate to the project root
cd ..

# Create scripts directory for test utilities
mkdir -p scripts

cat > scripts/start-test-env.sh << EOL
#!/bin/bash

# Start all services for testing
echo "Starting test environment..."

# Kill any existing processes on these ports
echo "Stopping any existing services..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:4000 | xargs kill -9 2>/dev/null

# Start backend service
echo "Starting backend..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to initialize..."
sleep 5

# Start frontend service
echo "Starting frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Trap cleanup function to terminate services on script exit
trap "echo 'Shutting down...'; kill \$BACKEND_PID \$FRONTEND_PID 2>/dev/null" EXIT

# Keep the script running
echo "Test environment running. Press Ctrl+C to stop."
wait
EOL

# Make the script executable
chmod +x scripts/start-test-env.sh
```

**Definition of Done**:
- Test script created for starting all services
- Script handles cleanup on exit

### 4.2 Test Smart Contract Integration

**Implementation Details**:
Create a smart contract testing script:

```bash
cat > scripts/test-contract.js << EOL
const { ethers } = require("ethers");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.ETN_TESTNET_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// ABI for the PaymentHandler event
const ABI = [
  "function makePayment(string memory promptId) external payable",
  "event PaymentReceived(address indexed sender, uint256 amount, string promptId, uint256 timestamp)"
];

async function main() {
  try {
    // Create provider and signer
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    
    // Connect to the contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    
    console.log("Wallet address:", wallet.address);
    console.log("Contract address:", CONTRACT_ADDRESS);
    
    // Generate a test promptId
    const promptId = \`test-\${Date.now()}\`;
    const paymentAmount = ethers.utils.parseEther("0.01");
    
    console.log(\`Making payment of \${ethers.utils.formatEther(paymentAmount)} ETN for promptId: \${promptId}\`);
    
    // Make payment
    const tx = await contract.makePayment(promptId, { value: paymentAmount });
    
    console.log("Transaction hash:", tx.hash);
    console.log("Waiting for confirmation...");
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    
    // Check for the PaymentReceived event
    const events = receipt.events.filter(event => event.event === "PaymentReceived");
    
    if (events.length > 0) {
      const event = events[0];
      console.log("Event found!");
      console.log("Sender:", event.args.sender);
      console.log("Amount:", ethers.utils.formatEther(event.args.amount), "ETN");
      console.log("PromptId:", event.args.promptId);
      console.log("Timestamp:", new Date(event.args.timestamp.toNumber() * 1000).toISOString());
    } else {
      console.error("No PaymentReceived event found in the transaction.");
    }
    
    console.log("Contract integration test completed successfully!");
  } catch (error) {
    console.error("Error testing contract:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
EOL
```

Update package.json to include this test script:

```bash
cat > contracts/package.json << EOL
{
  "name": "contracts",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "npx hardhat test",
    "test-contract": "node ../scripts/test-contract.js",
    "compile": "npx hardhat compile",
    "deploy": "npx hardhat run scripts/deploy.js --network electroneum",
    "verify": "npx hardhat verify --network electroneum"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^2.0.2",
    "@nomiclabs/hardhat-ethers": "^2.2.3",
    "dotenv": "^16.0.3",
    "ethers": "^5.7.2",
    "hardhat": "^2.14.0",
    "hardhat-deploy": "^0.11.26"
  }
}
EOL
```

**Definition of Done**:
- Smart contract test script created
- Script tests payment function and event emission
- package.json updated with test-contract script

### 4.3 Test Backend API Endpoints

**Implementation Details**:
Create a script to test the backend API endpoints:

```bash
cat > scripts/test-backend-api.js << EOL
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const API_URL = "http://localhost:4000/api";

async function main() {
  try {
    console.log("Testing backend API endpoints...");
    
    // Test 1: Get services
    console.log("\n1. Testing GET /api/services");
    const servicesResponse = await axios.get(\`\${API_URL}/services\`);
    console.log("Status:", servicesResponse.status);
    console.log("Services count:", servicesResponse.data.services.length);
    
    if (servicesResponse.data.services.length === 0) {
      console.error("No services found!");
    } else {
      console.log("First service:", servicesResponse.data.services[0].name);
      
      const serviceId = servicesResponse.data.services[0].id;
      
      // Test 2: Get service details
      console.log(\`\n2. Testing GET /api/services/\${serviceId}\`);
      const serviceResponse = await axios.get(\`\${API_URL}/services/\${serviceId}\`);
      console.log("Status:", serviceResponse.status);
      console.log("Service details:", serviceResponse.data.service.name);
      
      // Test 3: Generate request ID
      console.log("\n3. Testing POST /api/services/request-id");
      const requestIdResponse = await axios.post(\`\${API_URL}/services/request-id\`, {
        serviceId,
        input: "This is a test input for API testing purposes."
      });
      console.log("Status:", requestIdResponse.status);
      console.log("Request ID:", requestIdResponse.data.requestId);
      console.log("Estimated cost:", requestIdResponse.data.estimatedCost);
      
      const requestId = requestIdResponse.data.requestId;
      
      // Test 4: Verify payment
      console.log(\`\n4. Testing GET /api/services/verify-payment/\${requestId}\`);
      const verifyResponse = await axios.get(\`\${API_URL}/services/verify-payment/\${requestId}\`);
      console.log("Status:", verifyResponse.status);
      console.log("Payment verified:", verifyResponse.data.paid);
      
      // Note: Actual payment won't be verified unless a real transaction was made
      // For testing, we're just checking if the endpoint works
      
      // Test 5: Process request (this will likely fail without a real payment)
      console.log("\n5. Testing POST /api/services/process");
      try {
        const processResponse = await axios.post(\`\${API_URL}/services/process\`, {
          serviceId,
          requestId,
          input: "This is a test input for API testing purposes.",
          options: {}
        });
        console.log("Status:", processResponse.status);
        console.log("Process result:", processResponse.data.status);
      } catch (error) {
        console.log("Expected error (payment required):", error.response.status);
        console.log("Error message:", error.response.data.error);
      }
    }
    
    console.log("\nBackend API tests completed!");
  } catch (error) {
    console.error("Error testing backend API:", error);
  }
}

main();
EOL
```

Update package.json to include this test script:

```bash
cat > backend/package.json << EOL
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "test-api": "node ../scripts/test-backend-api.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "axios": "^1.3.4",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "ethers": "^5.7.2",
    "express": "^4.18.2",
    "openai": "^3.2.1",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/node": "^18.15.11",
    "@types/uuid": "^9.0.1",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.3"
  }
}
EOL
```

**Definition of Done**:
- Backend API test script created
- Script tests all API endpoints
- package.json updated with test-api script

### 4.4 Test Frontend E2E Flow

**Implementation Details**:
Create a step-by-step testing checklist for the frontend:

```bash
cat > scripts/frontend-test-checklist.md << EOL
# Frontend Testing Checklist

## Setup
- [ ] Start backend server: \`cd backend && npm run dev\`
- [ ] Start frontend server: \`cd frontend && npm run dev\`
- [ ] Open browser to http://localhost:3000

## Homepage Tests
- [ ] Verify homepage loads with service cards
- [ ] Verify service images, titles, and descriptions display correctly
- [ ] Test search functionality with a search term
- [ ] Click "View Details" on a service card to navigate to its page

## Wallet Connection Tests
- [ ] Click "Connect Wallet" in the top bar
- [ ] Confirm MetaMask opens and approve connection
- [ ] Verify wallet address displays in the top bar
- [ ] If on wrong network, verify "Switch Network" button appears
- [ ] Test switching to Electroneum testnet

## Service Detail Page Tests
- [ ] Verify service details page loads
- [ ] Enter text in the input field
- [ ] Click "Process" button
- [ ] Verify payment confirmation dialog appears with correct cost
- [ ] Click "Confirm & Pay" to proceed with payment
- [ ] Verify MetaMask payment dialog opens
- [ ] Complete payment and check for success feedback
- [ ] Verify result appears in the output area

## Image Service Tests (if applicable)
- [ ] Navigate to an image generation service
- [ ] Enter a prompt for image generation
- [ ] Complete payment process
- [ ] Verify image appears in the output area

## Error Handling Tests
- [ ] Test with invalid input (empty)
- [ ] Test with disconnected wallet
- [ ] Test with wrong network
- [ ] Cancel a payment midway and verify proper handling

## Responsive Design Tests
- [ ] Test on mobile view (dev tools responsive mode)
- [ ] Test on tablet view
- [ ] Verify proper layout at all breakpoints

## Notes
Record any issues found during testing here:
1. 
2. 
3. 
EOL
```

**Definition of Done**:
- Frontend testing checklist created
- Checklist covers all key user flows

### 4.5 Create End-to-End Test Documentation

**Implementation Details**:
Create an end-to-end testing document that covers the complete flow:

```bash
cat > scripts/e2e-test-doc.md << EOL
# End-to-End Testing Documentation

This document outlines the complete flow for testing the ETN AI Services Marketplace application.

## Prerequisites
- MetaMask wallet installed with ETN testnet configured
- Sufficient ETN testnet tokens for payments
- All services running (backend and frontend)

## 1. User Flow Testing

### 1.1 Homepage and Service Discovery
1. Open the application at http://localhost:3000
2. Verify that the service cards load correctly
3. Use the search bar to find a specific service (e.g., "translator")
4. Click on a service card to navigate to its detail page

### 1.2 Wallet Connection
1. Click the "Connect Wallet" button in the top bar
2. Approve the connection in MetaMask
3. Verify that your wallet address is displayed in the top bar
4. If not on the Electroneum testnet, click "Switch Network"
5. Approve the network switch in MetaMask

### 1.3 Service Interaction
1. On a service detail page, enter text in the input field
2. Click the "Process" button
3. Verify that the payment confirmation dialog appears
4. Check that the estimated cost is displayed correctly
5. Click "Confirm & Pay" to proceed with payment
6. Approve the transaction in MetaMask
7. Wait for the transaction to be confirmed
8. Verify that the result appears in the output area

### 1.4 Multiple Service Testing
Repeat the service interaction steps for different service types:
- Text service (e.g., language translator)
- Image service (if available)
- Code service (if available)
- Data service (if available)

## 2. Backend API Testing

### 2.1 Services Endpoint
\`\`\`bash
curl http://localhost:4000/api/services
\`\`\`
Expected: JSON array of available services

### 2.2 Service Detail Endpoint
\`\`\`bash
curl http://localhost:4000/api/services/language-translator
\`\`\`
Expected: JSON object with service details

### 2.3 Request ID Generation
\`\`\`bash
curl -X POST http://localhost:4000/api/services/request-id \\
  -H "Content-Type: application/json" \\
  -d '{"serviceId": "language-translator", "input": "Test input"}'
\`\`\`
Expected: JSON object with requestId and estimatedCost

### 2.4 Payment Verification
\`\`\`bash
curl http://localhost:4000/api/services/verify-payment/[REQUEST_ID]
\`\`\`
Expected: JSON object with payment status

### 2.5 Service Processing
\`\`\`bash
curl -X POST http://localhost:4000/api/services/process \\
  -H "Content-Type: application/json" \\
  -d '{"serviceId": "language-translator", "requestId": "[REQUEST_ID]", "input": "Test input"}'
\`\`\`
Expected: JSON object with service result or payment required error

## 3. Smart Contract Testing

### 3.1 Direct Contract Interaction
Use the contract test script:
\`\`\`bash
cd contracts
npm run test-contract
\`\`\`

### 3.2 Transaction Verification
After making a payment, verify the transaction on the Electroneum testnet explorer:
https://testnet-blockexplorer.electroneum.com/address/[CONTRACT_ADDRESS]

## 4. Known Issues and Limitations

- In development mode, payment verification might be simulated
- Image generation services may have placeholder responses
- Service availability depends on the backend API

## 5. Test Results Documentation

| Test Case | Status | Notes |
|-----------|--------|-------|
| Homepage Load | | |
| Service Search | | |
| Wallet Connection | | |
| Network Switching | | |
| Text Service | | |
| Image Service | | |
| Payment Flow | | |
| API Endpoints | | |
| Contract Interaction | | |
| Responsive Design | | |
EOL
```

**Definition of Done**:
- End-to-end testing documentation created
- Documentation covers all components and user flows

### 4.6 Test Development Mode with Mock Responses

**Implementation Details**:
Create a script to test the development mode with mock responses:

```bash
cat > scripts/test-dev-mode.js << EOL
const axios = require("axios");

const API_URL = "http://localhost:4000/api";

// Test prompts that should trigger mock responses
const TEST_PROMPTS = [
  {
    serviceId: "language-translator",
    input: "Translate to French: Hello, how are you?"
  },
  {
    serviceId: "content-writer",
    input: "Write a short blog post about AI and blockchain"
  },
  {
    serviceId: "code-assistant",
    input: "Write a JavaScript function to sort an array of objects by a property"
  }
];

async function main() {
  try {
    console.log("Testing development mode with mock responses...");
    
    for (const test of TEST_PROMPTS) {
      console.log(\`\nTesting service \${test.serviceId} with input: "\${test.input.substring(0, 30)}..."\`);
      
      // Step 1: Generate request ID
      console.log("1. Generating request ID...");
      const requestIdResponse = await axios.post(\`\${API_URL}/services/request-id\`, {
        serviceId: test.serviceId,
        input: test.input
      });
      
      const requestId = requestIdResponse.data.requestId;
      console.log("Request ID:", requestId);
      console.log("Estimated cost:", requestIdResponse.data.estimatedCost);
      
      // Step 2: Simulate payment verification in dev mode
      console.log("2. Verifying payment (dev mode should auto-approve)...");
      const verifyResponse = await axios.get(\`\${API_URL}/services/verify-payment/\${requestId}\`);
      
      if (verifyResponse.data.paid) {
        console.log("Payment verified (auto-approved in dev mode)");
        
        // Step 3: Process the request
        console.log("3. Processing request...");
        const processResponse = await axios.post(\`\${API_URL}/services/process\`, {
          serviceId: test.serviceId,
          requestId,
          input: test.input
        });
        
        if (processResponse.data.status === "success") {
          console.log("Mock response received successfully");
          console.log("Response type:", processResponse.data.serviceType);
          console.log("Response length:", processResponse.data.result.length);
          console.log("First 100 chars:", processResponse.data.result.substring(0, 100) + "...");
        } else {
          console.error("Failed to get mock response:", processResponse.data);
        }
      } else {
        console.error("Payment verification failed even in dev mode!");
      }
    }
    
    console.log("\nDevelopment mode mock response tests completed!");
  } catch (error) {
    console.error("Error testing mock responses:", error);
  }
}

main();
EOL
```

**Definition of Done**:
- Development mode test script created
- Script tests mock responses for different service types

### 4.7 Create Performance Test Script

**Implementation Details**:
Create a script to assess the performance of the backend API:

```bash
cat > scripts/performance-test.js << EOL
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const API_URL = "http://localhost:4000/api";
const NUM_REQUESTS = 20;
const CONCURRENT_REQUESTS = 5;

async function runTest(serviceId, input) {
  const start = Date.now();
  
  try {
    // Generate request ID
    const requestIdResponse = await axios.post(\`\${API_URL}/services/request-id\`, {
      serviceId,
      input
    });
    
    const requestId = requestIdResponse.data.requestId;
    
    // Verify payment (dev mode should auto-approve)
    const verifyResponse = await axios.get(\`\${API_URL}/services/verify-payment/\${requestId}\`);
    
    if (verifyResponse.data.paid) {
      // Process the request
      const processResponse = await axios.post(\`\${API_URL}/services/process\`, {
        serviceId,
        requestId,
        input
      });
      
      const end = Date.now();
      return { 
        success: true, 
        duration: end - start,
        responseSize: JSON.stringify(processResponse.data).length
      };
    } else {
      const end = Date.now();
      return { 
        success: false, 
        duration: end - start,
        error: "Payment verification failed"
      };
    }
  } catch (error) {
    const end = Date.now();
    return { 
      success: false, 
      duration: end - start,
      error: error.message
    };
  }
}

async function main() {
  try {
    console.log("Running performance tests...");
    
    // Get available services
    const servicesResponse = await axios.get(\`\${API_URL}/services\`);
    
    if (servicesResponse.data.services.length === 0) {
      console.error("No services found!");
      return;
    }
    
    const serviceId = servicesResponse.data.services[0].id;
    const input = "This is a test input for performance testing purposes.";
    
    console.log(\`Using service: \${serviceId}\`);
    console.log(\`Number of requests: \${NUM_REQUESTS}\`);
    console.log(\`Concurrent requests: \${CONCURRENT_REQUESTS}\`);
    
    const results = [];
    
    // Run tests in batches of concurrent requests
    for (let i = 0; i < NUM_REQUESTS; i += CONCURRENT_REQUESTS) {
      const batch = [];
      
      for (let j = 0; j < CONCURRENT_REQUESTS && i + j < NUM_REQUESTS; j++) {
        batch.push(runTest(serviceId, input));
      }
      
      const batchResults = await Promise.all(batch);
      results.push(...batchResults);
      
      console.log(\`Completed batch \${Math.floor(i / CONCURRENT_REQUESTS) + 1}/\${Math.ceil(NUM_REQUESTS / CONCURRENT_REQUESTS)}\`);
    }
    
    // Calculate statistics
    const successfulTests = results.filter(r => r.success);
    const failedTests = results.filter(r => !r.success);
    
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
    const avgDuration = totalDuration / results.length;
    
    const minDuration = Math.min(...results.map(r => r.duration));
    const maxDuration = Math.max(...results.map(r => r.duration));
    
    console.log("\nTest Results:");
    console.log(\`Total requests: \${results.length}\`);
    console.log(\`Successful: \${successfulTests.length}\`);
    console.log(\`Failed: \${failedTests.length}\`);
    console.log(\`Average duration: \${avgDuration.toFixed(2)}ms\`);
    console.log(\`Min duration: \${minDuration}ms\`);
    console.log(\`Max duration: \${maxDuration}ms\`);
    
    if (successfulTests.length > 0) {
      const avgResponseSize = successfulTests.reduce((sum, r) => sum + r.responseSize, 0) / successfulTests.length;
      console.log(\`Average response size: \${avgResponseSize.toFixed(2)} bytes\`);
    }
    
    if (failedTests.length > 0) {
      console.log("\nErrors:");
      const errorTypes = {};
      
      failedTests.forEach(test => {
        errorTypes[test.error] = (errorTypes[test.error] || 0) + 1;
      });
      
      Object.entries(errorTypes).forEach(([error, count]) => {
        console.log(\`- \${error}: \${count} occurrences\`);
      });
    }
    
    console.log("\nPerformance tests completed!");
  } catch (error) {
    console.error("Error running performance tests:", error);
  }
}

main();
EOL
```

**Definition of Done**:
- Performance test script created
- Script tests API responsiveness under load
- Script calculates performance metrics

### 4.8 Create Debug Logging Utility

**Implementation Details**:
Create a debug logging utility for troubleshooting:

```bash
cat > backend/src/utils/logger.ts << EOL
import fs from 'fs';
import path from 'path';
import { format } from 'util';

// Define log levels
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// Set the current log level based on environment
const currentLogLevel = process.env.NODE_ENV === 'production' 
  ? LogLevel.INFO 
  : LogLevel.DEBUG;

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create log file streams
const debugLogStream = fs.createWriteStream(path.join(logsDir, 'debug.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(logsDir, 'error.log'), { flags: 'a' });

// Format the current timestamp
function timestamp(): string {
  return new Date().toISOString();
}

// Write to log file and console
function writeLog(level: LogLevel, message: string, ...args: any[]): void {
  if (level < currentLogLevel) return;
  
  const formattedMessage = args.length ? format(message, ...args) : message;
  const logEntry = \`[\${timestamp()}] [\${LogLevel[level]}] \${formattedMessage}\n\`;
  
  // Write to console
  if (level >= LogLevel.INFO) {
    const consoleMethod = level >= LogLevel.ERROR ? console.error : 
                         level >= LogLevel.WARN ? console.warn : console.log;
    consoleMethod(logEntry.trim());
  }
  
  // Write to file
  if (level >= LogLevel.ERROR) {
    errorLogStream.write(logEntry);
  }
  
  debugLogStream.write(logEntry);
}

// Logger interface
export const logger = {
  debug(message: string, ...args: any[]): void {
    writeLog(LogLevel.DEBUG, message, ...args);
  },
  
  info(message: string, ...args: any[]): void {
    writeLog(LogLevel.INFO, message, ...args);
  },
  
  warn(message: string, ...args: any[]): void {
    writeLog(LogLevel.WARN, message, ...args);
  },
  
  error(message: string, ...args: any[]): void {
    writeLog(LogLevel.ERROR, message, ...args);
  }
};
EOL
```

**Definition of Done**:
- Logger utility created with different log levels
- Log output saved to files and console
- Log level configurable based on environment

### 4.9 Add Debug Routes to Backend

**Implementation Details**:
Add debug routes to the backend API for troubleshooting:

```bash
cat > src/routes/debugRoutes.ts << EOL
import { Router } from 'express';
import { logger } from '../utils/logger';

const router = Router();

// System information route
router.get('/system-info', (req, res) => {
  const systemInfo = {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV,
    pid: process.pid
  };
  
  logger.debug('Debug system-info requested');
  res.status(200).json(systemInfo);
});

// Environment variables (sanitized)
router.get('/env', (req, res) => {
  // Only include safe environment variables
  const safeEnv = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    ENVIRONMENT: process.env.ENVIRONMENT
  };
  
  logger.debug('Debug env variables requested');
  res.status(200).json(safeEnv);
});

// Test mock response
router.post('/mock-response', (req, res) => {
  const { serviceId, input } = req.body;
  
  if (!serviceId || !input) {
    return res.status(400).json({ error: 'ServiceId and input are required' });
  }
  
  // Get mock response based on service type
  let mockResponse;
  
  switch (serviceId) {
    case 'language-translator':
      mockResponse = "This is a mock translation response.";
      break;
    case 'image-generator':
      mockResponse = "https://via.placeholder.com/512x512.png?text=Mock+Image";
      break;
    case 'content-writer':
      mockResponse = "This is a mock content writing response. It simulates an AI-generated article.";
      break;
    case 'code-assistant':
      mockResponse = "```javascript\\nfunction mockCode() {\\n  return 'This is mock code';\\n}\\n```";
      break;
    default:
      mockResponse = "Mock response for unknown service type.";
  }
  
  logger.debug(\`Debug mock-response generated for service \${serviceId}\`);
  res.status(200).json({ 
    status: 'success',
    result: mockResponse,
    serviceType: serviceId.includes('image') ? 'image' : 'text'
  });
});

// Force error (for testing error handling)
router.get('/force-error', (req, res) => {
  logger.error('Debug force-error triggered');
  throw new Error('This is a forced error for testing purposes');
});

export default router;
EOL
```

Update routes/index.ts to include debug routes:

```bash
cat > src/routes/index.ts << EOL
import { Router } from 'express';
import serviceRoutes from './serviceRoutes';
import debugRoutes from './debugRoutes';

const router = Router();

router.use('/services', serviceRoutes);

// Only enable debug routes in development
if (process.env.NODE_ENV !== 'production') {
  router.use('/debug', debugRoutes);
}

export default router;
EOL
```

**Definition of Done**:
- Debug routes created for troubleshooting
- Routes properly secured for development environment only
- Main router updated to include debug routes

### 4.10 Test Error Handling

**Implementation Details**:
Create a script to test error handling across the application:

```bash
cat > scripts/test-error-handling.js << EOL
const axios = require("axios");

const API_URL = "http://localhost:4000/api";

async function testErrorCases() {
  const results = [];
  
  // Test 1: Invalid service ID
  try {
    console.log("Testing invalid service ID...");
    await axios.get(\`\${API_URL}/services/non-existent-service\`);
    results.push({ test: "Invalid service ID", status: "Failed", expected: "404 error", actual: "No error" });
  } catch (error) {
    const status = error.response?.status;
    results.push({ 
      test: "Invalid service ID", 
      status: status === 404 ? "Passed" : "Failed", 
      expected: "404 error", 
      actual: \`\${status} error\` 
    });
  }
  
  // Test 2: Missing required parameters
  try {
    console.log("Testing missing parameters...");
    await axios.post(\`\${API_URL}/services/request-id\`, {});
    results.push({ test: "Missing parameters", status: "Failed", expected: "400 error", actual: "No error" });
  } catch (error) {
    const status = error.response?.status;
    results.push({ 
      test: "Missing parameters", 
      status: status === 400 ? "Passed" : "Failed", 
      expected: "400 error", 
      actual: \`\${status} error\` 
    });
  }
  
  // Test 3: Process without payment
  try {
    console.log("Testing process without payment...");
    const serviceResponse = await axios.get(\`\${API_URL}/services\`);
    const serviceId = serviceResponse.data.services[0].id;
    
    await axios.post(\`\${API_URL}/services/process\`, {
      serviceId,
      requestId: "fake-request-id",
      input: "Test input"
    });
    results.push({ test: "Process without payment", status: "Failed", expected: "402 error", actual: "No error" });
  } catch (error) {
    const status = error.response?.status;
    results.push({ 
      test: "Process without payment", 
      status: status === 402 ? "Passed" : "Failed", 
      expected: "402 error", 
      actual: \`\${status} error\` 
    });
  }
  
  // Test 4: Force server error (if debug routes are enabled)
  try {
    console.log("Testing server error handling...");
    await axios.get(\`\${API_URL}/debug/force-error\`);
    results.push({ test: "Force error", status: "Failed", expected: "500 error", actual: "No error" });
  } catch (error) {
    const status = error.response?.status;
    results.push({ 
      test: "Force error", 
      status: status === 500 ? "Passed" : "Failed", 
      expected: "500 error", 
      actual: \`\${status} error\` 
    });
  }
  
  // Print results table
  console.log("\nError Handling Test Results:");
  console.log("-".repeat(80));
  console.log("| Test Case | Status | Expected | Actual |");
  console.log("-".repeat(80));
  
  for (const result of results) {
    console.log(\`| \${result.test.padEnd(20)} | \${result.status.padEnd(10)} | \${result.expected.padEnd(15)} | \${result.actual.padEnd(15)} |\`);
  }
  
  console.log("-".repeat(80));
  
  const passedTests = results.filter(r => r.status === "Passed").length;
  console.log(\`\${passedTests} of \${results.length} tests passed.\`);
}

async function main() {
  try {
    console.log("Testing error handling across the application...");
    await testErrorCases();
    console.log("\nError handling tests completed!");
  } catch (error) {
    console.error("Unexpected error during testing:", error);
  }
}

main();
EOL
```

**Definition of Done**:
- Error handling test script created
- Script tests various error scenarios
- Results displayed in a formatted table

### 4.11 Final Integration Testing

**Implementation Details**:
Create a script that verifies all components work together:

```bash
cat > scripts/integration-test.sh << EOL
#!/bin/bash

# Integration test script for the ETN AI Services Marketplace

echo "Starting integration test..."
echo

# Check if backend is running
echo "Checking backend..."
if curl -s http://localhost:4000/health | grep -q "ok"; then
  echo "✅ Backend is running"
else
  echo "❌ Backend is not running. Please start it with: cd backend && npm run dev"
  exit 1
fi

# Check if frontend is running
echo "Checking frontend..."
if curl -s http://localhost:3000 > /dev/null; then
  echo "✅ Frontend is running"
else
  echo "❌ Frontend is not running. Please start it with: cd frontend && npm run dev"
  exit 1
fi

# Test backend API endpoints
echo
echo "Testing backend API endpoints..."

# Test services endpoint
echo "Testing /api/services..."
if curl -s http://localhost:4000/api/services | grep -q "services"; then
  echo "✅ Services endpoint working"
else
  echo "❌ Services endpoint not working"
  exit 1
fi

# Test contract address is set
echo "Checking contract configuration..."
CONTRACT_ADDRESS=\$(curl -s http://localhost:4000/api/debug/env | grep -o '"CONTRACT_ADDRESS":"[^"]*"' | cut -d'"' -f4)

if [ -z "\$CONTRACT_ADDRESS" ] || [ "\$CONTRACT_ADDRESS" == "null" ]; then
  echo "❌ Contract address not configured properly"
  exit 1
else
  echo "✅ Contract address configured: \$CONTRACT_ADDRESS"
fi

# Test request ID generation
echo "Testing request ID generation..."
REQUEST_ID_RESPONSE=\$(curl -s -X POST http://localhost:4000/api/services/request-id \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"language-translator","input":"Test input"}')

if echo "\$REQUEST_ID_RESPONSE" | grep -q "requestId"; then
  REQUEST_ID=\$(echo "\$REQUEST_ID_RESPONSE" | grep -o '"requestId":"[^"]*"' | cut -d'"' -f4)
  ESTIMATED_COST=\$(echo "\$REQUEST_ID_RESPONSE" | grep -o '"estimatedCost":"[^"]*"' | cut -d'"' -f4)
  echo "✅ Request ID generated: \$REQUEST_ID (Cost: \$ESTIMATED_COST)"
else
  echo "❌ Request ID generation failed"
  exit 1
fi

# Test mock response in development mode
echo
echo "Testing development mode with mock responses..."
MOCK_RESPONSE=\$(curl -s -X POST http://localhost:4000/api/debug/mock-response \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"language-translator","input":"Test input"}')

if echo "\$MOCK_RESPONSE" | grep -q "success"; then
  echo "✅ Mock response working"
else
  echo "❌ Mock response not working"
  echo "\$MOCK_RESPONSE"
  exit 1
fi

echo
echo "All integration tests passed! ✅"
echo
echo "Next steps:"
echo "1. Try the complete flow in the browser"
echo "2. Test with a real wallet connection"
echo "3. Complete an end-to-end payment and service request"
echo
EOL

chmod +x scripts/integration-test.sh
```

**Definition of Done**:
- Integration test script created
- Script verifies all components are running and integrated
- Tests cover API endpoints and service flows

### 4.12 Fix Identified Issues

**Implementation Details**:
Create a tracking document for issues identified during testing:

```bash
cat > scripts/issues-tracker.md << EOL
# Issue Tracker

This document tracks issues identified during testing and their resolutions.

## Open Issues

| ID | Issue | Component | Severity | Steps to Reproduce | Expected Behavior | Actual Behavior |
|----|-------|-----------|----------|-------------------|-------------------|----------------|
| 1 | | | | | | |
| 2 | | | | | | |

## Resolved Issues

| ID | Issue | Component | Resolution | Fixed in Commit |
|----|-------|-----------|------------|-----------------|
| 1 | | | | |
| 2 | | | | |

## Notes

- Add issues as they are discovered during testing
- Update the status when issues are resolved
- Include commit references for fixed issues

EOL
```

**Definition of Done**:
- Issue tracker document created for logging and resolving issues
- Structure provided for tracking open and resolved issues


# Technical Specification: ETN AI Services Marketplace

## Phase 5: Deployment

This phase covers the steps needed to deploy the application for testing and production.

### 5.1 Prepare Backend for Deployment

**Implementation Details**:
Update the backend code for production deployment:

```bash
# Navigate to the backend directory
cd backend

# Create a production build script
cat > src/server.ts << EOL
import app from './index';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT} in \${process.env.NODE_ENV} mode\`);
});
EOL

# Update package.json scripts for production
cat > package.json << EOL
{
  "name": "backend",
  "version": "1.0.0",
  "main": "dist/server.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "postinstall": "npm run build",
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "test-api": "node ../scripts/test-backend-api.js"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "axios": "^1.3.4",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "ethers": "^5.7.2",
    "express": "^4.18.2",
    "openai": "^3.2.1",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/node": "^18.15.11",
    "@types/uuid": "^9.0.1",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.3"
  }
}
EOL

# Create a Procfile for Heroku-like platforms
cat > Procfile << EOL
web: npm start
EOL

# Update the tsconfig.json to include the server file
cat > tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
EOL

# Create production .env.example file
cat > .env.production.example << EOL
PORT=4000
NODE_ENV=production
OPENAI_API_KEY=your_openai_api_key
CONTRACT_ADDRESS=your_deployed_contract_address
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum
ENVIRONMENT=mainnet
CORS_ORIGIN=https://your-frontend-domain.com
EOL

# Create a .gitignore to exclude build artifacts and env files
cat > .gitignore << EOL
# Dependencies
node_modules/

# Logs
logs
*.log
npm-debug.log*

# Environment variables
.env
.env.*
!.env.example
!.env.production.example

# Build directory
dist/

# Misc
.DS_Store
EOL
```

**Definition of Done**:
- Backend code prepared for production deployment
- Build script created for compiling TypeScript
- Production environment configuration set up

### 5.2 Prepare Frontend for Deployment

**Implementation Details**:
Update the frontend code for production deployment:

```bash
# Navigate to the frontend directory
cd ../frontend

# Create production environment file example
cat > .env.production.example << EOL
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com/api
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID=5201421
NEXT_PUBLIC_ENV=mainnet
EOL

# Update next.config.js for production
cat > next.config.js << EOL
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['via.placeholder.com', 'oaidalleapiprodscus.blob.core.windows.net'],
  },
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || 'testnet'
  }
};

module.exports = nextConfig;
EOL

# Update package.json for production build
cat > package.json << EOL
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "axios": "^1.3.4",
    "ethers": "^5.7.2",
    "next": "13.3.0",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "18.15.11",
    "@types/react": "18.0.33",
    "@types/react-dom": "18.0.11",
    "autoprefixer": "^10.4.14",
    "eslint": "8.38.0",
    "eslint-config-next": "13.3.0",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.3.1",
    "typescript": "5.0.4"
  }
}
EOL

# Create a Dockerfile
cat > Dockerfile << EOL
# Stage 1: Build the application
FROM node:16-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Run the application
CMD ["node", "server.js"]
EOL

# Create a .dockerignore file
cat > .dockerignore << EOL
node_modules
.next
.git
.env*
!.env.example
!.env.production.example
Dockerfile
.dockerignore
README.md
EOL
```

**Definition of Done**:
- Frontend code prepared for production deployment
- Next.js configuration updated for production
- Dockerfile created for containerized deployment

### 5.3 Create Deployment Scripts

**Implementation Details**:
Create scripts to automate the deployment process:

```bash
# Navigate to the project root
cd ..

# Create a deployment directory
mkdir -p deployment

# Create a script for backend deployment
cat > deployment/deploy-backend.sh << EOL
#!/bin/bash

# Backend deployment script

# Usage instructions
if [ "\$1" == "--help" ] || [ "\$1" == "-h" ]; then
  echo "Usage: ./deploy-backend.sh [environment]"
  echo "  environment: 'testnet' (default) or 'mainnet'"
  exit 0
fi

# Set environment
ENVIRONMENT=\${1:-testnet}
echo "Deploying backend for \$ENVIRONMENT environment..."

# Navigate to backend directory
cd ../backend

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building the application..."
npm run build

# Create .env file for the specified environment
if [ "\$ENVIRONMENT" == "mainnet" ]; then
  echo "Creating .env file for mainnet..."
  cp .env.production.example .env
  # You would need to manually update the values in .env or use a secret management tool
else
  echo "Creating .env file for testnet..."
  cp .env.example .env
  # You would need to manually update the values in .env or use a secret management tool
fi

echo "Backend deployment preparation complete!"
echo "You can now deploy the 'backend' directory to your hosting provider."
echo "Make sure to update the environment variables on your hosting platform."
EOL

chmod +x deployment/deploy-backend.sh

# Create a script for frontend deployment
cat > deployment/deploy-frontend.sh << EOL
#!/bin/bash

# Frontend deployment script

# Usage instructions
if [ "\$1" == "--help" ] || [ "\$1" == "-h" ]; then
  echo "Usage: ./deploy-frontend.sh [environment]"
  echo "  environment: 'testnet' (default) or 'mainnet'"
  exit 0
fi

# Set environment
ENVIRONMENT=\${1:-testnet}
echo "Deploying frontend for \$ENVIRONMENT environment..."

# Navigate to frontend directory
cd ../frontend

# Install dependencies
echo "Installing dependencies..."
npm ci

# Create .env file for the specified environment
if [ "\$ENVIRONMENT" == "mainnet" ]; then
  echo "Creating .env file for mainnet..."
  cp .env.production.example .env.production.local
  # You would need to manually update the values in .env.production.local or use a secret management tool
else
  echo "Creating .env file for testnet..."
  cp .env.example .env.local
  # You would need to manually update the values in .env.local or use a secret management tool
fi

# Build the application
echo "Building the application..."
npm run build

echo "Frontend deployment preparation complete!"
echo "You can now deploy the 'frontend/.next' directory to your hosting provider."
echo "For containerized deployment, you can build the Docker image using:"
echo "  docker build -t etn-task-ai-frontend ."
EOL

chmod +x deployment/deploy-frontend.sh

# Create a script for contract deployment
cat > deployment/deploy-contract.sh << EOL
#!/bin/bash

# Contract deployment script

# Usage instructions
if [ "\$1" == "--help" ] || [ "\$1" == "-h" ]; then
  echo "Usage: ./deploy-contract.sh [environment]"
  echo "  environment: 'testnet' (default) or 'mainnet'"
  exit 0
fi

# Set environment
ENVIRONMENT=\${1:-testnet}
echo "Deploying contract for \$ENVIRONMENT environment..."

# Navigate to contracts directory
cd ../contracts

# Install dependencies
echo "Installing dependencies..."
npm ci

# Update .env with the correct environment
echo "Updating .env file for \$ENVIRONMENT..."
echo "ENVIRONMENT=\$ENVIRONMENT" > .env.tmp
if [ "\$ENVIRONMENT" == "mainnet" ]; then
  echo "ETN_MAINNET_URL=https://rpc.ankr.com/electroneum" >> .env.tmp
  echo "ETN_EXPLORER_API_KEY=your_explorer_api_key" >> .env.tmp
else
  echo "ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet" >> .env.tmp
  echo "ETN_EXPLORER_API_KEY=your_explorer_api_key" >> .env.tmp
fi
echo "PRIVATE_KEY=your_wallet_private_key" >> .env.tmp
mv .env.tmp .env

echo "Contract deployment preparation complete!"
echo "You need to update the PRIVATE_KEY in .env with your wallet's private key."
echo "Then run the deployment with:"
echo "  npx hardhat run scripts/deploy.js --network electroneum"
echo "After deployment, update the CONTRACT_ADDRESS in backend and frontend .env files."
echo "Finally, verify the contract with:"
echo "  npx hardhat verify --network electroneum <DEPLOYED_CONTRACT_ADDRESS>"
EOL

chmod +x deployment/deploy-contract.sh

# Create a README for the deployment directory
cat > deployment/README.md << EOL
# Deployment Scripts

This directory contains scripts to deploy the ETN AI Services Marketplace application.

## Prerequisites

- Node.js 16 or later
- npm
- A wallet with ETN (testnet or mainnet)
- Access to your hosting provider's tools

## Deployment Steps

1. Deploy the Smart Contract:
   \`\`\`bash
   ./deploy-contract.sh [testnet|mainnet]
   \`\`\`
   Update the PRIVATE_KEY in the .env file before running the script.
   
2. Deploy the Backend:
   \`\`\`bash
   ./deploy-backend.sh [testnet|mainnet]
   \`\`\`
   Update the .env file with the correct values including the CONTRACT_ADDRESS.
   
3. Deploy the Frontend:
   \`\`\`bash
   ./deploy-frontend.sh [testnet|mainnet]
   \`\`\`
   Update the .env file with the correct values including the CONTRACT_ADDRESS and BACKEND_URL.

## Hosting Providers

### Backend Hosting
The backend can be deployed to services like:
- Heroku
- Digital Ocean
- AWS Elastic Beanstalk
- Google Cloud Run

### Frontend Hosting
The frontend can be deployed to services like:
- Vercel (recommended for Next.js)
- Netlify
- GitHub Pages
- AWS Amplify

## Environment Variables

Update the environment variables on your hosting provider's platform to match those in the .env files.

## Verifying Deployment

After deployment, test the application to ensure:
1. The frontend can connect to the backend API
2. Wallet connection works
3. Service listings are displayed
4. Payment processing works correctly
5. Service results are returned properly
EOL
```

**Definition of Done**:
- Deployment scripts created for backend, frontend, and contract
- Scripts handle different environments (testnet/mainnet)
- Documentation provided for deployment procedures

### 5.4 Create Docker Compose for Local Deployment

**Implementation Details**:
Create a Docker Compose configuration for local deployment and testing:

```bash
# Create docker-compose.yml
cat > docker-compose.yml << EOL
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - NODE_ENV=production
      - CONTRACT_ADDRESS=\${CONTRACT_ADDRESS}
      - ETN_TESTNET_URL=\${ETN_TESTNET_URL}
      - ETN_MAINNET_URL=\${ETN_MAINNET_URL}
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - ENVIRONMENT=\${ENVIRONMENT:-testnet}
      - CORS_ORIGIN=http://localhost:3000
    volumes:
      - backend_logs:/app/logs
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api
      - NEXT_PUBLIC_CONTRACT_ADDRESS=\${CONTRACT_ADDRESS}
      - NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID=\${ELECTRONEUM_CHAIN_ID:-5201420}
      - NEXT_PUBLIC_ETN_TESTNET_URL=\${ETN_TESTNET_URL}
      - NEXT_PUBLIC_ENV=\${ENVIRONMENT:-testnet}
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  backend_logs:
EOL

# Create a Docker Compose .env example
cat > .env.docker.example << EOL
# Contract settings
CONTRACT_ADDRESS=your_deployed_contract_address

# Network settings
ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum
ELECTRONEUM_CHAIN_ID=5201420

# API keys
OPENAI_API_KEY=your_openai_api_key

# Environment (testnet or mainnet)
ENVIRONMENT=testnet
EOL

# Create a backend Dockerfile
cat > backend/Dockerfile << EOL
FROM node:16-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Create log directory
RUN mkdir -p logs

# Expose the port
EXPOSE 4000

# Run the application
CMD ["npm", "start"]
EOL

# Create a script to start the Docker environment
cat > deployment/start-docker.sh << EOL
#!/bin/bash

# Usage instructions
if [ "\$1" == "--help" ] || [ "\$1" == "-h" ]; then
  echo "Usage: ./start-docker.sh [environment]"
  echo "  environment: 'testnet' (default) or 'mainnet'"
  exit 0
fi

# Set environment
ENVIRONMENT=\${1:-testnet}
echo "Starting Docker containers for \$ENVIRONMENT environment..."

# Create .env file for Docker
cp ../.env.docker.example ../.env

# Update the environment variable
sed -i '' "s/ENVIRONMENT=.*/ENVIRONMENT=\$ENVIRONMENT/" ../.env

echo "Docker environment configuration created."
echo "You need to update the values in the .env file before starting the containers."
echo "Then run the containers with:"
echo "  cd .. && docker-compose up -d"
EOL

chmod +x deployment/start-docker.sh
```

**Definition of Done**:
- Docker Compose configuration created for local deployment
- Environment variable setup for Docker
- Script created to start the Docker environment

### 5.5 Prepare for Mainnet Deployment

**Implementation Details**:
Create a checklist and configuration for mainnet deployment:

```bash
cat > deployment/mainnet-checklist.md << EOL
# Mainnet Deployment Checklist

Before deploying to the Electroneum mainnet, ensure you have completed the following steps:

## Prerequisites
- [ ] Application fully tested on testnet
- [ ] All identified issues resolved
- [ ] Environment variables updated for mainnet
- [ ] Sufficient ETN in the deployment wallet
- [ ] ANKR RPC credentials for mainnet (if using premium RPC)

## Smart Contract Deployment
- [ ] Create a dedicated wallet for contract deployment
- [ ] Fund the wallet with enough ETN for deployment (~0.1 ETN)
- [ ] Update ENVIRONMENT=mainnet in contracts/.env
- [ ] Update PRIVATE_KEY with deployment wallet's private key
- [ ] Run deployment script: \`npx hardhat run scripts/deploy.js --network electroneum\`
- [ ] Record the deployed contract address
- [ ] Verify the contract on Electroneum mainnet explorer

## Backend Configuration
- [ ] Update CONTRACT_ADDRESS with the mainnet contract address
- [ ] Update ETN_MAINNET_URL with the correct RPC endpoint
- [ ] Update ENVIRONMENT=mainnet
- [ ] Set NODE_ENV=production
- [ ] Ensure OPENAI_API_KEY is set with a production key
- [ ] Configure CORS_ORIGIN to allow only your frontend domain

## Frontend Configuration
- [ ] Update NEXT_PUBLIC_CONTRACT_ADDRESS with the mainnet contract address
- [ ] Update NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID=5201421 (mainnet)
- [ ] Update NEXT_PUBLIC_ENV=mainnet
- [ ] Update NEXT_PUBLIC_BACKEND_URL with the production backend URL
- [ ] Build and deploy the frontend to a production hosting service

## Security Checks
- [ ] Ensure no private keys or API keys are committed to the repository
- [ ] Verify contract permissions are correctly set (owner address)
- [ ] Implement rate limiting on the backend API
- [ ] Enable HTTPS for all endpoints
- [ ] Review API endpoints for potential vulnerabilities

## Monitoring and Operations
- [ ] Set up logging and monitoring for the backend
- [ ] Create a backup of the deployment wallet private key
- [ ] Document the deployment addresses and configuration
- [ ] Set up alerts for service disruptions
- [ ] Create a plan for contract upgrades (if needed)

## Post-Deployment Verification
- [ ] Verify wallet connection works on mainnet
- [ ] Test a sample payment flow
- [ ] Confirm service responses are working
- [ ] Check payment events are properly recorded
- [ ] Verify the contract owner can withdraw funds
EOL

# Create a mainnet env template for backend
cat > backend/.env.mainnet << EOL
PORT=4000
NODE_ENV=production
OPENAI_API_KEY=your_production_openai_api_key
CONTRACT_ADDRESS=your_mainnet_contract_address
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum
ENVIRONMENT=mainnet
CORS_ORIGIN=https://your-frontend-domain.com
EOL

# Create a mainnet env template for frontend
cat > frontend/.env.mainnet << EOL
NEXT_PUBLIC_BACKEND_URL=https://your-production-backend-url.com/api
NEXT_PUBLIC_CONTRACT_ADDRESS=your_mainnet_contract_address
NEXT_PUBLIC_ELECTRONEUM_CHAIN_ID=5201421
NEXT_PUBLIC_ENV=mainnet
EOL

# Create a mainnet env template for contracts
cat > contracts/.env.mainnet << EOL
PRIVATE_KEY=your_deployment_wallet_private_key
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum
ETN_EXPLORER_API_KEY=your_explorer_api_key
ENVIRONMENT=mainnet
EOL
```

**Definition of Done**:
- Mainnet deployment checklist created
- Environment templates created for mainnet
- Security and operational considerations documented

### 5.6 Create Deployment Verification Test

**Implementation Details**:
Create a script to verify deployment:

```bash
cat > deployment/verify-deployment.js << EOL
const axios = require('axios');
const { ethers } = require('ethers');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask for user input
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  try {
    console.log("ETN AI Services Marketplace Deployment Verification");
    console.log("=================================================");
    
    // Get deployment information
    const backendUrl = await askQuestion("Enter the backend URL (e.g., https://api.example.com): ");
    const frontendUrl = await askQuestion("Enter the frontend URL (e.g., https://app.example.com): ");
    const contractAddress = await askQuestion("Enter the contract address: ");
    const rpcUrl = await askQuestion("Enter the RPC URL: ");
    
    console.log("\nVerifying deployment...\n");
    
    // Check backend health
    console.log("1. Checking backend health...");
    try {
      const healthResponse = await axios.get(\`\${backendUrl}/health\`);
      if (healthResponse.data.status === "ok") {
        console.log("✅ Backend is healthy");
      } else {
        console.log("❌ Backend health check failed");
      }
    } catch (error) {
      console.error("❌ Backend health check failed:", error.message);
    }
    
    // Check backend API services
    console.log("\n2. Checking backend API services...");
    try {
      const servicesResponse = await axios.get(\`\${backendUrl}/api/services\`);
      const serviceCount = servicesResponse.data.services?.length || 0;
      console.log(\`✅ Backend API services endpoint working (\${serviceCount} services available)\`);
    } catch (error) {
      console.error("❌ Backend API services endpoint failed:", error.message);
    }
    
    // Check frontend
    console.log("\n3. Checking frontend...");
    console.log("   Please manually verify the frontend at:", frontendUrl);
    
    // Check contract
    console.log("\n4. Checking contract...");
    try {
      // Simple ABI with just the owner function
      const abi = ["function owner() view returns (address)"];
      
      // Connect to the contract
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      
      // Get the contract owner
      const owner = await contract.owner();
      console.log("✅ Contract is accessible");
      console.log("   Contract owner:", owner);
    } catch (error) {
      console.error("❌ Contract check failed:", error.message);
    }
    
    console.log("\nDeployment verification complete!");
    console.log("For a complete verification, manually test the following:");
    console.log("1. Wallet connection on the frontend");
    console.log("2. Service browsing and selection");
    console.log("3. Complete payment flow");
    console.log("4. Service execution and results display");
    
  } catch (error) {
    console.error("Error during verification:", error);
  } finally {
    rl.close();
  }
}

main();
EOL

# Create a bash wrapper for the verification script
cat > deployment/verify-deployment.sh << EOL
#!/bin/bash

# Run the verification script
node verify-deployment.js
EOL

chmod +x deployment/verify-deployment.sh
```

**Definition of Done**:
- Deployment verification script created
- Script checks backend, frontend, and contract accessibility
- Instructions provided for manual verification steps

### 5.7 Create Continuous Integration Script

**Implementation Details**:
Create a CI configuration for automated testing:

```bash
# Create GitHub Actions workflow
mkdir -p .github/workflows

cat > .github/workflows/ci.yml << EOL
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]

    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        npm ci
        cd frontend && npm ci
        cd ../backend && npm ci
        cd ../contracts && npm ci
    
    - name: Build backend
      run: cd backend && npm run build
    
    - name: Build frontend
      run: cd frontend && npm run build
    
    - name: Compile contracts
      run: cd contracts && npx hardhat compile
    
    - name: Run contract tests
      run: cd contracts && npx hardhat test
    
    - name: Run linting
      run: |
        cd frontend && npm run lint
    
    - name: Check types
      run: |
        cd backend && npx tsc --noEmit
        cd ../frontend && npx tsc --noEmit

  docker-build:
    runs-on: ubuntu-latest
    needs: build-and-test
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Build backend Docker image
      uses: docker/build-push-action@v4
      with:
        context: ./backend
        push: false
        tags: etn-task-ai-backend:latest
    
    - name: Build frontend Docker image
      uses: docker/build-push-action@v4
      with:
        context: ./frontend
        push: false
        tags: etn-task-ai-frontend:latest
EOL

# Create a package.json for the root with CI commands
cat > package.json << EOL
{
  "name": "etn-task-ai",
  "version": "1.0.0",
  "description": "AI Services Marketplace powered by Electroneum micropayments",
  "main": "index.js",
  "scripts": {
    "test": "npm run test:contracts && npm run typecheck:backend && npm run lint:frontend",
    "test:contracts": "cd contracts && npx hardhat test",
    "typecheck:backend": "cd backend && npx tsc --noEmit",
    "lint:frontend": "cd frontend && npm run lint",
    "build": "npm run build:backend && npm run build:frontend && npm run build:contracts",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    "build:contracts": "cd contracts && npx hardhat compile",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "install-all": "npm i && cd frontend && npm i && cd ../backend && npm i && cd ../contracts && npm i"
  },
  "keywords": [
    "electroneum",
    "blockchain",
    "ai",
    "marketplace"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}
EOL

# Create pull request template
mkdir -p .github/PULL_REQUEST_TEMPLATE

cat > .github/PULL_REQUEST_TEMPLATE/pull_request_template.md << EOL
## Description
<!-- Brief description of the changes -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Other (please describe)

## Testing
<!-- Describe the tests you ran to verify your changes -->

## Checklist
- [ ] My code follows the project's coding style
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] I have tested my changes
- [ ] I have updated the documentation if necessary

## Screenshots (if applicable)
<!-- Add screenshots to help explain your changes -->

## Additional Notes
<!-- Any other information that would be helpful -->
EOL
```

**Definition of Done**:
- CI workflow created for GitHub Actions
- Workflow runs tests and builds all components
- Pull request template created for contributions

### 5.8 Create Release Process Documentation

**Implementation Details**:
Create documentation for the release process:

```bash
cat > deployment/release-process.md << EOL
# Release Process

This document outlines the process for releasing new versions of the ETN AI Services Marketplace.

## Version Numbering

We use semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR version for incompatible API changes
- MINOR version for new features in a backward-compatible manner
- PATCH version for backward-compatible bug fixes

## Release Checklist

### Pre-Release
1. Ensure all tests pass on the develop branch
2. Update version numbers:
   - Update version in package.json files
   - Update version in README.md
3. Update CHANGELOG.md with release notes
4. Create a release branch from develop: \`git checkout -b release/vX.Y.Z\`
5. Push the release branch to GitHub
6. Create a pull request to merge the release branch into main

### Testing
1. Deploy the release to a staging environment
2. Perform manual testing according to the testing checklist
3. Verify all features work correctly
4. Fix any issues found during testing directly in the release branch

### Release
1. Merge the release branch into main
2. Tag the release on GitHub: \`git tag vX.Y.Z\`
3. Push the tag: \`git push origin vX.Y.Z\`
4. Create a GitHub release with release notes
5. Deploy to production following the deployment process

### Post-Release
1. Merge main back into develop
2. Update the develop branch version to the next planned version with \`-dev\` suffix
3. Communicate the release to stakeholders

## Deployment Schedule

- Testnet deployments can be performed as needed during development
- Mainnet deployments should only be performed after thorough testing
- Critical security fixes may be deployed outside the regular schedule

## Rollback Procedure

If issues are discovered after deployment:

1. Identify the nature and severity of the issue
2. For critical issues, immediately deploy the previous stable version
3. For non-critical issues, create a hotfix branch from main
4. Fix the issue and follow a condensed release process
5. Deploy the hotfix to production

## Release Naming

The release name format is: \`vX.Y.Z\`

Example: \`v1.0.0\`

## Release Notes

Release notes should include:
- New features
- Bug fixes
- Breaking changes
- Known issues
- Upgrade instructions (if applicable)
EOL
```

**Definition of Done**:
- Release process documentation created
- Documentation covers versioning, checklists, and procedures
- Rollback procedure defined for issues

### 5.9 Create ANKR RPC Configuration

**Implementation Details**:
Create configuration for using ANKR's premium RPC service:

```bash
cat > deployment/ankr-setup.md << EOL
# ANKR RPC Setup

This document explains how to configure the project to use ANKR's Premium RPC service for Electroneum blockchain access.

## Why Use ANKR Premium RPC?

- Higher rate limits for API requests
- More reliable and stable connection
- Enhanced performance for blockchain interactions
- Better monitoring and analytics

## Setup Steps

### 1. Register for ANKR Premium

1. Go to [ANKR Premium RPC](https://www.ankr.com/rpc/premium/)
2. Create an account or log in
3. Subscribe to the premium plan
4. Create an API key for Electroneum

### 2. Get Your ANKR Endpoint URLs

After subscription, you will receive:
- Electroneum Mainnet RPC URL: \`https://rpc.ankr.com/electroneum/<YOUR_API_KEY>\`
- Electroneum Testnet RPC URL: \`https://rpc.ankr.com/electroneum_testnet/<YOUR_API_KEY>\`

### 3. Update Environment Variables

#### Backend (.env)
\`\`\`
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum/<YOUR_API_KEY>
ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet/<YOUR_API_KEY>
\`\`\`

#### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet/<YOUR_API_KEY>
\`\`\`

#### Contracts (.env)
\`\`\`
ETN_MAINNET_URL=https://rpc.ankr.com/electroneum/<YOUR_API_KEY>
ETN_TESTNET_URL=https://rpc.ankr.com/electroneum_testnet/<YOUR_API_KEY>
\`\`\`

### 4. Update Hardhat Configuration

In \`contracts/hardhat.config.js\`, ensure you're using the ANKR URLs:

\`\`\`javascript
const ETN_TESTNET_URL = process.env.ETN_TESTNET_URL || "https://rpc.ankr.com/electroneum_testnet/<YOUR_API_KEY>";
const ETN_MAINNET_URL = process.env.ETN_MAINNET_URL || "https://rpc.ankr.com/electroneum/<YOUR_API_KEY>";
\`\`\`

### 5. Test the Connection

Run the following test to verify your ANKR RPC connection:

\`\`\`javascript
const { ethers } = require("ethers");

async function testAnkrConnection() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.ETN_TESTNET_URL);
  
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log("Current block number:", blockNumber);
    console.log("Connection successful!");
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

testAnkrConnection();
\`\`\`

## Security Considerations

- Never commit your ANKR API key to version control
- Store the API key in environment variables or a secure secret management system
- Restrict API access by IP address if possible
- Monitor your API usage to detect unusual patterns

## Fallback Strategy

In case the ANKR RPC service is unavailable, implement a fallback strategy:

\`\`\`javascript
// Example fallback implementation
const primaryRpcUrl = process.env.ETN_TESTNET_URL;
const fallbackRpcUrl = "https://public-rpc.electroneum.com"; // Public RPC (example)

let provider;
try {
  provider = new ethers.providers.JsonRpcProvider(primaryRpcUrl);
  // Test the connection
  await provider.getBlockNumber();
} catch (error) {
  console.warn("Primary RPC connection failed, using fallback:", error.message);
  provider = new ethers.providers.JsonRpcProvider(fallbackRpcUrl);
}
\`\`\`
EOL
```

**Definition of Done**:
- ANKR RPC setup documentation created
- Configuration examples provided for all components
- Fallback strategy implemented for RPC unavailability

### 5.10 Create Hosting Provider Setup Documentation

**Implementation Details**:
Create documentation for different hosting providers:

```bash
cat > deployment/hosting-providers.md << EOL
# Hosting Provider Setup

This document provides setup instructions for deploying the ETN AI Services Marketplace to various hosting providers.

## Backend Hosting

### Heroku

1. Create a Heroku account and install the Heroku CLI
2. Create a new app: \`heroku create etn-task-ai-backend\`
3. Add environment variables:
   \`\`\`bash
   heroku config:set NODE_ENV=production
   heroku config:set OPENAI_API_KEY=your_api_key
   heroku config:set CONTRACT_ADDRESS=your_contract_address
   heroku config:set ETN_MAINNET_URL=your_rpc_url
   heroku config:set ENVIRONMENT=mainnet
   heroku config:set CORS_ORIGIN=your_frontend_url
   \`\`\`
4. Deploy the application:
   \`\`\`bash
   git subtree push --prefix backend heroku main
   \`\`\`

### Digital Ocean App Platform

1. Create a Digital Ocean account
2. Create a new App Platform app
3. Connect your GitHub repository
4. Configure the app:
   - Source directory: \`backend\`
   - Build command: \`npm run build\`
   - Run command: \`npm start\`
5. Add environment variables in the app settings
6. Deploy the application

### AWS Elastic Beanstalk

1. Create an AWS account and install the EB CLI
2. Navigate to the backend directory
3. Initialize the EB environment: \`eb init\`
4. Create the environment: \`eb create etn-task-ai-backend\`
5. Configure environment variables:
   \`\`\`bash
   eb setenv NODE_ENV=production OPENAI_API_KEY=your_api_key CONTRACT_ADDRESS=your_contract_address ETN_MAINNET_URL=your_rpc_url ENVIRONMENT=mainnet CORS_ORIGIN=your_frontend_url
   \`\`\`
6. Deploy the application: \`eb deploy\`

## Frontend Hosting

### Vercel (Recommended for Next.js)

1. Create a Vercel account
2. Import your GitHub repository
3. Configure the project:
   - Framework preset: Next.js
   - Root directory: \`frontend\`
4. Add environment variables in the project settings
5. Deploy the application

### Netlify

1. Create a Netlify account
2. Import your GitHub repository
3. Configure the build settings:
   - Base directory: \`frontend\`
   - Build command: \`npm run build\`
   - Publish directory: \`.next\`
4. Add environment variables in the site settings
5. Deploy the application

### GitHub Pages

For GitHub Pages, you'll need to export your Next.js app as static HTML:

1. Update \`next.config.js\` to enable static export:
   \`\`\`javascript
   module.exports = {
     output: 'export',
     // other config...
   };
   \`\`\`
2. Build the static export: \`npm run build\`
3. Move the contents of the \`out\` directory to your GitHub Pages branch
4. Configure GitHub Pages to serve from that branch

## Docker Deployment

### Using Docker Compose

1. Ensure Docker and Docker Compose are installed
2. Update the environment variables in the \`.env\` file
3. Build and start the containers:
   \`\`\`bash
   docker-compose up -d
   \`\`\`
4. Verify the services are running:
   \`\`\`bash
   docker-compose ps
   \`\`\`

### Kubernetes Deployment

1. Create Kubernetes deployment files:
   - backend-deployment.yaml
   - frontend-deployment.yaml
   - backend-service.yaml
   - frontend-service.yaml
   - configmap.yaml (for environment variables)
   - secret.yaml (for sensitive environment variables)
2. Apply the configuration:
   \`\`\`bash
   kubectl apply -f ./kubernetes/
   \`\`\`
3. Verify the pods are running:
   \`\`\`bash
   kubectl get pods
   \`\`\`

## Domain and SSL Setup

### Custom Domain Configuration

1. Purchase a domain name
2. Configure DNS settings to point to your hosting provider
3. Add the domain in your hosting provider's settings
4. Configure SSL certificates (Let's Encrypt recommended)

### SSL Certificate Installation

Most cloud hosting providers will automatically handle SSL certificate generation and renewal using Let's Encrypt. For manual setup:

1. Install Certbot: \`apt-get install certbot\`
2. Generate a certificate: \`certbot certonly --webroot -w /path/to/webroot -d your-domain.com\`
3. Configure your web server to use the certificate
4. Set up automatic renewal: \`certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start"\`
EOL
```

**Definition of Done**:
- Hosting provider documentation created
- Setup instructions provided for different hosting options
- Domain and SSL configuration documented


