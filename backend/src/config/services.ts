// Service types
export type ServiceType = 'text' | 'image' | 'code' | 'data';
export type TemplateType = 'text_only' | 'text_and_file' | 'image';

// Service interface
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string; // ETN amount as string, e.g., "0.05"
  priceModel: 'fixed' | 'variable';
  type: ServiceType;
  template_type: TemplateType;
  tagline: string;
  instructions: string;
  system_prompt: string;
  demo_input?: string;
  mockResponses?: Record<string, string>; // For development/testing
  aiModel?: string; // e.g., "gpt-4o-mini" for OpenAI
  supportedFiles?: string[]; // File extensions supported by this service
  maxInputLength?: number; // Maximum input length in characters
  image?: string; // Path to service image
}

// Load service data from JSON file
import fs from 'fs';
import path from 'path';

// Define path to JSON file
const servicesFilePath = path.join(__dirname, '../../../shared/data/marketplace-services.json');

// Load services from JSON file
let servicesData: Service[] = [];
try {
  const jsonData = fs.readFileSync(servicesFilePath, 'utf8');
  const rawServices = JSON.parse(jsonData);
  
  // Transform the raw data to match our Service interface
  servicesData = rawServices.map((service: any) => ({
    ...service,
    priceModel: 'variable', // Default to variable pricing
    mockResponses: service.demo_input ? { [service.demo_input]: '' } : {} // Create empty mock responses
  }));
  
  console.log(`Loaded ${servicesData.length} services from JSON file`);
} catch (error) {
  console.error('Error loading services from JSON file:', error);
  // Provide fallback services in case the file cannot be loaded
  servicesData = [
    {
      id: "language-translator",
      name: "Language Translator",
      description: "Translate text between over 100 languages with high accuracy.",
      basePrice: "0.05",
      priceModel: "variable",
      type: "text",
      template_type: "text_only",
      tagline: "Translate text between over 100 languages with high accuracy.",
      instructions: "Enter text to translate and specify the target language.",
      system_prompt: "You are a professional translator. Translate the text provided by the user to the requested language. Maintain the original meaning and tone as much as possible.",
      aiModel: "gpt-4o-mini",
      mockResponses: {
        "Translate to French: Hello, how are you?": "Bonjour, comment allez-vous?"
      }
    },
    {
      id: "image-generator",
      name: "AI Image Generator",
      description: "Create stunning images from text descriptions.",
      basePrice: "0.20",
      priceModel: "fixed",
      type: "image",
      template_type: "image",
      tagline: "Create stunning images from text descriptions.",
      instructions: "Describe the image you want to generate in detail.",
      system_prompt: "You are an image generator AI. Create a detailed image based on the user's text description.",
      aiModel: "dall-e-3"
    }
  ];
}

// Export loaded services
export const services: Service[] = servicesData;

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