# Technical Specification: Implementing Dynamic AI Services in ETN Marketplace

This implementation will replace the generic AI services with specialized services that use targeted system prompts for better results. The approach will maintain our existing template types (`text_only`, `text_and_file`, `image`) while introducing service-specific behavior through system prompts.

## Implementation Plan

### Phase 1: Create Services Data Structure

#### 1.1 Create Custom Services JSON File

**Implementation Details**:
Create a new JSON file to store our custom AI services data.

```bash
mkdir -p shared/data
touch shared/data/marketplace-services.json
```

Add the JSON content to the file:

```json
[
  {
    "id": "smart-contract-auditor",
    "name": "Smart Contract Auditor",
    "description": "Uncover potential issues in your Solidity contracts.",
    "template_type": "text_and_file",
    "basePrice": "0.20",
    "type": "code",
    "tagline": "Uncover potential issues in your Solidity contracts.",
    "instructions": "Upload your Solidity file (or snippet) and provide any relevant context. The AI will analyze your code for common vulnerabilities and best-practice compliance, returning a detailed audit report in Markdown.",
    "system_prompt": "You are an experienced smart contract auditor. The user will supply a Solidity contract (plus optional context). Carefully examine the code to identify security vulnerabilities, logic flaws, or optimization opportunities. Summarize findings in a clear, organized format (Markdown is fine). Provide actionable recommendations for improvements, referencing relevant Solidity best practices and known exploit vectors.",
    "demo_input": "Please review my token contract for re-entrancy or integer overflow issues. It's meant to handle ERC20 transfers."
  },
  {
    "id": "defi-risk-analyzer",
    "name": "DeFi Risk Analyzer",
    "description": "Assess weaknesses in your DeFi protocol designs.",
    "template_type": "text_only",
    "basePrice": "0.15",
    "type": "text",
    "tagline": "Assess weaknesses in your DeFi protocol designs.",
    "instructions": "Describe your DeFi protocol's structure, mechanics, and goals. The AI will highlight potential risk factors (economic exploits, liquidity issues, governance attacks, etc.) and suggest mitigations, returning a detailed analysis in Markdown.",
    "system_prompt": "You are a specialized DeFi risk consultant. The user will present details of their DeFi application (e.g., liquidity pools, yield farms, lending platforms). Provide an in-depth risk assessment, outlining likely attacks (flash loan exploits, oracle manipulation, etc.) and recommended safeguards. Include an overview of potential economic or governance vulnerabilities, plus best-practice mitigations.",
    "demo_input": "We have a lending pool with a variable interest rate pegged to an oracle feed. What risks should we watch for?"
  },
  {
    "id": "tokenomics-architect",
    "name": "Tokenomics Architect",
    "description": "Shape robust token models for sustainable growth.",
    "template_type": "text_only",
    "basePrice": "0.15",
    "type": "text",
    "tagline": "Shape robust token models for sustainable growth.",
    "instructions": "Enter your token model's details—distribution, inflation schedule, utility mechanics, etc.—and any known constraints. The AI will refine your tokenomics, offering suggestions on supply schedules, incentive alignment, and governance structures in Markdown.",
    "system_prompt": "You are an expert in tokenomics and blockchain economics. The user will provide details of their token model. Propose improvements and strategies to ensure fairness, sustainability, and alignment of incentives among stakeholders. Suggest distribution schedules, governance considerations, and potential real-world use cases. Present your recommendations in a structured, professional format (Markdown).",
    "demo_input": "I'm planning a token for a gaming ecosystem with a max supply of 100M, plus staking rewards. Any improvements?"
  },
  {
    "id": "crypto-meme-maker",
    "name": "Crypto Meme Maker",
    "description": "Generate fun, on-trend crypto memes from text prompts.",
    "template_type": "image",
    "basePrice": "0.20",
    "type": "image",
    "tagline": "Generate fun, on-trend crypto memes from text prompts.",
    "instructions": "Enter your meme idea (e.g., 'Bullish dog riding a rocket, comedic style'). The AI will create a humorous on-trend image featuring your concept.",
    "system_prompt": "You are a creative image generator specializing in crypto culture and humor. The user will provide a meme concept in text form. Convert that concept into an entertaining image, paying attention to comedic elements, crypto references, and modern meme aesthetics.",
    "demo_input": "A cartoonish Bitcoin whale hoarding coins while people chase after it, comedic style."
  },
  {
    "id": "code-summarizer",
    "name": "Code Summarizer & Refactor",
    "description": "Upload code to receive a succinct summary and improvement tips.",
    "template_type": "text_and_file",
    "basePrice": "0.10",
    "type": "code",
    "tagline": "Upload code to receive a succinct summary and improvement tips.",
    "instructions": "Provide a snippet or file of code (any language) along with optional notes. The AI will produce a concise explanation of what the code does, highlight potential bugs, and suggest refactoring improvements in Markdown.",
    "system_prompt": "You are an advanced code analysis assistant. The user provides code plus optional remarks. Summarize the code's functionality in plain language, note possible edge cases or bugs, and recommend refactor or performance improvements. Format your response as a structured Markdown report.",
    "demo_input": "This is a Python script for parsing CSV data. Please check if there's any performance bottleneck."
  },
  {
    "id": "pitch-polisher",
    "name": "Pitch Polisher",
    "description": "Elevate your project pitch or whitepaper with professional polish.",
    "template_type": "text_only",
    "basePrice": "0.10",
    "type": "text",
    "tagline": "Elevate your project pitch or whitepaper with professional polish.",
    "instructions": "Paste your raw pitch, whitepaper text, or overall project description. The AI will refine the language, style, and structure, returning a professional, compelling version in Markdown with headings and bullet points where relevant.",
    "system_prompt": "You are a top-tier copywriter specializing in blockchain project pitches and whitepapers. The user provides a rough text. Your job is to enhance clarity, professionalism, and persuasiveness. Maintain the original meaning while improving the structure, grammar, and style. Return a polished result, using Markdown for headings, lists, and emphasis where useful.",
    "demo_input": "Our project aims to revolutionize digital identity with NFTs. The text is a bit messy. Can you make it more convincing?"
  },
  {
    "id": "dao-governance-wizard",
    "name": "DAO Governance Wizard",
    "description": "Design effective governance frameworks for decentralized organizations.",
    "template_type": "text_only",
    "basePrice": "0.15",
    "type": "text",
    "tagline": "Design effective governance frameworks for decentralized organizations.",
    "instructions": "Describe your DAO's purpose, membership structure, and voting mechanisms. The AI will propose enhancements for fair, efficient governance in Markdown format.",
    "system_prompt": "You are an experienced DAO governance architect. The user will outline their decentralized organization's goals and membership/voting rules. Provide refined governance approaches—like quorum thresholds, token-weighted voting, or alternative mechanisms—to ensure transparency, fairness, and security. Return your suggestions and rationale in a clear, well-structured Markdown format.",
    "demo_input": "We have a DAO of 500 members, each holding unique tokens. Currently only 10% need to vote to pass proposals. Need better safeguards!"
  },
  {
    "id": "nft-artwork-generator",
    "name": "NFT Artwork Generator",
    "description": "Create distinctive NFT visuals from concept prompts.",
    "template_type": "image",
    "basePrice": "0.25",
    "type": "image",
    "tagline": "Create distinctive NFT visuals from concept prompts.",
    "instructions": "Enter a creative concept (e.g. 'Neon cyberpunk lion with glitch effects'). The AI will generate a unique artwork suiting NFT minting style.",
    "system_prompt": "You are a highly creative image generator specialized in producing visually striking artwork that can serve as NFTs. The user will provide a concept or style request. Render a distinctive, eye-catching design that aligns with modern NFT aesthetics.",
    "demo_input": "A cosmic koi fish swirling through a galaxy of neon stars, bold color scheme."
  }
]
```

**Definition of Done**:
- JSON file created with 8 specialized AI services
- Each service has a unique ID, name, description, template type, price, and system prompt

### Phase 2: Update Backend Services Configuration

#### 2.1 Modify Service Interface in Backend

**Implementation Details**:
Update the Service interface in `backend/src/config/services.ts` to include the new fields:

```typescript
// Replace the entire file with this content
// backend/src/config/services.ts

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
```

**Definition of Done**:
- Service interface updated to include new fields (template_type, tagline, instructions, system_prompt, demo_input)
- Logic added to load services from the JSON file
- Fallback services provided in case the file cannot be loaded

#### 2.2 Update AI Service Utility to Use System Prompts

**Implementation Details**:
Modify the AI service utility in `backend/src/utils/aiService.ts` to use the system prompt from the service configuration:

```typescript
// Find the processTextService function and replace it with this code
// backend/src/utils/aiService.ts - processTextService function

async function processTextService(service: Service, input: string, options: any): Promise<any> {
  console.log(`Processing text service with model: ${service.aiModel || "gpt-4o-mini"}`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Use OpenAI API with the service's system prompt
    const completion = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1500,
    });
    
    const result = completion.choices[0].message?.content || "No response generated";
    console.log(`OpenAI response received, length: ${result.length} chars`);
    console.log(`First 100 chars of response: "${result.substring(0, 100)}..."`);
    
    return { 
      result,
      serviceType: 'text'
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}
```

```typescript
// Find the streamTextService function and replace it with this code
// backend/src/utils/aiService.ts - streamTextService function

async function streamTextService(service: Service, input: string, res: Response, options: any): Promise<void> {
  console.log(`Streaming text service with model: ${service.aiModel || "gpt-4o-mini"}`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Use OpenAI API with streaming and the service's system prompt
    const stream = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1500,
      stream: true,
    });
    
    // Send an initial empty delta to start the stream
    res.write(`data: ${JSON.stringify({ content: "", done: false })}\n\n`);
    
    // Process the stream
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
      }
    }
    
    // End the stream
    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
    
    console.log(`Text streaming completed for service ${service.id}`);
  } catch (error) {
    console.error("OpenAI API streaming error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.write(`data: ${JSON.stringify({ error: `Error: ${errorMessage}`, done: true })}\n\n`);
    res.end();
  }
}
```

```typescript
// Find the processCodeService function and replace it with this code
// backend/src/utils/aiService.ts - processCodeService function

async function processCodeService(service: Service, input: string, options: any): Promise<any> {
  console.log(`Processing code service with prompt: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Use OpenAI with code-specific prompt and the service's system prompt
    const completion = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.3, // Lower temperature for code
      max_tokens: options.maxTokens || 1500,
    });
    
    const result = completion.choices[0].message?.content || "No code generated";
    console.log(`Code response received, length: ${result.length} chars`);
    
    return { 
      result,
      serviceType: 'code'
    };
  } catch (error) {
    console.error("OpenAI API error for code generation:", error);
    throw error;
  }
}
```

```typescript
// Find the streamCodeService function and replace it with this code
// backend/src/utils/aiService.ts - streamCodeService function

async function streamCodeService(service: Service, input: string, res: Response, options: any): Promise<void> {
  console.log(`Streaming code service with prompt: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Use OpenAI with code-specific prompt and streaming, with the service's system prompt
    const stream = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.3,
      max_tokens: options.maxTokens || 1500,
      stream: true,
    });
    
    // Send an initial empty delta to start the stream
    res.write(`data: ${JSON.stringify({ content: "", done: false })}\n\n`);
    
    // Process the stream
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
      }
    }
    
    // End the stream
    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
    
    console.log(`Code streaming completed for service ${service.id}`);
  } catch (error) {
    console.error("OpenAI API streaming error for code:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.write(`data: ${JSON.stringify({ error: `Error: ${errorMessage}`, done: true })}\n\n`);
    res.end();
  }
}
```

```typescript
// Find the processDataService function and replace it with this code
// backend/src/utils/aiService.ts - processDataService function

async function processDataService(service: Service, input: string, options: any): Promise<any> {
  console.log(`Processing data analysis with input: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // For now, handle data analysis using text models with the service's system prompt
    const completion = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.5,
      max_tokens: options.maxTokens || 1500,
    });
    
    const result = completion.choices[0].message?.content || "No analysis generated";
    console.log(`Data analysis response received, length: ${result.length} chars`);
    
    return { 
      result,
      serviceType: 'data'
    };
  } catch (error) {
    console.error("OpenAI API error for data analysis:", error);
    throw error;
  }
}
```

```typescript
// Find the streamDataService function and replace it with this code
// backend/src/utils/aiService.ts - streamDataService function

async function streamDataService(service: Service, input: string, res: Response, options: any): Promise<void> {
  console.log(`Streaming data analysis with input: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // For data analysis using text models with streaming, with the service's system prompt
    const stream = await openai.chat.completions.create({
      model: service.aiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: service.system_prompt }, // Use the system prompt from service config
        { role: "user", content: input }
      ],
      temperature: options.temperature || 0.5,
      max_tokens: options.maxTokens || 1500,
      stream: true,
    });
    
    // Send an initial empty delta to start the stream
    res.write(`data: ${JSON.stringify({ content: "", done: false })}\n\n`);
    
    // Process the stream
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
      }
    }
    
    // End the stream
    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
    
    console.log(`Data analysis streaming completed for service ${service.id}`);
  } catch (error) {
    console.error("OpenAI API streaming error for data analysis:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.write(`data: ${JSON.stringify({ error: `Error: ${errorMessage}`, done: true })}\n\n`);
    res.end();
  }
}
```

```typescript
// Find the processImageService function and replace it with this code
// backend/src/utils/aiService.ts - processImageService function

async function processImageService(service: Service, input: string, options: any): Promise<any> {
  console.log(`Processing image generation with prompt: "${input.substring(0, 50)}..."`);
  console.log(`Using system prompt: ${service.system_prompt.substring(0, 50)}...`);
  
  try {
    // Combine system prompt with user input for better image generation
    const enhancedPrompt = `${service.system_prompt}\n\nUser request: ${input}`;
    
    // Use DALL-E API
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: options.size || "1024x1024",
    });
    
    const imageUrl = response.data[0].url;
    console.log(`Image generated, URL: ${imageUrl}`);
    
    return { 
      result: imageUrl,
      serviceType: 'image'
    };
  } catch (error) {
    console.error("DALL-E API error:", error);
    throw error;
  }
}
```

**Definition of Done**:
- All AI service functions updated to use the system prompt from the service configuration
- Logging added to show which system prompt is being used
- Image generation function updated to use combined system prompt + user input

#### 2.3 Update Service Controller to Include New Fields

**Implementation Details**:
Modify the service controller in `backend/src/controllers/serviceController.ts` to include the new fields in the response:

```typescript
// Update the listServices method in serviceController.ts
// backend/src/controllers/serviceController.ts - listServices method

listServices: (req: Request, res: Response): void => {
  console.log('API: List services request received');
  res.status(200).json({ 
    services: services.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      basePrice: service.basePrice,
      type: service.type,
      template_type: service.template_type,
      tagline: service.tagline
    }))
  });
},
```

```typescript
// Update the getServiceDetails method in serviceController.ts
// backend/src/controllers/serviceController.ts - getServiceDetails method

getServiceDetails: (req: Request, res: Response): void => {
  const { serviceId } = req.params;
  console.log(`API: Get service details request for serviceId: ${serviceId}`);
  
  const service = getServiceById(serviceId);
  
  if (!service) {
    console.log(`Service not found: ${serviceId}`);
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
      template_type: service.template_type,
      tagline: service.tagline,
      instructions: service.instructions,
      supportedFiles: service.supportedFiles || []
    }
  });
},
```

**Definition of Done**:
- Service controller methods updated to include new fields in responses
- Both list and detail endpoints include the new fields

### Phase 3: Update Frontend Service Components

#### 3.1 Update Service Interface and API in Frontend

**Implementation Details**:
Update the Service interface in `frontend/lib/api/index.ts`:

```typescript
// Replace or update these interfaces in frontend/lib/api/index.ts

// Types
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string;
  type: string;
  template_type: string;
  tagline: string;
  instructions: string;
  supportedFiles?: string[];
}

export interface ServicesResponse {
  services: Service[];
}

export interface ServiceResponse {
  service: Service;
}
```

**Definition of Done**:
- Frontend Service interface updated to include new fields

#### 3.2 Update Service Detail Page

**Implementation Details**:
Modify the service detail page in `frontend/app/service/[slug]/page.tsx` to display the new fields:

```typescript
// Look for this section in the JSX and replace it
// frontend/app/service/[slug]/page.tsx

// Replace this part of the component:
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

// With this updated version:
<div>
  <h1 className="text-2xl font-bold">{service.name}</h1>
  <p className="text-sm text-primary mt-1">{service.tagline || "ETN Task AI Service"}</p>
  <p className="mt-4 text-sm text-muted-foreground">{service.description}</p>
</div>

<div className="border border-border rounded-lg p-5 bg-card/50">
  <h2 className="text-sm font-medium mb-3">Instructions</h2>
  <p className="text-sm text-muted-foreground leading-relaxed">
    {service.instructions || "Enter your input below and click \"Process\" to start. You'll be asked to pay ETN using your Electroneum wallet."}
  </p>
  <p className="text-xs text-muted-foreground mt-2">
    Cost: Starting at {service.basePrice} ETN (may increase for longer inputs)
  </p>
</div>
```

```typescript
// Find this section that conditionally renders the file upload
// frontend/app/service/[slug]/page.tsx

// Replace this:
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

// With this:
{service.template_type === 'text_and_file' && (
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
      Supported formats: {service.supportedFiles ? service.supportedFiles.join(', ') : 'Common code and document formats'}
    </p>
  </div>
)}
```

**Definition of Done**:
- Service detail page updated to show tagline and instructions from the service
- File upload conditioned on the template_type rather than supportedFiles

#### 3.3 Update Service Card Component

**Implementation Details**:
Modify the service card component in `frontend/components/service-card.tsx` to use the new fields:

```typescript
// Update the ServiceProps interface in frontend/components/service-card.tsx

interface ServiceProps {
  service: {
    id: string;
    name: string;
    description: string;
    basePrice: string;
    type?: string;
    image?: string;
    tagline?: string;
  };
}
```

```typescript
// Update the card content in the component
// frontend/components/service-card.tsx

// Replace this part:
<CardContent className="p-4">
  <h3 className="text-base font-semibold">{service.name}</h3>
  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
    {service.description}
  </p>
  <p className="mt-2 text-primary font-medium text-sm">{service.basePrice}+ ETN</p>
</CardContent>

// With this:
<CardContent className="p-4">
  <h3 className="text-base font-semibold">{service.name}</h3>
  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
    {service.tagline || service.description}
  </p>
  <p className="mt-2 text-primary font-medium text-sm">{service.basePrice}+ ETN</p>
</CardContent>
```

**Definition of Done**:
- Service card component updated to use the tagline field if available
- Card shows a concise, compelling description of the service

#### 3.4 Update Local Services Fallback in Frontend

**Implementation Details**:
Update the local fallback services in `frontend/lib/services.ts` to match the new format:

```typescript
// Replace the entire content of frontend/lib/services.ts

// Service types
export type ServiceType = 'text' | 'image' | 'code' | 'data';
export type TemplateType = 'text_only' | 'text_and_file' | 'image';

// Service interface
export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string;
  type: ServiceType;
  template_type: TemplateType;
  tagline: string;
  instructions: string;
  image?: string;
}

// Fallback services in case the API is unavailable
export const services: Service[] = [
  {
    id: "smart-contract-auditor",
    name: "Smart Contract Auditor",
    description: "Uncover potential issues in your Solidity contracts.",
    basePrice: "0.20",
    type: "code",
    template_type: "text_and_file",
    tagline: "Uncover potential issues in your Solidity contracts.",
    instructions: "Upload your Solidity file (or snippet) and provide any relevant context. The AI will analyze your code for common vulnerabilities and best-practice compliance, returning a detailed audit report in Markdown."
  },
  {
    id: "defi-risk-analyzer",
    name: "DeFi Risk Analyzer",
    description: "Assess weaknesses in your DeFi protocol designs.",
    basePrice: "0.15",
    type: "text",
    template_type: "text_only",
    tagline: "Assess weaknesses in your DeFi protocol designs.",
    instructions: "Describe your DeFi protocol's structure, mechanics, and goals. The AI will highlight potential risk factors (economic exploits, liquidity issues, governance attacks, etc.) and suggest mitigations, returning a detailed analysis in Markdown."
  },
  {
    id: "tokenomics-architect",
    name: "Tokenomics Architect",
    description: "Shape robust token models for sustainable growth.",
    basePrice: "0.15",
    type: "text",
    template_type: "text_only",
    tagline: "Shape robust token models for sustainable growth.",
    instructions: "Enter your token model's details—distribution, inflation schedule, utility mechanics, etc.—and any known constraints. The AI will refine your tokenomics, offering suggestions on supply schedules, incentive alignment, and governance structures in Markdown."
  },
  {
    id: "crypto-meme-maker",
    name: "Crypto Meme Maker",
    description: "Generate fun, on-trend crypto memes from text prompts.",
    basePrice: "0.20",
    type: "image",
    template_type: "image",
    tagline: "Generate fun, on-trend crypto memes from text prompts.",
    instructions: "Enter your meme idea (e.g., 'Bullish dog riding a rocket, comedic style'). The AI will create a humorous on-trend image featuring your concept."
  },
  {
    id: "code-summarizer",
    name: "Code Summarizer & Refactor",
    description: "Upload code to receive a succinct summary and improvement tips.",
    basePrice: "0.10",
    type: "code",
    template_type: "text_and_file",
    tagline: "Upload code to receive a succinct summary and improvement tips.",
    instructions: "Provide a snippet or file of code (any language) along with optional notes. The AI will produce a concise explanation of what the code does, highlight potential bugs, and suggest refactoring improvements in Markdown."
  },
  {
    id: "pitch-polisher",
    name: "Pitch Polisher",
    description: "Elevate your project pitch or whitepaper with professional polish.",
    basePrice: "0.10",
    type: "text",
    template_type: "text_only",
    tagline: "Elevate your project pitch or whitepaper with professional polish.",
    instructions: "Paste your raw pitch, whitepaper text, or overall project description. The AI will refine the language, style, and structure, returning a professional, compelling version in Markdown with headings and bullet points where relevant."
  },
  {
    id: "dao-governance-wizard",
    name: "DAO Governance Wizard",
    description: "Design effective governance frameworks for decentralized organizations.",
    basePrice: "0.15",
    type: "text",
    template_type: "text_only",
    tagline: "Design effective governance frameworks for decentralized organizations.",
    instructions: "Describe your DAO's purpose, membership structure, and voting mechanisms. The AI will propose enhancements for fair, efficient governance in Markdown format."
  },
  {
    id: "nft-artwork-generator",
    name: "NFT Artwork Generator",
    description: "Create distinctive NFT visuals from concept prompts.",
    basePrice: "0.25",
    type: "image",
    template_type: "image",
    tagline: "Create distinctive NFT visuals from concept prompts.",
    instructions: "Enter a creative concept (e.g. 'Neon cyberpunk lion with glitch effects'). The AI will generate a unique artwork suiting NFT minting style."
  }
];

// Function to get a service by ID
export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}
```

**Definition of Done**:
- Local fallback services updated to match the JSON services
- Service interface updated to include the new fields

### Phase 4: Setup Mock Responses for Development

#### 4.1 Create Mock Response Generator for Testing

**Implementation Details**:
Create a utility to generate mock responses for development and testing:

```typescript
// Create a new file in backend/src/utils/mockResponseGenerator.ts

import { Service } from '../config/services';
import fs from 'fs';
import path from 'path';

// Load mockResponses from a JSON file or create default ones
export function generateMockResponses() {
  try {
    // Path to services JSON file
    const servicesFilePath = path.join(__dirname, '../../../shared/data/marketplace-services.json');
    const jsonData = fs.readFileSync(servicesFilePath, 'utf8');
    const services = JSON.parse(jsonData);
    
    // Generate mock responses based on service types
    const mockResponses = services.reduce((responses: Record<string, Record<string, string>>, service: any) => {
      if (service.demo_input) {
        responses[service.id] = {
          [service.demo_input]: generateMockResponseForService(service)
        };
      }
      return responses;
    }, {});
    
    // Save mock responses to a file for future use
    const mockResponsesPath = path.join(__dirname, '../../../shared/data/mock-responses.json');
    fs.writeFileSync(mockResponsesPath, JSON.stringify(mockResponses, null, 2));
    
    console.log(`Generated mock responses for ${Object.keys(mockResponses).length} services`);
    return mockResponses;
  } catch (error) {
    console.error('Error generating mock responses:', error);
    return {};
  }
}

// Generate a mock response based on service type
function generateMockResponseForService(service: any): string {
  const { type, template_type, id } = service;
  
  // Mock responses based on service type
  if (type === 'text' || type === 'code') {
    return mockTextResponses[id] || defaultMockResponses[type] || 'Mock response for text service';
  } else if (type === 'image') {
    return 'https://via.placeholder.com/512x512.png?text=Mock+AI+Image';
  } else if (type === 'data') {
    return mockTextResponses[id] || defaultMockResponses.data || 'Mock response for data service';
  }
  
  return 'Mock response';
}

// Default mock responses by type
const defaultMockResponses: Record<string, string> = {
  text: 'This is a mock text response from the AI assistant. In a real environment, this would be generated by the AI model based on your input.',
  code: '```javascript\n// This is a mock code response\nfunction mockFunction() {\n  console.log("This would be generated code in production");\n  return "Mock result";\n}\n```',
  data: '## Mock Data Analysis\n\n### Summary\n- Data points: 1,000\n- Key insight: Mock trend identified\n\n### Recommendation\nThis is a mock recommendation for a data analysis task.',
  image: 'https://via.placeholder.com/512x512.png?text=Mock+AI+Image'
};

// Service-specific mock responses
const mockTextResponses: Record<string, string> = {
  'smart-contract-auditor': `# Smart Contract Audit Report

## Overview
Analyzed a simple ERC20 token contract for vulnerabilities.

## Critical Issues
- **Re-entrancy Risk**: No re-entrancy vulnerabilities found
- **Integer Overflow**: Potential overflow in token calculations

## Recommendations
1. Implement SafeMath for arithmetic operations
2. Add reentrancy guards as a best practice
3. Consider using OpenZeppelin's standard implementation

## Detailed Analysis
The contract appears to be a basic implementation that would benefit from standard security patterns. The transfer function should include checks for token balances before execution.

*This is a mock audit report for demonstration purposes.*`,

  'defi-risk-analyzer': `# DeFi Protocol Risk Assessment

## Overview
Analyzed lending pool with oracle-based interest rates.

## Key Vulnerabilities
1. **Oracle Manipulation**: Price feeds susceptible to manipulation
2. **Flash Loan Attack Vector**: No slippage protection
3. **Interest Rate Volatility**: No rate limiting mechanisms

## Economic Risks
- Potential for bank run scenarios during market stress
- Impermanent loss from LP token valuation changes

## Recommendations
- Implement Chainlink oracle with time-weighted values
- Add rate change limits of max 2% per 24 hours
- Implement emergency pause functionality

*This is a mock risk report for demonstration purposes.*`,

  'tokenomics-architect': `# Tokenomics Design Recommendations

## Overview
Analyzed gaming ecosystem token with 100M max supply and staking rewards.

## Token Distribution
- **Team/Advisors**: 15% with 3-year linear vesting
- **Community Rewards**: 40% with emission schedule
- **Ecosystem Development**: 25% with milestone-based unlocks
- **Initial Sale**: 20% with partial lockups

## Incentive Mechanisms
- Implement play-to-earn with diminishing rewards curve
- Create token sinks through cosmetic NFT purchases
- Implement governance rights tied to staking duration

## Additional Recommendations
- Consider dual token model with governance/utility separation
- Implement deflationary mechanics through buyback & burn
- Create on-chain achievements with token rewards

*This is a mock tokenomics report for demonstration purposes.*`,

  'pitch-polisher': `# Decentralized Identity Solution via NFTs

## Vision
Our platform transforms digital identity verification through blockchain-secured, user-controlled NFT identities.

## Core Innovation
We've developed a patent-pending protocol that:
- Maintains privacy while enabling selective disclosure
- Creates tamper-proof credential verification
- Allows users full ownership of their identity data

## Market Opportunity
The digital identity market is projected to reach $30.5B by 2027, growing at 17% CAGR, with enterprises seeking secure, portable identity solutions.

## Competitive Advantage
Unlike centralized identity providers or basic DID implementations, our NFT-based approach offers:
- Programmable credentials with revocation capabilities
- Cross-chain interoperability via layered attestations
- Revenue sharing with identity owners

## Roadmap
- Q2 2025: Testnet release with SDK
- Q3 2025: Mainnet launch with enterprise partners
- Q4 2025: Identity marketplace with credential templates

*This refined pitch maintains your original vision while improving structure and clarity.*`,

  'dao-governance-wizard': `# DAO Governance Framework Proposal

## Current Challenges
A 10% voting quorum creates significant governance risks for a 500-member DAO, enabling potential capture by a small token holder minority.

## Recommended Governance Structure

### Tiered Proposal System
1. **Standard Proposals**: 25% quorum, simple majority
2. **Treasury Proposals** (>5% of funds): 40% quorum, 66% approval
3. **Constitutional Changes**: 60% quorum, 75% approval

### Time-Lock Security
- 72-hour voting period minimum
- 48-hour timelock before implementation
- Emergency proposals require guardian multisig (9/15)

### Participation Incentives
- Implement quadratic voting to balance large and small holders
- Retroactive voting rewards with decay function
- Delegation capability with on-chain reputation

## Implementation Path
1. Phase in quorum increases over 3 months
2. Establish proposal categories via community ratification
3. Deploy updated smart contracts with formal verification

*This governance framework balances security with practical participation requirements.*`,

  'code-summarizer': `# Code Analysis Report

## Overview
This Python script parses CSV data using standard libraries and processes financial records.

## Functionality Summary
- Reads CSV files with error handling
- Processes financial transactions by category
- Calculates aggregate statistics (sum, average, etc.)
- Outputs formatted reports to console and file

## Performance Issues
1. **Inefficient Looping**: Using nested loops for data aggregation (O(n²))
2. **Memory Usage**: Loading entire dataset into memory
3. **String Concatenation**: Building output with += in loops

## Recommended Improvements
```python
# Replace this:
result = ""
for item in large_list:
    result += process(item)

# With this:
results = [process(item) for item in large_list]
result = "".join(results)
```

1. Use pandas for vectorized operations instead of loops
2. Implement chunked reading for large files
3. Use StringIO or f-strings instead of concatenation
4. Add progress tracking for long-running operations

*This analysis report identifies key optimization opportunities.*`
};
```

**Definition of Done**:
- Mock response generator utility created to generate realistic responses for testing
- Service-specific mock responses defined for key services

#### 4.2 Update Backend to Use Mock Responses

**Implementation Details**:
Update the backend configuration to load and use mock responses:

```typescript
// Modify the backend/src/config/services.ts file to initialize mockResponses

// Add this import at the top of the file
import { generateMockResponses } from '../utils/mockResponseGenerator';

// Replace the mockResponses initialization in the map function
// Find this code:
servicesData = rawServices.map((service: any) => ({
  ...service,
  priceModel: 'variable', // Default to variable pricing
  mockResponses: service.demo_input ? { [service.demo_input]: '' } : {} // Create empty mock responses
}));

// Replace with:
// Generate mock responses for services
const mockResponsesMap = generateMockResponses();

// Transform the raw data to match our Service interface
servicesData = rawServices.map((service: any) => ({
  ...service,
  priceModel: 'variable', // Default to variable pricing
  // Use generated mock responses if available, otherwise empty
  mockResponses: mockResponsesMap[service.id] || 
                (service.demo_input ? { [service.demo_input]: '' } : {})
}));
```

**Definition of Done**:
- Backend configured to load and use generated mock responses
- Each service has a realistic mock response for its demo input

### Phase 5: Testing and Verification

#### 5.1 Test Backend Service Loading

**Implementation Details**:
Create a test script to verify the backend services are loaded correctly:

```typescript
// Create a file at scripts/test-services.js

const axios = require('axios');

async function testServices() {
  try {
    console.log('Testing services API...');
    
    // Test listing services
    const servicesResponse = await axios.get('http://localhost:4000/api/services');
    console.log(`Found ${servicesResponse.data.services.length} services:`);
    
    servicesResponse.data.services.forEach(service => {
      console.log(`- ${service.name} (${service.id}): ${service.tagline} [${service.template_type}]`);
    });
    
    // Test getting details for the first service
    if (servicesResponse.data.services.length > 0) {
      const firstService = servicesResponse.data.services[0];
      const detailResponse = await axios.get(`http://localhost:4000/api/services/${firstService.id}`);
      
      console.log('\nService details:');
      console.log(JSON.stringify(detailResponse.data.service, null, 2));
    }
    
    console.log('\nServices API test completed successfully!');
  } catch (error) {
    console.error('Error testing services API:', error.message);
    console.error(error.response?.data || error);
  }
}

testServices();
```

**Definition of Done**:
- Test script created to verify services API
- Script confirms that all services are loaded with correct fields

#### 5.2 Manual Testing Plan

**Implementation Details**:
Create a manual testing plan to verify the implementation:

```markdown
# Manual Testing Plan for Dynamic AI Services

## 1. Backend Testing

1. Start the backend server: `cd backend && npm run dev`
2. Verify that the services are loaded from the JSON file: Check server console logs for "Loaded X services from JSON file"
3. Test the services API:
   - GET http://localhost:4000/api/services
   - Verify that all 8 services are returned with correct fields
   - GET http://localhost:4000/api/services/{service-id} (e.g., smart-contract-auditor)
   - Verify that the service details include tagline, instructions, and template_type

## 2. Frontend Testing

1. Start the frontend server: `cd frontend && npm run dev`
2. Open the browser to http://localhost:3000
3. Verify that the marketplace page shows all 8 services with correct names and taglines
4. Click on a service card to view its details
5. Verify that the service detail page shows:
   - Service name and tagline at the top
   - Custom instructions for the service
   - Appropriate input fields based on template_type
   - Text-only services should not show a file upload
   - Text_and_file services should show a file upload
   - Image services should show appropriate UI

## 3. End-to-End Testing

1. Connect your wallet to the application
2. Select a service (e.g., DeFi Risk Analyzer)
3. Enter text in the input field
4. Click "Process" to generate a payment request
5. Make the payment
6. Verify that the response is received and displayed correctly
7. Repeat for different service types:
   - A text_only service
   - A text_and_file service
   - An image service

## 4. Mock Response Testing

1. Set the backend to development mode (should be default)
2. Use the demo input for a service (found in the JSON file)
3. Submit the request and verify that a coherent mock response is generated
4. Check that the response matches the service type (text, code, image)

## 5. System Prompt Verification

1. Check the backend logs when processing a request
2. Verify that the correct system prompt is being used for the service
3. Confirm that the system prompt is being sent to the OpenAI API

## Issues and Notes

Document any issues or observations here:
1. 
2. 
3. 
```

**Definition of Done**:
- Manual testing plan created to verify all aspects of the implementation
- Plan covers backend, frontend, and end-to-end testing

## Conclusion

This implementation enhances the ETN AI Services Marketplace by replacing generic services with specialized ones that leverage targeted system prompts. The approach maintains the existing template types while introducing service-specific behavior. 

The key improvements include:
1. Dynamic loading of services from a JSON configuration file
2. Service-specific system prompts for better AI responses
3. Improved UI with tailored instructions for each service
4. Realistic mock responses for development and testing

After completing this implementation, the marketplace will feature 8 crypto-specific AI services that provide specialized functionality using targeted prompts, making the platform more compelling and useful for users.