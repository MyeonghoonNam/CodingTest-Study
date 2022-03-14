// 입력값
/*
5 7
1 2
1 3
1 4
2 4
3 4
3 5
4 5
4 5
*/

/*
4 2
1 3
2 4
3 4
*/

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 2
1 3
2 4
3 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(Infinity)
  );

  for (let i = 1; i <= N; i++) {
    graph[i][i] = 0;
  }

  for (let i = 0; i < M; i++) {
    const [start, end] = input().split(" ").map(Number);

    graph[start][end] = 1;
    graph[end][start] = 1;
  }

  const [X, K] = input().split(" ").map(Number);

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  const distance = graph[1][K] + graph[K][X];
  const result = distance === Infinity ? "-1" : distance;

  return result;
};

console.log(solution());
