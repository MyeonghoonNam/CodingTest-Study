// 재귀 함수를 활용한 이진탐색
const binarySearch = (array, target, start = 0, end = array.length - 1) => {
  if (start > end) return -1;

  const mid = Math.floor((start + end) / 2);

  if (array[mid] === target) {
    return mid;
  } else if (array[mid] > target) {
    return binarySearch(array, target, start, mid - 1);
  } else if (array[mid] < target) {
    return binarySearch(array, target, mid + 1, end);
  }
};

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 114];
const findData = 8;
const findDataIndex = binarySearch(array, findData);

if (findDataIndex === -1) {
  console.log("찾으려는 데이터가 존재하지 않습니다.");
} else {
  console.log(
    `찾으시는 데이터 ${findData}은 ${findDataIndex}번째 위치에 존재합니다.`
  );
}
