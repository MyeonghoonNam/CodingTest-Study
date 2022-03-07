const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 4
3
5
7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const coins = [];

  for (let i = 0; i < N; i++) {
    const coin = Number(input());
    coins.push(coin);
  }

  const dp = new Array(M + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < N; i++) {
    for (let j = coins[i]; j <= M; j++) {
      if (dp[j - coins[i]] !== Infinity) {
        dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
      }
    }
  }

  if (dp[M] === Infinity) {
    return -1;
  } else {
    return dp[M];
  }
};

console.log(solution());
