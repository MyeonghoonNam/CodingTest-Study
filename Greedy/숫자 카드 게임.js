const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2 4
7 3 1 8
3 3 3 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const board = Array.from(new Array(N), () => new Array(M));
  let result = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    board[i] = input().split(" ").map(Number);
  }

  board.forEach((cards) => {
    const minNumberCard = Math.min(...cards);

    result = Math.max(result, minNumberCard);
  });

  return result;
};

console.log(solution());
