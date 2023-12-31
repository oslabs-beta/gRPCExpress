import { describe, expect, it } from 'vitest';

import CacheStore from './CacheStore';
import PendingStore from './PendingStore';

describe('PendingStore', () => {
  const cacheStore = new CacheStore(600000);
  const pendingStore = new PendingStore(cacheStore);
  it('should be able to set a function call as pending', () => {
    pendingStore.setPending('test');
    expect(pendingStore.has('test')).toEqual(true);
  });
  it('should be able to set a function call as done', () => {
    pendingStore.setPending('test');
    pendingStore.setDone('test');
    expect(pendingStore.has('test')).toEqual(false);
  });
  it('should be able to add a callback to an existing key', async () => {
    pendingStore.setPending('test');
    new Promise(resolve => {
      pendingStore.addCallback('test', resolve);
    });
    expect(pendingStore.has('test')).toEqual(true);
  });
});
