"use client";
import { useState, useEffect, useCallback } from 'react';
export type WalletType = 'metamask' | 'coinbase' | 'stellar' | null;
interface WalletState {
  connected: boolean;
  address: string | null;
  type: WalletType;
  balance: string | null;
  chainId: string | null;
  isConnecting: boolean;
  error: string | null;
}
interface UseWalletReturn extends WalletState {
  connect: (type: WalletType) => Promise<boolean>;
  disconnect: () => void;
}
const initialState: WalletState = {
  connected: false,
  address: null,
  type: null,
  balance: null,
  chainId: null,
  isConnecting: false,
  error: null
};
export function useWallet(): UseWalletReturn {
  const [state, setState] = useState<WalletState>(initialState);

  // Load wallet on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('connectedWallet');
    if (savedWallet) {
      try {
        const wallet = JSON.parse(savedWallet);
        setState(prev => ({
          ...prev,
          connected: true,
          address: wallet.address,
          type: wallet.type as WalletType
        }));
        
        verifyConnection(wallet.type, wallet.address);
      } catch (e) {
        console.error("Error loading saved wallet:", e);
        localStorage.removeItem('connectedWallet');
      }
    }
  }, []);

  // Listen for account changes on MetaMask
  useEffect(() => {
    if (state.type === 'metamask' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== state.address) {
          updateWallet('metamask', accounts[0]);
        }
      };
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [state.type, state.address]);

  // Listen for network changes on MetaMask
  useEffect(() => {
    if (state.type === 'metamask' && window.ethereum) {
      const handleChainChanged = (chainId: string) => {
        setState(prev => ({
          ...prev,
          chainId
        }));
      };
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [state.type]);

  // Verify wallet connection is still valid
  const verifyConnection = async (type: WalletType, address: string) => {
    try {
      if (type === 'metamask' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (!accounts || accounts.length === 0 || accounts[0].toLowerCase() !== address.toLowerCase()) {
          disconnect();
          return false;
        }
        
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setState(prev => ({ ...prev, chainId }));
        
        return true;
      } 
      else if (type === 'coinbase' && window.coinbaseWalletExtension) {
        const accounts = await window.coinbaseWalletExtension.request({ method: 'eth_accounts' });
        if (!accounts || accounts.length === 0 || accounts[0].toLowerCase() !== address.toLowerCase()) {
          disconnect();
          return false;
        }
        return true;
      } 
      else if (type === 'stellar' && window.rabet) {
        const response = await window.rabet.connect();
        if (!response.publicKey) {
          disconnect();
          return false;
        } else {
          const publicKey = response.publicKey;
          if (publicKey !== address) {
            disconnect();
            return false;
          }
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error verifying connection:", error);
      disconnect();
      return false;
    }
  };

  // Update wallet state and save to local storage
  const updateWallet = useCallback((type: WalletType, address: string) => {
    setState(prev => ({
      ...prev,
      connected: true,
      address,
      type,
      isConnecting: false,
      error: null
    }));

    localStorage.setItem('connectedWallet', JSON.stringify({ address, type }));
  }, []);

  // Connect to a wallet
  const connect = async (type: WalletType): Promise<boolean> => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      if (type === 'metamask') {
        if (!window.ethereum) {
          throw new Error("MetaMask is not installed");
        }

        const metamask = (window.ethereum as any).providers.find((provider: any) => provider.isMetaMask);
        
        const accounts = await metamask.request({
          method: 'eth_requestAccounts'
        });

        console.log("Meta: ", accounts);
        
        if (!accounts || accounts.length === 0) {
          throw new Error("No accounts found");
        }
        
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setState(prev => ({ ...prev, chainId }));
        
        updateWallet('metamask', accounts[0]);
        return true;
      } 
      else if (type === 'coinbase') {
        if (!window.coinbaseWalletExtension) {
          throw new Error("Coinbase Wallet is not installed");
        }
        
        const accounts = await window.coinbaseWalletExtension.request({
          method: 'eth_requestAccounts'
        });

        console.log("Coin: ", accounts);
        
        if (!accounts || accounts.length === 0) {
          throw new Error("No accounts found");
        }
        
        updateWallet('coinbase', accounts[0]);
        return true;
      } 
      else if (type === 'stellar') {
        if (!window.rabet) {
          throw new Error("Rabet (Stellar wallet) is not installed");
        }
        
        const response = await window.rabet.connect();
        
        const publicKey = response.publicKey;
        updateWallet('stellar', publicKey);
        return true;
      }
      
      throw new Error("Invalid wallet type");
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || "Failed to connect wallet"
      }));
      return false;
    }
  };

  // Disconnect wallet
  // const disconnect = useCallback(async () => {
  //   setState(initialState);
  //   localStorage.removeItem('connectedWallet');
  // }, []);

  const disconnect = useCallback(async () => {
    console.log(state)
    try {
      if (state.type === 'stellar' && window.rabet) {
        await window.rabet.disconnect();
        console.log("Wallet disconnected")
      }

      if (state.type === 'metamask' && window.ethereum) {
        const metamask = (window.ethereum as any).providers.find((provider: any) => provider.isMetaMask);
        await metamask.request({
          "method": "wallet_revokePermissions",
          "params": [
            {
              "eth_accounts": {}
            }
          ]
        });
        console.log("Meta Wallet disconnected")
      }

      if (state.type === 'coinbase' && window.coinbaseWalletExtension) {
        console.log("Coin Wallet disconnected")
        await window.coinbaseWalletExtension.request({
          "method": "wallet_revokePermissions",
          "params": [
            {
              "eth_accounts": {}
            }
          ]
        });
      }
    } catch (error) {
      console.error("Error during wallet disconnection:", error);
    } finally {
      setState(initialState);
      localStorage.removeItem('connectedWallet');
    }
  }, [state]);

  return {
    ...state,
    connect,
    disconnect
  };
}

// Type declarations for wallet providers
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
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