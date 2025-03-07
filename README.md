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