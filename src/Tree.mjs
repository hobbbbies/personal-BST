import Node from "./Node.mjs";

export default class Tree {
  constructor(array = []) {
    this._cleanedArray = this._cleanArray(array);
    this._root = this._buildTree(this._cleanedArray, 0, array.length - 1);
  }

  get cleanedArray() {
    return this._cleanedArray;
  }

  set cleanedArray(val) {}

  get root() {
    return this._root;
  }

  set root(val) {
    this._root = val;
  }

  // Recursive function, acts like merge sort algorithm
  // Runs depth first
  _buildTree(array, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);

    root.left = this._buildTree(array, start, mid - 1);
    root.right = this._buildTree(array, mid + 1, end);

    return root;
  }

  _cleanArray(array) {
    const sortedArr = [...array].sort((a, b) => a - b);
    let seen = {};
    return sortedArr.filter((index) => {
      return seen.hasOwnProperty(index) ? false : (seen[index] = true);
    });
  }

  insert(item, root) {
    if (!root.left && !root.right) {
      // Base Case
      if (item.value < root.value) {
        root.left = item;
      } else {
        root.right = item;
      }
      return;
    }

    if (item.value < root.value) {
      this.insert(item, root.left);
    } else if (item.value > root.value) {
      this.insert(item, root.right);
    }
  }

  deleteItem(item, root) {
    if (root === null) return null; // Node doesn't exist
    if (item.value < root.value) root.left = this.deleteItem(item, root.left);
    else if (item.value > root.value)
      root.right = this.deleteItem(item, root.right);
    else {
      // item === root
      if (!root.left && !root.right) return null; // No children
      else if (root.left && root.right) {
        // 2 children
        let minNode = this._findMin(root.right);
        root.value = minNode.value;
        root.right = this.deleteItem(minNode, root.right);
      } else {
        // 1 Child
        root = root.left ? root.left : root.right; // Becomes left node if it exists, else it becomes the right node
      }
    }
    return root;
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  levelOrder(root, callback = null) {
    if (!callback) throw new Error("Callback not provided");
    let q = [];
    q.push(root);

    while (q.length > 0) {
      let result = q.shift();
      callback(result);
      if (result.left !== null) q.push(result.left);
      if (result.right !== null) q.push(result.right);
    }
  }

  levelOrderWithRecursion(root, callback = null) {
    if (!callback) throw new Error("Callback not provided");
    let q = [];
    q.push(root);

    this.breadthRecursion(callback, q);
  }

  breadthRecursion(callback, q) {
    if (!q.length) return null;
    const result = q.shift();
    callback(result);

    if (result.left !== null) q.push(result.left);
    if (result.right !== null) q.push(result.right);
    return this.breadthRecursion(callback, q);
  }

  inOrderCallback(root, callback) {
    if (root === null) return;

    this.inOrderCallback(root.left, callback);
    callback(root);
    this.inOrderCallback(root.right, callback);
  }

  preOrderCallback(root, callback) {
    if (root === null) return;

    callback(root);
    this.preOrderCallback(root.left, callback);
    this.preOrderCallback(root.right, callback);
  }

  postOrderCallback(root, callback) {
    if (root === null) return;

    this.postOrderCallback(root.left, callback);
    this.postOrderCallback(root.right, callback);
    callback(root);
  }

  findValue(value, root, index = this.findTotalHeight(root)) {
    if (root === null) return null; // Node doesn't exist

    // const currDepth = this.findTotalHeight(root) - index
    if (value < root.value) return this.findValue(value, root.left, index - 1);
    else if (value > root.value)
      return this.findValue(value, root.right, index - 1);
    return { root, index };
  }

  height(value, root) {
    const result = this.findValue(value, root);
    return result.index;
  }

  findTotalHeight(root) {
    if (root === null) return -1; // Node doesn't exist

    const leftHeight = this.findTotalHeight(root.left);
    const rightHeight = this.findTotalHeight(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, root) {
    return this.findTotalHeight(root) - this.height(value, root);
  }

  isBalanced(root) {
    if (root === null) return;

    this.isBalanced(root.left);
    this.isBalanced(root.right);
    return this.compareDepth(root.left, root.right);
  }

  compareDepth(left, right) {
    const leftHeight = this.findTotalHeight(left);
    const rightHeight = this.findTotalHeight(right);
    return Math.abs(leftHeight - rightHeight) <= 1
  }

  rebalance(root) {
    if (this.isBalanced(root)) {
      console.log("Tree is already balanced!");
      return;
    }
    const arr = [];
    this.preOrderCallback(root, (node) => {
      arr.push(node.value);
    })
    const sortedArr = this._cleanArray(arr);
    this.root = this._buildTree(sortedArr, 0 ,sortedArr.length - 1);
  }
}