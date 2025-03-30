"use client";

import { WalletType, WalletState } from '@/app/types/wallet';

/**
 * Verifies if a wallet connection is still valid
 * 
 * @param type The type of wallet to verify
 * @param address The wallet address to verify
 * @param setState The state setter function
 * @param disconnect The disconnect function
 * @returns A boolean indicating if the connection is valid
 */
export const verifyConnection = async (
  type: WalletType, 
  address: string,
  setState: React.Dispatch<React.SetStateAction<WalletState>>,
  disconnect: () => void
): Promise<boolean> => {
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