const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
1 2 3 4 5 6
2 1 1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = input().split(" ").map(Number);
  const operator = input().split(" ").map(Number);

  let maxValue = Number.MIN_SAFE_INTEGER;
  let minValue = Number.MAX_SAFE_INTEGER;

  const dfs = (cnt, value) => {
    if (cnt === N) {
      maxValue = Math.max(maxValue, value);
      minValue = Math.min(minValue, value);

      return;
    }

    for (let i = 0; i < operator.length; i++) {
      if (operator[i] > 0) {
        operator[i]--;

        switch (i) {
          case 0:
            dfs(cnt + 1, value + numbers[cnt]);
            break;
          case 1:
            dfs(cnt + 1, value - numbers[cnt]);
            break;
          case 2:
            dfs(cnt + 1, value * numbers[cnt]);
            break;
          case 3:
            dfs(cnt + 1, parseInt(value / numbers[cnt]));
            break;
        }

        operator[i]++;
      }
    }
  };

  dfs(1, numbers[0]);

  const result = [maxValue, minValue].join("\n");
  return result;
};

// const permutation = (arr, r) => {
//   const selected = new Array(arr.length).fill(false);
//   const result = [];
//   const temp = [];
//   const dfs = (cnt) => {
//     if (cnt === r) {
//       result.push([...temp]);
//       return;
//     }

//     for (let i = 0; i < arr.length; i++) {
//       if (selected[i] === true) continue;

//       selected[i] = true;
//       temp.push(arr[i]);
//       dfs(cnt + 1);
//       temp.pop();
//       selected[i] = false;
//     }
//   };

//   dfs(0);

//   return result;
// };

// 순열 활용
// const solution = () => {
//   const N = Number(input());
//   const numbers = input().split(" ").map(Number);
//   const operatorCount = input().split(" ").map(Number);
//   const operator = [];
//   let minValue = Number.MAX_SAFE_INTEGER;
//   let maxValue = Number.MIN_SAFE_INTEGER;

//   const [plus, minus, mul, division] = operatorCount;
//   for (let i = 0; i < plus; i++) {
//     operator.push("+");
//   }
//   for (let i = 0; i < minus; i++) {
//     operator.push("-");
//   }
//   for (let i = 0; i < mul; i++) {
//     operator.push("*");
//   }
//   for (let i = 0; i < division; i++) {
//     operator.push("/");
//   }

//   const cases = permutation(operator, operator.length);

//   for (let i = 0; i < cases.length; i++) {
//     const data = cases[i];
//     let value = numbers[0];

//     for (let j = 0; j < data.length; j++) {
//       const op = data[j];

//       switch (op) {
//         case "+":
//           value += numbers[j + 1];
//           break;
//         case "-":
//           value -= numbers[j + 1];
//           break;
//         case "*":
//           value *= numbers[j + 1];
//           break;
//         case "/":
//           if (value < 0) {
//             value = -Math.floor(Math.abs(value) / numbers[j + 1]);
//           } else {
//             value = Math.floor(value / numbers[j + 1]);
//           }
//           break;
//       }
//     }

//     minValue = Math.min(minValue, value);
//     maxValue = Math.max(maxValue, value);
//   }

//   const result = [maxValue, minValue].join("\n");

//   return result;
// };

console.log(solution());
