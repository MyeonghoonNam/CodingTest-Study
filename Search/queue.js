class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.empty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.empty()) return;

    const popNode = this.head;

    this.head = popNode.next;

    if (this.size === 1) {
      // 크기가 1인 경우 예외처리
      this.tail = this.head;
    }

    this.size--;

    return popNode.value;
  }

  empty() {
    return this.size === 0 ? true : false;
  }
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue);

queue.dequeue();
queue.dequeue();

console.log(queue);
