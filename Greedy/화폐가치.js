const solution = (money, costs) => {
  const UNIT = [1, 5, 10, 50, 100, 500];

  costs = costs.map((cost, i) => [UNIT[i], cost, cost / UNIT[i]]);
  costs.sort((a, b) => a[2] - b[2]);

  let result = 0;

  costs.forEach(([unit, cost]) => {
    const count = parseInt(money / unit);

    result += count * cost;
    money -= count * unit;
  });

  return result;
};

const money = 1999; // 생산해야 하는 금액
const costs = [2, 11, 20, 100, 200, 600]; // [1,5,10,50,100,500] 생산 단가
console.log(solution(money, costs));
