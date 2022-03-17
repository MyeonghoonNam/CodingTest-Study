const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8 5
1 5 4 3 2 4 5 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const balls = input().split(" ").map(Number);
  const ballCount = new Array(M + 1).fill(0);
  let result = 0;

  for (let i = 0; i < N; i++) {
    const ballNumber = balls[i];

    ballCount[ballNumber]++;
  }

  let totalBallCount = N;
  for (let i = 1; i <= M; i++) {
    const count = ballCount[i];

    totalBallCount -= count;
    result += count * totalBallCount;
  }

  return result;
};

console.log(solution());
