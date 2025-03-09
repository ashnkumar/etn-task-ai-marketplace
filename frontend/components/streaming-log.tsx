"use client"

import { useEffect, useState, useRef } from "react"
import { Loader2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import Prism from 'prismjs'

// Import our custom Prism CSS instead of the default
import '@/styles/prism.css'

// Import Prism languages
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markdown'

interface StreamingLogProps {
  isProcessing?: boolean;
  output?: string | null;
  streamingContent?: string | null; // New prop for streaming content
  processingState?: "idle" | "payment" | "ai"; // Add processing state type
}

export default function StreamingLog({ 
  isProcessing = false, 
  output = null, 
  streamingContent = null,
  processingState = "idle"
}: StreamingLogProps) {
  const [displayContent, setDisplayContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when content updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayContent]);

  // Use either streaming content or output
  useEffect(() => {
    if (streamingContent !== null) {
      setDisplayContent(streamingContent);
    } else if (output !== null) {
      setDisplayContent(output);
    }
  }, [streamingContent, output]);

  // Apply Prism syntax highlighting after content updates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [displayContent]);

  // Render appropriate loading message based on processing state
  const renderLoadingMessage = () => {
    switch (processingState) {
      case "payment":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Confirming payment on blockchain...</p>
            <p className="text-xs text-muted-foreground mt-2">This may take a few seconds</p>
          </div>
        );
      case "ai":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Processing AI request...</p>
            <p className="text-xs text-muted-foreground mt-2">The AI is generating your content</p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Processing your request...</p>
          </div>
        );
    }
  };

  // Custom code component for React Markdown
  const CodeBlock = ({ node, inline, className, children, ...props }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    if (inline) {
      return (
        <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      );
    }

    return (
      <div className="my-4 overflow-hidden rounded-md border">
        <div className="bg-[#1E293B] px-4 py-1.5 text-xs font-semibold text-slate-200">
          {language || 'Code'}
        </div>
        <pre className="p-4 overflow-x-auto bg-[#1E1E2A] m-0">
          <code className={`language-${language || 'javascript'}`} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="h-full w-full border border-border rounded-lg bg-card p-4 lg:p-5 overflow-y-auto"
    >
      {!isProcessing && !displayContent ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <p>Task output will appear here</p>
        </div>
      ) : (
        <>
          {isProcessing && !displayContent && renderLoadingMessage()}
          
          {displayContent && (
            <div className="prose dark:prose-invert prose-sm md:prose-base max-w-none">
              <ReactMarkdown
                components={{
                  code: CodeBlock
                }}
              >
                {displayContent}
              </ReactMarkdown>
            </div>
          )}
        </>
      )}
    </div>
  );
}