const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 6
1 5
3 4
4 2
4 6
5 2
5 4`
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
    for (let j = 1; j <= N; j++) {
      if (i === j) graph[i][j] = 0;
    }
  }

  for (let i = 0; i < M; i++) {
    const [start, destination] = input().split(" ").map(Number);
    graph[start][destination] = 1;
  }

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  let result = 0;

  for (let i = 1; i <= N; i++) {
    let count = 0;

    for (let j = 1; j <= N; j++) {
      if (graph[i][j] !== Infinity || graph[j][i] !== Infinity) {
        count += 1;
      }
    }

    if (count === N) {
      result += 1;
    }
  }

  return result;
};

console.log(solution());
