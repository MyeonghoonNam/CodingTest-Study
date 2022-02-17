const mergeSort = (array) => {
  if (array.length < 2) return array;

  const mid = Math.floor(array.length / 2);
  const leftArray = array.slice(0, mid);
  const rightArray = array.slice(mid);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
};

const merge = (leftArray, rightArray) => {
  const mergeArray = [];

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      mergeArray.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      mergeArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }

  return mergeArray.concat(
    leftArray.slice(leftIndex),
    rightArray.slice(rightIndex)
  );
};

const a = [38, 27, 43, 3, 9, 82, 10];

console.log(mergeSort(a));
