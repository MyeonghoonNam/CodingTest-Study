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

    this.size += 1;
  }

  dequeue() {
    if (this.size === 0) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size -= 1;

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
    : `6 7
3 6
4 3
3 2
1 3
1 2
2 4
5 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const map = Array.from(new Array(N + 1), () => new Array());
  const visited = new Array(N + 1).fill(false);
  const distance = new Array(N + 1).fill(Infinity);

  for (let i = 0; i < M; i++) {
    const [start, destination] = input().split(" ").map(Number);
    map[start].push(destination);
    map[destination].push(start);
  }

  const queue = new Queue();
  const start = 1;

  queue.enqueue({ node: start, cost: 0 });
  visited[start] = true;
  distance[start] = 0;

  while (!queue.isEmpty()) {
    const { node, cost } = queue.dequeue();

    map[node].forEach((v) => {
      if (visited[v] === false) {
        queue.enqueue({ node: v, cost: cost + 1 });
        visited[v] = true;
        distance[v] = cost + 1;
      }
    });
  }

  let maxDistBarnNumber = 0;
  let maxDist = 0;
  let equalMaxDistBarn = [];

  for (let i = 1; i < N + 1; i++) {
    const dist = distance[i];

    if (maxDist < dist) {
      maxDist = dist;
      maxDistBarnNumber = i;
      equalMaxDistBarn = [maxDistBarnNumber];
    } else if (maxDist === dist) {
      equalMaxDistBarn.push(i);
    }
  }

  return `${maxDistBarnNumber} ${maxDist} ${equalMaxDistBarn.length}`;
};

console.log(solution());
