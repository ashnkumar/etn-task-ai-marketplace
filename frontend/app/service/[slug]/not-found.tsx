import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The AI service you're looking for doesn't exist or may have been removed.
      </p>
      <Link href="/">
        <Button className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Return to Marketplace
        </Button>
      </Link>
    </div>
  )
}

