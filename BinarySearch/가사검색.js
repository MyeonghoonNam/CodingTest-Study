class Node {
  constructor(value = "") {
    this.value = value;
    this.count = 0;
    this.end = false;
    this.child = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(string) {
    if (string.length <= 0) return;

    let currentNode = this.root;
    currentNode.count++;

    for (let i = 0; i < string.length; i++) {
      const char = string[i];

      if (!currentNode.child[char]) {
        currentNode.child[char] = new Node(currentNode.value + char);
      }

      currentNode = currentNode.child[char];
      currentNode.count++;
    }

    currentNode.end = true;
  }

  search(string) {
    let currentNode = this.root;

    for (let i = 0; i < string.length; i++) {
      const char = string[i];

      if (currentNode.child[char]) {
        currentNode = currentNode.child[char];
      } else {
        return 0;
      }
    }

    return currentNode.count;
  }
}

const solution = (words, queries) => {
  // 단어길이를 인덱스로 한 접두사, 접미사에 와일드문자 들어가는 배열 구조 형성
  const suffix = Array.from(new Array(100001), () => new Trie());
  const prefix = Array.from(new Array(100001), () => new Trie());

  // 단어길이별로 단어를 추가
  words.forEach((word) => {
    suffix[word.length].insert(word); // ex) fr???
    prefix[word.length].insert(word.split("").reverse().join("")); // 접두사가 와일드문자를 다루므로 단어 뒤집기, ex) ??ozen => nezo??
  });

  const result = [];

  // 쿼리 처리
  queries.forEach((query) => {
    const q = query.split("?").join("");
    const length = query.length;
    let count = 0;

    if (q.length === 0 || query[0] !== "?") {
      // 전체가 ?이거나 접미사가 와일드 문자의 경우
      count = suffix[length].search(q);
    } else {
      // 접두사가 와일드 문자의 경우
      count = prefix[length].search(q.split("").reverse().join(""));
    }

    result.push(count);
  });

  return result;
};

const words = ["frodo", "front", "frost", "frozen", "frame", "kakao"];
const queries = ["fro??", "????o", "fr???", "fro???", "pro?"];

console.log(solution(words, queries));
