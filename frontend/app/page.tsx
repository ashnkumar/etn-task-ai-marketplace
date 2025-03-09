"use client";

import { useState, useEffect } from "react";
import { services } from "@/lib/services"
import ServiceCard from "@/components/service-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getServices } from "@/lib/api"

export default function Home() {
  const [apiServices, setApiServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Add a deliberate delay of 2 seconds for loading animation
        setTimeout(async () => {
          const services = await getServices();
          setApiServices(services);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching services:", error);
        // Fallback to local services if API fails
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, []);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already reactive, so we don't need to do anything here
  };
  
  // Filter services based on search query
  const filteredServices = searchQuery.trim() === "" 
    ? (apiServices.length > 0 ? apiServices : services) 
    : (apiServices.length > 0 ? apiServices : services).filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tagline?.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="flex flex-col">
      <div className="container px-4 py-6 md:py-8">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search AI services..." 
              className="pl-10 bg-card border-border" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {/* Remove the Filter button */}
        </form>
      </div>

      <div className="w-full bg-card border-y border-border py-4 mb-8">
        <p className="text-center text-muted-foreground max-w-4xl mx-auto px-4">
          Welcome to our AI Agents Marketplace. Choose a service, pay in ETN, and get your job done quickly!
        </p>
      </div>

      <div className="container px-4 pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Retrieving services...</p>
            </div>
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
            
            <div className="mt-10 text-center">
              <p className="text-muted-foreground text-sm italic">More services coming soon...</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

