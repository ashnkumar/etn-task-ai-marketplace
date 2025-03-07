import { v4 as uuidv4 } from 'uuid';

// Generate a unique request ID
export function generateRequestId(prefix = 'req'): string {
  return \`\${prefix}-\${uuidv4().substring(0, 8)}\`;
}