const countingSort = (array) => {
  const maxValue = Math.max(...array);
  const countedArray = new Array(maxValue + 1).fill(0);
  const sortedArray = [];

  for (let i = 0; i < array.length; i++) {
    countedArray[array[i]]++;
  }

  for (let i = 0; i < countedArray.length; i++) {
    for (let j = 0; j < countedArray[i]; j++) {
      sortedArray.push(i);
    }
  }

  return sortedArray;
};

const array = [5, 4, 3, 2, 1, 1, 1, 1, 3, 4, 5, 5, 2, 2, 2];
console.log(countingSort(array));
