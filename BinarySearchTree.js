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
