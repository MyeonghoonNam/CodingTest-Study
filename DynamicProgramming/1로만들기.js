const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `26`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const number = Number(input());
  const dp = new Array(number + 1).fill(0);

  for (let i = 2; i <= number; i++) {
    dp[i] = dp[i - 1] + 1;

    if (i % 2 === 0) {
      dp[i] = Math.min(dp[i], dp[Math.floor(i / 2)] + 1);
    }

    if (i % 3 === 0) {
      dp[i] = Math.min(dp[i], dp[Math.floor(i / 3)] + 1);
    }

    if (i % 5 === 0) {
      dp[i] = Math.min(dp[i], dp[Math.floor(i / 5)] + 1);
    }
  }

  return dp[number];
};

console.log(solution());
