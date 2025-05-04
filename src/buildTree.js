// import Tree from "./Tree"

// // Recursive function, acts like merge sort algorithm
// // Runs depth first
// export default buildTree(arr, start, end) {
//     if (start > end) return null;
    
//     let mid = start + Math.floor((end - start) / 2);
//     let root = new Node(arr[mid]);

//     root.left = buildTree(arr, start, mid - 1);
//     root.right = buildTree(arr, mid + 1, end);   

//     return root; 
// }

// const prettyPrint = (node, prefix = "", isLeft = true) => {
//     if (node === null) {
//         return;
//     }
//     if (node.right !== null) {
//         prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
//     }
//             console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
//     if (node.left !== null) {
//         prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
//     }
// };