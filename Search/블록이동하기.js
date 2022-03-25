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
    if (this.size === 0) return;

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

const makeNewBoard = (board) => {
  // 헬기의 이동 위치 범위를 편리하게 접근하기 위해 기존 board의 테두리에 벽을 두른다.
  const N = board.length;
  const newBoard = Array.from(new Array(N + 2), () => new Array(N + 2).fill(1));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      newBoard[i + 1][j + 1] = board[i][j];
    }
  }

  return newBoard;
};

const getCasesNextPosition = (pos1, pos2, cost, board) => {
  const cases = [];

  const [x1, y1] = pos1;
  const [x2, y2] = pos2;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, 1, -1];

  // 회전 없이 이동하고자 하는 방향
  for (let i = 0; i < 4; i++) {
    const nx1 = x1 + dx[i];
    const ny1 = y1 + dy[i];

    const nx2 = x2 + dx[i];
    const ny2 = y2 + dy[i];

    if (board[nx1][ny1] === 0 && board[nx2][ny2] === 0) {
      cases.push({ pos1: [nx1, ny1], pos2: [nx2, ny2], cost: cost + 1 });
    }
  }

  const rotate = [-1, 1]; // 위, 아래로 회전

  for (let i = 0; i < rotate.length; i++) {
    const value = rotate[i];

    // 로봇이 가로인 경우 회전하는 경로
    if (x1 === x2) {
      // 위쪽, 아래쪽이 2칸이 모두 비어야 가능
      if (board[x1 + value][y1] === 0 && board[x2 + value][y2] === 0) {
        cases.push({ pos1: [x1, y1], pos2: [x1 + value, y1], cost: cost + 1 });
        cases.push({ pos1: [x2 + value, y2], pos2: [x2, y2], cost: cost + 1 });
      }
    } else {
      // 로봇이 세로인 경우 회전하는 경로
      // 왼쪽, 오른쪽 2칸이 모두 비어야 가능
      if (board[x1][y1 + value] === 0 && board[x2][y2 + value] === 0) {
        cases.push({ pos1: [x1, y1], pos2: [x1, y1 + value], cost: cost + 1 });
        cases.push({ pos1: [x2, y2 + value], pos2: [x2, y2], cost: cost + 1 });
      }
    }
  }

  return cases;
};

const solution = (board) => {
  const N = board.length;
  const goalPos = N.toString().repeat(2);
  const newBoard = makeNewBoard(board);

  const queue = new Queue();
  queue.enqueue({ pos1: [1, 1], pos2: [1, 2], cost: 0 }); // 헬기두칸좌표, cost

  const visited = new Set(["1112"]);

  while (!queue.isEmpty()) {
    const { pos1, pos2, cost } = queue.dequeue();

    if (pos1.join("") === goalPos || pos2.join("") === goalPos) return cost;

    const cases = getCasesNextPosition(pos1, pos2, cost, newBoard);

    for (let i = 0; i < cases.length; i++) {
      const next = cases[i];
      const { pos1: nextPos1, pos2: nextPos2 } = next;

      if (!visited.has(nextPos1.join("") + nextPos2.join(""))) {
        queue.enqueue(next);
        visited.add(nextPos1.join("") + nextPos2.join(""));
      }
    }
  }
};

const board = [
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0],
];

console.log(solution(board));
