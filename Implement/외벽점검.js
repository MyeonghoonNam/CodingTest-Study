const permutation = (arr, r) => {
  const selected = new Array(arr.length).fill(false);
  const result = [];
  let temp = [];
  const dfs = (cnt) => {
    if (cnt === r) {
      result.push([...temp]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (selected[i] === true) continue;

      selected[i] = true;
      temp.push(arr[i]);
      dfs(cnt + 1);
      temp.pop();
      selected[i] = false;
    }
  };

  dfs(0);

  return result;
};

const solution = (n, weak, dist) => {
  const weakLength = weak.length;

  for (let i = 0; i < weakLength; i++) {
    // 길이를 2배로 늘려 양방향성의 문제를 단일방향의 문제로 변형
    weak.push(weak[i] + n);
  }

  let result = dist.length + 1; // 최솟값 설정을 위해 가장 큰 값으로 초기화

  // 0부터 weakLength - 1 까지의 위치를 시작점으로 지정
  for (let start = 0; start < weakLength; start++) {
    // 친구를 나열하는 모든 경우의 수를 탐색(순열)
    const list = permutation(dist, dist.length);

    list.forEach((friends) => {
      let count = 1; // 투입할 친구의 수
      let position = weak[start] + friends[count - 1]; // 해당 친구가 점검가능한 마지막 위치

      // 시작점 부터 모든 취약 지점 확인
      for (let i = start; i < start + weakLength; i++) {
        // 점검할 수 있는 위치를 벗어나는 경우
        if (position < weak[i]) {
          count += 1; // 친구추가

          if (count > dist.length) break;

          position = weak[i] + friends[count - 1];
        }
      }

      result = Math.min(result, count);
    });
  }

  return result > dist.length ? -1 : result;
};

const n = 12;
const weak = [1, 3, 4, 9, 10];
const dist = [3, 5, 7];

console.log(solution(n, weak, dist));
