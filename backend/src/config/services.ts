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
  aiModel?: string; // e.g., "gpt-3.5-turbo" for OpenAI
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
    aiModel: "gpt-3.5-turbo",
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
    aiModel: "gpt-4",
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
    aiModel: "gpt-4",
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