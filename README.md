# Binary Search Tree

A balanced BST implementation in JavaScript with insertion, deletion, traversal, and self-rebalancing.

## Features

- Builds a balanced tree from an unsorted array with duplicates
- Insert and delete nodes while preserving BST structure
- Four traversal strategies (level-order, pre-order, in-order, post-order) — all callback-based
- Height, depth, and balance checks
- One-call rebalancing via in-order traversal + rebuild

## Usage

```js
import Tree from './BinarySearchTree.js';

const tree = new Tree([3, 1, 7, 4, 2, 8, 5]);

tree.insert(6);
tree.deleteItem(3);

tree.inOrderForEach(node => console.log(node.data)); // sorted output

console.log(tree.isBalanced()); // true / false
tree.rebalance();

console.log(tree.height(5)); // edges to deepest leaf
console.log(tree.depth(5));  // edges from root
```

## API

### Constructor

```js
new Tree(array)
```

Deduplicates and sorts the input array, then builds a balanced BST from the middle element outward.

---

### Modification

| Method | Description |
|---|---|
| `insert(value)` | Inserts a value; ignores duplicates |
| `deleteItem(value)` | Removes a node; handles 0, 1, and 2 children |

---

### Lookup

| Method | Returns |
|---|---|
| `find(value)` | The matching `Node`, or `null` |
| `height(value)` | Edges to the deepest leaf from that node |
| `depth(value)` | Edges from the root to that node |

---

### Traversal

All traversal methods require a callback — they throw if one isn't provided.

| Method | Order | Implementation |
|---|---|---|
| `levelOrderForEach(cb)` | Level by level (BFS) | Iterative, queue |
| `preOrderForEach(cb)` | Root → Left → Right | Iterative, stack |
| `inOrderForEach(cb)` | Left → Root → Right | Iterative, stack |
| `postOrderForEach(cb)` | Left → Right → Root | Recursive (private) |

In-order traversal always visits nodes in sorted order — useful for extracting a sorted array from the tree.

---

### Balance

| Method | Description |
|---|---|
| `isBalanced()` | Returns `true` if no subtree's height differs by more than 1 |
| `rebalance()` | Rebuilds the tree from a sorted in-order array if unbalanced |

## Implementation Notes

**Building the tree** — `buildTree()` picks the middle element of the sorted, deduplicated array as the root, then recursively builds left and right subtrees. This guarantees a balanced tree on construction.

**Deletion** — uses the in-order successor strategy for two-child nodes: finds the smallest value in the right subtree, copies it to the current node, then deletes the successor.

**Height** — implemented recursively via `find()` on each child. Leaf nodes return `0`, absent children count as `-1`.

**Rebalancing** — extracts all values via `inOrderForEach` (already sorted), then passes the array back through `buildTree()`. No explicit sort step needed.

**Private methods** — `#processQueue` (recursive BFS alternative) and `#postOrderRec` are marked private with `#` and used internally only.

## Concepts Practiced

- Binary Search Tree structure and invariants
- Recursive tree construction (divide and conquer)
- BFS and DFS traversal strategies
- Iterative vs. recursive implementations
- Tree balance checking and rebalancing
- JavaScript private class methods (`#`)
