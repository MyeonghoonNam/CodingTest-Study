const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
5 1 7 9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const antenna = input().split(" ").map(Number);

  antenna.sort((a, b) => a - b);

  const midIdx = Math.floor((N - 1) / 2);
  const result = antenna[midIdx];

  return result;
};

console.log(solution());
