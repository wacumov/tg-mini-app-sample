import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cryptoPrice, setCryptoPrice] = useState(1000);
  const [isPriceIncreasing, setIsPriceIncreasing] = useState(true);
  const [eurBalance, setEurBalance] = useState(100);
  const [cryptoBalance, setCryptoBalance] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrice((oldPrice) => {
        const change = Math.random() * 30 + 20;

        let newPrice;
        if (isPriceIncreasing) {
          newPrice = oldPrice + change;
          if (newPrice >= 2000) {
            newPrice = 2000;
            setIsPriceIncreasing(false);
          }
        } else {
          newPrice = oldPrice - change;
          if (newPrice <= 500) {
            newPrice = 500;
            setIsPriceIncreasing(true);
          }
        }

        return Math.round(newPrice * 100) / 100;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPriceIncreasing]);


  const buyCrypto = () => {
    if (eurBalance >= 10) {
      setEurBalance(eurBalance - 10);
      setCryptoBalance(cryptoBalance + 10 / cryptoPrice);
    }
  };

  const sellCrypto = () => {
    const cryptoToSell = 10 / cryptoPrice;
    if (cryptoBalance >= cryptoToSell) {
      setCryptoBalance(cryptoBalance - cryptoToSell);
      setEurBalance(eurBalance + 10);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Price: €{cryptoPrice.toFixed(2)}</p>
        <button onClick={buyCrypto}>Buy</button>
        <button onClick={sellCrypto}>Sell</button>
        <p>EUR Balance: ${eurBalance.toFixed(2)}</p>
        <p>Crypto Balance: {cryptoBalance.toFixed(4)}</p>
      </header>
    </div>
  );
}

export default App
