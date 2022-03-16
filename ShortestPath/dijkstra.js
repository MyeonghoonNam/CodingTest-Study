const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 11
1
1 2 2
1 3 5
1 4 1
2 3 3
2 4 2
3 2 3
3 6 5
4 3 3
4 5 1
5 3 1
5 6 2`
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

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapSize--;
    this.moveDown();

    return minValue;
  }

  moveUp() {
    let curIdx = this.heapSize - 1;
    while (curIdx > 0) {
      const parentIdx = Math.floor((curIdx - 1) / 2);

      if (this.heap[parentIdx].cost <= this.heap[curIdx].cost) break;

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
    let minIdx = curIdx;

    if (
      leftChildIdx < this.heapSize &&
      this.heap[leftChildIdx].cost < this.heap[minIdx].cost
    ) {
      minIdx = leftChildIdx;
    }

    if (
      rightChildIdx < this.heapSize &&
      this.heap[rightChildIdx].cost < this.heap[minIdx].cost
    ) {
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
  // N: node count, M: edge count
  const [N, M] = input().split(" ").map(Number);
  const startNode = Number(input());
  const graph = Array.from(new Array(N + 1), () => new Array());
  const distance = new Array(N + 1).fill(Infinity);

  for (let i = 0; i < M; i++) {
    const [startPoint, destination, dist] = input().split(" ").map(Number);
    graph[startPoint].push({ destination, dist });
  }

  const dijkstra = (startNode) => {
    const queue = new MinHeap();

    queue.insert({ node: startNode, cost: 0 });
    distance[startNode] = 0;

    while (!queue.isEmpty()) {
      let { node, cost } = queue.pop();

      if (distance[node] < cost) continue;

      graph[node].forEach(({ destination, dist }) => {
        const totalCost = cost + dist;

        if (totalCost < distance[destination]) {
          queue.insert({ node: destination, cost: totalCost });
          distance[destination] = totalCost;
        }
      });
    }
  };

  dijkstra(startNode);

  const result = [];
  for (let i = 1; i <= N; i++) {
    result.push(distance[i]);
  }

  return result.join("\n");
};

console.log(solution());
