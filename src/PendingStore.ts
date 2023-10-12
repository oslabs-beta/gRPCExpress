import CacheStore from './CacheStore';

type item = {
  isPending: boolean;
  callbacks: any[];
};

class PendingStore {
  #store: { [key: string]: item };
  #cacheStore: CacheStore;

  constructor(cacheStore: CacheStore) {
    this.#store = {};
    this.#cacheStore = cacheStore;
  }

  setPending(key: string) {
    this.#store[key] = {
      isPending: true,
      callbacks: [],
    };
  }

  setDone(key: string, deserializer: (buffer: Uint8Array) => unknown) {
    // console.log('set done', key);
    for (const resolve of this.#store[key].callbacks) {
      const cache = this.#cacheStore.get(key);

      if (!cache) resolve(undefined);

      resolve(deserializer(cache!));
    }
    delete this.#store[key];
  }

  has(key: string) {
    if (this.#store[key]) {
      return true;
    } else {
      return false;
    }
  }

  addCallback(key: string, callback: any) {
    this.#store[key].callbacks.push(callback);
  }
}

export default PendingStore;
