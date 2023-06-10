import { Address, toNano, WalletTypes, zeroAddress } from "locklift";
import { getRandomNonce} from "locklift";
async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { account } = await locklift.factory.accounts.addNewAccount({
    type: WalletTypes.WalletV3,
    value: toNano(10),
    publicKey: signer.publicKey,
  });
  const { contract: tokenRoot } = await locklift.factory.deployContract({
    contract: "TokenRoot",
    publicKey: signer.publicKey,
    initParams: {//randomNonce_: 0,
      randomNonce_: getRandomNonce(),
      name_: "Venom Poker1",
      symbol_: "VP1",
      decimals_: 9,
      rootOwner_: new Address("0:c24b85b28f899a92b92dbab6f1b0781dc48ee93324ca47e5c8624ce449a53977"),
      walletCode_: (await locklift.factory.getContractArtifacts("TokenWallet")).code,
      deployer_: new Address("0:0000000000000000000000000000000000000000000000000000000000000000"),
    },
    constructorParams: {
      initialSupplyTo: new Address("0:c24b85b28f899a92b92dbab6f1b0781dc48ee93324ca47e5c8624ce449a53977"),
      initialSupply: 6000000000000000,
      deployWalletValue: 5000000,
      mintDisabled: true,
      burnByRootDisabled: true,
      burnPaused: false,
      remainingGasTo: new Address("0:c24b85b28f899a92b92dbab6f1b0781dc48ee93324ca47e5c8624ce449a53977"),
  },
    value: locklift.utils.toNano(6),
  });

  console.log(`TokenRoot deployed at: ${tokenRoot.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
