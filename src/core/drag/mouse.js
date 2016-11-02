const context = require('../../context');
const events = require('../events');
const select = require('../select');
const bubbleset = require('../bubbleset');
const Modernizr = require('modernizr');
const { CLS, EV } = require('../constant');
const { getDragImage, DRAG_IMG_WIDTH } = require('./common');

let currentDragSet = null;
let currentMoveSet = null;
let currentDragElement = null;

exports.init = function (nodeSet) {
    events.on(nodeSet, 'mousedown', onMousedown);
};

exports.destroy = function (nodeSet) {
    events.off(nodeSet, 'mousedown', onMousedown);
};

function onMousedown(event) {
    const nodeBubble = bubbleset.closestNodeBubble(event.target);
    if (!nodeBubble) {
        return;
    }

    const nodeSet = bubbleset.closestNodeSet(event.target);
    if (!nodeSet) {
        return;
    }

    event.preventDefault();
    nodeSet.focus();

    const drag = nodeSet.__drag__ = {
        onMouseup: onMouseup.bind(this, nodeSet),
        onMousemove: events.throttle(onMousemove.bind(this, nodeSet)),
        onScroll: events.throttle(onScroll.bind(this, nodeSet)),
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
    const drag = dragSet.__drag__;
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
        const _ = currentMoveSet;
        currentMoveSet = null;

        _.classList.remove(CLS.DROPZONE);
        events.dispatch(_, EV.DRAGLEAVE, { bubbles: false, cancelable: false });
    }

    if (currentDragSet) {
        const nodeSet = bubbleset.closestNodeSet(event.target);

        if (nodeSet && nodeSet !== currentDragSet) {
            const list = select.get(currentDragSet);

            if (list.length) {
                list.forEach(item => nodeSet.appendChild(item));

                context.setTimeout(function (fromNodeSet, toNodeSet) {
                    fromNodeSet.fireChange();
                    toNodeSet.focus();
                    toNodeSet.fireChange();
                }, 0, currentDragSet, nodeSet);
            }
        }

        const _ = currentDragSet;
        currentDragSet = null;

        _.classList.remove(CLS.DRAGSTART);
        events.dispatch(_, EV.DROP, { bubbles: false, cancelable: false });
        events.dispatch(_, EV.DRAGEND, { bubbles: false, cancelable: false });
    }
}

function onMousemove(dragSet, event) {
    const drag = dragSet.__drag__;
    if (!drag) {
        return;
    }

    if (!currentDragSet) {
        const selection = context.getSelection();
        selection && selection.removeAllRanges();

        currentDragSet = dragSet;
        currentDragSet.classList.add(CLS.DRAGSTART);

        const nodeBubble = bubbleset.closestNodeBubble(event.target);
        let moveElement;

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

    const nodeSet = bubbleset.closestNodeSet(event.target);
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
        const _ = currentMoveSet;
        currentMoveSet = null;

        _.classList.remove(CLS.DROPZONE);
        events.dispatch(_, EV.DRAGLEAVE, { bubbles: false, cancelable: false });
    }
}

function onScroll(dragSet) {
    const drag = dragSet.__drag__;
    if (!drag || !currentDragElement) {
        return;
    }

    const x = drag.x - drag.nodeOffsetX + events.scrollX();
    const y = drag.y - drag.nodeOffsetY + events.scrollY();

    if (Modernizr.csstransforms3d) {
        currentDragElement.style.transform = `translate3d(${x}px, ${y}px, 0px)`;

    } else if (Modernizr.csstransforms) {
        currentDragElement.style.transform = `translate(${x}px, ${y}px)`;

    } else {
        currentDragElement.style.top = `${y}px`;
        currentDragElement.style.left = `${x}px`;
    }
}
