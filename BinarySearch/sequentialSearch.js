const sequentialSearch = (array, data) => {
  let dataIndex = 0;

  for (let i = 0; i < array.length; i++) {
    if (data === array[i]) {
      dataIndex += 1;
      break;
    }
  }

  return dataIndex;
};

const array = ["apple", "banana", "melon"];
const findData = "apple";
const findIndex = sequentialSearch(array, findData);
if (findIndex !== 0) {
  console.log(`탐색 결과 : ${findIndex}번째에 원소가 존재합니다.`);
} else {
  console.log(`탐색 결과 : 원소가 존재하지 않습니다.`);
}
