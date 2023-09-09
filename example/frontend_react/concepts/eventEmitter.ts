class EventEmitter {
  #store: {
    data: Map<string, any>;
    capacity: number; // ~5MB
  };

  constructor() {
    this.#store = this.loadStore() || this.initStore();
    this.syncStore = this.syncStore.bind(this);
    window.addEventListener('beforeunload', this.syncStore);
  }
  
  // method taking in key and session time
  timer(key: string, sessionMaxTime: number) {
    // give key an expire property that is the setTimeout to delete cache with key key
    this.#store.data.get(key)['expire'] = setTimeout(() =>
      { 
          this.unsubscribe(key);
      }, sessionMaxTime * 1000,
      sessionMaxTime, key);
  }

  subscribe(key: string, options: { [key: string]: any }, sessionMaxTime: number) {
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

    // caching timer
    this.timer(key, sessionMaxTime);
  }

  unsubscribe(key: string) {
    if (this.#store.data.get(key)['expire']) {
      clearTimeout(this.#store.data.get(key)['expire']);
    }
    this.#store.data.delete(key);
  }

  get(key: string) {
    const value = this.#store.data.get(key);
    this.#store.data.delete(key);
    this.#store.data.set(key, value);
    return value;
  }

  getStore() {
    console.log(this.#store.data);
    if (!this.#store.data) {
      return [];
    }

    const responses = Object.values(this.#store.data);
    return responses;
  }

  syncStore() {
    this.adjustCapacity();
    const mapArray = Array.from(this.#store.data.entries());
    localStorage.setItem('grpcExpressStore', JSON.stringify(mapArray));
  }

  loadStore() {
    const data = localStorage.getItem('grpcExpressStore');

    if (data) {
      return {
        data: new Map(JSON.parse(data)),
        capacity: 100,
      };
    }
  }

  initStore(capacity: number = 100) {
    const cache = new Map();
    return {
      data: cache,
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
