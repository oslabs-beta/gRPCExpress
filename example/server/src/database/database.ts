import { StocksList, UserStock, User } from '../stocks';

const stocksList: StocksList = {
  stocks: [
    {
      symbol: 'ED',
      name: 'ConEdison',
      price: 89.38,
      time: new Date().toISOString(),
    },
    {
      symbol: 'AAPL',
      name: 'Apple',
      price: 177.23,
      time: new Date().toISOString(),
    },
    {
      symbol: 'GOOGL',
      name: 'Google',
      price: 129.08,
      time: new Date().toISOString(),
    },
  ],
};

const userStocks: UserStock[] = [
  {
    username: 'Arthur',
    symbol: ['GOOGL'],
  },
  {
    username: 'Murat',
    symbol: ['ED'],
  },
  {
    username: 'Shiyu',
    symbol: ['APPL'],
  },
  {
    username: 'Jun',
    symbol: [],
  },
];

const db = {
  query(username: User): Promise<StocksList> {
    const user = username.username;
    const stocksSet = new Set(
      userStocks.filter(e => e.username === user)[0].symbol
    );
    const filteredStocksList = stocksList.stocks.filter(e =>
      stocksSet.has(e.symbol)
    );

    return new Promise<StocksList>(resolve => {
      setTimeout(() => {
        resolve({ stocks: filteredStocksList });
      }, 2000);
    });
  },
};

export default db;
