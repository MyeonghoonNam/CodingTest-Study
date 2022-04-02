const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
5 50
4 40
3 30
2 20
1 10
1 10
2 20
3 30
4 40
5 50`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const T = [];
  const P = [];
  const DP = new Array(N + 1).fill(0);

  for (let i = 0; i < N; i++) {
    const [t, p] = input().split(" ").map(Number);
    T.push(t);
    P.push(p);
  }

  let maxValue = 0;

  // dp[i] = i일 부터 마지막 날까지 낼 수 있는 최대 이윤
  for (let i = N - 1; i >= 0; i--) {
    const time = T[i] + i;

    if (time <= N) {
      DP[i] = Math.max(P[i] + DP[time], maxValue);
      maxValue = DP[i];
    } else {
      DP[i] = maxValue;
    }
  }

  return maxValue;
};

console.log(solution());
