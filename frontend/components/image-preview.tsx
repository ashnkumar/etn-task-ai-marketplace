"use client"

import { useState } from "react"
import Image from "next/image"
import { Loader2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImagePreviewProps {
  isProcessing?: boolean;
  imageUrl?: string | null;
  processingState?: "idle" | "payment" | "ai";
}

export default function ImagePreview({ 
  isProcessing = false, 
  imageUrl = null,
  processingState = "idle"
}: ImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleDownload = () => {
    if (imageUrl) {
      // Create an invisible link element and trigger download
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'ai-generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Render appropriate loading message based on processing state
  const renderLoadingMessage = () => {
    switch (processingState) {
      case "payment":
        return (
          <div className="h-full flex flex-col items-center justify-center gap-3 p-5">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground text-center">
              Confirming payment on blockchain...<br />
              <span className="text-xs">This may take a few seconds</span>
            </p>
          </div>
        );
      case "ai":
        return (
          <div className="h-full flex flex-col items-center justify-center gap-3 p-5">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground text-center">
              Generating your image...<br />
              <span className="text-xs">This may take up to a minute</span>
            </p>
          </div>
        );
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center gap-3 p-5">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground text-center">
              Processing your request...<br />
              <span className="text-xs">Please wait</span>
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-full border border-border rounded-lg bg-card overflow-hidden relative flex flex-col">
      {isProcessing ? (
        renderLoadingMessage()
      ) : (
        <>
          {imageUrl ? (
            <div className="flex flex-col h-full">
              <div className="relative flex-grow">
                {isLoading && !hasError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                
                {hasError ? (
                  <div className="h-full flex flex-col items-center justify-center p-5">
                    <p className="text-destructive text-center mb-4">
                      Unable to load the generated image.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(imageUrl, '_blank')}
                      className="text-sm"
                    >
                      Try opening in new tab
                    </Button>
                  </div>
                ) : (
                  <Image
                    src={imageUrl}
                    alt="Generated image"
                    fill
                    className="object-contain"
                    onLoadingComplete={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      setHasError(true);
                    }}
                  />
                )}
              </div>
              
              {!hasError && !isLoading && (
                <div className="p-3 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" /> Download Image
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground p-5">
              <p className="text-center">
                Your generated image will appear here
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}