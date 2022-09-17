const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 6
19 15 10 17`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const food = input().split(" ").map(Number);
  const result = binarySearch(food, N, M);

  return result;
};

const binarySearch = (food, N, M) => {
  let start = 0;
  let end = Math.max(...food);
  let result = 0;

  while (start <= end) {
    const mid = parseInt((start + end) / 2);
    let sum = 0;

    for (let i = 0; i < N; i++) {
      if (food[i] > mid) {
        sum += food[i] - mid;
      }
    }

    if (sum < M) {
      end = mid - 1;
    } else {
      start = mid + 1;
      result = mid;
    }
  }

  return result;
};

console.log(solution());
