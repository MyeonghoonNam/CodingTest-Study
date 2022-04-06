class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = this.tail = null;
    this._size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this._size === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this._size += 1;
  }

  dequeue() {
    if (this._size === 0) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this._size === 1) {
      this.tail = this.head;
    }

    this._size -= 1;

    return popNode.value;
  }

  isEmpty() {
    return this._size === 0 ? true : false;
  }

  size() {
    return this._size;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
5
5 4 3 2 1
2
2 4
3 4
3
2 3 1
0
4
1 2 3 4
3
1 2
3 4
2 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let T = Number(input());

  while (T--) {
    const N = Number(input());
    const graph = Array.from(new Array(N + 1), () =>
      new Array(N + 1).fill(false)
    );
    const indegree = new Array(N + 1).fill(0);
    const data = input().split(" ").map(Number);

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        graph[data[i]][data[j]] = true;
        indegree[data[j]] += 1;
      }
    }

    const M = Number(input());

    for (let i = 0; i < M; i++) {
      const [start, end] = input().split(" ").map(Number);

      if (graph[start][end] === true) {
        graph[start][end] = false;
        graph[end][start] = true;
        indegree[start] += 1;
        indegree[end] -= 1;
      } else {
        // 방향 그래프 연결정보가 없는 경우
        graph[start][end] = true;
        graph[end][start] = false;
        indegree[start] -= 1;
        indegree[end] += 1;
      }
    }

    const rank = [];
    const queue = new Queue();

    for (let i = 1; i <= N; i++) {
      if (indegree[i] === 0) {
        queue.enqueue(i);
      }
    }

    let unique = true; // 위상 정렬 결과가 오직 하나인지 체크
    let cycle = false; // 그래프내의 사이클이 존재하는지 체크

    for (let i = 0; i < N; i++) {
      // 큐가 빈 경우 사이클 발생을 뜻한다.
      if (queue.isEmpty()) {
        cycle = true;
        break;
      }

      // 큐의 원소가 2개 이상이라면 가능한 정렬 결과가 여러가지를 뜻한다.
      if (queue.size() >= 2) {
        unique = false;
        break;
      }

      const team = queue.dequeue();
      rank.push(team);

      for (let j = 1; j <= N; j++) {
        if (graph[team][j] === true) {
          indegree[j] -= 1;

          if (indegree[j] === 0) {
            queue.enqueue(j);
          }
        }
      }
    }

    if (cycle === true) {
      result.push("IMPOSSIBLE");
    } else if (unique === false) {
      result.push("?");
    } else {
      result.push(rank.join(" "));
    }
  }

  return result.join("\n");
};

console.log(solution());
