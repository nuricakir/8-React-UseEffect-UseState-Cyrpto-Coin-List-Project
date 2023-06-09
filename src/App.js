import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Kripto Para Listesi</h1>
          <form>
            <input
              type="text"
              placeholder="İsim"
              className="coin-input"
              onChange={handleChange}
            />
          </form>
        </div>
        <div class="container">
          <div class="table">
            <div class="table-header">
              <div class="header__item">İsim</div>
              <div class="header__item">Sembol</div>
              <div class="header__item">Değer ($) </div>
              <div class="header__item">Değişim (%)</div>
            </div>
          </div>
        </div>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
