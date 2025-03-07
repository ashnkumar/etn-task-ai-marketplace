"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface StreamingLogProps {
  isProcessing?: boolean
}

export default function StreamingLog({ isProcessing = false }: StreamingLogProps) {
  const [log, setLog] = useState<string[]>([])

  // Simulate streaming logs when processing
  useEffect(() => {
    if (!isProcessing) return

    const messages = [
      "Initializing task...",
      "Processing input...",
      "Analyzing content...",
      "Generating response...",
      "Applying formatting...",
      "Optimizing output...",
      "Finalizing results...",
    ]

    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < messages.length) {
        setLog((prev) => [...prev, messages[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [isProcessing])

  return (
    <div className="h-full border border-border rounded-lg bg-card p-5 overflow-y-auto">
      {log.length === 0 && !isProcessing ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <p>Task output will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {log.map((message, index) => (
            <div key={index} className="text-sm">
              <span className="text-primary">&gt;</span> {message}
            </div>
          ))}

          {isProcessing && log.length < 7 && (
            <div className="flex items-center text-sm gap-2">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
              <span>Processing...</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

