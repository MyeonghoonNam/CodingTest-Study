const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `21 8`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let [N, K] = input().split(" ").map(Number);
  let result = 0;

  while (true) {
    // 나누어 떨어지는 숫자가 될 때까지 1씩 빼기
    let targetNumber = Math.floor(N / K) * K;

    result += N - targetNumber;
    N = targetNumber;

    // N이 K 보다 작아 나눗셈이 더 이상 불가능한 경우 반복문을 탈출
    if (N < K) break;

    N = Math.floor(N / K);
    result += 1;
  }

  result += N - 1;

  return result;
};

console.log(solution());
