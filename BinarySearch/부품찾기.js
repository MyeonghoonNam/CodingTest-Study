const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
8 3 7 9 2
3
5 7 9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const products = input().split(" ").map(Number);
  const M = Number(input());
  const customerDesiredProduct = input().split(" ").map(Number);

  products.sort((a, b) => a - b);

  const result = binarySearch(products, customerDesiredProduct);

  return result;
};

const binarySearch = (products, customerDesiredProduct) => {
  const result = [];

  customerDesiredProduct.forEach((target) => {
    let start = 0;
    let end = products.length - 1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);

      if (products[mid] === target) {
        result.push("yes");
        return;
      } else if (products[mid] > target) {
        end = mid - 1;
      } else if (products[mid] < target) {
        start = mid + 1;
      }
    }

    result.push("no");
  });

  return result.join(" ");
};

console.log(solution());
