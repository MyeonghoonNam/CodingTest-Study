const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 4
1 1 0
1 1 1 1
1 0 0 1
0 0 1 1
1 1 1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  // 반시계 방향 90도 회전 좌, 하, 우, 상 방향으로 계속 순회
  // 가보지않은 칸이 있다면 회전 후 전진 없다면 회전만 수행
  // 네 방향 모두 가본 칸이라면 바라보는 방향을 유지한채 한 칸 뒤로 이동
  const [N, M] = input().split(" ").map(Number);
  let [xPos, yPos, direction] = input().split(" ").map(Number);
  const map = initMap(N, M);
  const checkVisitedMap = initCheckVisitedMap(N, M);
  checkVisitedMap[xPos][yPos] = 1;

  // 북, 동, 남, 서
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  let result = 1;
  let turnTime = 0;
  while (true) {
    direction = turnLeft(direction);

    let nx = xPos + dx[direction];
    let ny = yPos + dy[direction];

    if (checkRange(nx, ny, N, M)) {
      if (checkVisitedMap[nx][ny] === 0 && map[nx][ny] === 0) {
        checkVisitedMap[nx][ny] = 1;
        xPos = nx;
        yPos = ny;
        result++;
        turnTime = 0;
        continue;
      }
    }

    turnTime++;

    if (turnTime === 4) {
      nx = xPos - dx[direction];
      ny = yPos - dy[direction];

      if (checkRange(nx, ny, N, M)) {
        if (map[nx][ny] === 0) {
          // 육지인 경우
          xPos = nx;
          yPos = ny;
        } else {
          break;
        }
      }

      turnTime = 0;
    }
  }

  return result;
};

const initMap = (row, column) => {
  const map = Array.from(new Array(row), () => new Array(column));

  map.forEach((_, idx, temp) => {
    temp[idx] = input().split(" ").map(Number);
  });

  return map;
};

const initCheckVisitedMap = (row, column) => {
  const map = Array.from(new Array(row), () => new Array(column).fill(0));

  return map;
};

const turnLeft = (dir) => {
  dir -= 1;

  if (dir === -1) {
    dir = 3;
  }

  return dir;
};

const checkRange = (x, y, xMax, yMax) => {
  return x >= 0 && y >= 0 && x < xMax && y < yMax ? true : false;
};

console.log(solution());
