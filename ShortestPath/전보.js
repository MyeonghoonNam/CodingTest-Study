const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 2 1
1 2 4
1 3 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class MinHeap {
  constructor() {
    this.heap = [];
    this.heapSize = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.heapSize++;
    this.moveUp();
  }

  pop() {
    if (this.heapSize === 0) return;
    if (this.heapSize === 1) {
      this.heapSize--;
      return this.heap.pop();
    }

    const popNode = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapSize--;
    this.moveDown();

    return popNode;
  }

  moveUp() {
    let curIdx = this.heapSize - 1;

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
    const leftChildIdx = curIdx * 2 + 1;
    const rightChildIdx = curIdx * 2 + 2;
    const leftChild = this.heap[leftChildIdx]?.cost;
    const rightChild = this.heap[rightChildIdx]?.cost;
    let minIdx = curIdx;
    const minChild = this.heap[minIdx]?.cost;

    if (leftChildIdx < this.heapSize && leftChild < minChild) {
      minIdx = leftChildIdx;
    }

    if (rightChildIdx < this.heapSize && rightChild < minChild) {
      minIdx = rightChildIdx;
    }

    if (minIdx !== curIdx) {
      [this.heap[minIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[minIdx],
      ];
      this.moveDown(minIdx);
    }
  }

  isEmpty() {
    return this.heapSize === 0 ? true : false;
  }
}

const solution = () => {
  const [N, M, C] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => new Array());
  const distance = new Array(N + 1).fill(Infinity);

  for (let i = 0; i < M; i++) {
    const [start, destination, dist] = input().split(" ").map(Number);
    graph[start].push({ destination, dist });
  }

  const dijkstra = (start) => {
    const queue = new MinHeap();
    queue.insert({ node: start, cost: 0 });
    distance[start] = 0;

    while (!queue.isEmpty()) {
      const { node, cost } = queue.pop();

      if (distance[node] < cost) continue;

      graph[node].forEach(({ destination, dist }) => {
        const totalCost = cost + dist;

        if (distance[destination] > totalCost) {
          distance[destination] = totalCost;
          queue.insert({ node: destination, cost: totalCost });
        }
      });
    }
  };

  dijkstra(C);

  let connectCityCount = 0;
  let maxCost = 0;
  for (let i = 1; i <= N; i++) {
    const cost = distance[i];

    if (cost !== (Infinity && 0)) {
      connectCityCount++;
      maxCost = Math.max(maxCost, cost);
    }
  }

  const result = `${connectCityCount} ${maxCost}`;
  return result;
};

console.log(solution());
