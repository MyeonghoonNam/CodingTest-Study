const bubbleSort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    let isSwap = false;

    for (let j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        isSwap = true;
      }
    }

    if (!isSwap) break;
  }

  return array;
};

const arr = [2, 4, 1, 3, 5];
console.log(bubbleSort(arr));
