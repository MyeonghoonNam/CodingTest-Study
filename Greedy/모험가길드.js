const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
2 3 1 2 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const guild = input().split(" ").map(Number);
  let result = 0; // group
  let count = 0; // person

  guild.sort((a, b) => a - b);

  guild.forEach((person) => {
    count++;

    if (count >= person) {
      result++;
      count = 0;
    }
  });

  return result;
};

console.log(solution());
