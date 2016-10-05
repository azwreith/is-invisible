/**
 * Author:
 * Jason Farrell <jason@useallfive.com> (http://useallfive.com)
 * Sarbbottam Bandyopadhyay <sarbbottam@gmail.com> (https://sarbbottam.github.io/)
 */

'use strict';

function isInvisible(element, options) {
  let elementHeight;
  let elementTop;
  let elementBottom;
  let elementWidth;
  let elementLeft;
  let elementRight;

  if (typeof options === 'undefined') {
    elementHeight = element.offsetHeight;
    elementTop = element.offsetTop;
    elementBottom = elementTop + elementHeight;
    elementWidth = element.offsetWidth;
    elementLeft = element.offsetLeft;
    elementRight = elementLeft + elementWidth;
  } else {
    elementHeight = options.elementHeight;
    elementTop = options.elementTop;
    elementBottom = options.elementBottom;
    elementWidth = options.elementWidth;
    elementLeft = options.elementLeft;
    elementRight = options.elementRight;
  }

  const parentNode = element.parentNode;
  const VISIBLE_PADDING = 2;

  if (!elementInDocument(element)) {
    return true;
  }

  // return true for document node
  if (parentNode.nodeType === 9) {
    return false;
  }

  // return true if our element is invisible
  if (
    getStyle(element, 'opacity') === '0' ||
    getStyle(element, 'display') === 'none' ||
    getStyle(element, 'visibility') === 'hidden'
  ) {
    return true;
  }

  const parentHeight = parentNode.offsetHeight;
  const parentTop = parentNode.offsetTop;
  const parentBottom = parentTop + parentHeight;
  const parentWidth = parentNode.offsetWidth;
  const parentLeft = parentNode.offsetLeft;
  const parentRight = parentLeft + parentWidth;

  // if the parentNode can hide its children ...
  if (
    hasOverflow(parentNode) &&
    (
      // if element is above the parentNode
      elementBottom - VISIBLE_PADDING < parentNode.scrollTop + parentTop ||

      // if element is below the parentNode
      elementTop + VISIBLE_PADDING > parentNode.scrollTop + parentBottom ||

      // if element is to the left of the parentNode
      elementRight - VISIBLE_PADDING < parentNode.scrollLeft + parentLeft ||

      // if element is to the right of the parentNode
      elementLeft + VISIBLE_PADDING > parentNode.scrollLeft + parentRight
    )
  ) {
    // if either of the above is true the element is out of bounds,
    // so it is invisible
    return true;
  }

  if (
    isInvisibleByFixedPosition(element)
  ) {
    return true;
  }

  // add the parent's offset(Top/Left) to element's offset
  if (element.offsetParent === parentNode) {
    elementTop += parentTop;
    elementBottom += parentTop;
    elementLeft += parentLeft;
    elementRight += parentLeft;
  }

  if (
    elementBottom < 0 ||
    elementRight < 0
  ) {
    return true;
  }

  // recursively check upwards ...
  return isInvisible(parentNode, {
    elementHeight,
    elementTop,
    elementBottom,
    elementWidth,
    elementLeft,
    elementRight
  });
}

function hasOverflow(node) {
  return getStyle(node, 'overflow-x') === 'hidden' ||
    getStyle(node, 'overflow-y') === 'hidden' ||
    getStyle(node, 'overflow-x') === 'scroll' ||
    getStyle(node, 'overflow-y') === 'scroll' ||
    getStyle(node, 'overflow-x') === 'auto' ||
    getStyle(node, 'overflow-y') === 'auto';
}

function isInvisibleByFixedPosition(node) {
  if (
    getStyle(node, 'position') === 'fixed' &&
    (
      parseInt(getStyle(node, 'top'), 10) < 0 ||
      parseInt(getStyle(node, 'left'), 10) < 0 ||
      parseInt(getStyle(node, 'right'), 10) < 0 ||
      parseInt(getStyle(node, 'bottom'), 10) < 0
    )
  ) {
    return true;
  }
}

// cross browser get style
function getStyle(element, property) {
  return document.defaultView.getComputedStyle(element, null)[property];
}

function elementInDocument(element) {
  element = element.parentNode;
  while (element) {
    if (element === document) {
      return true;
    }
    element = element.parentNode;
  }
  return false;
}

module.exports = isInvisible;
