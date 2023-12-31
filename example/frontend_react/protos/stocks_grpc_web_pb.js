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



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.stocks = require('./stocks_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.stocks.StocksServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.stocks.StocksServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.stocks.User,
 *   !proto.stocks.StocksList>}
 */
const methodDescriptor_StocksService_GetStocks = new grpc.web.MethodDescriptor(
  '/stocks.StocksService/GetStocks',
  grpc.web.MethodType.UNARY,
  proto.stocks.User,
  proto.stocks.StocksList,
  /**
   * @param {!proto.stocks.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.stocks.StocksList.deserializeBinary
);


/**
 * @param {!proto.stocks.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.stocks.StocksList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stocks.StocksList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stocks.StocksServiceClient.prototype.getStocks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stocks.StocksService/GetStocks',
      request,
      metadata || {},
      methodDescriptor_StocksService_GetStocks,
      callback);
};


/**
 * @param {!proto.stocks.User} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stocks.StocksList>}
 *     Promise that resolves to the response
 */
proto.stocks.StocksServicePromiseClient.prototype.getStocks =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/stocks.StocksService/GetStocks',
      request,
      metadata || {},
      methodDescriptor_StocksService_GetStocks);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.stocks.UserStock,
 *   !proto.stocks.StocksList>}
 */
const methodDescriptor_StocksService_AddStock = new grpc.web.MethodDescriptor(
  '/stocks.StocksService/AddStock',
  grpc.web.MethodType.UNARY,
  proto.stocks.UserStock,
  proto.stocks.StocksList,
  /**
   * @param {!proto.stocks.UserStock} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.stocks.StocksList.deserializeBinary
);


/**
 * @param {!proto.stocks.UserStock} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.stocks.StocksList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stocks.StocksList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stocks.StocksServiceClient.prototype.addStock =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stocks.StocksService/AddStock',
      request,
      metadata || {},
      methodDescriptor_StocksService_AddStock,
      callback);
};


/**
 * @param {!proto.stocks.UserStock} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stocks.StocksList>}
 *     Promise that resolves to the response
 */
proto.stocks.StocksServicePromiseClient.prototype.addStock =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/stocks.StocksService/AddStock',
      request,
      metadata || {},
      methodDescriptor_StocksService_AddStock);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.stocks.UserStock,
 *   !proto.stocks.StocksList>}
 */
const methodDescriptor_StocksService_DeleteStock = new grpc.web.MethodDescriptor(
  '/stocks.StocksService/DeleteStock',
  grpc.web.MethodType.UNARY,
  proto.stocks.UserStock,
  proto.stocks.StocksList,
  /**
   * @param {!proto.stocks.UserStock} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.stocks.StocksList.deserializeBinary
);


/**
 * @param {!proto.stocks.UserStock} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.stocks.StocksList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.stocks.StocksList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.stocks.StocksServiceClient.prototype.deleteStock =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/stocks.StocksService/DeleteStock',
      request,
      metadata || {},
      methodDescriptor_StocksService_DeleteStock,
      callback);
};


/**
 * @param {!proto.stocks.UserStock} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.stocks.StocksList>}
 *     Promise that resolves to the response
 */
proto.stocks.StocksServicePromiseClient.prototype.deleteStock =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/stocks.StocksService/DeleteStock',
      request,
      metadata || {},
      methodDescriptor_StocksService_DeleteStock);
};


module.exports = proto.stocks;

