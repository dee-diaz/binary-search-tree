class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = buildTree();
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.data === value) return;

      if (value < currentNode.data && currentNode.left !== null) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data && currentNode.right !== null) {
        currentNode = currentNode.right;
      } else break;
    }

    currentNode.data > value
      ? (currentNode.left = newNode)
      : (currentNode.right = newNode);
  }

  deleteItem(value) {
    const removeNode = function (node, value) {
      if (node == null) {
        return null;
      }
      if (value == node.data) {
        // node has no children
        if (node.left == null && node.right == null) {
          return null;
        }
        // node has no left child
        if (node.left == null) {
          return node.right;
        }
        // node has no right child
        if (node.right == null) {
          return node.left;
        }
        // node has two children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else {
        node.right = removeNode(node.right, value);
        return node;
      }
    };

    this.root = removeNode(this.root, value);
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.data === value) return currentNode;

      if (value < currentNode.data && currentNode.left !== null) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data && currentNode.right !== null) {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required.");
    if (this.root === null) return;

    const queue = [this.root];
    let currentNode = this.root;

    // Iterative method
    while (queue.length > 0) {
      currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    // Recursive method
    // this.#processQueue(queue, callback);
  }

  #processQueue(queue, callback) {
    if (queue.length === 0) return;
    const currentNode = queue.shift();
    callback(currentNode);
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
    this.#processQueue(queue, callback);
  }

  // Root -> Left subtree -> Right subtree
  preOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required.");
    if (this.root === null) return;

    const stack = [this.root];

    while (stack.length > 0) {
      const currentNode = stack.pop();
      callback(currentNode);
      if (currentNode.right) stack.push(currentNode.right);
      if (currentNode.left) stack.push(currentNode.left);
    }
  }

  // Left subtree -> Root -> Right subtree
  inOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required.");
    if (this.root === null) return;

    const stack = [];
    let currentNode = this.root;

    while (stack.length > 0 || currentNode !== null) {
      while (currentNode !== null) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }

      currentNode = stack.pop();
      callback(currentNode);

      currentNode = currentNode.right;
    }
  }

  // Left subtree -> Right subtree -> Root
  postOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required.");
    if (this.root === null) return;
  }
}

function buildTree(array) {
  if (array.length < 1) return null;

  const copy = array.slice();
  const uniqueVals = Array.from(new Set(copy)).sort((a, b) => a - b);

  const mid = Math.floor(uniqueVals.length / 2);
  const rootNode = new Node(uniqueVals[mid]);

  const left = buildTree(uniqueVals.slice(0, mid));
  const right = buildTree(uniqueVals.slice(mid + 1));

  rootNode.left = left;
  rootNode.right = right;

  return rootNode;
}
