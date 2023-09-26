import { beforeAll, describe, expect, it } from 'vitest';

import { CacheStore } from './CacheStore';

describe('CacheStore', () => {
  let cacheStore: CacheStore;
  beforeAll(() => {
    cacheStore = new CacheStore();
  });

  it('should create a cache store', () => {
    expect(cacheStore).not.toBe(undefined);
  });

  it('should be able to subscribe with a string', () => {
    const buffer = new Uint8Array([1]);
    cacheStore.subscribe('testKey', buffer);
    const value = cacheStore.get('testKey');
    expect(value).toEqual({ buffer: buffer });
  });

  it('should be able to unsubscribe', () => {
    const buffer = new Uint8Array([1]);
    cacheStore.subscribe('testKey', buffer);
    cacheStore.unsubscribe('testKey');
    const value = cacheStore.get('testKey');
    expect(value).toBe(undefined);
  });
});
