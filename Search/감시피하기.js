const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
X S X X T
T X S X X
X X X X X
X T X X X
X X T X X`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const map = Array.from(new Array(N), () => new Array());
  const teachers = [];
  let result = false;

  // map 초기화
  for (let i = 0; i < N; i++) {
    const data = input().split(" ");
    map[i] = data;

    for (let j = 0; j < N; j++) {
      if (map[i][j] === "T") {
        teachers.push([i, j]);
      }
    }
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const onProcess = () => {
    // 장애물 설치 후 학생이 감지되는지 확인
    for (let i = 0; i < teachers.length; i++) {
      const [x, y] = teachers[i];

      // 4가지 방향으로 감지
      for (let dir = 0; dir < 4; dir++) {
        let nx = x + dx[dir];
        let ny = y + dy[dir];

        while (true) {
          if (nx < 0 || ny < 0 || nx >= N || ny >= N) break;

          if (map[nx][ny] === "S") {
            return true;
          } else if (map[nx][ny] === "O" || map[nx][ny] === "T") {
            break;
          }

          nx += dx[dir];
          ny += dy[dir];
        }
      }
    }

    return false;
  };

  const dfs = (cnt) => {
    if (cnt === 3) {
      const flag = onProcess();

      if (flag === false) {
        // 학생을 못찾은 경우
        result = true;
      }

      return;
    }

    // 장애물 세우기
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] !== "X") continue;

        map[i][j] = "O";
        dfs(cnt + 1);
        map[i][j] = "X";
      }
    }
  };

  dfs(0);

  return result === true ? "YES" : "NO";
};

console.log(solution());
