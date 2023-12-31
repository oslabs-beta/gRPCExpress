import { beforeAll, describe, expect, it } from "vitest";
import { StocksServiceClient } from "../example/frontend_react/protos/StocksServiceClientPb";
import { User } from "../example/frontend_react/protos/stocks_pb";
import grpcExpressClient from "./grpcExpressClient";

describe("grpcExpressClient", () => {
  let Client;
  let user: User;

  beforeAll(() => {
    Client = grpcExpressClient(StocksServiceClient, 30000);
    user = new User();
  });

  it("should create a new custom client", () => {
    const client = new Client("http://localhost:8080");
    expect(client).toHaveProperty("getStocks");
  });

  it("should be able to get stock list with existing user", async () => {
    const client = new Client("http://localhost:8080");
    user.setUsername("Murat");
    const stocks = await client.getStocks(user, {
      cacheOptions: {
        cache: "cache",
        duration: 10000,
      },
    });
    expect(stocks.toObject().stocksList.length).greaterThan(0);
  });

  it("should be able to get empty stock list with non existing user ", async () => {
    const client = new Client("http://localhost:8080");
    user.setUsername("Test");
    const stocks = await client.getStocks(user, {});
    expect(stocks.toObject().stocksList.length).toEqual(0);
  });

  it("should be able to return a cached response", async () => {
    const client = new Client("http://localhost:8080");
    user.setUsername("Arthur");
    await client.getStocks(user, {});
    const start = new Date();
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    await client.getStocks(user, {});
    const end = new Date();
    expect(Number(end) - Number(start)).lessThan(3000);
  });

  it("should be able to pass no cache option", async () => {
    const client = new Client("http://localhost:8080");
    user.setUsername("Shiyu");
    await client.getStocks(user, {
      cacheOptions: {
        cache: "nocache",
      },
    });
    const start = new Date();
    await client.getStocks(user, {});
    const end = new Date();
    expect(Number(end) - Number(start)).greaterThan(2000);
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
  it("should be able to invalidate cached response", async () => {
    const Client = grpcExpressClient(StocksServiceClient, 30000);
    const client = new Client("http://localhost:8080");
    user.setUsername("Arthur");
    await client.getStocks(user, {});
    client.invalidate('getStocks', user);
    const start = new Date();
    await client.getStocks(user, {});
    const end = new Date();
    expect(Number(end) - Number(start)).greaterThan(2000);
  });
});
