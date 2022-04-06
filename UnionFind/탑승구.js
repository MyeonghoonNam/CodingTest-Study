const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
6
2
2
3
3
4
4`
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
  const G = Number(input());
  const P = Number(input());
  const parent_table = new Array(G + 1);

  for (let i = 0; i < G + 1; i++) {
    parent_table[i] = i;
  }

  let result = 0;

  for (let i = 0; i < P; i++) {
    const gate_info = findParent(parent_table, Number(input()));

    if (gate_info === 0) {
      break;
    } else {
      unionParent(parent_table, gate_info - 1, gate_info);
      result += 1;
    }
  }

  return result;
};

console.log(solution());
