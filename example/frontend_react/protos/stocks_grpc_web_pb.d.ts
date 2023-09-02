import * as grpcWeb from 'grpc-web';

import * as stocks_pb from './stocks_pb';


export class StocksServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getStocks(
    request: stocks_pb.User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: stocks_pb.StocksList) => void
  ): grpcWeb.ClientReadableStream<stocks_pb.StocksList>;

  addStock(
    request: stocks_pb.UserStock,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: stocks_pb.StocksList) => void
  ): grpcWeb.ClientReadableStream<stocks_pb.StocksList>;

  deleteStock(
    request: stocks_pb.UserStock,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: stocks_pb.StocksList) => void
  ): grpcWeb.ClientReadableStream<stocks_pb.StocksList>;

}

export class StocksServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getStocks(
    request: stocks_pb.User,
    metadata?: grpcWeb.Metadata
  ): Promise<stocks_pb.StocksList>;

  addStock(
    request: stocks_pb.UserStock,
    metadata?: grpcWeb.Metadata
  ): Promise<stocks_pb.StocksList>;

  deleteStock(
    request: stocks_pb.UserStock,
    metadata?: grpcWeb.Metadata
  ): Promise<stocks_pb.StocksList>;

}

