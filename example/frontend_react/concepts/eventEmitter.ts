class EventEmitter {
  #store: { [key: string]: any };

  constructor() {
    this.#store = {};
  }
  
  // method taking in key and session time
  timer(key: string, sessionMaxTime: number) {
    // give key an expire property that is the setTimeout to delete cache with key key
    this.#store[key]['expire'] = setTimeout(() =>
      { 
          this.unsubscribe(key);
      }, sessionMaxTime * 1000,
      sessionMaxTime, key);
  }

  subscribe(key: string, options: { [key: string]: any }, sessionMaxTime: number) {
    this.#store[key] = options;
    // caching will create a timer
    this.timer(key, sessionMaxTime);
  }

  unsubscribe(key: string) {
    if (this.#store[key]['expire']) {
      clearTimeout(this.#store[key]['expire']);
    }
    delete this.#store[key];
  }

  get(key: string) {
    return this.#store[key];
  }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;
