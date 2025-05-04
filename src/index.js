import Tree from "./Tree.mjs"
import Node from "./Node.mjs"

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

const createRandomArray = (size, min, max) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
        const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        arr.push(randNum);
    }
    return arr;
}

const printNodes = (node) => {
    console.log(node.value);
}  

(function(){
    const arr = createRandomArray(15, 0, 100);
    const myTree = new Tree(arr);

    prettyPrint(myTree.root);
    console.log(`Tree is balanced? ${myTree.isBalanced(myTree.root)}`);

    console.log("\nNodes in level order: \n");
    myTree.levelOrderWithRecursion(myTree.root, (node) => {
        printNodes(node);
    });

    console.log("\nNodes in pre order: \n");
    myTree.preOrderCallback(myTree.root, (node) => {
      printNodes(node);
    });
    
    console.log("\nNodes in order: \n");
    myTree.inOrderCallback(myTree.root, (node) => {
      printNodes(node);
    });

    console.log("\nNodes in post order: \n");    
    myTree.postOrderCallback(myTree.root, (node) => {
      printNodes(node);
    });

    myTree.insert(new Node(200), myTree.root);
    myTree.insert(new Node(500), myTree.root);
    console.log("Unbalanced tree... adding 200, 500\nNew Tree:");
    prettyPrint(myTree.root);
    console.log(`Tree is balanced? ${myTree.isBalanced(myTree.root)}`);
    myTree.rebalance(myTree.root);
    console.log("Rebalacing...\nNew Tree:");
    prettyPrint(myTree.root);

})();

