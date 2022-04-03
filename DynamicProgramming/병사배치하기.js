const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
15 11 4 8 5 2 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const soldier = input().split(" ").map(Number).reverse();
  const dp = new Array(N).fill(1);

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (soldier[j] < soldier[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  const result = N - Math.max(...dp);
  return result;
};

console.log(solution());
