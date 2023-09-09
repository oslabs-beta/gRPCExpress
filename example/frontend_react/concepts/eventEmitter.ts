class EventEmitter {
  #store: {
    data: Map<string, any>;
    expire: any;
    capacity: number; // ~5MB
  };

  constructor() {
    this.#store = this.initStore();
    this.loadStore = this.loadStore.bind(this);
    this.loadStore();
    this.syncStore = this.syncStore.bind(this);
    window.addEventListener('beforeunload', this.syncStore);
  }

  subscribe(key: string, options: { [key: string]: any }) {
    if (this.#store.data.size % 100 === 0) {
      this.adjustCapacity();
    }

    if (
      this.#store.data.size === this.#store.capacity &&
      !this.#store.data.has(key)
    ) {
      const [[k]] = this.#store.data;
      this.#store.data.delete(k);
    } else if (this.#store.data.has(key)) {
      this.#store.data.delete(key);
    }

    this.#store.data.set(key, options);
  }

  unsubscribe(key: string) {
    delete this.#store[key];
  }

  get(key: string) {
    const value = this.#store.data.get(key);
    this.#store.data.delete(key);
    this.#store.data.set(key, value);
    return value;
  }

  getStore() {
    if (!this.#store.data) {
      return [];
    }

    const responses = this.#store.data;

    return responses;
  }

  syncStore() {
    this.adjustCapacity();
    const arr: [string, string][] = [];
    this.#store.data.forEach((v, k) => {
      arr.push([k, v.toString()]);
    });

    localStorage.setItem('grpcExpressStore', JSON.stringify(arr));
  }

  loadStore() {
    const data = localStorage.getItem('grpcExpressStore');

    if (!data) return;

    const json = JSON.parse(data);

    if (json.length) {
      json.forEach(array => {
        const buffer = new Uint8Array(array[1].split(','));
        this.subscribe(array[0], buffer);
      });
    }
  }

  initStore(capacity: number = 100) {
    const cache = new Map();
    return {
      data: cache,
      expire: null,
      capacity: capacity,
    };
  }

  adjustCapacity() {
    // calculate the size of the store
    const size = JSON.stringify(this.#store.data).length; // >= 2500000
    if (size > 2000000) {
      // calculate the size per object
      const perObjectSize = size / this.#store.data.size;
      // estimate the max capacity
      const maxCapacity = Math.floor(2500000 / perObjectSize);
      this.#store.capacity = maxCapacity;
    }
  }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;
