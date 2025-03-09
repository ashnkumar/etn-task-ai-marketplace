#!/bin/bash

# Deployment script for ETN Task AI
# Usage: ./deploy.sh [testnet|mainnet]

# Default to testnet if no argument provided
ENV=${1:-testnet}

echo "Selected environment: $ENV"

# Use exact string comparison
if [ "$ENV" != "testnet" ] && [ "$ENV" != "mainnet" ]; then
  echo "Invalid environment. Use 'testnet' or 'mainnet'."
  exit 1
fi

echo "Deploying to $ENV..."

# 1. Set up contract environment
echo "Setting up contract environment..."
cp contracts/.env.$ENV contracts/.env

# 2. Deploy contract
echo "Deploying contract..."
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network electroneum
cd ..

# 3. Update contract address
echo ""
echo "Contract deployed. Please enter the deployed contract address:"
read CONTRACT_ADDRESS

# 4. Update frontend and backend configs
echo "Updating frontend and backend configurations..."
if [ "$(uname)" == "Darwin" ]; then
  # macOS version of sed
  sed -i '' "s|NEXT_PUBLIC_CONTRACT_ADDRESS=.*|NEXT_PUBLIC_CONTRACT_ADDRESS=$CONTRACT_ADDRESS|" frontend/.env.$ENV
  sed -i '' "s|CONTRACT_ADDRESS=.*|CONTRACT_ADDRESS=$CONTRACT_ADDRESS|" backend/.env.$ENV
else
  # Linux version of sed
  sed -i "s|NEXT_PUBLIC_CONTRACT_ADDRESS=.*|NEXT_PUBLIC_CONTRACT_ADDRESS=$CONTRACT_ADDRESS|" frontend/.env.$ENV
  sed -i "s|CONTRACT_ADDRESS=.*|CONTRACT_ADDRESS=$CONTRACT_ADDRESS|" backend/.env.$ENV
fi

# 5. Copy environment files
cp frontend/.env.$ENV frontend/.env.local
cp backend/.env.$ENV backend/.env

# 6. Register services
echo "Registering services..."
cd contracts
npx hardhat run scripts/register-services.js --network electroneum
cd ..

echo ""
echo "Deployment completed! Contract address: $CONTRACT_ADDRESS"
echo "Environment: $ENV"
echo ""
echo "Next steps:"
echo "1. Start backend: cd backend && npm run dev"
echo "2. Start frontend: cd frontend && npm run dev"
echo ""