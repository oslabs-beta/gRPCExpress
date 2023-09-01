import React, { useEffect } from 'react';

import { Stock, User } from '../protos/stocks_pb';

import { useGrpcExpress, useSetCache } from '../contexts/context';
import { StocksServiceClient } from '../protos/StocksServiceClientPb';

import GrpcExpress from '../grpcexpress/GrpcExpress';

const grpcExpress = new GrpcExpress();
const client = grpcExpress.getClient(
  StocksServiceClient,
  'http://localhost:8080'
) as StocksServiceClient;

export default function App() {
  // const client = useGrpcExpress();
  // const stocks = client.add(
  //   StocksServiceClient,
  //   'http://localhost:8080'
  // ) as StocksServiceClient;
  const user = new User();
  user.setUsername('Arthur');
  // const grpcExpress = useGrpcExpress();
  // const setCache = useSetCache();

  // console.log(grpcExpress.clients.stocksClient.newGetStocks(user));

  useEffect(() => {
    (async () => {
      console.log(
        // await grpcExpress.clients.StocksServiceClient.getStocks(user)
        await client.getStocks(user, {})
      );
      // await stocks.getStocks(user, {})
      // console.log(await grpcExpress.call(user));
    })();
  }, []);

  return <div>A</div>;
}

// const client = new StocksServiceClient('http://localhost:8080', null);

// export default function App() {
//   const user = new User();
//   user.setUsername('Arthur');
//   client.getStocks(user, {}, (err, res) => {
//     console.log(err);
//     console.log(res);
//   });

//   return <div></div>;
// }
