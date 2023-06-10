import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import React, { useEffect, useState } from 'react';
import { VenomConnect } from 'venom-connect';
import { initVenomConnect } from './venom-connect/configure';
import './styles/main.css';

import logoIMG from './styles/img/TOC_ICON_80.png';
import logoutIMG from './styles/img/log_out.svg';

// type Props = {
//     venomConnect: VenomConnect | undefined;
// };

function Header() {

    const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();
    const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
    };
    useEffect(() => {
    init();
    }, []);

    const [venomProvider, setVenomProvider] = useState<any>();
    const [address, setAddress] = useState();

    const [balance, setBalance] = useState<string | undefined>();
    let tokenWalletAddress: string | undefined;

    const getAddress = async (provider: any) => {
        const providerState = await provider?.getProviderState?.();
        return providerState?.permissions.accountInteraction?.address.toString();
      };
    
    const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) await getAddress(_venomConnect);
    };  

    const onConnect = async (provider: any) => {
        setVenomProvider(provider);
        await onProviderReady(provider);
      };

    const onDisconnect = async () => {
        venomProvider?.disconnect();
        setAddress(undefined);
        setBalance(undefined);
        tokenWalletAddress = undefined;
    
    };

    const onProviderReady = async (provider: any) => {
        const venomWalletAddress = provider ? await getAddress(provider) : undefined;
        setAddress(venomWalletAddress);
    };

    useEffect(() => {
        const off = venomConnect?.on('connect', onConnect);
        if (venomConnect) {
          checkAuth(venomConnect);
        }
        return () => {
          off?.();
        };
    }, [venomConnect]);
    
    return (
        <div className='header-content'>
            <div className="logo">
              <a href="#">
                <img src={logoIMG} alt="Venom Poker logo"></img>
                <p className="anim">Venom Poker</p>
              </a>
            </div>
        </div>
    );
}

export default Header;