"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import StreamingLog from "@/components/streaming-log";
import ImagePreview from "@/components/image-preview";
import { useWallet } from "@/context/WalletContext";
import { generateRequestId, getService, verifyPayment, processRequest } from "@/lib/api";
import { makePayment } from "@/lib/blockchain";

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const { walletAddress, isCorrectNetwork, connectWallet, switchNetwork } = useWallet();

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // For payment
  const [requestId, setRequestId] = useState<string | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<string>("0.00 ETN");

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
    
    try {
      // Make payment
      const paymentSuccess = await makePayment(requestId, estimatedCost);
      
      if (!paymentSuccess) {
        setError("Payment failed. Please try again.");
        setIsProcessing(false);
        setIsPaying(false);
        return;
      }

      // Verify payment (with retry)
      let isPaid = false;
      let attempts = 0;
      
      while (!isPaid && attempts < 10) {
        attempts++;
        isPaid = await verifyPayment(requestId);
        
        if (isPaid) {
          break;
        }
        
        // Wait 1 second before trying again
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      if (!isPaid) {
        setError("Payment verification failed. If you made a payment, please try processing again.");
        setIsProcessing(false);
        setIsPaying(false);
        return;
      }

      // Process the request
      const processingResult = await processRequest(service.id, requestId, input);
      
      if (processingResult) {
        // Handle different service types
        if (processingResult.serviceType === 'image' && typeof processingResult.result === 'string') {
          setImageUrl(processingResult.result);
        } else {
          setResult(processingResult.result);
        }
      } else {
        throw new Error("Failed to process request");
      }
    } catch (err) {
      console.error("Error processing request:", err);
      setError("Failed to process request. Please try again.");
    } finally {
      setIsProcessing(false);
      setIsPaying(false);
      // Reset requestId to allow new requests
      setRequestId(null);
    }
  };

  // Cancel payment
  const handleCancelPayment = () => {
    setIsPaying(false);
    setRequestId(null);
  };

  if (loading) {
    return (
      <div className="container max-w-5xl py-6 md:py-8 px-4">
        <div className="flex items-center justify-center h-[300px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return notFound();
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

              {error && <p className="text-sm text-destructive">{error}</p>}

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
                  {isProcessing ? "Processing..." : "Confirm & Pay"}
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
        </div>

        {/* Right Column - Output */}
        <div className="w-full md:w-1/2 h-[500px] md:h-auto">
          {service.type === "image" ? (
            <ImagePreview isProcessing={isProcessing} imageUrl={imageUrl} />
          ) : (
            <StreamingLog isProcessing={isProcessing} output={result} />
          )}
        </div>
      </div>
    </div>
  );
}