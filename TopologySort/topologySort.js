const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 8
1 2
1 5
2 3
2 6
3 4
4 7
5 6
6 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
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
    this.head = this.head.next;
    this.size--;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const [V, E] = input().split(" ").map(Number);
  const graph = Array.from(new Array(V + 1), () => new Array());
  const indegree = new Array(V + 1).fill(0);

  for (let i = 0; i < E; i++) {
    const [start, end] = input().split(" ").map(Number);

    graph[start].push({ destination: end });
    indegree[end] += 1;
  }

  const topologySort = () => {
    const result = [];
    const queue = new Queue();

    for (let i = 1; i <= V; i++) {
      if (indegree[i] === 0) {
        queue.enqueue(i);
      }
    }

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      result.push(node);

      for (let i = 0; i < graph[node].length; i++) {
        const { destination } = graph[node][i];

        indegree[destination] -= 1;

        if (indegree[destination] === 0) {
          queue.enqueue(destination);
        }
      }
    }

    return result.join(" ");
  };

  const result = topologySort();

  return result;
};

console.log(solution());
