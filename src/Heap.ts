import { CacheRecord } from './CacheStore';

class Heap {
  #heap: CacheRecord[];

  constructor() {
    this.#heap = [];
  }

  peak() {
    return this.#heap[0];
  }

  insert(record: CacheRecord) {
    this.#heap.push(record);
    if (this.#heap.length > 1) {
      this.heapifyUp();
    }
  }

  delete() {
    if (this.#heap.length === 1) {
      return this.#heap.pop()!.size;
    }

    [this.#heap[0], this.#heap[this.#heap.length - 1]] = [
      this.#heap[this.#heap.length - 1],
      this.#heap[0],
    ];

    const value = this.#heap.pop()!.size;
    this.heapifyDown();
    return value;
  }

  heapifyUp() {
    let index = this.#heap.length - 1;
    let parent = Math.floor((index - 1) / 2);

    while (index > 0 && this.#heap[parent].cost < this.#heap[index].cost) {
      [this.#heap[parent], this.#heap[index]] = [
        this.#heap[index],
        this.#heap[parent],
      ];

      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  }

  heapifyDown() {
    let index = 0;
    let leftChild = 2 * index + 1;
    let rightChild = 2 * index + 2;
    const size = this.#heap.length;

    while (leftChild < size) {
      // Ensuring the left child index is within the array
      let largestChild = leftChild;

      if (
        rightChild < size &&
        this.#heap[rightChild].cost > this.#heap[leftChild].cost
      ) {
        largestChild = rightChild; // Right child exists and is greater than left child
      }

      if (this.#heap[index].cost >= this.#heap[largestChild].cost) {
        break; // Proper place is found
      }

      [this.#heap[index], this.#heap[largestChild]] = [
        this.#heap[largestChild],
        this.#heap[index],
      ];

      index = largestChild;
      leftChild = 2 * index + 1;
      rightChild = 2 * index + 2;
    }
  }
}

export default Heap;
