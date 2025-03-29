interface Window {
    // MetaMask
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, listener: (...args: any[]) => void) => void;
      removeListener: (eventName: string, listener: (...args: any[]) => void) => void;
    };
    
    // Coinbase Wallet
    coinbaseWalletExtension?: {
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, listener: (...args: any[]) => void) => void;
      removeListener: (eventName: string, listener: (...args: any[]) => void) => void;
    };
    
    // Stellar Rabet
    rabet?: {
      disconnect: () => Promise<void>;
      connect: () => Promise<{ publicKey: string }>;
      sign: (tx: string, network: string) => Promise<{ signedXDR: string }>;
    };
  }