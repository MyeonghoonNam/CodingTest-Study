const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `AJKDLSI412K4JSJ9D`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const S = input();
  const string = [];
  let sumNumber = 0;

  for (let i = 0; i < S.length; i++) {
    const char = S[i];

    if (isNaN(char)) {
      string.push(char);
      continue;
    }

    sumNumber += Number(char);
  }

  string.sort();

  const result = `${string.join("")}${sumNumber}`;

  return result;
};

console.log(solution());
