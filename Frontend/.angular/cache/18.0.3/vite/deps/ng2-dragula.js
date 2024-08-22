import {
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Optional,
  Output,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵinject
} from "./chunk-Y6TRI7LI.js";
import {
  Subject,
  Subscription,
  filter,
  map
} from "./chunk-3OYL3RVR.js";
import "./chunk-NXOYTHC7.js";
import {
  __commonJS,
  __toESM
} from "./chunk-CPNXOV62.js";

// node_modules/atoa/atoa.js
var require_atoa = __commonJS({
  "node_modules/atoa/atoa.js"(exports, module) {
    module.exports = function atoa(a, n) {
      return Array.prototype.slice.call(a, n);
    };
  }
});

// node_modules/ticky/ticky-browser.js
var require_ticky_browser = __commonJS({
  "node_modules/ticky/ticky-browser.js"(exports, module) {
    var si = typeof setImmediate === "function";
    var tick;
    if (si) {
      tick = function(fn) {
        setImmediate(fn);
      };
    } else {
      tick = function(fn) {
        setTimeout(fn, 0);
      };
    }
    module.exports = tick;
  }
});

// node_modules/contra/debounce.js
var require_debounce = __commonJS({
  "node_modules/contra/debounce.js"(exports, module) {
    "use strict";
    var ticky = require_ticky_browser();
    module.exports = function debounce(fn, args, ctx) {
      if (!fn) {
        return;
      }
      ticky(function run() {
        fn.apply(ctx || null, args || []);
      });
    };
  }
});

// node_modules/contra/emitter.js
var require_emitter = __commonJS({
  "node_modules/contra/emitter.js"(exports, module) {
    "use strict";
    var atoa = require_atoa();
    var debounce = require_debounce();
    module.exports = function emitter(thing, options) {
      var opts = options || {};
      var evt = {};
      if (thing === void 0) {
        thing = {};
      }
      thing.on = function(type, fn) {
        if (!evt[type]) {
          evt[type] = [fn];
        } else {
          evt[type].push(fn);
        }
        return thing;
      };
      thing.once = function(type, fn) {
        fn._once = true;
        thing.on(type, fn);
        return thing;
      };
      thing.off = function(type, fn) {
        var c = arguments.length;
        if (c === 1) {
          delete evt[type];
        } else if (c === 0) {
          evt = {};
        } else {
          var et = evt[type];
          if (!et) {
            return thing;
          }
          et.splice(et.indexOf(fn), 1);
        }
        return thing;
      };
      thing.emit = function() {
        var args = atoa(arguments);
        return thing.emitterSnapshot(args.shift()).apply(this, args);
      };
      thing.emitterSnapshot = function(type) {
        var et = (evt[type] || []).slice(0);
        return function() {
          var args = atoa(arguments);
          var ctx = this || thing;
          if (type === "error" && opts.throws !== false && !et.length) {
            throw args.length === 1 ? args[0] : args;
          }
          et.forEach(function emitter2(listen) {
            if (opts.async) {
              debounce(listen, args, ctx);
            } else {
              listen.apply(ctx, args);
            }
            if (listen._once) {
              thing.off(type, listen);
            }
          });
          return thing;
        };
      };
      return thing;
    };
  }
});

// node_modules/custom-event/index.js
var require_custom_event = __commonJS({
  "node_modules/custom-event/index.js"(exports, module) {
    var NativeCustomEvent = global.CustomEvent;
    function useNative() {
      try {
        var p = new NativeCustomEvent("cat", { detail: { foo: "bar" } });
        return "cat" === p.type && "bar" === p.detail.foo;
      } catch (e) {
      }
      return false;
    }
    module.exports = useNative() ? NativeCustomEvent : (
      // IE >= 9
      "undefined" !== typeof document && "function" === typeof document.createEvent ? function CustomEvent(type, params) {
        var e = document.createEvent("CustomEvent");
        if (params) {
          e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
        } else {
          e.initCustomEvent(type, false, false, void 0);
        }
        return e;
      } : (
        // IE <= 8
        function CustomEvent(type, params) {
          var e = document.createEventObject();
          e.type = type;
          if (params) {
            e.bubbles = Boolean(params.bubbles);
            e.cancelable = Boolean(params.cancelable);
            e.detail = params.detail;
          } else {
            e.bubbles = false;
            e.cancelable = false;
            e.detail = void 0;
          }
          return e;
        }
      )
    );
  }
});

// node_modules/crossvent/src/eventmap.js
var require_eventmap = __commonJS({
  "node_modules/crossvent/src/eventmap.js"(exports, module) {
    "use strict";
    var eventmap = [];
    var eventname = "";
    var ron = /^on/;
    for (eventname in global) {
      if (ron.test(eventname)) {
        eventmap.push(eventname.slice(2));
      }
    }
    module.exports = eventmap;
  }
});

// node_modules/crossvent/src/crossvent.js
var require_crossvent = __commonJS({
  "node_modules/crossvent/src/crossvent.js"(exports, module) {
    "use strict";
    var customEvent = require_custom_event();
    var eventmap = require_eventmap();
    var doc = global.document;
    var addEvent = addEventEasy;
    var removeEvent = removeEventEasy;
    var hardCache = [];
    if (!global.addEventListener) {
      addEvent = addEventHard;
      removeEvent = removeEventHard;
    }
    module.exports = {
      add: addEvent,
      remove: removeEvent,
      fabricate: fabricateEvent
    };
    function addEventEasy(el, type, fn, capturing) {
      return el.addEventListener(type, fn, capturing);
    }
    function addEventHard(el, type, fn) {
      return el.attachEvent("on" + type, wrap(el, type, fn));
    }
    function removeEventEasy(el, type, fn, capturing) {
      return el.removeEventListener(type, fn, capturing);
    }
    function removeEventHard(el, type, fn) {
      var listener = unwrap(el, type, fn);
      if (listener) {
        return el.detachEvent("on" + type, listener);
      }
    }
    function fabricateEvent(el, type, model) {
      var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
      if (el.dispatchEvent) {
        el.dispatchEvent(e);
      } else {
        el.fireEvent("on" + type, e);
      }
      function makeClassicEvent() {
        var e2;
        if (doc.createEvent) {
          e2 = doc.createEvent("Event");
          e2.initEvent(type, true, true);
        } else if (doc.createEventObject) {
          e2 = doc.createEventObject();
        }
        return e2;
      }
      function makeCustomEvent() {
        return new customEvent(type, { detail: model });
      }
    }
    function wrapperFactory(el, type, fn) {
      return function wrapper(originalEvent) {
        var e = originalEvent || global.event;
        e.target = e.target || e.srcElement;
        e.preventDefault = e.preventDefault || function preventDefault() {
          e.returnValue = false;
        };
        e.stopPropagation = e.stopPropagation || function stopPropagation() {
          e.cancelBubble = true;
        };
        e.which = e.which || e.keyCode;
        fn.call(el, e);
      };
    }
    function wrap(el, type, fn) {
      var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
      hardCache.push({
        wrapper,
        element: el,
        type,
        fn
      });
      return wrapper;
    }
    function unwrap(el, type, fn) {
      var i = find(el, type, fn);
      if (i) {
        var wrapper = hardCache[i].wrapper;
        hardCache.splice(i, 1);
        return wrapper;
      }
    }
    function find(el, type, fn) {
      var i, item;
      for (i = 0; i < hardCache.length; i++) {
        item = hardCache[i];
        if (item.element === el && item.type === type && item.fn === fn) {
          return i;
        }
      }
    }
  }
});

// node_modules/dragula/classes.js
var require_classes = __commonJS({
  "node_modules/dragula/classes.js"(exports, module) {
    "use strict";
    var cache = {};
    var start = "(?:^|\\s)";
    var end = "(?:\\s|$)";
    function lookupClass(className) {
      var cached = cache[className];
      if (cached) {
        cached.lastIndex = 0;
      } else {
        cache[className] = cached = new RegExp(start + className + end, "g");
      }
      return cached;
    }
    function addClass(el, className) {
      var current = el.className;
      if (!current.length) {
        el.className = className;
      } else if (!lookupClass(className).test(current)) {
        el.className += " " + className;
      }
    }
    function rmClass(el, className) {
      el.className = el.className.replace(lookupClass(className), " ").trim();
    }
    module.exports = {
      add: addClass,
      rm: rmClass
    };
  }
});

// node_modules/dragula/dragula.js
var require_dragula = __commonJS({
  "node_modules/dragula/dragula.js"(exports, module) {
    "use strict";
    var emitter = require_emitter();
    var crossvent = require_crossvent();
    var classes = require_classes();
    var doc = document;
    var documentElement = doc.documentElement;
    function dragula2(initialContainers, options) {
      var len = arguments.length;
      if (len === 1 && Array.isArray(initialContainers) === false) {
        options = initialContainers;
        initialContainers = [];
      }
      var _mirror;
      var _source;
      var _item;
      var _offsetX;
      var _offsetY;
      var _moveX;
      var _moveY;
      var _initialSibling;
      var _currentSibling;
      var _copy;
      var _renderTimer;
      var _lastDropTarget = null;
      var _grabbed;
      var o = options || {};
      if (o.moves === void 0) {
        o.moves = always;
      }
      if (o.accepts === void 0) {
        o.accepts = always;
      }
      if (o.invalid === void 0) {
        o.invalid = invalidTarget;
      }
      if (o.containers === void 0) {
        o.containers = initialContainers || [];
      }
      if (o.isContainer === void 0) {
        o.isContainer = never;
      }
      if (o.copy === void 0) {
        o.copy = false;
      }
      if (o.copySortSource === void 0) {
        o.copySortSource = false;
      }
      if (o.revertOnSpill === void 0) {
        o.revertOnSpill = false;
      }
      if (o.removeOnSpill === void 0) {
        o.removeOnSpill = false;
      }
      if (o.direction === void 0) {
        o.direction = "vertical";
      }
      if (o.ignoreInputTextSelection === void 0) {
        o.ignoreInputTextSelection = true;
      }
      if (o.mirrorContainer === void 0) {
        o.mirrorContainer = doc.body;
      }
      var drake = emitter({
        containers: o.containers,
        start: manualStart,
        end,
        cancel,
        remove,
        destroy,
        canMove,
        dragging: false
      });
      if (o.removeOnSpill === true) {
        drake.on("over", spillOver).on("out", spillOut);
      }
      events();
      return drake;
      function isContainer(el) {
        return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
      }
      function events(remove2) {
        var op = remove2 ? "remove" : "add";
        touchy(documentElement, op, "mousedown", grab);
        touchy(documentElement, op, "mouseup", release);
      }
      function eventualMovements(remove2) {
        var op = remove2 ? "remove" : "add";
        touchy(documentElement, op, "mousemove", startBecauseMouseMoved);
      }
      function movements(remove2) {
        var op = remove2 ? "remove" : "add";
        crossvent[op](documentElement, "selectstart", preventGrabbed);
        crossvent[op](documentElement, "click", preventGrabbed);
      }
      function destroy() {
        events(true);
        release({});
      }
      function preventGrabbed(e) {
        if (_grabbed) {
          e.preventDefault();
        }
      }
      function grab(e) {
        _moveX = e.clientX;
        _moveY = e.clientY;
        var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
        if (ignore) {
          return;
        }
        var item = e.target;
        var context = canStart(item);
        if (!context) {
          return;
        }
        _grabbed = context;
        eventualMovements();
        if (e.type === "mousedown") {
          if (isInput(item)) {
            item.focus();
          } else {
            e.preventDefault();
          }
        }
      }
      function startBecauseMouseMoved(e) {
        if (!_grabbed) {
          return;
        }
        if (whichMouseButton(e) === 0) {
          release({});
          return;
        }
        if (e.clientX !== void 0 && Math.abs(e.clientX - _moveX) <= (o.slideFactorX || 0) && (e.clientY !== void 0 && Math.abs(e.clientY - _moveY) <= (o.slideFactorY || 0))) {
          return;
        }
        if (o.ignoreInputTextSelection) {
          var clientX = getCoord("clientX", e) || 0;
          var clientY = getCoord("clientY", e) || 0;
          var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
          if (isInput(elementBehindCursor)) {
            return;
          }
        }
        var grabbed = _grabbed;
        eventualMovements(true);
        movements();
        end();
        start(grabbed);
        var offset = getOffset(_item);
        _offsetX = getCoord("pageX", e) - offset.left;
        _offsetY = getCoord("pageY", e) - offset.top;
        classes.add(_copy || _item, "gu-transit");
        renderMirrorImage();
        drag(e);
      }
      function canStart(item) {
        if (drake.dragging && _mirror) {
          return;
        }
        if (isContainer(item)) {
          return;
        }
        var handle = item;
        while (getParent(item) && isContainer(getParent(item)) === false) {
          if (o.invalid(item, handle)) {
            return;
          }
          item = getParent(item);
          if (!item) {
            return;
          }
        }
        var source = getParent(item);
        if (!source) {
          return;
        }
        if (o.invalid(item, handle)) {
          return;
        }
        var movable = o.moves(item, source, handle, nextEl(item));
        if (!movable) {
          return;
        }
        return {
          item,
          source
        };
      }
      function canMove(item) {
        return !!canStart(item);
      }
      function manualStart(item) {
        var context = canStart(item);
        if (context) {
          start(context);
        }
      }
      function start(context) {
        if (isCopy(context.item, context.source)) {
          _copy = context.item.cloneNode(true);
          drake.emit("cloned", _copy, context.item, "copy");
        }
        _source = context.source;
        _item = context.item;
        _initialSibling = _currentSibling = nextEl(context.item);
        drake.dragging = true;
        drake.emit("drag", _item, _source);
      }
      function invalidTarget() {
        return false;
      }
      function end() {
        if (!drake.dragging) {
          return;
        }
        var item = _copy || _item;
        drop(item, getParent(item));
      }
      function ungrab() {
        _grabbed = false;
        eventualMovements(true);
        movements(true);
      }
      function release(e) {
        ungrab();
        if (!drake.dragging) {
          return;
        }
        var item = _copy || _item;
        var clientX = getCoord("clientX", e) || 0;
        var clientY = getCoord("clientY", e) || 0;
        var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
        var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
        if (dropTarget && (_copy && o.copySortSource || (!_copy || dropTarget !== _source))) {
          drop(item, dropTarget);
        } else if (o.removeOnSpill) {
          remove();
        } else {
          cancel();
        }
      }
      function drop(item, target) {
        var parent = getParent(item);
        if (_copy && o.copySortSource && target === _source) {
          parent.removeChild(_item);
        }
        if (isInitialPlacement(target)) {
          drake.emit("cancel", item, _source, _source);
        } else {
          drake.emit("drop", item, target, _source, _currentSibling);
        }
        cleanup();
      }
      function remove() {
        if (!drake.dragging) {
          return;
        }
        var item = _copy || _item;
        var parent = getParent(item);
        if (parent) {
          parent.removeChild(item);
        }
        drake.emit(_copy ? "cancel" : "remove", item, parent, _source);
        cleanup();
      }
      function cancel(revert) {
        if (!drake.dragging) {
          return;
        }
        var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
        var item = _copy || _item;
        var parent = getParent(item);
        var initial = isInitialPlacement(parent);
        if (initial === false && reverts) {
          if (_copy) {
            if (parent) {
              parent.removeChild(_copy);
            }
          } else {
            _source.insertBefore(item, _initialSibling);
          }
        }
        if (initial || reverts) {
          drake.emit("cancel", item, _source, _source);
        } else {
          drake.emit("drop", item, parent, _source, _currentSibling);
        }
        cleanup();
      }
      function cleanup() {
        var item = _copy || _item;
        ungrab();
        removeMirrorImage();
        if (item) {
          classes.rm(item, "gu-transit");
        }
        if (_renderTimer) {
          clearTimeout(_renderTimer);
        }
        drake.dragging = false;
        if (_lastDropTarget) {
          drake.emit("out", item, _lastDropTarget, _source);
        }
        drake.emit("dragend", item);
        _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
      }
      function isInitialPlacement(target, s) {
        var sibling;
        if (s !== void 0) {
          sibling = s;
        } else if (_mirror) {
          sibling = _currentSibling;
        } else {
          sibling = nextEl(_copy || _item);
        }
        return target === _source && sibling === _initialSibling;
      }
      function findDropTarget(elementBehindCursor, clientX, clientY) {
        var target = elementBehindCursor;
        while (target && !accepted()) {
          target = getParent(target);
        }
        return target;
        function accepted() {
          var droppable = isContainer(target);
          if (droppable === false) {
            return false;
          }
          var immediate = getImmediateChild(target, elementBehindCursor);
          var reference = getReference(target, immediate, clientX, clientY);
          var initial = isInitialPlacement(target, reference);
          if (initial) {
            return true;
          }
          return o.accepts(_item, target, _source, reference);
        }
      }
      function drag(e) {
        if (!_mirror) {
          return;
        }
        e.preventDefault();
        var clientX = getCoord("clientX", e) || 0;
        var clientY = getCoord("clientY", e) || 0;
        var x = clientX - _offsetX;
        var y = clientY - _offsetY;
        _mirror.style.left = x + "px";
        _mirror.style.top = y + "px";
        var item = _copy || _item;
        var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
        var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
        var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
        if (changed || dropTarget === null) {
          out();
          _lastDropTarget = dropTarget;
          over();
        }
        var parent = getParent(item);
        if (dropTarget === _source && _copy && !o.copySortSource) {
          if (parent) {
            parent.removeChild(item);
          }
          return;
        }
        var reference;
        var immediate = getImmediateChild(dropTarget, elementBehindCursor);
        if (immediate !== null) {
          reference = getReference(dropTarget, immediate, clientX, clientY);
        } else if (o.revertOnSpill === true && !_copy) {
          reference = _initialSibling;
          dropTarget = _source;
        } else {
          if (_copy && parent) {
            parent.removeChild(item);
          }
          return;
        }
        if (reference === null && changed || reference !== item && reference !== nextEl(item)) {
          _currentSibling = reference;
          dropTarget.insertBefore(item, reference);
          drake.emit("shadow", item, dropTarget, _source);
        }
        function moved(type) {
          drake.emit(type, item, _lastDropTarget, _source);
        }
        function over() {
          if (changed) {
            moved("over");
          }
        }
        function out() {
          if (_lastDropTarget) {
            moved("out");
          }
        }
      }
      function spillOver(el) {
        classes.rm(el, "gu-hide");
      }
      function spillOut(el) {
        if (drake.dragging) {
          classes.add(el, "gu-hide");
        }
      }
      function renderMirrorImage() {
        if (_mirror) {
          return;
        }
        var rect = _item.getBoundingClientRect();
        _mirror = _item.cloneNode(true);
        _mirror.style.width = getRectWidth(rect) + "px";
        _mirror.style.height = getRectHeight(rect) + "px";
        classes.rm(_mirror, "gu-transit");
        classes.add(_mirror, "gu-mirror");
        o.mirrorContainer.appendChild(_mirror);
        touchy(documentElement, "add", "mousemove", drag);
        classes.add(o.mirrorContainer, "gu-unselectable");
        drake.emit("cloned", _mirror, _item, "mirror");
      }
      function removeMirrorImage() {
        if (_mirror) {
          classes.rm(o.mirrorContainer, "gu-unselectable");
          touchy(documentElement, "remove", "mousemove", drag);
          getParent(_mirror).removeChild(_mirror);
          _mirror = null;
        }
      }
      function getImmediateChild(dropTarget, target) {
        var immediate = target;
        while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
          immediate = getParent(immediate);
        }
        if (immediate === documentElement) {
          return null;
        }
        return immediate;
      }
      function getReference(dropTarget, target, x, y) {
        var horizontal = o.direction === "horizontal";
        var reference = target !== dropTarget ? inside() : outside();
        return reference;
        function outside() {
          var len2 = dropTarget.children.length;
          var i;
          var el;
          var rect;
          for (i = 0; i < len2; i++) {
            el = dropTarget.children[i];
            rect = el.getBoundingClientRect();
            if (horizontal && rect.left + rect.width / 2 > x) {
              return el;
            }
            if (!horizontal && rect.top + rect.height / 2 > y) {
              return el;
            }
          }
          return null;
        }
        function inside() {
          var rect = target.getBoundingClientRect();
          if (horizontal) {
            return resolve(x > rect.left + getRectWidth(rect) / 2);
          }
          return resolve(y > rect.top + getRectHeight(rect) / 2);
        }
        function resolve(after) {
          return after ? nextEl(target) : target;
        }
      }
      function isCopy(item, container) {
        return typeof o.copy === "boolean" ? o.copy : o.copy(item, container);
      }
    }
    function touchy(el, op, type, fn) {
      var touch = {
        mouseup: "touchend",
        mousedown: "touchstart",
        mousemove: "touchmove"
      };
      var pointers = {
        mouseup: "pointerup",
        mousedown: "pointerdown",
        mousemove: "pointermove"
      };
      var microsoft = {
        mouseup: "MSPointerUp",
        mousedown: "MSPointerDown",
        mousemove: "MSPointerMove"
      };
      if (global.navigator.pointerEnabled) {
        crossvent[op](el, pointers[type], fn);
      } else if (global.navigator.msPointerEnabled) {
        crossvent[op](el, microsoft[type], fn);
      } else {
        crossvent[op](el, touch[type], fn);
        crossvent[op](el, type, fn);
      }
    }
    function whichMouseButton(e) {
      if (e.touches !== void 0) {
        return e.touches.length;
      }
      if (e.which !== void 0 && e.which !== 0) {
        return e.which;
      }
      if (e.buttons !== void 0) {
        return e.buttons;
      }
      var button = e.button;
      if (button !== void 0) {
        return button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
      }
    }
    function getOffset(el) {
      var rect = el.getBoundingClientRect();
      return {
        left: rect.left + getScroll("scrollLeft", "pageXOffset"),
        top: rect.top + getScroll("scrollTop", "pageYOffset")
      };
    }
    function getScroll(scrollProp, offsetProp) {
      if (typeof global[offsetProp] !== "undefined") {
        return global[offsetProp];
      }
      if (documentElement.clientHeight) {
        return documentElement[scrollProp];
      }
      return doc.body[scrollProp];
    }
    function getElementBehindPoint(point, x, y) {
      point = point || {};
      var state = point.className || "";
      var el;
      point.className += " gu-hide";
      el = doc.elementFromPoint(x, y);
      point.className = state;
      return el;
    }
    function never() {
      return false;
    }
    function always() {
      return true;
    }
    function getRectWidth(rect) {
      return rect.width || rect.right - rect.left;
    }
    function getRectHeight(rect) {
      return rect.height || rect.bottom - rect.top;
    }
    function getParent(el) {
      return el.parentNode === doc ? null : el.parentNode;
    }
    function isInput(el) {
      return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || isEditable(el);
    }
    function isEditable(el) {
      if (!el) {
        return false;
      }
      if (el.contentEditable === "false") {
        return false;
      }
      if (el.contentEditable === "true") {
        return true;
      }
      return isEditable(getParent(el));
    }
    function nextEl(el) {
      return el.nextElementSibling || manually();
      function manually() {
        var sibling = el;
        do {
          sibling = sibling.nextSibling;
        } while (sibling && sibling.nodeType !== 1);
        return sibling;
      }
    }
    function getEventHost(e) {
      if (e.targetTouches && e.targetTouches.length) {
        return e.targetTouches[0];
      }
      if (e.changedTouches && e.changedTouches.length) {
        return e.changedTouches[0];
      }
      return e;
    }
    function getCoord(coord, e) {
      var host = getEventHost(e);
      var missMap = {
        pageX: "clientX",
        // IE8
        pageY: "clientY"
        // IE8
      };
      if (coord in missMap && !(coord in host) && missMap[coord] in host) {
        coord = missMap[coord];
      }
      return host[coord];
    }
    module.exports = dragula2;
  }
});

// node_modules/ng2-dragula/fesm2022/ng2-dragula.mjs
var dragulaExpt = __toESM(require_dragula(), 1);
var Group = class {
  constructor(name, drake, options) {
    this.name = name;
    this.drake = drake;
    this.options = options;
    this.initEvents = false;
  }
};
var EventTypes;
(function(EventTypes2) {
  EventTypes2["Cancel"] = "cancel";
  EventTypes2["Cloned"] = "cloned";
  EventTypes2["Drag"] = "drag";
  EventTypes2["DragEnd"] = "dragend";
  EventTypes2["Drop"] = "drop";
  EventTypes2["Out"] = "out";
  EventTypes2["Over"] = "over";
  EventTypes2["Remove"] = "remove";
  EventTypes2["Shadow"] = "shadow";
  EventTypes2["DropModel"] = "dropModel";
  EventTypes2["RemoveModel"] = "removeModel";
})(EventTypes || (EventTypes = {}));
var AllEvents = Object.keys(EventTypes).map((k) => EventTypes[k]);
var dragula = dragulaExpt.default || dragulaExpt;
var DrakeFactory = class {
  constructor(build = dragula) {
    this.build = build;
  }
};
var filterEvent = (eventType, filterDragType, projector) => (input) => {
  return input.pipe(filter(({
    event,
    name
  }) => {
    return event === eventType && (filterDragType === void 0 || name === filterDragType);
  }), map(({
    name,
    args
  }) => projector(name, args)));
};
var elContainerSourceProjector = (name, [el, container, source]) => ({
  name,
  el,
  container,
  source
});
var _DragulaService = class _DragulaService {
  constructor(drakeFactory) {
    this.drakeFactory = drakeFactory;
    this.groups = {};
    this.dispatch$ = new Subject();
    this.elContainerSource = (eventType) => (groupName) => this.dispatch$.pipe(filterEvent(eventType, groupName, elContainerSourceProjector));
    this.cancel = this.elContainerSource(EventTypes.Cancel);
    this.remove = this.elContainerSource(EventTypes.Remove);
    this.shadow = this.elContainerSource(EventTypes.Shadow);
    this.over = this.elContainerSource(EventTypes.Over);
    this.out = this.elContainerSource(EventTypes.Out);
    this.drag = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, (name, [el, source]) => ({
      name,
      el,
      source
    })));
    this.dragend = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, (name, [el]) => ({
      name,
      el
    })));
    this.drop = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, (name, [el, target, source, sibling]) => {
      return {
        name,
        el,
        target,
        source,
        sibling
      };
    }));
    this.cloned = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.Cloned, groupName, (name, [clone, original, cloneType]) => {
      return {
        name,
        clone,
        original,
        cloneType
      };
    }));
    this.dropModel = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, (name, [el, target, source, sibling, item, sourceModel, targetModel, sourceIndex, targetIndex]) => {
      return {
        name,
        el,
        target,
        source,
        sibling,
        item,
        sourceModel,
        targetModel,
        sourceIndex,
        targetIndex
      };
    }));
    this.removeModel = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, (name, [el, container, source, item, sourceModel, sourceIndex]) => {
      return {
        name,
        el,
        container,
        source,
        item,
        sourceModel,
        sourceIndex
      };
    }));
    if (this.drakeFactory === null || this.drakeFactory === void 0) {
      this.drakeFactory = new DrakeFactory();
    }
  }
  /** Public mainly for testing purposes. Prefer `createGroup()`. */
  add(group) {
    const existingGroup = this.find(group.name);
    if (existingGroup) {
      throw new Error('Group named: "' + group.name + '" already exists.');
    }
    this.groups[group.name] = group;
    this.handleModels(group);
    this.setupEvents(group);
    return group;
  }
  find(name) {
    return this.groups[name];
  }
  destroy(name) {
    const group = this.find(name);
    if (!group) {
      return;
    }
    group.drake && group.drake.destroy();
    delete this.groups[name];
  }
  /**
   * Creates a group with the specified name and options.
   *
   * Note: formerly known as `setOptions`
   */
  createGroup(name, options) {
    return this.add(new Group(name, this.drakeFactory.build([], options), options));
  }
  handleModels({
    name,
    drake,
    options
  }) {
    let dragElm;
    let dragIndex;
    let dropIndex;
    drake.on("remove", (el, container, source) => {
      if (!drake.models) {
        return;
      }
      let sourceModel = drake.models[drake.containers.indexOf(source)];
      sourceModel = sourceModel.slice(0);
      const item = sourceModel.splice(dragIndex, 1)[0];
      this.dispatch$.next({
        event: EventTypes.RemoveModel,
        name,
        args: [el, container, source, item, sourceModel, dragIndex]
      });
    });
    drake.on("drag", (el, source) => {
      if (!drake.models) {
        return;
      }
      dragElm = el;
      dragIndex = this.domIndexOf(el, source);
    });
    drake.on("drop", (dropElm, target, source, sibling) => {
      if (!drake.models || !target) {
        return;
      }
      dropIndex = this.domIndexOf(dropElm, target);
      let sourceModel = drake.models[drake.containers.indexOf(source)];
      let targetModel = drake.models[drake.containers.indexOf(target)];
      let item;
      if (target === source) {
        sourceModel = sourceModel.slice(0);
        item = sourceModel.splice(dragIndex, 1)[0];
        sourceModel.splice(dropIndex, 0, item);
        targetModel = sourceModel;
      } else {
        const isCopying = dragElm !== dropElm;
        item = sourceModel[dragIndex];
        if (isCopying) {
          if (!options.copyItem) {
            throw new Error("If you have enabled `copy` on a group, you must provide a `copyItem` function.");
          }
          item = options.copyItem(item);
        }
        if (!isCopying) {
          sourceModel = sourceModel.slice(0);
          sourceModel.splice(dragIndex, 1);
        }
        targetModel = targetModel.slice(0);
        targetModel.splice(dropIndex, 0, item);
        if (isCopying) {
          try {
            target.removeChild(dropElm);
          } catch (e) {
          }
        }
      }
      this.dispatch$.next({
        event: EventTypes.DropModel,
        name,
        args: [dropElm, target, source, sibling, item, sourceModel, targetModel, dragIndex, dropIndex]
      });
    });
  }
  setupEvents(group) {
    if (group.initEvents) {
      return;
    }
    group.initEvents = true;
    const name = group.name;
    const that = this;
    const emitter = (event) => {
      switch (event) {
        case EventTypes.Drag:
          group.drake.on(event, (...args) => {
            this.dispatch$.next({
              event,
              name,
              args
            });
          });
          break;
        case EventTypes.Drop:
          group.drake.on(event, (...args) => {
            this.dispatch$.next({
              event,
              name,
              args
            });
          });
          break;
        case EventTypes.DragEnd:
          group.drake.on(event, (...args) => {
            this.dispatch$.next({
              event,
              name,
              args
            });
          });
          break;
        case EventTypes.Cancel:
        case EventTypes.Remove:
        case EventTypes.Shadow:
        case EventTypes.Over:
        case EventTypes.Out:
          group.drake.on(event, (...args) => {
            this.dispatch$.next({
              event,
              name,
              args
            });
          });
          break;
        case EventTypes.Cloned:
          group.drake.on(event, (...args) => {
            this.dispatch$.next({
              event,
              name,
              args
            });
          });
          break;
        case EventTypes.DropModel:
          group.drake.on(event, (...args) => {
            this.dispatch$.next({
              event,
              name,
              args
            });
          });
          break;
        case EventTypes.RemoveModel:
          group.drake.on(event, (...args) => {
            this.dispatch$.next({
              event,
              name,
              args
            });
          });
          break;
        default:
          break;
      }
    };
    AllEvents.forEach(emitter);
  }
  domIndexOf(child, parent) {
    if (parent) {
      return Array.prototype.indexOf.call(parent.children, child);
    }
  }
};
_DragulaService.ɵfac = function DragulaService_Factory(t) {
  return new (t || _DragulaService)(ɵɵinject(DrakeFactory, 8));
};
_DragulaService.ɵprov = ɵɵdefineInjectable({
  token: _DragulaService,
  factory: _DragulaService.ɵfac,
  providedIn: "root"
});
var DragulaService = _DragulaService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragulaService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: DrakeFactory,
      decorators: [{
        type: Optional
      }]
    }];
  }, null);
})();
var _DragulaDirective = class _DragulaDirective {
  get container() {
    return this.el && this.el.nativeElement;
  }
  constructor(el, dragulaService) {
    this.el = el;
    this.dragulaService = dragulaService;
    this.dragulaModelChange = new EventEmitter();
  }
  ngOnChanges(changes) {
    if (changes && changes.dragula) {
      const {
        previousValue: prev,
        currentValue: current,
        firstChange
      } = changes.dragula;
      const hadPreviousValue = !!prev;
      const hasNewValue = !!current;
      if (hadPreviousValue) {
        this.teardown(prev);
      }
      if (hasNewValue) {
        this.setup();
      }
    } else if (changes && changes.dragulaModel) {
      const {
        previousValue: prev,
        currentValue: current,
        firstChange
      } = changes.dragulaModel;
      const drake = this.group?.drake;
      if (this.dragula && drake) {
        drake.models = drake.models || [];
        const prevIndex = drake.models.indexOf(prev);
        if (prevIndex !== -1) {
          drake.models.splice(prevIndex, 1);
          if (current) {
            drake.models.splice(prevIndex, 0, current);
          }
        } else if (current) {
          drake.models.push(current);
        }
      }
    }
  }
  // call ngOnInit 'setup' because we want to call it in ngOnChanges
  // and it would otherwise run twice
  setup() {
    const checkModel = (group2) => {
      if (this.dragulaModel) {
        if (group2.drake?.models) {
          group2.drake?.models?.push(this.dragulaModel);
        } else {
          if (group2.drake) {
            group2.drake.models = [this.dragulaModel];
          }
        }
      }
    };
    if (!this.dragula) {
      return;
    }
    let group = this.dragulaService.find(this.dragula);
    if (!group) {
      const options = {};
      group = this.dragulaService.createGroup(this.dragula, options);
    }
    checkModel(group);
    group.drake?.containers.push(this.container);
    this.subscribe(this.dragula);
    this.group = group;
  }
  subscribe(name) {
    this.subs = new Subscription();
    this.subs.add(this.dragulaService.dropModel(name).subscribe(({
      source,
      target,
      sourceModel,
      targetModel
    }) => {
      if (source === this.el.nativeElement) {
        this.dragulaModelChange.emit(sourceModel);
      } else if (target === this.el.nativeElement) {
        this.dragulaModelChange.emit(targetModel);
      }
    }));
    this.subs.add(this.dragulaService.removeModel(name).subscribe(({
      source,
      sourceModel
    }) => {
      if (source === this.el.nativeElement) {
        this.dragulaModelChange.emit(sourceModel);
      }
    }));
  }
  teardown(groupName) {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    const group = this.dragulaService.find(groupName);
    if (group) {
      const itemToRemove = group.drake?.containers.indexOf(this.el.nativeElement);
      if (itemToRemove !== -1) {
        group.drake?.containers.splice(itemToRemove, 1);
      }
      if (this.dragulaModel && group.drake && group.drake.models) {
        const modelIndex = group.drake.models.indexOf(this.dragulaModel);
        if (modelIndex !== -1) {
          group.drake.models.splice(modelIndex, 1);
        }
      }
    }
  }
  ngOnDestroy() {
    if (!this.dragula) {
      return;
    }
    this.teardown(this.dragula);
  }
};
_DragulaDirective.ɵfac = function DragulaDirective_Factory(t) {
  return new (t || _DragulaDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DragulaService));
};
_DragulaDirective.ɵdir = ɵɵdefineDirective({
  type: _DragulaDirective,
  selectors: [["", "dragula", ""]],
  inputs: {
    dragula: "dragula",
    dragulaModel: "dragulaModel"
  },
  outputs: {
    dragulaModelChange: "dragulaModelChange"
  },
  features: [ɵɵNgOnChangesFeature]
});
var DragulaDirective = _DragulaDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragulaDirective, [{
    type: Directive,
    args: [{
      selector: "[dragula]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: DragulaService
    }];
  }, {
    dragula: [{
      type: Input
    }],
    dragulaModel: [{
      type: Input
    }],
    dragulaModelChange: [{
      type: Output
    }]
  });
})();
var _DragulaModule = class _DragulaModule {
  static forRoot() {
    return {
      ngModule: _DragulaModule,
      providers: [DragulaService]
    };
  }
};
_DragulaModule.ɵfac = function DragulaModule_Factory(t) {
  return new (t || _DragulaModule)();
};
_DragulaModule.ɵmod = ɵɵdefineNgModule({
  type: _DragulaModule,
  declarations: [DragulaDirective],
  exports: [DragulaDirective]
});
_DragulaModule.ɵinj = ɵɵdefineInjector({
  providers: [DragulaService]
});
var DragulaModule = _DragulaModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragulaModule, [{
    type: NgModule,
    args: [{
      exports: [DragulaDirective],
      declarations: [DragulaDirective],
      providers: [DragulaService]
    }]
  }], null, null);
})();
var MockDrakeFactory = new DrakeFactory((containers, options) => {
  return new MockDrake(containers, options);
});
var MockDrake = class {
  /**
   * @param containers A list of container elements.
   * @param options These will NOT be used. At all.
   * @param models Nonstandard, but useful for testing using `new MockDrake()` directly.
   *               Note, default value is undefined, like a real Drake. Don't change that.
   */
  constructor(containers = [], options = {}, models) {
    this.containers = containers;
    this.options = options;
    this.models = models;
    this.emitter$ = new Subject();
    this.subs = new Subscription();
    this.dragging = false;
  }
  on(event, callback) {
    this.subs.add(this.emitter$.pipe(filter(({
      eventType
    }) => eventType === event)).subscribe(({
      eventType,
      args
    }) => {
      if (eventType === EventTypes.Drag) {
        const argument = Array.from(args);
        const el = argument[0];
        const source = argument[1];
        callback(el, source);
        return;
      }
      if (eventType === EventTypes.Drop) {
        const argument = Array.from(args);
        const el = argument[0];
        const target = argument[1];
        const source = argument[2];
        const sibling = argument[3];
        callback(el, target, source, sibling);
        return;
      }
      if (eventType === EventTypes.Remove) {
        const argument = Array.from(args);
        const el = argument[0];
        const container = argument[1];
        const source = argument[2];
        callback(el, container, source);
        return;
      }
      callback(args);
    }));
  }
  /* Does nothing useful. */
  start(item) {
    this.dragging = true;
  }
  /* Does nothing useful. */
  end() {
    this.dragging = false;
  }
  cancel(revert) {
    this.dragging = false;
  }
  /* Does nothing useful. */
  canMove(item) {
    return this.options.accepts ? this.options.accepts(item) : false;
  }
  /* Does nothing useful. */
  remove() {
    this.dragging = false;
  }
  destroy() {
    this.subs.unsubscribe();
  }
  /**
   * This is the most useful method. You can use it to manually fire events that would normally
   * be fired by a real drake.
   *
   * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
   * DragulaService uses to implement [dragulaModel].
   *
   * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
   *
   * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
   */
  emit(eventType, ...args) {
    this.emitter$.next({
      eventType,
      args
    });
  }
};
export {
  DragulaDirective,
  DragulaModule,
  DragulaService,
  DrakeFactory,
  EventTypes,
  Group,
  MockDrake,
  MockDrakeFactory,
  dragula
};
//# sourceMappingURL=ng2-dragula.js.map
