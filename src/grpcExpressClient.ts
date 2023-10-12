import { RpcError } from 'grpc-web';
import CacheStore from './CacheStore';
import deserializerStore from './DeserializerStore';
import PendingStore from './PendingStore';

export function grpcExpressClient<T extends { new (...args: any[]): object }>(
  constructor: T,
  cacheDuration: number = 600000 // defaults to 10 minutes
) {
  const cacheStore = new CacheStore(cacheDuration);
  const pendingStore = new PendingStore(cacheStore);

  return class extends constructor {
    cacheStore: CacheStore;
    pendingStore: PendingStore;
    constructor(...args: any[]) {
      super(...args);
      this.cacheStore = cacheStore;
      this.pendingStore = pendingStore;
      // get all functions from the service
      const methods = Object.getOwnPropertyNames(constructor.prototype).filter(
        prop => prop != 'constructor'
      );

      for (const method of methods) {
        const geMethod = async (
          request: any,
          metadata?: { [key: string]: string } & {
            cacheOptions?: {
              cache: string;
              duration: number;
            };
          },
          callback?: (err: RpcError, response: any) => void
        ): Promise<any> => {
          const { cacheOptions } = metadata || {};
          delete metadata?.cacheOptions;

          // we do not cache response when called using the callback method
          if (callback) {
            return constructor.prototype[method].call(
              this,
              request,
              metadata,
              callback
            );
          }

          // if no cache is passed, skip the caching step
          switch (cacheOptions?.cache) {
            case 'nocache':
              return await constructor.prototype[method].call(
                this,
                request,
                metadata
              );
            case 'cache':
              break;
            default:
              break;
          }

          const key = `${method}:${request.serializeBinary()}`;
          const cache = cacheStore.get(key);

          if (cache) {
            if (deserializerStore.has(method)) {
              const deserialize = deserializerStore.getDeserializer(method);

              return deserialize(cache);
            }
          }

          let response: any;

          try {
            const isPending = pendingStore.has(key);

            if (isPending) {
              return await new Promise(resolve => {
                pendingStore.addCallback(key, resolve);
              });
            }

            pendingStore.setPending(key);

            response = await constructor.prototype[method].call(
              this,
              request,
              metadata
            );

            const serialized = response.serializeBinary();
            cacheStore.subscribe(
              key,
              serialized,
              // if a duration is passed in the function call
              // override the default duration
              cacheOptions?.duration || cacheDuration
            );

            const deserializer =
              response.__proto__.constructor.deserializeBinary;
            deserializerStore.addDeserializer(method, deserializer);

            pendingStore.setDone(key, deserializer);
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
