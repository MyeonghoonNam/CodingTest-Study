class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size--;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
5
1 5
1 3
1 2
1 6
1 7
4
8 D
10 D
11 D
13 L`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const K = Number(input());
  const map = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));

  // 사과 위치 정보
  for (let i = 0; i < K; i++) {
    const [x, y] = input().split(" ").map(Number);
    map[x][y] = 1;
  }

  // 뱀의 방향 변환 정보
  const L = Number(input());
  const dirInfo = [];

  for (let i = 0; i < L; i++) {
    const [X, C] = input().split(" ");
    dirInfo.push([Number(X), C]);
  }

  // 처음 머리 방향이 동이므로 동,남,서,북
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  let x = 1;
  let y = 1;
  map[x][y] = 2; // 뱀의 위치 초기값
  let direction = 0; // 동
  let dirIdx = 0; // 방향 인덱스
  let time = 0; // 게임 경과시간

  const queue = new Queue();
  queue.enqueue({ x, y }); // 뱀의 초기 위치 정보

  while (true) {
    const nx = x + dx[direction];
    const ny = y + dy[direction];

    // 맵의 유효범위이고 뱀의 몸통이 없는 위치
    if (checkMapRange(nx, ny, N) && map[nx][ny] !== 2) {
      // 사과가 없다면
      if (map[nx][ny] !== 1) {
        const { x, y } = queue.dequeue();

        map[nx][ny] = 2;
        map[x][y] = 0;
      } else {
        // 사과가 있다면
        map[nx][ny] = 2;
      }

      queue.enqueue({ x: nx, y: ny });
    } else {
      // 벽이거나 뱀의 몸통에 닿는 경우
      time++;
      break;
    }

    // 행동 후 방향과 시간 업데이트 지정
    time++;
    x = nx;
    y = ny;
    if (dirIdx < L && time === dirInfo[dirIdx][0]) {
      direction = turn(direction, dirInfo[dirIdx][1]);
      dirIdx++;
    }
  }

  return time;
};

const turn = (direction, mod) => {
  if (mod === "L") {
    if (direction === 0) {
      direction = 3;
    } else {
      direction -= 1;
    }
  } else {
    // mod === D
    if (direction === 3) {
      direction = 0;
    } else {
      direction += 1;
    }
  }

  return direction;
};

const checkMapRange = (x, y, maxLength) => {
  if (x >= 1 && x <= maxLength && y >= 1 && y <= maxLength) return true;
  else return false;
};

console.log(solution());
