const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `15 14
00000111100000
11111101111110
11011101101110
11011101100000
11011111111111
11011111111100
11000000011111
01111111111111
00000000011111
01111111111000
00011111111000
00000001111000
11111111110011
11100011111111
11100011111111`
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
    if (this.isEmpty()) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = null;
    }

    this.size -= 1;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution1 = () => {
  const initGraph = () => {
    const map = new Array(N);

    for (let i = 0; i < N; i++) {
      map[i] = input().split("").map(Number);
    }

    return map;
  };

  const dfs = (x, y) => {
    if (!checkRange(x, y) || graph[x][y] === 1) return false;

    if (!visited[x][y]) {
      visited[x][y] = true;

      // 상, 하, 좌, 우 탐색
      dfs(x - 1, y);
      dfs(x + 1, y);
      dfs(x, y - 1);
      dfs(x, y + 1);

      return true;
    }
  };

  const checkRange = (x, y) => {
    const validation = x >= 0 && y >= 0 && x < N && y < M ? true : false;

    return validation;
  };

  const [N, M] = input().split(" ").map(Number);
  const graph = initGraph();
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));
  let result = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (dfs(i, j)) {
        result++;
      }
    }
  }

  return result;
};

const solution2 = () => {
  const initGraph = () => {
    const graph = new Array(N);

    for (let i = 0; i < N; i++) {
      const row = input().split("").map(Number);
      graph[i] = row;
    }

    return graph;
  };

  const checkRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  const bfs = (x, y) => {
    const queue = new Queue();
    queue.enqueue({ x, y });
    visited[x][y] = true;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (!queue.isEmpty()) {
      const { x, y } = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkRange(nx, ny)) continue;

        if (graph[nx][ny] === 0 && visited[nx][ny] === false) {
          queue.enqueue({ x: nx, y: ny });
          visited[nx][ny] = true;
        }
      }
    }
  };

  const [N, M] = input().split(" ").map(Number);
  const graph = initGraph(N, M);
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));

  let result = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 0 && visited[i][j] === false) {
        bfs(i, j);
        result += 1;
      }
    }
  }

  return result;
};

// console.log(solution1());
console.log(solution2());
