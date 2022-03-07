// // 탑다운 방식

// // 메모이제이션
// const dp = [];

// // 탑다운 방식
// const fibonacci = (n) => {
//   if (n === 1 || n === 2) return 1;

//   if (!dp[n]) {
//     dp[n] = fibonacci(n - 1) + fibonacci(n - 2);
//   }

//   return dp[n];
// };

// console.log(fibonacci(4));

// -------------------------------------

// 바텁업 방식
const fibonacci = (n) => {
  // DP 테이블 초기화
  const dp = [];
  dp[0] = 0;
  dp[1] = dp[2] = 1;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

console.log(fibonacci(4));
