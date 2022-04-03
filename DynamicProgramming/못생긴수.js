const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const ugly = new Array(N);
  ugly[0] = 1;

  let i2 = (i3 = i5 = 0);
  let [next2, next3, next5] = [2, 3, 5];

  for (let i = 1; i < N; i++) {
    ugly[i] = Math.min(next2, next3, next5);

    if (ugly[i] === next2) {
      i2 += 1;
      next2 = ugly[i2] * 2;
    }

    if (ugly[i] === next3) {
      i3 += 1;
      next3 = ugly[i3] * 3;
    }

    if (ugly[i] === next5) {
      i5 += 1;
      next5 = ugly[i5] * 5;
    }
  }

  return ugly[N - 1];
};

console.log(solution());
