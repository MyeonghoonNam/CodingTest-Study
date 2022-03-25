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
    : `2 20 50
50 30
20 40`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, L, R] = input().split(" ").map(Number);
  const map = Array.from(new Array(N), () => new Array());
  let visited = [];

  for (let i = 0; i < N; i++) {
    map[i] = input().split(" ").map(Number);
  }

  // 상하좌우
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const bfs = (x, y) => {
    const queue = new Queue();
    queue.enqueue([x, y]);
    visited[x][y] = true;

    const unitedState = [[x, y]];
    let unitedPeopleCount = map[x][y];
    let unitedCountryCount = 1;

    while (!queue.isEmpty()) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkRange(nx, ny) || visited[nx][ny] === true) continue;

        const diff = Math.abs(map[x][y] - map[nx][ny]);

        if (diff >= L && diff <= R) {
          queue.enqueue([nx, ny]);
          visited[nx][ny] = true;
          unitedState.push([nx, ny]);
          unitedPeopleCount += map[nx][ny];
          unitedCountryCount++;
        }
      }
    }

    for (let i = 0; i < unitedState.length; i++) {
      const [x, y] = unitedState[i];
      map[x][y] = Math.floor(unitedPeopleCount / unitedCountryCount);
    }
  };

  const checkRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
    else return false;
  };

  const onProcess = () => {
    let day = 0;

    while (true) {
      visited = Array.from(new Array(N), () => new Array(N).fill(false));

      let index = 0; // 전체국가탐색여부
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (visited[i][j] === false) {
            bfs(i, j);
            index++;
          }
        }
      }

      if (index === N * N) break;

      day++;
    }

    return day;
  };

  const result = onProcess();

  return result;
};

console.log(solution());
