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

  setDone(key: string) {
    for (const resolve of this.#store[key].callbacks) {
      resolve(this.#cacheStore.get(key));
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
