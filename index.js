const vd = {
    tag: 'div',
    id: '0-0',
    children: [
        {
            tag: 'span-a',
            id: '1-0',
            children: [
                {
                    tag: 'span1',
                    id: '2-0',
                    children: [] 
                },
                {
                    tag: 'span1',
                    id: '2-1',
                    children: [] 
                }
            ]
        },
        {
            tag: 'span-b',
            id: '1-1',
            children: [
                {
                    tag: 'span2',
                    id: '2-2',
                    children: [] 
                }
            ]
        }
    ] 
};

let mystack = [];
let visited_nodes = {};
let visited_nodes_order = [];

mystack.push(vd);

// DFS主要采用递归实现，依次遍历节点，如果遍历到的节点有子节点，则开始遍历子节点
// up to down, left to right
const DFSTraverse = function() {

    while(mystack.length > 0) {
        let currentNode = mystack.pop();
        visited_nodes_order.push(currentNode.id);
        for (let child of currentNode.children.reverse()) {
            mystack.push(child);
        }
    }

}

// DFSTraverse();

// BFS采用队列的思想，采用出队的方式遍历节点，如果遍历到的节点有子节点，则将子节点入队

let myqueue = [];
myqueue.push(vd);

const BFSTraverse = function() {
    while(myqueue.length > 0) {
        let currentNode = myqueue.shift();
        visited_nodes_order.push(currentNode.id);
        for(let child of currentNode.children) {
            myqueue.push(child);
        }
    }
}

BFSTraverse();

console.log(visited_nodes_order);