import { beforeAll, describe, expect, it } from 'vitest';
import { StocksServiceClient } from '../../example/frontend_react/protos/StocksServiceClientPb';
import { User } from '../../example/frontend_react/protos/stocks_pb';
import grpcExpressClient from './grpcExpressClient';

describe('grpcExpressClient', () => {
  let Client: ReturnType<typeof grpcExpressClient>;
  let client;
  let user: User;

  beforeAll(() => {
    Client = grpcExpressClient(StocksServiceClient);
    client = new Client('http://localhost:8080');
    user = new User();
  });

  it('should create a new custom client', () => {
    expect(client).toHaveProperty('getStocks');
  });

  it('should be able to get stock list with existing user', async () => {
    user.setUsername('Murat');
    const stocks = await client.getStocks(user, {});
    expect(stocks.toObject().stocksList.length).greaterThan(0);
  });

  it('should be able to get empty stock list with non existing user ', async () => {
    user.setUsername('Test');
    const stocks = await client.getStocks(user, {});
    expect(stocks.toObject().stocksList.length).toEqual(0);
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
