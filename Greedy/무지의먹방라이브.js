class PriorityQueue {
  constructor() {
    this.heap = [];
    this.heapSize = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.heapSize++;
    this.moveUp();
  }

  pop() {
    if (this.isEmpty()) return;
    if (this.heapSize === 1) {
      this.heapSize--;
      return this.heap.pop();
    }

    const minValue = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.heapSize--;
    this.moveDown();

    return minValue;
  }

  moveUp() {
    let curIdx = this.heapSize - 1;

    while (curIdx > 0) {
      const parentIdx = Math.floor((curIdx - 1) / 2);

      if (this.heap[parentIdx].time <= this.heap[curIdx].time) break;

      this.swap(curIdx, parentIdx);
      curIdx = parentIdx;
    }
  }

  moveDown(idx = 0) {
    const leftChildIdx = idx * 2 + 1;
    const rightChildIdx = idx * 2 + 2;
    let minIdx = idx;

    if (
      leftChildIdx < this.heapSize &&
      this.heap[leftChildIdx].time < this.heap[minIdx].time
    ) {
      minIdx = leftChildIdx;
    }

    if (
      rightChildIdx < this.heapSize &&
      this.heap[rightChildIdx].time < this.heap[minIdx].time
    ) {
      minIdx = rightChildIdx;
    }

    if (minIdx !== idx) {
      this.swap(minIdx, idx);
      this.moveDown(minIdx);
    }
  }

  top() {
    return this.heap[0];
  }

  isEmpty() {
    return this.heapSize === 0 ? true : false;
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }
}

function solution(food_times, k) {
  let foodLength = food_times.length;
  let totalTime = 0; // 모든 음식 먹는데 걸리는 시간
  let sumTime = 0; // 음식을 먹는데 걸린 시간 누적값
  let previousTime = 0; // 이전 음식을 먹는데 걸린 시간

  const queue = new PriorityQueue();

  food_times.forEach((time, idx) => {
    queue.insert({ time, food: idx + 1 });
    totalTime += time;
  });

  if (totalTime <= k) return -1;

  let minTimeFood = queue.top();

  while (sumTime + (minTimeFood.time - previousTime) * foodLength <= k) {
    const currentFood = queue.pop();

    sumTime += (currentFood.time - previousTime) * foodLength;
    foodLength--;
    previousTime = currentFood.time;
    minTimeFood = queue.top();
  }

  queue.heap.sort((a, b) => a.food - b.food);

  const result = queue.heap[(k - sumTime) % foodLength].food;
  return result;
}

const food_times = [8, 6, 4];
const k = 15;

solution(food_times, k);
