class EventEmitter {
  #store: { [key: string]: any };

  constructor() {
    this.#store = {};
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
}

const eventEmitter = new EventEmitter();

export default eventEmitter;
