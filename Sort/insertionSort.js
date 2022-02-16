const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i];
    let leftIdx = i - 1;

    while (leftIdx >= 0 && arr[leftIdx] > cur) {
      [arr[leftIdx], arr[leftIdx + 1]] = [arr[leftIdx + 1], arr[leftIdx]];
      leftIdx--;
    }
  }

  return arr;
};

const arr = [3, 7, 2, 5, 1, 4];

console.log(insertionSort(arr));
