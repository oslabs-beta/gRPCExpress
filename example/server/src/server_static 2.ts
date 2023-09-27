import { Server, ServerCredentials } from '@grpc/grpc-js';

import {
  IStocksService,
  stocksServiceDefinition,
} from '../protos/stocks.grpc-server';

import db from './database/database';

function main() {
  const stocksService: IStocksService = {
    async getStocks(call, callback) {
      const stocksList = await db.query(call.request);
      console.log(stocksList);
      callback(null, stocksList);
    },
    addStock() {},
    deleteStock() {},
  };

  const server = new Server();
  server.addService(stocksServiceDefinition, stocksService);
  server.bindAsync(
    'localhost:3000',
    ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Server is running on port ${port}`);
        server.start();
      }
    }
  );
}

main();
