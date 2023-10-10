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
      return this.#heap.pop()!.value;
    }

    [this.#heap[0], this.#heap[this.#heap.length - 1]] = [
      this.#heap[this.#heap.length - 1],
      this.#heap[0],
    ];

    const value = this.#heap.pop()!.value;
    this.heapifyDown();
    return value;
  }

  heapifyUp() {
    let index = this.#heap.length - 1;
    let parent = Math.floor((index - 1) / 2);

    while (index > 0 && this.#heap[parent].value > this.#heap[index].value) {
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

    while (
      this.#heap[index].value > this.#heap[leftChild]?.value ||
      this.#heap[index].value > this.#heap[rightChild]?.value
    ) {
      if (
        this.#heap[leftChild].value < this.#heap[rightChild].value ||
        !this.#heap[rightChild]
      ) {
        [this.#heap[index], this.#heap[leftChild]] = [
          this.#heap[leftChild],
          this.#heap[index],
        ];
        index = leftChild;
      } else {
        [this.#heap[index], this.#heap[rightChild]] = [
          this.#heap[rightChild],
          this.#heap[index],
        ];
        index = rightChild;
      }

      leftChild = 2 * index + 1;
      rightChild = 2 * index + 2;
    }
  }
}

export default Heap;
// const heap = [];

// // children at indices 2i + 1 and 2i + 2
// // its parent at index floor((i − 1) / 2).

// function insert(num) {
//   heap.push(num);

//   heapify();
// }

// function deleteRoot() {
//   [heap[0], heap[heap.length - 1]] = [heap[heap.length - 1], heap[0]];

//   heap.pop();

//   heapifyDown();
// }

// function heapifyUp() {
//   let index = heap.length - 1;
//   let parent = Math.floor((index - 1) / 2);

//   while (heap[parent] > heap[index]) {
//     [heap[parent], heap[index]] = [heap[index], heap[parent]];

//     index = parent;
//     parent = Math.floor((index - 1) / 2);
//   }
// }

// function heapifyDown() {
//   let index = 0;
//   let leftChild = 2 * index + 1;
//   let rightChild = 2 * index + 2;

//   while (heap[index] > heap[leftChild] || heap[index] > heap[rightChild]) {
//     if (heap[leftChild] < heap[rightChild] || !heap[rightChild]) {
//       [heap[index], heap[leftChild]] = [heap[leftChild], heap[index]];
//       index = leftChild;
//     } else {
//       [heap[index], heap[rightChild]] = [heap[rightChild], heap[index]];
//       index = rightChild;
//     }

//     leftChild = 2 * index + 1;
//     rightChild = 2 * index + 2;
//   }
// }
