class EventEmitter {
  #store: { [key: string]: any };

  constructor() {
    this.#store = this.loadStore() || {};
    this.syncStore = this.syncStore.bind(this);
    window.addEventListener('beforeunload', this.syncStore);
  }

  subscribe(key: string, options: { [key: string]: any }) {
    this.#store[key] = options;
  }

  unsubscribe(key: string) {
    delete this.#store[key];
  }

  get(key: string) {
    return this.#store[key];
  }

  syncStore() {
    localStorage.setItem('grpcExpressStore', JSON.stringify(this.#store));
  }

  loadStore() {
    const store = localStorage.getItem('grpcExpressStore');
    if (store) {
      return JSON.parse(store);
    }
  }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;
