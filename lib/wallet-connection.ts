"use client";

import { WalletType } from '@/app/types/wallet';

interface ConnectionResult {
  success: boolean;
  address?: string;
  error?: string;
}

/**
 * Connects to the specified wallet type
 * 
 * @param type The type of wallet to connect to
 * @returns A connection result object
 */
export const connectWallet = async (type: WalletType): Promise<ConnectionResult> => {
  try {
    if (type === 'metamask') {
      return await connectMetamask();
    } 
    else if (type === 'coinbase') {
      return await connectCoinbase();
    } 
    else if (type === 'stellar') {
      return await connectStellar();
    }
    
    return {
      success: false,
      error: "Invalid wallet type"
    };
  } catch (error: any) {
    console.error("Error in connectWallet:", error);
    return {
      success: false,
      error: error.message || "Failed to connect wallet"
    };
  }
};

/**
 * Connects to MetaMask wallet
 */
const connectMetamask = async (): Promise<ConnectionResult> => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    let accounts: any[] = [];
    
    if ('providers' in window.ethereum) {
      const metamask = (window.ethereum as any).providers.find((provider: any) => provider.isMetaMask);
      if (metamask) {
        accounts = await metamask.request({
          method: 'eth_requestAccounts'
        });
      }
    } else {
      accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
    }
    
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }
    
    return {
      success: true,
      address: accounts[0]
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to connect MetaMask"
    };
  }
};

/**
 * Connects to Coinbase wallet
 */
const connectCoinbase = async (): Promise<ConnectionResult> => {
  try {
    if (!window.coinbaseWalletExtension) {
      throw new Error("Coinbase Wallet is not installed");
    }
    
    const accounts = await window.coinbaseWalletExtension.request({
      method: 'eth_requestAccounts'
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }
    
    return {
      success: true,
      address: accounts[0]
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to connect Coinbase Wallet"
    };
  }
};

/**
 * Connects to Stellar wallet
 */
const connectStellar = async (): Promise<ConnectionResult> => {
  try {
    if (!window.rabet) {
      throw new Error("Rabet (Stellar wallet) is not installed");
    }
    
    const response = await window.rabet.connect();
    
    if (!response.publicKey) {
      throw new Error("Failed to get Stellar public key");
    }
    
    return {
      success: true,
      address: response.publicKey
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to connect Stellar Wallet"
    };
  }
};