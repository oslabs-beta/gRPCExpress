'use client';

import React, { useEffect, useState } from 'react';
import { grpcExpressClient } from '@grpcexpress/grpcexpress';
import ButtonGroupComponent from './components/ButtonGroupComponent';
import { StocksServiceClient } from '../protos/StocksServiceClientPb';
import { Container, Stack } from '@mui/material';
import Responses from './components/Responses';
import { User } from '../protos/stocks_pb';
import { useGrpcExpress } from './useGrpcExpress';

type Response = {
  timeSpan: number;
  symbol: string;
  name: string;
  price: number;
};

export default function App() {
  const [responses, setResponse] = useState<Response[]>([]);

  // initialize a Grpc client by passing in the original client into our custom grpcExpressClient function
  const Client = grpcExpressClient(StocksServiceClient);
  const client = new Client('http://localhost:8080');

  const testUser = new User();
  testUser.setUsername('Murat');

  const { isLoading, isError, data, error } = useGrpcExpress(
    client.getStocks,
    testUser
  );

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

  useEffect(() => {}, []);

  return (
    <main>
      {isLoading.toString()}
      {isError.toString()}
      {data?.toString()}
      {error?.toString()}
      <ButtonGroupComponent handleClick={getStockInfo} />
      <Stack direction="row" justifyContent="space-between" mt={8} mx={8}>
        <Container sx={{ flexBasis: 1 }}>
          <Responses responses={responses} />
        </Container>
      </Stack>
    </main>
  );
}
