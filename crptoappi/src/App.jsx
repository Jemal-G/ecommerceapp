import { useState, useEffect } from 'react';

import { get } from 'aws-amplify/api';
import './App.css';
//import GitHubBornOn from './GitHubBornOn';

function App() {

  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([])
 // Create additional state to hold user input for limit and start properties
const [input, updateInput] = useState({ limit: 5, start: 0 })

// Create a new function to allow users to update the input values
function updateInputValues(type, value) {
  updateInput({ ...input, [type]: value })
}
 //define function to all API
  async function fetchCoins() {
    const { limit, start } = input
    const request =  get({
      apiName: 'cryptoappi',
      path: `/coins?limit=${limit}&start=${start}`,
    })
    const response = await request.response;
    const data = await response.body.json();
    console.log('data is', data);
    updateCoins(data.coins);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
        <input
          onChange={e => updateInputValues('limit', e.target.value)}
          placeholder="limit"
        />
        <input
          placeholder="start"
          onChange={e => updateInputValues('start', e.target.value)}
        />
        <button onClick={fetchCoins}>Fetch Coins</button>

      {coins.map((coin, index) => (
        <div key={index}>
          <h2>{coin.name} - {coin.symbol}</h2>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}

    </div>
  );
}

export default App;
