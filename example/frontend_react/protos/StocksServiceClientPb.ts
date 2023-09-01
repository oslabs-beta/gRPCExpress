/**
 * @fileoverview gRPC-Web generated client stub for stocks
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.20.3
// source: stocks.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as stocks_pb from './stocks_pb';


export class StocksServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGetStocks = new grpcWeb.MethodDescriptor(
    '/stocks.StocksService/GetStocks',
    grpcWeb.MethodType.UNARY,
    stocks_pb.User,
    stocks_pb.StocksList,
    (request: stocks_pb.User) => {
      return request.serializeBinary();
    },
    stocks_pb.StocksList.deserializeBinary
  );

  getStocks(
    request: stocks_pb.User,
    metadata: grpcWeb.Metadata | null): Promise<stocks_pb.StocksList>;

  getStocks(
    request: stocks_pb.User,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: stocks_pb.StocksList) => void): grpcWeb.ClientReadableStream<stocks_pb.StocksList>;

  getStocks(
    request: stocks_pb.User,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: stocks_pb.StocksList) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/stocks.StocksService/GetStocks',
        request,
        metadata || {},
        this.methodDescriptorGetStocks,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/stocks.StocksService/GetStocks',
    request,
    metadata || {},
    this.methodDescriptorGetStocks);
  }

  methodDescriptorAddStock = new grpcWeb.MethodDescriptor(
    '/stocks.StocksService/AddStock',
    grpcWeb.MethodType.UNARY,
    stocks_pb.UserStock,
    stocks_pb.StocksList,
    (request: stocks_pb.UserStock) => {
      return request.serializeBinary();
    },
    stocks_pb.StocksList.deserializeBinary
  );

  addStock(
    request: stocks_pb.UserStock,
    metadata: grpcWeb.Metadata | null): Promise<stocks_pb.StocksList>;

  addStock(
    request: stocks_pb.UserStock,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: stocks_pb.StocksList) => void): grpcWeb.ClientReadableStream<stocks_pb.StocksList>;

  addStock(
    request: stocks_pb.UserStock,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: stocks_pb.StocksList) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/stocks.StocksService/AddStock',
        request,
        metadata || {},
        this.methodDescriptorAddStock,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/stocks.StocksService/AddStock',
    request,
    metadata || {},
    this.methodDescriptorAddStock);
  }

  methodDescriptorDeleteStock = new grpcWeb.MethodDescriptor(
    '/stocks.StocksService/DeleteStock',
    grpcWeb.MethodType.UNARY,
    stocks_pb.UserStock,
    stocks_pb.StocksList,
    (request: stocks_pb.UserStock) => {
      return request.serializeBinary();
    },
    stocks_pb.StocksList.deserializeBinary
  );

  deleteStock(
    request: stocks_pb.UserStock,
    metadata: grpcWeb.Metadata | null): Promise<stocks_pb.StocksList>;

  deleteStock(
    request: stocks_pb.UserStock,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: stocks_pb.StocksList) => void): grpcWeb.ClientReadableStream<stocks_pb.StocksList>;

  deleteStock(
    request: stocks_pb.UserStock,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: stocks_pb.StocksList) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/stocks.StocksService/DeleteStock',
        request,
        metadata || {},
        this.methodDescriptorDeleteStock,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/stocks.StocksService/DeleteStock',
    request,
    metadata || {},
    this.methodDescriptorDeleteStock);
  }

}
