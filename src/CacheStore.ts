export class CacheStore {
  #cache: {
    data: Map<string, { buffer: Uint8Array }>;
    capacity: number; // ~5MB
  };

  constructor() {
    this.#cache = this.initStore();
    this.loadStore = this.loadStore.bind(this);
    this.loadStore();
    this.syncStore = this.syncStore.bind(this);
    window.addEventListener('beforeunload', this.syncStore);
  }

  initStore(capacity: number = 2) {
    const cache = new Map();
    return {
      data: cache,
      capacity: capacity,
    };
  }

  subscribe(key: string, buffer: Uint8Array) {
    if (this.#cache.data.has(key)) {
      this.#cache.data.delete(key);
    }

    this.#cache.data.set(key, { buffer });
  }

  unsubscribe(key: string) {
    this.#cache.data.delete(key);
  }

  get(key: string) {
    const value = this.#cache.data.get(key);
    return value;
  }

  syncStore() {
    const arr: [string, string][] = [];
    // iterate through the map, push the key and buffer to an array
    this.#cache.data.forEach((v, k) => {
      arr.push([k, v.buffer.toString()]);
    });

    // stringify the array so it can be saved to local storage
    localStorage.setItem('grpcExpressStore', JSON.stringify(arr));
  }

  loadStore() {
    const data = localStorage.getItem('grpcExpressStore');

    if (!data) return;

    const json = JSON.parse(data) as [string, string][];

    json.forEach(array => {
      const buffer = new Uint8Array(array[1].split(',').map(e => Number(e)));
      this.subscribe(array[0], buffer);
    });
  }
}

const cacheStore = new CacheStore();

export default cacheStore;
