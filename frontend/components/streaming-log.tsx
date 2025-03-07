"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface StreamingLogProps {
  isProcessing?: boolean;
  output?: string | null;
}

export default function StreamingLog({ isProcessing = false, output = null }: StreamingLogProps) {
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);

  // Simulate processing steps when isProcessing is true
  useEffect(() => {
    if (!isProcessing) return;

    const steps = [
      "Initializing task...",
      "Processing input...",
      "Analyzing content...",
      "Generating response...",
      "Applying formatting...",
      "Optimizing output...",
      "Finalizing results...",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < steps.length) {
        setProcessingSteps(prev => [...prev, steps[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      setProcessingSteps([]);
    };
  }, [isProcessing]);

  // Format output with markdown-like syntax
  const formatOutput = (text: string) => {
    return text
      // Code blocks
      .replace(/```([\\s\\S]*?)```/g, '<pre class="bg-muted p-3 rounded-md my-2 overflow-x-auto text-xs font-mono">$1</pre>')
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold mt-3 mb-2">$2</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-md font-bold mt-3 mb-1">$1</h3>')
      // Bold
      .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\\*(.*?)\\*/g, '<em>$1</em>')
      // Lists
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      // Line breaks
      .replace(/\\n/g, '<br/>');
  };

  return (
    <div className="h-full border border-border rounded-lg bg-card p-5 overflow-y-auto">
      {!isProcessing && !output ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <p>Task output will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {isProcessing && (
            <>
              {processingSteps.map((step, index) => (
                <div key={index} className="text-sm">
                  <span className="text-primary">&gt;</span> {step}
                </div>
              ))}
              
              {processingSteps.length < 7 && (
                <div className="flex items-center text-sm gap-2">
                  <Loader2 className="h-3 w-3 animate-spin text-primary" />
                  <span>Processing...</span>
                </div>
              )}
            </>
          )}
          
          {output && (
            <div 
              className="text-sm" 
              dangerouslySetInnerHTML={{ __html: formatOutput(output) }}
            />
          )}
        </div>
      )}
    </div>
  );
}