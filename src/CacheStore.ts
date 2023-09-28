export class CacheStore {
  #cache: {
    data: Map<
      string,
      {
        buffer: Uint8Array;
        expirationDate: Date;
      }
    >;
    cacheDuration: number;
  };

  constructor(cacheDuration: number) {
    this.#cache = this.initStore(cacheDuration);
    this.loadStore = this.loadStore.bind(this);
    this.loadStore();
    this.syncStore = this.syncStore.bind(this);
    window.addEventListener('beforeunload', this.syncStore);
  }

  initStore(cacheDuration: number) {
    const cache = new Map();
    return {
      data: cache,
      cacheDuration,
    };
  }

  subscribe(
    key: string,
    buffer: Uint8Array,
    cacheDuration: number = this.#cache.cacheDuration
  ) {
    if (this.#cache.data.has(key)) {
      this.#cache.data.delete(key);
    }

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + cacheDuration);

    this.#cache.data.set(key, {
      buffer,
      expirationDate: expiration,
    });
  }

  unsubscribe(key: string) {
    this.#cache.data.delete(key);
  }

  get(key: string) {
    const value = this.#cache.data.get(key);
    // if the key doesn't exist return
    if (!value) return;
    // if the cache has expired, delete it and return
    if (new Date() > value.expirationDate) {
      this.unsubscribe(key);
      return;
    }
    return value.buffer;
  }

  syncStore() {
    const arr: [string, string, string][] = [];
    // iterate through the map, push the key and buffer to an array
    this.#cache.data.forEach((v, k) => {
      arr.push([k, v.buffer.toString(), v.expirationDate.toISOString()]);
    });

    // stringify the array so it can be saved to local storage
    localStorage.setItem('grpcExpressStore', JSON.stringify(arr));
  }

  loadStore() {
    const data = localStorage.getItem('grpcExpressStore');

    if (!data) return;

    const json = JSON.parse(data) as [string, string, string][];

    json.forEach(array => {
      const buffer = new Uint8Array(array[1].split(',').map(e => Number(e)));
      const difference = Number(new Date(array[2])) - Number(new Date());
      if (difference > 0) {
        this.subscribe(array[0], buffer, difference);
      }
    });
  }
}

export default CacheStore;
