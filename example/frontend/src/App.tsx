import stocksServiceClient from './services/StocksServiceClient';

import { User, Stock, StocksList } from '../protos/stocks';
import React, { useEffect, useState } from 'react';

function App() {
  const [stocks, setStocks] = useState<Stock[]>();
  const [user, setUser] = useState<User | null>(null);
  // const [response, setResponse] = useState<StocksList | null>(null);

  // const user = User.fromJson({ username: 'Arthur' });
  function handleClick() {
    switch (user?.username) {
      case 'Arthur':
        setUser(User.fromJson({ username: 'Murat' }));
        break;
      case 'Murat':
        setUser(User.fromJson({ username: 'Shiyu' }));
        break;
      case 'Shiyu':
        setUser(User.fromJson({ username: 'Jun' }));
        break;
      case 'Jun':
        setUser(User.fromJson({ username: 'Arthur' }));
        break;
      default:
        setUser(User.fromJson({ username: 'Jun' }));
    }
  }

  useEffect(() => {
    if (!user) return;
    // (async () => {
    //   const response = await stocksServiceClient.getStocks(user).response;
    //   setResponse(response);
    // })();
    stocksServiceClient.getStocks(user).then(res => {
      setStocks(res.response.stocks);
    });
  }, [user]);

  return (
    <>
      <button onClick={handleClick}>Change user</button>
      {/* {JSON.stringify(response)} */}
      {stocks &&
        stocks?.map(stock => (
          <React.Fragment key={stock.symbol}>
            <div>Symbol: {stock.symbol}</div>
            <div>Name: {stock.name}</div>
            <div>Price: {stock.price}</div>
            <div>Time: {stock.time}</div>
          </React.Fragment>
        ))}
    </>
  );
}

export default App;
