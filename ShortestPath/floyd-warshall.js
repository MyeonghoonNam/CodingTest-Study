const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
7
1 2 4
1 4 6
2 1 3
2 3 7
3 1 5
3 4 4
4 3 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const M = Number(input());
  const graph = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(Infinity)
  );

  // 자기 자신에 대한 경로 값 초기화
  graph.forEach((_, a) => {
    // 1번 노드 부터 시작
    if (a === 0) return;

    graph[a].forEach((_, b) => {
      if (a === b) graph[a][b] = 0;
    });
  });

  // 가중치 경로를 통한 거리 값 갱신
  for (let i = 0; i < M; i++) {
    const [start, end, dist] = input().split(" ").map(Number);
    graph[start][end] = dist;
  }

  // 플로이드 워셜 알고리즘을 점화식을 통해 최단 경로 갱신
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  const result = [];
  for (let i = 1; i <= N; i++) {
    result.push(graph[i].slice(1).join(" "));
  }

  return result.join("\n");
};

console.log(solution());
