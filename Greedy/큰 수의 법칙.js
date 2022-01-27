const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 8 3
2 4 5 4 6`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 입력 제한 10,000의 경우
const solution = () => {
  let [N, M, K] = input().split(" ").map(Number);
  let numberArray = input().split(" ").map(Number);

  numberArray.sort((a, b) => a - b);

  const firstBigNumber = numberArray[N - 1];
  const secondBigNumber = numberArray[N - 2];
  let result = 0;

  while (M > 0) {
    for (let i = 0; i < K; i++) {
      result += firstBigNumber;
      M -= 1;
    }

    if (M === 0) break;

    result += secondBigNumber;
    M -= 1;
  }

  return result;
};

console.log(solution());
