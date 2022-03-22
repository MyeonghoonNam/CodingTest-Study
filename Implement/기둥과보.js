const isPossible = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const { x, y, stuff } = arr[i];

    if (stuff === 0) {
      // 기둥
      if (
        y === 0 ||
        findStuff(arr, x - 1, y, 1) ||
        findStuff(arr, x, y, 1) ||
        findStuff(arr, x, y - 1, 0)
      )
        continue;
      return false;
    } else {
      // 보
      if (
        findStuff(arr, x, y - 1, 0) ||
        findStuff(arr, x + 1, y - 1, 0) ||
        (findStuff(arr, x - 1, y, 1) && findStuff(arr, x + 1, y, 1))
      )
        continue;
      return false;
    }
  }

  return true;
};

const destroyStuff = (arr, x, y, stuff) => {
  let temp = [...arr];

  temp = temp.filter((el) => {
    return !(el.x === x && el.y === y && el.stuff === stuff);
  });

  return temp;
};

const findStuff = (arr, x, y, stuff) => {
  for (let i = 0; i < arr.length; i++) {
    const find = arr[i];

    if (find.x === x && find.y === y && find.stuff === stuff) return true;
  }

  return false;
};

const solution = (n, build_frame) => {
  let result = [];

  build_frame.forEach((frame) => {
    const [x, y, stuff, operate] = frame;

    if (operate === 0) {
      // 삭제 연산
      result = destroyStuff(result, x, y, stuff);

      if (!isPossible(result)) {
        result.push({ x, y, stuff });
      }
    } else {
      // 설치 연산
      result.push({ x, y, stuff });

      if (!isPossible(result)) {
        result = destroyStuff(result, x, y, stuff);
      }
    }
  });

  result = result
    .sort((a, b) => a.x - b.x || a.y - b.y || a.stuff - b.stuff)
    .map((el) => [el.x, el.y, el.stuff]);

  return result;
};

const n = 5;
const build_frame = [
  [0, 0, 0, 1],
  [2, 0, 0, 1],
  [4, 0, 0, 1],
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [2, 1, 1, 1],
  [3, 1, 1, 1],
  [2, 0, 0, 0],
  [1, 1, 1, 0],
  [2, 2, 0, 1],
];

console.log(solution(n, build_frame));
