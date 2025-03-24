import { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';
import './App.css';
import GitHubBornOn from './GitHubBornOn';

function App() {
  const [coins, setCoins] = useState([]);
  const [input, setInput] = useState({ limit: 5, start: 0 });

  const updateInputValues = (type, value) => setInput({ ...input, [type]: value });

  const fetchCoins = async () => {
    try {
      const request = get({
        apiName: 'crptoappi',
        path: `/coins?limit=${input.limit}&start=${input.start}`,
      });
      const response = await request.response;
      const data = await response.body.json();
      setCoins(data.coins || []);
    } catch (error) {
      console.error('Error fetching coins:', error);
      setCoins([]);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
      <input onChange={(e) => updateInputValues('limit', e.target.value)} placeholder="Enter Limit" />
      <input onChange={(e) => updateInputValues('start', e.target.value)} placeholder="Enter Start Index" />
      <button onClick={fetchCoins}>Fetch Coins</button>

      {coins.map((coin, index) => (
        <div key={index}>
          <h2>{coin.name} - {coin.symbol}</h2>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}

      <GitHubBornOn />
    </div>
  );
}

export default App;
