import { v4 as uuidv4 } from 'uuid';

// Generate a unique request ID with service prefix
export function generateRequestId(serviceId: string): string {
  // Map service IDs to short prefixes
  const prefixMap: {[key: string]: string} = {
    "language-translator": "lan",
    "image-generator": "img",
    "content-writer": "con",
    "code-assistant": "cod",
    "data-analyzer": "dat"
  };
  
  const prefix = prefixMap[serviceId] || "gen";
  return `${prefix}-${uuidv4().substring(0, 8)}`;
}