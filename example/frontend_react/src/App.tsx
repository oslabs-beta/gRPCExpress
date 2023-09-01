import React, { useEffect } from 'react';

import { StatusCode, RpcError } from 'grpc-web';

import { StocksServiceClient } from '../protos/StocksServiceClientPb';
import { StocksServicePromiseClient } from '../protos/stocks_grpc_web_pb';
import { User } from '../protos/stocks_pb';

// import GrpcExpress from '../grpcexpress/GrpcExpress';

// const grpcExpress = new GrpcExpress();
// grpcExpress.add(StocksServiceClient, 'localhost:8080', {}, {});

// export default function App() {
//   const user = new User();
//   user.setUsername('Arthur');

//   console.log(grpcExpress.clients.stocksClient.getStocks(user));

//   return <div>A</div>;
// }

const client = new StocksServiceClient('localhost:8080', null);

export default function App() {
  const user = new User();
  user.setUsername('Arthur');
  client.getStocks(user, {}, (err, res) => {
    console.log(err);
    console.log(res);
  });

  return <div></div>;
}
