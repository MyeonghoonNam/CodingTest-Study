const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
      } else {
        break;
      }
    }
  }

  return array;
};

const arr = [3, 7, 2, 5, 1, 4];

console.log(insertionSort(arr));
