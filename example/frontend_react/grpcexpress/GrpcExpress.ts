import eventEmitter from '../concepts/eventEmitter';
import UnaryInterceptor from './Interceptor';

import { RpcError } from 'grpc-web';

class GrpcExpress {
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
          const newMethod = async function (request: any, metadata?: any) {
            const key = `${method}:${JSON.stringify(request)}`;

            let response;

            try {
              const newMetadata = metadata || {};
              newMetadata['storeKey'] = key;
              response = await Client.prototype[method].call(
                this,
                request,
                newMetadata
              );
            } catch (e: unknown) {
              const err = e as RpcError;
              if (err.message === 'Returning cache') {
                return eventEmitter.get(key);
              } else {
                return err;
              }
            }

            return response;
          };
          this[method] = newMethod;
        }
      }
    }

    const interceptor = new UnaryInterceptor();
    const newOptions = options || {};
    if (options?.['unaryInterceptors']) {
      newOptions['unaryInterceptors'].push(interceptor);
    } else {
      newOptions['unaryInterceptors'] = [interceptor];
    }

    return new NewClient(url, credentials, newOptions);
  }
}

export default GrpcExpress;
