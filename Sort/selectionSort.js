const selectionSort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    let minNumberIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[minNumberIndex] > array[j]) {
        minNumberIndex = j;
      }
    }

    if (minNumberIndex !== i) {
      [array[i], array[minNumberIndex]] = [array[minNumberIndex], array[i]];
    }
  }

  return array;
};

const array = [
  710, 509, 733, 224, 654, 154, 474, 166, 699, 102, 72, 272, 176, 450, 390, 217,
  928, 641, 210, 892,
];
console.log(selectionSort(array));
