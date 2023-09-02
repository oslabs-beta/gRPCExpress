import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { StocksServiceClient } from '../../protos/stocks.client';

const client = new StocksServiceClient(
  new GrpcWebFetchTransport({
    baseUrl: 'http://localhost:8080',
  })
);

export default client;
