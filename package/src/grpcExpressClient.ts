import { RpcError } from 'grpc-web';

export function grpcExpressClient<T extends { new (...args: any[]): object }>(
  constructor: T
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);

      // get all functions from the service
      const methods = Object.getOwnPropertyNames(constructor.prototype).filter(
        prop => prop != 'constructor'
      );

      for (const method of methods) {
        const geMethod = async (
          request: any,
          metadata?: { [key: string]: string },
          callback?: (err: RpcError, response: any) => void
        ): Promise<any> => {
          // we do not cache response when called using the callback method
          if (callback) {
            return constructor.prototype[method].call(
              this,
              request,
              metadata,
              callback
            );
          }

          let response: any;

          try {
            response = await constructor.prototype[method].call(
              this,
              request,
              metadata
            );

            return response;
          } catch (e: any) {
            response = e as RpcError;
          }

          return response;
        };

        this[method] = geMethod;
      }
    }
  };
}

export default grpcExpressClient;
