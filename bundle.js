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

	var Vue = __webpack_require__(1);
	var ajaxData = {};
	__webpack_require__(3);

	$(function(){
	    var vm = new Vue({
	        el: '#container',
	        data: {
	            index: 0,
	            name: ""
	        },
	        methods: {
	            toggle: function(i){
	                this.index = i;
	            }
	        }
	    });
	    
	    $('#clickme').bind('click', function(){
	        vm.name = "yangwt";
	    })
	})






/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*!
	 * Vue.js v1.0.17
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// Check if the browser supports native <template>.
	var hasNativeTemplate = (function () {
	  var t = document.createElement('template');
	  return t.content && t.content.nodeType === 11;
	})();

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;
	  if (this.size === this.limit) {
	    removed = this.shift();
	  }

	  var entry = this.get(key, true);
	  if (!entry) {
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  text = text.replace(/\n/g, '');
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    warn = function (msg, e) {
	      if (hasConsole && (!config.silent || config.debug)) {
	        console.warn('[Vue warn]: ' + msg);
	        /* istanbul ignore if */
	        if (config.debug) {
	          if (e) {
	            throw e;
	          } else {
	            console.warn(new Error('Warning Stack Trace').stack);
	          }
	        }
	      }
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/;
	var reservedTagRE = /^(slot|partial|component)$/;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */

	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  var key = prop.path;
	  value = coerceProp(prop, value);
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop.options);
	  }
	  vm[key] = vm._data[key] = assertProp(prop, value) ? value : undefined;
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */

	function getPropDefaultValue(vm, options) {
	  // no default, return undefined
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */

	function assertProp(prop, value) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = true;
	  var expectedType;
	  if (type) {
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === 'number';
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === 'boolean';
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === 'function';
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  // coerce is a function
	  return coerce(value);
	}

	function formatType(val) {
	  return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	}

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * 0.11 deprecation warning
	 */

	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  return assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	}

	/**
	 * Assert asset exists
	 */

	function assertAsset(val, type, id) {
	  if (!val) {
	    process.env.NODE_ENV !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	  }
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if ((isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} doNotObserve
	 */

	function defineReactive(obj, key, val, doNotObserve) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  // if doNotObserve is true, only use the child value observer
	  // if it already exists, and do not attempt to create it.
	  // this allows freezing a large object from the root and
	  // avoid unnecessary observation inside v-for fragments.
	  var childOb = doNotObserve ? typeof val === 'object' && val.__ob__ : observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = doNotObserve ? typeof newVal === 'object' && newVal.__ob__ : observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		hasNativeTemplate: hasNativeTemplate,
		devtools: devtools,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		assertAsset: assertAsset,
		checkComponentAttr: checkComponentAttr,
		initProp: initProp,
		assertProp: assertProp,
		coerceProp: coerceProp,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // save raw constructor data before merge
	    // so that we know which properties are provided at
	    // instantiation.
	    if (process.env.NODE_ENV !== 'production') {
	      this._runtimeData = options.data;
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'proctected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queueIndex;
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	  resetBatcherState();
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (queueIndex = 0; queueIndex < queue.length; queueIndex++) {
	    var watcher = queue[queueIndex];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1);
	        warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	      }
	    }
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    if (internalQueueDepleted && !watcher.user) {
	      // an internal watcher triggered by a user watcher...
	      // let's run it immediately after current user watcher is done.
	      userQueue.splice(queueIndex + 1, 0, watcher);
	    } else {
	      // push watcher into appropriate queue
	      var q = watcher.user ? userQueue : queue;
	      has[id] = q.length;
	      q.push(watcher);
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        nextTick(flushBatcherQueue);
	      }
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = Object.create(null);
	  this.newDepIds = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter "' + this.expression + '"', e);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDepIds = Object.create(null);
	  this.newDeps.length = 0;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds[id]) {
	    this.newDepIds[id] = true;
	    this.newDeps.push(dep);
	    if (!this.depIds[id]) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds[dep.id]) {
	      dep.removeSub(this);
	    }
	  }
	  this.depIds = this.newDepIds;
	  var tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:]+)/;
	var entityRE = /&#?\w+?;/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var FOR = 2000;
	var IF = 2000;
	var SLOT = 2100;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Alias is required in v-for.');
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value;
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    defineReactive(scope, alias, value, true /* do not observe */);
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	  };
	}

	var vIf = {

	  priority: IF,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.value = _toString(value);
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim();
	      }
	      this.el.style.setProperty(prop, value, isImportant);
	    } else {
	      this.el.style.removeProperty(prop);
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop;
	    }
	  }
	  if (camel in testEl.style) {
	    return prop;
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      el[attr] = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },

	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    var keys = this.prevKeys = Object.keys(value);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      if (value[key]) {
	        addClass(this.el, key);
	      } else {
	        removeClass(this.el, key);
	      }
	    }
	  },

	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i]);
	      }
	    }
	    this.prevKeys = value.slice();
	  },

	  cleanup: function cleanup(value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length;
	      while (i--) {
	        var key = this.prevKeys[i];
	        if (key && (!value || !contains(value, key))) {
	          removeClass(this.el, key);
	        }
	      }
	    }
	  }
	};

	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  var i = keys.length;
	  while (i--) {
	    res[keys[i]] = true;
	  }
	  return res;
	}

	function contains(value, key) {
	  return isArray(value) ? value.indexOf(key) > -1 : hasOwn(value, key);
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */

	  resolveComponent: function resolveComponent(id, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || id;
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(id, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy();
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      val = coerceProp(prop, val);
	      if (assertProp(prop, val)) {
	        child[childKey] = val;
	      }
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  // Important hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true;
	  var self = this;
	  setTimeout(function () {
	    self.justEntered = false;
	  }, 17);

	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.');
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.');
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.');
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === '' ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// terminal directives
	var terminalDirectives = ['for', 'if'];

	// default directive priority
	var DEFAULT_PRIORITY = 1000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	  var value, dirName;
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i];
	    value = el.getAttribute('v-' + dirName);
	    if (value != null) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options);
	    }
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    // #2366 or custom terminal directive
	    def: def || resolveAsset(options, 'directives', dirName)
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName);

	              if (process.env.NODE_ENV !== 'production') {
	                assertAsset(dirDef, 'directive', dirName);
	              }

	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value)) {
	      value.trim().split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function scanSlots(template, content, vm) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = {};
	  var slots = findSlots(template);
	  if (slots.length) {
	    var hasDefault, slot, name;
	    for (var i = 0, l = slots.length; i < l; i++) {
	      slot = slots[i];
	      /* eslint-disable no-cond-assign */
	      if (name = slot.getAttribute('name')) {
	        select(slot, name);
	      } else if (process.env.NODE_ENV !== 'production' && (name = getBindAttr(slot, 'name'))) {
	        warn('<slot :name="' + name + '">: slot names cannot be dynamic.');
	      } else {
	        // default slot
	        hasDefault = true;
	      }
	      /* eslint-enable no-cond-assign */
	    }
	    if (hasDefault) {
	      contents['default'] = extractFragment(content.childNodes, content);
	    }
	  }

	  function select(slot, name) {
	    // named slot
	    var selector = '[slot="' + name + '"]';
	    var nodes = content.querySelectorAll(selector);
	    if (nodes.length) {
	      contents[name] = extractFragment(nodes, content);
	    }
	  }
	}

	/**
	 * Find all slots in a template, including those nested under
	 * a <template> element's content node.
	 *
	 * @param {Element} el
	 * @return {Array|NodeList}
	 */

	function findSlots(el) {
	  var slots = el.querySelectorAll('slot');
	  /* istanbul ignore if */
	  if (hasNativeTemplate) {
	    slots = toArray(slots);
	    var templates = el.querySelectorAll('template');
	    for (var i = 0; i < templates.length; i++) {
	      slots.push.apply(slots, findSlots(templates[i].content));
	    }
	  }
	  return slots;
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (node.parentNode === parent) {
	      if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	        parent.removeChild(node);
	        node = parseTemplate(node);
	      }
	      frag.appendChild(node);
	    }
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		terminalDirectives: terminalDirectives,
		transclude: transclude,
		scanSlots: scanSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var propsData = this._data;
	    var optionsDataFn = this.$options.data;
	    var optionsData = optionsDataFn && optionsDataFn();
	    var runtimeData;
	    if (process.env.NODE_ENV !== 'production') {
	      runtimeData = (typeof this._runtimeData === 'function' ? this._runtimeData() : this._runtimeData) || {};
	      this._runtimeData = null;
	    }
	    if (optionsData) {
	      this._data = optionsData;
	      for (var prop in propsData) {
	        if (process.env.NODE_ENV !== 'production' && hasOwn(optionsData, prop) && !hasOwn(runtimeData, prop)) {
	          warn('Data field "' + prop + '" is already defined ' + 'as a prop. Use prop default value instead.');
	        }
	        if (this._props[prop].raw !== null || !hasOwn(optionsData, prop)) {
	          set(optionsData, prop, propsData[prop]);
	        }
	      }
	    }
	    var data = this._data;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      this._proxy(key);
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        if (typeof handler === 'function') {
	          handler._fromParent = true;
	          vm.$on(name.replace(eventRE), handler);
	        } else if (process.env.NODE_ENV !== 'production') {
	          warn('v-on:' + name + '="' + attrs[i].value + '"' + (vm.$options.name ? ' on component <' + vm.$options.name + '>' : '') + ' expects a function value, got ' + handler);
	        }
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = params[i];
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // scan for slot distribution before compiling the content
	    // so that it's decoupeld from slot/directive compilation order
	    scanSlots(el, options._content, this);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {String} name - directive name
	   * @param {Node} node   - target node
	   * @param {Object} desc - parsed directive descriptor
	   * @param {Object} def  - directive definition object
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[i];
	      fn = resolveAsset(this.$options, 'filters', filter.name);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(fn, 'filter', filter.name);
	      }
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String} id
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (id, cb) {
	    var factory = resolveAsset(this.$options, 'components', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(factory, 'component', id);
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component: ' + id + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      for (var key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.');
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(partial, 'partial', id);
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur);
	  }, []);
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains$1(item.$key, search) || contains$1(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains$1(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */

	function orderBy(arr, sortKey, reverse) {
	  arr = convertArray(arr);
	  if (!sortKey) {
	    return arr;
	  }
	  var order = reverse && reverse < 0 ? -1 : 1;
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (isObject(a) && '$value' in a) a = a.$value;
	      if (isObject(b) && '$value' in b) b = b.$value;
	    }
	    a = isObject(a) ? getPath(a, sortKey) : a;
	    b = isObject(b) ? getPath(b, sortKey) : b;
	    return a === b ? 0 : a > b ? order : -order;
	  });
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains$1(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains$1(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains$1(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */

	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.17';

	// devtools global hook
	/* istanbul ignore next */
	if (config.devtools) {
	  if (devtools) {
	    devtools.emit('init', Vue);
	  } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	    console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	  }
	}

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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
/* 3 */
/***/ function(module, exports) {

	/*!
	 * jQuery JavaScript Library v1.9.1
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-7-22
	 */

	(function (window, undefined) {
	    // Can't do this because several apps including ASP.NET trace
	    // the stack via arguments.caller.callee and Firefox dies if
	    // you try to trace through "use strict" call chains. (#13335)
	    // Support: Firefox 18+
	    //"use strict";
	    var
	        // The deferred used on DOM ready
	        readyList,
	        // A central reference to the root jQuery(document)
	        rootjQuery,
	        // Support: IE<9
	        // For `typeof node.method` instead of `node.method !== undefined`
	        core_strundefined = typeof undefined,
	        // Use the correct document accordingly with window argument (sandbox)
	        document = window.document, location = window.location,
	        // Map over jQuery in case of overwrite
	        _jQuery = window.jQuery,
	        // Map over the $ in case of overwrite
	        _$ = window.$,
	        // [[Class]] -> type pairs
	        class2type = {},
	        // List of deleted data cache ids, so we can reuse them
	        core_deletedIds = [], core_version = '1.9.1',
	        // Save a reference to some core methods
	        core_concat = core_deletedIds.concat, core_push = core_deletedIds.push, core_slice = core_deletedIds.slice, core_indexOf = core_deletedIds.indexOf, core_toString = class2type.toString, core_hasOwn = class2type.hasOwnProperty, core_trim = core_version.trim,
	        // Define a local copy of jQuery
	        jQuery = function (selector, context) {
	            // The jQuery object is actually just the init constructor 'enhanced'
	            return new jQuery.fn.init(selector, context, rootjQuery);
	        },
	        // Used for matching numbers
	        core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	        // Used for splitting on whitespace
	        core_rnotwhite = /\S+/g,
	        // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	        // A simple way to check for HTML strings
	        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	        // Strict HTML recognition (#11290: must start with <)
	        rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	        // Match a standalone tag
	        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	        // JSON RegExp
	        rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
	        // Matches dashed string for camelizing
	        rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi,
	        // Used by jQuery.camelCase as callback to replace()
	        fcamelCase = function (all, letter) {
	            return letter.toUpperCase();
	        },
	        // The ready event handler
	        completed = function (event) {
	            // readyState === "complete" is good enough for us to call the dom ready in oldIE
	            if (document.addEventListener || event.type === 'load' || document.readyState === 'complete') {
	                detach();
	                jQuery.ready();
	            }
	        },
	        // Clean-up method for dom ready events
	        detach = function () {
	            if (document.addEventListener) {
	                document.removeEventListener('DOMContentLoaded', completed, false);
	                window.removeEventListener('load', completed, false);
	            } else {
	                document.detachEvent('onreadystatechange', completed);
	                window.detachEvent('onload', completed);
	            }
	        };
	    jQuery.fn = jQuery.prototype = {
	        // The current version of jQuery being used
	        jquery: core_version,
	        constructor: jQuery,
	        init: function (selector, context, rootjQuery) {
	            var match, elem;
	            // HANDLE: $(""), $(null), $(undefined), $(false)
	            if (!selector) {
	                return this;
	            }
	            // Handle HTML strings
	            if (typeof selector === 'string') {
	                if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
	                    // Assume that strings that start and end with <> are HTML and skip the regex check
	                    match = [
	                        null,
	                        selector,
	                        null
	                    ];
	                } else {
	                    match = rquickExpr.exec(selector);
	                }
	                // Match html or make sure no context is specified for #id
	                if (match && (match[1] || !context)) {
	                    // HANDLE: $(html) -> $(array)
	                    if (match[1]) {
	                        context = context instanceof jQuery ? context[0] : context;
	                        // scripts is true for back-compat
	                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
	                        // HANDLE: $(html, props)
	                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
	                            for (match in context) {
	                                // Properties of context are called as methods if possible
	                                if (jQuery.isFunction(this[match])) {
	                                    this[match](context[match]);    // ...and otherwise set as attributes
	                                } else {
	                                    this.attr(match, context[match]);
	                                }
	                            }
	                        }
	                        return this;    // HANDLE: $(#id)
	                    } else {
	                        elem = document.getElementById(match[2]);
	                        // Check parentNode to catch when Blackberry 4.6 returns
	                        // nodes that are no longer in the document #6963
	                        if (elem && elem.parentNode) {
	                            // Handle the case where IE and Opera return items
	                            // by name instead of ID
	                            if (elem.id !== match[2]) {
	                                return rootjQuery.find(selector);
	                            }
	                            // Otherwise, we inject the element directly into the jQuery object
	                            this.length = 1;
	                            this[0] = elem;
	                        }
	                        this.context = document;
	                        this.selector = selector;
	                        return this;
	                    }    // HANDLE: $(expr, $(...))
	                } else if (!context || context.jquery) {
	                    return (context || rootjQuery).find(selector);    // HANDLE: $(expr, context)
	                                                                      // (which is just equivalent to: $(context).find(expr)
	                } else {
	                    return this.constructor(context).find(selector);
	                }    // HANDLE: $(DOMElement)
	            } else if (selector.nodeType) {
	                this.context = this[0] = selector;
	                this.length = 1;
	                return this;    // HANDLE: $(function)
	                                // Shortcut for document ready
	            } else if (jQuery.isFunction(selector)) {
	                return rootjQuery.ready(selector);
	            }
	            if (selector.selector !== undefined) {
	                this.selector = selector.selector;
	                this.context = selector.context;
	            }
	            return jQuery.makeArray(selector, this);
	        },
	        // Start with an empty selector
	        selector: '',
	        // The default length of a jQuery object is 0
	        length: 0,
	        // The number of elements contained in the matched element set
	        size: function () {
	            return this.length;
	        },
	        toArray: function () {
	            return core_slice.call(this);
	        },
	        // Get the Nth element in the matched element set OR
	        // Get the whole matched element set as a clean array
	        get: function (num) {
	            return num == null ? // Return a 'clean' array
	            this.toArray() : num < 0 ? this[this.length + num] : this[num];
	        },
	        // Take an array of elements and push it onto the stack
	        // (returning the new matched element set)
	        pushStack: function (elems) {
	            // Build a new jQuery matched element set
	            var ret = jQuery.merge(this.constructor(), elems);
	            // Add the old object onto the stack (as a reference)
	            ret.prevObject = this;
	            ret.context = this.context;
	            // Return the newly-formed element set
	            return ret;
	        },
	        // Execute a callback for every element in the matched set.
	        // (You can seed the arguments with an array of args, but this is
	        // only used internally.)
	        each: function (callback, args) {
	            return jQuery.each(this, callback, args);
	        },
	        ready: function (fn) {
	            // Add the callback
	            jQuery.ready.promise().done(fn);
	            return this;
	        },
	        slice: function () {
	            return this.pushStack(core_slice.apply(this, arguments));
	        },
	        first: function () {
	            return this.eq(0);
	        },
	        last: function () {
	            return this.eq(-1);
	        },
	        eq: function (i) {
	            var len = this.length, j = +i + (i < 0 ? len : 0);
	            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
	        },
	        map: function (callback) {
	            return this.pushStack(jQuery.map(this, function (elem, i) {
	                return callback.call(elem, i, elem);
	            }));
	        },
	        end: function () {
	            return this.prevObject || this.constructor(null);
	        },
	        // For internal use only.
	        // Behaves like an Array's method, not like a jQuery method.
	        push: core_push,
	        sort: [].sort,
	        splice: [].splice
	    };
	    // Give the init function the jQuery prototype for later instantiation
	    jQuery.fn.init.prototype = jQuery.fn;
	    jQuery.extend = jQuery.fn.extend = function () {
	        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
	        // Handle a deep copy situation
	        if (typeof target === 'boolean') {
	            deep = target;
	            target = arguments[1] || {};
	            // skip the boolean and the target
	            i = 2;
	        }
	        // Handle case when target is a string or something (possible in deep copy)
	        if (typeof target !== 'object' && !jQuery.isFunction(target)) {
	            target = {};
	        }
	        // extend jQuery itself if only one argument is passed
	        if (length === i) {
	            target = this;
	            --i;
	        }
	        for (; i < length; i++) {
	            // Only deal with non-null/undefined values
	            if ((options = arguments[i]) != null) {
	                // Extend the base object
	                for (name in options) {
	                    src = target[name];
	                    copy = options[name];
	                    // Prevent never-ending loop
	                    if (target === copy) {
	                        continue;
	                    }
	                    // Recurse if we're merging plain objects or arrays
	                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
	                        if (copyIsArray) {
	                            copyIsArray = false;
	                            clone = src && jQuery.isArray(src) ? src : [];
	                        } else {
	                            clone = src && jQuery.isPlainObject(src) ? src : {};
	                        }
	                        // Never move original objects, clone them
	                        target[name] = jQuery.extend(deep, clone, copy);    // Don't bring in undefined values
	                    } else if (copy !== undefined) {
	                        target[name] = copy;
	                    }
	                }
	            }
	        }
	        // Return the modified object
	        return target;
	    };
	    jQuery.extend({
	        noConflict: function (deep) {
	            if (window.$ === jQuery) {
	                window.$ = _$;
	            }
	            if (deep && window.jQuery === jQuery) {
	                window.jQuery = _jQuery;
	            }
	            return jQuery;
	        },
	        // Is the DOM ready to be used? Set to true once it occurs.
	        isReady: false,
	        // A counter to track how many items to wait for before
	        // the ready event fires. See #6781
	        readyWait: 1,
	        // Hold (or release) the ready event
	        holdReady: function (hold) {
	            if (hold) {
	                jQuery.readyWait++;
	            } else {
	                jQuery.ready(true);
	            }
	        },
	        // Handle when the DOM is ready
	        ready: function (wait) {
	            // Abort if there are pending holds or we're already ready
	            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
	                return;
	            }
	            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
	            if (!document.body) {
	                return setTimeout(jQuery.ready);
	            }
	            // Remember that the DOM is ready
	            jQuery.isReady = true;
	            // If a normal DOM Ready event fired, decrement, and wait if need be
	            if (wait !== true && --jQuery.readyWait > 0) {
	                return;
	            }
	            // If there are functions bound, to execute
	            readyList.resolveWith(document, [jQuery]);
	            // Trigger any bound ready events
	            if (jQuery.fn.trigger) {
	                jQuery(document).trigger('ready').off('ready');
	            }
	        },
	        // See test/unit/core.js for details concerning isFunction.
	        // Since version 1.3, DOM methods and functions like alert
	        // aren't supported. They return false on IE (#2968).
	        isFunction: function (obj) {
	            return jQuery.type(obj) === 'function';
	        },
	        isArray: Array.isArray || function (obj) {
	            return jQuery.type(obj) === 'array';
	        },
	        isWindow: function (obj) {
	            return obj != null && obj == obj.window;
	        },
	        isNumeric: function (obj) {
	            return !isNaN(parseFloat(obj)) && isFinite(obj);
	        },
	        type: function (obj) {
	            if (obj == null) {
	                return String(obj);
	            }
	            return typeof obj === 'object' || typeof obj === 'function' ? class2type[core_toString.call(obj)] || 'object' : typeof obj;
	        },
	        isPlainObject: function (obj) {
	            // Must be an Object.
	            // Because of IE, we also have to check the presence of the constructor property.
	            // Make sure that DOM nodes and window objects don't pass through, as well
	            if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
	                return false;
	            }
	            try {
	                // Not own constructor property must be Object
	                if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
	                    return false;
	                }
	            } catch (e) {
	                // IE8,9 Will throw exceptions on certain host objects #9897
	                return false;
	            }
	            // Own properties are enumerated firstly, so to speed up,
	            // if last one is own, then all properties are own.
	            var key;
	            for (key in obj) {
	            }
	            return key === undefined || core_hasOwn.call(obj, key);
	        },
	        isEmptyObject: function (obj) {
	            var name;
	            for (name in obj) {
	                return false;
	            }
	            return true;
	        },
	        error: function (msg) {
	            throw new Error(msg);
	        },
	        // data: string of html
	        // context (optional): If specified, the fragment will be created in this context, defaults to document
	        // keepScripts (optional): If true, will include scripts passed in the html string
	        parseHTML: function (data, context, keepScripts) {
	            if (!data || typeof data !== 'string') {
	                return null;
	            }
	            if (typeof context === 'boolean') {
	                keepScripts = context;
	                context = false;
	            }
	            context = context || document;
	            var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
	            // Single tag
	            if (parsed) {
	                return [context.createElement(parsed[1])];
	            }
	            parsed = jQuery.buildFragment([data], context, scripts);
	            if (scripts) {
	                jQuery(scripts).remove();
	            }
	            return jQuery.merge([], parsed.childNodes);
	        },
	        parseJSON: function (data) {
	            // Attempt to parse using the native JSON parser first
	            if (window.JSON && window.JSON.parse) {
	                return window.JSON.parse(data);
	            }
	            if (data === null) {
	                return data;
	            }
	            if (typeof data === 'string') {
	                // Make sure leading/trailing whitespace is removed (IE can't handle it)
	                data = jQuery.trim(data);
	                if (data) {
	                    // Make sure the incoming data is actual JSON
	                    // Logic borrowed from http://json.org/json2.js
	                    if (rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
	                        return new Function('return ' + data)();
	                    }
	                }
	            }
	            jQuery.error('Invalid JSON: ' + data);
	        },
	        // Cross-browser xml parsing
	        parseXML: function (data) {
	            var xml, tmp;
	            if (!data || typeof data !== 'string') {
	                return null;
	            }
	            try {
	                if (window.DOMParser) {
	                    // Standard
	                    tmp = new DOMParser();
	                    xml = tmp.parseFromString(data, 'text/xml');
	                } else {
	                    // IE
	                    xml = new ActiveXObject('Microsoft.XMLDOM');
	                    xml.async = 'false';
	                    xml.loadXML(data);
	                }
	            } catch (e) {
	                xml = undefined;
	            }
	            if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
	                jQuery.error('Invalid XML: ' + data);
	            }
	            return xml;
	        },
	        noop: function () {
	        },
	        // Evaluates a script in a global context
	        // Workarounds based on findings by Jim Driscoll
	        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	        globalEval: function (data) {
	            if (data && jQuery.trim(data)) {
	                // We use execScript on Internet Explorer
	                // We use an anonymous function so that context is window
	                // rather than jQuery in Firefox
	                (window.execScript || function (data) {
	                    window['eval'].call(window, data);
	                })(data);
	            }
	        },
	        // Convert dashed to camelCase; used by the css and data modules
	        // Microsoft forgot to hump their vendor prefix (#9572)
	        camelCase: function (string) {
	            return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
	        },
	        nodeName: function (elem, name) {
	            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	        },
	        // args is for internal usage only
	        each: function (obj, callback, args) {
	            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
	            if (args) {
	                if (isArray) {
	                    for (; i < length; i++) {
	                        value = callback.apply(obj[i], args);
	                        if (value === false) {
	                            break;
	                        }
	                    }
	                } else {
	                    for (i in obj) {
	                        value = callback.apply(obj[i], args);
	                        if (value === false) {
	                            break;
	                        }
	                    }
	                }    // A special, fast, case for the most common use of each
	            } else {
	                if (isArray) {
	                    for (; i < length; i++) {
	                        value = callback.call(obj[i], i, obj[i]);
	                        if (value === false) {
	                            break;
	                        }
	                    }
	                } else {
	                    for (i in obj) {
	                        value = callback.call(obj[i], i, obj[i]);
	                        if (value === false) {
	                            break;
	                        }
	                    }
	                }
	            }
	            return obj;
	        },
	        // Use native String.trim function wherever possible
	        trim: core_trim && !core_trim.call('\uFEFF\xA0') ? function (text) {
	            return text == null ? '' : core_trim.call(text);
	        } : // Otherwise use our own trimming functionality
	        function (text) {
	            return text == null ? '' : (text + '').replace(rtrim, '');
	        },
	        // results is for internal usage only
	        makeArray: function (arr, results) {
	            var ret = results || [];
	            if (arr != null) {
	                if (isArraylike(Object(arr))) {
	                    jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
	                } else {
	                    core_push.call(ret, arr);
	                }
	            }
	            return ret;
	        },
	        inArray: function (elem, arr, i) {
	            var len;
	            if (arr) {
	                if (core_indexOf) {
	                    return core_indexOf.call(arr, elem, i);
	                }
	                len = arr.length;
	                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
	                for (; i < len; i++) {
	                    // Skip accessing in sparse arrays
	                    if (i in arr && arr[i] === elem) {
	                        return i;
	                    }
	                }
	            }
	            return -1;
	        },
	        merge: function (first, second) {
	            var l = second.length, i = first.length, j = 0;
	            if (typeof l === 'number') {
	                for (; j < l; j++) {
	                    first[i++] = second[j];
	                }
	            } else {
	                while (second[j] !== undefined) {
	                    first[i++] = second[j++];
	                }
	            }
	            first.length = i;
	            return first;
	        },
	        grep: function (elems, callback, inv) {
	            var retVal, ret = [], i = 0, length = elems.length;
	            inv = !!inv;
	            // Go through the array, only saving the items
	            // that pass the validator function
	            for (; i < length; i++) {
	                retVal = !!callback(elems[i], i);
	                if (inv !== retVal) {
	                    ret.push(elems[i]);
	                }
	            }
	            return ret;
	        },
	        // arg is for internal usage only
	        map: function (elems, callback, arg) {
	            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
	            // Go through the array, translating each of the items to their
	            if (isArray) {
	                for (; i < length; i++) {
	                    value = callback(elems[i], i, arg);
	                    if (value != null) {
	                        ret[ret.length] = value;
	                    }
	                }    // Go through every key on the object,
	            } else {
	                for (i in elems) {
	                    value = callback(elems[i], i, arg);
	                    if (value != null) {
	                        ret[ret.length] = value;
	                    }
	                }
	            }
	            // Flatten any nested arrays
	            return core_concat.apply([], ret);
	        },
	        // A global GUID counter for objects
	        guid: 1,
	        // Bind a function to a context, optionally partially applying any
	        // arguments.
	        proxy: function (fn, context) {
	            var args, proxy, tmp;
	            if (typeof context === 'string') {
	                tmp = fn[context];
	                context = fn;
	                fn = tmp;
	            }
	            // Quick check to determine if target is callable, in the spec
	            // this throws a TypeError, but we will just return undefined.
	            if (!jQuery.isFunction(fn)) {
	                return undefined;
	            }
	            // Simulated bind
	            args = core_slice.call(arguments, 2);
	            proxy = function () {
	                return fn.apply(context || this, args.concat(core_slice.call(arguments)));
	            };
	            // Set the guid of unique handler to the same of original handler, so it can be removed
	            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	            return proxy;
	        },
	        // Multifunctional method to get and set values of a collection
	        // The value/s can optionally be executed if it's a function
	        access: function (elems, fn, key, value, chainable, emptyGet, raw) {
	            var i = 0, length = elems.length, bulk = key == null;
	            // Sets many values
	            if (jQuery.type(key) === 'object') {
	                chainable = true;
	                for (i in key) {
	                    jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
	                }    // Sets one value
	            } else if (value !== undefined) {
	                chainable = true;
	                if (!jQuery.isFunction(value)) {
	                    raw = true;
	                }
	                if (bulk) {
	                    // Bulk operations run against the entire set
	                    if (raw) {
	                        fn.call(elems, value);
	                        fn = null;    // ...except when executing function values
	                    } else {
	                        bulk = fn;
	                        fn = function (elem, key, value) {
	                            return bulk.call(jQuery(elem), value);
	                        };
	                    }
	                }
	                if (fn) {
	                    for (; i < length; i++) {
	                        fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
	                    }
	                }
	            }
	            return chainable ? elems : // Gets
	            bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
	        },
	        now: function () {
	            return new Date().getTime();
	        }
	    });
	    jQuery.ready.promise = function (obj) {
	        if (!readyList) {
	            readyList = jQuery.Deferred();
	            // Catch cases where $(document).ready() is called after the browser event has already occurred.
	            // we once tried to use readyState "interactive" here, but it caused issues like the one
	            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
	            if (document.readyState === 'complete') {
	                // Handle it asynchronously to allow scripts the opportunity to delay ready
	                setTimeout(jQuery.ready);    // Standards-based browsers support DOMContentLoaded
	            } else if (document.addEventListener) {
	                // Use the handy event callback
	                document.addEventListener('DOMContentLoaded', completed, false);
	                // A fallback to window.onload, that will always work
	                window.addEventListener('load', completed, false);    // If IE event model is used
	            } else {
	                // Ensure firing before onload, maybe late but safe also for iframes
	                document.attachEvent('onreadystatechange', completed);
	                // A fallback to window.onload, that will always work
	                window.attachEvent('onload', completed);
	                // If IE and not a frame
	                // continually check to see if the document is ready
	                var top = false;
	                try {
	                    top = window.frameElement == null && document.documentElement;
	                } catch (e) {
	                }
	                if (top && top.doScroll) {
	                    (function doScrollCheck() {
	                        if (!jQuery.isReady) {
	                            try {
	                                // Use the trick by Diego Perini
	                                // http://javascript.nwbox.com/IEContentLoaded/
	                                top.doScroll('left');
	                            } catch (e) {
	                                return setTimeout(doScrollCheck, 50);
	                            }
	                            // detach all dom ready events
	                            detach();
	                            // and execute any waiting functions
	                            jQuery.ready();
	                        }
	                    }());
	                }
	            }
	        }
	        return readyList.promise(obj);
	    };
	    // Populate the class2type map
	    jQuery.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (i, name) {
	        class2type['[object ' + name + ']'] = name.toLowerCase();
	    });
	    function isArraylike(obj) {
	        var length = obj.length, type = jQuery.type(obj);
	        if (jQuery.isWindow(obj)) {
	            return false;
	        }
	        if (obj.nodeType === 1 && length) {
	            return true;
	        }
	        return type === 'array' || type !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
	    }
	    // All jQuery objects should point back to these
	    rootjQuery = jQuery(document);
	    // String to Object options format cache
	    var optionsCache = {};
	    // Convert String-formatted options into Object-formatted ones and store in cache
	    function createOptions(options) {
	        var object = optionsCache[options] = {};
	        jQuery.each(options.match(core_rnotwhite) || [], function (_, flag) {
	            object[flag] = true;
	        });
	        return object;
	    }
	    /*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	    jQuery.Callbacks = function (options) {
	        // Convert options from String-formatted to Object-formatted if needed
	        // (we check in cache first)
	        options = typeof options === 'string' ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
	        var
	            // Flag to know if list is currently firing
	            firing,
	            // Last fire value (for non-forgettable lists)
	            memory,
	            // Flag to know if list was already fired
	            fired,
	            // End of the loop when firing
	            firingLength,
	            // Index of currently firing callback (modified by remove if needed)
	            firingIndex,
	            // First callback to fire (used internally by add and fireWith)
	            firingStart,
	            // Actual callback list
	            list = [],
	            // Stack of fire calls for repeatable lists
	            stack = !options.once && [],
	            // Fire callbacks
	            fire = function (data) {
	                memory = options.memory && data;
	                fired = true;
	                firingIndex = firingStart || 0;
	                firingStart = 0;
	                firingLength = list.length;
	                firing = true;
	                for (; list && firingIndex < firingLength; firingIndex++) {
	                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
	                        memory = false;
	                        // To prevent further calls using add
	                        break;
	                    }
	                }
	                firing = false;
	                if (list) {
	                    if (stack) {
	                        if (stack.length) {
	                            fire(stack.shift());
	                        }
	                    } else if (memory) {
	                        list = [];
	                    } else {
	                        self.disable();
	                    }
	                }
	            },
	            // Actual Callbacks object
	            self = {
	                // Add a callback or a collection of callbacks to the list
	                add: function () {
	                    if (list) {
	                        // First, we save the current length
	                        var start = list.length;
	                        (function add(args) {
	                            jQuery.each(args, function (_, arg) {
	                                var type = jQuery.type(arg);
	                                if (type === 'function') {
	                                    if (!options.unique || !self.has(arg)) {
	                                        list.push(arg);
	                                    }
	                                } else if (arg && arg.length && type !== 'string') {
	                                    // Inspect recursively
	                                    add(arg);
	                                }
	                            });
	                        }(arguments));
	                        // Do we need to add the callbacks to the
	                        // current firing batch?
	                        if (firing) {
	                            firingLength = list.length;    // With memory, if we're not firing then
	                                                           // we should call right away
	                        } else if (memory) {
	                            firingStart = start;
	                            fire(memory);
	                        }
	                    }
	                    return this;
	                },
	                // Remove a callback from the list
	                remove: function () {
	                    if (list) {
	                        jQuery.each(arguments, function (_, arg) {
	                            var index;
	                            while ((index = jQuery.inArray(arg, list, index)) > -1) {
	                                list.splice(index, 1);
	                                // Handle firing indexes
	                                if (firing) {
	                                    if (index <= firingLength) {
	                                        firingLength--;
	                                    }
	                                    if (index <= firingIndex) {
	                                        firingIndex--;
	                                    }
	                                }
	                            }
	                        });
	                    }
	                    return this;
	                },
	                // Check if a given callback is in the list.
	                // If no argument is given, return whether or not list has callbacks attached.
	                has: function (fn) {
	                    return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
	                },
	                // Remove all callbacks from the list
	                empty: function () {
	                    list = [];
	                    return this;
	                },
	                // Have the list do nothing anymore
	                disable: function () {
	                    list = stack = memory = undefined;
	                    return this;
	                },
	                // Is it disabled?
	                disabled: function () {
	                    return !list;
	                },
	                // Lock the list in its current state
	                lock: function () {
	                    stack = undefined;
	                    if (!memory) {
	                        self.disable();
	                    }
	                    return this;
	                },
	                // Is it locked?
	                locked: function () {
	                    return !stack;
	                },
	                // Call all callbacks with the given context and arguments
	                fireWith: function (context, args) {
	                    args = args || [];
	                    args = [
	                        context,
	                        args.slice ? args.slice() : args
	                    ];
	                    if (list && (!fired || stack)) {
	                        if (firing) {
	                            stack.push(args);
	                        } else {
	                            fire(args);
	                        }
	                    }
	                    return this;
	                },
	                // Call all the callbacks with the given arguments
	                fire: function () {
	                    self.fireWith(this, arguments);
	                    return this;
	                },
	                // To know if the callbacks have already been called at least once
	                fired: function () {
	                    return !!fired;
	                }
	            };
	        return self;
	    };
	    jQuery.extend({
	        Deferred: function (func) {
	            var tuples = [
	                    // action, add listener, listener list, final state
	                    [
	                        'resolve',
	                        'done',
	                        jQuery.Callbacks('once memory'),
	                        'resolved'
	                    ],
	                    [
	                        'reject',
	                        'fail',
	                        jQuery.Callbacks('once memory'),
	                        'rejected'
	                    ],
	                    [
	                        'notify',
	                        'progress',
	                        jQuery.Callbacks('memory')
	                    ]
	                ], state = 'pending', promise = {
	                    state: function () {
	                        return state;
	                    },
	                    always: function () {
	                        deferred.done(arguments).fail(arguments);
	                        return this;
	                    },
	                    then: function () {
	                        var fns = arguments;
	                        return jQuery.Deferred(function (newDefer) {
	                            jQuery.each(tuples, function (i, tuple) {
	                                var action = tuple[0], fn = jQuery.isFunction(fns[i]) && fns[i];
	                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
	                                deferred[tuple[1]](function () {
	                                    var returned = fn && fn.apply(this, arguments);
	                                    if (returned && jQuery.isFunction(returned.promise)) {
	                                        returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
	                                    } else {
	                                        newDefer[action + 'With'](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
	                                    }
	                                });
	                            });
	                            fns = null;
	                        }).promise();
	                    },
	                    // Get a promise for this deferred
	                    // If obj is provided, the promise aspect is added to the object
	                    promise: function (obj) {
	                        return obj != null ? jQuery.extend(obj, promise) : promise;
	                    }
	                }, deferred = {};
	            // Keep pipe for back-compat
	            promise.pipe = promise.then;
	            // Add list-specific methods
	            jQuery.each(tuples, function (i, tuple) {
	                var list = tuple[2], stateString = tuple[3];
	                // promise[ done | fail | progress ] = list.add
	                promise[tuple[1]] = list.add;
	                // Handle state
	                if (stateString) {
	                    list.add(function () {
	                        // state = [ resolved | rejected ]
	                        state = stateString;    // [ reject_list | resolve_list ].disable; progress_list.lock
	                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
	                }
	                // deferred[ resolve | reject | notify ]
	                deferred[tuple[0]] = function () {
	                    deferred[tuple[0] + 'With'](this === deferred ? promise : this, arguments);
	                    return this;
	                };
	                deferred[tuple[0] + 'With'] = list.fireWith;
	            });
	            // Make the deferred a promise
	            promise.promise(deferred);
	            // Call given func if any
	            if (func) {
	                func.call(deferred, deferred);
	            }
	            // All done!
	            return deferred;
	        },
	        // Deferred helper
	        when: function (subordinate) {
	            var i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length,
	                // the count of uncompleted subordinates
	                remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
	                // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
	                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	                // Update function for both resolve and progress values
	                updateFunc = function (i, contexts, values) {
	                    return function (value) {
	                        contexts[i] = this;
	                        values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
	                        if (values === progressValues) {
	                            deferred.notifyWith(contexts, values);
	                        } else if (!--remaining) {
	                            deferred.resolveWith(contexts, values);
	                        }
	                    };
	                }, progressValues, progressContexts, resolveContexts;
	            // add listeners to Deferred subordinates; treat others as resolved
	            if (length > 1) {
	                progressValues = new Array(length);
	                progressContexts = new Array(length);
	                resolveContexts = new Array(length);
	                for (; i < length; i++) {
	                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
	                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
	                    } else {
	                        --remaining;
	                    }
	                }
	            }
	            // if we're not waiting on anything, resolve the master
	            if (!remaining) {
	                deferred.resolveWith(resolveContexts, resolveValues);
	            }
	            return deferred.promise();
	        }
	    });
	    jQuery.support = function () {
	        var support, all, a, input, select, fragment, opt, eventName, isSupported, i, div = document.createElement('div');
	        // Setup
	        div.setAttribute('className', 't');
	        div.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>';
	        // Support tests won't run in some limited or non-browser environments
	        all = div.getElementsByTagName('*');
	        a = div.getElementsByTagName('a')[0];
	        if (!all || !a || !all.length) {
	            return {};
	        }
	        // First batch of tests
	        select = document.createElement('select');
	        opt = select.appendChild(document.createElement('option'));
	        input = div.getElementsByTagName('input')[0];
	        a.style.cssText = 'top:1px;float:left;opacity:.5';
	        support = {
	            // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	            getSetAttribute: div.className !== 't',
	            // IE strips leading whitespace when .innerHTML is used
	            leadingWhitespace: div.firstChild.nodeType === 3,
	            // Make sure that tbody elements aren't automatically inserted
	            // IE will insert them into empty tables
	            tbody: !div.getElementsByTagName('tbody').length,
	            // Make sure that link elements get serialized correctly by innerHTML
	            // This requires a wrapper element in IE
	            htmlSerialize: !!div.getElementsByTagName('link').length,
	            // Get the style information from getAttribute
	            // (IE uses .cssText instead)
	            style: /top/.test(a.getAttribute('style')),
	            // Make sure that URLs aren't manipulated
	            // (IE normalizes it by default)
	            hrefNormalized: a.getAttribute('href') === '/a',
	            // Make sure that element opacity exists
	            // (IE uses filter instead)
	            // Use a regex to work around a WebKit issue. See #5145
	            opacity: /^0.5/.test(a.style.opacity),
	            // Verify style float existence
	            // (IE uses styleFloat instead of cssFloat)
	            cssFloat: !!a.style.cssFloat,
	            // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	            checkOn: !!input.value,
	            // Make sure that a selected-by-default option has a working selected property.
	            // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	            optSelected: opt.selected,
	            // Tests for enctype support on a form (#6743)
	            enctype: !!document.createElement('form').enctype,
	            // Makes sure cloning an html5 element does not cause problems
	            // Where outerHTML is undefined, this still works
	            html5Clone: document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>',
	            // jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
	            boxModel: document.compatMode === 'CSS1Compat',
	            // Will be defined later
	            deleteExpando: true,
	            noCloneEvent: true,
	            inlineBlockNeedsLayout: false,
	            shrinkWrapBlocks: false,
	            reliableMarginRight: true,
	            boxSizingReliable: true,
	            pixelPosition: false
	        };
	        // Make sure checked status is properly cloned
	        input.checked = true;
	        support.noCloneChecked = input.cloneNode(true).checked;
	        // Make sure that the options inside disabled selects aren't marked as disabled
	        // (WebKit marks them as disabled)
	        select.disabled = true;
	        support.optDisabled = !opt.disabled;
	        // Support: IE<9
	        try {
	            delete div.test;
	        } catch (e) {
	            support.deleteExpando = false;
	        }
	        // Check if we can trust getAttribute("value")
	        input = document.createElement('input');
	        input.setAttribute('value', '');
	        support.input = input.getAttribute('value') === '';
	        // Check if an input maintains its value after becoming a radio
	        input.value = 't';
	        input.setAttribute('type', 'radio');
	        support.radioValue = input.value === 't';
	        // #11217 - WebKit loses check when the name is after the checked attribute
	        input.setAttribute('checked', 't');
	        input.setAttribute('name', 't');
	        fragment = document.createDocumentFragment();
	        fragment.appendChild(input);
	        // Check if a disconnected checkbox will retain its checked
	        // value of true after appended to the DOM (IE6/7)
	        support.appendChecked = input.checked;
	        // WebKit doesn't clone checked state correctly in fragments
	        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
	        // Support: IE<9
	        // Opera does not clone events (and typeof div.attachEvent === undefined).
	        // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	        if (div.attachEvent) {
	            div.attachEvent('onclick', function () {
	                support.noCloneEvent = false;
	            });
	            div.cloneNode(true).click();
	        }
	        // Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	        // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	        for (i in {
	                submit: true,
	                change: true,
	                focusin: true
	            }) {
	            div.setAttribute(eventName = 'on' + i, 't');
	            support[i + 'Bubbles'] = eventName in window || div.attributes[eventName].expando === false;
	        }
	        div.style.backgroundClip = 'content-box';
	        div.cloneNode(true).style.backgroundClip = '';
	        support.clearCloneStyle = div.style.backgroundClip === 'content-box';
	        // Run tests that need a body at doc ready
	        jQuery(function () {
	            var container, marginDiv, tds, divReset = 'padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;', body = document.getElementsByTagName('body')[0];
	            if (!body) {
	                // Return for frameset docs that don't have a body
	                return;
	            }
	            container = document.createElement('div');
	            container.style.cssText = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px';
	            body.appendChild(container).appendChild(div);
	            // Support: IE8
	            // Check if table cells still have offsetWidth/Height when they are set
	            // to display:none and there are still other visible table cells in a
	            // table row; if so, offsetWidth/Height are not reliable for use when
	            // determining if an element has been hidden directly using
	            // display:none (it is still safe to use offsets if a parent element is
	            // hidden; don safety goggles and see bug #4512 for more information).
	            div.innerHTML = '<table><tr><td></td><td>t</td></tr></table>';
	            tds = div.getElementsByTagName('td');
	            tds[0].style.cssText = 'padding:0;margin:0;border:0;display:none';
	            isSupported = tds[0].offsetHeight === 0;
	            tds[0].style.display = '';
	            tds[1].style.display = 'none';
	            // Support: IE8
	            // Check if empty table cells still have offsetWidth/Height
	            support.reliableHiddenOffsets = isSupported && tds[0].offsetHeight === 0;
	            // Check box-sizing and margin behavior
	            div.innerHTML = '';
	            div.style.cssText = 'box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;';
	            support.boxSizing = div.offsetWidth === 4;
	            support.doesNotIncludeMarginInBodyOffset = body.offsetTop !== 1;
	            // Use window.getComputedStyle because jsdom on node.js will break without it.
	            if (window.getComputedStyle) {
	                support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== '1%';
	                support.boxSizingReliable = (window.getComputedStyle(div, null) || { width: '4px' }).width === '4px';
	                // Check if div with explicit width and no margin-right incorrectly
	                // gets computed margin-right based on width of container. (#3333)
	                // Fails in WebKit before Feb 2011 nightlies
	                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	                marginDiv = div.appendChild(document.createElement('div'));
	                marginDiv.style.cssText = div.style.cssText = divReset;
	                marginDiv.style.marginRight = marginDiv.style.width = '0';
	                div.style.width = '1px';
	                support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
	            }
	            if (typeof div.style.zoom !== core_strundefined) {
	                // Support: IE<8
	                // Check if natively block-level elements act like inline-block
	                // elements when setting their display to 'inline' and giving
	                // them layout
	                div.innerHTML = '';
	                div.style.cssText = divReset + 'width:1px;padding:1px;display:inline;zoom:1';
	                support.inlineBlockNeedsLayout = div.offsetWidth === 3;
	                // Support: IE6
	                // Check if elements with layout shrink-wrap their children
	                div.style.display = 'block';
	                div.innerHTML = '<div></div>';
	                div.firstChild.style.width = '5px';
	                support.shrinkWrapBlocks = div.offsetWidth !== 3;
	                if (support.inlineBlockNeedsLayout) {
	                    // Prevent IE 6 from affecting layout for positioned elements #11048
	                    // Prevent IE from shrinking the body in IE 7 mode #12869
	                    // Support: IE<8
	                    body.style.zoom = 1;
	                }
	            }
	            body.removeChild(container);
	            // Null elements to avoid leaks in IE
	            container = div = tds = marginDiv = null;
	        });
	        // Null elements to avoid leaks in IE
	        all = select = fragment = opt = a = input = null;
	        return support;
	    }();
	    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
	    function internalData(elem, name, data, pvt) {
	        if (!jQuery.acceptData(elem)) {
	            return;
	        }
	        var thisCache, ret, internalKey = jQuery.expando, getByName = typeof name === 'string',
	            // We have to handle DOM nodes and JS objects differently because IE6-7
	            // can't GC object references properly across the DOM-JS boundary
	            isNode = elem.nodeType,
	            // Only DOM nodes need the global jQuery cache; JS object data is
	            // attached directly to the object so GC can occur automatically
	            cache = isNode ? jQuery.cache : elem,
	            // Only defining an ID for JS objects if its cache already exists allows
	            // the code to shortcut on the same path as a DOM node with no cache
	            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
	        // Avoid doing any more work than we need to when trying to get data on an
	        // object that has no data at all
	        if ((!id || !cache[id] || !pvt && !cache[id].data) && getByName && data === undefined) {
	            return;
	        }
	        if (!id) {
	            // Only DOM nodes need a new unique ID for each element since their data
	            // ends up in the global cache
	            if (isNode) {
	                elem[internalKey] = id = core_deletedIds.pop() || jQuery.guid++;
	            } else {
	                id = internalKey;
	            }
	        }
	        if (!cache[id]) {
	            cache[id] = {};
	            // Avoids exposing jQuery metadata on plain JS objects when the object
	            // is serialized using JSON.stringify
	            if (!isNode) {
	                cache[id].toJSON = jQuery.noop;
	            }
	        }
	        // An object can be passed to jQuery.data instead of a key/value pair; this gets
	        // shallow copied over onto the existing cache
	        if (typeof name === 'object' || typeof name === 'function') {
	            if (pvt) {
	                cache[id] = jQuery.extend(cache[id], name);
	            } else {
	                cache[id].data = jQuery.extend(cache[id].data, name);
	            }
	        }
	        thisCache = cache[id];
	        // jQuery data() is stored in a separate object inside the object's internal data
	        // cache in order to avoid key collisions between internal data and user-defined
	        // data.
	        if (!pvt) {
	            if (!thisCache.data) {
	                thisCache.data = {};
	            }
	            thisCache = thisCache.data;
	        }
	        if (data !== undefined) {
	            thisCache[jQuery.camelCase(name)] = data;
	        }
	        // Check for both converted-to-camel and non-converted data property names
	        // If a data property was specified
	        if (getByName) {
	            // First Try to find as-is property data
	            ret = thisCache[name];
	            // Test for null|undefined property data
	            if (ret == null) {
	                // Try to find the camelCased property
	                ret = thisCache[jQuery.camelCase(name)];
	            }
	        } else {
	            ret = thisCache;
	        }
	        return ret;
	    }
	    function internalRemoveData(elem, name, pvt) {
	        if (!jQuery.acceptData(elem)) {
	            return;
	        }
	        var i, l, thisCache, isNode = elem.nodeType,
	            // See jQuery.data for more information
	            cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
	        // If there is already no cache entry for this object, there is no
	        // purpose in continuing
	        if (!cache[id]) {
	            return;
	        }
	        if (name) {
	            thisCache = pvt ? cache[id] : cache[id].data;
	            if (thisCache) {
	                // Support array or space separated string names for data keys
	                if (!jQuery.isArray(name)) {
	                    // try the string as a key before any manipulation
	                    if (name in thisCache) {
	                        name = [name];
	                    } else {
	                        // split the camel cased version by spaces unless a key with the spaces exists
	                        name = jQuery.camelCase(name);
	                        if (name in thisCache) {
	                            name = [name];
	                        } else {
	                            name = name.split(' ');
	                        }
	                    }
	                } else {
	                    // If "name" is an array of keys...
	                    // When data is initially created, via ("key", "val") signature,
	                    // keys will be converted to camelCase.
	                    // Since there is no way to tell _how_ a key was added, remove
	                    // both plain key and camelCase key. #12786
	                    // This will only penalize the array argument path.
	                    name = name.concat(jQuery.map(name, jQuery.camelCase));
	                }
	                for (i = 0, l = name.length; i < l; i++) {
	                    delete thisCache[name[i]];
	                }
	                // If there is no data left in the cache, we want to continue
	                // and let the cache object itself get destroyed
	                if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
	                    return;
	                }
	            }
	        }
	        // See jQuery.data for more information
	        if (!pvt) {
	            delete cache[id].data;
	            // Don't destroy the parent cache unless the internal data object
	            // had been the only thing left in it
	            if (!isEmptyDataObject(cache[id])) {
	                return;
	            }
	        }
	        // Destroy the cache
	        if (isNode) {
	            jQuery.cleanData([elem], true);    // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	        } else if (jQuery.support.deleteExpando || cache != cache.window) {
	            delete cache[id];    // When all else fails, null
	        } else {
	            cache[id] = null;
	        }
	    }
	    jQuery.extend({
	        cache: {},
	        // Unique for each copy of jQuery on the page
	        // Non-digits removed to match rinlinejQuery
	        expando: 'jQuery' + (core_version + Math.random()).replace(/\D/g, ''),
	        // The following elements throw uncatchable exceptions if you
	        // attempt to add expando properties to them.
	        noData: {
	            'embed': true,
	            // Ban all objects except for Flash (which handle expandos)
	            'object': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
	            'applet': true
	        },
	        hasData: function (elem) {
	            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
	            return !!elem && !isEmptyDataObject(elem);
	        },
	        data: function (elem, name, data) {
	            return internalData(elem, name, data);
	        },
	        removeData: function (elem, name) {
	            return internalRemoveData(elem, name);
	        },
	        // For internal use only.
	        _data: function (elem, name, data) {
	            return internalData(elem, name, data, true);
	        },
	        _removeData: function (elem, name) {
	            return internalRemoveData(elem, name, true);
	        },
	        // A method for determining if a DOM node can handle the data expando
	        acceptData: function (elem) {
	            // Do not set data on non-element because it will not be cleared (#8335).
	            if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) {
	                return false;
	            }
	            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
	            // nodes accept data unless otherwise specified; rejection can be conditional
	            return !noData || noData !== true && elem.getAttribute('classid') === noData;
	        }
	    });
	    jQuery.fn.extend({
	        data: function (key, value) {
	            var attrs, name, elem = this[0], i = 0, data = null;
	            // Gets all values
	            if (key === undefined) {
	                if (this.length) {
	                    data = jQuery.data(elem);
	                    if (elem.nodeType === 1 && !jQuery._data(elem, 'parsedAttrs')) {
	                        attrs = elem.attributes;
	                        for (; i < attrs.length; i++) {
	                            name = attrs[i].name;
	                            if (!name.indexOf('data-')) {
	                                name = jQuery.camelCase(name.slice(5));
	                                dataAttr(elem, name, data[name]);
	                            }
	                        }
	                        jQuery._data(elem, 'parsedAttrs', true);
	                    }
	                }
	                return data;
	            }
	            // Sets multiple values
	            if (typeof key === 'object') {
	                return this.each(function () {
	                    jQuery.data(this, key);
	                });
	            }
	            return jQuery.access(this, function (value) {
	                if (value === undefined) {
	                    // Try to fetch any internally stored data first
	                    return elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null;
	                }
	                this.each(function () {
	                    jQuery.data(this, key, value);
	                });
	            }, null, value, arguments.length > 1, null, true);
	        },
	        removeData: function (key) {
	            return this.each(function () {
	                jQuery.removeData(this, key);
	            });
	        }
	    });
	    function dataAttr(elem, key, data) {
	        // If nothing was found internally, try to fetch any
	        // data from the HTML5 data-* attribute
	        if (data === undefined && elem.nodeType === 1) {
	            var name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase();
	            data = elem.getAttribute(name);
	            if (typeof data === 'string') {
	                try {
	                    data = data === 'true' ? true : data === 'false' ? false : data === 'null' ? null : // Only convert to a number if it doesn't change the string
	                    +data + '' === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
	                } catch (e) {
	                }
	                // Make sure we set the data so it isn't changed later
	                jQuery.data(elem, key, data);
	            } else {
	                data = undefined;
	            }
	        }
	        return data;
	    }
	    // checks a cache object for emptiness
	    function isEmptyDataObject(obj) {
	        var name;
	        for (name in obj) {
	            // if the public data object is empty, the private is still empty
	            if (name === 'data' && jQuery.isEmptyObject(obj[name])) {
	                continue;
	            }
	            if (name !== 'toJSON') {
	                return false;
	            }
	        }
	        return true;
	    }
	    jQuery.extend({
	        queue: function (elem, type, data) {
	            var queue;
	            if (elem) {
	                type = (type || 'fx') + 'queue';
	                queue = jQuery._data(elem, type);
	                // Speed up dequeue by getting out quickly if this is just a lookup
	                if (data) {
	                    if (!queue || jQuery.isArray(data)) {
	                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
	                    } else {
	                        queue.push(data);
	                    }
	                }
	                return queue || [];
	            }
	        },
	        dequeue: function (elem, type) {
	            type = type || 'fx';
	            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
	                    jQuery.dequeue(elem, type);
	                };
	            // If the fx queue is dequeued, always remove the progress sentinel
	            if (fn === 'inprogress') {
	                fn = queue.shift();
	                startLength--;
	            }
	            hooks.cur = fn;
	            if (fn) {
	                // Add a progress sentinel to prevent the fx queue from being
	                // automatically dequeued
	                if (type === 'fx') {
	                    queue.unshift('inprogress');
	                }
	                // clear up the last queue stop function
	                delete hooks.stop;
	                fn.call(elem, next, hooks);
	            }
	            if (!startLength && hooks) {
	                hooks.empty.fire();
	            }
	        },
	        // not intended for public consumption - generates a queueHooks object, or returns the current one
	        _queueHooks: function (elem, type) {
	            var key = type + 'queueHooks';
	            return jQuery._data(elem, key) || jQuery._data(elem, key, {
	                empty: jQuery.Callbacks('once memory').add(function () {
	                    jQuery._removeData(elem, type + 'queue');
	                    jQuery._removeData(elem, key);
	                })
	            });
	        }
	    });
	    jQuery.fn.extend({
	        queue: function (type, data) {
	            var setter = 2;
	            if (typeof type !== 'string') {
	                data = type;
	                type = 'fx';
	                setter--;
	            }
	            if (arguments.length < setter) {
	                return jQuery.queue(this[0], type);
	            }
	            return data === undefined ? this : this.each(function () {
	                var queue = jQuery.queue(this, type, data);
	                // ensure a hooks for this queue
	                jQuery._queueHooks(this, type);
	                if (type === 'fx' && queue[0] !== 'inprogress') {
	                    jQuery.dequeue(this, type);
	                }
	            });
	        },
	        dequeue: function (type) {
	            return this.each(function () {
	                jQuery.dequeue(this, type);
	            });
	        },
	        // Based off of the plugin by Clint Helfers, with permission.
	        // http://blindsignals.com/index.php/2009/07/jquery-delay/
	        delay: function (time, type) {
	            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
	            type = type || 'fx';
	            return this.queue(type, function (next, hooks) {
	                var timeout = setTimeout(next, time);
	                hooks.stop = function () {
	                    clearTimeout(timeout);
	                };
	            });
	        },
	        clearQueue: function (type) {
	            return this.queue(type || 'fx', []);
	        },
	        // Get a promise resolved when queues of a certain type
	        // are emptied (fx is the type by default)
	        promise: function (type, obj) {
	            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
	                    if (!--count) {
	                        defer.resolveWith(elements, [elements]);
	                    }
	                };
	            if (typeof type !== 'string') {
	                obj = type;
	                type = undefined;
	            }
	            type = type || 'fx';
	            while (i--) {
	                tmp = jQuery._data(elements[i], type + 'queueHooks');
	                if (tmp && tmp.empty) {
	                    count++;
	                    tmp.empty.add(resolve);
	                }
	            }
	            resolve();
	            return defer.promise(obj);
	        }
	    });
	    var nodeHook, boolHook, rclass = /[\t\r\n]/g, rreturn = /\r/g, rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i, rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute, getSetInput = jQuery.support.input;
	    jQuery.fn.extend({
	        attr: function (name, value) {
	            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
	        },
	        removeAttr: function (name) {
	            return this.each(function () {
	                jQuery.removeAttr(this, name);
	            });
	        },
	        prop: function (name, value) {
	            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
	        },
	        removeProp: function (name) {
	            name = jQuery.propFix[name] || name;
	            return this.each(function () {
	                // try/catch handles cases where IE balks (such as removing a property on window)
	                try {
	                    this[name] = undefined;
	                    delete this[name];
	                } catch (e) {
	                }
	            });
	        },
	        addClass: function (value) {
	            var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = typeof value === 'string' && value;
	            if (jQuery.isFunction(value)) {
	                return this.each(function (j) {
	                    jQuery(this).addClass(value.call(this, j, this.className));
	                });
	            }
	            if (proceed) {
	                // The disjunction here is for better compressibility (see removeClass)
	                classes = (value || '').match(core_rnotwhite) || [];
	                for (; i < len; i++) {
	                    elem = this[i];
	                    cur = elem.nodeType === 1 && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : ' ');
	                    if (cur) {
	                        j = 0;
	                        while (clazz = classes[j++]) {
	                            if (cur.indexOf(' ' + clazz + ' ') < 0) {
	                                cur += clazz + ' ';
	                            }
	                        }
	                        elem.className = jQuery.trim(cur);
	                    }
	                }
	            }
	            return this;
	        },
	        removeClass: function (value) {
	            var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = arguments.length === 0 || typeof value === 'string' && value;
	            if (jQuery.isFunction(value)) {
	                return this.each(function (j) {
	                    jQuery(this).removeClass(value.call(this, j, this.className));
	                });
	            }
	            if (proceed) {
	                classes = (value || '').match(core_rnotwhite) || [];
	                for (; i < len; i++) {
	                    elem = this[i];
	                    // This expression is here for better compressibility (see addClass)
	                    cur = elem.nodeType === 1 && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : '');
	                    if (cur) {
	                        j = 0;
	                        while (clazz = classes[j++]) {
	                            // Remove *all* instances
	                            while (cur.indexOf(' ' + clazz + ' ') >= 0) {
	                                cur = cur.replace(' ' + clazz + ' ', ' ');
	                            }
	                        }
	                        elem.className = value ? jQuery.trim(cur) : '';
	                    }
	                }
	            }
	            return this;
	        },
	        toggleClass: function (value, stateVal) {
	            var type = typeof value, isBool = typeof stateVal === 'boolean';
	            if (jQuery.isFunction(value)) {
	                return this.each(function (i) {
	                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
	                });
	            }
	            return this.each(function () {
	                if (type === 'string') {
	                    // toggle individual class names
	                    var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.match(core_rnotwhite) || [];
	                    while (className = classNames[i++]) {
	                        // check each className given, space separated list
	                        state = isBool ? state : !self.hasClass(className);
	                        self[state ? 'addClass' : 'removeClass'](className);
	                    }    // Toggle whole class name
	                } else if (type === core_strundefined || type === 'boolean') {
	                    if (this.className) {
	                        // store className if set
	                        jQuery._data(this, '__className__', this.className);
	                    }
	                    // If the element has a class name or if we're passed "false",
	                    // then remove the whole classname (if there was one, the above saved it).
	                    // Otherwise bring back whatever was previously saved (if anything),
	                    // falling back to the empty string if nothing was stored.
	                    this.className = this.className || value === false ? '' : jQuery._data(this, '__className__') || '';
	                }
	            });
	        },
	        hasClass: function (selector) {
	            var className = ' ' + selector + ' ', i = 0, l = this.length;
	            for (; i < l; i++) {
	                if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(rclass, ' ').indexOf(className) >= 0) {
	                    return true;
	                }
	            }
	            return false;
	        },
	        val: function (value) {
	            var ret, hooks, isFunction, elem = this[0];
	            if (!arguments.length) {
	                if (elem) {
	                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
	                    if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
	                        return ret;
	                    }
	                    ret = elem.value;
	                    return typeof ret === 'string' ? // handle most common string cases
	                    ret.replace(rreturn, '') : // handle cases where value is null/undef or number
	                    ret == null ? '' : ret;
	                }
	                return;
	            }
	            isFunction = jQuery.isFunction(value);
	            return this.each(function (i) {
	                var val, self = jQuery(this);
	                if (this.nodeType !== 1) {
	                    return;
	                }
	                if (isFunction) {
	                    val = value.call(this, i, self.val());
	                } else {
	                    val = value;
	                }
	                // Treat null/undefined as ""; convert numbers to string
	                if (val == null) {
	                    val = '';
	                } else if (typeof val === 'number') {
	                    val += '';
	                } else if (jQuery.isArray(val)) {
	                    val = jQuery.map(val, function (value) {
	                        return value == null ? '' : value + '';
	                    });
	                }
	                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
	                // If set returns undefined, fall back to normal setting
	                if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
	                    this.value = val;
	                }
	            });
	        }
	    });
	    jQuery.extend({
	        valHooks: {
	            option: {
	                get: function (elem) {
	                    // attributes.value is undefined in Blackberry 4.7 but
	                    // uses .value. See #6932
	                    var val = elem.attributes.value;
	                    return !val || val.specified ? elem.value : elem.text;
	                }
	            },
	            select: {
	                get: function (elem) {
	                    var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === 'select-one' || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
	                    // Loop through all the selected options
	                    for (; i < max; i++) {
	                        option = options[i];
	                        // oldIE doesn't update selected after form reset (#2551)
	                        if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute('disabled') === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, 'optgroup'))) {
	                            // Get the specific value for the option
	                            value = jQuery(option).val();
	                            // We don't need an array for one selects
	                            if (one) {
	                                return value;
	                            }
	                            // Multi-Selects return an array
	                            values.push(value);
	                        }
	                    }
	                    return values;
	                },
	                set: function (elem, value) {
	                    var values = jQuery.makeArray(value);
	                    jQuery(elem).find('option').each(function () {
	                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
	                    });
	                    if (!values.length) {
	                        elem.selectedIndex = -1;
	                    }
	                    return values;
	                }
	            }
	        },
	        attr: function (elem, name, value) {
	            var hooks, notxml, ret, nType = elem.nodeType;
	            // don't get/set attributes on text, comment and attribute nodes
	            if (!elem || nType === 3 || nType === 8 || nType === 2) {
	                return;
	            }
	            // Fallback to prop when attributes are not supported
	            if (typeof elem.getAttribute === core_strundefined) {
	                return jQuery.prop(elem, name, value);
	            }
	            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
	            // All attributes are lowercase
	            // Grab necessary hook if one is defined
	            if (notxml) {
	                name = name.toLowerCase();
	                hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
	            }
	            if (value !== undefined) {
	                if (value === null) {
	                    jQuery.removeAttr(elem, name);
	                } else if (hooks && notxml && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	                    return ret;
	                } else {
	                    elem.setAttribute(name, value + '');
	                    return value;
	                }
	            } else if (hooks && notxml && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
	                return ret;
	            } else {
	                // In IE9+, Flash objects don't have .getAttribute (#12945)
	                // Support: IE9+
	                if (typeof elem.getAttribute !== core_strundefined) {
	                    ret = elem.getAttribute(name);
	                }
	                // Non-existent attributes return null, we normalize to undefined
	                return ret == null ? undefined : ret;
	            }
	        },
	        removeAttr: function (elem, value) {
	            var name, propName, i = 0, attrNames = value && value.match(core_rnotwhite);
	            if (attrNames && elem.nodeType === 1) {
	                while (name = attrNames[i++]) {
	                    propName = jQuery.propFix[name] || name;
	                    // Boolean attributes get special treatment (#10870)
	                    if (rboolean.test(name)) {
	                        // Set corresponding property to false for boolean attributes
	                        // Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
	                        if (!getSetAttribute && ruseDefault.test(name)) {
	                            elem[jQuery.camelCase('default-' + name)] = elem[propName] = false;
	                        } else {
	                            elem[propName] = false;
	                        }    // See #9699 for explanation of this approach (setting first, then removal)
	                    } else {
	                        jQuery.attr(elem, name, '');
	                    }
	                    elem.removeAttribute(getSetAttribute ? name : propName);
	                }
	            }
	        },
	        attrHooks: {
	            type: {
	                set: function (elem, value) {
	                    if (!jQuery.support.radioValue && value === 'radio' && jQuery.nodeName(elem, 'input')) {
	                        // Setting the type on a radio button after the value resets the value in IE6-9
	                        // Reset value to default in case type is set after value during creation
	                        var val = elem.value;
	                        elem.setAttribute('type', value);
	                        if (val) {
	                            elem.value = val;
	                        }
	                        return value;
	                    }
	                }
	            }
	        },
	        propFix: {
	            tabindex: 'tabIndex',
	            readonly: 'readOnly',
	            'for': 'htmlFor',
	            'class': 'className',
	            maxlength: 'maxLength',
	            cellspacing: 'cellSpacing',
	            cellpadding: 'cellPadding',
	            rowspan: 'rowSpan',
	            colspan: 'colSpan',
	            usemap: 'useMap',
	            frameborder: 'frameBorder',
	            contenteditable: 'contentEditable'
	        },
	        prop: function (elem, name, value) {
	            var ret, hooks, notxml, nType = elem.nodeType;
	            // don't get/set properties on text, comment and attribute nodes
	            if (!elem || nType === 3 || nType === 8 || nType === 2) {
	                return;
	            }
	            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
	            if (notxml) {
	                // Fix name and attach hooks
	                name = jQuery.propFix[name] || name;
	                hooks = jQuery.propHooks[name];
	            }
	            if (value !== undefined) {
	                if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	                    return ret;
	                } else {
	                    return elem[name] = value;
	                }
	            } else {
	                if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
	                    return ret;
	                } else {
	                    return elem[name];
	                }
	            }
	        },
	        propHooks: {
	            tabIndex: {
	                get: function (elem) {
	                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
	                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
	                    var attributeNode = elem.getAttributeNode('tabindex');
	                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
	                }
	            }
	        }
	    });
	    // Hook for boolean attributes
	    boolHook = {
	        get: function (elem, name) {
	            var
	                // Use .prop to determine if this attribute is understood as boolean
	                prop = jQuery.prop(elem, name),
	                // Fetch it accordingly
	                attr = typeof prop === 'boolean' && elem.getAttribute(name), detail = typeof prop === 'boolean' ? getSetInput && getSetAttribute ? attr != null : // oldIE fabricates an empty string for missing boolean attributes
	                // and conflates checked/selected into attroperties
	                ruseDefault.test(name) ? elem[jQuery.camelCase('default-' + name)] : !!attr : // fetch an attribute node for properties not recognized as boolean
	                elem.getAttributeNode(name);
	            return detail && detail.value !== false ? name.toLowerCase() : undefined;
	        },
	        set: function (elem, value, name) {
	            if (value === false) {
	                // Remove boolean attributes when set to false
	                jQuery.removeAttr(elem, name);
	            } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
	                // IE<8 needs the *property* name
	                elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);    // Use defaultChecked and defaultSelected for oldIE
	            } else {
	                elem[jQuery.camelCase('default-' + name)] = elem[name] = true;
	            }
	            return name;
	        }
	    };
	    // fix oldIE value attroperty
	    if (!getSetInput || !getSetAttribute) {
	        jQuery.attrHooks.value = {
	            get: function (elem, name) {
	                var ret = elem.getAttributeNode(name);
	                return jQuery.nodeName(elem, 'input') ? // Ignore the value *property* by using defaultValue
	                elem.defaultValue : ret && ret.specified ? ret.value : undefined;
	            },
	            set: function (elem, value, name) {
	                if (jQuery.nodeName(elem, 'input')) {
	                    // Does not return so that setAttribute is also used
	                    elem.defaultValue = value;
	                } else {
	                    // Use nodeHook if defined (#1954); otherwise setAttribute is fine
	                    return nodeHook && nodeHook.set(elem, value, name);
	                }
	            }
	        };
	    }
	    // IE6/7 do not support getting/setting some attributes with get/setAttribute
	    if (!getSetAttribute) {
	        // Use this for any attribute in IE6/7
	        // This fixes almost every IE6/7 issue
	        nodeHook = jQuery.valHooks.button = {
	            get: function (elem, name) {
	                var ret = elem.getAttributeNode(name);
	                return ret && (name === 'id' || name === 'name' || name === 'coords' ? ret.value !== '' : ret.specified) ? ret.value : undefined;
	            },
	            set: function (elem, value, name) {
	                // Set the existing or create a new attribute node
	                var ret = elem.getAttributeNode(name);
	                if (!ret) {
	                    elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name));
	                }
	                ret.value = value += '';
	                // Break association with cloned elements by also using setAttribute (#9646)
	                return name === 'value' || value === elem.getAttribute(name) ? value : undefined;
	            }
	        };
	        // Set contenteditable to false on removals(#10429)
	        // Setting to empty string throws an error as an invalid value
	        jQuery.attrHooks.contenteditable = {
	            get: nodeHook.get,
	            set: function (elem, value, name) {
	                nodeHook.set(elem, value === '' ? false : value, name);
	            }
	        };
	        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
	        // This is for removals
	        jQuery.each([
	            'width',
	            'height'
	        ], function (i, name) {
	            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
	                set: function (elem, value) {
	                    if (value === '') {
	                        elem.setAttribute(name, 'auto');
	                        return value;
	                    }
	                }
	            });
	        });
	    }
	    // Some attributes require a special call on IE
	    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	    if (!jQuery.support.hrefNormalized) {
	        jQuery.each([
	            'href',
	            'src',
	            'width',
	            'height'
	        ], function (i, name) {
	            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
	                get: function (elem) {
	                    var ret = elem.getAttribute(name, 2);
	                    return ret == null ? undefined : ret;
	                }
	            });
	        });
	        // href/src property should get the full normalized URL (#10299/#12915)
	        jQuery.each([
	            'href',
	            'src'
	        ], function (i, name) {
	            jQuery.propHooks[name] = {
	                get: function (elem) {
	                    return elem.getAttribute(name, 4);
	                }
	            };
	        });
	    }
	    if (!jQuery.support.style) {
	        jQuery.attrHooks.style = {
	            get: function (elem) {
	                // Return undefined in the case of empty string
	                // Note: IE uppercases css property names, but if we were to .toLowerCase()
	                // .cssText, that would destroy case senstitivity in URL's, like in "background"
	                return elem.style.cssText || undefined;
	            },
	            set: function (elem, value) {
	                return elem.style.cssText = value + '';
	            }
	        };
	    }
	    // Safari mis-reports the default selected property of an option
	    // Accessing the parent's selectedIndex property fixes it
	    if (!jQuery.support.optSelected) {
	        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
	            get: function (elem) {
	                var parent = elem.parentNode;
	                if (parent) {
	                    parent.selectedIndex;
	                    // Make sure that it also works with optgroups, see #5701
	                    if (parent.parentNode) {
	                        parent.parentNode.selectedIndex;
	                    }
	                }
	                return null;
	            }
	        });
	    }
	    // IE6/7 call enctype encoding
	    if (!jQuery.support.enctype) {
	        jQuery.propFix.enctype = 'encoding';
	    }
	    // Radios and checkboxes getter/setter
	    if (!jQuery.support.checkOn) {
	        jQuery.each([
	            'radio',
	            'checkbox'
	        ], function () {
	            jQuery.valHooks[this] = {
	                get: function (elem) {
	                    // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
	                    return elem.getAttribute('value') === null ? 'on' : elem.value;
	                }
	            };
	        });
	    }
	    jQuery.each([
	        'radio',
	        'checkbox'
	    ], function () {
	        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
	            set: function (elem, value) {
	                if (jQuery.isArray(value)) {
	                    return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
	                }
	            }
	        });
	    });
	    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	    function returnTrue() {
	        return true;
	    }
	    function returnFalse() {
	        return false;
	    }
	    /*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	    jQuery.event = {
	        global: {},
	        add: function (elem, types, handler, data, selector) {
	            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
	            // Don't attach events to noData or text/comment nodes (but allow plain objects)
	            if (!elemData) {
	                return;
	            }
	            // Caller can pass in an object of custom data in lieu of the handler
	            if (handler.handler) {
	                handleObjIn = handler;
	                handler = handleObjIn.handler;
	                selector = handleObjIn.selector;
	            }
	            // Make sure that the handler has a unique ID, used to find/remove it later
	            if (!handler.guid) {
	                handler.guid = jQuery.guid++;
	            }
	            // Init the element's event structure and main handler, if this is the first
	            if (!(events = elemData.events)) {
	                events = elemData.events = {};
	            }
	            if (!(eventHandle = elemData.handle)) {
	                eventHandle = elemData.handle = function (e) {
	                    // Discard the second event of a jQuery.event.trigger() and
	                    // when an event is called after a page has unloaded
	                    return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
	                };
	                // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
	                eventHandle.elem = elem;
	            }
	            // Handle multiple events separated by a space
	            // jQuery(...).bind("mouseover mouseout", fn);
	            types = (types || '').match(core_rnotwhite) || [''];
	            t = types.length;
	            while (t--) {
	                tmp = rtypenamespace.exec(types[t]) || [];
	                type = origType = tmp[1];
	                namespaces = (tmp[2] || '').split('.').sort();
	                // If event changes its type, use the special event handlers for the changed type
	                special = jQuery.event.special[type] || {};
	                // If selector defined, determine special event api type, otherwise given type
	                type = (selector ? special.delegateType : special.bindType) || type;
	                // Update special based on newly reset type
	                special = jQuery.event.special[type] || {};
	                // handleObj is passed to all event handlers
	                handleObj = jQuery.extend({
	                    type: type,
	                    origType: origType,
	                    data: data,
	                    handler: handler,
	                    guid: handler.guid,
	                    selector: selector,
	                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
	                    namespace: namespaces.join('.')
	                }, handleObjIn);
	                // Init the event handler queue if we're the first
	                if (!(handlers = events[type])) {
	                    handlers = events[type] = [];
	                    handlers.delegateCount = 0;
	                    // Only use addEventListener/attachEvent if the special events handler returns false
	                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
	                        // Bind the global event handler to the element
	                        if (elem.addEventListener) {
	                            elem.addEventListener(type, eventHandle, false);
	                        } else if (elem.attachEvent) {
	                            elem.attachEvent('on' + type, eventHandle);
	                        }
	                    }
	                }
	                if (special.add) {
	                    special.add.call(elem, handleObj);
	                    if (!handleObj.handler.guid) {
	                        handleObj.handler.guid = handler.guid;
	                    }
	                }
	                // Add to the element's handler list, delegates in front
	                if (selector) {
	                    handlers.splice(handlers.delegateCount++, 0, handleObj);
	                } else {
	                    handlers.push(handleObj);
	                }
	                // Keep track of which events have ever been used, for event optimization
	                jQuery.event.global[type] = true;
	            }
	            // Nullify elem to prevent memory leaks in IE
	            elem = null;
	        },
	        // Detach an event or set of events from an element
	        remove: function (elem, types, handler, selector, mappedTypes) {
	            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
	            if (!elemData || !(events = elemData.events)) {
	                return;
	            }
	            // Once for each type.namespace in types; type may be omitted
	            types = (types || '').match(core_rnotwhite) || [''];
	            t = types.length;
	            while (t--) {
	                tmp = rtypenamespace.exec(types[t]) || [];
	                type = origType = tmp[1];
	                namespaces = (tmp[2] || '').split('.').sort();
	                // Unbind all events (on this namespace, if provided) for the element
	                if (!type) {
	                    for (type in events) {
	                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
	                    }
	                    continue;
	                }
	                special = jQuery.event.special[type] || {};
	                type = (selector ? special.delegateType : special.bindType) || type;
	                handlers = events[type] || [];
	                tmp = tmp[2] && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');
	                // Remove matching events
	                origCount = j = handlers.length;
	                while (j--) {
	                    handleObj = handlers[j];
	                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
	                        handlers.splice(j, 1);
	                        if (handleObj.selector) {
	                            handlers.delegateCount--;
	                        }
	                        if (special.remove) {
	                            special.remove.call(elem, handleObj);
	                        }
	                    }
	                }
	                // Remove generic event handler if we removed something and no more handlers exist
	                // (avoids potential for endless recursion during removal of special event handlers)
	                if (origCount && !handlers.length) {
	                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
	                        jQuery.removeEvent(elem, type, elemData.handle);
	                    }
	                    delete events[type];
	                }
	            }
	            // Remove the expando if it's no longer used
	            if (jQuery.isEmptyObject(events)) {
	                delete elemData.handle;
	                // removeData also checks for emptiness and clears the expando if empty
	                // so use it instead of delete
	                jQuery._removeData(elem, 'events');
	            }
	        },
	        trigger: function (event, data, elem, onlyHandlers) {
	            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document], type = core_hasOwn.call(event, 'type') ? event.type : event, namespaces = core_hasOwn.call(event, 'namespace') ? event.namespace.split('.') : [];
	            cur = tmp = elem = elem || document;
	            // Don't do events on text and comment nodes
	            if (elem.nodeType === 3 || elem.nodeType === 8) {
	                return;
	            }
	            // focus/blur morphs to focusin/out; ensure we're not firing them right now
	            if (rfocusMorph.test(type + jQuery.event.triggered)) {
	                return;
	            }
	            if (type.indexOf('.') >= 0) {
	                // Namespaced trigger; create a regexp to match event type in handle()
	                namespaces = type.split('.');
	                type = namespaces.shift();
	                namespaces.sort();
	            }
	            ontype = type.indexOf(':') < 0 && 'on' + type;
	            // Caller can pass in a jQuery.Event object, Object, or just an event type string
	            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === 'object' && event);
	            event.isTrigger = true;
	            event.namespace = namespaces.join('.');
	            event.namespace_re = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
	            // Clean up the event in case it is being reused
	            event.result = undefined;
	            if (!event.target) {
	                event.target = elem;
	            }
	            // Clone any incoming data and prepend the event, creating the handler arg list
	            data = data == null ? [event] : jQuery.makeArray(data, [event]);
	            // Allow special events to draw outside the lines
	            special = jQuery.event.special[type] || {};
	            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
	                return;
	            }
	            // Determine event propagation path in advance, per W3C events spec (#9951)
	            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
	            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
	                bubbleType = special.delegateType || type;
	                if (!rfocusMorph.test(bubbleType + type)) {
	                    cur = cur.parentNode;
	                }
	                for (; cur; cur = cur.parentNode) {
	                    eventPath.push(cur);
	                    tmp = cur;
	                }
	                // Only add window if we got to document (e.g., not plain obj or detached DOM)
	                if (tmp === (elem.ownerDocument || document)) {
	                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
	                }
	            }
	            // Fire handlers on the event path
	            i = 0;
	            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
	                event.type = i > 1 ? bubbleType : special.bindType || type;
	                // jQuery handler
	                handle = (jQuery._data(cur, 'events') || {})[event.type] && jQuery._data(cur, 'handle');
	                if (handle) {
	                    handle.apply(cur, data);
	                }
	                // Native handler
	                handle = ontype && cur[ontype];
	                if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
	                    event.preventDefault();
	                }
	            }
	            event.type = type;
	            // If nobody prevented the default action, do it now
	            if (!onlyHandlers && !event.isDefaultPrevented()) {
	                if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === 'click' && jQuery.nodeName(elem, 'a')) && jQuery.acceptData(elem)) {
	                    // Call a native DOM method on the target with the same name name as the event.
	                    // Can't use an .isFunction() check here because IE6/7 fails that test.
	                    // Don't do default actions on window, that's where global variables be (#6170)
	                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {
	                        // Don't re-trigger an onFOO event when we call its FOO() method
	                        tmp = elem[ontype];
	                        if (tmp) {
	                            elem[ontype] = null;
	                        }
	                        // Prevent re-triggering of the same event, since we already bubbled it above
	                        jQuery.event.triggered = type;
	                        try {
	                            elem[type]();
	                        } catch (e) {
	                        }
	                        jQuery.event.triggered = undefined;
	                        if (tmp) {
	                            elem[ontype] = tmp;
	                        }
	                    }
	                }
	            }
	            return event.result;
	        },
	        dispatch: function (event) {
	            // Make a writable jQuery.Event from the native event object
	            event = jQuery.event.fix(event);
	            var i, ret, handleObj, matched, j, handlerQueue = [], args = core_slice.call(arguments), handlers = (jQuery._data(this, 'events') || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
	            // Use the fix-ed jQuery.Event rather than the (read-only) native event
	            args[0] = event;
	            event.delegateTarget = this;
	            // Call the preDispatch hook for the mapped type, and let it bail if desired
	            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
	                return;
	            }
	            // Determine handlers
	            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
	            // Run delegates first; they may want to stop propagation beneath us
	            i = 0;
	            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
	                event.currentTarget = matched.elem;
	                j = 0;
	                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
	                    // Triggered event must either 1) have no namespace, or
	                    // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
	                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
	                        event.handleObj = handleObj;
	                        event.data = handleObj.data;
	                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
	                        if (ret !== undefined) {
	                            if ((event.result = ret) === false) {
	                                event.preventDefault();
	                                event.stopPropagation();
	                            }
	                        }
	                    }
	                }
	            }
	            // Call the postDispatch hook for the mapped type
	            if (special.postDispatch) {
	                special.postDispatch.call(this, event);
	            }
	            return event.result;
	        },
	        handlers: function (event, handlers) {
	            var sel, handleObj, matches, i, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
	            // Find delegate handlers
	            // Black-hole SVG <use> instance trees (#13180)
	            // Avoid non-left-click bubbling in Firefox (#3861)
	            if (delegateCount && cur.nodeType && (!event.button || event.type !== 'click')) {
	                for (; cur != this; cur = cur.parentNode || this) {
	                    // Don't check non-elements (#13208)
	                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
	                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== 'click')) {
	                        matches = [];
	                        for (i = 0; i < delegateCount; i++) {
	                            handleObj = handlers[i];
	                            // Don't conflict with Object.prototype properties (#13203)
	                            sel = handleObj.selector + ' ';
	                            if (matches[sel] === undefined) {
	                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
	                            }
	                            if (matches[sel]) {
	                                matches.push(handleObj);
	                            }
	                        }
	                        if (matches.length) {
	                            handlerQueue.push({
	                                elem: cur,
	                                handlers: matches
	                            });
	                        }
	                    }
	                }
	            }
	            // Add the remaining (directly-bound) handlers
	            if (delegateCount < handlers.length) {
	                handlerQueue.push({
	                    elem: this,
	                    handlers: handlers.slice(delegateCount)
	                });
	            }
	            return handlerQueue;
	        },
	        fix: function (event) {
	            if (event[jQuery.expando]) {
	                return event;
	            }
	            // Create a writable copy of the event object and normalize some properties
	            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
	            if (!fixHook) {
	                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
	            }
	            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
	            event = new jQuery.Event(originalEvent);
	            i = copy.length;
	            while (i--) {
	                prop = copy[i];
	                event[prop] = originalEvent[prop];
	            }
	            // Support: IE<9
	            // Fix target property (#1925)
	            if (!event.target) {
	                event.target = originalEvent.srcElement || document;
	            }
	            // Support: Chrome 23+, Safari?
	            // Target should not be a text node (#504, #13143)
	            if (event.target.nodeType === 3) {
	                event.target = event.target.parentNode;
	            }
	            // Support: IE<9
	            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
	            event.metaKey = !!event.metaKey;
	            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
	        },
	        // Includes some event props shared by KeyEvent and MouseEvent
	        props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
	        fixHooks: {},
	        keyHooks: {
	            props: 'char charCode key keyCode'.split(' '),
	            filter: function (event, original) {
	                // Add which for key events
	                if (event.which == null) {
	                    event.which = original.charCode != null ? original.charCode : original.keyCode;
	                }
	                return event;
	            }
	        },
	        mouseHooks: {
	            props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
	            filter: function (event, original) {
	                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
	                // Calculate pageX/Y if missing and clientX/Y available
	                if (event.pageX == null && original.clientX != null) {
	                    eventDoc = event.target.ownerDocument || document;
	                    doc = eventDoc.documentElement;
	                    body = eventDoc.body;
	                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	                }
	                // Add relatedTarget, if necessary
	                if (!event.relatedTarget && fromElement) {
	                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
	                }
	                // Add which for click: 1 === left; 2 === middle; 3 === right
	                // Note: button is not normalized, so don't use it
	                if (!event.which && button !== undefined) {
	                    event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
	                }
	                return event;
	            }
	        },
	        special: {
	            load: {
	                // Prevent triggered image.load events from bubbling to window.load
	                noBubble: true
	            },
	            click: {
	                // For checkbox, fire native event so checked state will be right
	                trigger: function () {
	                    if (jQuery.nodeName(this, 'input') && this.type === 'checkbox' && this.click) {
	                        this.click();
	                        return false;
	                    }
	                }
	            },
	            focus: {
	                // Fire native event if possible so blur/focus sequence is correct
	                trigger: function () {
	                    if (this !== document.activeElement && this.focus) {
	                        try {
	                            this.focus();
	                            return false;
	                        } catch (e) {
	                        }
	                    }
	                },
	                delegateType: 'focusin'
	            },
	            blur: {
	                trigger: function () {
	                    if (this === document.activeElement && this.blur) {
	                        this.blur();
	                        return false;
	                    }
	                },
	                delegateType: 'focusout'
	            },
	            beforeunload: {
	                postDispatch: function (event) {
	                    // Even when returnValue equals to undefined Firefox will still show alert
	                    if (event.result !== undefined) {
	                        event.originalEvent.returnValue = event.result;
	                    }
	                }
	            }
	        },
	        simulate: function (type, elem, event, bubble) {
	            // Piggyback on a donor event to simulate a different one.
	            // Fake originalEvent to avoid donor's stopPropagation, but if the
	            // simulated event prevents default then we do the same on the donor.
	            var e = jQuery.extend(new jQuery.Event(), event, {
	                type: type,
	                isSimulated: true,
	                originalEvent: {}
	            });
	            if (bubble) {
	                jQuery.event.trigger(e, null, elem);
	            } else {
	                jQuery.event.dispatch.call(elem, e);
	            }
	            if (e.isDefaultPrevented()) {
	                event.preventDefault();
	            }
	        }
	    };
	    jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
	        if (elem.removeEventListener) {
	            elem.removeEventListener(type, handle, false);
	        }
	    } : function (elem, type, handle) {
	        var name = 'on' + type;
	        if (elem.detachEvent) {
	            // #8545, #7054, preventing memory leaks for custom events in IE6-8
	            // detachEvent needed property on element, by name of that event, to properly expose it to GC
	            if (typeof elem[name] === core_strundefined) {
	                elem[name] = null;
	            }
	            elem.detachEvent(name, handle);
	        }
	    };
	    jQuery.Event = function (src, props) {
	        // Allow instantiation without the 'new' keyword
	        if (!(this instanceof jQuery.Event)) {
	            return new jQuery.Event(src, props);
	        }
	        // Event object
	        if (src && src.type) {
	            this.originalEvent = src;
	            this.type = src.type;
	            // Events bubbling up the document may have been marked as prevented
	            // by a handler lower down the tree; reflect the correct value.
	            this.isDefaultPrevented = src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse;    // Event type
	        } else {
	            this.type = src;
	        }
	        // Put explicitly provided properties onto the event object
	        if (props) {
	            jQuery.extend(this, props);
	        }
	        // Create a timestamp if incoming event doesn't have one
	        this.timeStamp = src && src.timeStamp || jQuery.now();
	        // Mark it as fixed
	        this[jQuery.expando] = true;
	    };
	    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	    jQuery.Event.prototype = {
	        isDefaultPrevented: returnFalse,
	        isPropagationStopped: returnFalse,
	        isImmediatePropagationStopped: returnFalse,
	        preventDefault: function () {
	            var e = this.originalEvent;
	            this.isDefaultPrevented = returnTrue;
	            if (!e) {
	                return;
	            }
	            // If preventDefault exists, run it on the original event
	            if (e.preventDefault) {
	                e.preventDefault();    // Support: IE
	                                       // Otherwise set the returnValue property of the original event to false
	            } else {
	                e.returnValue = false;
	            }
	        },
	        stopPropagation: function () {
	            var e = this.originalEvent;
	            this.isPropagationStopped = returnTrue;
	            if (!e) {
	                return;
	            }
	            // If stopPropagation exists, run it on the original event
	            if (e.stopPropagation) {
	                e.stopPropagation();
	            }
	            // Support: IE
	            // Set the cancelBubble property of the original event to true
	            e.cancelBubble = true;
	        },
	        stopImmediatePropagation: function () {
	            this.isImmediatePropagationStopped = returnTrue;
	            this.stopPropagation();
	        }
	    };
	    // Create mouseenter/leave events using mouseover/out and event-time checks
	    jQuery.each({
	        mouseenter: 'mouseover',
	        mouseleave: 'mouseout'
	    }, function (orig, fix) {
	        jQuery.event.special[orig] = {
	            delegateType: fix,
	            bindType: fix,
	            handle: function (event) {
	                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
	                // For mousenter/leave call the handler if related is outside the target.
	                // NB: No relatedTarget if the mouse left/entered the browser window
	                if (!related || related !== target && !jQuery.contains(target, related)) {
	                    event.type = handleObj.origType;
	                    ret = handleObj.handler.apply(this, arguments);
	                    event.type = fix;
	                }
	                return ret;
	            }
	        };
	    });
	    // IE submit delegation
	    if (!jQuery.support.submitBubbles) {
	        jQuery.event.special.submit = {
	            setup: function () {
	                // Only need this for delegated form submit events
	                if (jQuery.nodeName(this, 'form')) {
	                    return false;
	                }
	                // Lazy-add a submit handler when a descendant form may potentially be submitted
	                jQuery.event.add(this, 'click._submit keypress._submit', function (e) {
	                    // Node name check avoids a VML-related crash in IE (#9807)
	                    var elem = e.target, form = jQuery.nodeName(elem, 'input') || jQuery.nodeName(elem, 'button') ? elem.form : undefined;
	                    if (form && !jQuery._data(form, 'submitBubbles')) {
	                        jQuery.event.add(form, 'submit._submit', function (event) {
	                            event._submit_bubble = true;
	                        });
	                        jQuery._data(form, 'submitBubbles', true);
	                    }
	                });    // return undefined since we don't need an event listener
	            },
	            postDispatch: function (event) {
	                // If form was submitted by the user, bubble the event up the tree
	                if (event._submit_bubble) {
	                    delete event._submit_bubble;
	                    if (this.parentNode && !event.isTrigger) {
	                        jQuery.event.simulate('submit', this.parentNode, event, true);
	                    }
	                }
	            },
	            teardown: function () {
	                // Only need this for delegated form submit events
	                if (jQuery.nodeName(this, 'form')) {
	                    return false;
	                }
	                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
	                jQuery.event.remove(this, '._submit');
	            }
	        };
	    }
	    // IE change delegation and checkbox/radio fix
	    if (!jQuery.support.changeBubbles) {
	        jQuery.event.special.change = {
	            setup: function () {
	                if (rformElems.test(this.nodeName)) {
	                    // IE doesn't fire change on a check/radio until blur; trigger it on click
	                    // after a propertychange. Eat the blur-change in special.change.handle.
	                    // This still fires onchange a second time for check/radio after blur.
	                    if (this.type === 'checkbox' || this.type === 'radio') {
	                        jQuery.event.add(this, 'propertychange._change', function (event) {
	                            if (event.originalEvent.propertyName === 'checked') {
	                                this._just_changed = true;
	                            }
	                        });
	                        jQuery.event.add(this, 'click._change', function (event) {
	                            if (this._just_changed && !event.isTrigger) {
	                                this._just_changed = false;
	                            }
	                            // Allow triggered, simulated change events (#11500)
	                            jQuery.event.simulate('change', this, event, true);
	                        });
	                    }
	                    return false;
	                }
	                // Delegated event; lazy-add a change handler on descendant inputs
	                jQuery.event.add(this, 'beforeactivate._change', function (e) {
	                    var elem = e.target;
	                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, 'changeBubbles')) {
	                        jQuery.event.add(elem, 'change._change', function (event) {
	                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
	                                jQuery.event.simulate('change', this.parentNode, event, true);
	                            }
	                        });
	                        jQuery._data(elem, 'changeBubbles', true);
	                    }
	                });
	            },
	            handle: function (event) {
	                var elem = event.target;
	                // Swallow native change events from checkbox/radio, we already triggered them above
	                if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== 'radio' && elem.type !== 'checkbox') {
	                    return event.handleObj.handler.apply(this, arguments);
	                }
	            },
	            teardown: function () {
	                jQuery.event.remove(this, '._change');
	                return !rformElems.test(this.nodeName);
	            }
	        };
	    }
	    // Create "bubbling" focus and blur events
	    if (!jQuery.support.focusinBubbles) {
	        jQuery.each({
	            focus: 'focusin',
	            blur: 'focusout'
	        }, function (orig, fix) {
	            // Attach a single capturing handler while someone wants focusin/focusout
	            var attaches = 0, handler = function (event) {
	                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
	                };
	            jQuery.event.special[fix] = {
	                setup: function () {
	                    if (attaches++ === 0) {
	                        document.addEventListener(orig, handler, true);
	                    }
	                },
	                teardown: function () {
	                    if (--attaches === 0) {
	                        document.removeEventListener(orig, handler, true);
	                    }
	                }
	            };
	        });
	    }
	    jQuery.fn.extend({
	        on: function (types, selector, data, fn, one) {
	            var type, origFn;
	            // Types can be a map of types/handlers
	            if (typeof types === 'object') {
	                // ( types-Object, selector, data )
	                if (typeof selector !== 'string') {
	                    // ( types-Object, data )
	                    data = data || selector;
	                    selector = undefined;
	                }
	                for (type in types) {
	                    this.on(type, selector, data, types[type], one);
	                }
	                return this;
	            }
	            if (data == null && fn == null) {
	                // ( types, fn )
	                fn = selector;
	                data = selector = undefined;
	            } else if (fn == null) {
	                if (typeof selector === 'string') {
	                    // ( types, selector, fn )
	                    fn = data;
	                    data = undefined;
	                } else {
	                    // ( types, data, fn )
	                    fn = data;
	                    data = selector;
	                    selector = undefined;
	                }
	            }
	            if (fn === false) {
	                fn = returnFalse;
	            } else if (!fn) {
	                return this;
	            }
	            if (one === 1) {
	                origFn = fn;
	                fn = function (event) {
	                    // Can use an empty set, since event contains the info
	                    jQuery().off(event);
	                    return origFn.apply(this, arguments);
	                };
	                // Use same guid so caller can remove using origFn
	                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
	            }
	            return this.each(function () {
	                jQuery.event.add(this, types, fn, data, selector);
	            });
	        },
	        one: function (types, selector, data, fn) {
	            return this.on(types, selector, data, fn, 1);
	        },
	        off: function (types, selector, fn) {
	            var handleObj, type;
	            if (types && types.preventDefault && types.handleObj) {
	                // ( event )  dispatched jQuery.Event
	                handleObj = types.handleObj;
	                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
	                return this;
	            }
	            if (typeof types === 'object') {
	                // ( types-object [, selector] )
	                for (type in types) {
	                    this.off(type, selector, types[type]);
	                }
	                return this;
	            }
	            if (selector === false || typeof selector === 'function') {
	                // ( types [, fn] )
	                fn = selector;
	                selector = undefined;
	            }
	            if (fn === false) {
	                fn = returnFalse;
	            }
	            return this.each(function () {
	                jQuery.event.remove(this, types, fn, selector);
	            });
	        },
	        bind: function (types, data, fn) {
	            return this.on(types, null, data, fn);
	        },
	        unbind: function (types, fn) {
	            return this.off(types, null, fn);
	        },
	        delegate: function (selector, types, data, fn) {
	            return this.on(types, selector, data, fn);
	        },
	        undelegate: function (selector, types, fn) {
	            // ( namespace ) or ( selector, types [, fn] )
	            return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn);
	        },
	        trigger: function (type, data) {
	            return this.each(function () {
	                jQuery.event.trigger(type, data, this);
	            });
	        },
	        triggerHandler: function (type, data) {
	            var elem = this[0];
	            if (elem) {
	                return jQuery.event.trigger(type, data, elem, true);
	            }
	        }
	    });
	    /*!
	 * Sizzle CSS Selector Engine
	 * Copyright 2012 jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://sizzlejs.com/
	 */
	    (function (window, undefined) {
	        var i, cachedruns, Expr, getText, isXML, compile, hasDuplicate, outermostContext,
	            // Local document vars
	            setDocument, document, docElem, documentIsXML, rbuggyQSA, rbuggyMatches, matches, contains, sortOrder,
	            // Instance-specific data
	            expando = 'sizzle' + -new Date(), preferredDoc = window.document, support = {}, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(),
	            // General-purpose constants
	            strundefined = typeof undefined, MAX_NEGATIVE = 1 << 31,
	            // Array methods
	            arr = [], pop = arr.pop, push = arr.push, slice = arr.slice,
	            // Use a stripped-down indexOf if we can't use a native one
	            indexOf = arr.indexOf || function (elem) {
	                var i = 0, len = this.length;
	                for (; i < len; i++) {
	                    if (this[i] === elem) {
	                        return i;
	                    }
	                }
	                return -1;
	            },
	            // Regular expressions
	            // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	            whitespace = '[\\x20\\t\\r\\n\\f]',
	            // http://www.w3.org/TR/css3-syntax/#characters
	            characterEncoding = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
	            // Loosely modeled on CSS identifier characters
	            // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	            // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	            identifier = characterEncoding.replace('w', 'w#'),
	            // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	            operators = '([*^$|!~]?=)', attributes = '\\[' + whitespace + '*(' + characterEncoding + ')' + whitespace + '*(?:' + operators + whitespace + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + identifier + ')|)|)' + whitespace + '*\\]',
	            // Prefer arguments quoted,
	            //   then not containing pseudos/brackets,
	            //   then attribute selectors/non-parenthetical expressions,
	            //   then anything else
	            // These preferences are here to reduce the number of selectors
	            //   needing tokenize in the PSEUDO preFilter
	            pseudos = ':(' + characterEncoding + ')(?:\\((([\'"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|' + attributes.replace(3, 8) + ')*)|.*)\\)|)',
	            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	            rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([\\x20\\t\\r\\n\\f>+~])' + whitespace + '*'), rpseudo = new RegExp(pseudos), ridentifier = new RegExp('^' + identifier + '$'), matchExpr = {
	                'ID': new RegExp('^#(' + characterEncoding + ')'),
	                'CLASS': new RegExp('^\\.(' + characterEncoding + ')'),
	                'NAME': new RegExp('^\\[name=[\'"]?(' + characterEncoding + ')[\'"]?\\]'),
	                'TAG': new RegExp('^(' + characterEncoding.replace('w', 'w*') + ')'),
	                'ATTR': new RegExp('^' + attributes),
	                'PSEUDO': new RegExp('^' + pseudos),
	                'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
	                // For use in libraries implementing .is()
	                // We use this for POS matching in `select`
	                'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
	            }, rsibling = /[\x20\t\r\n\f]*[+~]/, rnative = /^[^{]+\{\s*\[native code/,
	            // Easily-parseable/retrievable ID or TAG or CLASS selectors
	            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
	            // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	            runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, funescape = function (_, escaped) {
	                var high = '0x' + escaped - 65536;
	                // NaN means non-codepoint
	                return high !== high ? escaped : // BMP codepoint
	                high < 0 ? String.fromCharCode(high + 65536) : // Supplemental Plane codepoint (surrogate pair)
	                String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
	            };
	        // Use a stripped-down slice if we can't use a native one
	        try {
	            slice.call(preferredDoc.documentElement.childNodes, 0)[0].nodeType;
	        } catch (e) {
	            slice = function (i) {
	                var elem, results = [];
	                while (elem = this[i++]) {
	                    results.push(elem);
	                }
	                return results;
	            };
	        }
	        /**
	 * For feature detection
	 * @param {Function} fn The function to test for native support
	 */
	        function isNative(fn) {
	            return rnative.test(fn + '');
	        }
	        /**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	        function createCache() {
	            var cache, keys = [];
	            return cache = function (key, value) {
	                // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
	                if (keys.push(key += ' ') > Expr.cacheLength) {
	                    // Only keep the most recent entries
	                    delete cache[keys.shift()];
	                }
	                return cache[key] = value;
	            };
	        }
	        /**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	        function markFunction(fn) {
	            fn[expando] = true;
	            return fn;
	        }
	        /**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	        function assert(fn) {
	            var div = document.createElement('div');
	            try {
	                return fn(div);
	            } catch (e) {
	                return false;
	            } finally {
	                // release memory in IE
	                div = null;
	            }
	        }
	        function Sizzle(selector, context, results, seed) {
	            var match, elem, m, nodeType,
	                // QSA vars
	                i, groups, old, nid, newContext, newSelector;
	            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
	                setDocument(context);
	            }
	            context = context || document;
	            results = results || [];
	            if (!selector || typeof selector !== 'string') {
	                return results;
	            }
	            if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
	                return [];
	            }
	            if (!documentIsXML && !seed) {
	                // Shortcuts
	                if (match = rquickExpr.exec(selector)) {
	                    // Speed-up: Sizzle("#ID")
	                    if (m = match[1]) {
	                        if (nodeType === 9) {
	                            elem = context.getElementById(m);
	                            // Check parentNode to catch when Blackberry 4.6 returns
	                            // nodes that are no longer in the document #6963
	                            if (elem && elem.parentNode) {
	                                // Handle the case where IE, Opera, and Webkit return items
	                                // by name instead of ID
	                                if (elem.id === m) {
	                                    results.push(elem);
	                                    return results;
	                                }
	                            } else {
	                                return results;
	                            }
	                        } else {
	                            // Context is not a document
	                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
	                                results.push(elem);
	                                return results;
	                            }
	                        }    // Speed-up: Sizzle("TAG")
	                    } else if (match[2]) {
	                        push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
	                        return results;    // Speed-up: Sizzle(".CLASS")
	                    } else if ((m = match[3]) && support.getByClassName && context.getElementsByClassName) {
	                        push.apply(results, slice.call(context.getElementsByClassName(m), 0));
	                        return results;
	                    }
	                }
	                // QSA path
	                if (support.qsa && !rbuggyQSA.test(selector)) {
	                    old = true;
	                    nid = expando;
	                    newContext = context;
	                    newSelector = nodeType === 9 && selector;
	                    // qSA works strangely on Element-rooted queries
	                    // We can work around this by specifying an extra ID on the root
	                    // and working up from there (Thanks to Andrew Dupont for the technique)
	                    // IE 8 doesn't work on object elements
	                    if (nodeType === 1 && context.nodeName.toLowerCase() !== 'object') {
	                        groups = tokenize(selector);
	                        if (old = context.getAttribute('id')) {
	                            nid = old.replace(rescape, '\\$&');
	                        } else {
	                            context.setAttribute('id', nid);
	                        }
	                        nid = '[id=\'' + nid + '\'] ';
	                        i = groups.length;
	                        while (i--) {
	                            groups[i] = nid + toSelector(groups[i]);
	                        }
	                        newContext = rsibling.test(selector) && context.parentNode || context;
	                        newSelector = groups.join(',');
	                    }
	                    if (newSelector) {
	                        try {
	                            push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
	                            return results;
	                        } catch (qsaError) {
	                        } finally {
	                            if (!old) {
	                                context.removeAttribute('id');
	                            }
	                        }
	                    }
	                }
	            }
	            // All others
	            return select(selector.replace(rtrim, '$1'), context, results, seed);
	        }
	        /**
	 * Detect xml
	 * @param {Element|Object} elem An element or a document
	 */
	        isXML = Sizzle.isXML = function (elem) {
	            // documentElement is verified for cases where it doesn't yet exist
	            // (such as loading iframes in IE - #4833)
	            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	            return documentElement ? documentElement.nodeName !== 'HTML' : false;
	        };
	        /**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	        setDocument = Sizzle.setDocument = function (node) {
	            var doc = node ? node.ownerDocument || node : preferredDoc;
	            // If no document and documentElement is available, return
	            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
	                return document;
	            }
	            // Set our document
	            document = doc;
	            docElem = doc.documentElement;
	            // Support tests
	            documentIsXML = isXML(doc);
	            // Check if getElementsByTagName("*") returns only elements
	            support.tagNameNoComments = assert(function (div) {
	                div.appendChild(doc.createComment(''));
	                return !div.getElementsByTagName('*').length;
	            });
	            // Check if attributes should be retrieved by attribute nodes
	            support.attributes = assert(function (div) {
	                div.innerHTML = '<select></select>';
	                var type = typeof div.lastChild.getAttribute('multiple');
	                // IE8 returns a string for some attributes even when not present
	                return type !== 'boolean' && type !== 'string';
	            });
	            // Check if getElementsByClassName can be trusted
	            support.getByClassName = assert(function (div) {
	                // Opera can't find a second classname (in 9.6)
	                div.innerHTML = '<div class=\'hidden e\'></div><div class=\'hidden\'></div>';
	                if (!div.getElementsByClassName || !div.getElementsByClassName('e').length) {
	                    return false;
	                }
	                // Safari 3.2 caches class attributes and doesn't catch changes
	                div.lastChild.className = 'e';
	                return div.getElementsByClassName('e').length === 2;
	            });
	            // Check if getElementById returns elements by name
	            // Check if getElementsByName privileges form controls or returns elements by ID
	            support.getByName = assert(function (div) {
	                // Inject content
	                div.id = expando + 0;
	                div.innerHTML = '<a name=\'' + expando + '\'></a><div name=\'' + expando + '\'></div>';
	                docElem.insertBefore(div, docElem.firstChild);
	                // Test
	                var pass = doc.getElementsByName && // buggy browsers will return fewer than the correct 2
	                doc.getElementsByName(expando).length === 2 + // buggy browsers will return more than the correct 0
	                doc.getElementsByName(expando + 0).length;
	                support.getIdNotName = !doc.getElementById(expando);
	                // Cleanup
	                docElem.removeChild(div);
	                return pass;
	            });
	            // IE6/7 return modified attributes
	            Expr.attrHandle = assert(function (div) {
	                div.innerHTML = '<a href=\'#\'></a>';
	                return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute('href') === '#';
	            }) ? {} : {
	                'href': function (elem) {
	                    return elem.getAttribute('href', 2);
	                },
	                'type': function (elem) {
	                    return elem.getAttribute('type');
	                }
	            };
	            // ID find and filter
	            if (support.getIdNotName) {
	                Expr.find['ID'] = function (id, context) {
	                    if (typeof context.getElementById !== strundefined && !documentIsXML) {
	                        var m = context.getElementById(id);
	                        // Check parentNode to catch when Blackberry 4.6 returns
	                        // nodes that are no longer in the document #6963
	                        return m && m.parentNode ? [m] : [];
	                    }
	                };
	                Expr.filter['ID'] = function (id) {
	                    var attrId = id.replace(runescape, funescape);
	                    return function (elem) {
	                        return elem.getAttribute('id') === attrId;
	                    };
	                };
	            } else {
	                Expr.find['ID'] = function (id, context) {
	                    if (typeof context.getElementById !== strundefined && !documentIsXML) {
	                        var m = context.getElementById(id);
	                        return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode('id').value === id ? [m] : undefined : [];
	                    }
	                };
	                Expr.filter['ID'] = function (id) {
	                    var attrId = id.replace(runescape, funescape);
	                    return function (elem) {
	                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode('id');
	                        return node && node.value === attrId;
	                    };
	                };
	            }
	            // Tag
	            Expr.find['TAG'] = support.tagNameNoComments ? function (tag, context) {
	                if (typeof context.getElementsByTagName !== strundefined) {
	                    return context.getElementsByTagName(tag);
	                }
	            } : function (tag, context) {
	                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
	                // Filter out possible comments
	                if (tag === '*') {
	                    while (elem = results[i++]) {
	                        if (elem.nodeType === 1) {
	                            tmp.push(elem);
	                        }
	                    }
	                    return tmp;
	                }
	                return results;
	            };
	            // Name
	            Expr.find['NAME'] = support.getByName && function (tag, context) {
	                if (typeof context.getElementsByName !== strundefined) {
	                    return context.getElementsByName(name);
	                }
	            };
	            // Class
	            Expr.find['CLASS'] = support.getByClassName && function (className, context) {
	                if (typeof context.getElementsByClassName !== strundefined && !documentIsXML) {
	                    return context.getElementsByClassName(className);
	                }
	            };
	            // QSA and matchesSelector support
	            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	            rbuggyMatches = [];
	            // qSa(:focus) reports false when true (Chrome 21),
	            // no need to also add to buggyMatches since matches checks buggyQSA
	            // A support test would require too much code (would include document ready)
	            rbuggyQSA = [':focus'];
	            if (support.qsa = isNative(doc.querySelectorAll)) {
	                // Build QSA regex
	                // Regex strategy adopted from Diego Perini
	                assert(function (div) {
	                    // Select is set to empty string on purpose
	                    // This is to test IE's treatment of not explictly
	                    // setting a boolean content attribute,
	                    // since its presence should be enough
	                    // http://bugs.jquery.com/ticket/12359
	                    div.innerHTML = '<select><option selected=\'\'></option></select>';
	                    // IE8 - Some boolean attributes are not treated correctly
	                    if (!div.querySelectorAll('[selected]').length) {
	                        rbuggyQSA.push('\\[' + whitespace + '*(?:checked|disabled|ismap|multiple|readonly|selected|value)');
	                    }
	                    // Webkit/Opera - :checked should return selected option elements
	                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	                    // IE8 throws error here and will not see later tests
	                    if (!div.querySelectorAll(':checked').length) {
	                        rbuggyQSA.push(':checked');
	                    }
	                });
	                assert(function (div) {
	                    // Opera 10-12/IE8 - ^= $= *= and empty values
	                    // Should not select anything
	                    div.innerHTML = '<input type=\'hidden\' i=\'\'/>';
	                    if (div.querySelectorAll('[i^=\'\']').length) {
	                        rbuggyQSA.push('[*^$]=' + whitespace + '*(?:""|\'\')');
	                    }
	                    // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
	                    // IE8 throws error here and will not see later tests
	                    if (!div.querySelectorAll(':enabled').length) {
	                        rbuggyQSA.push(':enabled', ':disabled');
	                    }
	                    // Opera 10-11 does not throw on post-comma invalid pseudos
	                    div.querySelectorAll('*,:x');
	                    rbuggyQSA.push(',.*:');
	                });
	            }
	            if (support.matchesSelector = isNative(matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
	                assert(function (div) {
	                    // Check to see if it's possible to do matchesSelector
	                    // on a disconnected node (IE 9)
	                    support.disconnectedMatch = matches.call(div, 'div');
	                    // This should fail with an exception
	                    // Gecko does not error, returns false instead
	                    matches.call(div, '[s!=\'\']:x');
	                    rbuggyMatches.push('!=', pseudos);
	                });
	            }
	            rbuggyQSA = new RegExp(rbuggyQSA.join('|'));
	            rbuggyMatches = new RegExp(rbuggyMatches.join('|'));
	            // Element contains another
	            // Purposefully does not implement inclusive descendent
	            // As in, an element does not contain itself
	            contains = isNative(docElem.contains) || docElem.compareDocumentPosition ? function (a, b) {
	                var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
	                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
	            } : function (a, b) {
	                if (b) {
	                    while (b = b.parentNode) {
	                        if (b === a) {
	                            return true;
	                        }
	                    }
	                }
	                return false;
	            };
	            // Document order sorting
	            sortOrder = docElem.compareDocumentPosition ? function (a, b) {
	                var compare;
	                if (a === b) {
	                    hasDuplicate = true;
	                    return 0;
	                }
	                if (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) {
	                    if (compare & 1 || a.parentNode && a.parentNode.nodeType === 11) {
	                        if (a === doc || contains(preferredDoc, a)) {
	                            return -1;
	                        }
	                        if (b === doc || contains(preferredDoc, b)) {
	                            return 1;
	                        }
	                        return 0;
	                    }
	                    return compare & 4 ? -1 : 1;
	                }
	                return a.compareDocumentPosition ? -1 : 1;
	            } : function (a, b) {
	                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
	                // Exit early if the nodes are identical
	                if (a === b) {
	                    hasDuplicate = true;
	                    return 0;    // Parentless nodes are either documents or disconnected
	                } else if (!aup || !bup) {
	                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : 0;    // If the nodes are siblings, we can do a quick check
	                } else if (aup === bup) {
	                    return siblingCheck(a, b);
	                }
	                // Otherwise we need full lists of their ancestors for comparison
	                cur = a;
	                while (cur = cur.parentNode) {
	                    ap.unshift(cur);
	                }
	                cur = b;
	                while (cur = cur.parentNode) {
	                    bp.unshift(cur);
	                }
	                // Walk down the tree looking for a discrepancy
	                while (ap[i] === bp[i]) {
	                    i++;
	                }
	                return i ? // Do a sibling check if the nodes have a common ancestor
	                siblingCheck(ap[i], bp[i]) : // Otherwise nodes in our document sort first
	                ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
	            };
	            // Always assume the presence of duplicates if sort doesn't
	            // pass them to our comparison function (as in Google Chrome).
	            hasDuplicate = false;
	            [
	                0,
	                0
	            ].sort(sortOrder);
	            support.detectDuplicates = hasDuplicate;
	            return document;
	        };
	        Sizzle.matches = function (expr, elements) {
	            return Sizzle(expr, null, null, elements);
	        };
	        Sizzle.matchesSelector = function (elem, expr) {
	            // Set document vars if needed
	            if ((elem.ownerDocument || elem) !== document) {
	                setDocument(elem);
	            }
	            // Make sure that attribute selectors are quoted
	            expr = expr.replace(rattributeQuotes, '=\'$1\']');
	            // rbuggyQSA always contains :focus, so no need for an existence check
	            if (support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr)) {
	                try {
	                    var ret = matches.call(elem, expr);
	                    // IE 9's matchesSelector returns false on disconnected nodes
	                    if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
	                        // fragment in IE 9
	                        elem.document && elem.document.nodeType !== 11) {
	                        return ret;
	                    }
	                } catch (e) {
	                }
	            }
	            return Sizzle(expr, document, null, [elem]).length > 0;
	        };
	        Sizzle.contains = function (context, elem) {
	            // Set document vars if needed
	            if ((context.ownerDocument || context) !== document) {
	                setDocument(context);
	            }
	            return contains(context, elem);
	        };
	        Sizzle.attr = function (elem, name) {
	            var val;
	            // Set document vars if needed
	            if ((elem.ownerDocument || elem) !== document) {
	                setDocument(elem);
	            }
	            if (!documentIsXML) {
	                name = name.toLowerCase();
	            }
	            if (val = Expr.attrHandle[name]) {
	                return val(elem);
	            }
	            if (documentIsXML || support.attributes) {
	                return elem.getAttribute(name);
	            }
	            return ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && elem[name] === true ? name : val && val.specified ? val.value : null;
	        };
	        Sizzle.error = function (msg) {
	            throw new Error('Syntax error, unrecognized expression: ' + msg);
	        };
	        // Document sorting and removing duplicates
	        Sizzle.uniqueSort = function (results) {
	            var elem, duplicates = [], i = 1, j = 0;
	            // Unless we *know* we can detect duplicates, assume their presence
	            hasDuplicate = !support.detectDuplicates;
	            results.sort(sortOrder);
	            if (hasDuplicate) {
	                for (; elem = results[i]; i++) {
	                    if (elem === results[i - 1]) {
	                        j = duplicates.push(i);
	                    }
	                }
	                while (j--) {
	                    results.splice(duplicates[j], 1);
	                }
	            }
	            return results;
	        };
	        function siblingCheck(a, b) {
	            var cur = b && a, diff = cur && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
	            // Use IE sourceIndex if available on both nodes
	            if (diff) {
	                return diff;
	            }
	            // Check if b follows a
	            if (cur) {
	                while (cur = cur.nextSibling) {
	                    if (cur === b) {
	                        return -1;
	                    }
	                }
	            }
	            return a ? 1 : -1;
	        }
	        // Returns a function to use in pseudos for input types
	        function createInputPseudo(type) {
	            return function (elem) {
	                var name = elem.nodeName.toLowerCase();
	                return name === 'input' && elem.type === type;
	            };
	        }
	        // Returns a function to use in pseudos for buttons
	        function createButtonPseudo(type) {
	            return function (elem) {
	                var name = elem.nodeName.toLowerCase();
	                return (name === 'input' || name === 'button') && elem.type === type;
	            };
	        }
	        // Returns a function to use in pseudos for positionals
	        function createPositionalPseudo(fn) {
	            return markFunction(function (argument) {
	                argument = +argument;
	                return markFunction(function (seed, matches) {
	                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
	                    // Match elements found at the specified indexes
	                    while (i--) {
	                        if (seed[j = matchIndexes[i]]) {
	                            seed[j] = !(matches[j] = seed[j]);
	                        }
	                    }
	                });
	            });
	        }
	        /**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	        getText = Sizzle.getText = function (elem) {
	            var node, ret = '', i = 0, nodeType = elem.nodeType;
	            if (!nodeType) {
	                // If no nodeType, this is expected to be an array
	                for (; node = elem[i]; i++) {
	                    // Do not traverse comment nodes
	                    ret += getText(node);
	                }
	            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
	                // Use textContent for elements
	                // innerText usage removed for consistency of new lines (see #11153)
	                if (typeof elem.textContent === 'string') {
	                    return elem.textContent;
	                } else {
	                    // Traverse its children
	                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	                        ret += getText(elem);
	                    }
	                }
	            } else if (nodeType === 3 || nodeType === 4) {
	                return elem.nodeValue;
	            }
	            // Do not include comment or processing instruction nodes
	            return ret;
	        };
	        Expr = Sizzle.selectors = {
	            // Can be adjusted by the user
	            cacheLength: 50,
	            createPseudo: markFunction,
	            match: matchExpr,
	            find: {},
	            relative: {
	                '>': {
	                    dir: 'parentNode',
	                    first: true
	                },
	                ' ': { dir: 'parentNode' },
	                '+': {
	                    dir: 'previousSibling',
	                    first: true
	                },
	                '~': { dir: 'previousSibling' }
	            },
	            preFilter: {
	                'ATTR': function (match) {
	                    match[1] = match[1].replace(runescape, funescape);
	                    // Move the given value to match[3] whether quoted or unquoted
	                    match[3] = (match[4] || match[5] || '').replace(runescape, funescape);
	                    if (match[2] === '~=') {
	                        match[3] = ' ' + match[3] + ' ';
	                    }
	                    return match.slice(0, 4);
	                },
	                'CHILD': function (match) {
	                    /* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
	                    match[1] = match[1].toLowerCase();
	                    if (match[1].slice(0, 3) === 'nth') {
	                        // nth-* requires argument
	                        if (!match[3]) {
	                            Sizzle.error(match[0]);
	                        }
	                        // numeric x and y parameters for Expr.filter.CHILD
	                        // remember that false/true cast respectively to 0/1
	                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
	                        match[5] = +(match[7] + match[8] || match[3] === 'odd');    // other types prohibit arguments
	                    } else if (match[3]) {
	                        Sizzle.error(match[0]);
	                    }
	                    return match;
	                },
	                'PSEUDO': function (match) {
	                    var excess, unquoted = !match[5] && match[2];
	                    if (matchExpr['CHILD'].test(match[0])) {
	                        return null;
	                    }
	                    // Accept quoted arguments as-is
	                    if (match[4]) {
	                        match[2] = match[4];    // Strip excess characters from unquoted arguments
	                    } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
	                        // excess is a negative index
	                        match[0] = match[0].slice(0, excess);
	                        match[2] = unquoted.slice(0, excess);
	                    }
	                    // Return only captures needed by the pseudo filter method (type and argument)
	                    return match.slice(0, 3);
	                }
	            },
	            filter: {
	                'TAG': function (nodeName) {
	                    if (nodeName === '*') {
	                        return function () {
	                            return true;
	                        };
	                    }
	                    nodeName = nodeName.replace(runescape, funescape).toLowerCase();
	                    return function (elem) {
	                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
	                    };
	                },
	                'CLASS': function (className) {
	                    var pattern = classCache[className + ' '];
	                    return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
	                        return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute('class') || '');
	                    });
	                },
	                'ATTR': function (name, operator, check) {
	                    return function (elem) {
	                        var result = Sizzle.attr(elem, name);
	                        if (result == null) {
	                            return operator === '!=';
	                        }
	                        if (!operator) {
	                            return true;
	                        }
	                        result += '';
	                        return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.slice(-check.length) === check : operator === '~=' ? (' ' + result + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' : false;
	                    };
	                },
	                'CHILD': function (type, what, argument, first, last) {
	                    var simple = type.slice(0, 3) !== 'nth', forward = type.slice(-4) !== 'last', ofType = what === 'of-type';
	                    return first === 1 && last === 0 ? // Shortcut for :nth-*(n)
	                    function (elem) {
	                        return !!elem.parentNode;
	                    } : function (elem, context, xml) {
	                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? 'nextSibling' : 'previousSibling', parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
	                        if (parent) {
	                            // :(first|last|only)-(child|of-type)
	                            if (simple) {
	                                while (dir) {
	                                    node = elem;
	                                    while (node = node[dir]) {
	                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
	                                            return false;
	                                        }
	                                    }
	                                    // Reverse direction for :only-* (if we haven't yet done so)
	                                    start = dir = type === 'only' && !start && 'nextSibling';
	                                }
	                                return true;
	                            }
	                            start = [forward ? parent.firstChild : parent.lastChild];
	                            // non-xml :nth-child(...) stores cache data on `parent`
	                            if (forward && useCache) {
	                                // Seek `elem` from a previously-cached index
	                                outerCache = parent[expando] || (parent[expando] = {});
	                                cache = outerCache[type] || [];
	                                nodeIndex = cache[0] === dirruns && cache[1];
	                                diff = cache[0] === dirruns && cache[2];
	                                node = nodeIndex && parent.childNodes[nodeIndex];
	                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
	                                    // When found, cache indexes on `parent` and break
	                                    if (node.nodeType === 1 && ++diff && node === elem) {
	                                        outerCache[type] = [
	                                            dirruns,
	                                            nodeIndex,
	                                            diff
	                                        ];
	                                        break;
	                                    }
	                                }    // Use previously-cached element index if available
	                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
	                                diff = cache[1];    // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
	                            } else {
	                                // Use the same loop as above to seek `elem` from the start
	                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
	                                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
	                                        // Cache the index of each encountered element
	                                        if (useCache) {
	                                            (node[expando] || (node[expando] = {}))[type] = [
	                                                dirruns,
	                                                diff
	                                            ];
	                                        }
	                                        if (node === elem) {
	                                            break;
	                                        }
	                                    }
	                                }
	                            }
	                            // Incorporate the offset, then check against cycle size
	                            diff -= last;
	                            return diff === first || diff % first === 0 && diff / first >= 0;
	                        }
	                    };
	                },
	                'PSEUDO': function (pseudo, argument) {
	                    // pseudo-class names are case-insensitive
	                    // http://www.w3.org/TR/selectors/#pseudo-classes
	                    // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
	                    // Remember that setFilters inherits from pseudos
	                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
	                    // The user may use createPseudo to indicate that
	                    // arguments are needed to create the filter function
	                    // just as Sizzle does
	                    if (fn[expando]) {
	                        return fn(argument);
	                    }
	                    // But maintain support for old signatures
	                    if (fn.length > 1) {
	                        args = [
	                            pseudo,
	                            pseudo,
	                            '',
	                            argument
	                        ];
	                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
	                            var idx, matched = fn(seed, argument), i = matched.length;
	                            while (i--) {
	                                idx = indexOf.call(seed, matched[i]);
	                                seed[idx] = !(matches[idx] = matched[i]);
	                            }
	                        }) : function (elem) {
	                            return fn(elem, 0, args);
	                        };
	                    }
	                    return fn;
	                }
	            },
	            pseudos: {
	                // Potentially complex pseudos
	                'not': markFunction(function (selector) {
	                    // Trim the selector passed to compile
	                    // to avoid treating leading and trailing
	                    // spaces as combinators
	                    var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
	                    return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
	                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
	                        // Match elements unmatched by `matcher`
	                        while (i--) {
	                            if (elem = unmatched[i]) {
	                                seed[i] = !(matches[i] = elem);
	                            }
	                        }
	                    }) : function (elem, context, xml) {
	                        input[0] = elem;
	                        matcher(input, null, xml, results);
	                        return !results.pop();
	                    };
	                }),
	                'has': markFunction(function (selector) {
	                    return function (elem) {
	                        return Sizzle(selector, elem).length > 0;
	                    };
	                }),
	                'contains': markFunction(function (text) {
	                    return function (elem) {
	                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
	                    };
	                }),
	                // "Whether an element is represented by a :lang() selector
	                // is based solely on the element's language value
	                // being equal to the identifier C,
	                // or beginning with the identifier C immediately followed by "-".
	                // The matching of C against the element's language value is performed case-insensitively.
	                // The identifier C does not have to be a valid language name."
	                // http://www.w3.org/TR/selectors/#lang-pseudo
	                'lang': markFunction(function (lang) {
	                    // lang value must be a valid identifider
	                    if (!ridentifier.test(lang || '')) {
	                        Sizzle.error('unsupported lang: ' + lang);
	                    }
	                    lang = lang.replace(runescape, funescape).toLowerCase();
	                    return function (elem) {
	                        var elemLang;
	                        do {
	                            if (elemLang = documentIsXML ? elem.getAttribute('xml:lang') || elem.getAttribute('lang') : elem.lang) {
	                                elemLang = elemLang.toLowerCase();
	                                return elemLang === lang || elemLang.indexOf(lang + '-') === 0;
	                            }
	                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
	                        return false;
	                    };
	                }),
	                // Miscellaneous
	                'target': function (elem) {
	                    var hash = window.location && window.location.hash;
	                    return hash && hash.slice(1) === elem.id;
	                },
	                'root': function (elem) {
	                    return elem === docElem;
	                },
	                'focus': function (elem) {
	                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
	                },
	                // Boolean properties
	                'enabled': function (elem) {
	                    return elem.disabled === false;
	                },
	                'disabled': function (elem) {
	                    return elem.disabled === true;
	                },
	                'checked': function (elem) {
	                    // In CSS3, :checked should return both checked and selected elements
	                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	                    var nodeName = elem.nodeName.toLowerCase();
	                    return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
	                },
	                'selected': function (elem) {
	                    // Accessing this property makes selected-by-default
	                    // options in Safari work properly
	                    if (elem.parentNode) {
	                        elem.parentNode.selectedIndex;
	                    }
	                    return elem.selected === true;
	                },
	                // Contents
	                'empty': function (elem) {
	                    // http://www.w3.org/TR/selectors/#empty-pseudo
	                    // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
	                    //   not comment, processing instructions, or others
	                    // Thanks to Diego Perini for the nodeName shortcut
	                    //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
	                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	                        if (elem.nodeName > '@' || elem.nodeType === 3 || elem.nodeType === 4) {
	                            return false;
	                        }
	                    }
	                    return true;
	                },
	                'parent': function (elem) {
	                    return !Expr.pseudos['empty'](elem);
	                },
	                // Element/input types
	                'header': function (elem) {
	                    return rheader.test(elem.nodeName);
	                },
	                'input': function (elem) {
	                    return rinputs.test(elem.nodeName);
	                },
	                'button': function (elem) {
	                    var name = elem.nodeName.toLowerCase();
	                    return name === 'input' && elem.type === 'button' || name === 'button';
	                },
	                'text': function (elem) {
	                    var attr;
	                    // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
	                    // use getAttribute instead to test this case
	                    return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === elem.type);
	                },
	                // Position-in-collection
	                'first': createPositionalPseudo(function () {
	                    return [0];
	                }),
	                'last': createPositionalPseudo(function (matchIndexes, length) {
	                    return [length - 1];
	                }),
	                'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
	                    return [argument < 0 ? argument + length : argument];
	                }),
	                'even': createPositionalPseudo(function (matchIndexes, length) {
	                    var i = 0;
	                    for (; i < length; i += 2) {
	                        matchIndexes.push(i);
	                    }
	                    return matchIndexes;
	                }),
	                'odd': createPositionalPseudo(function (matchIndexes, length) {
	                    var i = 1;
	                    for (; i < length; i += 2) {
	                        matchIndexes.push(i);
	                    }
	                    return matchIndexes;
	                }),
	                'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
	                    var i = argument < 0 ? argument + length : argument;
	                    for (; --i >= 0;) {
	                        matchIndexes.push(i);
	                    }
	                    return matchIndexes;
	                }),
	                'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
	                    var i = argument < 0 ? argument + length : argument;
	                    for (; ++i < length;) {
	                        matchIndexes.push(i);
	                    }
	                    return matchIndexes;
	                })
	            }
	        };
	        // Add button/input type pseudos
	        for (i in {
	                radio: true,
	                checkbox: true,
	                file: true,
	                password: true,
	                image: true
	            }) {
	            Expr.pseudos[i] = createInputPseudo(i);
	        }
	        for (i in {
	                submit: true,
	                reset: true
	            }) {
	            Expr.pseudos[i] = createButtonPseudo(i);
	        }
	        function tokenize(selector, parseOnly) {
	            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + ' '];
	            if (cached) {
	                return parseOnly ? 0 : cached.slice(0);
	            }
	            soFar = selector;
	            groups = [];
	            preFilters = Expr.preFilter;
	            while (soFar) {
	                // Comma and first run
	                if (!matched || (match = rcomma.exec(soFar))) {
	                    if (match) {
	                        // Don't consume trailing commas as valid
	                        soFar = soFar.slice(match[0].length) || soFar;
	                    }
	                    groups.push(tokens = []);
	                }
	                matched = false;
	                // Combinators
	                if (match = rcombinators.exec(soFar)) {
	                    matched = match.shift();
	                    tokens.push({
	                        value: matched,
	                        // Cast descendant combinators to space
	                        type: match[0].replace(rtrim, ' ')
	                    });
	                    soFar = soFar.slice(matched.length);
	                }
	                // Filters
	                for (type in Expr.filter) {
	                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
	                        matched = match.shift();
	                        tokens.push({
	                            value: matched,
	                            type: type,
	                            matches: match
	                        });
	                        soFar = soFar.slice(matched.length);
	                    }
	                }
	                if (!matched) {
	                    break;
	                }
	            }
	            // Return the length of the invalid excess
	            // if we're just parsing
	            // Otherwise, throw an error or return tokens
	            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
	            tokenCache(selector, groups).slice(0);
	        }
	        function toSelector(tokens) {
	            var i = 0, len = tokens.length, selector = '';
	            for (; i < len; i++) {
	                selector += tokens[i].value;
	            }
	            return selector;
	        }
	        function addCombinator(matcher, combinator, base) {
	            var dir = combinator.dir, checkNonElements = base && dir === 'parentNode', doneName = done++;
	            return combinator.first ? // Check against closest ancestor/preceding element
	            function (elem, context, xml) {
	                while (elem = elem[dir]) {
	                    if (elem.nodeType === 1 || checkNonElements) {
	                        return matcher(elem, context, xml);
	                    }
	                }
	            } : // Check against all ancestor/preceding elements
	            function (elem, context, xml) {
	                var data, cache, outerCache, dirkey = dirruns + ' ' + doneName;
	                // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
	                if (xml) {
	                    while (elem = elem[dir]) {
	                        if (elem.nodeType === 1 || checkNonElements) {
	                            if (matcher(elem, context, xml)) {
	                                return true;
	                            }
	                        }
	                    }
	                } else {
	                    while (elem = elem[dir]) {
	                        if (elem.nodeType === 1 || checkNonElements) {
	                            outerCache = elem[expando] || (elem[expando] = {});
	                            if ((cache = outerCache[dir]) && cache[0] === dirkey) {
	                                if ((data = cache[1]) === true || data === cachedruns) {
	                                    return data === true;
	                                }
	                            } else {
	                                cache = outerCache[dir] = [dirkey];
	                                cache[1] = matcher(elem, context, xml) || cachedruns;
	                                if (cache[1] === true) {
	                                    return true;
	                                }
	                            }
	                        }
	                    }
	                }
	            };
	        }
	        function elementMatcher(matchers) {
	            return matchers.length > 1 ? function (elem, context, xml) {
	                var i = matchers.length;
	                while (i--) {
	                    if (!matchers[i](elem, context, xml)) {
	                        return false;
	                    }
	                }
	                return true;
	            } : matchers[0];
	        }
	        function condense(unmatched, map, filter, context, xml) {
	            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
	            for (; i < len; i++) {
	                if (elem = unmatched[i]) {
	                    if (!filter || filter(elem, context, xml)) {
	                        newUnmatched.push(elem);
	                        if (mapped) {
	                            map.push(i);
	                        }
	                    }
	                }
	            }
	            return newUnmatched;
	        }
	        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	            if (postFilter && !postFilter[expando]) {
	                postFilter = setMatcher(postFilter);
	            }
	            if (postFinder && !postFinder[expando]) {
	                postFinder = setMatcher(postFinder, postSelector);
	            }
	            return markFunction(function (seed, results, context, xml) {
	                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length,
	                    // Get initial elements from seed or context
	                    elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []),
	                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
	                    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
	                    postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
	                    [] : // ...otherwise use results directly
	                    results : matcherIn;
	                // Find primary matches
	                if (matcher) {
	                    matcher(matcherIn, matcherOut, context, xml);
	                }
	                // Apply postFilter
	                if (postFilter) {
	                    temp = condense(matcherOut, postMap);
	                    postFilter(temp, [], context, xml);
	                    // Un-match failing elements by moving them back to matcherIn
	                    i = temp.length;
	                    while (i--) {
	                        if (elem = temp[i]) {
	                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
	                        }
	                    }
	                }
	                if (seed) {
	                    if (postFinder || preFilter) {
	                        if (postFinder) {
	                            // Get the final matcherOut by condensing this intermediate into postFinder contexts
	                            temp = [];
	                            i = matcherOut.length;
	                            while (i--) {
	                                if (elem = matcherOut[i]) {
	                                    // Restore matcherIn since elem is not yet a final match
	                                    temp.push(matcherIn[i] = elem);
	                                }
	                            }
	                            postFinder(null, matcherOut = [], temp, xml);
	                        }
	                        // Move matched elements from seed to results to keep them synchronized
	                        i = matcherOut.length;
	                        while (i--) {
	                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
	                                seed[temp] = !(results[temp] = elem);
	                            }
	                        }
	                    }    // Add elements to results, through postFinder if defined
	                } else {
	                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
	                    if (postFinder) {
	                        postFinder(null, results, matcherOut, xml);
	                    } else {
	                        push.apply(results, matcherOut);
	                    }
	                }
	            });
	        }
	        function matcherFromTokens(tokens) {
	            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0,
	                // The foundational matcher ensures that elements are reachable from top-level context(s)
	                matchContext = addCombinator(function (elem) {
	                    return elem === checkContext;
	                }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
	                    return indexOf.call(checkContext, elem) > -1;
	                }, implicitRelative, true), matchers = [function (elem, context, xml) {
	                        return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
	                    }];
	            for (; i < len; i++) {
	                if (matcher = Expr.relative[tokens[i].type]) {
	                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
	                } else {
	                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
	                    // Return special upon seeing a positional matcher
	                    if (matcher[expando]) {
	                        // Find the next relative operator (if any) for proper handling
	                        j = ++i;
	                        for (; j < len; j++) {
	                            if (Expr.relative[tokens[j].type]) {
	                                break;
	                            }
	                        }
	                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1)).replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
	                    }
	                    matchers.push(matcher);
	                }
	            }
	            return elementMatcher(matchers);
	        }
	        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
	            // A counter to specify which element is currently being matched
	            var matcherCachedRuns = 0, bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, expandContext) {
	                    var elem, j, matcher, setMatched = [], matchedCount = 0, i = '0', unmatched = seed && [], outermost = expandContext != null, contextBackup = outermostContext,
	                        // We must always have either seed elements or context
	                        elems = seed || byElement && Expr.find['TAG']('*', expandContext && context.parentNode || context),
	                        // Use integer dirruns iff this is the outermost matcher
	                        dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1;
	                    if (outermost) {
	                        outermostContext = context !== document && context;
	                        cachedruns = matcherCachedRuns;
	                    }
	                    // Add elements passing elementMatchers directly to results
	                    // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
	                    for (; (elem = elems[i]) != null; i++) {
	                        if (byElement && elem) {
	                            j = 0;
	                            while (matcher = elementMatchers[j++]) {
	                                if (matcher(elem, context, xml)) {
	                                    results.push(elem);
	                                    break;
	                                }
	                            }
	                            if (outermost) {
	                                dirruns = dirrunsUnique;
	                                cachedruns = ++matcherCachedRuns;
	                            }
	                        }
	                        // Track unmatched elements for set filters
	                        if (bySet) {
	                            // They will have gone through all possible matchers
	                            if (elem = !matcher && elem) {
	                                matchedCount--;
	                            }
	                            // Lengthen the array for every element, matched or not
	                            if (seed) {
	                                unmatched.push(elem);
	                            }
	                        }
	                    }
	                    // Apply set filters to unmatched elements
	                    matchedCount += i;
	                    if (bySet && i !== matchedCount) {
	                        j = 0;
	                        while (matcher = setMatchers[j++]) {
	                            matcher(unmatched, setMatched, context, xml);
	                        }
	                        if (seed) {
	                            // Reintegrate element matches to eliminate the need for sorting
	                            if (matchedCount > 0) {
	                                while (i--) {
	                                    if (!(unmatched[i] || setMatched[i])) {
	                                        setMatched[i] = pop.call(results);
	                                    }
	                                }
	                            }
	                            // Discard index placeholder values to get only actual matches
	                            setMatched = condense(setMatched);
	                        }
	                        // Add matches to results
	                        push.apply(results, setMatched);
	                        // Seedless set matches succeeding multiple successful matchers stipulate sorting
	                        if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
	                            Sizzle.uniqueSort(results);
	                        }
	                    }
	                    // Override manipulation of globals by nested matchers
	                    if (outermost) {
	                        dirruns = dirrunsUnique;
	                        outermostContext = contextBackup;
	                    }
	                    return unmatched;
	                };
	            return bySet ? markFunction(superMatcher) : superMatcher;
	        }
	        compile = Sizzle.compile = function (selector, group) {
	            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + ' '];
	            if (!cached) {
	                // Generate a function of recursive functions that can be used to check each element
	                if (!group) {
	                    group = tokenize(selector);
	                }
	                i = group.length;
	                while (i--) {
	                    cached = matcherFromTokens(group[i]);
	                    if (cached[expando]) {
	                        setMatchers.push(cached);
	                    } else {
	                        elementMatchers.push(cached);
	                    }
	                }
	                // Cache the compiled function
	                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
	            }
	            return cached;
	        };
	        function multipleContexts(selector, contexts, results) {
	            var i = 0, len = contexts.length;
	            for (; i < len; i++) {
	                Sizzle(selector, contexts[i], results);
	            }
	            return results;
	        }
	        function select(selector, context, results, seed) {
	            var i, tokens, token, type, find, match = tokenize(selector);
	            if (!seed) {
	                // Try to minimize operations if there is only one group
	                if (match.length === 1) {
	                    // Take a shortcut and set the context if the root selector is an ID
	                    tokens = match[0] = match[0].slice(0);
	                    if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && context.nodeType === 9 && !documentIsXML && Expr.relative[tokens[1].type]) {
	                        context = Expr.find['ID'](token.matches[0].replace(runescape, funescape), context)[0];
	                        if (!context) {
	                            return results;
	                        }
	                        selector = selector.slice(tokens.shift().value.length);
	                    }
	                    // Fetch a seed set for right-to-left matching
	                    i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
	                    while (i--) {
	                        token = tokens[i];
	                        // Abort if we hit a combinator
	                        if (Expr.relative[type = token.type]) {
	                            break;
	                        }
	                        if (find = Expr.find[type]) {
	                            // Search, expanding context for leading sibling combinators
	                            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context)) {
	                                // If seed is empty or no tokens remain, we can return early
	                                tokens.splice(i, 1);
	                                selector = seed.length && toSelector(tokens);
	                                if (!selector) {
	                                    push.apply(results, slice.call(seed, 0));
	                                    return results;
	                                }
	                                break;
	                            }
	                        }
	                    }
	                }
	            }
	            // Compile and execute a filtering function
	            // Provide `match` to avoid retokenization if we modified the selector above
	            compile(selector, match)(seed, context, documentIsXML, results, rsibling.test(selector));
	            return results;
	        }
	        // Deprecated
	        Expr.pseudos['nth'] = Expr.pseudos['eq'];
	        // Easy API for creating new setFilters
	        function setFilters() {
	        }
	        Expr.filters = setFilters.prototype = Expr.pseudos;
	        Expr.setFilters = new setFilters();
	        // Initialize with the default document
	        setDocument();
	        // Override sizzle attribute retrieval
	        Sizzle.attr = jQuery.attr;
	        jQuery.find = Sizzle;
	        jQuery.expr = Sizzle.selectors;
	        jQuery.expr[':'] = jQuery.expr.pseudos;
	        jQuery.unique = Sizzle.uniqueSort;
	        jQuery.text = Sizzle.getText;
	        jQuery.isXMLDoc = Sizzle.isXML;
	        jQuery.contains = Sizzle.contains;
	    }(window));
	    var runtil = /Until$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, isSimple = /^.[^:#\[\.,]*$/, rneedsContext = jQuery.expr.match.needsContext,
	        // methods guaranteed to produce a unique set when starting from a unique set
	        guaranteedUnique = {
	            children: true,
	            contents: true,
	            next: true,
	            prev: true
	        };
	    jQuery.fn.extend({
	        find: function (selector) {
	            var i, ret, self, len = this.length;
	            if (typeof selector !== 'string') {
	                self = this;
	                return this.pushStack(jQuery(selector).filter(function () {
	                    for (i = 0; i < len; i++) {
	                        if (jQuery.contains(self[i], this)) {
	                            return true;
	                        }
	                    }
	                }));
	            }
	            ret = [];
	            for (i = 0; i < len; i++) {
	                jQuery.find(selector, this[i], ret);
	            }
	            // Needed because $( selector, context ) becomes $( context ).find( selector )
	            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
	            ret.selector = (this.selector ? this.selector + ' ' : '') + selector;
	            return ret;
	        },
	        has: function (target) {
	            var i, targets = jQuery(target, this), len = targets.length;
	            return this.filter(function () {
	                for (i = 0; i < len; i++) {
	                    if (jQuery.contains(this, targets[i])) {
	                        return true;
	                    }
	                }
	            });
	        },
	        not: function (selector) {
	            return this.pushStack(winnow(this, selector, false));
	        },
	        filter: function (selector) {
	            return this.pushStack(winnow(this, selector, true));
	        },
	        is: function (selector) {
	            return !!selector && (typeof selector === 'string' ? // If this is a positional/relative selector, check membership in the returned set
	            // so $("p:first").is("p:last") won't return true for a doc with two "p".
	            rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
	        },
	        closest: function (selectors, context) {
	            var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || typeof selectors !== 'string' ? jQuery(selectors, context || this.context) : 0;
	            for (; i < l; i++) {
	                cur = this[i];
	                while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
	                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
	                        ret.push(cur);
	                        break;
	                    }
	                    cur = cur.parentNode;
	                }
	            }
	            return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
	        },
	        // Determine the position of an element within
	        // the matched set of elements
	        index: function (elem) {
	            // No argument, return index in parent
	            if (!elem) {
	                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
	            }
	            // index in selector
	            if (typeof elem === 'string') {
	                return jQuery.inArray(this[0], jQuery(elem));
	            }
	            // Locate the position of the desired element
	            return jQuery.inArray(// If it receives a jQuery object, the first element is used
	            elem.jquery ? elem[0] : elem, this);
	        },
	        add: function (selector, context) {
	            var set = typeof selector === 'string' ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector), all = jQuery.merge(this.get(), set);
	            return this.pushStack(jQuery.unique(all));
	        },
	        addBack: function (selector) {
	            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
	        }
	    });
	    jQuery.fn.andSelf = jQuery.fn.addBack;
	    function sibling(cur, dir) {
	        do {
	            cur = cur[dir];
	        } while (cur && cur.nodeType !== 1);
	        return cur;
	    }
	    jQuery.each({
	        parent: function (elem) {
	            var parent = elem.parentNode;
	            return parent && parent.nodeType !== 11 ? parent : null;
	        },
	        parents: function (elem) {
	            return jQuery.dir(elem, 'parentNode');
	        },
	        parentsUntil: function (elem, i, until) {
	            return jQuery.dir(elem, 'parentNode', until);
	        },
	        next: function (elem) {
	            return sibling(elem, 'nextSibling');
	        },
	        prev: function (elem) {
	            return sibling(elem, 'previousSibling');
	        },
	        nextAll: function (elem) {
	            return jQuery.dir(elem, 'nextSibling');
	        },
	        prevAll: function (elem) {
	            return jQuery.dir(elem, 'previousSibling');
	        },
	        nextUntil: function (elem, i, until) {
	            return jQuery.dir(elem, 'nextSibling', until);
	        },
	        prevUntil: function (elem, i, until) {
	            return jQuery.dir(elem, 'previousSibling', until);
	        },
	        siblings: function (elem) {
	            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
	        },
	        children: function (elem) {
	            return jQuery.sibling(elem.firstChild);
	        },
	        contents: function (elem) {
	            return jQuery.nodeName(elem, 'iframe') ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
	        }
	    }, function (name, fn) {
	        jQuery.fn[name] = function (until, selector) {
	            var ret = jQuery.map(this, fn, until);
	            if (!runtil.test(name)) {
	                selector = until;
	            }
	            if (selector && typeof selector === 'string') {
	                ret = jQuery.filter(selector, ret);
	            }
	            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
	            if (this.length > 1 && rparentsprev.test(name)) {
	                ret = ret.reverse();
	            }
	            return this.pushStack(ret);
	        };
	    });
	    jQuery.extend({
	        filter: function (expr, elems, not) {
	            if (not) {
	                expr = ':not(' + expr + ')';
	            }
	            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
	        },
	        dir: function (elem, dir, until) {
	            var matched = [], cur = elem[dir];
	            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
	                if (cur.nodeType === 1) {
	                    matched.push(cur);
	                }
	                cur = cur[dir];
	            }
	            return matched;
	        },
	        sibling: function (n, elem) {
	            var r = [];
	            for (; n; n = n.nextSibling) {
	                if (n.nodeType === 1 && n !== elem) {
	                    r.push(n);
	                }
	            }
	            return r;
	        }
	    });
	    // Implement the identical functionality for filter and not
	    function winnow(elements, qualifier, keep) {
	        // Can't pass null or undefined to indexOf in Firefox 4
	        // Set to 0 to skip string check
	        qualifier = qualifier || 0;
	        if (jQuery.isFunction(qualifier)) {
	            return jQuery.grep(elements, function (elem, i) {
	                var retVal = !!qualifier.call(elem, i, elem);
	                return retVal === keep;
	            });
	        } else if (qualifier.nodeType) {
	            return jQuery.grep(elements, function (elem) {
	                return elem === qualifier === keep;
	            });
	        } else if (typeof qualifier === 'string') {
	            var filtered = jQuery.grep(elements, function (elem) {
	                return elem.nodeType === 1;
	            });
	            if (isSimple.test(qualifier)) {
	                return jQuery.filter(qualifier, filtered, !keep);
	            } else {
	                qualifier = jQuery.filter(qualifier, filtered);
	            }
	        }
	        return jQuery.grep(elements, function (elem) {
	            return jQuery.inArray(elem, qualifier) >= 0 === keep;
	        });
	    }
	    function createSafeFragment(document) {
	        var list = nodeNames.split('|'), safeFrag = document.createDocumentFragment();
	        if (safeFrag.createElement) {
	            while (list.length) {
	                safeFrag.createElement(list.pop());
	            }
	        }
	        return safeFrag;
	    }
	    var nodeNames = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|' + 'header|hgroup|mark|meter|nav|output|progress|section|summary|time|video', rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp('<(?:' + nodeNames + ')[\\s/>]', 'i'), rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	        // checked="checked" or checked
	        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	        // We have to close these tags to support XHTML (#13200)
	        wrapMap = {
	            option: [
	                1,
	                '<select multiple=\'multiple\'>',
	                '</select>'
	            ],
	            legend: [
	                1,
	                '<fieldset>',
	                '</fieldset>'
	            ],
	            area: [
	                1,
	                '<map>',
	                '</map>'
	            ],
	            param: [
	                1,
	                '<object>',
	                '</object>'
	            ],
	            thead: [
	                1,
	                '<table>',
	                '</table>'
	            ],
	            tr: [
	                2,
	                '<table><tbody>',
	                '</tbody></table>'
	            ],
	            col: [
	                2,
	                '<table><tbody></tbody><colgroup>',
	                '</colgroup></table>'
	            ],
	            td: [
	                3,
	                '<table><tbody><tr>',
	                '</tr></tbody></table>'
	            ],
	            // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	            // unless wrapped in a div with non-breaking characters in front of it.
	            _default: jQuery.support.htmlSerialize ? [
	                0,
	                '',
	                ''
	            ] : [
	                1,
	                'X<div>',
	                '</div>'
	            ]
	        }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement('div'));
	    wrapMap.optgroup = wrapMap.option;
	    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	    wrapMap.th = wrapMap.td;
	    jQuery.fn.extend({
	        text: function (value) {
	            return jQuery.access(this, function (value) {
	                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
	            }, null, value, arguments.length);
	        },
	        wrapAll: function (html) {
	            if (jQuery.isFunction(html)) {
	                return this.each(function (i) {
	                    jQuery(this).wrapAll(html.call(this, i));
	                });
	            }
	            if (this[0]) {
	                // The elements to wrap the target around
	                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
	                if (this[0].parentNode) {
	                    wrap.insertBefore(this[0]);
	                }
	                wrap.map(function () {
	                    var elem = this;
	                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
	                        elem = elem.firstChild;
	                    }
	                    return elem;
	                }).append(this);
	            }
	            return this;
	        },
	        wrapInner: function (html) {
	            if (jQuery.isFunction(html)) {
	                return this.each(function (i) {
	                    jQuery(this).wrapInner(html.call(this, i));
	                });
	            }
	            return this.each(function () {
	                var self = jQuery(this), contents = self.contents();
	                if (contents.length) {
	                    contents.wrapAll(html);
	                } else {
	                    self.append(html);
	                }
	            });
	        },
	        wrap: function (html) {
	            var isFunction = jQuery.isFunction(html);
	            return this.each(function (i) {
	                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
	            });
	        },
	        unwrap: function () {
	            return this.parent().each(function () {
	                if (!jQuery.nodeName(this, 'body')) {
	                    jQuery(this).replaceWith(this.childNodes);
	                }
	            }).end();
	        },
	        append: function () {
	            return this.domManip(arguments, true, function (elem) {
	                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	                    this.appendChild(elem);
	                }
	            });
	        },
	        prepend: function () {
	            return this.domManip(arguments, true, function (elem) {
	                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	                    this.insertBefore(elem, this.firstChild);
	                }
	            });
	        },
	        before: function () {
	            return this.domManip(arguments, false, function (elem) {
	                if (this.parentNode) {
	                    this.parentNode.insertBefore(elem, this);
	                }
	            });
	        },
	        after: function () {
	            return this.domManip(arguments, false, function (elem) {
	                if (this.parentNode) {
	                    this.parentNode.insertBefore(elem, this.nextSibling);
	                }
	            });
	        },
	        // keepData is for internal use only--do not document
	        remove: function (selector, keepData) {
	            var elem, i = 0;
	            for (; (elem = this[i]) != null; i++) {
	                if (!selector || jQuery.filter(selector, [elem]).length > 0) {
	                    if (!keepData && elem.nodeType === 1) {
	                        jQuery.cleanData(getAll(elem));
	                    }
	                    if (elem.parentNode) {
	                        if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
	                            setGlobalEval(getAll(elem, 'script'));
	                        }
	                        elem.parentNode.removeChild(elem);
	                    }
	                }
	            }
	            return this;
	        },
	        empty: function () {
	            var elem, i = 0;
	            for (; (elem = this[i]) != null; i++) {
	                // Remove element nodes and prevent memory leaks
	                if (elem.nodeType === 1) {
	                    jQuery.cleanData(getAll(elem, false));
	                }
	                // Remove any remaining nodes
	                while (elem.firstChild) {
	                    elem.removeChild(elem.firstChild);
	                }
	                // If this is a select, ensure that it displays empty (#12336)
	                // Support: IE<9
	                if (elem.options && jQuery.nodeName(elem, 'select')) {
	                    elem.options.length = 0;
	                }
	            }
	            return this;
	        },
	        clone: function (dataAndEvents, deepDataAndEvents) {
	            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
	            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	            return this.map(function () {
	                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
	            });
	        },
	        html: function (value) {
	            return jQuery.access(this, function (value) {
	                var elem = this[0] || {}, i = 0, l = this.length;
	                if (value === undefined) {
	                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, '') : undefined;
	                }
	                // See if we can take a shortcut and just use innerHTML
	                if (typeof value === 'string' && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [
	                        '',
	                        ''
	                    ])[1].toLowerCase()]) {
	                    value = value.replace(rxhtmlTag, '<$1></$2>');
	                    try {
	                        for (; i < l; i++) {
	                            // Remove element nodes and prevent memory leaks
	                            elem = this[i] || {};
	                            if (elem.nodeType === 1) {
	                                jQuery.cleanData(getAll(elem, false));
	                                elem.innerHTML = value;
	                            }
	                        }
	                        elem = 0;    // If using innerHTML throws an exception, use the fallback method
	                    } catch (e) {
	                    }
	                }
	                if (elem) {
	                    this.empty().append(value);
	                }
	            }, null, value, arguments.length);
	        },
	        replaceWith: function (value) {
	            var isFunc = jQuery.isFunction(value);
	            // Make sure that the elements are removed from the DOM before they are inserted
	            // this can help fix replacing a parent with child elements
	            if (!isFunc && typeof value !== 'string') {
	                value = jQuery(value).not(this).detach();
	            }
	            return this.domManip([value], true, function (elem) {
	                var next = this.nextSibling, parent = this.parentNode;
	                if (parent) {
	                    jQuery(this).remove();
	                    parent.insertBefore(elem, next);
	                }
	            });
	        },
	        detach: function (selector) {
	            return this.remove(selector, true);
	        },
	        domManip: function (args, table, callback) {
	            // Flatten any nested arrays
	            args = core_concat.apply([], args);
	            var first, node, hasScripts, scripts, doc, fragment, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
	            // We can't cloneNode fragments that contain checked, in WebKit
	            if (isFunction || !(l <= 1 || typeof value !== 'string' || jQuery.support.checkClone || !rchecked.test(value))) {
	                return this.each(function (index) {
	                    var self = set.eq(index);
	                    if (isFunction) {
	                        args[0] = value.call(this, index, table ? self.html() : undefined);
	                    }
	                    self.domManip(args, table, callback);
	                });
	            }
	            if (l) {
	                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
	                first = fragment.firstChild;
	                if (fragment.childNodes.length === 1) {
	                    fragment = first;
	                }
	                if (first) {
	                    table = table && jQuery.nodeName(first, 'tr');
	                    scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
	                    hasScripts = scripts.length;
	                    // Use the original fragment for the last item instead of the first because it can end up
	                    // being emptied incorrectly in certain situations (#8070).
	                    for (; i < l; i++) {
	                        node = fragment;
	                        if (i !== iNoClone) {
	                            node = jQuery.clone(node, true, true);
	                            // Keep references to cloned scripts for later restoration
	                            if (hasScripts) {
	                                jQuery.merge(scripts, getAll(node, 'script'));
	                            }
	                        }
	                        callback.call(table && jQuery.nodeName(this[i], 'table') ? findOrAppend(this[i], 'tbody') : this[i], node, i);
	                    }
	                    if (hasScripts) {
	                        doc = scripts[scripts.length - 1].ownerDocument;
	                        // Reenable scripts
	                        jQuery.map(scripts, restoreScript);
	                        // Evaluate executable scripts on first document insertion
	                        for (i = 0; i < hasScripts; i++) {
	                            node = scripts[i];
	                            if (rscriptType.test(node.type || '') && !jQuery._data(node, 'globalEval') && jQuery.contains(doc, node)) {
	                                if (node.src) {
	                                    // Hope ajax is available...
	                                    jQuery.ajax({
	                                        url: node.src,
	                                        type: 'GET',
	                                        dataType: 'script',
	                                        async: false,
	                                        global: false,
	                                        'throws': true
	                                    });
	                                } else {
	                                    jQuery.globalEval((node.text || node.textContent || node.innerHTML || '').replace(rcleanScript, ''));
	                                }
	                            }
	                        }
	                    }
	                    // Fix #11809: Avoid leaking memory
	                    fragment = first = null;
	                }
	            }
	            return this;
	        }
	    });
	    function findOrAppend(elem, tag) {
	        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
	    }
	    // Replace/restore the type attribute of script elements for safe DOM manipulation
	    function disableScript(elem) {
	        var attr = elem.getAttributeNode('type');
	        elem.type = (attr && attr.specified) + '/' + elem.type;
	        return elem;
	    }
	    function restoreScript(elem) {
	        var match = rscriptTypeMasked.exec(elem.type);
	        if (match) {
	            elem.type = match[1];
	        } else {
	            elem.removeAttribute('type');
	        }
	        return elem;
	    }
	    // Mark scripts as having already been evaluated
	    function setGlobalEval(elems, refElements) {
	        var elem, i = 0;
	        for (; (elem = elems[i]) != null; i++) {
	            jQuery._data(elem, 'globalEval', !refElements || jQuery._data(refElements[i], 'globalEval'));
	        }
	    }
	    function cloneCopyEvent(src, dest) {
	        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
	            return;
	        }
	        var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
	        if (events) {
	            delete curData.handle;
	            curData.events = {};
	            for (type in events) {
	                for (i = 0, l = events[type].length; i < l; i++) {
	                    jQuery.event.add(dest, type, events[type][i]);
	                }
	            }
	        }
	        // make the cloned public data object a copy from the original
	        if (curData.data) {
	            curData.data = jQuery.extend({}, curData.data);
	        }
	    }
	    function fixCloneNodeIssues(src, dest) {
	        var nodeName, e, data;
	        // We do not need to do anything for non-Elements
	        if (dest.nodeType !== 1) {
	            return;
	        }
	        nodeName = dest.nodeName.toLowerCase();
	        // IE6-8 copies events bound via attachEvent when using cloneNode.
	        if (!jQuery.support.noCloneEvent && dest[jQuery.expando]) {
	            data = jQuery._data(dest);
	            for (e in data.events) {
	                jQuery.removeEvent(dest, e, data.handle);
	            }
	            // Event data gets referenced instead of copied if the expando gets copied too
	            dest.removeAttribute(jQuery.expando);
	        }
	        // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	        if (nodeName === 'script' && dest.text !== src.text) {
	            disableScript(dest).text = src.text;
	            restoreScript(dest);    // IE6-10 improperly clones children of object elements using classid.
	                                    // IE10 throws NoModificationAllowedError if parent is null, #12132.
	        } else if (nodeName === 'object') {
	            if (dest.parentNode) {
	                dest.outerHTML = src.outerHTML;
	            }
	            // This path appears unavoidable for IE9. When cloning an object
	            // element in IE9, the outerHTML strategy above is not sufficient.
	            // If the src has innerHTML and the destination does not,
	            // copy the src.innerHTML into the dest.innerHTML. #10324
	            if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
	                dest.innerHTML = src.innerHTML;
	            }
	        } else if (nodeName === 'input' && manipulation_rcheckableType.test(src.type)) {
	            // IE6-8 fails to persist the checked state of a cloned checkbox
	            // or radio button. Worse, IE6-7 fail to give the cloned element
	            // a checked appearance if the defaultChecked value isn't also set
	            dest.defaultChecked = dest.checked = src.checked;
	            // IE6-7 get confused and end up setting the value of a cloned
	            // checkbox/radio button to an empty string instead of "on"
	            if (dest.value !== src.value) {
	                dest.value = src.value;
	            }    // IE6-8 fails to return the selected option to the default selected
	                 // state when cloning options
	        } else if (nodeName === 'option') {
	            dest.defaultSelected = dest.selected = src.defaultSelected;    // IE6-8 fails to set the defaultValue to the correct value when
	                                                                           // cloning other types of input fields
	        } else if (nodeName === 'input' || nodeName === 'textarea') {
	            dest.defaultValue = src.defaultValue;
	        }
	    }
	    jQuery.each({
	        appendTo: 'append',
	        prependTo: 'prepend',
	        insertBefore: 'before',
	        insertAfter: 'after',
	        replaceAll: 'replaceWith'
	    }, function (name, original) {
	        jQuery.fn[name] = function (selector) {
	            var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1;
	            for (; i <= last; i++) {
	                elems = i === last ? this : this.clone(true);
	                jQuery(insert[i])[original](elems);
	                // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
	                core_push.apply(ret, elems.get());
	            }
	            return this.pushStack(ret);
	        };
	    });
	    function getAll(context, tag) {
	        var elems, elem, i = 0, found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || '*') : typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || '*') : undefined;
	        if (!found) {
	            for (found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++) {
	                if (!tag || jQuery.nodeName(elem, tag)) {
	                    found.push(elem);
	                } else {
	                    jQuery.merge(found, getAll(elem, tag));
	                }
	            }
	        }
	        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found;
	    }
	    // Used in buildFragment, fixes the defaultChecked property
	    function fixDefaultChecked(elem) {
	        if (manipulation_rcheckableType.test(elem.type)) {
	            elem.defaultChecked = elem.checked;
	        }
	    }
	    jQuery.extend({
	        clone: function (elem, dataAndEvents, deepDataAndEvents) {
	            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
	            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test('<' + elem.nodeName + '>')) {
	                clone = elem.cloneNode(true);    // IE<=8 does not properly clone detached, unknown element nodes
	            } else {
	                fragmentDiv.innerHTML = elem.outerHTML;
	                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
	            }
	            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
	                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
	                destElements = getAll(clone);
	                srcElements = getAll(elem);
	                // Fix all IE cloning issues
	                for (i = 0; (node = srcElements[i]) != null; ++i) {
	                    // Ensure that the destination node is not null; Fixes #9587
	                    if (destElements[i]) {
	                        fixCloneNodeIssues(node, destElements[i]);
	                    }
	                }
	            }
	            // Copy the events from the original to the clone
	            if (dataAndEvents) {
	                if (deepDataAndEvents) {
	                    srcElements = srcElements || getAll(elem);
	                    destElements = destElements || getAll(clone);
	                    for (i = 0; (node = srcElements[i]) != null; i++) {
	                        cloneCopyEvent(node, destElements[i]);
	                    }
	                } else {
	                    cloneCopyEvent(elem, clone);
	                }
	            }
	            // Preserve script evaluation history
	            destElements = getAll(clone, 'script');
	            if (destElements.length > 0) {
	                setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
	            }
	            destElements = srcElements = node = null;
	            // Return the cloned set
	            return clone;
	        },
	        buildFragment: function (elems, context, scripts, selection) {
	            var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length,
	                // Ensure a safe fragment
	                safe = createSafeFragment(context), nodes = [], i = 0;
	            for (; i < l; i++) {
	                elem = elems[i];
	                if (elem || elem === 0) {
	                    // Add nodes directly
	                    if (jQuery.type(elem) === 'object') {
	                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);    // Convert non-html into a text node
	                    } else if (!rhtml.test(elem)) {
	                        nodes.push(context.createTextNode(elem));    // Convert html into DOM nodes
	                    } else {
	                        tmp = tmp || safe.appendChild(context.createElement('div'));
	                        // Deserialize a standard representation
	                        tag = (rtagName.exec(elem) || [
	                            '',
	                            ''
	                        ])[1].toLowerCase();
	                        wrap = wrapMap[tag] || wrapMap._default;
	                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, '<$1></$2>') + wrap[2];
	                        // Descend through wrappers to the right content
	                        j = wrap[0];
	                        while (j--) {
	                            tmp = tmp.lastChild;
	                        }
	                        // Manually add leading whitespace removed by IE
	                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
	                            nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
	                        }
	                        // Remove IE's autoinserted <tbody> from table fragments
	                        if (!jQuery.support.tbody) {
	                            // String was a <table>, *may* have spurious <tbody>
	                            elem = tag === 'table' && !rtbody.test(elem) ? tmp.firstChild : // String was a bare <thead> or <tfoot>
	                            wrap[1] === '<table>' && !rtbody.test(elem) ? tmp : 0;
	                            j = elem && elem.childNodes.length;
	                            while (j--) {
	                                if (jQuery.nodeName(tbody = elem.childNodes[j], 'tbody') && !tbody.childNodes.length) {
	                                    elem.removeChild(tbody);
	                                }
	                            }
	                        }
	                        jQuery.merge(nodes, tmp.childNodes);
	                        // Fix #12392 for WebKit and IE > 9
	                        tmp.textContent = '';
	                        // Fix #12392 for oldIE
	                        while (tmp.firstChild) {
	                            tmp.removeChild(tmp.firstChild);
	                        }
	                        // Remember the top-level container for proper cleanup
	                        tmp = safe.lastChild;
	                    }
	                }
	            }
	            // Fix #11356: Clear elements from fragment
	            if (tmp) {
	                safe.removeChild(tmp);
	            }
	            // Reset defaultChecked for any radios and checkboxes
	            // about to be appended to the DOM in IE 6/7 (#8060)
	            if (!jQuery.support.appendChecked) {
	                jQuery.grep(getAll(nodes, 'input'), fixDefaultChecked);
	            }
	            i = 0;
	            while (elem = nodes[i++]) {
	                // #4087 - If origin and destination elements are the same, and this is
	                // that element, do not do anything
	                if (selection && jQuery.inArray(elem, selection) !== -1) {
	                    continue;
	                }
	                contains = jQuery.contains(elem.ownerDocument, elem);
	                // Append to fragment
	                tmp = getAll(safe.appendChild(elem), 'script');
	                // Preserve script evaluation history
	                if (contains) {
	                    setGlobalEval(tmp);
	                }
	                // Capture executables
	                if (scripts) {
	                    j = 0;
	                    while (elem = tmp[j++]) {
	                        if (rscriptType.test(elem.type || '')) {
	                            scripts.push(elem);
	                        }
	                    }
	                }
	            }
	            tmp = null;
	            return safe;
	        },
	        cleanData: function (elems, acceptData) {
	            var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special;
	            for (; (elem = elems[i]) != null; i++) {
	                if (acceptData || jQuery.acceptData(elem)) {
	                    id = elem[internalKey];
	                    data = id && cache[id];
	                    if (data) {
	                        if (data.events) {
	                            for (type in data.events) {
	                                if (special[type]) {
	                                    jQuery.event.remove(elem, type);    // This is a shortcut to avoid jQuery.event.remove's overhead
	                                } else {
	                                    jQuery.removeEvent(elem, type, data.handle);
	                                }
	                            }
	                        }
	                        // Remove cache only if it was not already removed by jQuery.event.remove
	                        if (cache[id]) {
	                            delete cache[id];
	                            // IE does not allow us to delete expando properties from nodes,
	                            // nor does it have a removeAttribute function on Document nodes;
	                            // we must handle all of these cases
	                            if (deleteExpando) {
	                                delete elem[internalKey];
	                            } else if (typeof elem.removeAttribute !== core_strundefined) {
	                                elem.removeAttribute(internalKey);
	                            } else {
	                                elem[internalKey] = null;
	                            }
	                            core_deletedIds.push(id);
	                        }
	                    }
	                }
	            }
	        }
	    });
	    var iframe, getStyles, curCSS, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/, rposition = /^(top|right|bottom|left)$/,
	        // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	        // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	        rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp('^(' + core_pnum + ')(.*)$', 'i'), rnumnonpx = new RegExp('^(' + core_pnum + ')(?!px)[a-z%]+$', 'i'), rrelNum = new RegExp('^([+-])=(' + core_pnum + ')', 'i'), elemdisplay = { BODY: 'block' }, cssShow = {
	            position: 'absolute',
	            visibility: 'hidden',
	            display: 'block'
	        }, cssNormalTransform = {
	            letterSpacing: 0,
	            fontWeight: 400
	        }, cssExpand = [
	            'Top',
	            'Right',
	            'Bottom',
	            'Left'
	        ], cssPrefixes = [
	            'Webkit',
	            'O',
	            'Moz',
	            'ms'
	        ];
	    // return a css property mapped to a potentially vendor prefixed property
	    function vendorPropName(style, name) {
	        // shortcut for names that are not vendor prefixed
	        if (name in style) {
	            return name;
	        }
	        // check for vendor prefixed names
	        var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
	        while (i--) {
	            name = cssPrefixes[i] + capName;
	            if (name in style) {
	                return name;
	            }
	        }
	        return origName;
	    }
	    function isHidden(elem, el) {
	        // isHidden might be called from jQuery#filter function;
	        // in that case, element will be second argument
	        elem = el || elem;
	        return jQuery.css(elem, 'display') === 'none' || !jQuery.contains(elem.ownerDocument, elem);
	    }
	    function showHide(elements, show) {
	        var display, elem, hidden, values = [], index = 0, length = elements.length;
	        for (; index < length; index++) {
	            elem = elements[index];
	            if (!elem.style) {
	                continue;
	            }
	            values[index] = jQuery._data(elem, 'olddisplay');
	            display = elem.style.display;
	            if (show) {
	                // Reset the inline display of this element to learn if it is
	                // being hidden by cascaded rules or not
	                if (!values[index] && display === 'none') {
	                    elem.style.display = '';
	                }
	                // Set elements which have been overridden with display: none
	                // in a stylesheet to whatever the default browser style is
	                // for such an element
	                if (elem.style.display === '' && isHidden(elem)) {
	                    values[index] = jQuery._data(elem, 'olddisplay', css_defaultDisplay(elem.nodeName));
	                }
	            } else {
	                if (!values[index]) {
	                    hidden = isHidden(elem);
	                    if (display && display !== 'none' || !hidden) {
	                        jQuery._data(elem, 'olddisplay', hidden ? display : jQuery.css(elem, 'display'));
	                    }
	                }
	            }
	        }
	        // Set the display of most of the elements in a second loop
	        // to avoid the constant reflow
	        for (index = 0; index < length; index++) {
	            elem = elements[index];
	            if (!elem.style) {
	                continue;
	            }
	            if (!show || elem.style.display === 'none' || elem.style.display === '') {
	                elem.style.display = show ? values[index] || '' : 'none';
	            }
	        }
	        return elements;
	    }
	    jQuery.fn.extend({
	        css: function (name, value) {
	            return jQuery.access(this, function (elem, name, value) {
	                var len, styles, map = {}, i = 0;
	                if (jQuery.isArray(name)) {
	                    styles = getStyles(elem);
	                    len = name.length;
	                    for (; i < len; i++) {
	                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
	                    }
	                    return map;
	                }
	                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
	            }, name, value, arguments.length > 1);
	        },
	        show: function () {
	            return showHide(this, true);
	        },
	        hide: function () {
	            return showHide(this);
	        },
	        toggle: function (state) {
	            var bool = typeof state === 'boolean';
	            return this.each(function () {
	                if (bool ? state : isHidden(this)) {
	                    jQuery(this).show();
	                } else {
	                    jQuery(this).hide();
	                }
	            });
	        }
	    });
	    jQuery.extend({
	        // Add in style property hooks for overriding the default
	        // behavior of getting and setting a style property
	        cssHooks: {
	            opacity: {
	                get: function (elem, computed) {
	                    if (computed) {
	                        // We should always get a number back from opacity
	                        var ret = curCSS(elem, 'opacity');
	                        return ret === '' ? '1' : ret;
	                    }
	                }
	            }
	        },
	        // Exclude the following css properties to add px
	        cssNumber: {
	            'columnCount': true,
	            'fillOpacity': true,
	            'fontWeight': true,
	            'lineHeight': true,
	            'opacity': true,
	            'orphans': true,
	            'widows': true,
	            'zIndex': true,
	            'zoom': true
	        },
	        // Add in properties whose names you wish to fix before
	        // setting or getting the value
	        cssProps: {
	            // normalize float css property
	            'float': jQuery.support.cssFloat ? 'cssFloat' : 'styleFloat'
	        },
	        // Get and set the style property on a DOM Node
	        style: function (elem, name, value, extra) {
	            // Don't set styles on text and comment nodes
	            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
	                return;
	            }
	            // Make sure that we're working with the right name
	            var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
	            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
	            // gets hook for the prefixed version
	            // followed by the unprefixed version
	            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
	            // Check if we're setting a value
	            if (value !== undefined) {
	                type = typeof value;
	                // convert relative number strings (+= or -=) to relative numbers. #7345
	                if (type === 'string' && (ret = rrelNum.exec(value))) {
	                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
	                    // Fixes bug #9237
	                    type = 'number';
	                }
	                // Make sure that NaN and null values aren't set. See: #7116
	                if (value == null || type === 'number' && isNaN(value)) {
	                    return;
	                }
	                // If a number was passed in, add 'px' to the (except for certain CSS properties)
	                if (type === 'number' && !jQuery.cssNumber[origName]) {
	                    value += 'px';
	                }
	                // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
	                // but it would mean to define eight (for every problematic property) identical functions
	                if (!jQuery.support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
	                    style[name] = 'inherit';
	                }
	                // If a hook was provided, use that value, otherwise just set the specified value
	                if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
	                    // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
	                    // Fixes bug #5509
	                    try {
	                        style[name] = value;
	                    } catch (e) {
	                    }
	                }
	            } else {
	                // If a hook was provided get the non-computed value from there
	                if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
	                    return ret;
	                }
	                // Otherwise just get the value from the style object
	                return style[name];
	            }
	        },
	        css: function (elem, name, extra, styles) {
	            var num, val, hooks, origName = jQuery.camelCase(name);
	            // Make sure that we're working with the right name
	            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
	            // gets hook for the prefixed version
	            // followed by the unprefixed version
	            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
	            // If a hook was provided get the computed value from there
	            if (hooks && 'get' in hooks) {
	                val = hooks.get(elem, true, extra);
	            }
	            // Otherwise, if a way to get the computed value exists, use that
	            if (val === undefined) {
	                val = curCSS(elem, name, styles);
	            }
	            //convert "normal" to computed value
	            if (val === 'normal' && name in cssNormalTransform) {
	                val = cssNormalTransform[name];
	            }
	            // Return, converting to number if forced or a qualifier was provided and val looks numeric
	            if (extra === '' || extra) {
	                num = parseFloat(val);
	                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
	            }
	            return val;
	        },
	        // A method for quickly swapping in/out CSS properties to get correct calculations
	        swap: function (elem, options, callback, args) {
	            var ret, name, old = {};
	            // Remember the old values, and insert the new ones
	            for (name in options) {
	                old[name] = elem.style[name];
	                elem.style[name] = options[name];
	            }
	            ret = callback.apply(elem, args || []);
	            // Revert the old values
	            for (name in options) {
	                elem.style[name] = old[name];
	            }
	            return ret;
	        }
	    });
	    // NOTE: we've included the "window" in window.getComputedStyle
	    // because jsdom on node.js will break without it.
	    if (window.getComputedStyle) {
	        getStyles = function (elem) {
	            return window.getComputedStyle(elem, null);
	        };
	        curCSS = function (elem, name, _computed) {
	            var width, minWidth, maxWidth, computed = _computed || getStyles(elem),
	                // getPropertyValue is only needed for .css('filter') in IE9, see #12537
	                ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined, style = elem.style;
	            if (computed) {
	                if (ret === '' && !jQuery.contains(elem.ownerDocument, elem)) {
	                    ret = jQuery.style(elem, name);
	                }
	                // A tribute to the "awesome hack by Dean Edwards"
	                // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
	                // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
	                // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
	                if (rnumnonpx.test(ret) && rmargin.test(name)) {
	                    // Remember the original values
	                    width = style.width;
	                    minWidth = style.minWidth;
	                    maxWidth = style.maxWidth;
	                    // Put in the new values to get a computed value out
	                    style.minWidth = style.maxWidth = style.width = ret;
	                    ret = computed.width;
	                    // Revert the changed values
	                    style.width = width;
	                    style.minWidth = minWidth;
	                    style.maxWidth = maxWidth;
	                }
	            }
	            return ret;
	        };
	    } else if (document.documentElement.currentStyle) {
	        getStyles = function (elem) {
	            return elem.currentStyle;
	        };
	        curCSS = function (elem, name, _computed) {
	            var left, rs, rsLeft, computed = _computed || getStyles(elem), ret = computed ? computed[name] : undefined, style = elem.style;
	            // Avoid setting ret to empty string here
	            // so we don't default to auto
	            if (ret == null && style && style[name]) {
	                ret = style[name];
	            }
	            // From the awesome hack by Dean Edwards
	            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	            // If we're not dealing with a regular pixel number
	            // but a number that has a weird ending, we need to convert it to pixels
	            // but not position css attributes, as those are proportional to the parent element instead
	            // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
	            if (rnumnonpx.test(ret) && !rposition.test(name)) {
	                // Remember the original values
	                left = style.left;
	                rs = elem.runtimeStyle;
	                rsLeft = rs && rs.left;
	                // Put in the new values to get a computed value out
	                if (rsLeft) {
	                    rs.left = elem.currentStyle.left;
	                }
	                style.left = name === 'fontSize' ? '1em' : ret;
	                ret = style.pixelLeft + 'px';
	                // Revert the changed values
	                style.left = left;
	                if (rsLeft) {
	                    rs.left = rsLeft;
	                }
	            }
	            return ret === '' ? 'auto' : ret;
	        };
	    }
	    function setPositiveNumber(elem, value, subtract) {
	        var matches = rnumsplit.exec(value);
	        return matches ? // Guard against undefined "subtract", e.g., when used as in cssHooks
	        Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px') : value;
	    }
	    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
	        var i = extra === (isBorderBox ? 'border' : 'content') ? // If we already have the right measurement, avoid augmentation
	            4 : // Otherwise initialize for horizontal or vertical properties
	            name === 'width' ? 1 : 0, val = 0;
	        for (; i < 4; i += 2) {
	            // both box models exclude margin, so add it if we want it
	            if (extra === 'margin') {
	                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
	            }
	            if (isBorderBox) {
	                // border-box includes padding, so remove it if we want content
	                if (extra === 'content') {
	                    val -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
	                }
	                // at this point, extra isn't border nor margin, so remove border
	                if (extra !== 'margin') {
	                    val -= jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
	                }
	            } else {
	                // at this point, extra isn't content, so add padding
	                val += jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
	                // at this point, extra isn't content nor padding, so add border
	                if (extra !== 'padding') {
	                    val += jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
	                }
	            }
	        }
	        return val;
	    }
	    function getWidthOrHeight(elem, name, extra) {
	        // Start with offset property, which is equivalent to the border-box value
	        var valueIsBorderBox = true, val = name === 'width' ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';
	        // some non-html elements return undefined for offsetWidth, so check for null/undefined
	        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	        if (val <= 0 || val == null) {
	            // Fall back to computed then uncomputed css if necessary
	            val = curCSS(elem, name, styles);
	            if (val < 0 || val == null) {
	                val = elem.style[name];
	            }
	            // Computed unit is not pixels. Stop here and return.
	            if (rnumnonpx.test(val)) {
	                return val;
	            }
	            // we need the check for style in case a browser which returns unreliable values
	            // for getComputedStyle silently falls back to the reliable elem.style
	            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
	            // Normalize "", auto, and prepare for extra
	            val = parseFloat(val) || 0;
	        }
	        // use the active box-sizing model to add/subtract irrelevant styles
	        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox, styles) + 'px';
	    }
	    // Try to determine the default display value of an element
	    function css_defaultDisplay(nodeName) {
	        var doc = document, display = elemdisplay[nodeName];
	        if (!display) {
	            display = actualDisplay(nodeName, doc);
	            // If the simple way fails, read from inside an iframe
	            if (display === 'none' || !display) {
	                // Use the already-created iframe if possible
	                iframe = (iframe || jQuery('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>').css('cssText', 'display:block !important')).appendTo(doc.documentElement);
	                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
	                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
	                doc.write('<!doctype html><html><body>');
	                doc.close();
	                display = actualDisplay(nodeName, doc);
	                iframe.detach();
	            }
	            // Store the correct default display
	            elemdisplay[nodeName] = display;
	        }
	        return display;
	    }
	    // Called ONLY from within css_defaultDisplay
	    function actualDisplay(name, doc) {
	        var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], 'display');
	        elem.remove();
	        return display;
	    }
	    jQuery.each([
	        'height',
	        'width'
	    ], function (i, name) {
	        jQuery.cssHooks[name] = {
	            get: function (elem, computed, extra) {
	                if (computed) {
	                    // certain elements can have dimension info if we invisibly show them
	                    // however, it must have a current display style that would benefit from this
	                    return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, 'display')) ? jQuery.swap(elem, cssShow, function () {
	                        return getWidthOrHeight(elem, name, extra);
	                    }) : getWidthOrHeight(elem, name, extra);
	                }
	            },
	            set: function (elem, value, extra) {
	                var styles = extra && getStyles(elem);
	                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box', styles) : 0);
	            }
	        };
	    });
	    if (!jQuery.support.opacity) {
	        jQuery.cssHooks.opacity = {
	            get: function (elem, computed) {
	                // IE uses filters for opacity
	                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : computed ? '1' : '';
	            },
	            set: function (elem, value) {
	                var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? 'alpha(opacity=' + value * 100 + ')' : '', filter = currentStyle && currentStyle.filter || style.filter || '';
	                // IE has trouble with opacity if it does not have layout
	                // Force it by setting the zoom level
	                style.zoom = 1;
	                // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
	                // if value === "", then remove inline opacity #12685
	                if ((value >= 1 || value === '') && jQuery.trim(filter.replace(ralpha, '')) === '' && style.removeAttribute) {
	                    // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
	                    // if "filter:" is present at all, clearType is disabled, we want to avoid this
	                    // style.removeAttribute is IE Only, but so apparently is this code path...
	                    style.removeAttribute('filter');
	                    // if there is no filter style applied in a css rule or unset inline opacity, we are done
	                    if (value === '' || currentStyle && !currentStyle.filter) {
	                        return;
	                    }
	                }
	                // otherwise, set new filter values
	                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + ' ' + opacity;
	            }
	        };
	    }
	    // These hooks cannot be added until DOM ready because the support test
	    // for it is not run until after DOM ready
	    jQuery(function () {
	        if (!jQuery.support.reliableMarginRight) {
	            jQuery.cssHooks.marginRight = {
	                get: function (elem, computed) {
	                    if (computed) {
	                        // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	                        // Work around by temporarily setting element display to inline-block
	                        return jQuery.swap(elem, { 'display': 'inline-block' }, curCSS, [
	                            elem,
	                            'marginRight'
	                        ]);
	                    }
	                }
	            };
	        }
	        // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	        // getComputedStyle returns percent when specified for top/left/bottom/right
	        // rather than make the css module depend on the offset module, we just check for it here
	        if (!jQuery.support.pixelPosition && jQuery.fn.position) {
	            jQuery.each([
	                'top',
	                'left'
	            ], function (i, prop) {
	                jQuery.cssHooks[prop] = {
	                    get: function (elem, computed) {
	                        if (computed) {
	                            computed = curCSS(elem, prop);
	                            // if curCSS returns percentage, fallback to offset
	                            return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + 'px' : computed;
	                        }
	                    }
	                };
	            });
	        }
	    });
	    if (jQuery.expr && jQuery.expr.filters) {
	        jQuery.expr.filters.hidden = function (elem) {
	            // Support: Opera <= 12.12
	            // Opera reports offsetWidths and offsetHeights less than zero on some elements
	            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !jQuery.support.reliableHiddenOffsets && (elem.style && elem.style.display || jQuery.css(elem, 'display')) === 'none';
	        };
	        jQuery.expr.filters.visible = function (elem) {
	            return !jQuery.expr.filters.hidden(elem);
	        };
	    }
	    // These hooks are used by animate to expand properties
	    jQuery.each({
	        margin: '',
	        padding: '',
	        border: 'Width'
	    }, function (prefix, suffix) {
	        jQuery.cssHooks[prefix + suffix] = {
	            expand: function (value) {
	                var i = 0, expanded = {},
	                    // assumes a single number if not a string
	                    parts = typeof value === 'string' ? value.split(' ') : [value];
	                for (; i < 4; i++) {
	                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
	                }
	                return expanded;
	            }
	        };
	        if (!rmargin.test(prefix)) {
	            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
	        }
	    });
	    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
	    jQuery.fn.extend({
	        serialize: function () {
	            return jQuery.param(this.serializeArray());
	        },
	        serializeArray: function () {
	            return this.map(function () {
	                // Can add propHook for "elements" to filter or add form elements
	                var elements = jQuery.prop(this, 'elements');
	                return elements ? jQuery.makeArray(elements) : this;
	            }).filter(function () {
	                var type = this.type;
	                // Use .is(":disabled") so that fieldset[disabled] works
	                return this.name && !jQuery(this).is(':disabled') && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
	            }).map(function (i, elem) {
	                var val = jQuery(this).val();
	                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
	                    return {
	                        name: elem.name,
	                        value: val.replace(rCRLF, '\r\n')
	                    };
	                }) : {
	                    name: elem.name,
	                    value: val.replace(rCRLF, '\r\n')
	                };
	            }).get();
	        }
	    });
	    //Serialize an array of form elements or a set of
	    //key/values into a query string
	    jQuery.param = function (a, traditional) {
	        var prefix, s = [], add = function (key, value) {
	                // If value is a function, invoke it and return its value
	                value = jQuery.isFunction(value) ? value() : value == null ? '' : value;
	                s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
	            };
	        // Set traditional to true for jQuery <= 1.3.2 behavior.
	        if (traditional === undefined) {
	            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	        }
	        // If an array was passed in, assume that it is an array of form elements.
	        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
	            // Serialize the form elements
	            jQuery.each(a, function () {
	                add(this.name, this.value);
	            });
	        } else {
	            // If traditional, encode the "old" way (the way 1.3.2 or older
	            // did it), otherwise encode params recursively.
	            for (prefix in a) {
	                buildParams(prefix, a[prefix], traditional, add);
	            }
	        }
	        // Return the resulting serialization
	        return s.join('&').replace(r20, '+');
	    };
	    function buildParams(prefix, obj, traditional, add) {
	        var name;
	        if (jQuery.isArray(obj)) {
	            // Serialize array item.
	            jQuery.each(obj, function (i, v) {
	                if (traditional || rbracket.test(prefix)) {
	                    // Treat each array item as a scalar.
	                    add(prefix, v);
	                } else {
	                    // Item is non-scalar (array or object), encode its numeric index.
	                    buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
	                }
	            });
	        } else if (!traditional && jQuery.type(obj) === 'object') {
	            // Serialize object item.
	            for (name in obj) {
	                buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
	            }
	        } else {
	            // Serialize scalar item.
	            add(prefix, obj);
	        }
	    }
	    jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup error contextmenu').split(' '), function (i, name) {
	        // Handle event binding
	        jQuery.fn[name] = function (data, fn) {
	            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
	        };
	    });
	    jQuery.fn.hover = function (fnOver, fnOut) {
	        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
	    };
	    var
	        // Document location
	        ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(), ajax_rquery = /\?/, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
	        // IE leaves an \r character at EOL
	        // #7653, #8125, #8152: local protocol detection
	        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
	        // Keep a copy of the old load method
	        _load = jQuery.fn.load,
	        /* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
	        prefilters = {},
	        /* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
	        transports = {},
	        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	        allTypes = '*/'.concat('*');
	    // #8138, IE may throw an exception when accessing
	    // a field from window.location if document.domain has been set
	    try {
	        ajaxLocation = location.href;
	    } catch (e) {
	        // Use the href attribute of an A element
	        // since IE will modify it given document.location
	        ajaxLocation = document.createElement('a');
	        ajaxLocation.href = '';
	        ajaxLocation = ajaxLocation.href;
	    }
	    // Segment location into parts
	    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
	    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	    function addToPrefiltersOrTransports(structure) {
	        // dataTypeExpression is optional and defaults to "*"
	        return function (dataTypeExpression, func) {
	            if (typeof dataTypeExpression !== 'string') {
	                func = dataTypeExpression;
	                dataTypeExpression = '*';
	            }
	            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
	            if (jQuery.isFunction(func)) {
	                // For each dataType in the dataTypeExpression
	                while (dataType = dataTypes[i++]) {
	                    // Prepend if requested
	                    if (dataType[0] === '+') {
	                        dataType = dataType.slice(1) || '*';
	                        (structure[dataType] = structure[dataType] || []).unshift(func);    // Otherwise append
	                    } else {
	                        (structure[dataType] = structure[dataType] || []).push(func);
	                    }
	                }
	            }
	        };
	    }
	    // Base inspection function for prefilters and transports
	    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
	        var inspected = {}, seekingTransport = structure === transports;
	        function inspect(dataType) {
	            var selected;
	            inspected[dataType] = true;
	            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
	                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
	                if (typeof dataTypeOrTransport === 'string' && !seekingTransport && !inspected[dataTypeOrTransport]) {
	                    options.dataTypes.unshift(dataTypeOrTransport);
	                    inspect(dataTypeOrTransport);
	                    return false;
	                } else if (seekingTransport) {
	                    return !(selected = dataTypeOrTransport);
	                }
	            });
	            return selected;
	        }
	        return inspect(options.dataTypes[0]) || !inspected['*'] && inspect('*');
	    }
	    // A special extend for ajax options
	    // that takes "flat" options (not to be deep extended)
	    // Fixes #9887
	    function ajaxExtend(target, src) {
	        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
	        for (key in src) {
	            if (src[key] !== undefined) {
	                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
	            }
	        }
	        if (deep) {
	            jQuery.extend(true, target, deep);
	        }
	        return target;
	    }
	    jQuery.fn.load = function (url, params, callback) {
	        if (typeof url !== 'string' && _load) {
	            return _load.apply(this, arguments);
	        }
	        var selector, response, type, self = this, off = url.indexOf(' ');
	        if (off >= 0) {
	            selector = url.slice(off, url.length);
	            url = url.slice(0, off);
	        }
	        // If it's a function
	        if (jQuery.isFunction(params)) {
	            // We assume that it's the callback
	            callback = params;
	            params = undefined;    // Otherwise, build a param string
	        } else if (params && typeof params === 'object') {
	            type = 'POST';
	        }
	        // If we have elements to modify, make the request
	        if (self.length > 0) {
	            jQuery.ajax({
	                url: url,
	                // if "type" variable is undefined, then "GET" method will be used
	                type: type,
	                dataType: 'html',
	                data: params
	            }).done(function (responseText) {
	                // Save response for use in complete callback
	                response = arguments;
	                self.html(selector ? // If a selector was specified, locate the right elements in a dummy div
	                // Exclude scripts to avoid IE 'Permission Denied' errors
	                jQuery('<div>').append(jQuery.parseHTML(responseText)).find(selector) : // Otherwise use the full result
	                responseText);
	            }).complete(callback && function (jqXHR, status) {
	                self.each(callback, response || [
	                    jqXHR.responseText,
	                    status,
	                    jqXHR
	                ]);
	            });
	        }
	        return this;
	    };
	    // Attach a bunch of functions for handling common AJAX events
	    jQuery.each([
	        'ajaxStart',
	        'ajaxStop',
	        'ajaxComplete',
	        'ajaxError',
	        'ajaxSuccess',
	        'ajaxSend'
	    ], function (i, type) {
	        jQuery.fn[type] = function (fn) {
	            return this.on(type, fn);
	        };
	    });
	    jQuery.each([
	        'get',
	        'post'
	    ], function (i, method) {
	        jQuery[method] = function (url, data, callback, type) {
	            // shift arguments if data argument was omitted
	            if (jQuery.isFunction(data)) {
	                type = type || callback;
	                callback = data;
	                data = undefined;
	            }
	            return jQuery.ajax({
	                url: url,
	                type: method,
	                dataType: type,
	                data: data,
	                success: callback
	            });
	        };
	    });
	    jQuery.extend({
	        // Counter for holding the number of active queries
	        active: 0,
	        // Last-Modified header cache for next request
	        lastModified: {},
	        etag: {},
	        ajaxSettings: {
	            url: ajaxLocation,
	            type: 'GET',
	            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
	            global: true,
	            processData: true,
	            async: true,
	            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	            /*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	            accepts: {
	                '*': allTypes,
	                text: 'text/plain',
	                html: 'text/html',
	                xml: 'application/xml, text/xml',
	                json: 'application/json, text/javascript'
	            },
	            contents: {
	                xml: /xml/,
	                html: /html/,
	                json: /json/
	            },
	            responseFields: {
	                xml: 'responseXML',
	                text: 'responseText'
	            },
	            // Data converters
	            // Keys separate source (or catchall "*") and destination types with a single space
	            converters: {
	                // Convert anything to text
	                '* text': window.String,
	                // Text to html (true = no transformation)
	                'text html': true,
	                // Evaluate text as a json expression
	                'text json': jQuery.parseJSON,
	                // Parse text as xml
	                'text xml': jQuery.parseXML
	            },
	            // For options that shouldn't be deep extended:
	            // you can add your own custom options here if
	            // and when you create one that shouldn't be
	            // deep extended (see ajaxExtend)
	            flatOptions: {
	                url: true,
	                context: true
	            }
	        },
	        // Creates a full fledged settings object into target
	        // with both ajaxSettings and settings fields.
	        // If target is omitted, writes into ajaxSettings.
	        ajaxSetup: function (target, settings) {
	            return settings ? // Building a settings object
	            ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : // Extending ajaxSettings
	            ajaxExtend(jQuery.ajaxSettings, target);
	        },
	        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
	        ajaxTransport: addToPrefiltersOrTransports(transports),
	        // Main method
	        ajax: function (url, options) {
	            // If url is an object, simulate pre-1.5 signature
	            if (typeof url === 'object') {
	                options = url;
	                url = undefined;
	            }
	            // Force options to be an object
	            options = options || {};
	            var
	                // Cross-domain detection vars
	                parts,
	                // Loop variable
	                i,
	                // URL without anti-cache param
	                cacheURL,
	                // Response headers as string
	                responseHeadersString,
	                // timeout handle
	                timeoutTimer,
	                // To know if global events are to be dispatched
	                fireGlobals, transport,
	                // Response headers
	                responseHeaders,
	                // Create the final options object
	                s = jQuery.ajaxSetup({}, options),
	                // Callbacks context
	                callbackContext = s.context || s,
	                // Context for global events is callbackContext if it is a DOM node or jQuery collection
	                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
	                // Deferreds
	                deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'),
	                // Status-dependent callbacks
	                statusCode = s.statusCode || {},
	                // Headers (they are sent all at once)
	                requestHeaders = {}, requestHeadersNames = {},
	                // The jqXHR state
	                state = 0,
	                // Default abort message
	                strAbort = 'canceled',
	                // Fake xhr
	                jqXHR = {
	                    readyState: 0,
	                    // Builds headers hashtable if needed
	                    getResponseHeader: function (key) {
	                        var match;
	                        if (state === 2) {
	                            if (!responseHeaders) {
	                                responseHeaders = {};
	                                while (match = rheaders.exec(responseHeadersString)) {
	                                    responseHeaders[match[1].toLowerCase()] = match[2];
	                                }
	                            }
	                            match = responseHeaders[key.toLowerCase()];
	                        }
	                        return match == null ? null : match;
	                    },
	                    // Raw string
	                    getAllResponseHeaders: function () {
	                        return state === 2 ? responseHeadersString : null;
	                    },
	                    // Caches the header
	                    setRequestHeader: function (name, value) {
	                        var lname = name.toLowerCase();
	                        if (!state) {
	                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
	                            requestHeaders[name] = value;
	                        }
	                        return this;
	                    },
	                    // Overrides response content-type header
	                    overrideMimeType: function (type) {
	                        if (!state) {
	                            s.mimeType = type;
	                        }
	                        return this;
	                    },
	                    // Status-dependent callbacks
	                    statusCode: function (map) {
	                        var code;
	                        if (map) {
	                            if (state < 2) {
	                                for (code in map) {
	                                    // Lazy-add the new callback in a way that preserves old ones
	                                    statusCode[code] = [
	                                        statusCode[code],
	                                        map[code]
	                                    ];
	                                }
	                            } else {
	                                // Execute the appropriate callbacks
	                                jqXHR.always(map[jqXHR.status]);
	                            }
	                        }
	                        return this;
	                    },
	                    // Cancel the request
	                    abort: function (statusText) {
	                        var finalText = statusText || strAbort;
	                        if (transport) {
	                            transport.abort(finalText);
	                        }
	                        done(0, finalText);
	                        return this;
	                    }
	                };
	            // Attach deferreds
	            deferred.promise(jqXHR).complete = completeDeferred.add;
	            jqXHR.success = jqXHR.done;
	            jqXHR.error = jqXHR.fail;
	            // Remove hash character (#7531: and string promotion)
	            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
	            // Handle falsy url in the settings object (#10093: consistency with old signature)
	            // We also use the url parameter if available
	            s.url = ((url || s.url || ajaxLocation) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
	            // Alias method option to type as per ticket #12004
	            s.type = options.method || options.type || s.method || s.type;
	            // Extract dataTypes list
	            s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase().match(core_rnotwhite) || [''];
	            // A cross-domain request is in order when we have a protocol:host:port mismatch
	            if (s.crossDomain == null) {
	                parts = rurl.exec(s.url.toLowerCase());
	                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === 'http:' ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? 80 : 443))));
	            }
	            // Convert data if not already a string
	            if (s.data && s.processData && typeof s.data !== 'string') {
	                s.data = jQuery.param(s.data, s.traditional);
	            }
	            // Apply prefilters
	            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
	            // If request was aborted inside a prefilter, stop there
	            if (state === 2) {
	                return jqXHR;
	            }
	            // We can fire global events as of now if asked to
	            fireGlobals = s.global;
	            // Watch for a new set of requests
	            if (fireGlobals && jQuery.active++ === 0) {
	                jQuery.event.trigger('ajaxStart');
	            }
	            // Uppercase the type
	            s.type = s.type.toUpperCase();
	            // Determine if request has content
	            s.hasContent = !rnoContent.test(s.type);
	            // Save the URL in case we're toying with the If-Modified-Since
	            // and/or If-None-Match header later on
	            cacheURL = s.url;
	            // More options handling for requests with no content
	            if (!s.hasContent) {
	                // If data is available, append data to url
	                if (s.data) {
	                    cacheURL = s.url += (ajax_rquery.test(cacheURL) ? '&' : '?') + s.data;
	                    // #9682: remove data so that it's not used in an eventual retry
	                    delete s.data;
	                }
	                // Add anti-cache in url if needed
	                if (s.cache === false) {
	                    s.url = rts.test(cacheURL) ? // If there is already a '_' parameter, set its value
	                    cacheURL.replace(rts, '$1_=' + ajax_nonce++) : // Otherwise add one to the end
	                    cacheURL + (ajax_rquery.test(cacheURL) ? '&' : '?') + '_=' + ajax_nonce++;
	                }
	            }
	            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	            if (s.ifModified) {
	                if (jQuery.lastModified[cacheURL]) {
	                    jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[cacheURL]);
	                }
	                if (jQuery.etag[cacheURL]) {
	                    jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
	                }
	            }
	            // Set the correct header, if data is being sent
	            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
	                jqXHR.setRequestHeader('Content-Type', s.contentType);
	            }
	            // Set the Accepts header for the server, depending on the dataType
	            jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
	            // Check for headers option
	            for (i in s.headers) {
	                jqXHR.setRequestHeader(i, s.headers[i]);
	            }
	            // Allow custom headers/mimetypes and early abort
	            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
	                // Abort if not done already and return
	                return jqXHR.abort();
	            }
	            // aborting is no longer a cancellation
	            strAbort = 'abort';
	            // Install callbacks on deferreds
	            for (i in {
	                    success: 1,
	                    error: 1,
	                    complete: 1
	                }) {
	                jqXHR[i](s[i]);
	            }
	            // Get transport
	            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
	            // If no transport, we auto-abort
	            if (!transport) {
	                done(-1, 'No Transport');
	            } else {
	                jqXHR.readyState = 1;
	                // Send global event
	                if (fireGlobals) {
	                    globalEventContext.trigger('ajaxSend', [
	                        jqXHR,
	                        s
	                    ]);
	                }
	                // Timeout
	                if (s.async && s.timeout > 0) {
	                    timeoutTimer = setTimeout(function () {
	                        jqXHR.abort('timeout');
	                    }, s.timeout);
	                }
	                try {
	                    state = 1;
	                    transport.send(requestHeaders, done);
	                } catch (e) {
	                    // Propagate exception as error if not done
	                    if (state < 2) {
	                        done(-1, e);    // Simply rethrow otherwise
	                    } else {
	                        throw e;
	                    }
	                }
	            }
	            // Callback for when everything is done
	            function done(status, nativeStatusText, responses, headers) {
	                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
	                // Called once
	                if (state === 2) {
	                    return;
	                }
	                // State is "done" now
	                state = 2;
	                // Clear timeout if it exists
	                if (timeoutTimer) {
	                    clearTimeout(timeoutTimer);
	                }
	                // Dereference transport for early garbage collection
	                // (no matter how long the jqXHR object will be used)
	                transport = undefined;
	                // Cache response headers
	                responseHeadersString = headers || '';
	                // Set readyState
	                jqXHR.readyState = status > 0 ? 4 : 0;
	                // Get response data
	                if (responses) {
	                    response = ajaxHandleResponses(s, jqXHR, responses);
	                }
	                // If successful, handle type chaining
	                if (status >= 200 && status < 300 || status === 304) {
	                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	                    if (s.ifModified) {
	                        modified = jqXHR.getResponseHeader('Last-Modified');
	                        if (modified) {
	                            jQuery.lastModified[cacheURL] = modified;
	                        }
	                        modified = jqXHR.getResponseHeader('etag');
	                        if (modified) {
	                            jQuery.etag[cacheURL] = modified;
	                        }
	                    }
	                    // if no content
	                    if (status === 204) {
	                        isSuccess = true;
	                        statusText = 'nocontent';    // if not modified
	                    } else if (status === 304) {
	                        isSuccess = true;
	                        statusText = 'notmodified';    // If we have data, let's convert it
	                    } else {
	                        isSuccess = ajaxConvert(s, response);
	                        statusText = isSuccess.state;
	                        success = isSuccess.data;
	                        error = isSuccess.error;
	                        isSuccess = !error;
	                    }
	                } else {
	                    // We extract error from statusText
	                    // then normalize statusText and status for non-aborts
	                    error = statusText;
	                    if (status || !statusText) {
	                        statusText = 'error';
	                        if (status < 0) {
	                            status = 0;
	                        }
	                    }
	                }
	                // Set data for the fake xhr object
	                jqXHR.status = status;
	                jqXHR.statusText = (nativeStatusText || statusText) + '';
	                // Success/Error
	                if (isSuccess) {
	                    deferred.resolveWith(callbackContext, [
	                        success,
	                        statusText,
	                        jqXHR
	                    ]);
	                } else {
	                    deferred.rejectWith(callbackContext, [
	                        jqXHR,
	                        statusText,
	                        error
	                    ]);
	                }
	                // Status-dependent callbacks
	                jqXHR.statusCode(statusCode);
	                statusCode = undefined;
	                if (fireGlobals) {
	                    globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError', [
	                        jqXHR,
	                        s,
	                        isSuccess ? success : error
	                    ]);
	                }
	                // Complete
	                completeDeferred.fireWith(callbackContext, [
	                    jqXHR,
	                    statusText
	                ]);
	                if (fireGlobals) {
	                    globalEventContext.trigger('ajaxComplete', [
	                        jqXHR,
	                        s
	                    ]);
	                    // Handle the global AJAX counter
	                    if (!--jQuery.active) {
	                        jQuery.event.trigger('ajaxStop');
	                    }
	                }
	            }
	            return jqXHR;
	        },
	        getScript: function (url, callback) {
	            return jQuery.get(url, undefined, callback, 'script');
	        },
	        getJSON: function (url, data, callback) {
	            return jQuery.get(url, data, callback, 'json');
	        }
	    });
	    /* Handles responses to an ajax request:
	 * - sets all responseXXX fields accordingly
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	    function ajaxHandleResponses(s, jqXHR, responses) {
	        var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
	        // Fill responseXXX fields
	        for (type in responseFields) {
	            if (type in responses) {
	                jqXHR[responseFields[type]] = responses[type];
	            }
	        }
	        // Remove auto dataType and get content-type in the process
	        while (dataTypes[0] === '*') {
	            dataTypes.shift();
	            if (ct === undefined) {
	                ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
	            }
	        }
	        // Check if we're dealing with a known content-type
	        if (ct) {
	            for (type in contents) {
	                if (contents[type] && contents[type].test(ct)) {
	                    dataTypes.unshift(type);
	                    break;
	                }
	            }
	        }
	        // Check to see if we have a response for the expected dataType
	        if (dataTypes[0] in responses) {
	            finalDataType = dataTypes[0];
	        } else {
	            // Try convertible dataTypes
	            for (type in responses) {
	                if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
	                    finalDataType = type;
	                    break;
	                }
	                if (!firstDataType) {
	                    firstDataType = type;
	                }
	            }
	            // Or just use first one
	            finalDataType = finalDataType || firstDataType;
	        }
	        // If we found a dataType
	        // We add the dataType to the list if needed
	        // and return the corresponding response
	        if (finalDataType) {
	            if (finalDataType !== dataTypes[0]) {
	                dataTypes.unshift(finalDataType);
	            }
	            return responses[finalDataType];
	        }
	    }
	    // Chain conversions given the request and the original response
	    function ajaxConvert(s, response) {
	        var conv2, current, conv, tmp, converters = {}, i = 0,
	            // Work with a copy of dataTypes in case we need to modify it for conversion
	            dataTypes = s.dataTypes.slice(), prev = dataTypes[0];
	        // Apply the dataFilter if provided
	        if (s.dataFilter) {
	            response = s.dataFilter(response, s.dataType);
	        }
	        // Create converters map with lowercased keys
	        if (dataTypes[1]) {
	            for (conv in s.converters) {
	                converters[conv.toLowerCase()] = s.converters[conv];
	            }
	        }
	        // Convert to each sequential dataType, tolerating list modification
	        for (; current = dataTypes[++i];) {
	            // There's only work to do if current dataType is non-auto
	            if (current !== '*') {
	                // Convert response if prev dataType is non-auto and differs from current
	                if (prev !== '*' && prev !== current) {
	                    // Seek a direct converter
	                    conv = converters[prev + ' ' + current] || converters['* ' + current];
	                    // If none found, seek a pair
	                    if (!conv) {
	                        for (conv2 in converters) {
	                            // If conv2 outputs current
	                            tmp = conv2.split(' ');
	                            if (tmp[1] === current) {
	                                // If prev can be converted to accepted input
	                                conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
	                                if (conv) {
	                                    // Condense equivalence converters
	                                    if (conv === true) {
	                                        conv = converters[conv2];    // Otherwise, insert the intermediate dataType
	                                    } else if (converters[conv2] !== true) {
	                                        current = tmp[0];
	                                        dataTypes.splice(i--, 0, current);
	                                    }
	                                    break;
	                                }
	                            }
	                        }
	                    }
	                    // Apply converter (if not an equivalence)
	                    if (conv !== true) {
	                        // Unless errors are allowed to bubble, catch and return them
	                        if (conv && s['throws']) {
	                            response = conv(response);
	                        } else {
	                            try {
	                                response = conv(response);
	                            } catch (e) {
	                                return {
	                                    state: 'parsererror',
	                                    error: conv ? e : 'No conversion from ' + prev + ' to ' + current
	                                };
	                            }
	                        }
	                    }
	                }
	                // Update prev for next iteration
	                prev = current;
	            }
	        }
	        return {
	            state: 'success',
	            data: response
	        };
	    }
	    // Install script dataType
	    jQuery.ajaxSetup({
	        accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
	        contents: { script: /(?:java|ecma)script/ },
	        converters: {
	            'text script': function (text) {
	                jQuery.globalEval(text);
	                return text;
	            }
	        }
	    });
	    // Handle cache's special case and global
	    jQuery.ajaxPrefilter('script', function (s) {
	        if (s.cache === undefined) {
	            s.cache = false;
	        }
	        if (s.crossDomain) {
	            s.type = 'GET';
	            s.global = false;
	        }
	    });
	    // Bind script tag hack transport
	    jQuery.ajaxTransport('script', function (s) {
	        // This transport only deals with cross domain requests
	        if (s.crossDomain) {
	            var script, head = document.head || jQuery('head')[0] || document.documentElement;
	            return {
	                send: function (_, callback) {
	                    script = document.createElement('script');
	                    script.async = true;
	                    if (s.scriptCharset) {
	                        script.charset = s.scriptCharset;
	                    }
	                    script.src = s.url;
	                    // Attach handlers for all browsers
	                    script.onload = script.onreadystatechange = function (_, isAbort) {
	                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
	                            // Handle memory leak in IE
	                            script.onload = script.onreadystatechange = null;
	                            // Remove the script
	                            if (script.parentNode) {
	                                script.parentNode.removeChild(script);
	                            }
	                            // Dereference the script
	                            script = null;
	                            // Callback if not abort
	                            if (!isAbort) {
	                                callback(200, 'success');
	                            }
	                        }
	                    };
	                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
	                    // Use native DOM manipulation to avoid our domManip AJAX trickery
	                    head.insertBefore(script, head.firstChild);
	                },
	                abort: function () {
	                    if (script) {
	                        script.onload(undefined, true);
	                    }
	                }
	            };
	        }
	    });
	    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
	    // Default jsonp settings
	    jQuery.ajaxSetup({
	        jsonp: 'callback',
	        jsonpCallback: function () {
	            var callback = oldCallbacks.pop() || jQuery.expando + '_' + ajax_nonce++;
	            this[callback] = true;
	            return callback;
	        }
	    });
	    // Detect, normalize options and install callbacks for jsonp requests
	    jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
	        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? 'url' : typeof s.data === 'string' && !(s.contentType || '').indexOf('application/x-www-form-urlencoded') && rjsonp.test(s.data) && 'data');
	        // Handle iff the expected data type is "jsonp" or we have a parameter to set
	        if (jsonProp || s.dataTypes[0] === 'jsonp') {
	            // Get callback name, remembering preexisting value associated with it
	            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
	            // Insert callback into url or form data
	            if (jsonProp) {
	                s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName);
	            } else if (s.jsonp !== false) {
	                s.url += (ajax_rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName;
	            }
	            // Use data converter to retrieve json after script execution
	            s.converters['script json'] = function () {
	                if (!responseContainer) {
	                    jQuery.error(callbackName + ' was not called');
	                }
	                return responseContainer[0];
	            };
	            // force json dataType
	            s.dataTypes[0] = 'json';
	            // Install callback
	            overwritten = window[callbackName];
	            window[callbackName] = function () {
	                responseContainer = arguments;
	            };
	            // Clean-up function (fires after converters)
	            jqXHR.always(function () {
	                // Restore preexisting value
	                window[callbackName] = overwritten;
	                // Save back as free
	                if (s[callbackName]) {
	                    // make sure that re-using the options doesn't screw things around
	                    s.jsonpCallback = originalSettings.jsonpCallback;
	                    // save the callback name for future use
	                    oldCallbacks.push(callbackName);
	                }
	                // Call if it was a function and we have a response
	                if (responseContainer && jQuery.isFunction(overwritten)) {
	                    overwritten(responseContainer[0]);
	                }
	                responseContainer = overwritten = undefined;
	            });
	            // Delegate to script
	            return 'script';
	        }
	    });
	    var xhrCallbacks, xhrSupported, xhrId = 0,
	        // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	        xhrOnUnloadAbort = window.ActiveXObject && function () {
	            // Abort all pending requests
	            var key;
	            for (key in xhrCallbacks) {
	                xhrCallbacks[key](undefined, true);
	            }
	        };
	    // Functions to create xhrs
	    function createStandardXHR() {
	        try {
	            return new window.XMLHttpRequest();
	        } catch (e) {
	        }
	    }
	    function createActiveXHR() {
	        try {
	            return new window.ActiveXObject('Microsoft.XMLHTTP');
	        } catch (e) {
	        }
	    }
	    // Create the request object
	    // (This is still attached to ajaxSettings for backward compatibility)
	    jQuery.ajaxSettings.xhr = window.ActiveXObject ? /* Microsoft failed to properly
		 * implement the XMLHttpRequest in IE7 (can't request local files),
		 * so we use the ActiveXObject when it is available
		 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
		 * we need a fallback.
		 */
	    function () {
	        return !this.isLocal && createStandardXHR() || createActiveXHR();
	    } : // For all other browsers, use the standard XMLHttpRequest object
	    createStandardXHR;
	    // Determine support properties
	    xhrSupported = jQuery.ajaxSettings.xhr();
	    jQuery.support.cors = !!xhrSupported && 'withCredentials' in xhrSupported;
	    xhrSupported = jQuery.support.ajax = !!xhrSupported;
	    // Create transport if the browser can provide an xhr
	    if (xhrSupported) {
	        jQuery.ajaxTransport(function (s) {
	            // Cross domain only allowed if supported through XMLHttpRequest
	            if (!s.crossDomain || jQuery.support.cors) {
	                var callback;
	                return {
	                    send: function (headers, complete) {
	                        // Get a new xhr
	                        var handle, i, xhr = s.xhr();
	                        // Open the socket
	                        // Passing null username, generates a login popup on Opera (#2865)
	                        if (s.username) {
	                            xhr.open(s.type, s.url, s.async, s.username, s.password);
	                        } else {
	                            xhr.open(s.type, s.url, s.async);
	                        }
	                        // Apply custom fields if provided
	                        if (s.xhrFields) {
	                            for (i in s.xhrFields) {
	                                xhr[i] = s.xhrFields[i];
	                            }
	                        }
	                        // Override mime type if needed
	                        if (s.mimeType && xhr.overrideMimeType) {
	                            xhr.overrideMimeType(s.mimeType);
	                        }
	                        // X-Requested-With header
	                        // For cross-domain requests, seeing as conditions for a preflight are
	                        // akin to a jigsaw puzzle, we simply never set it to be sure.
	                        // (it can always be set on a per-request basis or even using ajaxSetup)
	                        // For same-domain requests, won't change header if already provided.
	                        if (!s.crossDomain && !headers['X-Requested-With']) {
	                            headers['X-Requested-With'] = 'XMLHttpRequest';
	                        }
	                        // Need an extra try/catch for cross domain requests in Firefox 3
	                        try {
	                            for (i in headers) {
	                                xhr.setRequestHeader(i, headers[i]);
	                            }
	                        } catch (err) {
	                        }
	                        // Do send the request
	                        // This may raise an exception which is actually
	                        // handled in jQuery.ajax (so no try/catch here)
	                        xhr.send(s.hasContent && s.data || null);
	                        // Listener
	                        callback = function (_, isAbort) {
	                            var status, responseHeaders, statusText, responses;
	                            // Firefox throws exceptions when accessing properties
	                            // of an xhr when a network error occurred
	                            // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
	                            try {
	                                // Was never called and is aborted or complete
	                                if (callback && (isAbort || xhr.readyState === 4)) {
	                                    // Only called once
	                                    callback = undefined;
	                                    // Do not keep as active anymore
	                                    if (handle) {
	                                        xhr.onreadystatechange = jQuery.noop;
	                                        if (xhrOnUnloadAbort) {
	                                            delete xhrCallbacks[handle];
	                                        }
	                                    }
	                                    // If it's an abort
	                                    if (isAbort) {
	                                        // Abort it manually if needed
	                                        if (xhr.readyState !== 4) {
	                                            xhr.abort();
	                                        }
	                                    } else {
	                                        responses = {};
	                                        status = xhr.status;
	                                        responseHeaders = xhr.getAllResponseHeaders();
	                                        // When requesting binary data, IE6-9 will throw an exception
	                                        // on any attempt to access responseText (#11426)
	                                        if (typeof xhr.responseText === 'string') {
	                                            responses.text = xhr.responseText;
	                                        }
	                                        // Firefox throws an exception when accessing
	                                        // statusText for faulty cross-domain requests
	                                        try {
	                                            statusText = xhr.statusText;
	                                        } catch (e) {
	                                            // We normalize with Webkit giving an empty statusText
	                                            statusText = '';
	                                        }
	                                        // Filter status for non standard behaviors
	                                        // If the request is local and we have data: assume a success
	                                        // (success with no data won't get notified, that's the best we
	                                        // can do given current implementations)
	                                        if (!status && s.isLocal && !s.crossDomain) {
	                                            status = responses.text ? 200 : 404;    // IE - #1450: sometimes returns 1223 when it should be 204
	                                        } else if (status === 1223) {
	                                            status = 204;
	                                        }
	                                    }
	                                }
	                            } catch (firefoxAccessException) {
	                                if (!isAbort) {
	                                    complete(-1, firefoxAccessException);
	                                }
	                            }
	                            // Call complete if needed
	                            if (responses) {
	                                complete(status, statusText, responses, responseHeaders);
	                            }
	                        };
	                        if (!s.async) {
	                            // if we're in sync mode we fire the callback
	                            callback();
	                        } else if (xhr.readyState === 4) {
	                            // (IE6 & IE7) if it's in cache and has been
	                            // retrieved directly we need to fire the callback
	                            setTimeout(callback);
	                        } else {
	                            handle = ++xhrId;
	                            if (xhrOnUnloadAbort) {
	                                // Create the active xhrs callbacks list if needed
	                                // and attach the unload handler
	                                if (!xhrCallbacks) {
	                                    xhrCallbacks = {};
	                                    jQuery(window).unload(xhrOnUnloadAbort);
	                                }
	                                // Add to list of active xhrs callbacks
	                                xhrCallbacks[handle] = callback;
	                            }
	                            xhr.onreadystatechange = callback;
	                        }
	                    },
	                    abort: function () {
	                        if (callback) {
	                            callback(undefined, true);
	                        }
	                    }
	                };
	            }
	        });
	    }
	    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp('^(?:([+-])=|)(' + core_pnum + ')([a-z%]*)$', 'i'), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
	            '*': [function (prop, value) {
	                    var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1, maxIterations = 20;
	                    if (parts) {
	                        end = +parts[2];
	                        unit = parts[3] || (jQuery.cssNumber[prop] ? '' : 'px');
	                        // We need to compute starting value
	                        if (unit !== 'px' && start) {
	                            // Iteratively approximate from a nonzero starting point
	                            // Prefer the current property, because this process will be trivial if it uses the same units
	                            // Fallback to end or a simple constant
	                            start = jQuery.css(tween.elem, prop, true) || end || 1;
	                            do {
	                                // If previous iteration zeroed out, double until we get *something*
	                                // Use a string for doubling factor so we don't accidentally see scale as unchanged below
	                                scale = scale || '.5';
	                                // Adjust and apply
	                                start = start / scale;
	                                jQuery.style(tween.elem, prop, start + unit);    // Update scale, tolerating zero or NaN from tween.cur()
	                                                                                 // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
	                            } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
	                        }
	                        tween.unit = unit;
	                        tween.start = start;
	                        // If a +=/-= token was provided, we're doing a relative animation
	                        tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
	                    }
	                    return tween;
	                }]
	        };
	    // Animations created synchronously will run synchronously
	    function createFxNow() {
	        setTimeout(function () {
	            fxNow = undefined;
	        });
	        return fxNow = jQuery.now();
	    }
	    function createTweens(animation, props) {
	        jQuery.each(props, function (prop, value) {
	            var collection = (tweeners[prop] || []).concat(tweeners['*']), index = 0, length = collection.length;
	            for (; index < length; index++) {
	                if (collection[index].call(animation, prop, value)) {
	                    // we're done with this property
	                    return;
	                }
	            }
	        });
	    }
	    function Animation(elem, properties, options) {
	        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function () {
	                // don't match elem in the :animated selector
	                delete tick.elem;
	            }), tick = function () {
	                if (stopped) {
	                    return false;
	                }
	                var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
	                    // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
	                    temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
	                for (; index < length; index++) {
	                    animation.tweens[index].run(percent);
	                }
	                deferred.notifyWith(elem, [
	                    animation,
	                    percent,
	                    remaining
	                ]);
	                if (percent < 1 && length) {
	                    return remaining;
	                } else {
	                    deferred.resolveWith(elem, [animation]);
	                    return false;
	                }
	            }, animation = deferred.promise({
	                elem: elem,
	                props: jQuery.extend({}, properties),
	                opts: jQuery.extend(true, { specialEasing: {} }, options),
	                originalProperties: properties,
	                originalOptions: options,
	                startTime: fxNow || createFxNow(),
	                duration: options.duration,
	                tweens: [],
	                createTween: function (prop, end) {
	                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
	                    animation.tweens.push(tween);
	                    return tween;
	                },
	                stop: function (gotoEnd) {
	                    var index = 0,
	                        // if we are going to the end, we want to run all the tweens
	                        // otherwise we skip this part
	                        length = gotoEnd ? animation.tweens.length : 0;
	                    if (stopped) {
	                        return this;
	                    }
	                    stopped = true;
	                    for (; index < length; index++) {
	                        animation.tweens[index].run(1);
	                    }
	                    // resolve when we played the last frame
	                    // otherwise, reject
	                    if (gotoEnd) {
	                        deferred.resolveWith(elem, [
	                            animation,
	                            gotoEnd
	                        ]);
	                    } else {
	                        deferred.rejectWith(elem, [
	                            animation,
	                            gotoEnd
	                        ]);
	                    }
	                    return this;
	                }
	            }), props = animation.props;
	        propFilter(props, animation.opts.specialEasing);
	        for (; index < length; index++) {
	            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
	            if (result) {
	                return result;
	            }
	        }
	        createTweens(animation, props);
	        if (jQuery.isFunction(animation.opts.start)) {
	            animation.opts.start.call(elem, animation);
	        }
	        jQuery.fx.timer(jQuery.extend(tick, {
	            elem: elem,
	            anim: animation,
	            queue: animation.opts.queue
	        }));
	        // attach callbacks from options
	        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	    }
	    function propFilter(props, specialEasing) {
	        var value, name, index, easing, hooks;
	        // camelCase, specialEasing and expand cssHook pass
	        for (index in props) {
	            name = jQuery.camelCase(index);
	            easing = specialEasing[name];
	            value = props[index];
	            if (jQuery.isArray(value)) {
	                easing = value[1];
	                value = props[index] = value[0];
	            }
	            if (index !== name) {
	                props[name] = value;
	                delete props[index];
	            }
	            hooks = jQuery.cssHooks[name];
	            if (hooks && 'expand' in hooks) {
	                value = hooks.expand(value);
	                delete props[name];
	                // not quite $.extend, this wont overwrite keys already present.
	                // also - reusing 'index' from above because we have the correct "name"
	                for (index in value) {
	                    if (!(index in props)) {
	                        props[index] = value[index];
	                        specialEasing[index] = easing;
	                    }
	                }
	            } else {
	                specialEasing[name] = easing;
	            }
	        }
	    }
	    jQuery.Animation = jQuery.extend(Animation, {
	        tweener: function (props, callback) {
	            if (jQuery.isFunction(props)) {
	                callback = props;
	                props = ['*'];
	            } else {
	                props = props.split(' ');
	            }
	            var prop, index = 0, length = props.length;
	            for (; index < length; index++) {
	                prop = props[index];
	                tweeners[prop] = tweeners[prop] || [];
	                tweeners[prop].unshift(callback);
	            }
	        },
	        prefilter: function (callback, prepend) {
	            if (prepend) {
	                animationPrefilters.unshift(callback);
	            } else {
	                animationPrefilters.push(callback);
	            }
	        }
	    });
	    function defaultPrefilter(elem, props, opts) {
	        /*jshint validthis:true */
	        var prop, index, length, value, dataShow, toggle, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
	        // handle queue: false promises
	        if (!opts.queue) {
	            hooks = jQuery._queueHooks(elem, 'fx');
	            if (hooks.unqueued == null) {
	                hooks.unqueued = 0;
	                oldfire = hooks.empty.fire;
	                hooks.empty.fire = function () {
	                    if (!hooks.unqueued) {
	                        oldfire();
	                    }
	                };
	            }
	            hooks.unqueued++;
	            anim.always(function () {
	                // doing this makes sure that the complete handler will be called
	                // before this completes
	                anim.always(function () {
	                    hooks.unqueued--;
	                    if (!jQuery.queue(elem, 'fx').length) {
	                        hooks.empty.fire();
	                    }
	                });
	            });
	        }
	        // height/width overflow pass
	        if (elem.nodeType === 1 && ('height' in props || 'width' in props)) {
	            // Make sure that nothing sneaks out
	            // Record all 3 overflow attributes because IE does not
	            // change the overflow attribute when overflowX and
	            // overflowY are set to the same value
	            opts.overflow = [
	                style.overflow,
	                style.overflowX,
	                style.overflowY
	            ];
	            // Set display property to inline-block for height/width
	            // animations on inline elements that are having width/height animated
	            if (jQuery.css(elem, 'display') === 'inline' && jQuery.css(elem, 'float') === 'none') {
	                // inline-level elements accept inline-block;
	                // block-level elements need to be inline with layout
	                if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === 'inline') {
	                    style.display = 'inline-block';
	                } else {
	                    style.zoom = 1;
	                }
	            }
	        }
	        if (opts.overflow) {
	            style.overflow = 'hidden';
	            if (!jQuery.support.shrinkWrapBlocks) {
	                anim.always(function () {
	                    style.overflow = opts.overflow[0];
	                    style.overflowX = opts.overflow[1];
	                    style.overflowY = opts.overflow[2];
	                });
	            }
	        }
	        // show/hide pass
	        for (index in props) {
	            value = props[index];
	            if (rfxtypes.exec(value)) {
	                delete props[index];
	                toggle = toggle || value === 'toggle';
	                if (value === (hidden ? 'hide' : 'show')) {
	                    continue;
	                }
	                handled.push(index);
	            }
	        }
	        length = handled.length;
	        if (length) {
	            dataShow = jQuery._data(elem, 'fxshow') || jQuery._data(elem, 'fxshow', {});
	            if ('hidden' in dataShow) {
	                hidden = dataShow.hidden;
	            }
	            // store state if its toggle - enables .stop().toggle() to "reverse"
	            if (toggle) {
	                dataShow.hidden = !hidden;
	            }
	            if (hidden) {
	                jQuery(elem).show();
	            } else {
	                anim.done(function () {
	                    jQuery(elem).hide();
	                });
	            }
	            anim.done(function () {
	                var prop;
	                jQuery._removeData(elem, 'fxshow');
	                for (prop in orig) {
	                    jQuery.style(elem, prop, orig[prop]);
	                }
	            });
	            for (index = 0; index < length; index++) {
	                prop = handled[index];
	                tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
	                orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
	                if (!(prop in dataShow)) {
	                    dataShow[prop] = tween.start;
	                    if (hidden) {
	                        tween.end = tween.start;
	                        tween.start = prop === 'width' || prop === 'height' ? 1 : 0;
	                    }
	                }
	            }
	        }
	    }
	    function Tween(elem, options, prop, end, easing) {
	        return new Tween.prototype.init(elem, options, prop, end, easing);
	    }
	    jQuery.Tween = Tween;
	    Tween.prototype = {
	        constructor: Tween,
	        init: function (elem, options, prop, end, easing, unit) {
	            this.elem = elem;
	            this.prop = prop;
	            this.easing = easing || 'swing';
	            this.options = options;
	            this.start = this.now = this.cur();
	            this.end = end;
	            this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
	        },
	        cur: function () {
	            var hooks = Tween.propHooks[this.prop];
	            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
	        },
	        run: function (percent) {
	            var eased, hooks = Tween.propHooks[this.prop];
	            if (this.options.duration) {
	                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
	            } else {
	                this.pos = eased = percent;
	            }
	            this.now = (this.end - this.start) * eased + this.start;
	            if (this.options.step) {
	                this.options.step.call(this.elem, this.now, this);
	            }
	            if (hooks && hooks.set) {
	                hooks.set(this);
	            } else {
	                Tween.propHooks._default.set(this);
	            }
	            return this;
	        }
	    };
	    Tween.prototype.init.prototype = Tween.prototype;
	    Tween.propHooks = {
	        _default: {
	            get: function (tween) {
	                var result;
	                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
	                    return tween.elem[tween.prop];
	                }
	                // passing an empty string as a 3rd parameter to .css will automatically
	                // attempt a parseFloat and fallback to a string if the parse fails
	                // so, simple values such as "10px" are parsed to Float.
	                // complex values such as "rotate(1rad)" are returned as is.
	                result = jQuery.css(tween.elem, tween.prop, '');
	                // Empty strings, null, undefined and "auto" are converted to 0.
	                return !result || result === 'auto' ? 0 : result;
	            },
	            set: function (tween) {
	                // use step hook for back compat - use cssHook if its there - use .style if its
	                // available and use plain properties where available
	                if (jQuery.fx.step[tween.prop]) {
	                    jQuery.fx.step[tween.prop](tween);
	                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
	                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
	                } else {
	                    tween.elem[tween.prop] = tween.now;
	                }
	            }
	        }
	    };
	    // Remove in 2.0 - this supports IE8's panic based approach
	    // to setting things on disconnected nodes
	    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	        set: function (tween) {
	            if (tween.elem.nodeType && tween.elem.parentNode) {
	                tween.elem[tween.prop] = tween.now;
	            }
	        }
	    };
	    jQuery.each([
	        'toggle',
	        'show',
	        'hide'
	    ], function (i, name) {
	        var cssFn = jQuery.fn[name];
	        jQuery.fn[name] = function (speed, easing, callback) {
	            return speed == null || typeof speed === 'boolean' ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
	        };
	    });
	    jQuery.fn.extend({
	        fadeTo: function (speed, to, easing, callback) {
	            // show any hidden elements after setting opacity to 0
	            return this.filter(isHidden).css('opacity', 0).show()    // animate to the value specified
	.end().animate({ opacity: to }, speed, easing, callback);
	        },
	        animate: function (prop, speed, easing, callback) {
	            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
	                    // Operate on a copy of prop so per-property easing won't be lost
	                    var anim = Animation(this, jQuery.extend({}, prop), optall);
	                    doAnimation.finish = function () {
	                        anim.stop(true);
	                    };
	                    // Empty animations, or finishing resolves immediately
	                    if (empty || jQuery._data(this, 'finish')) {
	                        anim.stop(true);
	                    }
	                };
	            doAnimation.finish = doAnimation;
	            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
	        },
	        stop: function (type, clearQueue, gotoEnd) {
	            var stopQueue = function (hooks) {
	                var stop = hooks.stop;
	                delete hooks.stop;
	                stop(gotoEnd);
	            };
	            if (typeof type !== 'string') {
	                gotoEnd = clearQueue;
	                clearQueue = type;
	                type = undefined;
	            }
	            if (clearQueue && type !== false) {
	                this.queue(type || 'fx', []);
	            }
	            return this.each(function () {
	                var dequeue = true, index = type != null && type + 'queueHooks', timers = jQuery.timers, data = jQuery._data(this);
	                if (index) {
	                    if (data[index] && data[index].stop) {
	                        stopQueue(data[index]);
	                    }
	                } else {
	                    for (index in data) {
	                        if (data[index] && data[index].stop && rrun.test(index)) {
	                            stopQueue(data[index]);
	                        }
	                    }
	                }
	                for (index = timers.length; index--;) {
	                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
	                        timers[index].anim.stop(gotoEnd);
	                        dequeue = false;
	                        timers.splice(index, 1);
	                    }
	                }
	                // start the next in the queue if the last step wasn't forced
	                // timers currently will call their complete callbacks, which will dequeue
	                // but only if they were gotoEnd
	                if (dequeue || !gotoEnd) {
	                    jQuery.dequeue(this, type);
	                }
	            });
	        },
	        finish: function (type) {
	            if (type !== false) {
	                type = type || 'fx';
	            }
	            return this.each(function () {
	                var index, data = jQuery._data(this), queue = data[type + 'queue'], hooks = data[type + 'queueHooks'], timers = jQuery.timers, length = queue ? queue.length : 0;
	                // enable finishing flag on private data
	                data.finish = true;
	                // empty the queue first
	                jQuery.queue(this, type, []);
	                if (hooks && hooks.cur && hooks.cur.finish) {
	                    hooks.cur.finish.call(this);
	                }
	                // look for any active animations, and finish them
	                for (index = timers.length; index--;) {
	                    if (timers[index].elem === this && timers[index].queue === type) {
	                        timers[index].anim.stop(true);
	                        timers.splice(index, 1);
	                    }
	                }
	                // look for any animations in the old queue and finish them
	                for (index = 0; index < length; index++) {
	                    if (queue[index] && queue[index].finish) {
	                        queue[index].finish.call(this);
	                    }
	                }
	                // turn off finishing flag
	                delete data.finish;
	            });
	        }
	    });
	    // Generate parameters to create a standard animation
	    function genFx(type, includeWidth) {
	        var which, attrs = { height: type }, i = 0;
	        // if we include width, step value is 1 to do all cssExpand values,
	        // if we don't include width, step value is 2 to skip over Left and Right
	        includeWidth = includeWidth ? 1 : 0;
	        for (; i < 4; i += 2 - includeWidth) {
	            which = cssExpand[i];
	            attrs['margin' + which] = attrs['padding' + which] = type;
	        }
	        if (includeWidth) {
	            attrs.opacity = attrs.width = type;
	        }
	        return attrs;
	    }
	    // Generate shortcuts for custom animations
	    jQuery.each({
	        slideDown: genFx('show'),
	        slideUp: genFx('hide'),
	        slideToggle: genFx('toggle'),
	        fadeIn: { opacity: 'show' },
	        fadeOut: { opacity: 'hide' },
	        fadeToggle: { opacity: 'toggle' }
	    }, function (name, props) {
	        jQuery.fn[name] = function (speed, easing, callback) {
	            return this.animate(props, speed, easing, callback);
	        };
	    });
	    jQuery.speed = function (speed, easing, fn) {
	        var opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
	            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
	            duration: speed,
	            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
	        };
	        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === 'number' ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
	        // normalize opt.queue - true/undefined/null -> "fx"
	        if (opt.queue == null || opt.queue === true) {
	            opt.queue = 'fx';
	        }
	        // Queueing
	        opt.old = opt.complete;
	        opt.complete = function () {
	            if (jQuery.isFunction(opt.old)) {
	                opt.old.call(this);
	            }
	            if (opt.queue) {
	                jQuery.dequeue(this, opt.queue);
	            }
	        };
	        return opt;
	    };
	    jQuery.easing = {
	        linear: function (p) {
	            return p;
	        },
	        swing: function (p) {
	            return 0.5 - Math.cos(p * Math.PI) / 2;
	        }
	    };
	    jQuery.timers = [];
	    jQuery.fx = Tween.prototype.init;
	    jQuery.fx.tick = function () {
	        var timer, timers = jQuery.timers, i = 0;
	        fxNow = jQuery.now();
	        for (; i < timers.length; i++) {
	            timer = timers[i];
	            // Checks the timer has not already been removed
	            if (!timer() && timers[i] === timer) {
	                timers.splice(i--, 1);
	            }
	        }
	        if (!timers.length) {
	            jQuery.fx.stop();
	        }
	        fxNow = undefined;
	    };
	    jQuery.fx.timer = function (timer) {
	        if (timer() && jQuery.timers.push(timer)) {
	            jQuery.fx.start();
	        }
	    };
	    jQuery.fx.interval = 13;
	    jQuery.fx.start = function () {
	        if (!timerId) {
	            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
	        }
	    };
	    jQuery.fx.stop = function () {
	        clearInterval(timerId);
	        timerId = null;
	    };
	    jQuery.fx.speeds = {
	        slow: 600,
	        fast: 200,
	        // Default speed
	        _default: 400
	    };
	    // Back Compat <1.8 extension point
	    jQuery.fx.step = {};
	    if (jQuery.expr && jQuery.expr.filters) {
	        jQuery.expr.filters.animated = function (elem) {
	            return jQuery.grep(jQuery.timers, function (fn) {
	                return elem === fn.elem;
	            }).length;
	        };
	    }
	    jQuery.fn.offset = function (options) {
	        if (arguments.length) {
	            return options === undefined ? this : this.each(function (i) {
	                jQuery.offset.setOffset(this, options, i);
	            });
	        }
	        var docElem, win, box = {
	                top: 0,
	                left: 0
	            }, elem = this[0], doc = elem && elem.ownerDocument;
	        if (!doc) {
	            return;
	        }
	        docElem = doc.documentElement;
	        // Make sure it's not a disconnected DOM node
	        if (!jQuery.contains(docElem, elem)) {
	            return box;
	        }
	        // If we don't have gBCR, just use 0,0 rather than error
	        // BlackBerry 5, iOS 3 (original iPhone)
	        if (typeof elem.getBoundingClientRect !== core_strundefined) {
	            box = elem.getBoundingClientRect();
	        }
	        win = getWindow(doc);
	        return {
	            top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	            left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
	        };
	    };
	    jQuery.offset = {
	        setOffset: function (elem, options, i) {
	            var position = jQuery.css(elem, 'position');
	            // set position first, in-case top/left are set even on static elem
	            if (position === 'static') {
	                elem.style.position = 'relative';
	            }
	            var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, 'top'), curCSSLeft = jQuery.css(elem, 'left'), calculatePosition = (position === 'absolute' || position === 'fixed') && jQuery.inArray('auto', [
	                    curCSSTop,
	                    curCSSLeft
	                ]) > -1, props = {}, curPosition = {}, curTop, curLeft;
	            // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
	            if (calculatePosition) {
	                curPosition = curElem.position();
	                curTop = curPosition.top;
	                curLeft = curPosition.left;
	            } else {
	                curTop = parseFloat(curCSSTop) || 0;
	                curLeft = parseFloat(curCSSLeft) || 0;
	            }
	            if (jQuery.isFunction(options)) {
	                options = options.call(elem, i, curOffset);
	            }
	            if (options.top != null) {
	                props.top = options.top - curOffset.top + curTop;
	            }
	            if (options.left != null) {
	                props.left = options.left - curOffset.left + curLeft;
	            }
	            if ('using' in options) {
	                options.using.call(elem, props);
	            } else {
	                curElem.css(props);
	            }
	        }
	    };
	    jQuery.fn.extend({
	        position: function () {
	            if (!this[0]) {
	                return;
	            }
	            var offsetParent, offset, parentOffset = {
	                    top: 0,
	                    left: 0
	                }, elem = this[0];
	            // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
	            if (jQuery.css(elem, 'position') === 'fixed') {
	                // we assume that getBoundingClientRect is available when computed position is fixed
	                offset = elem.getBoundingClientRect();
	            } else {
	                // Get *real* offsetParent
	                offsetParent = this.offsetParent();
	                // Get correct offsets
	                offset = this.offset();
	                if (!jQuery.nodeName(offsetParent[0], 'html')) {
	                    parentOffset = offsetParent.offset();
	                }
	                // Add offsetParent borders
	                parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', true);
	                parentOffset.left += jQuery.css(offsetParent[0], 'borderLeftWidth', true);
	            }
	            // Subtract parent offsets and element margins
	            // note: when an element has margin: auto the offsetLeft and marginLeft
	            // are the same in Safari causing offset.left to incorrectly be 0
	            return {
	                top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
	                left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
	            };
	        },
	        offsetParent: function () {
	            return this.map(function () {
	                var offsetParent = this.offsetParent || document.documentElement;
	                while (offsetParent && (!jQuery.nodeName(offsetParent, 'html') && jQuery.css(offsetParent, 'position') === 'static')) {
	                    offsetParent = offsetParent.offsetParent;
	                }
	                return offsetParent || document.documentElement;
	            });
	        }
	    });
	    // Create scrollLeft and scrollTop methods
	    jQuery.each({
	        scrollLeft: 'pageXOffset',
	        scrollTop: 'pageYOffset'
	    }, function (method, prop) {
	        var top = /Y/.test(prop);
	        jQuery.fn[method] = function (val) {
	            return jQuery.access(this, function (elem, method, val) {
	                var win = getWindow(elem);
	                if (val === undefined) {
	                    return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
	                }
	                if (win) {
	                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
	                } else {
	                    elem[method] = val;
	                }
	            }, method, val, arguments.length, null);
	        };
	    });
	    function getWindow(elem) {
	        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
	    }
	    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	    jQuery.each({
	        Height: 'height',
	        Width: 'width'
	    }, function (name, type) {
	        jQuery.each({
	            padding: 'inner' + name,
	            content: type,
	            '': 'outer' + name
	        }, function (defaultExtra, funcName) {
	            // margin is only for outerHeight, outerWidth
	            jQuery.fn[funcName] = function (margin, value) {
	                var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'), extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');
	                return jQuery.access(this, function (elem, type, value) {
	                    var doc;
	                    if (jQuery.isWindow(elem)) {
	                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
	                        // isn't a whole lot we can do. See pull request at this URL for discussion:
	                        // https://github.com/jquery/jquery/pull/764
	                        return elem.document.documentElement['client' + name];
	                    }
	                    // Get document width or height
	                    if (elem.nodeType === 9) {
	                        doc = elem.documentElement;
	                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
	                        // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
	                        return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
	                    }
	                    return value === undefined ? // Get width or height on the element, requesting but not forcing parseFloat
	                    jQuery.css(elem, type, extra) : // Set width or height on the element
	                    jQuery.style(elem, type, value, extra);
	                }, type, chainable ? margin : undefined, chainable, null);
	            };
	        });
	    });
	    // Limit scope pollution from any deprecated API
	    // (function() {
	    // })();
	    // Expose jQuery to the global object
	    window.jQuery = window.$ = jQuery;
	    
	    module.exports = jQuery || module.exports;;
	}(window));

/***/ }
/******/ ]);