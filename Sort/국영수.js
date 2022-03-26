const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `12
Junkyu 50 60 100
Sangkeun 80 60 50
Sunyoung 80 70 100
Soong 50 60 90
Haebin 50 60 100
Kangsoo 60 80 100
Donghyuk 80 60 100
Sei 70 70 70
Wonseob 70 70 90
Sanghyun 70 70 80
nsj 80 80 80
Taewhan 50 60 90`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  // 국어 점수 내림
  // 영어 점수 오름
  // 수학 점수 내림
  // 이름 오름
  const N = Number(input());
  const score = new Array(N);

  for (let i = 0; i < N; i++) {
    const student = input()
      .split(" ")
      .map((el) => (Number(el) ? Number(el) : el));
    score.push(student);
  }

  score.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    else if (a[1] < b[1]) return 1;
    else {
      if (a[2] > b[2]) return 1;
      else if (a[2] < b[2]) return -1;
      else {
        if (a[3] > b[3]) return -1;
        else if (a[3] < b[3]) return 1;
        else {
          if (a[0] > b[0]) return 1;
          else if (a[0] < b[0]) return -1;
          else return 0;
        }
      }
    }
  });

  const result = [];

  score.forEach((student) => {
    result.push(student[0]);
  });

  return result.join("\n");
};

console.log(solution());
