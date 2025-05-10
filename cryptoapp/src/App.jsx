import { useState, useEffect } from "react";
import { get } from 'aws-amplify/api';
import "./App.css";
import GitHubBornOn from "./GitHubBornOn";

function App() {
  const [coins, updateCoins] = useState([]);
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  async function fetchCoins() {
    const { limit, start } = input;
    try {
      // returns { response, cancel }
      const op = get({
        apiName: 'cryptoapi',
        path: '/coins',
        options: { queryParams: { limit, start } }
      });
      const { response } = op;
      const { body } = await response;
      const json = await body.json();
      updateCoins(json.coins || []);
    } catch (e) {
      console.error('Error fetching coins:', e);
      updateCoins([]);
    }
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
      <input
        onChange={(e) => updateInputValues("limit", e.target.value)}
        placeholder="Enter Starting Index"
      />
      <input
        placeholder="start from"
        onChange={(e) => updateInputValues("start", e.target.value)}
      />
      <button onClick={fetchCoins}>Fetch Coins</button>

      {coins.map((coin, index) => (
        <div key={index}>
          <h2>{coin.name} - {coin.symbol}</h2>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}

      {/* Renders the dynamic GitHub user data */}
      <GitHubBornOn />
    </div>
  );
  
}

export default App;
