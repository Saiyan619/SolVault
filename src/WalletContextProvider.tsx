import { useMemo } from "react";
import type { FC } from "react";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
  createDefaultWalletNotFoundHandler,
} from "@solana-mobile/wallet-adapter-mobile";

import "@solana/wallet-adapter-react-ui/styles.css";

type Props = {
  children: React.ReactNode;
};

const WalletContextProvider: FC<Props> = ({ children }) => {
  // ✅ Your Solana RPC endpoint
  const endpoint = "https://api-devnet.helius.xyz";

  // ✅ Your deployed dApp URL (required for Phantom mobile deep linking)
  const APP_URL = "https://sol-vault-kappa.vercel.app";

  const wallets = useMemo(
    () => [
      // 📱 Mobile wallet adapter (priority for mobile)
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
          name: "Sol Vault",
          uri: APP_URL,
          icon: `${APP_URL}/favicon.ico`,
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        chain: WalletAdapterNetwork.Devnet,
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      }),

      // 🖥️ Desktop extension wallets
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
