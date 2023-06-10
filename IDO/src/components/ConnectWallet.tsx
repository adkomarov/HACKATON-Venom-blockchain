import React from 'react';
import { VenomConnect } from 'venom-connect';
import '../styles/main.css';

type Props = {
  venomConnect: VenomConnect | undefined;
};

function ConnectWallet({ venomConnect }: Props) {
  const login = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };
  return (
    <div>
      <>
        <a className="button" onClick={login}>
          Connect wallet
        </a>
      </>
    </div>
  );
}
  
export default ConnectWallet;
  