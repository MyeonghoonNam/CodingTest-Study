const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `a1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const MAX_POS = 8;
  const MIN_POS = 1;
  const [startYPos, startXPos] = input().split("");
  let result = 0;

  let curXPos = Number(startXPos);
  let curYPos = Number(startYPos.charCodeAt()) - (Number("a".charCodeAt()) - 1);

  const dx = [1, -1, 1, -1, -2, -2, 2, 2];
  const dy = [2, 2, -2, -2, 1, -1, 1, -1];

  for (let i = 0; i < dx.length; i++) {
    let nx = curXPos + dx[i];
    let ny = curYPos + dy[i];

    if (!checkRange(nx, ny, MAX_POS, MIN_POS)) continue;

    result++;
  }

  return result;
};

const checkRange = (x, y, max, min) => {
  return x < min || y < min || x > max || y > max ? false : true;
};

console.log(solution());
