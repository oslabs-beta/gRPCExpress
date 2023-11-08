import { beforeEach, describe, expect, it } from 'vitest';

import Heap from './heap';

import { CacheRecord } from './CacheStore';

describe('Heap data structure', () => {
  const record1: CacheRecord = {
    buffer: new Uint8Array([1]),
    expirationDate: new Date(2023, 8, 30, 12, 0),
    initialCall: Number(new Date(2023, 8, 30, 12, 0)),
    size: 10,
    calledCount: 2,
    cost: 3,
  };

  const record2: CacheRecord = {
    buffer: new Uint8Array([1]),
    expirationDate: new Date(2023, 8, 30, 12, 0),
    initialCall: Number(new Date(2023, 8, 30, 12, 0)),
    size: 11,
    calledCount: 2,
    cost: 10,
  };

  const record3: CacheRecord = {
    buffer: new Uint8Array([1]),
    expirationDate: new Date(2023, 8, 30, 12, 0),
    initialCall: Number(new Date(2023, 8, 30, 12, 0)),
    size: 12,
    calledCount: 2,
    cost: 1,
  };

  let heap: Heap;

  beforeEach(() => {
    heap = new Heap();
  });

  it('should be able to insert a record', () => {
    heap.insert(record1);
    expect(heap.peak()).toEqual(record1);
  });

  it('should be able to insert a second record with a higher cost', () => {
    heap.insert(record1);
    heap.insert(record2);
    expect(heap.peak()).toEqual(record2);
  });

  it('should be able to insert a second record with a lower cost', () => {
    heap.insert(record1);
    heap.insert(record3);
    expect(heap.peak()).toEqual(record1);
  });

  it('should return the size of the deleted node', () => {
    heap.insert(record1);
    const val = heap.delete();
    expect(val).toEqual(10);
    expect(heap.peak()).toBeUndefined();
  });

  it('should maintain the heap property after deleting the root', () => {
    heap.insert(record1);
    heap.insert(record2);
    heap.insert(record3);
    heap.delete();
    expect(heap.peak()).toEqual(record1);
  });
});
