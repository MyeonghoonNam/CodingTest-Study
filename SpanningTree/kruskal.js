const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 9
1 2 29
1 5 75
2 3 35
2 6 34
3 4 7
4 6 23
4 7 13
5 6 53
6 7 25`
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

  const [V, E] = input().split(" ").map(Number);
  const parent = new Array(V + 1);
  const edges = [];
  let result = 0;

  for (let i = 1; i <= V; i++) {
    parent[i] = i;
  }

  for (let i = 0; i < E; i++) {
    const [start, end, cost] = input().split(" ").map(Number);
    edges.push({ start, end, cost });
  }

  edges.sort((a, b) => a.cost - b.cost);

  for (let i = 0; i < edges.length; i++) {
    const { start, end, cost } = edges[i];

    if (findParent(parent, start) !== findParent(parent, end)) {
      unionParent(parent, start, end);
      result += cost;
    }
  }

  return result;
};

console.log(solution());
