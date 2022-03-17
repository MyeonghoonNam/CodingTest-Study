const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `11101101`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const S = input().split("").map(Number);
  let zeroCount = 0;
  let oneCount = 0;

  if (S[0] === 1) {
    zeroCount++;
  } else {
    oneCount++;
  }

  for (let i = 0; i < S.length - 1; i++) {
    const num = S[i];
    const nextNum = S[i + 1];

    if (num !== nextNum) {
      if (nextNum === 1) {
        zeroCount++;
      } else {
        oneCount++;
      }
    }
  }

  const result = Math.min(zeroCount, oneCount);

  return result;
};

console.log(solution());
