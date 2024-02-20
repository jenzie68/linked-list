import mergeSort from "./mergeSort";

class Node {
    constructor(data) {
        this.data = data
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array
        this.root = null;
    }
}

function buildTree(arr) {

    function cleanArr() {
        let removeDuplicate = [];

            arr.forEach(e => {
                if (removeDuplicate.includes(e) != true) {
                        removeDuplicate.push(e);
                }
            });

        return mergeSort(removeDuplicate);
    }

    let sortedArr = cleanArr();

    const makeBST = (start,end) => {
        let array = sortedArr;
        if (start > end) {
            return null;
        }

        let mid = parseInt((start + end) / 2);
        let node = new Node(array[mid]);
        node.left = makeBST(start, mid - 1);
        node.right = makeBST(mid + 1, end);
        return node;
    }

    return { makeBST, sortedArr, cleanArr }
}

function insertNode(root, value) {
    if (root === null) {
        return new Node(value);
    }

    if (value < root.data) {
        root.left = insertNode(root.left, value);
    } else {
        root.right = insertNode(root.right, value);
    }

    console.log(root);
    return root;
}
   
function deleteNode(root, k) {
    if (root === null) {
        return root;
    }

    if (root.data > k) {
        root.left = deleteNode(root.left, k);
        return root;
    } else if (root.data < k) {
        root.right = deleteNode(root.right, k);
        return root;
    }

    if (root.left === null) {
            let temp = root.right;
            root = null;
            return temp;
    } else if (root.right === null) {
            let temp = root.left;
            root = null;
            return temp;
    }

    else {
        let succParent = root;

        let succ = root.right;
        while (succ.left !== null) {
            succParent = succ;
            succ = succ.left;
        }

        if (succParent !== root) {
            succParent.left = succ.right;
        } else {
            succParent.right = succ.right;
        }

        root.data = succ.data;

        succ = null;
        return root;
    }
}

function find(root, value) {
    if (root === null) {
        console.log(root);
        return root;
    }
    if (root.data == value) {
        console.log(root);
        return root;
    }

    if (value < root.data) {
        return root.left = find(root.left, value);
    } else {
        return root.right = find(root.right, value);
    }
}

function levelOrder(root,callback) {
    if (root === null) return root;
    let q = [root];
    let values = [];
    while(q.length > 0) {
        let currentNode = q[0];
        console.log(q[0]);
        values.push(currentNode.data);
        if(typeof callback === 'function') callback(currentNode);
        if(currentNode.left != null) q.push(currentNode.left);
        if(currentNode.right != null) q.push(currentNode.right);
        q.shift();
    }
    if(typeof callback != 'function') {
        console.log(values);
        return values;
    }
}

function readRoot(root, values, callback) {
    if(typeof callback != 'function') values.push(root.data);
    if(typeof callback == 'function') callback(root);
    if(typeof callback != 'function') return values;
}

function inOrder(root, callback) {
    if (root == null) return root;
    if(typeof callback != 'function') {
        let values = [];

        values = values.concat(inOrder(root.left));
        values.push(root.data);
        values = values.concat(inOrder(root.right));

        let filterValues = values.filter(v => v != null);
        return filterValues;
    }

    inOrder(root.left);
    callback(root);
    inOrder(root.right);
}

function preOrder(root, callback) {
    if (root == null) return root;
    if(typeof callback != 'function') {
        let values = [];

        values.push(root.data);
        values = values.concat(preOrder(root.left));
        values = values.concat(preOrder(root.right));

        let filterValues = values.filter(v => v != null);
        return filterValues;
    }

    callback(root);
    preOrder(root.left);
    preOrder(root.right);
}

function postOrder(root, callback) {
    if (root == null) return root;
    if(typeof callback != 'function') {
        let values = [];

        values = values.concat(postOrder(root.left));
        values = values.concat(postOrder(root.right));
        values.push(root.data);

        let filterValues = values.filter(v => v != null);
        return filterValues;
    }

    postOrder(root.left);
    postOrder(root.right);
    callback(root);
}


export { buildTree, deleteNode, insertNode, find, inOrder, levelOrder, preOrder, postOrder}
