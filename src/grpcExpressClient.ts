import { RpcError } from 'grpc-web';
import CacheStore from './CacheStore';
import deserializerStore from './DeserializerStore';
import PendingStore from './PendingStore';

type MethodNames<T> = {
  // eslint-disable-next-line
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

export function grpcExpressClient<T extends { new (...args: any[]): object }>(
  constructor: T,
  cacheDuration: number = 600000, // defaults to 10 minutes
  cacheSize: number = 100 * 1024 * 1024 // default to 100MB in memory cache
) {
  return class extends constructor {
    cacheStore: CacheStore;
    pendingStore: PendingStore;
    constructor(...args: any[]) {
      super(...args);
      this.cacheStore = new CacheStore(cacheDuration, cacheSize);
      this.pendingStore = new PendingStore(this.cacheStore);
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
          const cache = this.cacheStore.get(key);

          if (cache) {
            if (deserializerStore.has(method)) {
              const deserialize = deserializerStore.getDeserializer(method);

              return deserialize(cache);
            }
          }

          let response: any;

          try {
            const isPending = this.pendingStore.has(key);

            if (isPending) {
              return await new Promise(resolve => {
                this.pendingStore.addCallback(key, resolve);
              });
            }

            this.pendingStore.setPending(key);

            response = await constructor.prototype[method].call(
              this,
              request,
              metadata
            );

            const serialized = response.serializeBinary();
            this.cacheStore.subscribe(
              key,
              serialized,
              // if a duration is passed in the function call
              // override the default duration
              cacheOptions?.duration || cacheDuration
            );

            const deserializer =
              response.__proto__.constructor.deserializeBinary;
            deserializerStore.addDeserializer(method, deserializer);

            this.pendingStore.setDone(key, deserializer);
          } catch (e: any) {
            response = e as RpcError;
          }

          return response;
        };

        this[method] = geMethod;
      }
    }
    invalidate(method: MethodNames<InstanceType<T>>, msg: any) {
      const key = `${String(method)}:${msg.serializeBinary()}`;
      this.cacheStore.unsubscribe(key);
    }
  };
}

export default grpcExpressClient;
