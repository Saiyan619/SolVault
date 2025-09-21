import { useState } from 'react';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey } from '@solana/web3.js';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import idl from '@/solana_escrow_vault.json';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Buffer } from "buffer";

const PROGRAM_ID = new PublicKey(import.meta.env.VITE_PROGRAM_ID);

// Map known token mints to friendly names
const TOKEN_LABELS: Record<string, string> = {
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr": "USDC (Devnet)",
  "EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS": "USDT (Devnet)",
  "So11111111111111111111111111111111111111112": "Wrapped SOL",
};

const VaultDetails = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [clientAddress, setClientAddress] = useState('');
  const [merchantAddress, setMerchantAddress] = useState('');
  const [vaultBalance, setVaultBalance] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState('');
  const [merchant, setMerchant] = useState("");
  const [client, setClient] = useState("");
  const [tokenMint, setTokenMint] = useState("");

  const getVaultDetails = async (merchantAddress: string, clientAddress: string, mintAddress: string) => {
    if (!wallet) {
      console.error("Wallet is not connected");
      return;
    }
    if (clientAddress === "" && merchantAddress === "") {
      console.error("client and merchant address are required");
      return;
    }

    const provider = new AnchorProvider(connection, wallet, {
      commitment: 'confirmed'
    });

    const program = new Program(idl as any, provider);

    const merchantPubKey = new PublicKey(merchantAddress.trim());
    const clientPubKey = new PublicKey(clientAddress.trim());
    const mintPubKey = new PublicKey(mintAddress.trim());

    const [vaultInfoPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("vault_info"),
        merchantPubKey.toBuffer(),
        clientPubKey.toBuffer(),
        mintPubKey.toBuffer()
      ],
      PROGRAM_ID
    );

    try {
      const vaultInfoAccount = await (program.account as any).vaultInfo.fetch(vaultInfoPDA);



      setVaultBalance(vaultInfoAccount.amount.toString());

      setMerchant(vaultInfoAccount.merchant.toString());

      setClient(vaultInfoAccount.targetAcc.toString());

      if (vaultInfoAccount.mint) {
        const mint = vaultInfoAccount.mint.toString();
        console.log("Stored token mint:", mint);
        setTokenMint(mint);
      }
    } catch (error) {
      console.error("Error fetching vault details:", error);
      throw error;
    }
  };

  return (
    <div>
      <div>
        <h2>Get Current Vault Details</h2>
        <div>
          <Label className="text-foreground">Merchant Address</Label>
          <Input
            placeholder="Merchant pubkey..."
            value={merchantAddress}
            type="text"
            onChange={(e) => setMerchantAddress(e.target.value)}
            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:ring-vault-green"
          />

          <Label className="text-foreground mt-3">Client Address</Label>
          <Input
            placeholder="Client pubkey..."
            value={clientAddress}
            type="text"
            onChange={(e) => setClientAddress(e.target.value)}
            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:ring-vault-green"
          />

          <div className="space-y-2 mt-3">
            <Label className="text-foreground">Vault Token Type</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="bg-background/50 border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr">USDC (Devnet)</SelectItem>
                <SelectItem value="EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS">USDT (Devnet)</SelectItem>
                <SelectItem value="So11111111111111111111111111111111111111112">Wrapped SOL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-5" onClick={() => getVaultDetails(merchantAddress, clientAddress, selectedToken)}>
            Get Vault Details
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-card border-border shadow-card mt-5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Info className="w-5 h-5 text-vault-orange" />
            Current Vault Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground text-sm">Merchant:</span>
                <p className="font-mono text-foreground">{merchant || "Nil"}</p>
              </div>

              <div>
                <span className="text-muted-foreground text-sm">Client:</span>
                <p className="font-mono text-foreground">{client || "Nil"}</p>
              </div>

              <div>
                <span className="text-muted-foreground text-sm">Token Mint:</span>
                <p className="text-foreground">
                  {(TOKEN_LABELS[tokenMint] ?? tokenMint) || "Nil"}
                </p>
              </div>

              <div>
                <span className="text-muted-foreground text-sm">Current Balance:</span>
                <p className="font-mono text-vault-green font-semibold text-2xl">
                  {vaultBalance ? `${vaultBalance} ${TOKEN_LABELS[tokenMint]?.split(" ")[0] ?? "Tokens"}` : "Nil"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaultDetails;
