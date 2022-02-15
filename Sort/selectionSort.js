const selectionSort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    let minNumberIndex = i;

    for (let j = minNumberIndex; j < array.length; j++) {
      if (array[minNumberIndex] > array[minNumberIndex + 1]) {
        minNumberIndex = j;
      }
    }

    if (minNumberIndex !== i) {
      [array[i], array[minNumberIndex]] = [array[minNumberIndex], array[i]];
    }
  }

  return array;
};

const array = [2, 1, 5, 4, 3];
console.log(selectionSort(array));
