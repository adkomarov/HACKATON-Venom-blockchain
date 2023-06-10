import { Address, getRandomNonce, toNano, WalletTypes } from "locklift";

const TOKEN_ROOT_ADDRESS = "0:102763ded96276935b70f9fe5831def774172b96ee8c2efec19850502a31ccf3";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const account = await locklift.factory.accounts.addExistingAccount({
    type: WalletTypes.WalletV3,
    publicKey: signer.publicKey,
  });
  const { contract: tokensale, tx } = await locklift.factory.deployContract({
    contract: "Tokensale",
    publicKey: signer.publicKey,
    initParams: {
      _nonce: getRandomNonce(),
      _owner: account.address,
    },
    constructorParams: {
        distributedTokenRoot: new Address(TOKEN_ROOT_ADDRESS),
        supply: 5000000000000000,
        rate: 250,
        sendRemainingGasTo: account.address,
    },
    value: toNano(10),
  });

  console.log(`Tokensale deployed at: ${tokensale.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
