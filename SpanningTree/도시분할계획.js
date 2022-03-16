const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 12
1 2 3
1 3 2
3 2 1
2 5 2
3 4 4
7 3 6
5 1 5
1 6 2
6 4 1
6 5 3
4 5 3
6 7 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const findParent = (parent, v) => {
    if (parent[v] !== v) {
      parent[v] = findParent(parent, parent[v]);
    }

    return parent[v];
  };

  const unionParent = (parent, start, end) => {
    start = findParent(parent, start);
    end = findParent(parent, end);

    if (start < end) {
      parent[end] = start;
    } else {
      parent[start] = end;
    }
  };

  const [N, M] = input().split(" ").map(Number);
  const parent = new Array(N + 1);
  const edges = [];
  let result = 0;
  let largestCost = 0;

  for (let i = 1; i <= N; i++) {
    parent[i] = i;
  }

  for (let i = 0; i < M; i++) {
    const [start, end, cost] = input().split(" ").map(Number);
    edges.push({ start, end, cost });
  }

  edges.sort((a, b) => a.cost - b.cost);

  for (let i = 0; i < edges.length; i++) {
    const { start, end, cost } = edges[i];

    if (findParent(parent, start) !== findParent(parent, end)) {
      unionParent(parent, start, end);
      result += cost;
      largestCost = cost;
    }
  }

  return result - largestCost;
};

console.log(solution());
