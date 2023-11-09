import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CacheStore } from "./CacheStore";

// Mocking the global localStorage
const mockLocalStorage = {
  setItem: vi.fn(),
  getItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

global.localStorage = mockLocalStorage as any;

describe("CacheStore", () => {
  // const window: Record<string, any> = {
  //   store: {},
  // };

  let cacheStore: CacheStore;
  const key = "testKey";
  const buffer = new Uint8Array([1, 2, 3]);
  const mockCacheDuration = 10000; // 10 seconds
  const mockCacheSize = 5 * 1024 * 1024; // 5MB

  beforeEach(() => {
    vi.useFakeTimers();
    cacheStore = new CacheStore(mockCacheDuration, mockCacheSize);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should be able to subscribe a cache and retrieve it", () => {
    cacheStore.subscribe(key, buffer);
    expect(cacheStore.get(key)).toEqual(buffer);
  });

  it("should not retrieve an expired buffer", () => {
    const subscriptionTime = new Date();
    // Subscribe with a buffer that will expire immediately
    cacheStore.subscribe(key, buffer, 0);
    // Advance system time to simulate that current time is past the expiration time
    vi.setSystemTime(subscriptionTime.getTime() + 10000);
    expect(cacheStore.get(key)).toBeUndefined();
  });

  it("should decrease the currentCapacity when unsubscribed", () => {
    cacheStore.subscribe(key, buffer);
    const initialCapacity = cacheStore.getCurrentCapacity();
    cacheStore.unsubscribe(key);
    expect(cacheStore.getCurrentCapacity()).toBeLessThan(initialCapacity);
  });

  it("should calculate cost correctly", () => {
    const initialCall = Date.now();
    const calledCount = 5;
    const cost = cacheStore.calculateCost(
      initialCall,
      buffer.length,
      calledCount
    );
    const expectedCost =
      (1 / buffer.length) * ((calledCount + 1) / (Date.now() - initialCall));
    expect(cost).toBeCloseTo(expectedCost);
  });
});
