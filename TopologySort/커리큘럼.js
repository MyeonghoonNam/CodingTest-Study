const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
10 -1
10 1 -1
4 1 -1
4 3 1 -1
3 3 -1`
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

    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.size--;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const N = Number(input());
  const graph = Array.from(new Array(N + 1), () => new Array());
  const indegree = new Array(N + 1).fill(0);
  const time = new Array(N + 1);

  for (let i = 1; i <= N; i++) {
    const data = input().split(" ").map(Number);
    time[i] = data[0];

    for (let j = 1; j < data.length - 1; j++) {
      const subCourse = data[j];

      graph[subCourse].push({ mandatory: i });
      indegree[i] += 1;
    }
  }

  const topology = () => {
    const queue = new Queue();
    const result = [...time];

    for (let i = 1; i <= N; i++) {
      if (indegree[i] === 0) {
        queue.enqueue(i);
      }
    }

    while (!queue.isEmpty()) {
      const current = queue.dequeue();

      graph[current].forEach(({ mandatory: m }) => {
        result[m] = Math.max(result[m], result[current] + time[m]);
        indegree[m] -= 1;

        if (indegree[m] === 0) {
          queue.enqueue(m);
        }
      });
    }

    return result.join("\n");
  };

  const result = topology();

  return result;
};

console.log(solution());
