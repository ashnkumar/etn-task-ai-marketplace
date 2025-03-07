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
EOL
Definition of Done:

ImagePreview component updated to display generated images
Loading state added for image loading
3.10 Update Homepage to Fetch Services from API
Implementation Details: Update the homepage to fetch and display services from our API:

cat > src/app/page.tsx << EOL
"use client";

import { useState, useEffect } from "react";
import { services } from "@/lib/services";
import ServiceCard from "@/components/service-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { getServices } from "@/lib/api";

export default function Home() {
  const [apiServices, setApiServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getServices();
        setApiServices(services);
      } catch (error) {
        console.error("Error fetching services:", error);
        // Fallback to local services if API fails
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, []);
  
  // Filter services based on search query
  const filteredServices = searchQuery.trim() === "" 
    ? (apiServices.length > 0 ? apiServices : services) 
    : (apiServices.length > 0 ? apiServices : services).filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="flex flex-col">
      <div className="container px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search AI services..." 
              className="pl-10 bg-card border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="w-full bg-card border-y border-border py-4 mb-8">
        <p className="text-center text-muted-foreground max-w-2xl mx-auto px-4">
          Welcome to our AI Agents Marketplace. Choose a service, pay in ETN, and get your job done quickly!
        </p>
      </div>

      <div className="container px-4 pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No services found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm italic">More services coming soon...</p>
        </div>
      </div>
    </div>
  );
}