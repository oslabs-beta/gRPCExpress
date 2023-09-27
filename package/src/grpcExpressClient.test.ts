import { beforeAll, describe, expect, it } from 'vitest';
import { StocksServiceClient } from '../../example/frontend_react/protos/StocksServiceClientPb';
import { User } from '../../example/frontend_react/protos/stocks_pb';
import cacheStore from './CacheStore';
import grpcExpressClient from './grpcExpressClient';

describe('grpcExpressClient', () => {
  let Client;
  let user: User;

  beforeAll(() => {
    Client = grpcExpressClient(StocksServiceClient);
    user = new User();
  });

  it('should create a new custom client', () => {
    const client = new Client('http://localhost:8080');
    expect(client).toHaveProperty('getStocks');
  });

  it('should be able to get stock list with existing user', async () => {
    const client = new Client('http://localhost:8080');
    user.setUsername('Murat');
    const stocks = await client.getStocks(user, {});
    expect(stocks.toObject().stocksList.length).greaterThan(0);
  });

  it('should be able to get empty stock list with non existing user ', async () => {
    const client = new Client('http://localhost:8080');
    user.setUsername('Test');
    const stocks = await client.getStocks(user, {});
    expect(stocks.toObject().stocksList.length).toEqual(0);
  });

  it('should be able to cache a response', async () => {
    const client = new Client('http://localhost:8080');
    user.setUsername('Murat');
    const stocks = await client.getStocks(user, {});
    const key = `getStocks:${user.serializeBinary()}`;
    const cachedBuffer = cacheStore.get(key)?.buffer;
    expect(cachedBuffer).toEqual(stocks.serializeBinary());
  });

  it('should be able to return a cached response', async () => {
    const client = new Client('http://localhost:8080');
    user.setUsername('Murat');
    await client.getStocks(user, {});
    const start = new Date();
    await client.getStocks(user, {});
    const end = new Date();
    expect(Number(end) - Number(start)).lessThan(1000);
  });

  // it('should work with the callback method', () => {
  //   user.setUsername('Murat');
  //   client.getStocks(user, {}, (err: RpcError, res: any) => {
  //     if (err) {
  //       return console.log(err);
  //     }

  //     expect(res.toObject().stocksList.length).greaterThan(0);
  //   });
  // });
});
