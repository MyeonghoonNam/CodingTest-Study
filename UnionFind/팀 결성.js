const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 8
0 1 3
1 1 7
0 7 6
1 7 1
0 3 7
0 4 2
0 1 1
1 1 1`
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
  const result = [];

  for (let i = 1; i <= N; i++) {
    parent[i] = i;
  }

  for (let i = 0; i < M; i++) {
    const [mod, start, end] = input().split(" ").map(Number);

    switch (mod) {
      case 0:
        unionParent(parent, start, end);
        break;
      case 1:
        if (findParent(parent, start) !== findParent(parent, end)) {
          result.push("NO");
        } else {
          result.push("YES");
        }
        break;
    }
  }

  return result.join("\n");
};

console.log(solution());
