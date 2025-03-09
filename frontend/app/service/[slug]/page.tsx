"use client";

import { useState, useEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronLeft, AlertCircle } from "lucide-react";
import StreamingLog from "@/components/streaming-log";
import ImagePreview from "@/components/image-preview";
import { useWallet } from "@/context/WalletContext";
import { 
  generateRequestId, 
  getService, 
  verifyPayment, 
  processRequest, 
  processRequestStream,
  StreamingResponseHandler
} from "@/lib/api";
import { makePayment } from "@/lib/blockchain";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const { walletAddress, isCorrectNetwork, connectWallet, switchNetwork } = useWallet();

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // For payment
  const [requestId, setRequestId] = useState<string | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<string>("0.00 ETN");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "verifying" | "processing" | "success" | "error">("idle");
  const [processingState, setProcessingState] = useState<"idle" | "payment" | "ai">("idle");
  
  // To track streaming state
  const streamAbortRef = useRef<{ abort: () => void } | null>(null);

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceData = await getService(params.slug);
        if (!serviceData) {
          notFound();
        }
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.slug]);

  // Cleanup streaming on unmount
  useEffect(() => {
    return () => {
      if (streamAbortRef.current) {
        streamAbortRef.current.abort();
      }
    };
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // File handling would go here
    // For this MVP, we're focusing on text inputs
  };

  // Generate request ID and get cost estimate
  const handlePrepareRequest = async () => {
    if (!input.trim()) {
      setError("Please enter your input");
      return;
    }

    if (!walletAddress) {
      await connectWallet();
      return;
    }

    if (!isCorrectNetwork) {
      await switchNetwork();
      return;
    }

    setError(null);
    setIsPaying(true);
    
    try {
      const response = await generateRequestId(service.id, input);
      if (response) {
        setRequestId(response.requestId);
        setEstimatedCost(response.estimatedCost);
      } else {
        throw new Error("Failed to generate request ID");
      }
    } catch (err) {
      console.error("Error preparing request:", err);
      setError("Failed to prepare request. Please try again.");
      setIsPaying(false);
    }
  };

  // Make payment and process request
  const handleProcessRequest = async () => {
    if (!requestId || !walletAddress) return;

    setIsProcessing(true);
    setPaymentStatus("pending");
    setProcessingState("payment");
    setStreamingContent(null);
    
    try {
      // Make payment
      const paymentSuccess = await makePayment(requestId, estimatedCost);
      
      if (!paymentSuccess) {
        setError("Payment failed. Please try again.");
        setIsProcessing(false);
        setIsPaying(false);
        setPaymentStatus("error");
        setProcessingState("idle");
        return;
      }
      
      setPaymentStatus("verifying");

      // Verify payment (with retry)
      let isPaid = false;
      let attempts = 0;
      
      while (!isPaid && attempts < 15) {
        attempts++;
        isPaid = await verifyPayment(requestId);
        
        if (isPaid) {
          break;
        }
        
        // Wait 1 second before trying again
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      if (!isPaid) {
        setError("Payment verification timed out. If you made a payment, please wait a moment and try again.");
        setIsProcessing(false);
        setIsPaying(false);
        setPaymentStatus("error");
        setProcessingState("idle");
        return;
      }
      
      // Payment verified, now process the request
      setPaymentStatus("processing");
      setProcessingState("ai");
      
      // For image generation, we don't use streaming
      if (service.type === 'image') {
        // Process the request without streaming
        const processingResult = await processRequest(service.id, requestId, input);
        
        if (processingResult) {
          if (processingResult.serviceType === 'image' && typeof processingResult.result === 'string') {
            setImageUrl(processingResult.result);
          } else {
            setResult(processingResult.result);
          }
          setPaymentStatus("success");
        } else {
          throw new Error("Failed to process request");
        }
      } else {
        // For text-based services, use streaming
        setStreamingContent(""); // Initialize with empty string to start displaying
        
        const handlers: StreamingResponseHandler = {
          onContent: (content) => {
            setStreamingContent(prevContent => (prevContent || "") + content);
          },
          onError: (errorMsg) => {
            setError(errorMsg);
            setPaymentStatus("error");
            setIsProcessing(false);
          },
          onComplete: () => {
            setPaymentStatus("success");
            setIsProcessing(false);
          }
        };
        
        // Start streaming
        const streamController = processRequestStream(service.id, requestId, input, handlers);
        streamAbortRef.current = streamController;
      }
    } catch (err) {
      console.error("Error processing request:", err);
      setError("Failed to process request. Please try again.");
      setPaymentStatus("error");
      setProcessingState("idle");
    } finally {
      if (service.type === 'image') {
        setIsProcessing(false);
        setIsPaying(false);
      }
      // For streaming, these states will be set by the onComplete callback
      
      // Reset requestId to allow new requests
      setRequestId(null);
    }
  };

  // Cancel payment
  const handleCancelPayment = () => {
    setIsPaying(false);
    setRequestId(null);
  };
  
  // Reset everything for a new request
  const handleNewRequest = () => {
    // Abort any ongoing stream
    if (streamAbortRef.current) {
      streamAbortRef.current.abort();
      streamAbortRef.current = null;
    }
    
    setInput("");
    setResult(null);
    setStreamingContent(null);
    setImageUrl(null);
    setError(null);
    setRequestId(null);
    setPaymentStatus("idle");
    setProcessingState("idle");
    setIsPaying(false);
    setIsProcessing(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container max-w-5xl py-6 md:py-8 px-4">
        <div className="flex items-center justify-center h-[300px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // 404 if service not found
  if (!service) {
    return notFound();
  }

  // Check if content is ready (either streaming or completed)
  const hasContent = (streamingContent !== null && streamingContent !== "") || 
                     (result !== null && result !== "") || 
                     (imageUrl !== null);

  return (
    <div className="container max-w-5xl py-6 md:py-8 px-4">
      <Link href="/" className="inline-flex items-center text-sm text-primary mb-6 hover:underline">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to marketplace
      </Link>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 px-4 py-6">
        {/* Left Column - Input */}
        <div className="w-full md:w-1/3">
          <div>
            <h1 className="text-2xl font-bold">{service.name}</h1>
            <p className="text-sm text-primary mt-1">{service.tagline || "ETN Task AI Service"}</p>
            <p className="mt-4 text-sm text-muted-foreground">{service.description}</p>
            <p className="mt-2 text-sm mb-6">
              <span className="text-muted-foreground">Author:</span> {service.author || "ETN Task AI"}
            </p>
          </div>

          <div className="border border-border rounded-lg p-5 bg-card/50 mb-6">
            <h2 className="text-sm font-medium mb-3">Instructions</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.instructions || "Enter your input below and click \"Process\" to start. You'll be asked to pay ETN using your Electroneum wallet."}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Cost: Starting at {service.basePrice} ETN (may increase for longer inputs)
            </p>
          </div>

          {paymentStatus === "success" && hasContent ? (
            <div className="border border-green-500 bg-green-50 dark:bg-green-950/20 rounded-lg p-5 space-y-4">
              <h2 className="text-lg font-medium text-green-700 dark:text-green-400">Request Completed Successfully!</h2>
              <p className="text-sm text-muted-foreground">
                Your request has been processed successfully. The result is displayed on the right.
              </p>
              <Button onClick={handleNewRequest}>Start New Request</Button>
            </div>
          ) : (
            <>
              {!isPaying ? (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Your input</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Enter your input here..."
                      className="min-h-[180px] bg-card border-border resize-none"
                      disabled={isProcessing}
                      value={input}
                      onChange={handleInputChange}
                    />
                  </div>

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

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="pt-2">
                    <Button 
                      onClick={handlePrepareRequest} 
                      className="w-full md:w-auto" 
                      disabled={isProcessing || !input.trim()}
                    >
                      {isProcessing ? "Processing..." : `Process with ${service.basePrice}+ ETN`}
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Final price may vary depending on input length.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border border-border rounded-lg p-5 bg-card">
                  <h2 className="text-lg font-medium mb-3">Confirm Payment</h2>
                  <p className="mb-1">Cost: <span className="font-semibold">{estimatedCost}</span></p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your input: {input.length > 100 ? input.substring(0, 100) + "..." : input}
                  </p>

                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleProcessRequest} 
                      disabled={isProcessing}
                      className="flex-1"
                    >
                      {isProcessing ? (
                        <>
                          {paymentStatus === "pending" && "Awaiting payment..."}
                          {paymentStatus === "verifying" && "Verifying payment..."}
                          {paymentStatus === "processing" && "Processing request..."}
                        </>
                      ) : "Confirm & Pay"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCancelPayment}
                      disabled={isProcessing}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column - Output */}
        <div className="w-full md:w-2/3 h-[500px] md:h-auto">
          {service.type === "image" ? (
            <ImagePreview 
              isProcessing={isProcessing} 
              imageUrl={imageUrl}
              processingState={processingState}
            />
          ) : (
            <StreamingLog 
              isProcessing={isProcessing} 
              output={result}
              streamingContent={streamingContent}
              processingState={processingState}
            />
          )}
        </div>
      </div>
    </div>
  );
}