import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Service } from "@/lib/services"

interface SidebarServiceCardProps {
  service: Service
  isActive?: boolean
}

export default function SidebarServiceCard({ service, isActive = false }: SidebarServiceCardProps) {
  return (
    <Link
      href={`/service/${service.slug}`}
      className={cn(
        "block rounded-md overflow-hidden border border-border hover:border-primary transition-colors",
        isActive && "border-primary ring-1 ring-primary",
      )}
    >
      <div className="relative h-20 w-full">
        <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
      </div>
      <div className="p-2">
        <h3 className="text-xs font-medium line-clamp-1">{service.name}</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">{service.basePrice}+ ETN</p>
      </div>
    </Link>
  )
}

