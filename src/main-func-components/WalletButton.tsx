import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

export default function WalletButton() {
  const { publicKey } = useWallet();

  // Handle mobile wallet connection more explicitly
  useEffect(() => {
    // Check if we're in a mobile browser and might need special handling
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    if (isMobile && !publicKey) {
      // You might want to add additional mobile-specific logic here
      console.log('Mobile device detected');
    }
  }, [publicKey]);

  return (
    <div>
      <WalletMultiButton />
    </div>
  );
}