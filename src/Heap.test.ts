import { describe, expect, it } from 'vitest';

import Heap from './heap';

import { CacheRecord } from './CacheStore';

describe('Heap data structure', () => {
  const record: CacheRecord = {
    buffer: new Uint8Array([1]),
    expirationDate: new Date(2023, 8, 30, 12, 0),
    initialCall: Number(new Date(2023, 8, 30, 12, 0)),
    cost: 10,
    calledCount: 2,
    value: 3,
  };

  const record2: CacheRecord = {
    buffer: new Uint8Array([1]),
    expirationDate: new Date(2023, 8, 30, 12, 0),
    initialCall: Number(new Date(2023, 8, 30, 12, 0)),
    cost: 10,
    calledCount: 2,
    value: 10,
  };

  const record3: CacheRecord = {
    buffer: new Uint8Array([1]),
    expirationDate: new Date(2023, 8, 30, 12, 0),
    initialCall: Number(new Date(2023, 8, 30, 12, 0)),
    cost: 10,
    calledCount: 2,
    value: 1,
  };

  it('should be able to insert a record', () => {
    const heap = new Heap();
    heap.insert(record);
    expect(heap.peak()).toEqual(record);
  });

  it('should be able to insert a second record with a higher value', () => {
    const heap = new Heap();
    heap.insert(record);
    heap.insert(record2);
    expect(heap.peak()).toEqual(record);
  });

  it('should be able to insert a second record with a lower value', () => {
    const heap = new Heap();
    heap.insert(record);
    heap.insert(record3);
    expect(heap.peak()).toEqual(record3);
  });

  it('should be able to delete the top record when there is only 1 record', () => {
    const heap = new Heap();
    heap.insert(record);
    const val = heap.delete();
    expect(val).toEqual(3);
  });

  it('should be able to delete the top record when there are 2 records', () => {
    const heap = new Heap();
    heap.insert(record);
    heap.insert(record3);
    const val = heap.delete();
    expect(val).toEqual(1);
  });
});
