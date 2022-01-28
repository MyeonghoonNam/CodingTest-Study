const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
R R R U D D`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const movePlans = input().split(" ");
  const moveTypes = ["U", "D", "L", "R"];
  let xPos = 1;
  let yPos = 1;

  // U, D, L, R
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  movePlans.forEach((planDir) => {
    let nx = 0;
    let ny = 0;

    moveTypes.forEach((typeDir, index) => {
      if (planDir === typeDir) {
        nx = xPos + dx[index];
        ny = yPos + dy[index];
      }
    });

    if (!checkRange(nx, ny, N)) return;

    xPos = nx;
    yPos = ny;
  });

  return `${xPos} ${yPos}`;
};

const checkRange = (x, y, size) => {
  if (x < 1 || y < 1 || x > size || y > size) return false;
  else return true;
};

console.log(solution());
