var XBubbles =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var context = __webpack_require__(1);
	var drag = __webpack_require__(2);
	var editor = __webpack_require__(19);
	var bubble = __webpack_require__(5);
	var bubbleset = __webpack_require__(7);

	var OPTIONS = {
	    begining: ['noop', null],
	    bubbleCopy: ['funk', function () {}],
	    bubbleDeformation: ['funk', function () {}],
	    bubbleFormation: ['funk', function () {}],
	    checkBubblePaste: ['funk', function () {}],
	    classBubble: ['noop', 'bubble'],
	    disableControls: ['bool', false],
	    draggable: ['bool', true],
	    ending: ['noop', null], // /\@ya\.ru/g;
	    separator: ['noop', /[,;]/]
	};

	var XBubbles = Object.create(HTMLDivElement.prototype, {
	    createdCallback: {
	        value: function value() {
	            initEditor(this);
	        }
	    },

	    attachedCallback: {
	        value: function value() {
	            initEditor(this);
	            drag.init(this);
	            bubble.bubbling(this);
	        }
	    },

	    detachedCallback: {
	        value: function value() {
	            drag.destroy(this);
	            destroyEditor(this);
	        }
	    },

	    /*
	    attributeChangedCallback: {
	        value: function (name, prevValue, value) {}
	    },
	    */

	    options: {
	        value: function value(name, _value) {
	            if (!this._options) {
	                this._options = _extends({}, Object.keys(OPTIONS).reduce(function (result, item) {
	                    result[item] = undefined;
	                    return result;
	                }, {}), this.dataset);

	                optionsPrepare(this._options);
	            }

	            if (typeof _value !== 'undefined') {
	                this._options[name] = _value;
	                optionsPrepare(this._options);
	            } else {
	                return this._options[name];
	            }
	        }
	    },

	    items: {
	        get: function get() {
	            return bubbleset.getBubbles(this);
	        }
	    },

	    inputValue: {
	        get: function get() {
	            return this.editor.inputValue();
	        }
	    },

	    setContent: {
	        value: function value(data) {
	            return this.editor.setContent(data);
	        }
	    },

	    addBubble: {
	        value: function value(bubbleText, data) {
	            return this.editor.addBubble(bubbleText, data);
	        }
	    },

	    removeBubble: {
	        value: function value(nodeBubble) {
	            return this.editor.removeBubble(nodeBubble);
	        }
	    },

	    editBubble: {
	        value: function value(nodeBubble) {
	            return this.editor.editBubble(nodeBubble);
	        }
	    }
	});

	module.exports = context.document.registerElement('x-bubbles', {
	    extends: 'div',
	    prototype: XBubbles
	});

	var OPTIONS_PREPARE = {
	    funk: function funk(value) {
	        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	        switch (type) {
	            case 'string':
	                return new Function('context', 'return context.' + value + ';')(context);

	            case 'function':
	                return value;
	        }
	    },
	    bool: function bool(value) {
	        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	        switch (type) {
	            case 'string':
	                return value === 'true' || value === 'on';

	            case 'boolean':
	                return value;
	        }
	    },
	    noop: function noop(value) {
	        return value;
	    }
	};

	function optionsPrepare(options) {
	    for (var name in OPTIONS) {
	        var _OPTIONS$name = _slicedToArray(OPTIONS[name], 2),
	            type = _OPTIONS$name[0],
	            def = _OPTIONS$name[1];

	        options[name] = OPTIONS_PREPARE[type](options[name]);
	        if (typeof options[name] === 'undefined') {
	            options[name] = def;
	        }
	    }
	}

	function initEditor(node) {
	    if (!node.editor) {
	        Object.defineProperty(node, 'editor', {
	            configurable: true,
	            value: editor.init(node)
	        });
	    }
	}

	function destroyEditor(node) {
	    if (node.editor) {
	        editor.destroy(node);
	        delete node.editor;
	    }
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    /* eslint no-eval: 0 */
	    return this || (1, eval)('this');
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var native = __webpack_require__(3);
	var mouse = __webpack_require__(17);

	var _require = __webpack_require__(8),
	    canUseDrag = _require.canUseDrag;

	exports.init = function (nodeSet) {
	    if (canUseDrag()) {
	        return native.init(nodeSet);
	    }

	    return mouse.init(nodeSet);
	};

	exports.destroy = function (nodeSet) {
	    if (canUseDrag()) {
	        return native.destroy(nodeSet);
	    }

	    return mouse.destroy(nodeSet);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(1);
	var select = __webpack_require__(4);
	var bubbleset = __webpack_require__(7);
	var events = __webpack_require__(12);

	var _require = __webpack_require__(14),
	    CLS = _require.CLS;

	var _require2 = __webpack_require__(15),
	    getDragImage = _require2.getDragImage,
	    onDropSuccess = _require2.onDropSuccess,
	    DRAG_IMG_WIDTH = _require2.DRAG_IMG_WIDTH;

	var EVENTS = {
	    dragend: onDragend,
	    dragenter: onDragenter,
	    dragleave: onDragleave,
	    dragover: onDragover,
	    dragstart: onDragstart,
	    drop: onDrop
	};

	var currentDragSet = null;

	exports.init = function (nodeSet) {
	    events.on(nodeSet, EVENTS);
	};

	exports.destroy = function (nodeSet) {
	    events.off(nodeSet, EVENTS);
	};

	function onDragstart(event) {
	    event.stopPropagation();

	    var nodeSet = bubbleset.closestNodeSet(event.target);
	    var nodeBubble = bubbleset.closestNodeBubble(event.target);

	    if (!nodeSet || !nodeBubble) {
	        event.preventDefault();
	        return;
	    }

	    var selection = context.getSelection();
	    selection && selection.removeAllRanges();

	    currentDragSet = nodeSet;
	    nodeSet.classList.add(CLS.DRAGSTART);
	    select.add(nodeBubble);

	    event.dataTransfer.effectAllowed = 'move';
	    event.dataTransfer.setData('text/plain', '');

	    var list = select.get(currentDragSet);
	    if (list.length > 1) {
	        event.dataTransfer.setDragImage(getDragImage(), DRAG_IMG_WIDTH, DRAG_IMG_WIDTH);
	    }
	}

	function onDrop(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    var nodeSet = bubbleset.closestNodeSet(event.target);

	    if (!nodeSet || nodeSet === currentDragSet) {
	        return;
	    }

	    var list = select.get(currentDragSet);

	    if (list.length) {
	        list.forEach(function (item) {
	            return nodeSet.appendChild(item);
	        });
	        context.setTimeout(onDropSuccess, 0, currentDragSet, nodeSet);
	    }
	}

	function onDragover(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    event.dataTransfer.dropEffect = 'move';
	}

	function onDragenter(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    var nodeSet = bubbleset.closestNodeSet(event.target);
	    if (nodeSet && nodeSet !== currentDragSet) {
	        nodeSet.classList.add(CLS.DROPZONE);
	    }
	}

	function onDragleave(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    var nodeSet = bubbleset.closestNodeSet(event.target);
	    if (nodeSet && nodeSet !== currentDragSet) {
	        nodeSet.classList.remove(CLS.DROPZONE);
	    }
	}

	function onDragend(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    currentDragSet.classList.remove(CLS.DRAGSTART);

	    var nodeSet = bubbleset.closestNodeSet(event.target);

	    if (nodeSet && nodeSet !== currentDragSet) {
	        nodeSet.classList.remove(CLS.DROPZONE);
	    }

	    currentDragSet = null;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(1);
	var bubble = __webpack_require__(5);
	var bubbleset = __webpack_require__(7);

	var slice = Array.prototype.slice;
	var PATH_SELECTED = '[bubble][selected]';
	var PATH_NOT_SELECTED = '[bubble]:not([selected])';

	exports.all = all;
	exports.add = add;
	exports.clear = clear;
	exports.get = get;
	exports.uniq = uniq;
	exports.head = head;
	exports.last = last;
	exports.has = has;
	exports.range = range;
	exports.toggleUniq = toggleUniq;

	function range(node) {
	    if (!bubble.isBubbleNode(node)) {
	        return;
	    }

	    var set = node.parentNode;
	    var list = get(set);

	    if (!list.length) {
	        uniq(node);
	        return;
	    }

	    clear(set);

	    var headList = list[0];
	    var lastList = list[list.length - 1];

	    if (headList === lastList || !set.startRangeSelect) {
	        set.startRangeSelect = headList;
	    }

	    var fromNode = void 0;
	    var toNode = void 0;
	    var position = node.compareDocumentPosition(set.startRangeSelect);

	    if (position & Node.DOCUMENT_POSITION_PRECEDING) {
	        fromNode = set.startRangeSelect;
	        toNode = node;
	    } else {
	        fromNode = node;
	        toNode = set.startRangeSelect;
	    }

	    if (fromNode && toNode) {
	        var item = fromNode;

	        while (item) {
	            if (!setSelected(item)) {
	                break;
	            }

	            if (item === toNode) {
	                break;
	            }

	            item = item.nextSibling;
	        }

	        bubble.bubbling(set);
	    }
	}

	function all(nodeSet) {
	    slice.call(nodeSet.querySelectorAll(PATH_NOT_SELECTED)).forEach(function (item) {
	        return setSelected(item);
	    });
	    nodeSet.startRangeSelect = nodeSet.querySelector(PATH_SELECTED);

	    bubble.bubbling(nodeSet);

	    var selection = context.getSelection();
	    selection && selection.removeAllRanges();
	}

	function has(nodeSet) {
	    return Boolean(nodeSet.querySelector(PATH_SELECTED));
	}

	function head(set) {
	    return get(set)[0];
	}

	function last(set) {
	    var list = get(set);
	    return list[list.length - 1];
	}

	function get(nodeSet) {
	    return slice.call(nodeSet.querySelectorAll(PATH_SELECTED));
	}

	function clear(nodeSet) {
	    get(nodeSet).forEach(function (item) {
	        return item.removeAttribute('selected');
	    });
	}

	function add(node) {
	    if (setSelected(node)) {
	        var nodeSet = bubbleset.closestNodeSet(node);

	        nodeSet.startRangeSelect = node;
	        // ???
	        bubble.bubbling(nodeSet);

	        return true;
	    }

	    return false;
	}

	function uniq(node) {
	    if (!bubble.isBubbleNode(node)) {
	        return false;
	    }

	    var nodeSet = bubbleset.closestNodeSet(node);
	    var selection = context.getSelection();

	    selection && selection.removeAllRanges();
	    clear(nodeSet);

	    return add(node);
	}

	function toggleUniq(node) {
	    if (isSelected(node)) {
	        var nodeSet = bubbleset.closestNodeSet(node);

	        if (get(nodeSet).length === 1) {
	            return removeSelected(node);
	        }
	    }

	    return uniq(node);
	}

	function isSelected(node) {
	    return bubble.isBubbleNode(node) && node.hasAttribute('selected') || false;
	}

	function setSelected(node) {
	    if (bubble.isBubbleNode(node)) {
	        node.setAttribute('selected', '');
	        return true;
	    }

	    return false;
	}

	function removeSelected(node) {
	    if (bubble.isBubbleNode(node)) {
	        node.removeAttribute('selected');
	        return true;
	    }

	    return false;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(1);
	var text = __webpack_require__(6);

	var _require = __webpack_require__(8),
	    escape = _require.escape,
	    canUseDrag = _require.canUseDrag;

	exports.isBubbleNode = isBubbleNode;
	exports.bubbling = bubbling;
	exports.create = create;
	exports.edit = edit;

	function isBubbleNode(node) {
	    if (!node || node.nodeType !== Node.ELEMENT_NODE) {
	        return false;
	    }

	    return node.hasAttribute('bubble');
	}

	function edit(nodeSet, nodeBubble) {
	    if (nodeBubble.hasAttribute('readonly')) {
	        return false;
	    }

	    var selection = context.getSelection();

	    if (!selection) {
	        return false;
	    }

	    var bubbleDeformation = nodeSet.options('bubbleDeformation');
	    var rangeParams = bubbleDeformation(nodeBubble);

	    if (!rangeParams) {
	        var dataText = text.textClean(nodeBubble.innerText);

	        rangeParams = {
	            text: dataText,
	            startOffset: 0,
	            endOffset: dataText.length
	        };
	    }

	    var textFake = text.createZws();
	    var textNode = context.document.createTextNode(rangeParams.text);

	    nodeSet.fireEdit(nodeBubble);
	    nodeSet.replaceChild(textNode, nodeBubble);
	    nodeSet.insertBefore(textFake, textNode);

	    var range = context.document.createRange();
	    range.setStart(textNode, rangeParams.startOffset);
	    range.setEnd(textNode, rangeParams.endOffset);

	    selection.removeAllRanges();
	    selection.addRange(range);
	    return true;
	}

	function create(nodeSet, dataText) {
	    var dataAttributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    dataText = text.textClean(dataText);

	    if (!dataText) {
	        return;
	    }

	    var bubbleFormation = nodeSet.options('bubbleFormation');
	    var classBubble = nodeSet.options('classBubble');
	    var draggable = canUseDrag() && nodeSet.options('draggable');
	    var wrap = nodeSet.ownerDocument.createElement('span');

	    wrap.innerText = dataText;

	    for (var key in dataAttributes) {
	        if (dataAttributes[key]) {
	            wrap.setAttribute('data-' + key, escape(dataAttributes[key]));
	        }
	    }

	    bubbleFormation(wrap);

	    if (classBubble) {
	        var classes = String(classBubble).trim().split(/\s+/);
	        var len = classes.length;

	        while (len--) {
	            wrap.classList.add(classes[len]);
	        }
	    }

	    wrap.setAttribute('bubble', '');
	    wrap.setAttribute('contenteditable', 'false');
	    draggable && wrap.setAttribute('draggable', 'true');

	    return wrap;
	}

	function bubbling(nodeSet) {
	    var separator = nodeSet.options('separator');
	    var ending = nodeSet.options('ending');
	    var begining = nodeSet.options('begining');
	    var ranges = getBubbleRanges(nodeSet);
	    var nodes = [];

	    ranges.forEach(function (range) {
	        var dataText = text.textClean(range.toString());

	        if (!dataText) {
	            range.deleteContents();
	            return;
	        }

	        var textParts = [dataText];

	        if (separator) {
	            textParts = dataText.split(separator).map(trimIterator).filter(nonEmptyIterator);
	        }

	        if (ending) {
	            textParts = textParts.reduce(function (parts, str) {
	                return parts.concat(parseFragmentByEnding(str, ending));
	            }, []).map(trimIterator).filter(nonEmptyIterator);
	        } else if (begining) {
	            textParts = textParts.reduce(function (parts, str) {
	                return parts.concat(parseFragmentByBeginning(str, begining));
	            }, []).map(trimIterator).filter(nonEmptyIterator);
	        }

	        if (!textParts.length) {
	            range.deleteContents();
	        }

	        var fragment = context.document.createDocumentFragment();

	        textParts.forEach(function (textPart) {
	            var nodeBubble = create(nodeSet, textPart);
	            if (nodeBubble) {
	                fragment.appendChild(nodeBubble);
	                nodes.push(nodeBubble);
	            }
	        });

	        range.deleteContents();
	        range.insertNode(fragment);
	    });

	    nodeSet.fireInput();

	    if (nodes.length) {
	        nodeSet.fireChange();
	    }

	    return nodes;
	}

	function getBubbleRanges(nodeSet) {
	    var ranges = [];
	    var children = nodeSet.childNodes;
	    var range = void 0;
	    var node = void 0;

	    for (var i = 0; i < children.length; i++) {
	        node = children[i];

	        if (isBubbleNode(node)) {
	            if (range) {
	                range.setEndBefore(node);
	                ranges.push(range);
	                range = undefined;
	            }
	        } else {
	            if (!range) {
	                range = context.document.createRange();
	                range.setStartBefore(node);
	            }
	        }
	    }

	    if (range) {
	        range.setEndAfter(node);
	        ranges.push(range);
	    }

	    return ranges;
	}

	function trimIterator(str) {
	    return str.trim();
	}

	function nonEmptyIterator(str) {
	    return Boolean(str);
	}

	function parseFragmentByEnding(str, reg) {
	    var parts = [];
	    var lastIndex = 0;
	    var loop = 999;

	    reg.lastIndex = 0;
	    while (reg.exec(str) !== null && loop) {
	        loop--;
	        parts.push(str.substring(lastIndex, reg.lastIndex));
	        lastIndex = reg.lastIndex;
	    }

	    return parts;
	}

	function parseFragmentByBeginning(str, reg) {
	    var parts = [];
	    var res = void 0;
	    var index = 0;
	    var loop = 999;

	    reg.lastIndex = 0;
	    while ((res = reg.exec(str)) !== null && loop) {
	        loop--;
	        if (index !== res.index) {
	            parts.push(str.substring(index, res.index));
	            index = res.index;
	        }
	    }

	    parts.push(str.substring(index, str.length));
	    return parts;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(1);
	var bubbleset = __webpack_require__(7);

	/* eslint-disable max-len */
	var REG_REPLACE_NON_PRINTABLE = /[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;
	var REG_ZWS = /\u200B/;
	var TEXT_ZWS = '\u200B';

	exports.arrowRight = arrowRight;
	exports.arrowLeft = arrowLeft;
	exports.remove = remove;
	exports.html2text = html2text;
	exports.currentTextRange = currentTextRange;
	exports.text2bubble = text2bubble;
	exports.replaceString = replaceString;
	exports.selectAll = selectAll;
	exports.textClean = textClean;
	exports.checkZws = checkZws;
	exports.createZws = createZws;

	function text2bubble(nodeEditor, nodeBubble) {
	    var selection = context.getSelection();
	    if (!selection) {
	        return false;
	    }

	    var range = currentTextRange(nodeEditor, selection);

	    if (range) {
	        selection.removeAllRanges();
	        selection.addRange(range);
	        replace(selection, nodeBubble);
	    } else {
	        nodeEditor.appendChild(nodeBubble);
	    }

	    return true;
	}

	function currentTextRange(nodeEditor, selection) {
	    var doc = nodeEditor.ownerDocument;

	    selection = selection || doc.defaultView.getSelection();
	    if (!selection) {
	        return;
	    }

	    var pointNode = selection.focusNode && selection.focusNode.nodeType === Node.TEXT_NODE ? selection.focusNode : selection.anchorNode && selection.anchorNode.nodeType === Node.TEXT_NODE ? selection.anchorNode : undefined;

	    if (!pointNode || !(nodeEditor.compareDocumentPosition(pointNode) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
	        return;
	    }

	    var startNode = pointNode;
	    var endNode = pointNode;
	    var item = pointNode;

	    while (item && item.nodeType === Node.TEXT_NODE) {
	        startNode = item;
	        item = item.previousSibling;
	    }

	    item = pointNode;

	    while (item && item.nodeType === Node.TEXT_NODE) {
	        endNode = item;
	        item = item.nextSibling;
	    }

	    var range = doc.createRange();
	    range.setStartBefore(startNode);
	    range.setEndAfter(endNode);

	    return range;
	}

	function remove(selection) {
	    return replace(selection, createZws());
	}

	function replace(selection, node) {
	    selection = selection || context.getSelection();

	    if (!selection || !selection.rangeCount) {
	        return false;
	    }

	    var anchor = context.document.createElement('span');
	    selection.getRangeAt(0).surroundContents(anchor);
	    anchor.parentNode.replaceChild(node, anchor);

	    selection.removeAllRanges();
	    selection.collapse(node, 0);

	    return true;
	}

	function replaceString(data, selection) {
	    data = textClean(data);
	    if (!data) {
	        return false;
	    }

	    selection = selection || context.getSelection();
	    var textNode = context.document.createTextNode(data);

	    if (!replace(selection, textNode)) {
	        return false;
	    }

	    selection.collapse(textNode, textNode.nodeValue.length);
	    return true;
	}

	function arrowLeft(selection, extend) {
	    selection = selection || context.getSelection();

	    if (!selection || !selection.anchorNode || selection.anchorNode.nodeType !== Node.TEXT_NODE) {

	        return false;
	    }

	    var _selectionCorrect = selectionCorrect(selection),
	        startNode = _selectionCorrect.startNode,
	        endNode = _selectionCorrect.endNode,
	        startOffset = _selectionCorrect.startOffset,
	        endOffset = _selectionCorrect.endOffset,
	        revert = _selectionCorrect.revert;

	    if (!selection.isCollapsed && !extend) {
	        selection.collapse(startNode, startOffset);
	        return true;
	    }

	    var isNativeExtend = Boolean(selection.extend);
	    revert = isNativeExtend ? revert : !revert;
	    var node = revert ? startNode : endNode;
	    var offset = revert ? startOffset : endOffset;

	    while (node) {
	        if (node.nodeType !== Node.TEXT_NODE) {
	            return false;
	        }

	        if (offset === null) {
	            offset = node.nodeValue.length;
	        }

	        if (offset - 1 < 0) {
	            node = node.previousSibling;
	            offset = null;
	            continue;
	        }

	        var text = node.nodeValue.substring(offset - 1, offset);

	        if (checkZws(text)) {
	            offset = offset - 1;
	            continue;
	        }

	        break;
	    }

	    if (!node || offset === null) {
	        return false;
	    }

	    if (extend) {
	        if (isNativeExtend) {
	            selection.extend(node, offset - 1);
	        } else {
	            var range = context.document.createRange();

	            if (revert) {
	                range.setStart(node, offset - 1);
	                range.setEnd(endNode, endOffset);
	            } else {
	                range.setStart(startNode, startOffset);
	                range.setEnd(node, offset - 1);
	            }

	            selection.removeAllRanges();
	            selection.addRange(range);
	        }
	    } else {
	        selection.collapse(node, offset - 1);
	    }

	    return true;
	}

	function arrowRight(selection, extend) {
	    selection = selection || context.getSelection();

	    if (!selection || !selection.focusNode || selection.focusNode.nodeType !== Node.TEXT_NODE) {

	        return false;
	    }

	    var _selectionCorrect2 = selectionCorrect(selection),
	        startNode = _selectionCorrect2.startNode,
	        endNode = _selectionCorrect2.endNode,
	        startOffset = _selectionCorrect2.startOffset,
	        endOffset = _selectionCorrect2.endOffset,
	        revert = _selectionCorrect2.revert;

	    if (!selection.isCollapsed && !extend) {
	        selection.collapse(endNode, endOffset);
	        return true;
	    }

	    var node = revert ? startNode : endNode;
	    var offset = revert ? startOffset : endOffset;

	    while (node) {
	        if (node.nodeType !== Node.TEXT_NODE) {
	            return false;
	        }

	        var len = node.nodeValue.length;

	        if (offset + 1 > len) {
	            node = node.nextSibling;
	            offset = 0;
	            continue;
	        }

	        var text = node.nodeValue.substring(offset, offset + 1);

	        if (checkZws(text)) {
	            offset = offset + 1;
	            continue;
	        }

	        break;
	    }

	    if (!node) {
	        return false;
	    }

	    if (extend) {
	        var isNativeExtend = Boolean(selection.extend);

	        if (isNativeExtend) {
	            selection.extend(node, offset + 1);
	        } else {
	            var range = context.document.createRange();

	            if (revert) {
	                range.setStart(node, offset + 1);
	                range.setEnd(endNode, endOffset);
	            } else {
	                range.setStart(startNode, startOffset);
	                range.setEnd(node, offset + 1);
	            }

	            selection.removeAllRanges();
	            selection.addRange(range);
	        }
	    } else {
	        selection.collapse(node, offset + 1);
	    }

	    return true;
	}

	function html2text(value) {
	    if (!value) {
	        return '';
	    }

	    var DOMContainer = context.document.implementation.createHTMLDocument('').body;
	    DOMContainer.innerText = value;

	    return DOMContainer.innerText.replace(/^[\u0020\u00a0]+$/gm, '').replace(/\n/gm, ' ').trim();
	}

	function selectAll(selection, nodeSet) {
	    selection = selection || context.getSelection();
	    var node = selection && selection.anchorNode;

	    if (!node || node.nodeType !== Node.TEXT_NODE) {
	        return false;
	    }

	    var fromNode = void 0;
	    var toNode = void 0;
	    var item = node;

	    while (item && item.nodeType === Node.TEXT_NODE) {
	        fromNode = item;
	        item = item.previousSibling;
	    }

	    item = node;

	    while (item && item.nodeType === Node.TEXT_NODE) {
	        toNode = item;
	        item = item.nextSibling;
	    }

	    var hasBubbles = bubbleset.hasBubbles(nodeSet);
	    var range = context.document.createRange();
	    range.setStartBefore(fromNode);
	    range.setEndAfter(toNode);

	    var dataText = textClean(range.toString());

	    if (dataText || !dataText && !hasBubbles) {
	        if (!dataText) {
	            range.collapse();
	        }

	        selection.removeAllRanges();
	        selection.addRange(range);
	        return true;
	    }

	    return false;
	}

	function createZws() {
	    return context.document.createTextNode(TEXT_ZWS);
	}

	function checkZws(value) {
	    return REG_ZWS.test(value);
	}

	function textClean(value) {
	    return String(value || '').trim().replace(REG_REPLACE_NON_PRINTABLE, '');
	}

	function selectionCorrect(selection) {
	    var startNode = selection.anchorNode;
	    var endNode = selection.focusNode;
	    var startOffset = selection.anchorOffset;
	    var endOffset = selection.focusOffset;
	    var revert = false;

	    if (startNode === endNode) {
	        startOffset = Math.min(selection.anchorOffset, selection.focusOffset);
	        endOffset = Math.max(selection.anchorOffset, selection.focusOffset);
	        revert = selection.anchorOffset > selection.focusOffset;
	    } else {
	        var position = selection.anchorNode.compareDocumentPosition(selection.focusNode);
	        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
	            startNode = selection.focusNode;
	            startOffset = selection.focusOffset;
	            endNode = selection.anchorNode;
	            endOffset = selection.anchorOffset;
	            revert = true;
	        }
	    }

	    return { startNode: startNode, endNode: endNode, startOffset: startOffset, endOffset: endOffset, revert: revert };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bubble = __webpack_require__(5);
	var text = __webpack_require__(6);

	exports.closestNodeBubble = closestNodeBubble;
	exports.closestNodeSet = closestNodeSet;
	exports.findBubbleLeft = findBubbleLeft;
	exports.findBubbleRight = findBubbleRight;
	exports.getBubbles = getBubbles;
	exports.hasBubbles = hasBubbles;
	exports.headBubble = headBubble;
	exports.lastBubble = lastBubble;
	exports.nextBubble = nextBubble;
	exports.prevBubble = prevBubble;

	function lastBubble(nodeSet) {
	    return nodeSet.querySelector('[bubble]:last-child');
	}

	function headBubble(nodeSet) {
	    return nodeSet.querySelector('[bubble]:first-child');
	}

	function getBubbles(nodeSet) {
	    return Array.prototype.slice.call(nodeSet.querySelectorAll('[bubble]'));
	}

	function hasBubbles(nodeSet) {
	    return Boolean(nodeSet.querySelector('[bubble]'));
	}

	function findBubbleLeft(selection) {
	    if (!selection.focusNode || !selection.anchorNode) {
	        return;
	    }

	    var node = selection.focusNode.previousSibling;

	    if (selection.anchorNode !== selection.focusNode && selection.anchorNode.compareDocumentPosition(selection.focusNode) & Node.DOCUMENT_POSITION_FOLLOWING) {
	        node = selection.anchorNode.previousSibling;
	    }

	    while (node) {
	        if (bubble.isBubbleNode(node)) {
	            return node;
	        }

	        if (node.nodeType === Node.TEXT_NODE && text.textClean(node.nodeValue)) {
	            return;
	        }

	        node = node.previousSibling;
	    }
	}

	function findBubbleRight(selection) {
	    if (!selection.focusNode || !selection.anchorNode) {
	        return;
	    }

	    var node = selection.focusNode.nextSibling;

	    if (selection.anchorNode !== selection.focusNode && selection.anchorNode.compareDocumentPosition(selection.focusNode) & Node.DOCUMENT_POSITION_FOLLOWING) {
	        node = selection.anchorNode.nextSibling;
	    }

	    while (node) {
	        if (bubble.isBubbleNode(node)) {
	            return node;
	        }

	        if (node.nodeType === Node.TEXT_NODE && text.textClean(node.nodeValue)) {
	            return;
	        }

	        node = node.nextSibling;
	    }
	}

	function closestNodeSet(node) {
	    while (node) {
	        if (isEditorNode(node)) {
	            return node;
	        }

	        node = node.parentNode;
	    }
	}

	function closestNodeBubble(node) {
	    while (node) {
	        if (bubble.isBubbleNode(node)) {
	            return node;
	        }

	        if (isEditorNode(node)) {
	            return;
	        }

	        node = node.parentNode;
	    }
	}

	function prevBubble(target) {
	    var node = target && target.previousSibling;
	    while (node) {
	        if (bubble.isBubbleNode(node)) {
	            return node;
	        }

	        node = node.previousSibling;
	    }
	}

	function nextBubble(target) {
	    var node = target && target.nextSibling;
	    while (node) {
	        if (bubble.isBubbleNode(node)) {
	            return node;
	        }

	        node = node.nextSibling;
	    }
	}

	function isEditorNode(node) {
	    return node.nodeType === Node.ELEMENT_NODE && node.getAttribute('is') === 'x-bubbles';
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var raf = __webpack_require__(9);
	var context = __webpack_require__(1);

	/* eslint quotes: 0 */

	var HTML_ESCAPES = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '`': '&#96;'
	};

	var HTML_UNESCAPES = {
	    '&amp;': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&#39;': "'",
	    '&#96;': '`'
	};

	var REG_ESCAPED_HTML = /&(?:amp|lt|gt|quot|#39|#96);/g;
	var REG_UNESCAPED_HTML = /[&<>"'`]/g;
	var REG_HAS_ESCAPED_HTML = RegExp(REG_ESCAPED_HTML.source);
	var REG_HAS_UNESCAPED_HTML = RegExp(REG_UNESCAPED_HTML.source);
	var REG_IE = /Trident|Edge/;

	exports.throttle = function (callback, runContext) {
	    var throttle = 0;
	    var animationCallback = function animationCallback() {
	        throttle = 0;
	    };

	    return function () {
	        if (throttle) {
	            return;
	        }

	        throttle = raf(animationCallback);

	        callback.apply(runContext || this, arguments);
	    };
	};

	exports.escape = function (data) {
	    data = String(data);

	    if (data && REG_HAS_UNESCAPED_HTML.test(data)) {
	        return data.replace(REG_UNESCAPED_HTML, escapeHtmlChar);
	    }

	    return data;
	};

	exports.unescape = function (data) {
	    data = String(data);

	    if (data && REG_HAS_ESCAPED_HTML.test(data)) {
	        return data.replace(REG_ESCAPED_HTML, unescapeHtmlChar);
	    }

	    return data;
	};

	exports.canUseDrag = function () {
	    return !REG_IE.test(context.navigator.userAgent);
	};

	function unescapeHtmlChar(chr) {
	    return HTML_UNESCAPES[chr];
	}

	function escapeHtmlChar(chr) {
	    return HTML_ESCAPES[chr];
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(10)
	  , root = typeof window === 'undefined' ? global : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix]
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix]
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}

	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(root, arguments)
	}
	module.exports.polyfill = function() {
	  root.requestAnimationFrame = raf
	  root.cancelAnimationFrame = caf
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * @module x-bubbles/event
	 */

	var context = __webpack_require__(1);
	var CustomEventCommon = __webpack_require__(13);

	exports.scrollX = scrollX;
	exports.scrollY = scrollY;
	exports.dispatch = dispatch;

	exports.keyCode = function (event) {
	    return event.charCode || event.keyCode;
	};

	exports.metaKey = function (event) {
	    return event.ctrlKey || event.metaKey;
	};

	exports.pageX = function (event) {
	    return event.pageX === null && event.clientX !== null ? event.clientX + scrollX() : event.pageX;
	};

	exports.pageY = function (event) {
	    return event.pageY === null && event.clientY !== null ? event.clientY + scrollY() : event.pageY;
	};

	exports.one = function (target, eventName, callback) {
	    var events = callback ? _defineProperty({}, eventName, callback) : eventName;
	    for (var name in events) {
	        target.addEventListener(name, oneCallback(target, name, events[name]));
	    }
	};

	exports.on = function (target, eventName, callback) {
	    var events = callback ? _defineProperty({}, eventName, callback) : eventName;
	    for (var name in events) {
	        target.addEventListener(name, events[name]);
	    }
	};

	exports.off = function (target, eventName, callback) {
	    var events = callback ? _defineProperty({}, eventName, callback) : eventName;
	    for (var name in events) {
	        target.removeEventListener(name, events[name]);
	    }
	};

	exports.prevent = function (event) {
	    event.cancelBubble = true;
	    event.returnValue = false;
	    event.stopImmediatePropagation();
	    event.stopPropagation();
	    event.preventDefault();
	    return false;
	};

	function scrollX() {
	    var html = context.document.documentElement;
	    var body = context.document.body;
	    return (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
	}

	function scrollY() {
	    var html = context.document.documentElement;
	    var body = context.document.body;
	    return (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
	}

	/**
	 * Designer events.
	 *
	 * @example
	 * const { Custom } = require('event');
	 *
	 * new Custom('custom-event', {
	 *     bubbles: true,
	 *     cancelable: true,
	 *     detail: { data: '123' }
	 * })
	 *
	 * @alias module:x-bubbles/event~Custom
	 * @constructor
	 */
	var Custom = function () {
	    if (typeof context.CustomEvent === 'function') {
	        return context.CustomEvent;
	    }

	    return CustomEventCommon;
	}();

	/**
	 * Dispatch event.
	 *
	 * @example
	 * const { dispatch } = require('event');
	 * dispatch(node, 'custom-event', {
	 *     bubbles: true,
	 *     cancelable: true,
	 *     detail: { data: '123' }
	 * })
	 *
	 * @alias module:x-bubbles/event.dispatch
	 * @param {HTMLElement} element node events
	 * @param {string} name event name
	 * @param {Object} params the event parameters
	 * @param {boolean} [params.bubbles=false]
	 * @param {boolean} [params.cancelable=false]
	 * @param {*} [params.detail]
	 */
	function dispatch(element, name) {
	    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    element.dispatchEvent(new Custom(name, params));
	}

	function oneCallback(target, eventName, callback) {
	    return function _callback(event) {
	        target.removeEventListener(eventName, _callback);
	        callback(event);
	    };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(1);

	/**
	 * @constant {Document}
	 * @private
	 */
	var doc = context.document;

	/**
	 * @constant {Object}
	 * @private
	 */
	var protoEvent = context.Event.prototype;

	var issetCustomEvent = false;

	try {
	    issetCustomEvent = Boolean(doc.createEvent('CustomEvent'));
	} catch (e) {}
	// do nothing


	/**
	 * The original function "stopImmediatePropagation"
	 * @constant {function}
	 * @private
	 */
	var stopImmediatePropagation = protoEvent.stopImmediatePropagation;

	/**
	 * Override function to set properties "immediatePropagationStopped"
	 */
	protoEvent.stopImmediatePropagation = function () {
	    this.immediatePropagationStopped = true;

	    if (stopImmediatePropagation) {
	        stopImmediatePropagation.call(this);
	    } else {
	        this.stopPropagation();
	    }
	};

	var CustomEventCommon = function () {
	    if (issetCustomEvent) {
	        return function (eventName, params) {
	            params = params || {};

	            var bubbles = Boolean(params.bubbles);
	            var cancelable = Boolean(params.cancelable);
	            var evt = doc.createEvent('CustomEvent');

	            evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

	            return evt;
	        };
	    }

	    return function (eventName, params) {
	        params = params || {};

	        var bubbles = Boolean(params.bubbles);
	        var cancelable = Boolean(params.cancelable);
	        var evt = doc.createEvent('Event');

	        evt.initEvent(eventName, bubbles, cancelable);
	        evt.detail = params.detail;

	        return evt;
	    };
	}();

	CustomEventCommon.prototype = protoEvent;

	module.exports = CustomEventCommon;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	exports.KEY = {
	    a: 65,
	    Backspace: 8,
	    Bottom: 40,
	    c: 67,
	    Cmd: 91,
	    Comma: 44, // ,
	    Delete: 46,
	    Enter: 13, // Enter
	    Esc: 27,
	    Left: 37,
	    Right: 39,
	    Semicolon: 59, // ;
	    Space: 32,
	    Tab: 9,
	    Top: 38,
	    x: 88
	};

	exports.CLS = {
	    DRAGSTART: 'drag',
	    DROPZONE: 'dropzone'
	};

	exports.EV = {
	    BUBBLE_EDIT: 'bubble-edit',
	    BUBBLE_INPUT: 'bubble-input',
	    CHANGE: 'change',
	    DRAGEND: 'dragend',
	    DRAGENTER: 'dragenter',
	    DRAGLEAVE: 'dragleave',
	    DRAGSTART: 'dragstart',
	    DROP: 'drop'
	};

	exports.PROPS = {
	    BUBBLE_VALUE: '_bubbleValue',
	    CLICK_TIME: '_clickTime',
	    LOCK_COPY: '_lockCopy'
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DRAG_IMG_WIDTH = 16;

	var dragImage = null;

	exports.DRAG_IMG_WIDTH = DRAG_IMG_WIDTH;

	exports.getDragImage = function () {
	    if (!dragImage) {
	        dragImage = new Image();
	        dragImage.src = __webpack_require__(16);
	    }

	    return dragImage;
	};

	exports.onDropSuccess = function (fromNodeSet, toNodeSet) {
	    fromNodeSet.fireChange();
	    toNodeSet.focus();
	    toNodeSet.fireChange();
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB3klEQVR4XtWWMWgTYRTH/0n0IjWNkSo9jYJTx4KDAXWoIChtqdBFkG6lTm5iiw5OHQQFV4fSunYTOpVucbRDBicVUmmb0GsuJCYGknjfez4+PmjUy8U7cegffty3vPfjfY/jLsbM+J+JC8dbcAIm97aqEwBeCjmEywdhaePOSD5QQETr1y6m7Ww6iTApNTq57XJjHcCFYIEiGyeTKLYQKkmp0bWDrkiRQstD6HikazFYoBQIEWJql9+Ncu9Ons86+d8EBOKoAsLtG9P67FTLuY+fC3onf0zgcfQJKu1tfbaGU2Bm2+eKvKgTmFpdjK5qgtlnB17kHZjanq5M7LvkkltvZs+khxEm3xpNDCUqvwjIX0ALX4o7bwHYAs6fG8HlS1ns7ZdQcavol9NWHVNjb6COBP5XVJgf3+x9G8dXCuwpguu6eDrxAINCjIAJfFCk4Bw6eHZrLvTy+W8EpAiPrt6HYgth0qx1wcylgYKZobuTu59gduKfs6OnYF9J4eDrd9ScNkwOhAWY/NMXbXEtwxmR1KX5q/l6LOB7EAnd9MlqhhGQWM8zLiSM1IC4pn9uCtcfr6QXXz9svADwXsgLnqAEFgE0prklJA2WkSSEWICEDD+ErtAR2jCS4/9X8RPiO+YqXEJbcwAAAABJRU5ErkJggg=="

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(1);
	var events = __webpack_require__(12);
	var utils = __webpack_require__(8);
	var select = __webpack_require__(4);
	var bubbleset = __webpack_require__(7);
	var Modernizr = __webpack_require__(18);

	var _require = __webpack_require__(14),
	    CLS = _require.CLS,
	    EV = _require.EV;

	var _require2 = __webpack_require__(15),
	    getDragImage = _require2.getDragImage,
	    onDropSuccess = _require2.onDropSuccess,
	    DRAG_IMG_WIDTH = _require2.DRAG_IMG_WIDTH;

	var currentDragSet = null;
	var currentMoveSet = null;
	var currentDragElement = null;

	exports.init = function (nodeSet) {
	    events.on(nodeSet, 'mousedown', onMousedown);
	};

	exports.destroy = function (nodeSet) {
	    events.off(nodeSet, 'mousedown', onMousedown);
	};

	function onMousedown(event) {
	    var nodeBubble = bubbleset.closestNodeBubble(event.target);
	    if (!nodeBubble) {
	        return;
	    }

	    var nodeSet = bubbleset.closestNodeSet(event.target);
	    if (!nodeSet) {
	        return;
	    }

	    event.preventDefault();
	    nodeSet.focus();

	    var drag = nodeSet.__drag__ = {
	        onMouseup: onMouseup.bind(this, nodeSet),
	        onMousemove: utils.throttle(onMousemove.bind(this, nodeSet)),
	        onScroll: utils.throttle(onScroll.bind(this, nodeSet)),
	        nodeOffsetX: event.offsetX,
	        nodeOffsetY: event.offsetY,
	        x: 0,
	        y: 0
	    };

	    currentDragSet = null;
	    currentMoveSet = null;
	    currentDragElement = null;

	    events.one(document, 'mouseup', drag.onMouseup);
	    events.on(document, 'mousemove', drag.onMousemove);
	    events.on(document, 'scroll', drag.onScroll);
	}

	function onMouseup(dragSet, event) {
	    var drag = dragSet.__drag__;
	    if (!drag) {
	        return;
	    }

	    events.off(document, 'mousemove', drag.onMousemove);
	    events.off(document, 'scroll', drag.onScroll);
	    delete dragSet.__drag__;

	    if (currentDragElement) {
	        currentDragElement.parentNode && currentDragElement.parentNode.removeChild(currentDragElement);
	        currentDragElement = null;
	    }

	    if (currentMoveSet) {
	        var _ = currentMoveSet;
	        currentMoveSet = null;

	        _.classList.remove(CLS.DROPZONE);
	        events.dispatch(_, EV.DRAGLEAVE, { bubbles: false, cancelable: false });
	    }

	    if (currentDragSet) {
	        (function () {
	            var nodeSet = bubbleset.closestNodeSet(event.target);

	            if (nodeSet && nodeSet !== currentDragSet) {
	                var list = select.get(currentDragSet);

	                if (list.length) {
	                    list.forEach(function (item) {
	                        return nodeSet.appendChild(item);
	                    });
	                    context.setTimeout(onDropSuccess, 0, currentDragSet, nodeSet);
	                }
	            }

	            var _ = currentDragSet;
	            currentDragSet = null;

	            _.classList.remove(CLS.DRAGSTART);
	            events.dispatch(_, EV.DROP, { bubbles: false, cancelable: false });
	            events.dispatch(_, EV.DRAGEND, { bubbles: false, cancelable: false });
	        })();
	    }
	}

	function onMousemove(dragSet, event) {
	    var drag = dragSet.__drag__;
	    if (!drag) {
	        return;
	    }

	    if (!currentDragSet) {
	        var selection = context.getSelection();
	        selection && selection.removeAllRanges();

	        currentDragSet = dragSet;
	        currentDragSet.classList.add(CLS.DRAGSTART);

	        var nodeBubble = bubbleset.closestNodeBubble(event.target);
	        var moveElement = void 0;

	        if (nodeBubble) {
	            select.add(nodeBubble);
	            if (select.get(currentDragSet).length === 1) {
	                moveElement = nodeBubble.cloneNode(true);
	            }
	        }

	        if (!moveElement) {
	            moveElement = getDragImage();
	            drag.nodeOffsetX = DRAG_IMG_WIDTH;
	            drag.nodeOffsetY = DRAG_IMG_WIDTH;
	        }

	        currentDragElement = document.body.appendChild(document.createElement('div'));
	        currentDragElement.style.cssText = 'position:absolute;z-index:9999;pointer-events:none;top:0;left:0;';
	        currentDragElement.appendChild(moveElement);

	        events.dispatch(currentDragSet, EV.DRAGSTART, { bubbles: false, cancelable: false });
	    }

	    drag.x = event.clientX;
	    drag.y = event.clientY;
	    onScroll(dragSet);

	    var nodeSet = bubbleset.closestNodeSet(event.target);
	    if (nodeSet && nodeSet !== currentDragSet) {
	        if (currentMoveSet && currentMoveSet !== nodeSet) {
	            currentMoveSet.classList.remove(CLS.DROPZONE);
	            nodeSet.classList.add(CLS.DROPZONE);
	            currentMoveSet = nodeSet;
	            events.dispatch(currentMoveSet, EV.DRAGENTER, { bubbles: false, cancelable: false });
	        } else if (!currentMoveSet) {
	            nodeSet.classList.add(CLS.DROPZONE);
	            currentMoveSet = nodeSet;
	            events.dispatch(currentMoveSet, EV.DRAGENTER, { bubbles: false, cancelable: false });
	        }
	    } else if (currentMoveSet) {
	        var _ = currentMoveSet;
	        currentMoveSet = null;

	        _.classList.remove(CLS.DROPZONE);
	        events.dispatch(_, EV.DRAGLEAVE, { bubbles: false, cancelable: false });
	    }
	}

	function onScroll(dragSet) {
	    var drag = dragSet.__drag__;
	    if (!drag || !currentDragElement) {
	        return;
	    }

	    var x = drag.x - drag.nodeOffsetX + events.scrollX();
	    var y = drag.y - drag.nodeOffsetY + events.scrollY();

	    if (Modernizr.csstransforms3d) {
	        currentDragElement.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
	    } else if (Modernizr.csstransforms) {
	        currentDragElement.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
	    } else {
	        currentDragElement.style.top = y + 'px';
	        currentDragElement.style.left = x + 'px';
	    }
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	;(function(window){
	/*!
	 * modernizr v3.3.1
	 * Build http://modernizr.com/download?-csstransforms-csstransforms3d-dontmin
	 *
	 * Copyright (c)
	 *  Faruk Ates
	 *  Paul Irish
	 *  Alex Sexton
	 *  Ryan Seddon
	 *  Patrick Kettner
	 *  Stu Cox
	 *  Richard Herrera

	 * MIT License
	 */

	/*
	 * Modernizr tests which native CSS3 and HTML5 features are available in the
	 * current UA and makes the results available to you in two ways: as properties on
	 * a global `Modernizr` object, and as classes on the `<html>` element. This
	 * information allows you to progressively enhance your pages with a granular level
	 * of control over the experience.
	*/

	;(function(window, document, undefined){
	  var tests = [];
	  

	  /**
	   *
	   * ModernizrProto is the constructor for Modernizr
	   *
	   * @class
	   * @access public
	   */

	  var ModernizrProto = {
	    // The current version, dummy
	    _version: '3.3.1',

	    // Any settings that don't work as separate modules
	    // can go in here as configuration.
	    _config: {
	      'classPrefix': '',
	      'enableClasses': true,
	      'enableJSClass': true,
	      'usePrefixes': true
	    },

	    // Queue of tests
	    _q: [],

	    // Stub these for people who are listening
	    on: function(test, cb) {
	      // I don't really think people should do this, but we can
	      // safe guard it a bit.
	      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
	      // This is in case people listen to synchronous tests. I would leave it out,
	      // but the code to *disallow* sync tests in the real version of this
	      // function is actually larger than this.
	      var self = this;
	      setTimeout(function() {
	        cb(self[test]);
	      }, 0);
	    },

	    addTest: function(name, fn, options) {
	      tests.push({name: name, fn: fn, options: options});
	    },

	    addAsyncTest: function(fn) {
	      tests.push({name: null, fn: fn});
	    }
	  };

	  

	  // Fake some of Object.create so we can force non test results to be non "own" properties.
	  var Modernizr = function() {};
	  Modernizr.prototype = ModernizrProto;

	  // Leak modernizr globally when you `require` it rather than force it here.
	  // Overwrite name so constructor name is nicer :D
	  Modernizr = new Modernizr();

	  

	  var classes = [];
	  

	  /**
	   * is returns a boolean if the typeof an obj is exactly type.
	   *
	   * @access private
	   * @function is
	   * @param {*} obj - A thing we want to check the type of
	   * @param {string} type - A string to compare the typeof against
	   * @returns {boolean}
	   */

	  function is(obj, type) {
	    return typeof obj === type;
	  }
	  ;

	  /**
	   * Run through all tests and detect their support in the current UA.
	   *
	   * @access private
	   */

	  function testRunner() {
	    var featureNames;
	    var feature;
	    var aliasIdx;
	    var result;
	    var nameIdx;
	    var featureName;
	    var featureNameSplit;

	    for (var featureIdx in tests) {
	      if (tests.hasOwnProperty(featureIdx)) {
	        featureNames = [];
	        feature = tests[featureIdx];
	        // run the test, throw the return value into the Modernizr,
	        // then based on that boolean, define an appropriate className
	        // and push it into an array of classes we'll join later.
	        //
	        // If there is no name, it's an 'async' test that is run,
	        // but not directly added to the object. That should
	        // be done with a post-run addTest call.
	        if (feature.name) {
	          featureNames.push(feature.name.toLowerCase());

	          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
	            // Add all the aliases into the names list
	            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
	              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
	            }
	          }
	        }

	        // Run the test, or use the raw value if it's not a function
	        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


	        // Set each of the names on the Modernizr object
	        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
	          featureName = featureNames[nameIdx];
	          // Support dot properties as sub tests. We don't do checking to make sure
	          // that the implied parent tests have been added. You must call them in
	          // order (either in the test, or make the parent test a dependency).
	          //
	          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
	          // hashtag famous last words
	          featureNameSplit = featureName.split('.');

	          if (featureNameSplit.length === 1) {
	            Modernizr[featureNameSplit[0]] = result;
	          } else {
	            // cast to a Boolean, if not one already
	            /* jshint -W053 */
	            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
	              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
	            }

	            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
	          }

	          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
	        }
	      }
	    }
	  }
	  ;

	  /**
	   * If the browsers follow the spec, then they would expose vendor-specific style as:
	   *   elem.style.WebkitBorderRadius
	   * instead of something like the following, which would be technically incorrect:
	   *   elem.style.webkitBorderRadius

	   * Webkit ghosts their properties in lowercase but Opera & Moz do not.
	   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
	   *   erik.eae.net/archives/2008/03/10/21.48.10/

	   * More here: github.com/Modernizr/Modernizr/issues/issue/21
	   *
	   * @access private
	   * @returns {string} The string representing the vendor-specific style properties
	   */

	  var omPrefixes = 'Moz O ms Webkit';
	  

	  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
	  ModernizrProto._cssomPrefixes = cssomPrefixes;
	  


	  /**
	   * contains checks to see if a string contains another string
	   *
	   * @access private
	   * @function contains
	   * @param {string} str - The string we want to check for substrings
	   * @param {string} substr - The substring we want to search the first string for
	   * @returns {boolean}
	   */

	  function contains(str, substr) {
	    return !!~('' + str).indexOf(substr);
	  }

	  ;

	  /**
	   * docElement is a convenience wrapper to grab the root element of the document
	   *
	   * @access private
	   * @returns {HTMLElement|SVGElement} The root element of the document
	   */

	  var docElement = document.documentElement;
	  

	  /**
	   * A convenience helper to check if the document we are running in is an SVG document
	   *
	   * @access private
	   * @returns {boolean}
	   */

	  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
	  

	  /**
	   * createElement is a convenience wrapper around document.createElement. Since we
	   * use createElement all over the place, this allows for (slightly) smaller code
	   * as well as abstracting away issues with creating elements in contexts other than
	   * HTML documents (e.g. SVG documents).
	   *
	   * @access private
	   * @function createElement
	   * @returns {HTMLElement|SVGElement} An HTML or SVG element
	   */

	  function createElement() {
	    if (typeof document.createElement !== 'function') {
	      // This is the case in IE7, where the type of createElement is "object".
	      // For this reason, we cannot call apply() as Object is not a Function.
	      return document.createElement(arguments[0]);
	    } else if (isSVG) {
	      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
	    } else {
	      return document.createElement.apply(document, arguments);
	    }
	  }

	  ;

	  /**
	   * Create our "modernizr" element that we do most feature tests on.
	   *
	   * @access private
	   */

	  var modElem = {
	    elem: createElement('modernizr')
	  };

	  // Clean up this element
	  Modernizr._q.push(function() {
	    delete modElem.elem;
	  });

	  

	  var mStyle = {
	    style: modElem.elem.style
	  };

	  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
	  // the front of the queue.
	  Modernizr._q.unshift(function() {
	    delete mStyle.style;
	  });

	  

	  /**
	   * getBody returns the body of a document, or an element that can stand in for
	   * the body if a real body does not exist
	   *
	   * @access private
	   * @function getBody
	   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
	   * artificially created element that stands in for the body
	   */

	  function getBody() {
	    // After page load injecting a fake body doesn't work so check if body exists
	    var body = document.body;

	    if (!body) {
	      // Can't use the real body create a fake one.
	      body = createElement(isSVG ? 'svg' : 'body');
	      body.fake = true;
	    }

	    return body;
	  }

	  ;

	  /**
	   * injectElementWithStyles injects an element with style element and some CSS rules
	   *
	   * @access private
	   * @function injectElementWithStyles
	   * @param {string} rule - String representing a css rule
	   * @param {function} callback - A function that is used to test the injected element
	   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	   * @returns {boolean}
	   */

	  function injectElementWithStyles(rule, callback, nodes, testnames) {
	    var mod = 'modernizr';
	    var style;
	    var ret;
	    var node;
	    var docOverflow;
	    var div = createElement('div');
	    var body = getBody();

	    if (parseInt(nodes, 10)) {
	      // In order not to give false positives we create a node for each test
	      // This also allows the method to scale for unspecified uses
	      while (nodes--) {
	        node = createElement('div');
	        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
	        div.appendChild(node);
	      }
	    }

	    style = createElement('style');
	    style.type = 'text/css';
	    style.id = 's' + mod;

	    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
	    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
	    (!body.fake ? div : body).appendChild(style);
	    body.appendChild(div);

	    if (style.styleSheet) {
	      style.styleSheet.cssText = rule;
	    } else {
	      style.appendChild(document.createTextNode(rule));
	    }
	    div.id = mod;

	    if (body.fake) {
	      //avoid crashing IE8, if background image is used
	      body.style.background = '';
	      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
	      body.style.overflow = 'hidden';
	      docOverflow = docElement.style.overflow;
	      docElement.style.overflow = 'hidden';
	      docElement.appendChild(body);
	    }

	    ret = callback(div, rule);
	    // If this is done after page load we don't want to remove the body so check if body exists
	    if (body.fake) {
	      body.parentNode.removeChild(body);
	      docElement.style.overflow = docOverflow;
	      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
	      docElement.offsetHeight;
	    } else {
	      div.parentNode.removeChild(div);
	    }

	    return !!ret;

	  }

	  ;

	  /**
	   * domToCSS takes a camelCase string and converts it to kebab-case
	   * e.g. boxSizing -> box-sizing
	   *
	   * @access private
	   * @function domToCSS
	   * @param {string} name - String name of camelCase prop we want to convert
	   * @returns {string} The kebab-case version of the supplied name
	   */

	  function domToCSS(name) {
	    return name.replace(/([A-Z])/g, function(str, m1) {
	      return '-' + m1.toLowerCase();
	    }).replace(/^ms-/, '-ms-');
	  }
	  ;

	  /**
	   * nativeTestProps allows for us to use native feature detection functionality if available.
	   * some prefixed form, or false, in the case of an unsupported rule
	   *
	   * @access private
	   * @function nativeTestProps
	   * @param {array} props - An array of property names
	   * @param {string} value - A string representing the value we want to check via @supports
	   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
	   */

	  // Accepts a list of property names and a single value
	  // Returns `undefined` if native detection not available
	  function nativeTestProps(props, value) {
	    var i = props.length;
	    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
	    if ('CSS' in window && 'supports' in window.CSS) {
	      // Try every prefixed variant of the property
	      while (i--) {
	        if (window.CSS.supports(domToCSS(props[i]), value)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    // Otherwise fall back to at-rule (for Opera 12.x)
	    else if ('CSSSupportsRule' in window) {
	      // Build a condition string for every prefixed variant
	      var conditionText = [];
	      while (i--) {
	        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
	      }
	      conditionText = conditionText.join(' or ');
	      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
	        return getComputedStyle(node, null).position == 'absolute';
	      });
	    }
	    return undefined;
	  }
	  ;

	  /**
	   * cssToDOM takes a kebab-case string and converts it to camelCase
	   * e.g. box-sizing -> boxSizing
	   *
	   * @access private
	   * @function cssToDOM
	   * @param {string} name - String name of kebab-case prop we want to convert
	   * @returns {string} The camelCase version of the supplied name
	   */

	  function cssToDOM(name) {
	    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
	      return m1 + m2.toUpperCase();
	    }).replace(/^-/, '');
	  }
	  ;

	  // testProps is a generic CSS / DOM property test.

	  // In testing support for a given CSS property, it's legit to test:
	  //    `elem.style[styleName] !== undefined`
	  // If the property is supported it will return an empty string,
	  // if unsupported it will return undefined.

	  // We'll take advantage of this quick test and skip setting a style
	  // on our modernizr element, but instead just testing undefined vs
	  // empty string.

	  // Property names can be provided in either camelCase or kebab-case.

	  function testProps(props, prefixed, value, skipValueTest) {
	    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

	    // Try native detect first
	    if (!is(value, 'undefined')) {
	      var result = nativeTestProps(props, value);
	      if (!is(result, 'undefined')) {
	        return result;
	      }
	    }

	    // Otherwise do it properly
	    var afterInit, i, propsLength, prop, before;

	    // If we don't have a style element, that means we're running async or after
	    // the core tests, so we'll need to create our own elements to use

	    // inside of an SVG element, in certain browsers, the `style` element is only
	    // defined for valid tags. Therefore, if `modernizr` does not have one, we
	    // fall back to a less used element and hope for the best.
	    var elems = ['modernizr', 'tspan'];
	    while (!mStyle.style) {
	      afterInit = true;
	      mStyle.modElem = createElement(elems.shift());
	      mStyle.style = mStyle.modElem.style;
	    }

	    // Delete the objects if we created them.
	    function cleanElems() {
	      if (afterInit) {
	        delete mStyle.style;
	        delete mStyle.modElem;
	      }
	    }

	    propsLength = props.length;
	    for (i = 0; i < propsLength; i++) {
	      prop = props[i];
	      before = mStyle.style[prop];

	      if (contains(prop, '-')) {
	        prop = cssToDOM(prop);
	      }

	      if (mStyle.style[prop] !== undefined) {

	        // If value to test has been passed in, do a set-and-check test.
	        // 0 (integer) is a valid property value, so check that `value` isn't
	        // undefined, rather than just checking it's truthy.
	        if (!skipValueTest && !is(value, 'undefined')) {

	          // Needs a try catch block because of old IE. This is slow, but will
	          // be avoided in most cases because `skipValueTest` will be used.
	          try {
	            mStyle.style[prop] = value;
	          } catch (e) {}

	          // If the property value has changed, we assume the value used is
	          // supported. If `value` is empty string, it'll fail here (because
	          // it hasn't changed), which matches how browsers have implemented
	          // CSS.supports()
	          if (mStyle.style[prop] != before) {
	            cleanElems();
	            return prefixed == 'pfx' ? prop : true;
	          }
	        }
	        // Otherwise just return true, or the property name if this is a
	        // `prefixed()` call
	        else {
	          cleanElems();
	          return prefixed == 'pfx' ? prop : true;
	        }
	      }
	    }
	    cleanElems();
	    return false;
	  }

	  ;

	  /**
	   * List of JavaScript DOM values used for tests
	   *
	   * @memberof Modernizr
	   * @name Modernizr._domPrefixes
	   * @optionName Modernizr._domPrefixes
	   * @optionProp domPrefixes
	   * @access public
	   * @example
	   *
	   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
	   * than kebab-case properties, all properties are their Capitalized variant
	   *
	   * ```js
	   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
	   * ```
	   */

	  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
	  ModernizrProto._domPrefixes = domPrefixes;
	  

	  /**
	   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
	   *
	   * @access private
	   * @function fnBind
	   * @param {function} fn - a function you want to change `this` reference to
	   * @param {object} that - the `this` you want to call the function with
	   * @returns {function} The wrapped version of the supplied function
	   */

	  function fnBind(fn, that) {
	    return function() {
	      return fn.apply(that, arguments);
	    };
	  }

	  ;

	  /**
	   * testDOMProps is a generic DOM property test; if a browser supports
	   *   a certain property, it won't return undefined for it.
	   *
	   * @access private
	   * @function testDOMProps
	   * @param {array.<string>} props - An array of properties to test for
	   * @param {object} obj - An object or Element you want to use to test the parameters again
	   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
	   */
	  function testDOMProps(props, obj, elem) {
	    var item;

	    for (var i in props) {
	      if (props[i] in obj) {

	        // return the property name as a string
	        if (elem === false) {
	          return props[i];
	        }

	        item = obj[props[i]];

	        // let's bind a function
	        if (is(item, 'function')) {
	          // bind to obj unless overriden
	          return fnBind(item, elem || obj);
	        }

	        // return the unbound function or obj or value
	        return item;
	      }
	    }
	    return false;
	  }

	  ;

	  /**
	   * testPropsAll tests a list of DOM properties we want to check against.
	   * We specify literally ALL possible (known and/or likely) properties on
	   * the element including the non-vendor prefixed one, for forward-
	   * compatibility.
	   *
	   * @access private
	   * @function testPropsAll
	   * @param {string} prop - A string of the property to test for
	   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
	   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
	   * @param {string} [value] - A string of a css value
	   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
	   */
	  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

	    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
	    props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

	    // did they call .prefixed('boxSizing') or are we just testing a prop?
	    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
	      return testProps(props, prefixed, value, skipValueTest);

	      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
	    } else {
	      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
	      return testDOMProps(props, prefixed, elem);
	    }
	  }

	  // Modernizr.testAllProps() investigates whether a given style property,
	  // or any of its vendor-prefixed variants, is recognized
	  //
	  // Note that the property names must be provided in the camelCase variant.
	  // Modernizr.testAllProps('boxSizing')
	  ModernizrProto.testAllProps = testPropsAll;

	  

	  /**
	   * testAllProps determines whether a given CSS property is supported in the browser
	   *
	   * @memberof Modernizr
	   * @name Modernizr.testAllProps
	   * @optionName Modernizr.testAllProps()
	   * @optionProp testAllProps
	   * @access public
	   * @function testAllProps
	   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
	   * @param {string} [value] - String of the value to test
	   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
	   * @example
	   *
	   * testAllProps determines whether a given CSS property, in some prefixed form,
	   * is supported by the browser.
	   *
	   * ```js
	   * testAllProps('boxSizing')  // true
	   * ```
	   *
	   * It can optionally be given a CSS value in string form to test if a property
	   * value is valid
	   *
	   * ```js
	   * testAllProps('display', 'block') // true
	   * testAllProps('display', 'penguin') // false
	   * ```
	   *
	   * A boolean can be passed as a third parameter to skip the value check when
	   * native detection (@supports) isn't available.
	   *
	   * ```js
	   * testAllProps('shapeOutside', 'content-box', true);
	   * ```
	   */

	  function testAllProps(prop, value, skipValueTest) {
	    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
	  }
	  ModernizrProto.testAllProps = testAllProps;
	  
	/*!
	{
	  "name": "CSS Transforms",
	  "property": "csstransforms",
	  "caniuse": "transforms2d",
	  "tags": ["css"]
	}
	!*/

	  Modernizr.addTest('csstransforms', function() {
	    // Android < 3.0 is buggy, so we sniff and blacklist
	    // http://git.io/hHzL7w
	    return navigator.userAgent.indexOf('Android 2.') === -1 &&
	           testAllProps('transform', 'scale(1)', true);
	  });


	  /**
	   * testStyles injects an element with style element and some CSS rules
	   *
	   * @memberof Modernizr
	   * @name Modernizr.testStyles
	   * @optionName Modernizr.testStyles()
	   * @optionProp testStyles
	   * @access public
	   * @function testStyles
	   * @param {string} rule - String representing a css rule
	   * @param {function} callback - A function that is used to test the injected element
	   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	   * @returns {boolean}
	   * @example
	   *
	   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
	   * along with (possibly multiple) DOM elements. This lets you check for features
	   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
	   *
	   * ```js
	   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
	   *   // elem is the first DOM node in the page (by default #modernizr)
	   *   // rule is the first argument you supplied - the CSS rule in string form
	   *
	   *   addTest('widthworks', elem.style.width === '9px')
	   * });
	   * ```
	   *
	   * If your test requires multiple nodes, you can include a third argument
	   * indicating how many additional div elements to include on the page. The
	   * additional nodes are injected as children of the `elem` that is returned as
	   * the first argument to the callback.
	   *
	   * ```js
	   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
	   *   document.getElementById('modernizr').style.width === '1px'; // true
	   *   document.getElementById('modernizr2').style.width === '2px'; // true
	   *   elem.firstChild === document.getElementById('modernizr2'); // true
	   * }, 1);
	   * ```
	   *
	   * By default, all of the additional elements have an ID of `modernizr[n]`, where
	   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
	   * the second additional is `#modernizr3`, etc.).
	   * If you want to have more meaningful IDs for your function, you can provide
	   * them as the fourth argument, as an array of strings
	   *
	   * ```js
	   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
	   *   elem.firstChild === document.getElementById('foo'); // true
	   *   elem.lastChild === document.getElementById('bar'); // true
	   * }, 2, ['foo', 'bar']);
	   * ```
	   *
	   */

	  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
	  
	/*!
	{
	  "name": "CSS Supports",
	  "property": "supports",
	  "caniuse": "css-featurequeries",
	  "tags": ["css"],
	  "builderAliases": ["css_supports"],
	  "notes": [{
	    "name": "W3 Spec",
	    "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
	  },{
	    "name": "Related Github Issue",
	    "href": "github.com/Modernizr/Modernizr/issues/648"
	  },{
	    "name": "W3 Info",
	    "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
	  }]
	}
	!*/

	  var newSyntax = 'CSS' in window && 'supports' in window.CSS;
	  var oldSyntax = 'supportsCSS' in window;
	  Modernizr.addTest('supports', newSyntax || oldSyntax);

	/*!
	{
	  "name": "CSS Transforms 3D",
	  "property": "csstransforms3d",
	  "caniuse": "transforms3d",
	  "tags": ["css"],
	  "warnings": [
	    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
	  ]
	}
	!*/

	  Modernizr.addTest('csstransforms3d', function() {
	    var ret = !!testAllProps('perspective', '1px', true);
	    var usePrefix = Modernizr._config.usePrefixes;

	    // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
	    //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
	    //   some conditions. As a result, Webkit typically recognizes the syntax but
	    //   will sometimes throw a false positive, thus we must do a more thorough check:
	    if (ret && (!usePrefix || 'webkitPerspective' in docElement.style)) {
	      var mq;
	      var defaultStyle = '#modernizr{width:0;height:0}';
	      // Use CSS Conditional Rules if available
	      if (Modernizr.supports) {
	        mq = '@supports (perspective: 1px)';
	      } else {
	        // Otherwise, Webkit allows this media query to succeed only if the feature is enabled.
	        // `@media (transform-3d),(-webkit-transform-3d){ ... }`
	        mq = '@media (transform-3d)';
	        if (usePrefix) {
	          mq += ',(-webkit-transform-3d)';
	        }
	      }

	      mq += '{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}';

	      testStyles(defaultStyle + mq, function(elem) {
	        ret = elem.offsetWidth === 7 && elem.offsetHeight === 18;
	      });
	    }

	    return ret;
	  });


	  // Run each test
	  testRunner();

	  delete ModernizrProto.addTest;
	  delete ModernizrProto.addAsyncTest;

	  // Run the things that are supposed to run after the tests
	  for (var i = 0; i < Modernizr._q.length; i++) {
	    Modernizr._q[i]();
	  }

	  // Leak Modernizr namespace
	  window.Modernizr = Modernizr;


	;

	})(window, document);
	module.exports = window.Modernizr;
	})(window);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var raf = __webpack_require__(9);
	var context = __webpack_require__(1);
	var bubbleset = __webpack_require__(7);
	var bubble = __webpack_require__(5);
	var cursor = __webpack_require__(20);
	var select = __webpack_require__(4);

	var _require = __webpack_require__(14),
	    KEY = _require.KEY,
	    EV = _require.EV,
	    PROPS = _require.PROPS;

	var text = __webpack_require__(6);
	var events = __webpack_require__(12);
	var utils = __webpack_require__(8);
	var copy = __webpack_require__(21);
	var paste = __webpack_require__(22);

	var EVENTS = {
	    blur: onBlur,
	    click: onClick,
	    focus: onFocus,
	    keydown: onKeydown,
	    keypress: onKeypress,
	    keyup: onKeyup,
	    mscontrolselect: events.prevent,
	    paste: paste,
	    resize: events.prevent,
	    resizestart: events.prevent
	};

	exports.init = function (nodeWrap) {
	    var nodeEditor = nodeWrap;
	    nodeEditor.setAttribute('contenteditable', 'true');
	    nodeEditor.setAttribute('spellcheck', 'false');

	    nodeEditor.fireChange = utils.throttle(fireChange, nodeWrap);
	    nodeEditor.fireEdit = utils.throttle(fireEdit, nodeWrap);
	    nodeEditor.fireInput = utils.throttle(fireInput, nodeWrap);

	    events.on(nodeEditor, EVENTS);

	    return {
	        addBubble: addBubble.bind(nodeEditor),
	        editBubble: editBubble.bind(nodeEditor),
	        inputValue: inputValue.bind(nodeEditor),
	        removeBubble: removeBubble.bind(nodeEditor),
	        setContent: setContent.bind(nodeEditor)
	    };
	};

	exports.destroy = function (nodeEditor) {
	    events.off(nodeEditor, EVENTS);
	};

	function onBlur(event) {
	    var nodeEditor = event.currentTarget;
	    if (nodeEditor[PROPS.LOCK_COPY]) {
	        return events.prevent(event);
	    }

	    select.clear(nodeEditor);
	    bubble.bubbling(nodeEditor);
	}

	function onFocus(event) {
	    var nodeEditor = event.currentTarget;
	    if (nodeEditor[PROPS.LOCK_COPY]) {
	        events.prevent(event);
	        delete nodeEditor[PROPS.LOCK_COPY];

	        // Safary 10 не сбрасывает курсор без задержки
	        raf(function () {
	            var selection = context.getSelection();
	            selection && selection.removeAllRanges();
	        });

	        return false;
	    }

	    cursor.restore(nodeEditor);
	}

	function onKeyup(event) {
	    var nodeEditor = event.currentTarget;
	    var code = events.keyCode(event);
	    var isPrintableChar = event.key ? event.key.length === 1 : (code > 47 || code === KEY.Space || code === KEY.Backspace) && code !== KEY.Cmd;

	    if (isPrintableChar) {
	        nodeEditor.fireInput();
	    }
	}

	function onKeypress(event) {
	    var code = events.keyCode(event);
	    var nodeEditor = event.currentTarget;

	    /* eslint no-case-declarations: 0 */
	    switch (code) {
	        case KEY.Enter:
	            event.preventDefault();
	            if (!nodeEditor.options('disableControls')) {
	                if (!editBubbleKeyboardEvent(nodeEditor)) {
	                    bubble.bubbling(nodeEditor);
	                    cursor.restore(nodeEditor);
	                }
	            }
	            break;

	        case KEY.Space:
	            if (editBubbleKeyboardEvent(nodeEditor)) {
	                event.preventDefault();
	            }
	            break;

	        case KEY.Comma:
	        case KEY.Semicolon:
	            event.preventDefault();
	            bubble.bubbling(nodeEditor);
	            cursor.restore(nodeEditor);
	            break;
	    }
	}

	function onKeydown(event) {
	    var code = events.keyCode(event);
	    var metaKey = events.metaKey(event);
	    var nodeEditor = event.currentTarget;
	    var enable = !nodeEditor.options('disableControls');

	    switch (code) {
	        case KEY.Esc:
	            event.preventDefault();
	            bubble.bubbling(nodeEditor);
	            cursor.restore(nodeEditor);
	            break;

	        case KEY.Backspace:
	            event.preventDefault();
	            backSpace(event);
	            break;

	        case KEY.Delete:
	            event.preventDefault();
	            deleteKeyboardEvent(event);
	            break;

	        case KEY.Left:
	            event.preventDefault();
	            arrowLeft(event);
	            break;

	        // сдвигаем курсор в начало списка
	        case KEY.Top:
	            event.preventDefault();
	            if (enable) {
	                var headBubble = bubbleset.headBubble(nodeEditor);
	                headBubble && select.uniq(headBubble);
	            }
	            break;

	        case KEY.Right:
	            event.preventDefault();
	            arrowRight(event);
	            break;

	        // сдвигаем курсор в конец списка
	        // case KEY.Tab:
	        case KEY.Bottom:
	            event.preventDefault();
	            if (enable && select.has(nodeEditor)) {
	                cursor.restore(nodeEditor);
	            }
	            break;

	        case KEY.a:
	            if (metaKey) {
	                event.preventDefault();

	                if (!text.selectAll(null, event.currentTarget)) {
	                    select.all(nodeEditor);
	                }
	            }
	            break;

	        case KEY.c:
	            if (metaKey) {
	                copy(event);
	            }
	            break;

	        case KEY.x:
	            if (metaKey) {
	                copy(event, function () {
	                    backSpaceBubbles(nodeEditor);
	                });
	            }
	            break;
	    }
	}

	function arrowLeft(event) {
	    var selection = context.getSelection();

	    if (text.arrowLeft(selection, event.shiftKey)) {
	        return;
	    }

	    if (selection.anchorNode && selection.anchorNode.nodeType === Node.TEXT_NODE) {
	        var nodeBubble = bubbleset.prevBubble(selection.anchorNode);
	        nodeBubble && select.uniq(nodeBubble);
	        return;
	    }

	    var nodeSet = event.currentTarget;
	    var list = select.get(nodeSet);
	    var begin = list.length > 1 && list[0] === nodeSet.startRangeSelect ? list[list.length - 1] : list[0];

	    var node = bubbleset.prevBubble(begin);

	    if (node) {
	        if (event.shiftKey) {
	            select.range(node);
	        } else {
	            select.uniq(node);
	        }
	    }
	}

	function arrowRight(event) {
	    var selection = context.getSelection();

	    if (text.arrowRight(selection, event.shiftKey)) {
	        return;
	    }

	    if (selection.focusNode && selection.focusNode.nodeType === Node.TEXT_NODE) {
	        var nodeBubble = bubbleset.nextBubble(selection.focusNode);
	        nodeBubble && select.uniq(nodeBubble);
	        return;
	    }

	    var nodeSet = event.currentTarget;
	    var list = select.get(nodeSet);
	    var begin = list.length > 1 && list[list.length - 1] === nodeSet.startRangeSelect ? list[0] : list[list.length - 1];

	    var node = bubbleset.nextBubble(begin);

	    if (node) {
	        if (event.shiftKey) {
	            select.range(node);
	        } else {
	            select.uniq(node);
	        }
	    } else if (begin && begin.nextSibling && begin.nextSibling.nodeType === Node.TEXT_NODE) {
	        select.clear(nodeSet);
	        selection.collapse(begin.nextSibling, 0);
	    } else {
	        cursor.restore(nodeSet);
	    }
	}

	/**
	 * Реакция на событие нажатия на кнопку Backspace.
	 * Нельзя выполнять normalize() перед выполнением, иначе в ИЕ сбивается Selection.
	 * @param {Event} event
	 */
	function backSpace(event) {
	    var nodeEditor = event.currentTarget;
	    var selection = context.getSelection();

	    if (!selection) {
	        return;
	    }

	    if (selection.isCollapsed) {
	        if (text.arrowLeft(selection, true)) {
	            text.remove(selection);
	            nodeEditor.fireInput();
	            return;
	        }
	    } else {
	        text.remove(selection);
	        nodeEditor.fireInput();
	        return;
	    }

	    var node = bubbleset.findBubbleLeft(selection);
	    if (node) {
	        select.uniq(node);
	        return;
	    }

	    backSpaceBubbles(nodeEditor);
	}

	/**
	 * Реакция на событие нажатия на кнопку Delete.
	 * Нельзя выполнять normalize() перед выполнением, иначе в ИЕ сбивается Selection.
	 * @param {Event} event
	 */
	function deleteKeyboardEvent(event) {
	    var nodeEditor = event.currentTarget;
	    var selection = context.getSelection();

	    if (!selection) {
	        return;
	    }

	    if (selection.isCollapsed) {
	        if (text.arrowRight(selection, true)) {
	            text.remove(selection);
	            nodeEditor.fireInput();
	            return;
	        }
	    } else {
	        text.remove(selection);
	        nodeEditor.fireInput();
	        return;
	    }

	    var node = bubbleset.findBubbleRight(selection);
	    if (node) {
	        select.uniq(node);
	        return;
	    }

	    deleteBubbles(nodeEditor);
	}

	function backSpaceBubbles(nodeEditor) {
	    var list = select.get(nodeEditor);
	    if (!list.length) {
	        return;
	    }

	    var prevBubble = list[0].previousSibling;
	    var nextBubble = list[list.length - 1].nextSibling;

	    list.forEach(function (item) {
	        return item.parentNode.removeChild(item);
	    });

	    if (bubble.isBubbleNode(prevBubble)) {
	        select.uniq(prevBubble);
	    } else if (bubble.isBubbleNode(nextBubble)) {
	        select.uniq(nextBubble);
	    } else {
	        nodeEditor.focus();
	        cursor.restore(nodeEditor);
	    }

	    nodeEditor.fireChange();
	}

	function deleteBubbles(nodeEditor) {
	    var list = select.get(nodeEditor);
	    if (!list.length) {
	        return;
	    }

	    var prevBubble = list[0].previousSibling;
	    var nextBubble = list[list.length - 1].nextSibling;

	    list.forEach(function (item) {
	        return item.parentNode.removeChild(item);
	    });

	    if (bubble.isBubbleNode(nextBubble)) {
	        select.uniq(nextBubble);
	    } else if (bubble.isBubbleNode(prevBubble)) {
	        select.uniq(prevBubble);
	    } else {
	        nodeEditor.focus();
	        cursor.restore(nodeEditor);
	    }

	    nodeEditor.fireChange();
	}

	function onClick(event) {
	    var nodeSet = bubbleset.closestNodeSet(event.target);

	    if (!nodeSet) {
	        return;
	    }

	    var nodeBubble = bubbleset.closestNodeBubble(event.target);

	    if (nodeBubble) {
	        var clickTime = Date.now();
	        var isDblclick = nodeSet[PROPS.CLICK_TIME] && clickTime - nodeSet[PROPS.CLICK_TIME] < 200;

	        nodeSet[PROPS.CLICK_TIME] = clickTime;

	        if (events.metaKey(event)) {
	            select.add(nodeBubble);
	        } else if (event.shiftKey) {
	            if (!nodeSet.startRangeSelect) {
	                select.uniq(nodeBubble);
	            } else {
	                select.range(nodeBubble);
	            }
	        } else if (isDblclick) {
	            bubble.edit(nodeSet, nodeBubble);
	        } else {
	            select.toggleUniq(nodeBubble);
	        }
	    } else {
	        select.clear(nodeSet);

	        var selection = context.getSelection();

	        if (!selection || !selection.anchorNode || selection.anchorNode.nodeType !== Node.TEXT_NODE) {

	            cursor.restore(nodeSet);
	        }
	    }
	}

	function editBubbleKeyboardEvent(nodeEditor) {
	    var selection = context.getSelection();

	    if (!selection || !selection.rangeCount) {
	        var list = select.get(nodeEditor);

	        if (list.length === 1) {
	            return bubble.edit(nodeEditor, list[0]);
	        }
	    }

	    return false;
	}

	function setContent(data) {
	    var selection = context.getSelection();
	    selection && selection.removeAllRanges();

	    while (this.firstChild) {
	        this.removeChild(this.firstChild);
	    }

	    data = text.html2text(data);
	    this.appendChild(this.ownerDocument.createTextNode(data));
	    bubble.bubbling(this);
	    cursor.restore(this);
	}

	function addBubble(bubbleText, dataAttributes) {
	    var nodeBubble = bubble.create(this, bubbleText, dataAttributes);
	    if (!nodeBubble) {
	        return false;
	    }

	    if (text.text2bubble(this, nodeBubble)) {
	        this.fireInput();
	        this.fireChange();
	        cursor.restore(this);
	        return true;
	    }

	    return false;
	}

	function removeBubble(nodeBubble) {
	    if (this.contains(nodeBubble)) {
	        this.removeChild(nodeBubble);
	        this.fireChange();
	        return true;
	    }

	    return false;
	}

	function editBubble(nodeBubble) {
	    if (this.contains(nodeBubble)) {
	        return bubble.edit(this, nodeBubble);
	    }

	    return false;
	}

	function inputValue() {
	    var textRange = text.currentTextRange(this);
	    return textRange && text.textClean(textRange.toString()) || '';
	}

	/**
	 * Генерация события редактирования бабла.
	 * Выполняется в контексте узла-обертки.
	 * @alias module:x-bubbles/editor.fireEdit
	 * @param {HTMLElement} nodeBubble нода бабл
	 * @this HTMLElement
	 * @private
	 */
	function fireEdit(nodeBubble) {
	    events.dispatch(this, EV.BUBBLE_EDIT, {
	        bubbles: false,
	        cancelable: false,
	        detail: { data: nodeBubble }
	    });
	}

	/**
	 * Генерация события изменения набора баблов.
	 * Выполняется в контексте узла-обертки.
	 * @alias module:x-bubbles/editor.fireChange
	 * @this HTMLElement
	 * @private
	 */
	function fireChange() {
	    events.dispatch(this, EV.CHANGE, {
	        bubbles: false,
	        cancelable: false
	    });
	}

	/**
	 * Генерация события ввода текста.
	 * Выполняется в контексте узла-обертки.
	 * @alias module:x-bubbles/editor.fireInput
	 * @this HTMLElement
	 * @private
	 */
	function fireInput() {
	    var editText = inputValue.call(this);

	    if (this[PROPS.BUBBLE_VALUE] !== editText) {
	        this[PROPS.BUBBLE_VALUE] = editText;

	        events.dispatch(this, EV.BUBBLE_INPUT, {
	            bubbles: false,
	            cancelable: false,
	            detail: { data: editText }
	        });
	    }
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @module x-bubbles/cursor
	 */

	var context = __webpack_require__(1);
	var text = __webpack_require__(6);
	var select = __webpack_require__(4);

	exports.restore = restore;
	exports.restoreBasis = restoreBasis;

	/**
	 * Reset the cursor position to the end of the input field.
	 * @alias module:x-bubbles/cursor.restore
	 * @param {HTMLElement} nodeSet
	 */
	function restore(nodeSet) {
	    select.clear(nodeSet);
	    var basis = restoreBasis(nodeSet);
	    var selection = context.getSelection();
	    selection.removeAllRanges();
	    selection.collapse(basis, 1);
	}

	/**
	 * The creation of the fake text at the end childNodes
	 * @alias module:x-bubbles/cursor.restoreBasis
	 * @param {HTMLElement} nodeSet
	 * @returns {HTMLTextElement} fake text node
	 */
	function restoreBasis(nodeSet) {
	    var fakeText = text.createZws();

	    if (nodeSet.hasChildNodes()) {
	        var lastNode = nodeSet.childNodes[nodeSet.childNodes.length - 1];

	        if (lastNode.isEqualNode(fakeText)) {
	            fakeText = lastNode;
	        } else {
	            nodeSet.appendChild(fakeText);
	        }
	    } else {
	        nodeSet.appendChild(fakeText);
	    }

	    return fakeText;
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var events = __webpack_require__(12);
	var select = __webpack_require__(4);

	var _require = __webpack_require__(14),
	    PROPS = _require.PROPS;

	module.exports = function (event) {
	    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

	    var nodeEditor = event.currentTarget;
	    var doc = nodeEditor.ownerDocument;
	    var selection = doc.defaultView.getSelection();

	    if (selection && selection.anchorNode) {
	        return false;
	    }

	    var list = select.get(nodeEditor);
	    if (!list.length) {
	        return false;
	    }

	    var bubbleCopy = nodeEditor.options('bubbleCopy');
	    var value = bubbleCopy(list);
	    if (!value) {
	        return false;
	    }

	    nodeEditor[PROPS.LOCK_COPY] = true;

	    var target = doc.createElement('input');
	    target.value = value;
	    target.style.cssText = '\n        position: absolute;\n        top: -9999px;\n        width: 1px;\n        height: 1px;\n        margin: 0;\n        padding: 0;\n        border: none;';

	    doc.body.appendChild(target);

	    events.one(target, {
	        blur: function blur() {
	            removeNode(target);
	            callback();
	        },
	        keyup: function keyup() {
	            nodeEditor.focus();
	            removeNode(target);
	        }
	    });

	    target.select();
	    return true;
	};

	function removeNode(node) {
	    node.parentNode && node.parentNode.removeChild(node);
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(1);
	var bubble = __webpack_require__(5);
	var cursor = __webpack_require__(20);
	var text = __webpack_require__(6);

	module.exports = function (event) {
	    event.preventDefault();
	    var nodeEditor = event.currentTarget;

	    if (context.clipboardData && context.clipboardData.getData) {
	        onPasteSuccess(nodeEditor, context.clipboardData.getData('Text'));
	    } else if (event.clipboardData) {
	        (function () {
	            var contentType = 'text/plain';
	            var clipboardData = event.clipboardData;
	            var data = clipboardData.getData && clipboardData.getData(contentType);

	            if (!onPasteSuccess(nodeEditor, data) && clipboardData.items) {
	                Array.prototype.slice.call(clipboardData.items).filter(function (item) {
	                    return item.kind === 'string' && item.type === contentType;
	                }).some(function (item) {
	                    item.getAsString(function (dataText) {
	                        onPasteSuccess(nodeEditor, dataText);
	                    });

	                    return true;
	                });
	            }
	        })();
	    }
	};

	function onPasteSuccess(nodeEditor, dataText) {
	    var checkBubblePaste = nodeEditor.options('checkBubblePaste');
	    var selection = context.getSelection();
	    var isBubbling = dataText && selection.isCollapsed && !nodeEditor.inputValue ? checkBubblePaste(dataText) : false;

	    if (text.replaceString(dataText, selection)) {
	        if (isBubbling) {
	            bubble.bubbling(nodeEditor);
	            cursor.restore(nodeEditor);
	        } else {
	            nodeEditor.fireInput();
	        }

	        return true;
	    }

	    return false;
	}

/***/ }
/******/ ]);