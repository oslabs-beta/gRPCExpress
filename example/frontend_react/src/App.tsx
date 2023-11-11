'use client';

import React, { useEffect, useState } from 'react';
import { grpcExpressClient } from '@grpcexpress/grpcexpress';
import { useGrpcExpress } from '@grpcexpress/usegrpcexpress';
import ButtonGroupComponent from './components/ButtonGroupComponent';
import { StocksServiceClient } from '../protos/StocksServiceClientPb';
import { Container, Stack } from '@mui/material';
import Responses from './components/Responses';
import { User } from '../protos/stocks_pb';

type Response = {
  timeSpan: number;
  symbol: string;
  name: string;
  price: number;
};

const Client = grpcExpressClient(StocksServiceClient);
const client = new Client('http://localhost:8080');

export default function App() {
  const [responses, setResponse] = useState<Response[]>([]);

  async function getStockInfo(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const element = e.target as HTMLButtonElement;
    const username = element.value;
    const user = new User();
    user.setUsername(username);
    const before = Date.now();
    const stockList = await client.getStocks(user, {});
    const timeSpan = Date.now() - before;
    const stocksObject = stockList.toObject();
    const stocksListWithTime = stocksObject.stocksList.map(e => ({
      timeSpan,
      symbol: e.symbol,
      name: e.name,
      price: e.price,
    }));
    setResponse(prev => [...prev, ...stocksListWithTime]);
  }

  // create test user
  const testUser = new User();
  testUser.setUsername('Shiyu');
  // test useGrpcExpress hook
  const { data, error, isLoading, isError } = useGrpcExpress(
    client.getStocks,
    testUser
  );

  useEffect(() => {
    if (data) {
      setResponse(prev => [...prev, ...data.toObject().stocksList]);
    }
  }, [data]);

  return (
    <main>
      <ButtonGroupComponent handleClick={getStockInfo} />
      <Stack direction="row" justifyContent="space-between" mt={8} mx={8}>
        <Container sx={{ flexBasis: 1 }}>
          <Responses responses={responses} />
        </Container>
      </Stack>
      <Stack direction="column" justifyContent="space-between" mt={8} mx={8}>
        <h2>Hook Tests</h2>
        <p>isLoading: {isLoading ? 'true' : 'false'}</p>
        <p>isError: {isError ? 'true' : 'false'}</p>
        {isError && <p>error: {JSON.stringify(error)}</p>}
        {!isLoading && <p>Response added to the table</p>}
      </Stack>
    </main>
  );
}
