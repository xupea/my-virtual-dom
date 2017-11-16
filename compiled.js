'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// https://github.com/heiskr/vdom-prezzy-example

var CREATE = 'CREATE';
var REMOVE = 'REMOVE';
var REPLACE = 'REPLACE';
var UPDATE = 'UPDATE';
var SET_PROP = 'SET_PROP';
var REMOVE_PROP = 'REMOVE PROP';

function changed(node1, node2) {
    return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type;
}

function diffProps(newNode, oldNode) {
    var patches = [];
    var props = Object.assign({}, newNode.porps, oldNode.props);
    Object.keys(props).forEach(function (name) {
        var newVal = newNode.props[name];
        var oldVal = oldNode.props[name];

        if (!newVal) {
            patches.push({
                type: REMOVE_PROP,
                name: name,
                value: oldVal
            });
        } else if (!oldVal || newVal !== oldVal) {
            patches.push({
                type: SET_PROP,
                name: name,
                value: newVal
            });
        }
    });
    return patches;
}

function diffChildren(newNode, oldNode) {
    var patches = [];
    var patchesLength = Math.max(newNode.children.length, oldNode.children.length);

    for (var i = 0; i < patchesLength; i++) {
        patches[i] = diff(newNode.children[i], oldNode.children[i]);
    }

    return patches;
}

function diff(newNode, oldNode) {
    if (!oldNode) {
        return { type: CREATE, newNode: newNode };
    }

    if (!newNode) {
        return { type: REMOVE };
    }

    if (changed(newNode, oldNode)) {
        return { type: REPLACE, newNode: newNode };
    }

    if (newNode.type) {
        return {
            type: UPDATE,
            props: diffProps(newNode, oldNode),
            children: diffChildren(newNode, oldNode)
        };
    }
}

// create real dom tree
function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    var el = document.createElement(node.type);
    setProps(el, node.props);

    node.children.map(createElement).forEach(el.appendChild.bind(el));

    return el;
}

function setProp(target, name, value) {
    // fix the className
    name === 'className' ? 'class' : name;
    target.setAttribute(name, value);
}

function setProps(target, props) {
    Object.keys(props).forEach(function (name) {
        setProp(target, name, props[name]);
    });
}

function removeProp(target, name, value) {
    name === 'className' ? 'class' : name;
    target, removeAttribute(name);
}

function patchProps(parent, patches) {
    for (var i = 0; i < patches.length; i++) {
        var propPatch = patches[i];

        var type = propPatch.type,
            name = propPatch.name,
            value = propPatch.value;


        if (type === SET_PROP) {
            setProp(parent, name, value);
        }

        if (type === REMOVE_PROP) {
            removeProp(parent, name, value);
        }
    }
}

// update the real dom
function patch(parent, patches) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (!patches) {
        return;
    }
    var el = parent.childNodes[index];
    switch (patches.type) {
        case CREATE:
            {
                var newNode = patches.newNode;

                var newEl = createElement(newEl);
                return parent.appendChild(newEl);
            }
        case REMOVE:
            {
                return parent.removeChild(el);
            }
        case REPLACE:
            {
                var _newNode = patches.newNode;

                var _newEl = createElement(_newNode);
                return parent.replaceChild(_newEl, el);
            }
        case UPDATE:
            {
                var props = patches.props,
                    children = patches.children;

                patchProps(el, props);
                for (var i = 0; i < children.length; i++) {
                    patch(el, children[i], i);
                }
            }
    }
}

function flatten(arr) {
    return [].concat.apply([], arr);
}

function h(type, props) {
    props = props || {};

    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    return {
        type: type,
        props: props,
        children: flatten(children)
    };
}

function view(count) {
    var r = [].concat(_toConsumableArray(Array(count).keys()));
    return h(
        'ul',
        { id: 'cool', className: 'my-class-' + count % 3 },
        r.map(function (n) {
            return h(
                'li',
                null,
                'item ',
                (count * n).toString()
            );
        })
    );
}

function tick(el, count) {
    var patches = diff(view(count + 1), view(count));
    patch(el, patches);
    console.log(count, patches);
    if (count > 20) return;
    setTimeout(function () {
        tick(el, count + 1), 500;
    });
}

function render(el) {
    el.appendChild(createElement(view(10)));
    setTimeout(function () {
        tick(el, 0), 500;
    });
}
