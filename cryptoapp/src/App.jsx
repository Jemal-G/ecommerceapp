// Import useState and useEffect hooks from React
import { useState, useEffect } from 'react'

// Import the API category from AWS Amplify
import { get } from 'aws-amplify/api'

import './App.css';

function App() {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([])

  // Define function to all API
  async function fetchCoins() {
    
    const request =get({

      apiName:'cryptoapi',
      path:'/coins'

    })
    const response = await request.response;
    const data = await response.body.json();
    console.log("data is",data);
        updateCoins(data.coins)
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App