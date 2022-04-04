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
      this.heapSize -= 1;
      return this.heap.pop();
    }

    const popNode = this.heap.pop();
    this.heapSize -= 1;
    this.moveDown();

    return popNode;
  }

  moveUp() {
    let curIdx = this.heapSize - 1;

    while (curIdx > 0) {
      const parentIdx = Math.floor((curIdx - 1) / 2);

      if (this.heap[parentIdx] <= this.heap[curIdx]) break;
      swap(curIdx, parentIdx);
      curIdx = parentIdx;
    }
  }

  moveDown(curIdx = 0) {
    let leftChildIdx = curIdx * 2 + 1;
    let rightChildIDx = curIdx * 2 + 2;
    const minIdx = curIdx;

    if (
      leftChildIdx < this.heapSize &&
      this.heap[leftChildIdx] < this.heap[minIdx]
    ) {
      minIdx = leftChildIdx;
    }

    if (
      rightChildIDx < this.heapSize &&
      this.heap[rightChildIDx] < this.heap[minIdx]
    ) {
      minIdx = rightChildIDx;
    }

    if (minIdx !== curIdx) {
      swap(minIdx, curIdx);
      minIdx = curIdx;
      this.moveDown(minIdx);
    }
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  isEmpty() {
    return this.heapSize === 0 ? true : false;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
3
5 5 4
3 9 1
3 2 7
5
3 7 2 0 1
2 8 0 9 1
1 2 1 8 1
9 8 9 2 0
3 6 5 1 5
7
9 0 5 1 1 5 3
4 1 2 1 6 5 3
0 7 6 1 6 8 5
1 1 7 8 3 2 3
9 4 0 7 6 4 1
5 8 3 2 4 8 3
7 4 8 4 8 3 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const checkRangeMap = (x, y, size) => {
    if (x >= 0 && y >= 0 && x < size && y < size) return true;
    else return false;
  };

  const result = [];
  let T = Number(input());

  while (T--) {
    const N = Number(input());
    const map = Array.from(new Array(N), () => new Array());
    const distance = Array.from(new Array(N), () =>
      new Array(N).fill(Infinity)
    );

    for (let i = 0; i < N; i++) {
      const data = input().split(" ").map(Number);
      map[i] = data;
    }

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    const queue = new MinHeap();
    queue.insert({ x: 0, y: 0, cost: map[0][0] });
    distance[0][0] = map[0][0];

    while (!queue.isEmpty()) {
      const { x, y, cost } = queue.pop();

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (checkRangeMap(nx, ny, N) === false) continue;

        const totalCost = cost + map[nx][ny];
        if (totalCost < distance[nx][ny]) {
          queue.insert({ x: nx, y: ny, cost: totalCost });
          distance[nx][ny] = totalCost;
        }
      }
    }

    result.push(distance[N - 1][N - 1]);
  }

  return result.join("\n");
};

console.log(solution());
