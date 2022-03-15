const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 3
1 2
1 3
2 3`
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

  for (let i = 1; i <= V; i++) {
    parent[i] = i;
  }

  let cycle = false;
  for (let i = 0; i < E; i++) {
    const [start, end] = input().split(" ").map(Number);

    if (findParent(parent, parent[start]) === findParent(parent, parent[end])) {
      cycle = true;
      break;
    } else {
      unionParent(parent, start, end);
    }
  }

  const result = cycle ? "사이클이 존재합니다." : "사이클 존재하지 않습니다.";

  return result;
};

console.log(solution());
