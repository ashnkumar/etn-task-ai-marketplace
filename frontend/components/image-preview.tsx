"use client"

import { useState } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface ImagePreviewProps {
  isProcessing?: boolean;
  imageUrl?: string | null;
}

export default function ImagePreview({ isProcessing = false, imageUrl = null }: ImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-full border border-border rounded-lg bg-card overflow-hidden relative">
      {isProcessing ? (
        <div className="h-full flex flex-col items-center justify-center gap-3 p-5">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Generating image...</p>
        </div>
      ) : (
        <>
          {imageUrl ? (
            <div className="relative h-full w-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              <Image
                src={imageUrl}
                alt="Generated image"
                fill
                className="object-contain"
                onLoadingComplete={() => setIsLoading(false)}
                onError={() => {
                  // If image fails to load, show a placeholder
                  setIsLoading(false);
                }}
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground p-5">
              <p>Generated image will appear here</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
