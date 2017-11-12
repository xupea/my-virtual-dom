'use strict';

// import {dom} from 'deku';

// let profile = (
//     <div className="header">
//         <img>img</img>
//         <h3>h3</h3>
//     </div>
// );

var vd = {
    tag: 'div',
    id: '0-0',
    children: [{
        tag: 'span-a',
        id: '1-0',
        children: [{
            tag: 'span1',
            id: '2-0',
            children: []
        }, {
            tag: 'span1',
            id: '2-1',
            children: []
        }]
    }, {
        tag: 'span-b',
        id: '1-1',
        children: [{
            tag: 'span2',
            id: '2-2',
            children: []
        }]
    }]
};

var mystack = [];
var visited_nodes = {};
var visited_nodes_order = [];

mystack.push(vd);

// DFS主要采用递归实现，依次遍历节点，如果遍历到的节点有子节点，则开始遍历子节点
// up to down, left to right
var DFSTraverse = function DFSTraverse() {

    while (mystack.length > 0) {
        var currentNode = mystack.pop();
        visited_nodes_order.push(currentNode.id);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = currentNode.children.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var child = _step.value;

                mystack.push(child);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
};

// DFSTraverse();

var myqueue = [];

myqueue.push(vd);

var BFSTraverse = function BFSTraverse() {
    while (myqueue.length > 0) {
        var currentNode = myqueue.shift();
        visited_nodes_order.push(currentNode.id);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = currentNode.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var child = _step2.value;

                myqueue.push(child);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }
};

BFSTraverse();

console.log(visited_nodes_order);
