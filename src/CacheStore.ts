import Heap from './heap';

export type CacheRecord = {
  buffer: Uint8Array;
  expirationDate: Date;
  initialCall: number; // date in ms
  cost: number;
  calledCount: number;
  value: number;
};

type Cache = {
  data: Map<string, CacheRecord>;
  cacheDuration: number;
  capacity: number;
  currentCapacity: number;
};

export class CacheStore {
  #cache: Cache;
  #heap: Heap;

  constructor(cacheDuration: number) {
    this.#cache = this.initStore(cacheDuration);
    this.#heap = new Heap();
    this.loadStore = this.loadStore.bind(this);
    this.loadStore();
    this.syncStore = this.syncStore.bind(this);
    window.addEventListener('beforeunload', this.syncStore);
  }

  initStore(cacheDuration: number): Cache {
    const data = new Map<string, CacheRecord>();
    return {
      data: data,
      cacheDuration,
      capacity: 4 * 10 ** 7, // 5MB in bits
      currentCapacity: 0,
    };
  }

  subscribe(
    key: string,
    buffer: Uint8Array,
    cacheDuration: number = this.#cache.cacheDuration
  ) {
    if (this.#cache.data.has(key)) {
      this.#cache.data.delete(key);
    }

    const cost = buffer.length * 8 + key.length * 8;

    const expiration = new Date();
    const initialCall = Number(expiration);
    expiration.setTime(expiration.getTime() + cacheDuration);
    const calledCount = 1;
    const value = this.calculateValue(initialCall, cost, calledCount);

    this.#cache.data.set(key, {
      buffer,
      expirationDate: expiration,
      initialCall,
      cost,
      calledCount,
      value,
    });

    // if this record will exceed the capacity, delete records until there is enough space to add the record
    while (this.#cache.currentCapacity + cost > this.#cache.capacity) {
      this.#cache.currentCapacity -= this.#heap.delete();
    }

    this.#heap.insert(this.#cache.data.get(key)!);
  }

  unsubscribe(key: string) {
    this.#cache.data.delete(key);
  }

  get(key: string) {
    const record = this.#cache.data.get(key);
    // if the key doesn't exist return
    if (!record) return;
    // if the cache has expired, delete it and return
    if (new Date() > record.expirationDate) {
      this.unsubscribe(key);
      return;
    }
    // update the calledCount and heap
    record.calledCount += 1;
    const oldValue = record.value;
    const newValue = this.calculateValue(
      record.initialCall,
      record.cost,
      record.calledCount
    );
    record.value = newValue;

    if (oldValue > newValue) {
      this.#heap.heapifyDown();
    } else {
      this.#heap.heapifyUp();
    }

    return record.buffer;
  }

  syncStore() {
    const arr: [string, string, string][] = [];
    // iterate through the map, push the key and buffer to an array
    this.#cache.data.forEach((v, k) => {
      arr.push([k, v.buffer.toString(), v.expirationDate.toISOString()]);
    });

    // stringify the array so it can be saved to local storage
    localStorage.setItem('grpcExpressStore', JSON.stringify(arr));
  }

  loadStore() {
    const data = localStorage.getItem('grpcExpressStore');

    if (!data) return;

    const json = JSON.parse(data) as [string, string, string][];

    json.forEach(array => {
      const buffer = new Uint8Array(array[1].split(',').map(e => Number(e)));
      const difference = Number(new Date(array[2])) - Number(new Date());
      if (difference > 0) {
        this.subscribe(array[0], buffer, difference);
      }
    });
  }

  calculateValue(initialCall: number, cost: number, calledCount: number) {
    calledCount += 1;
    const frequency = calledCount / (Number(new Date()) - initialCall);
    const value = cost * frequency;
    return value;
  }
}

export default CacheStore;
