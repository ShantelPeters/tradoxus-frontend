"use client";

// Basic wallet types
export type WalletType = 'metamask' | 'coinbase' | 'stellar' | null;

export interface WalletState {
  connected: boolean;
  address: string | null;
  type: WalletType;
  balance: string | null;
  chainId: string | null;
  isConnecting: boolean;
  error: string | null;
}

export interface UseWalletReturn extends WalletState {
  connect: (type: WalletType) => Promise<boolean>;
  disconnect: () => void;
}

// UI related types
export interface WalletOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string, address: string) => void;
}

// Window type extensions for wallet providers
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      providers?: any[];
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, listener: (...args: any[]) => void) => void;
      removeListener: (eventName: string, listener: (...args: any[]) => void) => void;
    };
    coinbaseWalletExtension?: {
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, listener: (...args: any[]) => void) => void;
      removeListener: (eventName: string, listener: (...args: any[]) => void) => void;
    };
    rabet?: {
      disconnect: () => Promise<void>;
      connect: () => Promise<{ publicKey: string }>;
      sign: (tx: string, network: string) => Promise<{ signedXDR: string }>;
    };
  }
}