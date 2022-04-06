const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 4
0 1 0 1 1
1 0 1 1 0
0 1 0 0 0
1 1 0 0 0
1 0 0 0 0
2 3 4 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const findParent = (parent_table, node) => {
    if (parent_table[node] !== node) {
      parent_table[node] = findParent(parent_table, parent_table[node]);
    }

    return parent_table[node];
  };

  const unionParent = (parent_table, start, end) => {
    start = findParent(parent_table, start);
    end = findParent(parent_table, end);

    if (start < end) {
      parent_table[end] = start;
    } else {
      parent_table[start] = end;
    }
  };

  const [N, M] = input().split(" ").map(Number);
  const parent_table = new Array(N + 1);

  for (let i = 1; i <= N; i++) {
    parent_table[i] = i;
  }

  for (let i = 0; i < N; i++) {
    const data = input().split(" ").map(Number);

    for (let j = 0; j < N; j++) {
      if (data[j] === 1) {
        unionParent(parent_table, i + 1, j + 1);
      }
    }
  }

  const plan = input().split(" ").map(Number);
  let result = true;
  for (let i = 0; i < M - 1; i++) {
    if (
      findParent(parent_table, plan[i]) !==
      findParent(parent_table, plan[i + 1])
    ) {
      result = false;
    }
  }

  return result ? "YES" : "NO";
};

console.log(solution());
