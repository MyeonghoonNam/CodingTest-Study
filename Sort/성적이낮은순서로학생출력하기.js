const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
홍길동 95
이순신 77
`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const studentsGradeInfos = [];
  let result = [];

  for (let i = 0; i < N; i++) {
    studentsGradeInfos.push(input().split(" "));
  }

  studentsGradeInfos.sort((a, b) => a[1] - b[1]);

  studentsGradeInfos.forEach((studentGradeInfo) => {
    const name = studentGradeInfo[0];

    result.push(name);
  });

  return result.join(" ");
};

console.log(solution());
