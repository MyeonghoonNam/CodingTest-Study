class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.size === 0) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size--;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 3
1 0 2
0 0 0
3 0 0
1 2 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N), () => new Array());
  const virus = [];

  for (let i = 0; i < N; i++) {
    const data = input().split(" ").map(Number);
    graph[i] = data;

    for (let j = 0; j < N; j++) {
      if (graph[i][j] !== 0) {
        virus.push({ virus: graph[i][j], time: 0, x: i, y: j });
      }
    }
  }

  virus.sort((a, b) => a.virus - b.virus);

  const [S, X, Y] = input().split(" ").map(Number);

  const checkRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
    else return false;
  };

  const queue = new Queue();
  for (let i = 0; i < virus.length; i++) {
    queue.enqueue(virus[i]);
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (!queue.isEmpty()) {
    const { virus, time, x, y } = queue.dequeue();

    if (time === S) break;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!checkRange(nx, ny)) continue;

      if (graph[nx][ny] === 0) {
        graph[nx][ny] = virus;
        queue.enqueue({ virus, time: time + 1, x: nx, y: ny });
      }
    }
  }

  const result = graph[X - 1][Y - 1];
  return result;
};

console.log(solution());
