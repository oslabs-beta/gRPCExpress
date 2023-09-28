class DeserializerStore {
  #store: { [key: string]: (buffer: Uint8Array) => any };

  constructor() {
    this.#store = {};
  }

  addDeserializer(method: string, func: (buffer: Uint8Array) => any) {
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
