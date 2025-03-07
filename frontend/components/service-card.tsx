import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Service } from "@/lib/services"

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-border">
      <div className="relative h-36 w-full">
        <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-base font-semibold">{service.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{service.shortDescription}</p>
        <p className="mt-2 text-primary font-medium text-sm">{service.basePrice}+ ETN</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/service/${service.slug}`} className="w-full">
          <Button variant="outline" className="w-full text-xs">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

