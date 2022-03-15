const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 4
1 4
2 3
2 4
5 6`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  // 특정 원소가 속한 집합 찾기
  const findParent = (parent, v) => {
    if (parent[v] !== v) {
      parent[v] = findParent(parent, parent[v]);
    }

    return parent[v];
  };

  // 두 원소가 속한 집합 합치기
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
  const parentTable = new Array(V + 1);

  // 부모 테이블 부모 값을 자기 자신을 초기화
  for (let i = 1; i <= V; i++) {
    parentTable[i] = i;
  }

  // union 연산 수행
  for (let i = 0; i < E; i++) {
    const [start, end] = input().split(" ").map(Number);
    unionParent(parentTable, start, end);
  }

  const result = [];
  for (let i = 1; i <= V; i++) {
    result.push(findParent(parentTable, i));
  }

  return `각 원소가 속한 집합: ${result.join(" ")}\n부모 테이블: ${parentTable
    .slice(1)
    .join(" ")}
  `;
};

console.log(solution());
