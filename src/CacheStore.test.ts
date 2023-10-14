import { beforeAll, describe, expect, it } from 'vitest';

import { CacheStore } from './CacheStore';
// export type CacheRecord = {
//   buffer: Uint8Array;
//   expirationDate: Date;
//   initialCall: number; // date in ms
//   cost: number;
//   calledCount: number;
//   value: number;
// };
describe('CacheStore', () => {
  // const window: Record<string, any> = {
  //   store: {},
  // };
  global.localStorage.store = {};

  global.localStorage.setItem = function (key: string, value: string) {
    this.store[key] = value;
  };

  global.localStorage.getItem = function (key: string) {
    return this.store[key];
  };

  globalThis.window = window;

  let cacheStore: CacheStore;
  beforeAll(() => {
    cacheStore = new CacheStore(600000);
  });

  it('should create a cache store', () => {
    expect(cacheStore).not.toBe(undefined);
  });

  it('should be able to subscribe with a string', () => {
    const buffer = new Uint8Array([1]);
    cacheStore.subscribe('testKey', buffer);
    const value = cacheStore.get('testKey');
    expect(value).toEqual(buffer);
  });

  it('should be able to unsubscribe', () => {
    const buffer = new Uint8Array([1]);
    cacheStore.subscribe('testKey', buffer);
    cacheStore.unsubscribe('testKey');
    const value = cacheStore.get('testKey');
    expect(value).toBe(undefined);
  });

  it('should sync the store to local storage', () => {
    // const map = new Map<string, CacheRecord>();
    // const cache1: CacheRecord = {
    //   buffer: new Uint8Array([1]),
    //   expirationDate: new Date('2023-11-01'),
    //   initialCall: Number(new Date()),
    //   cost: 10,
    //   calledCount: 10,
    //   value: 10,
    // };
    // map.set('cache1', cache1);
    const buffer = new Uint8Array([1]);
    cacheStore.subscribe('testKey', buffer);
    cacheStore.syncStore();

    console.log(localStorage.getItem('grpcExpressStore'));
  });
});
