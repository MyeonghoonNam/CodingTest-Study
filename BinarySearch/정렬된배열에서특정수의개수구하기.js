const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 2
1 1 2 2 2 2 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const findFirstIndex = (arr, target, length) => {
  let start = 0;
  let end = length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if ((mid === 0 || arr[mid - 1] < target) && arr[mid] === target) {
      return mid;
    }

    if (arr[mid] >= target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};

const findLastIndex = (arr, target, length) => {
  let start = 0;
  let end = length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if ((mid === length - 1 || arr[mid + 1] > target) && arr[mid] === target) {
      return mid;
    }

    if (arr[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};

const solution = () => {
  const [N, X] = input().split(" ").map(Number);
  const arr = input().split(" ").map(Number);

  const firstIdx = findFirstIndex(arr, X, N);

  if (firstIdx === -1) {
    return -1;
  }

  const lastIdx = findLastIndex(arr, X, N);
  const result = lastIdx - firstIdx + 1;

  return result;
};

console.log(solution());
