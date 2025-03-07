"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  checkIfWalletIsConnected,
  connectWallet,
  checkNetwork,
  switchToElectroneum,
  disconnectWallet
} from '@/lib/blockchain';

interface WalletContextType {
  walletAddress: string | null;
  isConnecting: boolean;
  isCorrectNetwork: boolean;
  connectWallet: () => Promise<void>;
  switchNetwork: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  isConnecting: false,
  isCorrectNetwork: false,
  connectWallet: async () => {},
  switchNetwork: async () => {},
  disconnectWallet: () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Initialize: check if wallet is already connected
  useEffect(() => {
    const initWallet = async () => {
      const address = await checkIfWalletIsConnected();
      setWalletAddress(address);
      
      if (address) {
        const correctNetwork = await checkNetwork();
        setIsCorrectNetwork(correctNetwork);
      }
    };
    
    initWallet();
  }, []);

  // Handle wallet connection
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    try {
      const address = await connectWallet();
      setWalletAddress(address);
      
      if (address) {
        const correctNetwork = await checkNetwork();
        setIsCorrectNetwork(correctNetwork);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle network switching
  const handleSwitchNetwork = async () => {
    if (!walletAddress) return;
    
    try {
      const switched = await switchToElectroneum();
      setIsCorrectNetwork(switched);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };
  
  // Handle wallet disconnection
  const handleDisconnectWallet = () => {
    disconnectWallet();
    setWalletAddress(null);
    setIsCorrectNetwork(false);
  };
  
  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isConnecting,
        isCorrectNetwork,
        connectWallet: handleConnectWallet,
        switchNetwork: handleSwitchNetwork,
        disconnectWallet: handleDisconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};