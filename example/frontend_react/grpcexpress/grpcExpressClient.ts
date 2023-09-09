import eventEmitter from '../concepts/eventEmitter';
import pendingStore from '../concepts/pendingStore';
import deserializerStore from '../concepts/deserializerStore';

export function grpcExpressClient<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    cacheOption: string;

    constructor(...args: any[]) {
      super(...args);

      const methods = Object.getOwnPropertyNames(constructor.prototype).filter(
        prop => prop != 'constructor'
      );

      for (let method of methods) {
        const Method = async function (request: any, metadata: any = {}) {
          const key = `${method}:${request.serializeBinary()}`;
          const cache = eventEmitter.get(key);

          if (cache) {
            if (deserializerStore.has(method)) {
              const deserialize = deserializerStore.getDeserializer(method);

              return deserialize(cache);
            }
          }

          try {
            if (pendingStore.has(key)) {
              return await new Promise(resolve => {
                pendingStore.addCallback(key, resolve);
              });
            }

            pendingStore.setPending(key);
            const response = await constructor.prototype[method].call(
              this,
              request,
              metadata
            );
            const serialized = response.serializeBinary();

            const deserializer =
              response.__proto__.constructor.deserializeBinary;

            deserializerStore.addDeserializer(method, deserializer);
            eventEmitter.subscribe(key, serialized);
            pendingStore.setDone(key);

            return response;
          } catch (e: unknown) {
            pendingStore.setDone(key);
            return e;
          }
        };
        this[method] = Method;
      }
    }
  };
}

export default grpcExpressClient;
