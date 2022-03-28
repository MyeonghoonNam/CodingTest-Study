// 목표: 실패율 구하기
// 실패율 : 스테이지 도달했지만 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
// return : 실패율 높은 스테이지부터 내림차순으로 스테이지 번호 담긴 배열, 실패율이 같으면 작은 번호 스테이지가 먼저(번호 오름차순)
// 해당 스테이지에 도달한 유저 없으면 실패율 0
const solution = (N, stages) => {
  const failureRate = [];
  let countStagePeople = stages.length;

  for (let i = 1; i < N + 1; i++) {
    const countFailPeople = getCountFailPeople(i, stages);

    if (countFailPeople === 0) {
      failureRate.push([0, i]);
    } else {
      failureRate.push([countFailPeople / countStagePeople, i]);
    }

    countStagePeople -= countFailPeople;
  }

  failureRate.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

  const result = failureRate.map((el) => el[1]);

  return result;
};

const getCountFailPeople = (num, stages) => {
  const count = stages.filter((el) => el === num).length;

  return count;
};

const N = 4;
const stages = [4, 4, 4, 4, 4];

console.log(solution(N, stages));
