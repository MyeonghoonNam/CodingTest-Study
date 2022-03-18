const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7755`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = input();
  const midIdx = Math.floor(N.length / 2);
  let prefix = 0;
  let suffix = 0;

  for (let i = 0; i < midIdx; i++) {
    prefix += Number(N[i]);
  }

  for (let i = midIdx; i < N.length; i++) {
    suffix += Number(N[i]);
  }

  const result = prefix === suffix ? "LUCKY" : "READY";

  return result;
};

console.log(solution());
