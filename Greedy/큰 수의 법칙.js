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

// 입력 제한 10,000 이하의 경우
// const solution = () => {
//   let [N, M, K] = input().split(" ").map(Number);
//   let numberArray = input().split(" ").map(Number);

//   numberArray.sort((a, b) => a - b);

//   const firstBigNumber = numberArray[N - 1];
//   const secondBigNumber = numberArray[N - 2];
//   let result = 0;

//   while (M > 0) {
//     for (let i = 0; i < K; i++) {
//       result += firstBigNumber;
//       M -= 1;
//     }

//     if (M === 0) break;

//     result += secondBigNumber;
//     M -= 1;
//   }

//   return result;
// };

// -----------------------------------------------------------------------------------

// 입력 제한 100,000,000 이상의 경우
// 위의 풀이로는 시간 초과의 판정을 받게 되므로 좀 더 효율적인 방법을 찾아 시간복잡도를 줄여야한다.
const solution = () => {
  const [N, M, K] = input().split(" ").map(Number);
  const numberArr = input().split(" ").map(Number);

  numberArr.sort((a, b) => a - b);

  const firstBigNumber = numberArr[N - 1];
  const secondBigNumber = numberArr[N - 2];
  let result = 0;

  // 반복되는 수열을 파악하는 것이 핵심으로 이를 통해 가장 큰 수와 두번째로 큰 수의 등장 횟수를 유추해야한다.
  // 1. 반복되는 수열의 길이는 K + 1로 M / (K + 1)이 수열이 반복되는 횟수이다. 여기에 K를 곱하면 가장 큰 수가 등장하는 횟수이다.
  // ex) [6, 6, 6, 5], [6, 6, 6, 5] => 가장 큰 수 6의 등장 횟수는 6(M / (K + 1) * K)

  // 2. M이 1과 같이 K + 1로 나누어떨어지는 경우가 아닐 때의 예외처리가 필요하므로 이때는 M % (K + 1)을 통한 나머지 만큼 가장 큰 횟수만 추가로 더해줘야한다.

  // 3. 위의 1, 2를 통해 점화식을 유추할 수 있고 이를 통해 아래와 같이 가장 큰 수와, 두번째로 큰 수의 덧셈 횟수를 유추할 수 있다.

  const firstBigNumberSumCount = Math.floor(M / (K + 1)) * K + (M % (K + 1));
  const secondBigNumberSumCount = M - firstBigNumberSumCount;

  result += firstBigNumberSumCount * firstBigNumber;
  result += secondBigNumberSumCount * secondBigNumber;

  return result;
};

console.log(solution());
