// 메모이제이션
const dp = [];

// 탑다운 방식
const fibonacci = (n) => {
  if (n === 1 || n === 2) return 1;

  if (!dp[n]) {
    dp[n] = fibonacci(n - 1) + fibonacci(n - 2);
  }

  return dp[n];
};

console.log(fibonacci(4));
