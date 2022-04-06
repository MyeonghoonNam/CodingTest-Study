const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 11
0 1 7
0 3 5
1 2 8
1 3 9
1 4 7
2 4 5
3 4 15
3 5 6
4 5 8
4 6 9
5 6 11`
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
  const edges_info = [];
  let total_cost = 0;

  for (let i = 0; i <= N; i++) {
    parent_table[i] = i;
  }

  for (let i = 0; i < M; i++) {
    const [start, end, cost] = input().split(" ").map(Number);
    edges_info.push({ start, end, cost });
    total_cost += cost;
  }

  edges_info.sort((a, b) => a.cost - b.cost);

  for (let i = 0; i < M; i++) {
    const { start, end, cost } = edges_info[i];

    if (findParent(parent_table, start) !== findParent(parent_table, end)) {
      unionParent(parent_table, start, end);
      total_cost -= cost; // 전체 가로등 비용에서 최소 신장 트리 형성의 비용을 계속 빼준다
    }
  }

  return total_cost;
};

console.log(solution());
