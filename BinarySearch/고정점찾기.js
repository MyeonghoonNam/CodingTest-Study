const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
-15 -4 3 8 9 13 15`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const binarySearch = (arr, length) => {
  let start = 0;
  let end = length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] === mid) return mid;

    if (arr[mid] > mid) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};

const solution = () => {
  const N = Number(input());
  const arr = input().split(" ").map(Number);
  const result = binarySearch(arr, N);

  return result;
};

console.log(solution());
