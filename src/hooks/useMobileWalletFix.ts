import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export const useMobileWalletFix = () => {
  const { select } = useWallet();

  useEffect(() => {
    // Check if we're on mobile and handle deep linking
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Listen for wallet connection events that might come from mobile app
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'walletConnect') {
          select('Phantom');
        }
      };

      window.addEventListener('message', handleMessage);
      
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [select]);
};