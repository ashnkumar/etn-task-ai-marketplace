import { v4 as uuidv4 } from 'uuid';

// Generate a unique request ID with service prefix
export function generateRequestId(serviceId: string): string {
  // Map service IDs to short prefixes
  const prefixMap: {[key: string]: string} = {
    "smart-contract-auditor": "sma",
    "defi-risk-analyzer": "def",
    "tokenomics-architect": "tok",
    "crypto-meme-maker": "cry",
    "code-summarizer": "cod",
    "pitch-polisher": "pit",
    "dao-governance-wizard": "dao",
    "nft-artwork-generator": "nft"
  };
  
  const prefix = prefixMap[serviceId] || "gen";
  return `${prefix}-${uuidv4().substring(0, 8)}`;
}