// 가장 대표적인 호어방식 퀵 정렬 알고리즘 구현
const quickSort = (array, start = 0, end = array.length - 1) => {
  if (start >= end) return; // 원소가 1개인 경우 종료

  let partitionIndex = partition(array, start, end);

  quickSort(array, start, partitionIndex - 1);
  quickSort(array, partitionIndex + 1, end);

  return array;
};

const partition = (array, start, end) => {
  // console.log("partition start");
  const pivotValue = array[start];
  const pivotIndex = start;
  let left = start + 1;
  let right = end;

  while (left <= right) {
    // pivot 보다 큰 데이터를 찾기 => 시작 부분 부터
    while (left <= end && array[left] <= pivotValue) left++;

    // pivot 보다 작은 데이터를 찾기 => 끝 부분 부터
    while (right > start && array[right] >= pivotValue) right--;

    // index가 엇갈린 경우 작은 데이터(array[right])와 pivot 교체
    if (left > right) {
      swap(array, right, pivotIndex);
    } else {
      swap(array, left, right);
      left++;
      right--;
    }
  }

  return right;
};

const swap = (array, front, back) => {
  [array[front], array[back]] = [array[back], array[front]];
};

const array = [38, 27, 43, 3, 9, 82, 10];
console.log(quickSort(array));
