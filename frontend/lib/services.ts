export type ServiceType = "image" | "text"

export type Service = {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  basePrice: number
  supportsFileUpload: boolean
  image: string
  author: string
  type: ServiceType
  instructions: string
}

export const services: Service[] = [
  {
    id: "1",
    slug: "language-translator",
    name: "Language Translator",
    description:
      "Translate text between over 100 languages with high accuracy. Perfect for documents, websites, or personal communication.",
    shortDescription: "Translate text between 100+ languages instantly",
    basePrice: 0.05,
    supportsFileUpload: true,
    image: "/placeholder.svg?width=300&height=200",
    author: "TranslateAI",
    type: "text",
    instructions:
      "Enter the text you want to translate and select the target language. For longer documents, you can upload a file. Supported formats include .txt, .docx, and .pdf.",
  },
  {
    id: "2",
    slug: "image-generator",
    name: "AI Image Generator",
    description:
      "Create stunning images from text descriptions. Generate art, illustrations, or concept designs based on your prompts.",
    shortDescription: "Create custom images from text descriptions",
    basePrice: 0.2,
    supportsFileUpload: false,
    image: "/placeholder.svg?width=300&height=200",
    author: "ArtificialVision",
    type: "image",
    instructions:
      "Describe the image you want to generate in detail. Include style, mood, lighting, and composition elements for best results. Be specific about what you want to see in the image.",
  },
  {
    id: "3",
    slug: "content-writer",
    name: "Content Writer",
    description:
      "Generate high-quality articles, blog posts, and marketing copy. Provide a topic and key points, and our AI will create engaging content.",
    shortDescription: "Generate articles, blog posts, and marketing copy",
    basePrice: 0.15,
    supportsFileUpload: true,
    image: "/placeholder.svg?width=300&height=200",
    author: "CopyGenius",
    type: "text",
    instructions:
      "Specify your topic, target audience, and desired tone. Include key points you want covered and any specific requirements like word count or formatting preferences.",
  },
  {
    id: "4",
    slug: "code-assistant",
    name: "Code Assistant",
    description:
      "Get help with programming tasks, debugging, and code optimization. Works with multiple languages including JavaScript, Python, and more.",
    shortDescription: "Programming help in multiple languages",
    basePrice: 0.1,
    supportsFileUpload: true,
    image: "/placeholder.svg?width=300&height=200",
    author: "DevHelper",
    type: "text",
    instructions:
      "Describe your coding problem or paste your code snippet. Specify the programming language and what you need help with (debugging, optimization, explanation, etc).",
  },
  {
    id: "5",
    slug: "data-analyzer",
    name: "Data Analyzer",
    description:
      "Extract insights from your data. Upload CSV files for analysis, visualization, and pattern recognition. Receive detailed reports with actionable insights.",
    shortDescription: "Extract insights and visualize your data",
    basePrice: 0.25,
    supportsFileUpload: true,
    image: "/placeholder.svg?width=300&height=200",
    author: "DataSense",
    type: "text",
    instructions:
      "Upload your data file (CSV, Excel) or paste data directly. Specify what insights you're looking for or what questions you want answered about your data.",
  },
  {
    id: "6",
    slug: "audio-transcriber",
    name: "Audio Transcriber",
    description:
      "Convert audio to text with high accuracy. Supports multiple languages and can identify different speakers.",
    shortDescription: "Convert audio to text with speaker recognition",
    basePrice: 0.08,
    supportsFileUpload: true,
    image: "/placeholder.svg?width=300&height=200",
    author: "VoiceScribe",
    type: "text",
    instructions:
      "Upload your audio file (MP3, WAV, M4A). Specify the language and whether you need speaker identification. For best results, use clear audio with minimal background noise.",
  },
  {
    id: "7",
    slug: "summarizer",
    name: "Text Summarizer",
    description:
      "Condense long articles, reports, or documents into concise summaries. Maintain key points while reducing length by up to 80%.",
    shortDescription: "Condense long content into concise summaries",
    basePrice: 0.05,
    supportsFileUpload: true,
    image: "/placeholder.svg?width=300&height=200",
    author: "SummarizeAI",
    type: "text",
    instructions:
      "Paste the text you want to summarize or upload a document. Specify your desired summary length (bullet points, paragraph, or word count).",
  },
  {
    id: "8",
    slug: "chatbot-creator",
    name: "Chatbot Creator",
    description:
      "Build custom chatbots for your website or application. Define responses, personality, and knowledge base. No coding required.",
    shortDescription: "Build custom chatbots with no coding required",
    basePrice: 0.3,
    supportsFileUpload: false,
    image: "/placeholder.svg?width=300&height=200",
    author: "BotBuilder",
    type: "text",
    instructions:
      "Describe your chatbot's purpose, personality, and the types of questions it should answer. Provide example conversations or knowledge base content if available.",
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

