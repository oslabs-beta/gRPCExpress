import { ChannelCredentials } from '@grpc/grpc-js';
import { StocksServiceClient } from '../protos/stocks.grpc-client';

function main() {
  const client = new StocksServiceClient(
    'localhost:3000',
    ChannelCredentials.createInsecure()
  );

  client.getStocks({ username: 'Arthur' }, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res?.stocks);
      return res;
    }
  });
}

main();
