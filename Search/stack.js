class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);

    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop() {
    if (this.empty()) return;

    const popNode = this.top;
    this.top = popNode.next;
    this.size--;

    return popNode;
  }

  empty() {
    return this.size === 0 ? true : false;
  }
}

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log(stack);

stack.pop();

console.log(stack);
