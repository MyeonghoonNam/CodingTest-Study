const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1
1 2 0 2 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const combination = (arr, r) => {
  const selected = new Array(arr.length).fill(false);
  const result = [];
  const dfs = (idx, cnt) => {
    if (cnt === r) {
      const temp = [];

      for (let i = 0; i < arr.length; i++) {
        if (selected[i] === true) {
          temp.push(arr[i]);
        }
      }

      result.push(temp);
      return;
    }

    for (let i = idx; i < arr.length; i++) {
      if (selected[i] === true) continue;

      selected[i] = true;
      dfs(i + 1, cnt + 1);
      selected[i] = false;
    }
  };

  dfs(0, 0);

  return result;
};

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const house = [];
  const chicken = [];
  const getSum = (candidate) => {
    let result = 0;

    house.forEach(({ x: hx, y: hy }) => {
      let temp = Number.MAX_SAFE_INTEGER;

      candidate.forEach(({ x: cx, y: cy }) => {
        const dist = Math.abs(hx - cx) + Math.abs(hy - cy);
        temp = Math.min(temp, dist);
      });

      result += temp;
    });

    return result;
  };

  for (let i = 0; i < N; i++) {
    const data = input().split(" ").map(Number);

    for (let j = 0; j < N; j++) {
      if (data[j] === 1) {
        // 집
        house.push({ x: i, y: j });
      } else if (data[j] === 2) {
        // 치킨집
        chicken.push({ x: i, y: j });
      }
    }
  }

  const candidates = combination(chicken, M);
  let result = Number.MAX_SAFE_INTEGER;

  candidates.forEach((candidate) => {
    result = Math.min(result, getSum(candidate));
  });

  return result;
};

console.log(solution());
