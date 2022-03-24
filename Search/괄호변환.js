const divideBalancedStrIndex = (str) => {
  let count = 0; // '(' 괄호의 숫자

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "(") {
      count++;
    } else {
      count--;
    }

    if (count === 0) {
      return i;
    }
  }
};

const checkProperStr = (str) => {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "(") {
      stack.push(char);
    } else {
      stack.pop(char);
    }
  }

  return stack.length === 0 ? true : false;
};

const solution = (p) => {
  let result = "";

  if (p === "") return result;

  const index = divideBalancedStrIndex(p);
  const u = p.slice(0, index + 1);
  const v = p.slice(index + 1);

  if (checkProperStr(u)) {
    result = u + solution(v);
  } else {
    result += "(";
    result += solution(v);
    result += ")";

    const temp = u.split("").slice(1, u.length - 1);

    for (let i = 0; i < temp.length; i++) {
      const char = temp[i];

      if (char === "(") {
        temp[i] = ")";
      } else {
        temp[i] = "(";
      }
    }

    result += temp.join("");
  }

  return result;
};

const p = "()))((()";
console.log(solution(p));
