import { describe, expect, it } from 'vitest';

import deserializerStore from './DeserializerStore';

describe('DeserializerStore', () => {
  it('should be able to add a deserializer function to the store', () => {
    const mockDeserializer = (buffer: Uint8Array) => {
      return new TextDecoder().decode(buffer);
    };
    const key = 'test';
    deserializerStore.addDeserializer(key, mockDeserializer);
    expect(deserializerStore.has(key)).toBe(true);
    expect(deserializerStore.has('otherKey')).toBe(false);
  });

  it('should be able to use a deserializer function from the store', () => {
    const mockDeserializer = (buffer: Uint8Array) => {
      return new TextDecoder().decode(buffer);
    };
    const key = 'test';
    deserializerStore.addDeserializer(key, mockDeserializer);
    const buffer = new TextEncoder().encode('test value');
    const deserializer = deserializerStore.getDeserializer(key);
    expect(deserializer(buffer)).toBe('test value');
  });
});
