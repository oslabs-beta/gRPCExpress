class EventEmitter {
  #store: {
    data: Map<string, any>;
    expire: any;
    capacity: number; // ~5MB
  };

  constructor() {
    this.#store = this.loadStore() || this.initStore();
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

  syncStore() {
    this.adjustCapacity();
    localStorage.setItem('grpcExpressStore', JSON.stringify(this.#store));
  }

  loadStore() {
    const store = localStorage.getItem('grpcExpressStore');
    if (store) {
      return JSON.parse(store);
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
