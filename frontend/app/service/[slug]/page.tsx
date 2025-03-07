"use client"

import type React from "react"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import { getServiceBySlug } from "@/lib/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import StreamingLog from "@/components/streaming-log"
import ImagePreview from "@/components/image-preview"

export default function ServicePage() {
  const params = useParams<{ slug: string }>()
  const service = getServiceBySlug(params.slug)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!service) {
    notFound()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false)
    }, 12000)
  }

  return (
    <div className="container max-w-5xl py-6 md:py-8 px-4">
      <Link href="/" className="inline-flex items-center text-sm text-primary mb-6 hover:underline">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to marketplace
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Service Info & Input */}
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{service.name}</h1>
            <p className="text-sm text-primary mt-1">By {service.author}</p>
            <p className="mt-4 text-sm text-muted-foreground">{service.description}</p>
          </div>

          <div className="border border-border rounded-lg p-5 bg-card/50 min-h-[150px]">
            <h2 className="text-sm font-medium mb-3">Instructions</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.instructions}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="prompt">Your input</Label>
              <Textarea
                id="prompt"
                placeholder="Enter your prompt or instructions here..."
                className="min-h-[180px] bg-card border-border resize-none"
                disabled={isProcessing}
              />
            </div>

            {service.supportsFileUpload && (
              <div className="space-y-2">
                <Label htmlFor="file">Upload file</Label>
                <Input id="file" type="file" className="bg-card border-border h-12" disabled={isProcessing} />
              </div>
            )}

            <div className="pt-2">
              <Button type="submit" className="w-full md:w-auto" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay ${service.basePrice} ETN`}
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Final price may vary depending on input length or file size.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column - Output */}
        <div className="w-full md:w-1/2 h-[500px] md:h-auto">
          {service.type === "image" ? (
            <ImagePreview
              isProcessing={isProcessing}
              imageUrl={isProcessing ? undefined : "/placeholder.svg?width=600&height=400"}
            />
          ) : (
            <StreamingLog isProcessing={isProcessing} />
          )}
        </div>
      </div>
    </div>
  )
}

