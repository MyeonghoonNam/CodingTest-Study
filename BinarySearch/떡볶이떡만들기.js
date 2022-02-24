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
  const array = input().split(" ").map(Number);
  const result = binarySearch(array, N, M);

  return result;
};

const binarySearch = (array, count, length) => {
  let start = 0;
  let end = Math.max(...array);
  let maxHeight = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let totalLength = 0;

    for (let i = 0; i < count; i++) {
      if (array[i] > mid) {
        totalLength += array[i] - mid;
      }
    }

    if (totalLength < length) {
      end = mid - 1;
    } else {
      maxHeight = mid;
      start = mid + 1;
    }
  }

  return maxHeight;
};

console.log(solution());
