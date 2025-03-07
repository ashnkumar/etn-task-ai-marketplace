import { services } from "@/lib/services"
import ServiceCard from "@/components/service-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="container px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search AI services..." className="pl-10 bg-card border-border" />
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm italic">More services coming soon...</p>
        </div>
      </div>
    </div>
  )
}

