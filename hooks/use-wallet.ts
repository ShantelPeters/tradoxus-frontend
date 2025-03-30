"use client";

import { useState, useEffect, useCallback } from 'react';
import { WalletType, WalletState, UseWalletReturn } from '@/app/types/wallet';
import { verifyConnection } from '../lib/wallet-verification';
import { connectWallet } from '../lib/wallet-connection';

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
        
        verifyConnection(wallet.type, wallet.address, setState, disconnect);
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
      const result = await connectWallet(type);
      
      if (result.success) {
        if (type === 'metamask' && window.ethereum) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setState(prev => ({ ...prev, chainId }));
        }
        
        updateWallet(type, (result.address as any));
        return true;
      } else {
        throw new Error(result.error || "Failed to connect wallet");
      }
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

  const disconnect = useCallback(async () => {
    try {
      if (state.type === 'stellar' && window.rabet) {
        await window.rabet.disconnect();
      }

      if (state.type === 'metamask' && window.ethereum && window.ethereum.providers) {
        const metamask = window.ethereum.providers.find((provider: any) => provider.isMetaMask);
        if (metamask) {
          await metamask.request({
            "method": "wallet_revokePermissions",
            "params": [
              {
                "eth_accounts": {}
              }
            ]
          });
        }
      }

      if (state.type === 'coinbase' && window.coinbaseWalletExtension) {
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