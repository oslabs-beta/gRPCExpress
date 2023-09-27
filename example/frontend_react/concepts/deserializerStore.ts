class DeserializerStore {
  #store: { [key: string]: Function };

  constructor() {
    this.#store = {};
  }

  addDeserializer(method: string, func: Function) {
    this.#store[method] = func;
  }

  getDeserializer(method: string) {
    return this.#store[method];
  }

  has(method: string) {
    if (this.#store[method]) {
      return true;
    } else {
      return false;
    }
  }
}

const deserializerStore = new DeserializerStore();

export default deserializerStore;
