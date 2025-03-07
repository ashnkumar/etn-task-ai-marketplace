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