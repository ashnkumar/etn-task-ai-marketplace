"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, LogOut, RefreshCw, PlusCircle } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TopBar() {
  const { walletAddress, isConnecting, isCorrectNetwork, connectWallet, switchNetwork, disconnectWallet } = useWallet();
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  
  const handleWalletAction = async () => {
    console.log("Wallet action clicked");
    if (!walletAddress) {
      await connectWallet();
    } else if (!isCorrectNetwork) {
      await switchNetwork();
    } else {
      // Show dialog instead of immediately disconnecting
      setShowDisconnectDialog(true);
    }
  };
  
  const handleDisconnect = () => {
    disconnectWallet();
    setShowDisconnectDialog(false);
  };
  
  // Format the wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Determine button text based on wallet state
  const getButtonText = () => {
    if (isConnecting) return "Connecting...";
    if (!walletAddress) return "Connect Wallet";
    if (!isCorrectNetwork) return "Switch Network";
    return formatAddress(walletAddress);
  };
  
  // Determine button variant based on wallet state
  const getButtonVariant = () => {
    if (!walletAddress) return "outline";
    if (!isCorrectNetwork) return "destructive";
    return "outline";
  };

  // Get button icon based on wallet state
  const getButtonIcon = () => {
    if (!walletAddress) return null;
    if (!isCorrectNetwork) return <RefreshCw className="h-4 w-4 mr-2" />;
    return <LogOut className="h-4 w-4 mr-2" />;
  };

  return (
    <>
      <header className="w-full border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground">
              <Zap size={18} />
            </div>
            <span className="text-lg font-semibold">ETN Task AI</span>
          </Link>

          <div className="flex items-center gap-3">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button 
                      variant="outline"
                      disabled={true}
                      className="flex items-center opacity-60 cursor-pointer"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="z-50">
                  <p>Ability to add services coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              onClick={handleWalletAction} 
              variant={getButtonVariant() as any}
              disabled={isConnecting}
              className="flex items-center"
            >
              {getButtonIcon()}
              {getButtonText()}
            </Button>
          </div>
        </div>
      </header>
      
      <Dialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect Wallet</DialogTitle>
            <DialogDescription>
              This will disconnect your wallet from this application.
              <br /><br />
              Note: For complete security, you should also disconnect this site in your MetaMask extension.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisconnectDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDisconnect}>Disconnect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
    
  );
}