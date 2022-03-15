class MaxHeap {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.size++;
    this.moveUp();
  }

  pop() {
    if (this.size === 0) return;
    if (this.size === 1) {
      this.size--;
      return this.heap.pop();
    }

    const maxValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.size--;
    this.moveDown();

    return maxValue;
  }

  moveUp() {
    let curIdx = this.size - 1;

    while (curIdx > 0) {
      const parentIdx = Math.floor((curIdx - 1) / 2);

      if (this.heap[parentIdx] >= this.heap[curIdx]) break;

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
    let maxIdx = curIdx;

    if (leftIdx < this.size && this.heap[leftIdx] > this.heap[maxIdx]) {
      maxIdx = leftIdx;
    }

    if (rightIdx < this.size && this.heap[rightIdx] > this.heap[maxIdx]) {
      maxIdx = rightIdx;
    }

    if (maxIdx !== curIdx) {
      [this.heap[maxIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[maxIdx],
      ];
      this.moveDown(maxIdx);
    }
  }
}

const maxHeap = new MaxHeap();

maxHeap.insert(4);
maxHeap.insert(7);
maxHeap.insert(6);
maxHeap.insert(5);
maxHeap.insert(2);
maxHeap.insert(9);
maxHeap.insert(1);
maxHeap.insert(3);
maxHeap.insert(2);
maxHeap.insert(3);

console.log(maxHeap.heap);

const result = [];
while (maxHeap.size !== 0) {
  result.push(maxHeap.pop());
}

console.log(result);
