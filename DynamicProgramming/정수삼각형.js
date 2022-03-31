const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
7
3 8
8 1 0
2 7 4 4
4 5 2 6 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const dp = [];

  for (let i = 0; i < N; i++) {
    const floor = input().split(" ").map(Number);
    dp.push(floor);
  }

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i + 1; j++) {
      if (j === 0) {
        // 맨 왼쪽 수
        dp[i][j] = dp[i - 1][j] + dp[i][j];
      } else if (j === i) {
        // 맨 오른쪽 수
        dp[i][j] = dp[i - 1][j - 1] + dp[i][j];
      } else {
        // 맨 왼쪽과 오른쪽을 제외한 중앙의 수
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1]) + dp[i][j];
      }
    }
  }

  const result = Math.max(...dp[N - 1]);

  return result;
};

console.log(solution());
