class MinHeap {
  constructor() {
    this.heap = [];
    this.size = this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.moveUp();
    this.size++;
  }

  pop() {
    if (this.size === 0) return;
    if (this.size === 1) {
      this.size--;
      return this.heap.pop();
    }

    const minValue = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.moveDown();
    this.size--;

    return minValue;
  }

  moveUp() {
    let curIdx = this.heap.length - 1;

    while (curIdx > 0) {
      const parentIdx = Math.floor((curIdx - 1) / 2);

      if (this.heap[parentIdx] <= this.heap[curIdx]) break;

      [this.heap[parentIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parentIdx],
      ];
      curIdx = parentIdx;
    }
  }

  moveDown(curIdx = 0) {
    const leftIdx = curIdx * 2 + 1;
    const rightIdx = curIdx * 2 + 2;
    let minIdx = curIdx;

    if (leftIdx < this.heap.length && this.heap[leftIdx] < this.heap[minIdx]) {
      minIdx = leftIdx;
    }

    if (
      rightIdx < this.heap.length &&
      this.heap[rightIdx] < this.heap[minIdx]
    ) {
      minIdx = rightIdx;
    }

    if (minIdx !== curIdx) {
      [this.heap[minIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[minIdx],
      ];
      this.moveDown(minIdx);
    }
  }
}

const minHeap = new MinHeap();

minHeap.insert(4);
minHeap.insert(7);
minHeap.insert(6);
minHeap.insert(5);
minHeap.insert(2);
minHeap.insert(9);
minHeap.insert(1);
minHeap.insert(3);
minHeap.insert(2);
minHeap.insert(3);

console.log(minHeap.heap);

const result = [];
while (minHeap.size !== 0) {
  result.push(minHeap.pop());
}

console.log(result);
