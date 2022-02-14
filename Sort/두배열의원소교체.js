const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 3
1 2 5 4 3
5 5 6 6 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const arrA = input()
    .split(" ")
    .sort((a, b) => a - b)
    .map(Number);
  const arrB = input()
    .split(" ")
    .sort((a, b) => b - a)
    .map(Number);

  for (let i = 0; i < K; i++) {
    if (arrA[i] < arrB[i]) {
      arrA[i] = arrB[i];
    }
  }

  const result = arrA.reduce((acc, cur) => acc + cur, 0);

  return result;
};

console.log(solution());
