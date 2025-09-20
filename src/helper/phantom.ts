import nacl from "tweetnacl";

export const isMobile = () => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const buildPhantomConnectLink = () => {
  const dappUrl = encodeURIComponent(window.location.href);

  // 1. Generate ephemeral keypair
  const ephemeralKeyPair = nacl.box.keyPair();
  const dappPublicKey = Buffer.from(ephemeralKeyPair.publicKey).toString("base64");

  // 2. Build Phantom connect URL
  const link = `https://phantom.app/ul/v1/connect?app_url=${dappUrl}&dapp_encryption_public_key=${dappPublicKey}&redirect_link=${dappUrl}`;

  // (You’ll need to save ephemeralKeyPair somewhere in state to decrypt Phantom’s response later)
  localStorage.setItem("ephemeralSecretKey", Buffer.from(ephemeralKeyPair.secretKey).toString("base64"));

  return link;
};
