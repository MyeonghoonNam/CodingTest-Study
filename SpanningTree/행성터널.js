const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
11 -15 -15
14 -5 -15
-1 -1 -5
10 -4 -1
19 -4 19`
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
  const N = Number(input());
  const parent_table = new Array(N + 1);

  for (let i = 0; i < parent_table.length; i++) {
    parent_table[i] = i;
  }

  const x = [];
  const y = [];
  const z = [];

  for (let i = 1; i <= N; i++) {
    const data = input().split(" ").map(Number);

    // [좌표값, node]
    x.push([data[0], i]);
    y.push([data[1], i]);
    z.push([data[2], i]);
  }

  x.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  y.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  z.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const edges_info = [];

  for (let i = 0; i < N - 1; i++) {
    const diff_x = x[i + 1][0] - x[i][0];
    const diff_y = y[i + 1][0] - y[i][0];
    const diff_z = z[i + 1][0] - z[i][0];

    edges_info.push({ start: x[i][1], end: x[i + 1][1], cost: diff_x });
    edges_info.push({ start: y[i][1], end: y[i + 1][1], cost: diff_y });
    edges_info.push({ start: z[i][1], end: z[i + 1][1], cost: diff_z });
  }

  edges_info.sort((a, b) => a.cost - b.cost);

  let result = 0;

  for (let i = 0; i < edges_info.length; i++) {
    const { start, end, cost } = edges_info[i];

    if (findParent(parent_table, start) !== findParent(parent_table, end)) {
      unionParent(parent_table, start, end);
      result += cost;
    }
  }

  return result;
};

console.log(solution());
