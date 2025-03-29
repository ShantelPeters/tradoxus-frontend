"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string, address: string) => void;
}

const walletOptions: WalletOption[] = [
  {
    id: "stellar",
    name: "Stellar Wallet",
    icon: "S",
    color: "#18b6e8",
    description: "Connect using Stellar's secure wallet protocol"
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "C",
    color: "#0052FF",
    description: "Use Coinbase Wallet for seamless integration"
  },
  {
    id: "metamask",
    name: "MetaMask",
    icon: "M",
    color: "#F6851B",
    description: "Connect to Ethereum and EVM-compatible networks"
  },
];

export function WalletConnectionModal({ isOpen, onClose, onConnect }: WalletConnectionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  
  useEffect(() => {
    if (!isOpen) {
      setConnectingWallet(null);
      setError(null);
    }
  }, [isOpen]);

  // Connect to MetaMask wallet
  const connectMetamask = async () => {
    setConnectingWallet("metamask");
    setError(null);
    
    try {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts && accounts.length > 0) {
        onConnect("metamask", accounts[0]);
        onClose();
      } else {
        throw new Error("No accounts found. Please check your MetaMask configuration.");
      }
    } catch (err: any) {
      console.error("MetaMask connection error:", err);
      setError(err.message || "Failed to connect to MetaMask");
    } finally {
      setConnectingWallet(null);
    }
  };

  // Connect to Coinbase wallet
  const connectCoinbase = async () => {
    setConnectingWallet("coinbase");
    setError(null);
    
    try {
      if (typeof window.coinbaseWalletExtension !== 'undefined') {
        const accounts = await window.coinbaseWalletExtension.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          onConnect("coinbase", accounts[0]);
          onClose();
        }
      } else {
        throw new Error("Coinbase Wallet extension not detected. Please install the extension or use the Coinbase Wallet app's QR code scanner.");
      }
    } catch (err: any) {
      console.error("Coinbase Wallet connection error:", err);
      setError(err.message || "Failed to connect to Coinbase Wallet");
    } finally {
      setConnectingWallet(null);
    }
  };

  // Connect to Stellar wallet
  const connectStellar = async () => {
    setConnectingWallet("stellar");
    setError(null);
    
    try {
      // Check if Rabet (a Stellar wallet) is installed
      if (typeof window.rabet !== 'undefined') {
        const response = await window.rabet.connect();
        if (response) {
          const publicKey = response.publicKey;
          onConnect("stellar", publicKey);
          onClose();
        } else {
          const { publicKey } = await window.rabet.connect();
          onConnect("stellar", publicKey);
          onClose();
        }
      } else {
        throw new Error("Stellar wallet not detected. Please install a Stellar wallet extension like Rabet.");
      }
    } catch (err: any) {
      console.error("Stellar wallet connection error:", err);
      setError(err.message || "Failed to connect to Stellar Wallet");
    } finally {
      setConnectingWallet(null);
    }
  };

  const handleWalletSelect = (walletId: string) => {
    switch (walletId) {
      case "metamask":
        connectMetamask();
        break;
      case "coinbase":
        connectCoinbase();
        break;
      case "stellar":
        connectStellar();
        break;
      default:
        console.error("Unknown wallet type:", walletId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-[#050a14] rounded-xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all"
      >
        {/* Modal header */}
        <div className="relative p-5 border-b border-gray-800">
          <h2 className="text-3xl font-bold text-white text-center">Connect Your Wallet</h2>
          <button 
            onClick={onClose}
            className="absolute right-5 top-5 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">
            {error}
          </div>
        )}

        {/* Wallet options */}
        <div className="p-4">
          {walletOptions.map((wallet) => (
            <div 
              key={wallet.id}
              onClick={() => handleWalletSelect(wallet.id)}
              className="flex items-center justify-between p-5 my-3 rounded-md bg-[#0d1424] hover:bg-[#131b2e] cursor-pointer transition-colors relative"
            >
              <div className="flex items-center">
                <div 
                  className="h-12 w-12 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: wallet.color }}
                >
                  {wallet.icon}
                </div>
                <div className="ml-4">
                  <span className="text-white text-xl block">{wallet.name}</span>
                  <span className="text-gray-400 text-xs">{wallet.description}</span>
                </div>
              </div>
              {connectingWallet === wallet.id ? (
                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <ChevronRight className="text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}