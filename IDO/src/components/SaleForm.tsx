import React, { useState } from "react";
import { VenomConnect } from "venom-connect";
import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import '../styles/main.css';

// we will user bignumber library to operate with deposit values (remember about decimals multiply)
import BigNumber from "bignumber.js";

// Importing of our contract ABI from smart-contract build action. Of cource we need ABI for contracts calls.
import tokenSaleAbi from "../abi/Tokensale.abi.json";

import AddTokenImg from "../styles/img/add_token.svg";
import logoutIMG from '../styles/img/log_out.svg';
import VenomIMG from "../styles/img/venom_s.png";
import VenomPokerIMG from "../styles/img/venompoker_s.png";

type Props = {
  balance: string | undefined;
  getBalance: (wallet: string) => void;
  venomConnect: VenomConnect | undefined;
  address: string | undefined;
  provider: ProviderRpcClient | undefined;
};

function SaleForm({ balance, venomConnect, address, provider, getBalance }: Props) {
  const [tokenAmount, setTokenAmount] = useState<number | undefined>(0);

  const onChangeAmount = (e: string) => {
    if (e === "") setTokenAmount(undefined);
    setTokenAmount(Number(e));
  };

  // handler that helps us to ask user about adding our token to the user's venom wallet
  const onTokenAdd = () => {
    console.log(provider?.addAsset({
      account: new Address(address as string), // user's wallet address
      params: {
        rootContract: new Address("0:102763ded96276935b70f9fe5831def774172b96ee8c2efec19850502a31ccf3"), // TokenRoot address
      },
      type: "tip3_token", // tip3 - is a standart we use
    }))
  }

  const buyTokens = async () => {
    if (!venomConnect || !address || !tokenAmount || !provider) return;
    const userAddress = new Address(address);
    const contractAddress = new Address("0:787d532cfd05f90dda21c19d76fc482b015199b52be6a9594516361cd13c71e2"); // Our Tokensale contract address
    const deposit = new BigNumber(tokenAmount).multipliedBy((10** 8)*25).toString(); // Contract"s rate parameter is 1 venom = 10 tokens
    // Creating an instance for Tokensale contract
    const contract = new provider.Contract(tokenSaleAbi, contractAddress);
    // another 1 venom for connection. You will receive a change, as you remember
    const amount = new BigNumber((10**9)*(tokenAmount)).plus(new BigNumber(1).multipliedBy(10**9)).toString();;
    try {
      // and just call buyTokens method according to smart contract
      const result = await contract.methods
        .buyTokens({
          deposit,
        } as never)
        .send({
          from: userAddress,
          amount,
          bounce: true,
        });
      if (result?.id?.lt && result?.endStatus === "active") {
        setTokenAmount(undefined);
        getBalance(address);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="form-content-item">
        <p className="addressUS">You wallet address: {address}</p>
      </div>
      <div className="form-content-item">
        <span><img src={VenomPokerIMG} alt="VP"></img> Token</span>
        <img ></img>
        <b>0:9f4...02d</b>
        <a className="add" onClick={onTokenAdd}>
          <img src={AddTokenImg} alt="add_token" />
        </a>
      </div>
      <div className="form-content-item">
        <span>My Token Balance</span>
        <b>{new BigNumber(String(balance)).dividedBy(10**9).toString()}</b>
      </div>
      <div className="form-content-item">
        <div className="number">
          <span className="amount">Amount <img src={VenomIMG} alt="venom"></img></span>
          <input
            className="form-content-input"
            type="number"
            min={0}
            value={tokenAmount !== undefined ? tokenAmount : ""}
            onChange={(e) => {
              onChangeAmount(e.target.value);
            }}
          />
        </div>
        <a className={!tokenAmount ? "button disabled" : "button"} onClick={buyTokens}>
          <b>Invest</b>
        </a>
      </div>
    </>
  );
}

export default SaleForm;
