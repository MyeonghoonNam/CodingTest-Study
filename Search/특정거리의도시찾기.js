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

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return;

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
    : `4 4 1 1
1 2
1 3
2 3
2 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M, K, X] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => new Array());

  for (let i = 0; i < M; i++) {
    const [start, destination] = input().split(" ").map(Number);

    graph[start].push(destination);
  }

  const distance = new Array(N + 1).fill(-1);
  distance[X] = 0;

  const queue = new Queue();
  queue.enqueue(X);

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue();

    graph[vertex].forEach((next) => {
      if (distance[next] === -1) {
        distance[next] = distance[vertex] + 1;
        queue.enqueue(next);
      }
    });
  }

  const result = [];
  let flag = false;

  for (let i = 1; i <= N; i++) {
    const dist = distance[i];

    if (dist === K) {
      result.push(i);
      flag = true;
    }
  }

  return flag ? result.join("\n") : -1;
};

console.log(solution());
