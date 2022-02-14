const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
15
27
12`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numberArray = [];

  for (let i = 0; i < N; i++) {
    numberArray.push(Number(input()));
  }

  numberArray.sort((a, b) => b - a);

  return numberArray.join(" ");
};

console.log(solution());
