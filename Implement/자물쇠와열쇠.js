// 2차원 배열 90도 회전 함수
const rotation90degreeKey = (key) => {
  const len = key.length;
  const rotation = Array.from(new Array(len), () => new Array(len).fill(0));

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      rotation[i][j] = key[len - j - 1][i];
    }
  }

  return rotation;
};

const isAnswer = (newLock) => {
  const len = Math.floor(newLock.length / 3);

  for (let i = len; i < len * 2; i++) {
    for (let j = len; j < len * 2; j++) {
      if (newLock[i][j] !== 1) {
        return false;
      }
    }
  }

  return true;
};

const solution = (key, lock) => {
  const N = lock.length;
  const M = key.length;

  // 2차원 배열 확장
  const newLock = Array.from(new Array(N * 3), () => new Array(N * 3).fill(0));

  // 중앙값 초기화
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      newLock[i + N][j + N] = lock[i][j];
    }
  }

  let dir = 4;
  while (dir--) {
    key = rotation90degreeKey(key);

    for (let x = 0; x < N * 2; x++) {
      for (let y = 0; y < N * 2; y++) {
        for (let i = 0; i < M; i++) {
          for (let j = 0; j < M; j++) {
            newLock[x + i][y + j] += key[i][j];
          }
        }

        if (isAnswer(newLock) === true) {
          return true;
        }

        for (let i = 0; i < M; i++) {
          for (let j = 0; j < M; j++) {
            newLock[x + i][y + j] -= key[i][j];
          }
        }
      }
    }
  }

  return false;
};

const key = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 1],
];
const lock = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];

console.log(solution(key, lock));
