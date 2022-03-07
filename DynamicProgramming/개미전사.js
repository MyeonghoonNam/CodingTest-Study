const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
1 3 1 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const store = input().split(" ").map(Number);
  const dp = new Array(N).fill(0);
  dp[0] = store[0];
  dp[1] = Math.max(dp[0], store[1]);

  for (let i = 2; i < N; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + store[i]);
  }

  return dp[N - 1];
};

console.log(solution());
