import { StocksServiceClient } from '../protos/StocksServiceClientPb';
import UnaryInterceptor from './Interceptor';
import * as grpcWeb from 'grpc-web';

interface client {
  [key: string]: any;
}

class GrpcExpress {
  constructor() {}

  getClient(
    Client: any,
    url: string,
    credentials?: null | { [index: string]: string },
    options?: { [x: string]: any }
  ) {
    class NewClient extends Client {
      constructor(
        url: string,
        credentials?: null | { [index: string]: string },
        options?: { [x: string]: any }
      ) {
        super(url, credentials, options);

        const methods = Object.getOwnPropertyNames(Client.prototype).filter(
          prop => prop != 'constructor'
        );

        for (const method of methods) {
          const newMethod = function (request: any, metadata?: any) {
            console.log('test');
            return Client.prototype[method].call(this, request, metadata);
          };
          this[method] = newMethod;
        }
      }

      // getStocks(request, metadata) {
      //   return super.getStocks.call(this, request, metadata);
      // }
    }

    return new NewClient(url, credentials, options);
  }
}

export default GrpcExpress;
