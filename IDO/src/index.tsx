import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './header';
import reportWebVitals from './reportWebVitals';
import './styles/main.css';

import MediumIMG from "./styles/img/med_80.png";
import TwitterIMG from "./styles/img/tw_80.png";
import DiscordIMG from "./styles/img/ds.svg";
import TelegramIMG from "./styles/img/tg.svg";
import VenomIMG from "./styles/img/venom_s.png";
import VenomPokerIMG from "./styles/img/venompoker_s.png";

const header = ReactDOM.createRoot(
    document.getElementById('header') as HTMLElement
)
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const footer = ReactDOM.createRoot(
    document.getElementById('footer') as HTMLElement
)
const general = ReactDOM.createRoot(
    document.getElementById('general') as HTMLElement
)
header.render(
    <React.StrictMode>
        <Header />
    </React.StrictMode>
);
general.render(
    <section className="general-info">
        <h1>Venom Poker IDO</h1>
        <p>This is our testnet IDO, participate in it!</p> <p>1 <img src={VenomIMG} alt="venom"></img> invest in testnet = 5 <img src={VenomPokerIMG} alt="VP"></img> in mainnet</p>
        <p>Price: <p id='price1'>1 <img src={VenomIMG} alt="venom"></img> = 250 <img src={VenomPokerIMG} alt="VP"></img> </p><br></br><p id='price2'> 1 <img src={VenomPokerIMG} alt="VP"></img> = 0.004 <img src={VenomIMG} alt="venom"></img></p></p>
    </section>
)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
footer.render(
    <section className="footer-content">
        <a href="https://medium.com/@venom_poker"><img src={MediumIMG} alt="medium"></img></a>
        <a href="https://twitter.com/venom_poker"><img src={TwitterIMG} alt="twitter"></img></a>
        <a href="https://discord.gg/TjRnAVpgJ9"><img src={DiscordIMG} alt="discord"></img></a>
        <a href="https://t.me/venom_poker"><img src={TelegramIMG} alt="telegram"></img></a>
    </section>
);

reportWebVitals();
