const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
3 2 1 1 9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const coins = input().split(" ").map(Number);
  let result = 1;

  coins.sort((a, b) => a - b);

  for (let i = 0; i < N; i++) {
    const coin = coins[i];

    if (result < coin) {
      break;
    } else {
      result += coin;
    }
  }

  return result;
};

console.log(solution());
