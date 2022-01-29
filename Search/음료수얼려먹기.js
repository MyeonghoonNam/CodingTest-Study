const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `15 14
00000111100000
11111101111110
11011101101110
11011101100000
11011111111111
11011111111100
11000000011111
01111111111111
00000000011111
01111111111000
00011111111000
00000001111000
11111111110011
11100011111111
11100011111111`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const initGraph = () => {
    const map = new Array(N);

    for (let i = 0; i < N; i++) {
      map[i] = input().split("").map(Number);
    }

    return map;
  };

  const dfs = (x, y) => {
    if (!checkRange(x, y) || graph[x][y] === 1) return false;

    if (!visited[x][y]) {
      visited[x][y] = true;

      // 상, 하, 좌, 우 탐색
      dfs(x - 1, y);
      dfs(x + 1, y);
      dfs(x, y - 1);
      dfs(x, y + 1);

      return true;
    }
  };

  const checkRange = (x, y) => {
    const validation = x >= 0 && y >= 0 && x < N && y < M ? true : false;

    return validation;
  };

  const [N, M] = input().split(" ").map(Number);
  const graph = initGraph();
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));
  let result = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (dfs(i, j)) {
        result++;
      }
    }
  }

  return result;
};

console.log(solution());
