const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8 8
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const map = Array.from(new Array(N), () => new Array());
  const temp = Array.from(new Array(N), () => new Array()); // 벽 설치한 뒤의 맵
  let result = 0;

  for (let i = 0; i < N; i++) {
    const data = input().split(" ").map(Number);
    map[i] = data;
  }

  // 상,하,좌,우
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const virus = (x, y) => {
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (checkRange(nx, ny) && temp[nx][ny] === 0) {
        temp[nx][ny] = 2;
        virus(nx, ny);
      }
    }
  };

  const getSafeArea = () => {
    let sum = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (temp[i][j] === 0) {
          sum += 1;
        }
      }
    }

    return sum;
  };

  const buildWall = (cnt = 0) => {
    // 벽이 3개인 경우
    if (cnt === 3) {
      // 맵 복사
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          temp[i][j] = map[i][j];
        }
      }

      // 바이러스 전파
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (temp[i][j] === 2) {
            virus(i, j);
          }
        }
      }

      // 안전영역
      result = Math.max(result, getSafeArea());
      return;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === 0) {
          map[i][j] = 1;
          cnt += 1;
          buildWall(cnt);
          map[i][j] = 0;
          cnt -= 1;
        }
      }
    }
  };

  const checkRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  buildWall();

  return result;
};

console.log(solution());
