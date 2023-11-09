import Heap from './Heap';

export type CacheRecord = {
  buffer: Uint8Array;
  expirationDate: Date;
  initialCall: number; // date in ms
  size: number;
  calledCount: number;
  cost: number;
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

  constructor(cacheDuration: number, cacheSize: number) {
    this.#cache = this.initStore(cacheDuration, cacheSize);
    this.#heap = new Heap();
    this.loadStore = this.loadStore.bind(this);
    this.loadStore();
    this.syncStore = this.syncStore.bind(this);
    window.addEventListener('beforeunload', this.syncStore);
  }

  initStore(cacheDuration: number, cacheSize: number): Cache {
    const data = new Map<string, CacheRecord>();
    return {
      data: data,
      cacheDuration,
      capacity: cacheSize,
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

    // calculate the expected value of the disk size of the stringified buffer
    // assuming a normal distribution
    const ev =
      buffer.length * (10 / 256 + (90 / 256) * 2 + (156 / 256) * 3) +
      (buffer.length - 1) +
      2;
    // add the size of the key and datetime
    const evWithKey = ev + key.length * 2 + 2 + 48;
    // increment the currentCapacity to keep track
    this.#cache.currentCapacity += evWithKey;

    const expiration = new Date();
    const initialCall = Number(expiration);
    expiration.setTime(expiration.getTime() + cacheDuration);
    const calledCount = 1;
    // initialize the value with frequency 1
    const cost = this.calculateCost(initialCall, evWithKey, calledCount);

    this.#cache.data.set(key, {
      buffer,
      expirationDate: expiration,
      initialCall,
      size: evWithKey,
      calledCount,
      cost,
    });

    // if this record will exceed the capacity
    // delete records until there is enough space to add the record
    while (this.#cache.currentCapacity + evWithKey > this.#cache.capacity) {
      // delete returns the size of the deleted record
      this.#cache.currentCapacity -= this.#heap.delete();
    }

    this.#heap.insert(this.#cache.data.get(key)!);
  }

  unsubscribe(key: string) {
    // subtract the size from currentCapacity
    const size = this.#cache.data.get(key)?.size || 0;

    this.#cache.currentCapacity -= size;
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
    const oldCost = record.cost;
    const newCost = this.calculateCost(
      record.initialCall,
      record.size,
      record.calledCount
    );
    record.cost = newCost;

    if (oldCost > newCost) {
      this.#heap.heapifyDown();
    } else {
      this.#heap.heapifyUp();
    }

    return record.buffer;
  }

  getCurrentCapacity(): number {
    return this.#cache.currentCapacity;
  }

  syncStore() {
    // trim the currentCapacity down to 4.8MB
    const targetSize = 4.8 * 1024 * 1024;
    while (this.#cache.currentCapacity > targetSize) {
      this.#cache.currentCapacity -= this.#heap.delete();
    }

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
      // calculate the new expiration
      const difference = Number(new Date(array[2])) - Number(new Date());
      if (difference > 0) {
        this.subscribe(array[0], buffer, difference);
      }
    });
  }

  calculateCost(initialCall: number, size: number, calledCount: number) {
    calledCount += 1;
    const frequency = calledCount / (Number(new Date()) - initialCall);
    const value = (1 / size) * frequency;
    return value;
  }
}

export default CacheStore;
