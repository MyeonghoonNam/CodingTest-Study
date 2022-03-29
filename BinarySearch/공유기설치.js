const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 3
1
2
8
4
9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const binarySearch = (home, count, length) => {
  let start = 1; // 최소 간격
  let end = home[length - 1] - home[0]; // 최대 간격
  let result = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let value = home[0];
    let currentCount = 1;

    for (let i = 1; i < length; i++) {
      if (home[i] >= value + mid) {
        value = home[i];
        currentCount++;
      }
    }

    if (currentCount >= count) {
      result = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return result;
};

const solution = () => {
  const [N, C] = input().split(" ").map(Number);
  const home = [];

  for (let i = 0; i < N; i++) {
    home.push(Number(input()));
  }

  home.sort((a, b) => a - b);

  const result = binarySearch(home, C, N);

  return result;
};

console.log(solution());
