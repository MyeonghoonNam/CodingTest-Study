const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  let result = 0;

  for (let h = 0; h < N + 1; h++) {
    for (let m = 0; m < 60; m++) {
      for (let s = 0; s < 60; s++) {
        const time = `${h}${m}${s}`;

        if (time.includes("3")) {
          result++;
        }
      }
    }
  }

  return result;
};

console.log(solution());
