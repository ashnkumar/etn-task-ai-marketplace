"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export default function TopBar() {
  const [isConnected, setIsConnected] = useState(false)

  const toggleWallet = () => {
    setIsConnected(!isConnected)
  }

  return (
    <header className="w-full border-b border-border bg-card">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground">
            <Zap size={18} />
          </div>
          <span className="text-lg font-semibold">ETN Task AI</span>
        </Link>

        <div>
          {isConnected ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">0xBD...AC09</span>
              <Button variant="link" size="sm" onClick={toggleWallet} className="text-sm text-primary">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={toggleWallet} variant="outline">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

