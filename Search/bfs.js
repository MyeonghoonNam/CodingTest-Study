class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.empty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.empty()) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size--;

    return popNode.value;
  }

  empty() {
    return this.size === 0 ? true : false;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];

const visited = new Array(9).fill(false);

const bfs = (graph, start, visited) => {
  const queue = new Queue();
  queue.enqueue(start);
  visited[start] = true;

  while (!queue.empty()) {
    const vertex = queue.dequeue();
    console.log(vertex);

    graph[vertex].forEach((v) => {
      if (!visited[v]) {
        queue.enqueue(v);
        visited[v] = true;
      }
    });
  }
};

bfs(graph, 1, visited);
