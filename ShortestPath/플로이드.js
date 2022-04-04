const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
14
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
3 5 10
3 1 8
1 4 2
5 1 7
3 4 2
5 2 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const M = Number(input());
  const busInfo = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(Infinity)
  );

  // 자기 자신의 경로 초기화
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (i === j) busInfo[i][j] = 0;
    }
  }

  // 간선 정보 입력
  for (let i = 0; i < M; i++) {
    const [start, destination, cost] = input().split(" ").map(Number);

    if (busInfo[start][destination] < cost) continue;
    busInfo[start][destination] = cost;
  }

  // 최단경로 값 갱신
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        busInfo[i][j] = Math.min(busInfo[i][j], busInfo[i][k] + busInfo[k][j]);
      }
    }
  }

  // 출력값 변환
  const result = [];

  for (let i = 1; i <= N; i++) {
    result.push(
      busInfo[i]
        .slice(1)
        .map((cost) => (cost === Infinity ? 0 : cost))
        .join(" ")
    );
  }

  return result.join("\n");
};

console.log(solution());
