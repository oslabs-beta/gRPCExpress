import React, { useEffect } from 'react';

import { Stock, StocksList, User } from '../protos/stocks_pb';

import {
  useGrpcExpress,
  useSetCache,
  useCache,
  grpcHook,
} from '../contexts/context';
import { StocksServiceClient } from '../protos/StocksServiceClientPb';

import GrpcExpress from '../grpcexpress/GrpcExpress';

const grpcExpress = new GrpcExpress();
const client = grpcExpress.getClient(
  StocksServiceClient,
  'http://localhost:8080'
) as StocksServiceClient;

export default function App() {
  const cache = useCache();
  const user = new User();
  user.setUsername('Arthur');

  async function handleClick() {
    const response = await client.getStocks(user, {});
    console.log(response);
  }

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
