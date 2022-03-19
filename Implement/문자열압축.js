function solution(s) {
  let result = s.length;

  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    let compressed = "";
    let prev = s.slice(0, i);
    let count = 1;

    for (let j = i; j <= s.length; j += i) {
      const current = s.slice(j, j + i);

      if (prev === current) {
        count++;
      } else {
        if (count === 1) {
          compressed += prev;
        } else {
          compressed += count.toString() + prev;
        }

        count = 1;
        prev = current;
      }
    }

    if (count === 1) {
      compressed += prev;
    } else {
      compressed += count.toString() + prev;
    }

    result = Math.min(result, compressed.length);
  }

  return result;
}

const s = "xababcdcdababcdcd";

console.log(solution(s));
