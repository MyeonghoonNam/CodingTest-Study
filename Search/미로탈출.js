const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 6
101010
111111
000001
111111
111111`
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
      this.head = newNode;
      this.tail = newNode;
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

const solution = () => {
  const initMaze = () => {
    const maze = new Array(N);

    for (let i = 0; i < N; i++) {
      maze[i] = input().split("").map(Number);
    }

    return maze;
  };

  const initVisitedMaze = () => {
    const visitedMaze = Array.from(new Array(N), () =>
      new Array(M).fill(false)
    );

    return visitedMaze;
  };

  const bfs = () => {
    const queue = new Queue();
    queue.enqueue({ x: 0, y: 0, dist: 1 });
    visitedMaze[0][0] = true;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (!queue.isEmpty()) {
      const { x, y, dist } = queue.dequeue();

      if (x === N - 1 && y === M - 1) return dist;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMazeRange(nx, ny)) continue;

        if (!visitedMaze[nx][ny] && maze[nx][ny] === 1) {
          queue.enqueue({ x: nx, y: ny, dist: dist + 1 });
          visitedMaze[nx][ny] = true;
        }
      }
    }

    return 0;
  };

  const checkMazeRange = (x, y) => {
    const validation = x >= 0 && y >= 0 && x < N && y < M ? true : false;

    return validation;
  };

  const [N, M] = input().split(" ").map(Number);
  const maze = initMaze();
  const visitedMaze = initVisitedMaze();
  const result = bfs();

  return result;
};

console.log(solution());
