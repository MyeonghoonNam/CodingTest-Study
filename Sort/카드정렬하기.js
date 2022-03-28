class MinHeap {
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

    const popValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.size--;
    this.moveDown();

    return popValue;
  }

  moveUp() {
    let curIdx = this.size - 1;

    while (curIdx > 0) {
      const parentIdx = Math.floor((curIdx - 1) / 2);

      if (this.heap[parentIdx] <= this.heap[curIdx]) break;

      this.swap(parentIdx, curIdx);
      curIdx = parentIdx;
    }
  }

  moveDown(curIdx = 0) {
    const leftIdx = curIdx * 2 + 1;
    const rightIdx = curIdx * 2 + 2;
    let minIdx = curIdx;

    if (leftIdx < this.size && this.heap[leftIdx] < this.heap[minIdx]) {
      minIdx = leftIdx;
    }

    if (rightIdx < this.size && this.heap[rightIdx] < this.heap[minIdx]) {
      minIdx = rightIdx;
    }

    if (minIdx !== curIdx) {
      this.swap(minIdx, curIdx);
      this.moveDown(minIdx);
    }
  }

  swap(a, b) {
    const temp = this.heap[a];

    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
10
20
40`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const queue = new MinHeap();

  for (let i = 0; i < N; i++) {
    const card = Number(input());
    queue.insert(card);
  }

  let result = 0;

  while (queue.size !== 1) {
    const firstCardSize = queue.pop();
    const secondCardSize = queue.pop();
    const sum = firstCardSize + secondCardSize;

    queue.insert(sum);
    result += sum;
  }

  return result;
};

console.log(solution());
