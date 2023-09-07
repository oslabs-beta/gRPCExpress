import eventEmitter from '../concepts/eventEmitter';

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
          const newMethod = async function (request: any, metadata: any = {}) {
            const key = `${method}:${JSON.stringify(request)}`;

            const cacheOption = metadata.cache;

            switch (cacheOption) {
              case 'invalidate':
                return eventEmitter.unsubscribe(key);
              default:
                break;
            }

            const cache = eventEmitter.get(key);

            if (cache) {
              return cache;
            }

            try {
              const response = await Client.prototype[method].call(
                this,
                request,
                metadata
              );
              eventEmitter.subscribe(key, response);
              return response;
            } catch (e: unknown) {
              return e;
            }
          };
          this[method] = newMethod;
        }
      }
    }

    return new NewClient(url, credentials, options);
  }
}

export default GrpcExpress;
