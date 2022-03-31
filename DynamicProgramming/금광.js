const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
3 4
1 3 3 2 2 1 4 1 0 6 4 7
4 4
1 3 1 5 2 2 4 1 5 0 2 3 0 6 1 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let T = Number(input());
  const result = [];

  while (T--) {
    const [N, M] = input().split(" ").map(Number);
    const data = input().split(" ").map(Number);
    const dp = [];

    let index = 0;
    for (let i = 0; i < N; i++) {
      dp.push(data.slice(index, index + M));
      index += M;
    }

    for (let j = 1; j < M; j++) {
      for (let i = 0; i < N; i++) {
        let leftUp = 0;
        let left = 0;
        let leftDown = 0;

        // 왼쪽 위에서 오는 경우
        if (i === 0) {
          leftUp = 0;
        } else {
          leftUp = dp[i - 1][j - 1];
        }

        // 왼쪽 아래에서 오는 경우

        if (i === N - 1) {
          leftDown = 0;
        } else {
          leftDown = dp[i + 1][j - 1];
        }

        // 왼쪽에서 오는 경우
        left = dp[i][j - 1];

        dp[i][j] = dp[i][j] + Math.max(leftUp, left, leftDown);
      }
    }

    let maxValue = 0;
    for (let i = 0; i < N; i++) {
      maxValue = Math.max(maxValue, dp[i][M - 1]);
    }

    result.push(maxValue);
  }

  return result.join("\n");
};

console.log(solution());
