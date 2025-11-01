'use client'
import { 
    createDefaultAuthorizationCache, 
    createDefaultChainSelector, 
    createDefaultWalletNotFoundHandler,
    registerMwa, 
} from '@solana-mobile/wallet-standard-mobile';

registerMwa({
    appIdentity: {
    name: 'SolVault',
    uri: 'https://sol-vault-kappa.vercel.app/',
    icon: '/favicon.ico', // relative path resolves to https://sol-vault-kappa.vercel.app/favicon.ico
  },  
    authorizationCache: createDefaultAuthorizationCache(),
    chains: ['solana:devnet'],
    chainSelector: createDefaultChainSelector(),
    onWalletNotFound: createDefaultWalletNotFoundHandler(),
    remoteHostAuthority: 'sol-vault-kappa.vercel.app',
})