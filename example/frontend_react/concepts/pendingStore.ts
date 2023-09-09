import eventEmitter from './eventEmitter';

type item = {
  isPending: boolean;
  callbacks: any[];
};

class PendingStore {
  #store: { [key: string]: item };

  constructor() {
    this.#store = {};
  }

  setPending(key: string) {
    this.#store[key] = {
      isPending: true,
      callbacks: [],
    };
  }

  setDone(key: string) {
    for (const resolve of this.#store[key].callbacks) {
      resolve(eventEmitter.get(key));
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

const pendingStore = new PendingStore();

export default pendingStore;
