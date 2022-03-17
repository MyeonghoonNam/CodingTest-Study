const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `02984`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const S = input().split("").map(Number);
  let result = S[0];

  for (let i = 1; i < S.length; i++) {
    num = S[i];

    if (num <= 1 || result <= 1) {
      result += num;
    } else {
      result *= num;
    }
  }

  return result;
};

console.log(solution());
