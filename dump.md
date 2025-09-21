     const transactions = [
    { 
      type: 'Deposit', 
      amount: '100.0 SOL', 
      status: 'Completed', 
      time: '2 mins ago', 
      hash: '8xF2...9pLm',
      typeColor: 'green',
      icon: ArrowDown
    },
    { 
      type: 'Settlement', 
      amount: '95.0 SOL', 
      status: 'Pending', 
      time: '1 hour ago', 
      hash: '7kR8...4nQw',
      typeColor: 'purple',
      icon: Handshake
    },
    { 
      type: 'Initialize', 
      amount: '0.1 SOL', 
      status: 'Completed', 
      time: '2 days ago', 
      hash: '9xF2...4pLm',
      typeColor: 'blue',
      icon: Rocket
    }
  ];
  
   {/* Vault History */}
        {/* <Card className="mb-8 bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <History className="w-5 h-5 text-vault-blue" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Transaction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <TransactionRow key={index} {...tx} />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card> */}



<!-- Logs for initailize vault -->
console.log("Initializing vault with coral-xyz/anchor...");
        console.log("IDL initialize method:", idl.instructions.find((i: any) => i.name === "initialize"));
console.log("Wallet public key:", wallet.publicKey.toBase58());
            console.log("Mint address:", mintAddress);
            console.log("Client address:", targetUserAddress);
            console.log("Merchant address:", wallet.publicKey.toBase58());
console.log('Derived addresses:');
            console.log('Vault Info PDA:', vaultInfoPDA.toBase58());
            console.log('Vault Token PDA:', vaultTokenPDA.toBase58());
 console.error("Vault creation failed:", error.message);


 <!-- Logs for deposit vault -->

         console.log("IDL initialize method:", idl.instructions.find((i: any) => i.name === "deposit"));

            console.log("Starting deposit of amount:", amount);

            console.log('Deposit transaction signature:', tx);

<!-- Logs for withdraw token -->
   console.log("Withdrawing tokens...");
        console.log("IDL initialize method:", idl.instructions.find((i: any) => i.name === "withdraw"));

 

 <!--Logs for Settlement  -->
         console.log("settle boys.....")

            console.log("stil...settle boys.....")

            console.log("IDL initialize method:", idl.instructions.find((i: any) => i.name === "settlement"));

<!-- Logs for close vault -->
console.log("Closing vault...");
        console.log("Mint Address:", mintAddress);
        console.log("Client Address:", clientAddress);
        console.log("Wallet (Merchant) Address:", wallet.publicKey.toString());
   console.log("Vault Info PDA:", vaultInfoPDA.toString());
            console.log("Vault Token PDA:", vaultTokenPDA.toString());
        

       <!-- Logs for vault details -->

             console.log("Fetching vault details...");

    console.log("Vault Info Account found:", vaultInfoAccount);
      console.log("Vault Address:", vaultInfoPDA.toBase58());
      console.log("Stored amount:", vaultInfoAccount.amount.toString());
      console.log("Stored merchant:", vaultInfoAccount.merchant.toString());

      console.log("Stored client:", vaultInfoAccount.targetAcc.toString());
