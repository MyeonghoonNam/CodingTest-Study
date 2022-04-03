const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `sunday
saturday`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const str1 = input();
  const str2 = input();
  const n = str1.length;
  const m = str2.length;
  const dp = Array.from(new Array(n + 1), () => new Array(m + 1));
  dp[0][0] = 0;

  for (let i = 1; i < n + 1; i++) {
    dp[i][0] = i;
  }

  for (let i = 1; i < m + 1; i++) {
    dp[0][i] = i;
  }

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (str1[i] === str2[j]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  return dp[n][m];
};

console.log(solution());
