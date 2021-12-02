'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('element-closest-polyfill');
var React = require('react');
var axios = require('axios');
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var Op = Object.prototype;
var hasOwn = Op.hasOwnProperty;
var undefined$1; // More compressible than void 0.
var $Symbol = typeof Symbol === "function" ? Symbol : {};
var iteratorSymbol = $Symbol.iterator || "@@iterator";
var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

function wrap(innerFn, outerFn, self, tryLocsList) {
  // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
  var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
  var generator = Object.create(protoGenerator.prototype);
  var context = new Context(tryLocsList || []);

  // The ._invoke method unifies the implementations of the .next,
  // .throw, and .return methods.
  generator._invoke = makeInvokeMethod(innerFn, self, context);

  return generator;
}

// Try/catch helper to minimize deoptimizations. Returns a completion
// record like context.tryEntries[i].completion. This interface could
// have been (and was previously) designed to take a closure to be
// invoked without arguments, but in all the cases we care about we
// already have an existing method we want to call, so there's no need
// to create a new function object. We can even get away with assuming
// the method takes exactly one argument, since that happens to be true
// in every case, so we don't have to touch the arguments object. The
// only additional allocation required is the completion record, which
// has a stable shape and so hopefully should be cheap to allocate.
function tryCatch(fn, obj, arg) {
  try {
    return { type: "normal", arg: fn.call(obj, arg) };
  } catch (err) {
    return { type: "throw", arg: err };
  }
}

var GenStateSuspendedStart = "suspendedStart";
var GenStateSuspendedYield = "suspendedYield";
var GenStateExecuting = "executing";
var GenStateCompleted = "completed";

// Returning this object from the innerFn has the same effect as
// breaking out of the dispatch switch statement.
var ContinueSentinel = {};

// Dummy constructor functions that we use as the .constructor and
// .constructor.prototype properties for functions that return Generator
// objects. For full spec compliance, you may wish to configure your
// minifier not to mangle the names of these two functions.
function Generator() {}
function GeneratorFunction() {}
function GeneratorFunctionPrototype() {}

// This is a polyfill for %IteratorPrototype% for environments that
// don't natively support it.
var IteratorPrototype = {};
IteratorPrototype[iteratorSymbol] = function () {
  return this;
};

var getProto = Object.getPrototypeOf;
var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
if (NativeIteratorPrototype &&
  NativeIteratorPrototype !== Op &&
  hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
  // This environment has a native %IteratorPrototype%; use it instead
  // of the polyfill.
  IteratorPrototype = NativeIteratorPrototype;
}

var Gp = GeneratorFunctionPrototype.prototype =
  Generator.prototype = Object.create(IteratorPrototype);
GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
GeneratorFunctionPrototype.constructor = GeneratorFunction;
GeneratorFunctionPrototype[toStringTagSymbol] =
  GeneratorFunction.displayName = "GeneratorFunction";

// Helper for defining the .next, .throw, and .return methods of the
// Iterator interface in terms of a single ._invoke method.
function defineIteratorMethods(prototype) {
  ["next", "throw", "return"].forEach(function(method) {
    prototype[method] = function(arg) {
      return this._invoke(method, arg);
    };
  });
}

function isGeneratorFunction (genFun) {
  var ctor = typeof genFun === "function" && genFun.constructor;
  return ctor
    ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction"
    : false;
}
function mark (genFun) {
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
  } else {
    genFun.__proto__ = GeneratorFunctionPrototype;
    if (!(toStringTagSymbol in genFun)) {
      genFun[toStringTagSymbol] = "GeneratorFunction";
    }
  }
  genFun.prototype = Object.create(Gp);
  return genFun;
}
// Within the body of any async function, `await x` is transformed to
// `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
// `hasOwn.call(value, "__await")` to determine if the yielded value is
// meant to be awaited.
function awrap (arg) {
  return { __await: arg };
}
function AsyncIterator(generator, PromiseImpl) {
  function invoke(method, arg, resolve, reject) {
    var record = tryCatch(generator[method], generator, arg);
    if (record.type === "throw") {
      reject(record.arg);
    } else {
      var result = record.arg;
      var value = result.value;
      if (value &&
        typeof value === "object" &&
        hasOwn.call(value, "__await")) {
        return PromiseImpl.resolve(value.__await).then(function(value) {
          invoke("next", value, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        });
      }

      return PromiseImpl.resolve(value).then(function(unwrapped) {
        // When a yielded Promise is resolved, its final value becomes
        // the .value of the Promise<{value,done}> result for the
        // current iteration.
        result.value = unwrapped;
        resolve(result);
      }, function(error) {
        // If a rejected Promise was yielded, throw the rejection back
        // into the async generator function so it can be handled there.
        return invoke("throw", error, resolve, reject);
      });
    }
  }

  var previousPromise;

  function enqueue(method, arg) {
    function callInvokeWithMethodAndArg() {
      return new PromiseImpl(function(resolve, reject) {
        invoke(method, arg, resolve, reject);
      });
    }

    return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(
        callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg
      ) : callInvokeWithMethodAndArg();
  }

  // Define the unified helper method that is used to implement .next,
  // .throw, and .return (see defineIteratorMethods).
  this._invoke = enqueue;
}

defineIteratorMethods(AsyncIterator.prototype);
AsyncIterator.prototype[asyncIteratorSymbol] = function () {
  return this;
};

// Note that simple async functions are implemented on top of
// AsyncIterator objects; they just return a Promise for the value of
// the final result produced by the iterator.
 function async (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
  if (PromiseImpl === void 0) PromiseImpl = Promise;

  var iter = new AsyncIterator(
    wrap(innerFn, outerFn, self, tryLocsList),
    PromiseImpl
  );

  return isGeneratorFunction(outerFn)
    ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function(result) {
      return result.done ? result.value : iter.next();
    });
}
function makeInvokeMethod(innerFn, self, context) {
  var state = GenStateSuspendedStart;

  return function invoke(method, arg) {
    if (state === GenStateExecuting) {
      throw new Error("Generator is already running");
    }

    if (state === GenStateCompleted) {
      if (method === "throw") {
        throw arg;
      }

      // Be forgiving, per 25.3.3.3.3 of the spec:
      // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
      return doneResult();
    }

    context.method = method;
    context.arg = arg;

    while (true) {
      var delegate = context.delegate;
      if (delegate) {
        var delegateResult = maybeInvokeDelegate(delegate, context);
        if (delegateResult) {
          if (delegateResult === ContinueSentinel) continue;
          return delegateResult;
        }
      }

      if (context.method === "next") {
        // Setting context._sent for legacy support of Babel's
        // function.sent implementation.
        context.sent = context._sent = context.arg;

      } else if (context.method === "throw") {
        if (state === GenStateSuspendedStart) {
          state = GenStateCompleted;
          throw context.arg;
        }

        context.dispatchException(context.arg);

      } else if (context.method === "return") {
        context.abrupt("return", context.arg);
      }

      state = GenStateExecuting;

      var record = tryCatch(innerFn, self, context);
      if (record.type === "normal") {
        // If an exception is thrown from innerFn, we leave state ===
        // GenStateExecuting and loop back for another invocation.
        state = context.done
          ? GenStateCompleted
          : GenStateSuspendedYield;

        if (record.arg === ContinueSentinel) {
          continue;
        }

        return {
          value: record.arg,
          done: context.done
        };

      } else if (record.type === "throw") {
        state = GenStateCompleted;
        // Dispatch the exception by looping back around to the
        // context.dispatchException(context.arg) call above.
        context.method = "throw";
        context.arg = record.arg;
      }
    }
  };
}

// Call delegate.iterator[context.method](context.arg) and handle the
// result, either by returning a { value, done } result from the
// delegate iterator, or by modifying context.method and context.arg,
// setting context.delegate to null, and returning the ContinueSentinel.
function maybeInvokeDelegate(delegate, context) {
  var method = delegate.iterator[context.method];
  if (method === undefined$1) {
    // A .throw or .return when the delegate iterator has no .throw
    // method always terminates the yield* loop.
    context.delegate = null;

    if (context.method === "throw") {
      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (delegate.iterator["return"]) {
        // If the delegate iterator has a return method, give it a
        // chance to clean up.
        context.method = "return";
        context.arg = undefined$1;
        maybeInvokeDelegate(delegate, context);

        if (context.method === "throw") {
          // If maybeInvokeDelegate(context) changed context.method from
          // "return" to "throw", let that override the TypeError below.
          return ContinueSentinel;
        }
      }

      context.method = "throw";
      context.arg = new TypeError(
        "The iterator does not provide a 'throw' method");
    }

    return ContinueSentinel;
  }

  var record = tryCatch(method, delegate.iterator, context.arg);

  if (record.type === "throw") {
    context.method = "throw";
    context.arg = record.arg;
    context.delegate = null;
    return ContinueSentinel;
  }

  var info = record.arg;

  if (! info) {
    context.method = "throw";
    context.arg = new TypeError("iterator result is not an object");
    context.delegate = null;
    return ContinueSentinel;
  }

  if (info.done) {
    // Assign the result of the finished delegate to the temporary
    // variable specified by delegate.resultName (see delegateYield).
    context[delegate.resultName] = info.value;

    // Resume execution at the desired location (see delegateYield).
    context.next = delegate.nextLoc;

    // If context.method was "throw" but the delegate handled the
    // exception, let the outer generator proceed normally. If
    // context.method was "next", forget context.arg since it has been
    // "consumed" by the delegate iterator. If context.method was
    // "return", allow the original .return call to continue in the
    // outer generator.
    if (context.method !== "return") {
      context.method = "next";
      context.arg = undefined$1;
    }

  } else {
    // Re-yield the result returned by the delegate method.
    return info;
  }

  // The delegate iterator is finished, so forget it and continue with
  // the outer generator.
  context.delegate = null;
  return ContinueSentinel;
}

// Define Generator.prototype.{next,throw,return} in terms of the
// unified ._invoke helper method.
defineIteratorMethods(Gp);

Gp[toStringTagSymbol] = "Generator";

// A Generator should always return itself as the iterator object when the
// @@iterator function is called on it. Some browsers' implementations of the
// iterator prototype chain incorrectly implement this, causing the Generator
// object to not be returned from this call. This ensures that doesn't happen.
// See https://github.com/facebook/regenerator/issues/274 for more details.
Gp[iteratorSymbol] = function() {
  return this;
};

Gp.toString = function() {
  return "[object Generator]";
};

function pushTryEntry(locs) {
  var entry = { tryLoc: locs[0] };

  if (1 in locs) {
    entry.catchLoc = locs[1];
  }

  if (2 in locs) {
    entry.finallyLoc = locs[2];
    entry.afterLoc = locs[3];
  }

  this.tryEntries.push(entry);
}

function resetTryEntry(entry) {
  var record = entry.completion || {};
  record.type = "normal";
  delete record.arg;
  entry.completion = record;
}

function Context(tryLocsList) {
  // The root entry object (effectively a try statement without a catch
  // or a finally block) gives us a place to store values thrown from
  // locations where there is no enclosing try statement.
  this.tryEntries = [{ tryLoc: "root" }];
  tryLocsList.forEach(pushTryEntry, this);
  this.reset(true);
}

function keys (object) {
  var keys = [];
  for (var key in object) {
    keys.push(key);
  }
  keys.reverse();

  // Rather than returning an object with a next method, we keep
  // things simple and return the next function itself.
  return function next() {
    while (keys.length) {
      var key = keys.pop();
      if (key in object) {
        next.value = key;
        next.done = false;
        return next;
      }
    }

    // To avoid creating an additional object, we just hang the .value
    // and .done properties off the next function object itself. This
    // also ensures that the minifier will not anonymize the function.
    next.done = true;
    return next;
  };
}
function values(iterable) {
  if (iterable) {
    var iteratorMethod = iterable[iteratorSymbol];
    if (iteratorMethod) {
      return iteratorMethod.call(iterable);
    }

    if (typeof iterable.next === "function") {
      return iterable;
    }

    if (!isNaN(iterable.length)) {
      var i = -1, next = function next() {
        while (++i < iterable.length) {
          if (hasOwn.call(iterable, i)) {
            next.value = iterable[i];
            next.done = false;
            return next;
          }
        }

        next.value = undefined$1;
        next.done = true;

        return next;
      };

      return next.next = next;
    }
  }

  // Return an iterator with no values.
  return { next: doneResult };
}

function doneResult() {
  return { value: undefined$1, done: true };
}

Context.prototype = {
  constructor: Context,

  reset: function(skipTempReset) {
    this.prev = 0;
    this.next = 0;
    // Resetting context._sent for legacy support of Babel's
    // function.sent implementation.
    this.sent = this._sent = undefined$1;
    this.done = false;
    this.delegate = null;

    this.method = "next";
    this.arg = undefined$1;

    this.tryEntries.forEach(resetTryEntry);

    if (!skipTempReset) {
      for (var name in this) {
        // Not sure about the optimal order of these conditions:
        if (name.charAt(0) === "t" &&
          hasOwn.call(this, name) &&
          !isNaN(+name.slice(1))) {
          this[name] = undefined$1;
        }
      }
    }
  },

  stop: function() {
    this.done = true;

    var rootEntry = this.tryEntries[0];
    var rootRecord = rootEntry.completion;
    if (rootRecord.type === "throw") {
      throw rootRecord.arg;
    }

    return this.rval;
  },

  dispatchException: function(exception) {
    if (this.done) {
      throw exception;
    }

    var context = this;
    function handle(loc, caught) {
      record.type = "throw";
      record.arg = exception;
      context.next = loc;

      if (caught) {
        // If the dispatched exception was caught by a catch block,
        // then let that catch block handle the exception normally.
        context.method = "next";
        context.arg = undefined$1;
      }

      return !! caught;
    }

    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
      var entry = this.tryEntries[i];
      var record = entry.completion;

      if (entry.tryLoc === "root") {
        // Exception thrown outside of any try block that could handle
        // it, so set the completion value of the entire function to
        // throw the exception.
        return handle("end");
      }

      if (entry.tryLoc <= this.prev) {
        var hasCatch = hasOwn.call(entry, "catchLoc");
        var hasFinally = hasOwn.call(entry, "finallyLoc");

        if (hasCatch && hasFinally) {
          if (this.prev < entry.catchLoc) {
            return handle(entry.catchLoc, true);
          } else if (this.prev < entry.finallyLoc) {
            return handle(entry.finallyLoc);
          }

        } else if (hasCatch) {
          if (this.prev < entry.catchLoc) {
            return handle(entry.catchLoc, true);
          }

        } else if (hasFinally) {
          if (this.prev < entry.finallyLoc) {
            return handle(entry.finallyLoc);
          }

        } else {
          throw new Error("try statement without catch or finally");
        }
      }
    }
  },

  abrupt: function(type, arg) {
    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
      var entry = this.tryEntries[i];
      if (entry.tryLoc <= this.prev &&
        hasOwn.call(entry, "finallyLoc") &&
        this.prev < entry.finallyLoc) {
        var finallyEntry = entry;
        break;
      }
    }

    if (finallyEntry &&
      (type === "break" ||
        type === "continue") &&
      finallyEntry.tryLoc <= arg &&
      arg <= finallyEntry.finallyLoc) {
      // Ignore the finally entry if control is not jumping to a
      // location outside the try/catch block.
      finallyEntry = null;
    }

    var record = finallyEntry ? finallyEntry.completion : {};
    record.type = type;
    record.arg = arg;

    if (finallyEntry) {
      this.method = "next";
      this.next = finallyEntry.finallyLoc;
      return ContinueSentinel;
    }

    return this.complete(record);
  },

  complete: function(record, afterLoc) {
    if (record.type === "throw") {
      throw record.arg;
    }

    if (record.type === "break" ||
      record.type === "continue") {
      this.next = record.arg;
    } else if (record.type === "return") {
      this.rval = this.arg = record.arg;
      this.method = "return";
      this.next = "end";
    } else if (record.type === "normal" && afterLoc) {
      this.next = afterLoc;
    }

    return ContinueSentinel;
  },

  finish: function(finallyLoc) {
    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
      var entry = this.tryEntries[i];
      if (entry.finallyLoc === finallyLoc) {
        this.complete(entry.completion, entry.afterLoc);
        resetTryEntry(entry);
        return ContinueSentinel;
      }
    }
  },

  "catch": function(tryLoc) {
    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
      var entry = this.tryEntries[i];
      if (entry.tryLoc === tryLoc) {
        var record = entry.completion;
        if (record.type === "throw") {
          var thrown = record.arg;
          resetTryEntry(entry);
        }
        return thrown;
      }
    }

    // The context.catch method must only be called with a location
    // argument that corresponds to a known catch block.
    throw new Error("illegal catch attempt");
  },

  delegateYield: function(iterable, resultName, nextLoc) {
    this.delegate = {
      iterator: values(iterable),
      resultName: resultName,
      nextLoc: nextLoc
    };

    if (this.method === "next") {
      // Deliberately forget the last sent value so that we don't
      // accidentally pass it on to the delegate.
      this.arg = undefined$1;
    }

    return ContinueSentinel;
  }
};

// Export a default namespace that plays well with Rollup
var _regeneratorRuntime = {
  wrap,
  isGeneratorFunction,
  AsyncIterator,
  mark,
  awrap,
  async,
  keys,
  values
};

function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$d(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var globalObject = global,
    activeFormEnvConfig = globalObject.activeForm ? globalObject.activeForm : {},
    _activeFormEnvConfig$ = activeFormEnvConfig.formValidatorsSetting,
    formValidatorsSetting = _activeFormEnvConfig$ === void 0 ? {} : _activeFormEnvConfig$; //Дефолтное имя формы

var FORM_NAME = 'form'; //Слои настроек формы (из библиотеки + из global проекта)

var DEFAULT_FORM_SETTINGS = _objectSpread$d(_objectSpread$d({
  action: null,
  formName: FORM_NAME
}, activeFormEnvConfig), {}, {
  formValidatorsSetting: _objectSpread$d({
    minLength: {
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    },
    maxLength: {
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: true,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    },
    minValue: {
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    },
    maxValue: {
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    },
    required: {
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    },
    number: {
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: true,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    },
    email: {
      liveEnable: false,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    }
  }, formValidatorsSetting)
});

function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$c(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @description
 * Функция накладывающая слой настроек валидатора на контрол, из переданного ей объекта config
 *
 * @param {ControlProps} control - Контрол на который переданный слой настроек валидатора
 * @param {ValidatorsSettingList} validatorsSettingsList - Слой настроек валидатора
 *
 * @returns {void}
 *
 */
var addValidatorsSettingsLayer = function addValidatorsSettingsLayer(control, validatorsSettingsList) {
  /**
   * Слой настроек валидатора лежащий самом контроле(если он есть)
   */
  var controlValidatorsSetting = control.validatorsSetting;
  /**
   * Перебрать переданный слой настроек валидатора, и наложить на слой самого контрола
   */

  Object.keys(validatorsSettingsList).forEach(function (validatorName) {
    /**
     * 1.Текущие настройки перебираемого валидатора у контрола(нужны для склейки с передаваемым слоем)
     * 2.Настройки перебираемого валидатора из переданного слоя(нужны для склейки с сущесвтвующими настройками валидатора контрола)
     * 3.Проверка типа перебираемого валидатора
     * (isObject ? добавить настройки объекта к валидатору : isBoolean ? ) : null
     */
    var controlValidatorSettings = controlValidatorsSetting[validatorName],
        newValidatorSettingsLayer = validatorsSettingsList[validatorName],
        isObject = _typeof(newValidatorSettingsLayer) === 'object',
        isBoolean = typeof newValidatorSettingsLayer === "boolean";
    /**
     * Если передали объект, наложить его свойсва на текущие настройки валидатора контрола
     */

    if (isObject) {
      controlValidatorsSetting[validatorName] = _objectSpread$c(_objectSpread$c({}, controlValidatorSettings), newValidatorSettingsLayer);
    } else if (isBoolean) {
      /**
       * Если boolean, добавить к текущим настройкам валидатора контрола только включение режима живой валидации
       */
      controlValidatorsSetting[validatorName] = _objectSpread$c(_objectSpread$c({}, controlValidatorSettings), {}, {
        liveEnable: newValidatorSettingsLayer
      });
    } else {
      throw new Error('invalid params type, need boolean or object');
    }
  });
};
/**
 * @description
 * Наложить все слои валидаторов(глобальные, формы, контрола) для отдельного контрола
 *
 * @param {ControlProps} control - Контрол на который накладывают слои валидатора
 * @param {ValidatorsSettingList} formValidatorsSetting - Список валидаторов
 * @param {FormProps} form - главный объект формы
 *
 * @returns {void}
 *
 */

var addValidatorsSettingsLayerToSingleControl = function addValidatorsSettingsLayerToSingleControl(control, form) {
  /**
   * Настройки валидатора для отдельного контрола(могут быть пустыми)
   */
  var controlValidatorsSetting = control.validatorsSetting || {},
      formValidatorsSetting = form.formSettings.formValidatorsSetting || {};
  /**
   * Наложить слой настроек валидатора, описанный в глобальном объекте для всех форм проекта
   */

  control.validatorsSetting = form.formSettings.formValidatorsSetting;
  /**
   * Наложить слой настроек валидатора, описанных именно для этой формы
   */

  addValidatorsSettingsLayer(control, formValidatorsSetting);
  /**
   * Наложить слой настроек валидатора, описанных именно для этого контрола
   */

  addValidatorsSettingsLayer(control, controlValidatorsSetting);
};
/**
 * @description
 * Функция накладывает на слой валидатора, свойства из нового слоя, возвращая комбинированный слой валидаторов
 *
 * @param {ValidatorsSettingList} bottomLayer - Основной слой валидаторов
 * @param {ValidatorsSettingList} upperLayer - Слой который накладывается сверху
 *
 * @returns {ValidatorsSettingList}
 *
 */

var combineValidatorsSettingsLayers = function combineValidatorsSettingsLayers(bottomLayer, upperLayer) {
  var combineLayer = _objectSpread$c({}, bottomLayer);

  Object.keys(combineLayer).forEach(function (validatorName) {
    var validator = bottomLayer[validatorName],
        newValidatorLayer = upperLayer ? upperLayer[validatorName] : {};
    combineLayer[validatorName] = _objectSpread$c(_objectSpread$c({}, validator), newValidatorLayer);
  });
  return combineLayer;
};

/**
 * @description
 * Функция проходящая циклом по всем контролам, применяя к ним переданную функцию
 *
 * @param {ControlsCycleHandler} controlsCycleHandler - Функция проходящая в цикле по всем контролам.
 * Внутри функция можно получить доступ к каждому контролу
 * И изменить там что либо, или использовать как валидатор возвращая булевое значение
 * @param {ControlsProps | ControlsProps[]} formControls - Список контролов по которым пройдется функция
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {number} formIndex - Индекс формы, если это мультиформа
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
 *
 * @example
 * const isAllControlsValid = controlsCycle((control, controlName, form, formIndex, controlIndex, setForm) => return formIndex ? true : false, controls, form, formIndex, setForm) // => true
 * const isAllControlsValid = controlsCycle((control, controlName, form, formIndex, controlIndex, setForm) => return formIndex ? true : false, controls, form, null, setForm) // => false
 */
var controlsCycle = function controlsCycle(controlsCycleHandler, formControls, form) {
  var formIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var setForm = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var isAllControlsReturnTrue = true;
  /**
   * Перебор контролов одной формы
   */

  Object.keys(formControls).forEach(function (controlName) {
    var control = formControls[controlName];
    /**
     * Вложенный контрол
     */

    if (Array.isArray(control)) {
      control.forEach(function (controlItem, controlIndex) {
        var currentControlData = {
          currentControl: controlItem,
          controlName: controlName,
          controlIndex: controlIndex,
          formIndex: formIndex,
          formName: form.formSettings.formName
        },
            isControlReturnTrue = controlsCycleHandler(currentControlData, form, setForm);
        if (isControlReturnTrue !== true) isAllControlsReturnTrue = false;
      });
      /**
       * Одиночный контрол
       */
    } else {
      var currentControlData = {
        currentControl: control,
        controlName: controlName,
        controlIndex: null,
        formIndex: formIndex,
        formName: form.formSettings.formName
      },
          isControlReturnTrue = controlsCycleHandler(currentControlData, form, setForm);
      if (isControlReturnTrue !== true) isAllControlsReturnTrue = false;
    }
  });
  return isAllControlsReturnTrue;
};
/**
 * @description
 * Функция проходящая циклом по всем контролам всех форм, применяя к ним переданную функцию
 * Работает как для мульти формы, так и для одиночной
 *
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {ControlsCycleHandler} controlsCycleHandler - Функция проходящая в цикле по всем контролам.
 * Внутри функция можно получить доступ к каждому контролу
 * И изменить там что либо, или использовать как валидатор возвращая булевое значение
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
 *
 * @example
 *
 * const form = {
 *      controls: {
 *          username: {
 *              type: "text",
 *              label: 'Имя пользователя'
 *          }
 *      }
 * }
 *
 * const isControlsValid = controlsCycle(form, (control, controlName, form, formIndex, controlIndex, setForm) => return controlName === 'username' ? true : false, setForm) // => true
 * const isControlsValid = controlsCycle(form, (control, controlName, form, formIndex, controlIndex, setForm) => return controlName === 'password' : false, setForm) // => false
 */

var formCycle = function formCycle(form, controlsCycleHandler, setForm) {
  var controls = form.controls;
  var isAllFormReturnTrue = true;
  /**
   * Обработка мульти формы
   */

  if (Array.isArray(controls)) {
    controls.forEach(function (controls, formIndex) {
      var isSingleFormValid = controlsCycle(controlsCycleHandler, controls, form, formIndex, setForm);
      if (isSingleFormValid === false) isAllFormReturnTrue = false;
    });
    /**
     * Обработка обычной формы
     */
  } else {
    var isSingleFormValid = controlsCycle(controlsCycleHandler, controls, form, null, setForm);
    if (isSingleFormValid === false) isAllFormReturnTrue = false;
  }

  return isAllFormReturnTrue;
};

/**
 * @description
 * Добавить обязательные поля для функционирования контролов
 *
 * @param {CurrentControlData} singleControlData - Все данные переданного контрола
 *
 * @returns {void}
 */
var addRequireFields = function addRequireFields(singleControlData) {
  var control = singleControlData.currentControl,
      controlName = singleControlData.controlName,
      formName = singleControlData.formName,
      isSelectInput = control.type === 'select';
  control.error = '';
  control.hasError = false;
  control.controlName = controlName;
  control.inputName = "".concat(formName, "[").concat(controlName, "]");
  /**
   * Добавить поле value если оно было пустым
   */

  if (!control.value) control.value = '';
  /**
   * Обязательные поля селект инпутов
   */

  if (isSelectInput) {
    /**
     * Обязательное isMultiply
     */
    control.isMultiple = control.isMultiple === true;
    var options = control.options,
        value = control.value,
        selectPlaceholder = control.selectPlaceholder,
        hasSelectedValue = Array.isArray(value) ? value.length > 0 : Boolean(value),
        isSingletonSelectHasEmptyActiveItem = options.length && !selectPlaceholder && control.isMultiple === false && !hasSelectedValue;
    /**
     * Если не определенно активное поле или плейсхолдер, сделать активным первое значение по дефолту
     */

    if (isSingletonSelectHasEmptyActiveItem) {
      control.value = options[0].value;
    }
  }
};

/**
 * @description
 * Функция проверяет по индексу, является ли контрол мульти
 *
 * @param {number | null} controlIndex - Индекс контрола
 *
 * @returns {boolean}
 */
var isMultiControl = function isMultiControl(controlIndex) {
  return controlIndex !== null;
};
/**
 * @description
 * Функция проверяет по индексу, является ли контрол одиночкой
 *
 * @param {number | null} controlIndex - Индекс контрола
 *
 * @returns {boolean}
 */

var isSingletonControl = function isSingletonControl(controlIndex) {
  return controlIndex === null;
};
/**
 * @description
 * Функция проверяет по индексу, является ли форма мульти
 *
 * @param {number | null} formIndex - Индекс формы
 *
 * @returns {boolean}
 */

var isMultiForm = function isMultiForm(formIndex) {
  return formIndex !== null;
};

function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$b(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Функция добавляющая экземпляр контрола(одиночного или вложенного),
 * Для того что бы можно было добавлять новые формы или контролы во вью
 *
 * @param {ControlsProps} controlsExampleList - Список контролов формы, с которых клонируют структуру
 * @param {string} controlName - Имя контрола(username or password)
 * @param {ControlProps} control - Сам контрол который клонируют, со всеми свойствами
 * @param {number} controlIndex - Индекс вложенного контрола
 *
 * @returns {void}
 */

var addControlExample$1 = function addControlExample(controlsExampleList, _ref) {
  var controlIndex = _ref.controlIndex,
      controlName = _ref.controlName,
      currentControl = _ref.currentControl;

  /**
   * Сделать экземпляр первого элемента, вложенного контрола
   */
  if (isMultiControl(controlIndex)) controlsExampleList[controlName] = [_objectSpread$b({}, currentControl)];
  /**
   * Сделать экземпляр одиночного контрола
   */

  if (isSingletonControl(controlIndex)) controlsExampleList[controlName] = _objectSpread$b({}, currentControl);
};

/**
 * @description
 * Получить контрол из глобального обьекта формы, по переданным парраметрам
 *
 * @param {FormProps} form - Глобальный объект формы
 * @param {number | null} formIndex - Индекс формы (Если это мультиформа)
 * @param {number | null} controlIndex - Индекс контрола (Если это вложенный контрол)
 * @param {string | number | null} controlName - Имя контрола (username or password)
 *
 * @returns {ControlProps} - вернет контрол
 *
 */

var getControlFromForm = function getControlFromForm(form) {
  var controlName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var formIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var controlIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var controls = isMultiForm(formIndex) ? form.controls[formIndex] : form.controls,
      control = isMultiControl(controlIndex) ? controls[controlName][controlIndex] : controls[controlName];
  return control;
};

var mask = function mask(value, opts) {
  var DIGIT = "9",
      ALPHA = "A",
      ALPHANUM = "S",
      addPlaceholdersToOutput = function addPlaceholdersToOutput(output, index, placeholder) {
    for (; index < output.length; index++) {
      if (output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
        output[index] = placeholder;
      }
    }

    return output;
  };

  var pattern = _typeof(opts) === 'object' ? opts.pattern : opts,
      patternChars = pattern.replace(/\W/g, ''),
      output = pattern.split(""),
      values = value.toString().replace(/\W/g, ""),
      charsValues = values.replace(/\W/g, ''),
      index = 0,
      i,
      outputLength = output.length,
      placeholder = _typeof(opts) === 'object' ? opts.placeholder : undefined;

  for (i = 0; i < outputLength; i++) {
    // Reached the end of input
    if (index >= values.length) {
      if (patternChars.length == charsValues.length) {
        return output.join("");
      } else if (placeholder !== undefined && patternChars.length > charsValues.length) {
        return addPlaceholdersToOutput(output, i, placeholder).join("");
      } else {
        break;
      }
    } // Remaining chars in input
    else {
      if (output[i] === DIGIT && values[index].match(/[0-9]/) || output[i] === ALPHA && values[index].match(/[a-zA-Z]/) || output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/)) {
        output[i] = values[index++];
      } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
        if (placeholder !== undefined) {
          return addPlaceholdersToOutput(output, i, placeholder).join("");
        } else {
          return output.slice(0, i).join("");
        }
      }
    }
  }

  return output.join("").substr(0, i);
};

/**
 * @description
 * Функция очищает значение от наложенной маски вместе с плейсхолдером
 *
 * @param {string} maskPattern - Строка маски(например: +7(999)-999-99-99 | AA-AAA)
 * @param {string | number} textCoveredMask - Значение покрытое маской
 * @param {string} maskPlaceholder - Символ заменяющий не заполненные символы маски
 *
 * @returns {string} возвращает текст без маски с плейсхолдером
 */
var unmask = function unmask(maskPattern, textCoveredMask) {
  var maskPlaceholder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  /**
   * 1.Получить все элементы паттерна, кроме стандартных (A|9)
   * 2.Маска для сравнения, с замененными (A|9), на спец символ
   * 3.Значение с наложенной маской и плейсхолдером
   * 4.Массив символов значения для очищения(нужен для перебора и сравнения)
   * 5.Является ли значение для очистки уже чистым(не покрытое маской)
   * 6.Переменная где должен остатся очищенный текст
   */
  var patternElements = maskPattern.replace(/[9|A]/ig, '').split(''),
      comparisonMask = maskPattern.replace(/[9|A]/ig, '⌀'),
      valueToClear = String(textCoveredMask),
      valueToClearArrayOfSymbols = valueToClear.split(''),
      isValueClear = valueToClear.length === 1,
      clearedValue = '';
  /**
   * Вернуть значение для отчистки, если оно не покрыто маской
   */

  if (isValueClear) {
    return valueToClear;
    /**
     * Отчистить значение с маской
     */
  } else {
    /**
     * Перебрать каждый символ значения для очищение, с наложенным плейсхолдером
     */
    valueToClearArrayOfSymbols.map(function (symbolFromValueToClear, symbolNumber) {
      /**
       * 1.Получить символ маски для сравнения
       * 2.Равны ли сивол для очищения и символ маски
       * 3.Входит ли этот символ в текущий список символов паттерна
       * 4.Считается ли этот символ чистым
       */
      var symbolFromComparisonMask = comparisonMask[symbolNumber],
          areSymbolsEqual = symbolFromValueToClear === symbolFromComparisonMask,
          isSymbolIncludePatternElements = patternElements.includes(symbolFromValueToClear),
          isClearSymbol = !areSymbolsEqual;
      /**
       * Если символ для очистки совпадает с символом маски, и входит в текущий список символов паттерна
       * Значит это символ паттера маски, нужно удалить его из списка символов паттерна(что бы не пропустить такой же символ, но из чистого значения)
       */

      if (areSymbolsEqual && isSymbolIncludePatternElements) {
        var patternElementIndex = patternElements.indexOf(symbolFromValueToClear);
        patternElements.splice(patternElementIndex, 1);
        /**
         * Если символ для очистки не совпадает с символом маски, и не входит в текущий список символов паттерна
         * Считаем его чистым и добавляем к символам очищенным от маски
         */
      } else if (isClearSymbol) {
        clearedValue += symbolFromValueToClear;
      }
    });
    /**
     * Отчистить чистое значение от неочищенных символов плейсхолдера
     */

    clearedValue = clearedValue.replace(new RegExp(maskPlaceholder, 'g'), '');
  }

  return clearedValue;
};

/**
 * @description
 * Валидатор вписывает введенное значение в контрол по маске
 *
 * @param {MaskSettingProps} maskSetting - Объект описывающий правила маски
 * @param {ControlProps} currentControl - Контрол с которым работает валидатор
 * @param {string | number} writeValue - Чистое значение, которое должно быть покрыто маской
 * @param {string} eventType - Событие по которому попали в валидатор
 *
 * @returns {void} результатом работы функции будет введенное значение в контрол по маске, а так же toggle флага ошибки контрола
 */

var maskWriteValue = function maskWriteValue(maskSetting, currentControl, writeValue, eventType) {
  /**
   * 1.Получить паттерн маски, прежде чем наложить ее
   * 2.Получить событие при котором инпут покрывается маской
   * 3.Получить плейсхолдер не заполненных значений маски
   * 4.Получить чистое значение, без маски
   * 5.Лежит ли на инпуте вся маска с плейсхолдером(+7(___)-___-__-__)
   * 6.Было ли переданно значение плейсхолдера
   * 7.Покрывается ли текст маской только после ввода и без плейсхолдера
   */
  var pattern = maskSetting.maskPattern,
      eventWhenPlaceholderVisible = maskSetting.eventWhenPlaceholderVisible,
      _maskSetting$maskPlac = maskSetting.maskPlaceholder,
      placeholder = _maskSetting$maskPlac === void 0 ? undefined : _maskSetting$maskPlac,
      clearValue = unmask(pattern, writeValue, placeholder),
      hasInputFullMaskWithPlaceholder = eventWhenPlaceholderVisible !== 'write',
      isWrittenTextMaskedAfterInputWithoutPlaceholder = eventWhenPlaceholderVisible === 'write',
      isPatternPlaceholderEmpty = !placeholder,
      hasControlMaskWithPlaceholderInSettings = !currentControl.maskSetting._maskWithPlaceholder;
  /**
   * Записать значение плейсхолдера по умолчанию, если маска с плейсхолдером должна сразу быть на инпуте
   */

  if (hasInputFullMaskWithPlaceholder && isPatternPlaceholderEmpty) placeholder = '_';
  /**
   * Убрать значения плейсхолдера для маски которая ложится во время ввода, без плейсхолдера
   */

  if (isWrittenTextMaskedAfterInputWithoutPlaceholder) placeholder = undefined;
  /**
   * Записать само значение маски с уже наложенным плейсхолдером
   * 1.Для того что бы скинуть введенное значение, и оставить только пустую маску
   * 2.Для сравнения введенного значения с длинной маски
   */

  if (hasControlMaskWithPlaceholderInSettings) {
    currentControl.maskSetting._maskWithPlaceholder = mask('', {
      pattern: pattern,
      placeholder: placeholder || '_'
    });
  }
  /**
   * Записать чистое значение без маски, в свойтсва контрола
   */


  currentControl.maskSetting.clearValue = clearValue;
  /**
   * Записать значение плейсхолдера
   */

  currentControl.maskSetting.maskPlaceholder = placeholder;
  /**
   * 1.Значение после обработки маской
   * 2.Есть ли в маске ошибка
   * 3.Маска с натянутым плейсхолдером(+7(___)-___-__-__))
   * 4.Длинна значения с натянутой масской
   * 5.Равно ли значения инпута маске(valueAfterMask === +7(___)-___-__-__))
   */

  var valueAfterMask = mask(clearValue, {
    pattern: pattern,
    placeholder: placeholder
  }),
      hasError = false,
      maskWithPlaceholder = currentControl.maskSetting._maskWithPlaceholder,
      isInputValueEqualMaskWithPlaceholder = valueAfterMask === maskWithPlaceholder,
      hasValueAfterMaskPlaceholderSymbols = valueAfterMask.includes(placeholder);
  /**
   * Если на инпут натянута вся маска с плейсхолдером(input.value === +7(___)-___-__-__)), и происходит покидания не заполненного инпута с натянутой маской(input.value === +7(___)-___-__-__))
   * Скинуть значение инпута до пустого
   */

  if (hasInputFullMaskWithPlaceholder && ['mouseleave', 'blur'].includes(eventType) && isInputValueEqualMaskWithPlaceholder) {
    valueAfterMask = '';
  }
  /**
   * Если текст покрывается маской без плейсхолдера по мере ввода
   * Выдавать ошибку если длинна маски с плейсхолдером не совпадает с длинной значения покрытого маской
   */


  if (isWrittenTextMaskedAfterInputWithoutPlaceholder) {
    var maskedValueLength = valueAfterMask.length,
        maskWithPlaceholderLength = maskWithPlaceholder.length,
        isMaskedValueWithMaskWithPlaceholderHasNotEqualLength = maskedValueLength !== maskWithPlaceholderLength;
    if (isMaskedValueWithMaskWithPlaceholderHasNotEqualLength) hasError = true;
    /**
     * Если на инпут уже натянута маска, и в ней содержатся элементы плейсхолдера(+7(123)-456-78-__)
     * Выдать ошибку
     */
  } else if (hasValueAfterMaskPlaceholderSymbols) {
    hasError = true;
  }
  /**
   * Вывести результаты валидатора
   */


  currentControl.hasError = hasError;
  currentControl.value = valueAfterMask;
};

function r$1(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var e$2={exports:{}};!function(r){function e(n){return "function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(r.exports=e=function(r){return typeof r},r.exports.default=r.exports,r.exports.__esModule=!0):(r.exports=e=function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},r.exports.default=r.exports,r.exports.__esModule=!0),e(n)}r.exports=e,r.exports.default=r.exports,r.exports.__esModule=!0;}(e$2);var n=r$1(e$2.exports),t$1=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.limit,o=void 0===t?null:t,i="string"==typeof o?Number(o):o,u=!Array.isArray(r)&&!["string","number"].includes(n(r)),l="number"!=typeof i&&null!==i||null!==i&&isNaN(i),a=Array.isArray(r)?r.length:String(r).length,s="number"==typeof i&&a<i;if(l)throw new TypeError("limit value must be only number or number in string like '1'");if(u)throw new TypeError("written value must be only string, number or array");return s},o=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.limit,o=void 0===t?null:t,i="string"==typeof o?Number(o):o,u=!Array.isArray(r)&&!["string","number"].includes(n(r)),l="number"!=typeof i&&null!==i||null!==i&&isNaN(i),a=Array.isArray(r)?r.length:String(r).length,s="number"==typeof i&&a>i;if(l)throw new TypeError("limit value must be only number or number in string like '1'");if(u)throw new TypeError("written value must be only string, number or array");return s},i=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.limit,t=void 0===n?null:n,o="string"==typeof t?Number(t):t,i=isNaN(Number(r))||null===r,u="number"!=typeof o&&null!==o||null!==o&&isNaN(o),l="number"==typeof o&&Number(r)>o;if(u)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value can be only number");return l},u=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.limit,t=void 0===n?null:n,o="string"==typeof t?Number(t):t,i=isNaN(Number(r))||null===r,u="number"!=typeof o&&null!==o||null!==o&&isNaN(o),l="number"==typeof o&&Number(r)<o;if(u)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value can be only number");return l},l=function(r){var e=!Array.isArray(r)&&!["string","number"].includes(n(r)),t=0===(Array.isArray(r)?r.length:String(r).length);if(e)throw new TypeError("written value can be only string or number");return t},a=function(r){var e=!["string","number"].includes(n(r)),t=!/.+@.+\..+/i.test(String(r));if(e)throw new TypeError("written value can be only string or number");return t},s=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=!["string","number"].includes(n(r))||null===r;r=String(r);var o=e||{},i=o.shouldLockNegativeNumber,u=void 0!==i&&i,l=o.shouldLockFloatNumber,a=void 0!==l&&l,s=o.allowableSymbols,y=void 0===s?[]:s,m=o.customRegExp,b=void 0===m?null:m,p=o.isLiveValidator,c=void 0!==p&&p,f=y.includes("-")?y.join("").replace(/-/g,"\\-"):y.join(""),g="".concat(f,"1-9"),v=new RegExp("^[-]?([".concat(g,"]+)?[.]?([").concat(g,"]+)?$")),w=c?["-.",".",".-"]:["-.",".",".-","-"],d=w.includes(r),h=!0;if(r){var N=v;u&&(N=a?new RegExp("^[".concat(g,"]+$")):new RegExp("^([".concat(g,"]+)?[.]?([").concat(g,"]+)?$"))),a&&(N=u?new RegExp("^[".concat(g,"]+$")):new RegExp("^[-]?([".concat(g,"]+)?$"))),h=N.test(r),d&&(h=!1),b&&(h=b.test(r));}if(t)throw new TypeError("written value can be only number or string");return h},y=function(r,e){Object.keys(r).forEach((function(n){var t=e[n];t&&(r[n]=t);}));};

/**
 * @description
 * Функция проверяет и возвращает, включен ли живой валидатор в переданных настройках валидатора
 *
 * @param {ValidatorSettingProps} controlValidatorsSetting - обьект настройки валидатора
 *
 * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
 */
var isLiveValidatorEnable = function isLiveValidatorEnable(controlValidatorsSetting) {
  return controlValidatorsSetting.liveEnable === true;
};

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Живой валидатор введенных данных в интуп
 *
 * @param {HookProps} hooksData - Данные для хуков(контрол, его данные, форма)
 *
 * @returns {{ValidatorErrorProps}}
 *
 */

var validateWrittenData = function validateWrittenData(hooksData) {
  /**
   * 1.Получить данные для работы (контрол через который будут проходить данные, вводимое значение, всю форму)
   * 2.Получить правила валидации(все валидаторы)
   * 3.Получить настройки валидаторов
   */
  var currentControl = hooksData.currentControl,
      newValue = hooksData.newValue,
      controlValidatorsRules = currentControl.validateRules || {},
      controlValidatorsSetting = currentControl.validatorsSetting || {},
      minValueRules = controlValidatorsRules.minValue,
      maxValueRules = controlValidatorsRules.maxValue,
      minLengthRules = controlValidatorsRules.minLength,
      maxLengthRules = controlValidatorsRules.maxLength,
      requiredRules = controlValidatorsRules.required,
      numberRules = controlValidatorsRules.number,
      emailRules = controlValidatorsRules.email,
      minValueSetting = controlValidatorsSetting.minValue,
      maxValueSetting = controlValidatorsSetting.maxValue,
      minLengthSetting = controlValidatorsSetting.minLength,
      maxLengthSetting = controlValidatorsSetting.maxLength,
      requiredSetting = controlValidatorsSetting.required,
      numberSetting = controlValidatorsSetting.number,
      emailSetting = controlValidatorsSetting.email,
      errorData = {
    hasError: false,
    shouldLockNotValidWrite: false,
    message: null,
    limit: null,
    showLiveErrorAfterFirstSubmit: false,
    hideErrorTimeout: null,
    showErrorTimeout: null
  };
  /**
   * @description
   * Если новое значение подходит по типу
   */

  if (typeof newValue === "string" || typeof newValue === "number") {
    var isInputNumberValid = s(newValue, numberRules),
        isInputNumberInvalid = !isInputNumberValid,
        isWrittenValueNotEmpty = !l(newValue),
        hasError = true;
    /**
     * @description
     * Enable live validators only for filled input
     */

    if (isWrittenValueNotEmpty) {
      /**
       * Live validator for less value limit
       */
      if (isInputNumberValid && u(newValue, minValueRules) && isLiveValidatorEnable(minValueSetting)) {
        y(errorData, _objectSpread$a(_objectSpread$a(_objectSpread$a({}, minValueRules), minValueSetting), {}, {
          hasError: hasError
        }));
      }
      /**
       * Live validator for greater limit
       */


      if (isInputNumberValid && i(newValue, maxValueRules) && isLiveValidatorEnable(maxValueSetting)) {
        y(errorData, _objectSpread$a(_objectSpread$a(_objectSpread$a({}, maxValueRules), maxValueSetting), {}, {
          hasError: hasError
        }));
      }
      /**
       * Live validator for shorter limit
       */


      if (t$1(newValue, minLengthRules) && isLiveValidatorEnable(minLengthSetting)) {
        y(errorData, _objectSpread$a(_objectSpread$a(_objectSpread$a({}, minLengthRules), minLengthSetting), {}, {
          hasError: hasError
        }));
      }
      /**
       * Live validator for longer limit
       */


      if (o(newValue, maxLengthRules) && isLiveValidatorEnable(maxLengthSetting)) {
        y(errorData, _objectSpread$a(_objectSpread$a(_objectSpread$a({}, maxLengthRules), maxLengthSetting), {}, {
          hasError: hasError
        }));
      }
      /**
       * Live validator for valid email
       */


      if (emailRules && a(newValue) && isLiveValidatorEnable(emailSetting)) {
        y(errorData, _objectSpread$a(_objectSpread$a(_objectSpread$a({}, emailRules), emailSetting), {}, {
          hasError: hasError
        }));
      }
    }
    /**
     * Live validator for required field
     */


    if (requiredRules && l(newValue) && isLiveValidatorEnable(requiredSetting)) {
      y(errorData, _objectSpread$a(_objectSpread$a(_objectSpread$a({}, requiredRules), requiredSetting), {}, {
        hasError: hasError
      }));
    }
    /**
     * Live validator for valid number
     */


    if (numberRules && isInputNumberInvalid) {
      y(errorData, _objectSpread$a(_objectSpread$a(_objectSpread$a({}, numberRules), numberSetting), {}, {
        hasError: hasError
      }));
    }
  }

  return {
    errorData: errorData
  };
};

function getArraySum(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.reduce((function(e,r){return n&&isNaN(+r)?+e:+e+ +r}),0);return r}

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Живой валидатор кликабельных инпутов
 *
 * @param {HookProps} hooksData - Данные для хуков(контрол, его данные, форма)
 *
 * @returns {{ValidatorErrorProps}}
 *
 */

var validateClickedData = function validateClickedData(hooksData) {
  var currentControl = hooksData.currentControl,
      newValue = hooksData.newValue,
      controlValidatorsSetting = currentControl.validatorsSetting || {},
      controlValidatorsRules = currentControl.validateRules || {},
      requiredRules = controlValidatorsRules.required,
      minValueRules = controlValidatorsRules.minValue,
      maxValueRules = controlValidatorsRules.maxValue,
      minLengthRules = controlValidatorsRules.minLength,
      maxLengthRules = controlValidatorsRules.maxLength,
      requiredSetting = controlValidatorsSetting.required,
      minValueSetting = controlValidatorsSetting.minValue,
      maxValueSetting = controlValidatorsSetting.maxValue,
      minLengthSetting = controlValidatorsSetting.minLength,
      maxLengthSetting = controlValidatorsSetting.maxLength,
      errorData = {
    hasError: false,
    shouldLockNotValidWrite: false,
    message: null,
    limit: null,
    showLiveErrorAfterFirstSubmit: null,
    hideErrorTimeout: null,
    showErrorTimeout: null
  },
      newValueArraySum = Array.isArray(newValue) ? getArraySum(newValue) : null,
      shouldValidateArraySumValue = !isNaN(newValueArraySum),
      hasError = true;
  /**
   * Обязательное поле
   */

  if (requiredRules && l(newValue) && isLiveValidatorEnable(requiredSetting)) {
    y(errorData, _objectSpread$9(_objectSpread$9(_objectSpread$9({}, requiredRules), requiredSetting), {}, {
      hasError: hasError
    }));
  }
  /**
   * Минимальная сумма элементов
   */


  if (minValueRules && shouldValidateArraySumValue && u(newValueArraySum, minValueRules) && isLiveValidatorEnable(minValueSetting)) {
    y(errorData, _objectSpread$9(_objectSpread$9(_objectSpread$9({}, minValueRules), minValueSetting), {}, {
      hasError: hasError
    }));
  }
  /**
   * Максимальная сумма элементов
   */


  if (maxValueRules && shouldValidateArraySumValue && i(newValueArraySum, maxValueRules) && isLiveValidatorEnable(maxValueSetting)) {
    y(errorData, _objectSpread$9(_objectSpread$9(_objectSpread$9({}, maxValueRules), maxValueSetting), {}, {
      hasError: hasError
    }));
  }
  /**
   * Минимальное кол-во элементов
   */


  if (minLengthRules && t$1(newValue, minLengthRules) && isLiveValidatorEnable(minLengthSetting)) {
    y(errorData, _objectSpread$9(_objectSpread$9(_objectSpread$9({}, minLengthRules), minLengthSetting), {}, {
      hasError: hasError
    }));
  }
  /**
   * Максимальное кол-во элементов
   */


  if (maxLengthRules && o(newValue, maxLengthRules) && isLiveValidatorEnable(maxLengthSetting)) {
    y(errorData, _objectSpread$9(_objectSpread$9(_objectSpread$9({}, maxLengthRules), maxLengthSetting), {}, {
      hasError: hasError
    }));
  }

  return {
    errorData: errorData
  };
};

function debounce(r,t){var e;return function(){for(var n=this,u=arguments.length,a=new Array(u),o=0;o<u;o++)a[o]=arguments[o];var i=function(){r.apply(n,a);};return clearTimeout(e),e=setTimeout(i,t)}}

/**
 * @description
 * Функция скрывающая ошибку у контрола
 *
 * @param {HookProps} hooksData - Данные хука
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 *
 * @returns {void}
 */

var hideLiveErrorHandler = function hideLiveErrorHandler(setForm, hooksData) {
  setForm(function (form) {
    var controlName = hooksData.controlName,
        formIndex = hooksData.formIndex,
        controlIndex = hooksData.controlIndex,
        currentControl = getControlFromForm(form, controlName, formIndex, controlIndex);
    currentControl.hasError = false;
  });
};
/**
 * @description
 * Функция вызывающая скрытие ошибки через таймаут
 *
 * @param {HookProps} hooksData - Данные хука
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 * @param {number} ms - время через которое нужно скрыть ошибку
 *
 * @returns {void}
 *
 */


var hideLiveErrorAfterTimeout = function hideLiveErrorAfterTimeout(hooksData, setForm, ms) {
  var callHideError = debounce(hideLiveErrorHandler, ms),
      timeoutId = callHideError(setForm, hooksData);
  return timeoutId;
};

function e$1(t,e){if(t=+t,2===e.length&&e.push(e[1]),isNaN(t))throw new Error("type of quantity expect only number");return e[t%100>4&&t%100<20?2:[2,0,1,1,1,2][t%10<5?t%10:5]]}

function messageLayoutsReplacer(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1?arguments[1]:void 0,n="string"==typeof r||"number"==typeof r||null===r,t=!n;if(null===r)return "";if(t)throw new Error("message for replace has invalid type");var l=r;return l&&a.forEach((function(a){var n=a.searchLayout,t=a.valueToReplace,o=a.shouldClearSearchLayoutIfReplaceValueIsArray,i=void 0===o||o;if(null===t)return "";var c=new RegExp("".concat(n,"['[a-zA-Zа-яА-я]+', '[a-zA-Zа-яА-я]+'(, '[a-zA-Zа-яА-я]+')?]"),"g");if(c.test(l))l=l.replace(c,(function(r){var a=r.replace(new RegExp(n),"").replace(/[\[\]'"]/g,"").split(", "),l=isNaN(+t)?null:e$1(+t,a);return isNaN(+t)?t.toString():"".concat(t," ").concat(l)}));else {var u=i?"":t.toString(),p=Array.isArray(t)?u:String(t),f=""===p&&new RegExp(n+" ","g").test(r)?n+" ":n;l=l.replace(new RegExp(f,"g"),p);}})),l}

var replaceLayoutSymbols = function replaceLayoutSymbols(message, _ref) {
  var limit = _ref.limit,
      controlLabel = _ref.controlLabel,
      writeToControlValue = _ref.writeToControlValue;
  return messageLayoutsReplacer(message, [{
    searchLayout: '{limit}',
    valueToReplace: limit
  }, {
    searchLayout: 'limitForDecline',
    valueToReplace: limit
  }, {
    searchLayout: '{label}',
    valueToReplace: controlLabel
  }, {
    searchLayout: '{writeValue}',
    valueToReplace: writeToControlValue
  }]);
};

/**
 * @description
 * Дефолтный обработчик живых ошибок(парсинг, отображение, скрытие)
 *
 * @param {ValidatorErrorProps} errorDataForControl - Результат работы живого валидатора(текст ошибки, данные когда и как показыавть ошибку)
 * @param {HookProps} hooksData - Данные хука
 * @param {FormProps} form - Глобальный объект формы
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 *
 * @returns {void}
 *
 */

var defaultLiveErrorHandler = function defaultLiveErrorHandler(errorDataForControl, hooksData, form, setForm) {
  var controlName = hooksData.controlName,
      formIndex = hooksData.formIndex,
      controlIndex = hooksData.controlIndex,
      writeToControlValue = hooksData.newValue,
      currentControl = getControlFromForm(form, controlName, formIndex, controlIndex),
      controlLabel = currentControl.label,
      _ref = errorDataForControl || {},
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? null : _ref$message,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? null : _ref$limit,
      _ref$hideErrorTimeout = _ref.hideErrorTimeout,
      hideErrorTimeout = _ref$hideErrorTimeout === void 0 ? null : _ref$hideErrorTimeout,
      beforeError = currentControl.beforeLiveValidatorError || form.formSettings.beforeLiveValidatorError || null,
      afterError = currentControl.afterLiveValidatorError || form.formSettings.afterLiveValidatorError || null;
  /**
   * Хук перед всплытием ошибки
   */


  if (typeof beforeError === "function") {
    beforeError(hooksData);
  }
  /**
   * Заменить шаблонные слова в тексте ошибки, на значения
   */


  if (errorDataForControl) {
    currentControl.error = replaceLayoutSymbols(message, {
      limit: limit,
      controlLabel: controlLabel,
      writeToControlValue: writeToControlValue
    });
  }
  /**
   * Отобразить ошибку
   */


  currentControl.hasError = true;
  /**
   * Скрыть ошибку через таймаут если его указали
   */

  if (hideErrorTimeout) {
    var hideErrorTimeoutId = hideLiveErrorAfterTimeout(hooksData, setForm, hideErrorTimeout);
    currentControl._hideErrorTimeoutId = hideErrorTimeoutId;
  }
  /**
   * Хук после всплытием ошибки
   */


  if (typeof afterError === "function") {
    afterError(hooksData);
  }
};

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Функция которая выбирает обработчик ошибки, и обрабатывает его вместе с дебаунсом
 *
 * @param {ValidatorErrorProps} errorDataForControl - Результат работы живого валидатора(текст ошибки, данные когда и как показыавть ошибку)
 * @param {HookProps} hooksData - Данные хука
 * @param {FormProps} form - Глобальный объект формы
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 * @param {NodeJS.Timeout | null} prevShowErrorTimeoutId - id предыдущего дебаунса для очистки
 * @param {number} ms - через сколько должен сработать обработчик
 *
 * @returns {void}
 *
 */

var liveValidatorShowErrorHandler = function liveValidatorShowErrorHandler(errorDataForControl, hooksData, form, setForm, prevShowErrorTimeoutId) {
  var ms = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  //@todo: Добавить кастомные обработчики живых ошибок form.customLiveErrorHandler || control.customLiveErrorHandler
  //@todo: Добавить additionalLiveErrorHandler
  var shouldUseDebounce = Boolean(ms),
      errorHandler = shouldUseDebounce ? function () {
    return setForm(function (prevForm) {
      form = _objectSpread$8({}, prevForm);
      defaultLiveErrorHandler(errorDataForControl, hooksData, form, setForm);
      return form;
    });
  } : function () {
    return defaultLiveErrorHandler(errorDataForControl, hooksData, form, setForm);
  },
      callShowError = debounce(errorHandler, ms),
      hasError = errorDataForControl.hasError;
  var currentShowErrorTimeoutId = null;
  /**
   * Обработать ошибку с дебаунсом или нет
   */

  if (shouldUseDebounce) {
    /**
     * Если ошибки нет, просто закрыть таймер отображения всех ошибок
     * Если есть ошибка, отобразить в дебаунсе, если нет, закрыть предыдущий таймер
     */
    if (hasError) {
      clearTimeout(prevShowErrorTimeoutId);
      currentShowErrorTimeoutId = callShowError();
    } else if (prevShowErrorTimeoutId) {
      clearTimeout(prevShowErrorTimeoutId);
    }
  } else {
    if (hasError) {
      errorHandler();
    }
  }

  return currentShowErrorTimeoutId;
};

/**
 * @description
 * Записывает результат живого валидатора, в объект вывода данных контрола
 *
 * @param {LiveValidator} validator - Живой валидатор, результат которого будет записыватся
 * @param {HookProps} hookProps - Данные для работы валидатора
 * @param {ControlOutputDataProps} controlOutputData - Объект в котором хранятся данные вывода контрола
 *
 * @returns {void}
 */
var setLiveValidatorResult = function setLiveValidatorResult(validator, hookProps, controlOutputData) {
  var _validator = validator(hookProps),
      _validator$errorData = _validator.errorData,
      errorData = _validator$errorData === void 0 ? null : _validator$errorData,
      _validator$modifiedVa = _validator.modifiedValueToWrite,
      modifiedValueToWrite = _validator$modifiedVa === void 0 ? null : _validator$modifiedVa,
      shouldLockNotValidWrite = errorData.shouldLockNotValidWrite,
      hasError = errorData.hasError;

  if (shouldLockNotValidWrite) controlOutputData.isWriteInputEnable = false;
  /**
   * Отметить флаг что в контроле была хоть одна ошибка
   */

  if (hasError) controlOutputData.hasAnyError = true;
  /**
   * Если в валидаторе модифицировали вводимое значение, и вернули, записать в объект вывода
   */

  if (modifiedValueToWrite) controlOutputData.writeToControlValue = modifiedValueToWrite;
  /**
   * Записать настройки вывода ошибки в главный объект вывода
   */

  if (errorData) controlOutputData.errorDataForControl = errorData;
};

/**
 * @description
 * Обработчик всех видов входных данных при вводе
 *
 * @param {ControlProps} currentControl - Контрол в который ввели данные и происходит обработка
 * @param {FormProps} form - Глобальный объект формы
 * @param {HookProps} hooksData - Данные для хуков
 * @param {typeof inputEvents} eventType - Тип сработающего события
 * @param {SetFormProps} setForm - Функция изменяющая главный объект формы
 *
 * @returns {void}
 */

var liveInputHandler = function liveInputHandler(currentControl, form, hooksData, eventType, setForm) {
  /**
   * Получить таймаут id ошибок
   * Определить тип контрола(текстовый или кликабильный)
   */
  var type = currentControl.type,
      _currentControl$_hide = currentControl._hideErrorTimeoutId,
      hasControlHideErrorTimeout = _currentControl$_hide === void 0 ? null : _currentControl$_hide,
      showErrorTimeoutId = currentControl._showErrorTimeoutId,
      textControlTypes = ['phone', 'number', 'text', 'password', 'date'],
      isTextControl = textControlTypes.includes(type);
  /**
   * 1.Определить какой из дефолтных валидаторов использовать(live валидаторов), текстовый или кликабильный
   * 2.Взять самый верхнего слой живого валидатора
   * 3.Взять дополнительный валидатор, с самого верхнего слоя, если есть
   * 4.Получить инпут маску если она есть
   * 5.Получить кастомную маску если она есть
   * 6.Получить введенное(выбранное) значение
   * 7.Проверить, была ли попытка отправить форму
   */

  var defaultValidateFunction = isTextControl ? validateWrittenData : validateClickedData,
      liveValidator = currentControl.customLiveValidator || form.formSettings.customLiveValidator || defaultValidateFunction,
      additionalLiveValidator = currentControl.additionalLiveValidator || form.formSettings.additionalLiveValidator || null,
      inputMask = currentControl.maskSetting || null,
      customMask = currentControl.customMask,
      newValue = hooksData.newValue,
      isFormTriedSubmit = form.formParams.isFormTriedSubmit;
  /**
   * Проверка наличия всех валидаторов
   */

  var hasCustomMask = typeof customMask === 'function',
      hasMask = inputMask,
      hasLiveValidator = typeof liveValidator === "function",
      hasAdditionalLiveValidator = typeof additionalLiveValidator === "function";
  /**
   * 1.Введенное(нажатое) значение
   * 2.Настройки вывода ошибки
   * 3.Флаг - были ли ошибки при валидации
   * 4.Флаг - был ли заблокирован ввод в инпут(валидатором)
   * 5.Таймер - через который всплывает ошибка
   */

  var controlOutputData = {
    writeToControlValue: newValue,
    errorDataForControl: null,
    hasAnyError: false,
    isWriteInputEnable: true
  };
  /**
   * Инпут с кастомной маской
   */

  if (hasCustomMask) {
    customMask(mask, hooksData);
  } else if (hasMask && !Array.isArray(newValue)) {
    /**
     * Инпут с обычной маской
     */
    maskWriteValue(inputMask, currentControl, newValue, eventType);
  } else {
    /**
     * Записать результаты живого валидатора в объект вывода
     */
    if (hasLiveValidator) setLiveValidatorResult(liveValidator, hooksData, controlOutputData);
    /**
     * Записать результаты дополнительного живого валидатора в объект вывода
     */

    if (hasAdditionalLiveValidator) setLiveValidatorResult(additionalLiveValidator, hooksData, controlOutputData);
    var errorDataForControl = controlOutputData.errorDataForControl,
        hasAnyError = controlOutputData.hasAnyError,
        writeToControlValue = controlOutputData.writeToControlValue,
        isWriteInputEnable = controlOutputData.isWriteInputEnable;
    /**
     * Настройки вывода ошибок
     */

    var _ref = errorDataForControl || {},
        _ref$showLiveErrorAft = _ref.showLiveErrorAfterFirstSubmit,
        showLiveErrorAfterFirstSubmit = _ref$showLiveErrorAft === void 0 ? false : _ref$showLiveErrorAft,
        _ref$showErrorTimeout = _ref.showErrorTimeout,
        showErrorTimeout = _ref$showErrorTimeout === void 0 ? 0 : _ref$showErrorTimeout,
        showLiveErrorAlways = !showLiveErrorAfterFirstSubmit;
    /**
     * Записать новое значение, если инпут нигде не был заблокирован
     */


    if (isWriteInputEnable) {
      currentControl.value = writeToControlValue;
    }
    /**
     * Выключить флаг наличия ошибки у контрола
     */


    if (!hasAnyError) {
      currentControl.hasError = false;
      /**
       * После того как была отображенна ошибка, был создан таймер через сколько она должна скрытся
       * Если ошибка исчезает до отработки таймера, нужно отчистить таймер, для того что бы они не начали срабатывать в ненужный момент
       */

      if (hasControlHideErrorTimeout) clearTimeout(currentControl._hideErrorTimeoutId);
    }
    /**
     * Отобразить ошибки в живом времени, только после первой попытки отправки формы
     */


    if (showLiveErrorAfterFirstSubmit && isFormTriedSubmit) {
      currentControl._showErrorTimeoutId = liveValidatorShowErrorHandler(errorDataForControl, hooksData, form, setForm, showErrorTimeoutId, showErrorTimeout);
    } else if (showLiveErrorAlways) {
      currentControl._showErrorTimeoutId = liveValidatorShowErrorHandler(errorDataForControl, hooksData, form, setForm, showErrorTimeoutId, showErrorTimeout);
    }
  }
};

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Функция записывает данные ошибки статического валидатора, и определяет нужно ли блокировать форму отправки
 *
 * @param {ValidatorErrorProps} commonErrorData - объект с данными ошибки
 * @param {ValidatorErrorProps} propsToUpdate - Слой новых свойств которые будут накладыватся
 *
 */

var StaticValidatorErrorHandler = function StaticValidatorErrorHandler(commonErrorData, propsToUpdate) {
  var _propsToUpdate$should = propsToUpdate.shouldLockSubmitBtnWhenControlInvalid,
      shouldLockSubmitBtnWhenControlInvalid = _propsToUpdate$should === void 0 ? false : _propsToUpdate$should,
      shouldLockSubmitBtn = commonErrorData.shouldLockSubmitBtn ? true : shouldLockSubmitBtnWhenControlInvalid;
  y(commonErrorData, _objectSpread$7(_objectSpread$7({}, propsToUpdate), {}, {
    hasError: true,
    shouldLockSubmitBtn: shouldLockSubmitBtn
  }));
};

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultStaticValidator = function defaultStaticValidator(hooksData) {
  /**
   * 1.Получить данные для работы (контрол через который будут проходить данные, вводимое значение, всю форму)
   * 2.Получить правила валидации(все валидаторы)
   * 3.Получить настройки валидаторов
   */
  var currentControl = hooksData.currentControl,
      value = currentControl.value,
      controlValidatorsRules = currentControl.validateRules || {},
      controlValidatorsSetting = currentControl.validatorsSetting || {},
      minValueRules = controlValidatorsRules.minValue,
      maxValueRules = controlValidatorsRules.maxValue,
      minLengthRules = controlValidatorsRules.minLength,
      maxLengthRules = controlValidatorsRules.maxLength,
      requiredRules = controlValidatorsRules.required,
      numberRules = controlValidatorsRules.number,
      emailRules = controlValidatorsRules.email,
      minValueSetting = controlValidatorsSetting.minValue,
      maxValueSetting = controlValidatorsSetting.maxValue,
      minLengthSetting = controlValidatorsSetting.minLength,
      maxLengthSetting = controlValidatorsSetting.maxLength,
      requiredSetting = controlValidatorsSetting.required,
      numberSetting = controlValidatorsSetting.number,
      emailSetting = controlValidatorsSetting.email,
      errorData = {
    hasError: false,
    shouldLockNotValidWrite: false,
    message: null,
    limit: null,
    showLiveErrorAfterFirstSubmit: false,
    hideErrorTimeout: null,
    shouldLockSubmitBtnWhenControlInvalid: false,
    shouldLockSubmitBtn: false
  };
  /**
   * @description
   * Если новое значение подходит по типу
   */

  if (typeof value === "string" || typeof value === "number") {
    var isInputNumberValid = s(value, numberRules),
        isInputNumberInvalid = !isInputNumberValid,
        isWrittenValueNotEmpty = !l(value);
    /**
     * @description
     * Enable validators only for filled input
     */

    if (isWrittenValueNotEmpty) {
      /**
       * Validator for less value limit
       */
      if (isInputNumberValid && u(value, minValueRules)) {
        StaticValidatorErrorHandler(errorData, _objectSpread$6(_objectSpread$6({}, minValueRules), minValueSetting));
      }
      /**
       * Validator for greater limit
       */


      if (isInputNumberValid && i(value, maxValueRules)) {
        StaticValidatorErrorHandler(errorData, _objectSpread$6(_objectSpread$6({}, maxValueRules), maxValueSetting));
      }
      /**
       *Validator for shorter limit
       */


      if (t$1(value, minLengthRules)) {
        StaticValidatorErrorHandler(errorData, _objectSpread$6(_objectSpread$6({}, minLengthRules), minLengthSetting));
      }
      /**
       * Validator for longer limit
       */


      if (o(value, maxLengthRules)) {
        StaticValidatorErrorHandler(errorData, _objectSpread$6(_objectSpread$6({}, maxLengthRules), maxLengthSetting));
      }
      /**
       * Validator for valid email
       */


      if (emailRules && a(value)) {
        StaticValidatorErrorHandler(errorData, _objectSpread$6(_objectSpread$6({}, emailRules), emailSetting));
      }
    }
    /**
     * Validator for required field
     */


    if (requiredRules && l(value)) {
      StaticValidatorErrorHandler(errorData, _objectSpread$6(_objectSpread$6({}, requiredRules), requiredSetting));
    }
    /**
     * Validator for valid number
     */


    if (numberRules && isInputNumberInvalid) {
      StaticValidatorErrorHandler(errorData, _objectSpread$6(_objectSpread$6({}, numberRules), numberSetting));
    }
  }

  return errorData;
};

/**
 * @description
 * Записывает результат валидаора на блокировку кнопки отправки
 *
 * @param {StaticValidator} validator - Валидатор, результат которого будет записыватся
 * @param {HookProps} hookProps - Данные для работы валидатора
 * @param {LockSubmitBtnErrorData} errorData - Объект в котором хранятся свойство блокировать или не блокировать кнопку
 * @param {boolean} shouldCheckValidatorSettings - Проверять необходимость блокировать ли кнопку отправки, по дополнительному полю shouldLockSubmitBtnWhenControlInvalid в настройкам rules
 *
 * @returns {void}
 */
var setLockSubmitBtnValidatorResult = function setLockSubmitBtnValidatorResult(validator, hookProps, errorData) {
  var shouldCheckValidatorSettings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var _validator = validator(hookProps),
      _validator$hasError = _validator.hasError,
      hasError = _validator$hasError === void 0 ? false : _validator$hasError,
      _validator$shouldLock = _validator.shouldLockSubmitBtn,
      shouldLockSubmitBtn = _validator$shouldLock === void 0 ? false : _validator$shouldLock;

  if (hasError) {
    if (shouldCheckValidatorSettings && shouldLockSubmitBtn) {
      errorData.shouldLockSubmitBtn = true;
    } else if (shouldCheckValidatorSettings !== true) {
      errorData.shouldLockSubmitBtn = true;
    }
  }
};

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Функция проходит через данные контрола, и на их основании определяет блокировать ли кнопку ввода
 *
 * @param {CurrentControlData} currentControlData - Все данные по переданному контролу
 * @param {FormProps} form - главный объект формы
 *
 * @returns {boolean}
 *
 */

var shouldLockSubmitBtnByControl = function shouldLockSubmitBtnByControl(currentControlData, form) {
  var currentControl = currentControlData.currentControl,
      hookData = _objectSpread$5(_objectSpread$5({}, currentControlData), {}, {
    newValue: currentControl.value,
    selectedValue: null,
    form: form
  }),
      lockSubmitValidator = currentControl.customLockSubmitBtnValidator || form.formSettings.customLockSubmitBtnValidator || defaultStaticValidator,
      additionalLockSubmitBtnValidator = currentControl.additionalLockSubmitBtnValidator || form.formSettings.additionalLockSubmitBtnValidator || null,
      hasLockSubmitBtnValidator = typeof lockSubmitValidator === "function",
      hasAdditionalLockSubmitBtnValidator = typeof additionalLockSubmitBtnValidator === "function",
      errorData = {
    shouldLockSubmitBtn: false
  };
  /**
   * Запуск валидатора по правилам
   */


  if (hasLockSubmitBtnValidator) setLockSubmitBtnValidatorResult(lockSubmitValidator, hookData, errorData, true);
  /**
   * Запуск дополнительного валидатора
   */

  if (hasAdditionalLockSubmitBtnValidator) setLockSubmitBtnValidatorResult(additionalLockSubmitBtnValidator, hookData, errorData);
  return errorData.shouldLockSubmitBtn;
};
/**
 * @description
 * Функция проходит через данные всех контролов, и на их основании определяет нужно ли блокировать кнопку
 *
 * @param {FormProps} form - главный объект формы, содержащий все контролы
 *
 * @returns {boolean}
 */

var shouldLockSubmitBtnByForm = function shouldLockSubmitBtnByForm(form) {
  return formCycle(form, shouldLockSubmitBtnByControl);
};

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Функция добавить обработку входных данных, для всех типов контролов,
 * Обработчики работают для всех типов контролов, даже если их типы меняются динамически
 *
 * @param {string | number} newValue - Новое значение которое выбирают или вводят
 * @param {string} controlName - Имя контрола (username or password)
 * @param {number | null} controlIndex - Индекс элемента вложенного контрола(если это вложенный контрол)
 * @param {number | null} formIndex - Индекс формы(если это мульти форма)
 * @param {SetFormProps} setForm - Функция изменяющая главный объект формы
 * @param {typeof inputEvents} eventType - Тип события который произошел на контроле
 * @param {string | number} selectedValue - Выбранное значение если это кликабильный контрол
 *
 * @returns {void}
 */

var addControlHandler = function addControlHandler(newValue, controlName) {
  var controlIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var formIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var setForm = arguments.length > 4 ? arguments[4] : undefined;
  var eventType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var selectedValue = arguments.length > 6 ? arguments[6] : undefined;
  //@todo: async/await хуки, добавить снаружи от setForm, и все сделать async
  setForm(function (prevForm) {
    var form = _objectSpread$4({}, prevForm);
    /**
     * 1.Получить контрол на который будет повешен обработчик
     * 2.Собрать все данные для хуков обработчика
     */


    var currentControl = getControlFromForm(form, controlName, formIndex, controlIndex),
        hookData = {
      currentControl: currentControl,
      controlIndex: controlIndex,
      formIndex: formIndex,
      controlName: controlName,
      newValue: newValue,
      form: form,
      selectedValue: selectedValue
    };
    /**
     * Получить хуки контрола
     */

    var beforeChange = currentControl.beforeChange || form.formSettings.beforeChange || null,
        afterChange = currentControl.afterChange || form.formSettings.afterChange || null;
    /**
     * @description
     * Хук срабатывающий до изменения значения инпута
     * В нем можно менять весь объект формы, но исходящие данные из инпута и ошибки
     * Будут перезатерты после изменения значения инпута
     */

    if (typeof beforeChange === "function") {
      beforeChange(hookData);
    }
    /**
     * @description
     * Функция изменения значения(валидация, запись ошибок, запись значения, блокировка записи)
     */


    liveInputHandler(currentControl, form, hookData, eventType, setForm);
    /**
     * @description
     * Хук срабатывающий после изменения значения инпута
     * В нем можно менять весь объект формы, а так же введенные значения и ошибки
     */

    if (typeof afterChange === "function") {
      afterChange(hookData);
    }
    /**
     * После каждого ввода проверять по всем контролам формы(так как текущий контрол может влиять на другие)
     * Блокировать ли кнопку отправки
     */


    form.formParams.isSubmitBtnLocked = shouldLockSubmitBtnByForm(form);
    return form;
  });
};

/**
 * @description
 * Добавить все настройки контролу (валидаторы, экземпляры и тд)
 *
 * @param {CurrentControlData} currentControlData - Все данные по перебираемому контролу
 * @param {FormProps} form - главный объект формы
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean}
 */

var addControlSetting = function addControlSetting(currentControlData, form, setForm) {
  var currentControl = currentControlData.currentControl,
      controlName = currentControlData.controlName,
      inputMask = currentControl.maskSetting || null,
      hasMask = inputMask,
      _currentControl$type = currentControl.type,
      type = _currentControl$type === void 0 ? null : _currentControl$type,
      value = currentControl.value,
      controlsExampleList = form.controlsExample;

  if (!type) {
    console.error("type is require control prop");
  } else {
    /**
     * Добавить обязательные поля
     */
    addRequireFields(currentControlData);
    /**
     * Наложить все слои настроек валидатора для контрола
     */

    addValidatorsSettingsLayerToSingleControl(currentControl, form);
    /**
     * Обработчик входных данных
     */

    currentControl.setValue = function (newValue, controlIndex, formIndex) {
      var eventType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var selectedValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      return addControlHandler(newValue, controlName, controlIndex, formIndex, setForm, eventType, selectedValue);
    };
    /**
     * Поставить маску на инпут изначально, если маска должна быть всегда видима
     */


    if (hasMask && !Array.isArray(value)) {
      var shouldShowInputMaskAlways = inputMask.eventWhenPlaceholderVisible === "always";
      if (shouldShowInputMaskAlways) maskWriteValue(inputMask, currentControl, value, 'focus');
    }
    /**
     * Записать экземпляр контрола
     */


    addControlExample$1(controlsExampleList, currentControlData);
    /**
     * Проверить при инициализации контрола, блокировать ли кнопку
     */

    form.formParams.isSubmitBtnLocked = shouldLockSubmitBtnByControl(currentControlData, form);
  }

  return true;
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @description
 * Функция записывает все ошибки контролов формы, в объект с всеми ошибками формы
 *
 * @param {string} errorMessage - Текст ошибки контрола
 * @param {FormProps} form - Объект формы куда будут писатся все ошибки
 * @param {HookProps} hooksData - Данные контрола
 *
 */
var setControlErrorToFormErrorList = function setControlErrorToFormErrorList(errorMessage, form, hooksData) {
  var _hooksData$formIndex = hooksData.formIndex,
      formIndex = _hooksData$formIndex === void 0 ? null : _hooksData$formIndex,
      controlName = hooksData.controlName,
      isMultiForm = formIndex !== null,
      newError = _defineProperty({}, controlName, errorMessage);
  /**
   * Зафиксировать ошибки за определенной формой по индексу
   */


  if (isMultiForm) {
    var formErrors = form.formParams.errorList[formIndex];
    form.formParams.errorList[formIndex] = _objectSpread$3(_objectSpread$3({}, formErrors), newError);
  } else {
    if (Array.isArray(form.formParams.errorList) && controlName) {
      form.formParams.errorList.push(newError);
    }
  }
};

var defaultBeforeSubmitValidatorErrorHandler = function defaultBeforeSubmitValidatorErrorHandler(errorDataForControl, hooksData) {
  //@todo: form тащить из хука или из род функции
  var currentControl = hooksData.currentControl,
      form = hooksData.form,
      controlLabel = currentControl.label,
      value = currentControl.value,
      _ref = errorDataForControl || {},
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? null : _ref$message,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? null : _ref$limit,
      beforeError = currentControl.beforeSubmitValidatorError || form.formSettings.beforeSubmitValidatorError || null,
      afterError = currentControl.afterSubmitValidatorError || form.formSettings.afterSubmitValidatorError || null;
  /**
   * Хук перед всплытием ошибки
   */


  if (typeof beforeError === "function") {
    beforeError(hooksData);
  }

  if (errorDataForControl) {
    /**
     * Обработанное сообщение об ошибке
     */
    var errorMessage = replaceLayoutSymbols(message, {
      limit: limit,
      controlLabel: controlLabel,
      writeToControlValue: value
    });
    /**
     * Записать ошибку контрола
     */

    currentControl.error = errorMessage;
    /**
     * Записать ошибку в список ошибок формы
     */

    setControlErrorToFormErrorList(errorMessage, form, hooksData);
    /**
     * Отобразить ошибку
     */

    currentControl.hasError = true;
  }
  /**
   * Хук после всплытием ошибки
   */


  if (typeof afterError === "function") {
    afterError(hooksData);
  }
};

/**
 * @description
 * Записывает результат статического валидатора перед отправкой данный на сервер
 *
 * @param {LiveValidator} validator - Валидатор, результат которого будет записыватся
 * @param {HookProps} hookProps - Данные для работы валидатора
 * @param {ControlOutputDataProps} beforeSubmitErrorData - Объект в котором хранятся результаты валидации
 *
 * @returns {void}
 */
var setBeforeSubmitValidatorResult = function setBeforeSubmitValidatorResult(validator, hookProps, beforeSubmitErrorData) {
  var _validator = validator(hookProps),
      _validator$errorData = _validator.errorData,
      errorData = _validator$errorData === void 0 ? null : _validator$errorData,
      hasError = errorData.hasError;
  /**
   * Отметить флаг что в контроле была хоть одна ошибка
   */


  if (hasError) {
    beforeSubmitErrorData.isControlBeforeSubmitValidationSuccess = false;
    beforeSubmitErrorData.hasControlError = true;
  }
  /**
   * Записать настройки вывода ошибки в главный объект вывода
   */


  if (errorData) beforeSubmitErrorData.errorDataForControl = errorData;
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var controlsHandlerBeforeSubmit = function controlsHandlerBeforeSubmit(currentControlData, form) {
  var currentControl = currentControlData.currentControl,
      hookData = _objectSpread$2(_objectSpread$2({}, currentControlData), {}, {
    newValue: currentControl.value,
    selectedValue: null,
    form: form
  }),
      submitValidator = currentControl.customSubmitValidator || form.formSettings.customSubmitValidator || defaultStaticValidator,
      additionalSubmitValidator = currentControl.additionalSubmitValidator || form.formSettings.additionalSubmitValidator || null,
      beforeSubmitValidator = currentControl.beforeSubmitValidator || form.formSettings.beforeSubmitValidator || null,
      afterSubmitValidator = currentControl.afterSubmitValidator || form.formSettings.afterSubmitValidator || null,
      hasSubmitValidator = typeof submitValidator === "function",
      hasAdditionalSubmitValidator = typeof additionalSubmitValidator === "function",
      beforeSubmitErrorData = {
    isControlBeforeSubmitValidationSuccess: true,
    errorDataForControl: null,
    hasControlError: false
  };
  /**
   * Хук перед валидацией
   */


  if (typeof beforeSubmitValidator === "function") {
    beforeSubmitValidator(hookData);
  }
  /**
   * Запуск валидатора по правилам
   */


  if (hasSubmitValidator) setBeforeSubmitValidatorResult(submitValidator, hookData, beforeSubmitErrorData);
  /**
   * Запуск дополнительного валидатора
   */

  if (hasAdditionalSubmitValidator) setBeforeSubmitValidatorResult(additionalSubmitValidator, hookData, beforeSubmitErrorData);
  var isControlBeforeSubmitValidationSuccess = beforeSubmitErrorData.isControlBeforeSubmitValidationSuccess,
      errorDataForControl = beforeSubmitErrorData.errorDataForControl,
      hasControlError = beforeSubmitErrorData.hasControlError;
  /**
   * Обработать ошибку контрола
   */

  if (hasControlError) defaultBeforeSubmitValidatorErrorHandler(errorDataForControl, hookData);
  /**
   * Хук после валидации
   */

  if (typeof afterSubmitValidator === "function") {
    afterSubmitValidator(hookData);
  }

  return isControlBeforeSubmitValidationSuccess;
};

/**
 * @description
 * Функция обрабатывающая отправку формы на сервер
 *
 * @param {SetFormProps} setForm - Функция обрабрабатывающая глобальный объект формы
 */

var submitFlukyFormHandler = function submitFlukyFormHandler(setForm) {
  setForm(function (form) {
    form.formParams.errorList = [];
    form.formParams.isFormTriedSubmit = true;
    /**
     * Про валидироват все контролы перед отправкой
     */

    var isAllControlsValid = formCycle(form, controlsHandlerBeforeSubmit);

    if (isAllControlsValid) {
      var _form$formSettings = form.formSettings,
          _form$formSettings$ac = _form$formSettings.action,
          action = _form$formSettings$ac === void 0 ? null : _form$formSettings$ac,
          _form$formSettings$af = _form$formSettings.afterSuccessSubmit,
          afterSuccessSubmit = _form$formSettings$af === void 0 ? null : _form$formSettings$af,
          _form$formSettings$af2 = _form$formSettings.afterErrorSubmit,
          afterErrorSubmit = _form$formSettings$af2 === void 0 ? null : _form$formSettings$af2,
          _form$formSettings$af3 = _form$formSettings.afterSubmit,
          afterSubmit = _form$formSettings$af3 === void 0 ? null : _form$formSettings$af3,
          initAction = action ? _typeof(action) === 'object' && action.toSubmit ? action.toSubmit : String(action) : null;

      if (initAction) {
        axios__default['default'].post(initAction).then(function (data) {
          var status = data.status;
          /**
           * Хук успешной отправки
           */

          if (status === 200 && typeof afterSuccessSubmit === "function") {
            afterSuccessSubmit(data);
          }
          /**
           * Хук не успешной отправки
           */


          if (status === 500 && typeof afterErrorSubmit === "function") {
            afterErrorSubmit(data);
          }
          /**
           * Хук после любой отправки
           */


          if (typeof afterSubmit === "function") {
            afterSubmit(data);
          }
        }).catch(function (data) {
          var status = data.status;
          /**
           * Хук не успешной отправки
           */

          if (status === 500 && typeof afterErrorSubmit === "function") {
            afterErrorSubmit(data);
          }
          /**
           * Хук после любой отправки
           */


          if (typeof afterSubmit === "function") {
            afterSubmit(data);
          }
        });
      }
    }
  });
};
/**
 * @description
 * 1.Подгрузка данных с бекенда(валидаторы, данные)
 * 2.Применение описанных конфигов ко всем контролам
 *
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {AxiosResponse} apiResponse - Ответ от API(валидаторы, данные)
 * @param {FormConfigProps} formConfig - объект с настройками поведения формы, передаваемый с наружи(хуки, тип валидации и тд)
 * @param {FormParamsProps} formParams - объект с внутренним состоянием формы(загрузилась ли, была ли попытка отправить)
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 */

var initFlukyForm = function initFlukyForm(form, apiResponse, formConfig, formParams, setForm) {
  //Добавить значения и валидаторы с бека
  // initActiveValues(apiResponse, form.controls)

  /**
   * @description
   * Заинитить настройки для каждого контрола
   *
   * @param {FormProps} form - Главная форма содержащая все контролы
   * @param {SetFormProps} addControlSetting - функция принимающая данный, функция которая добирается до каждого контрола
   * @param {SetFormProps} setForm - функция изменяющая главный объект формы
   */
  formCycle(form, addControlSetting, setForm);
};
/**
 * @description
 * Запускает валидатор на блокирование кнопки отправления, и при необходимости блокирует или открывает кнопку отправления
 *
 * @param {FormProps} form - Главный объект формы
 */

var toggleSubmitBtnLockRelativeLockValidatorError = function toggleSubmitBtnLockRelativeLockValidatorError(form) {
  form.formParams.isSubmitBtnLocked = shouldLockSubmitBtnByForm(form);
};

/**
 * Отдать массив мульти контрола
 */
var getMultiControlArray = function getMultiControlArray(controls, controlName) {
  var formIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var controlArray = []; //Если группа форм, отдать массив контрола из этой формы

  if (Array.isArray(controls)) {
    //Если передали индекс формы
    if (formIndex !== null) {
      controlArray = controls[formIndex][controlName];
    } //Если одиночная форма, просто отдать массив мультиконтрола

  } else {
    controlArray = controls[controlName];
  }

  return controlArray;
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Добавить экземпляр формы
 *
 * @param {SetFormProps} setForm - Функция обрабатывающая глобальный объект формы
 *
 */

var addFormExample = function addFormExample(setForm) {
  setForm(function (form) {
    /**
     * Если это мульти форма
     */
    if (Array.isArray(form.controls)) {
      //Добавить копию заиниченной формы, если ничего не передали
      var formExample = _objectSpread$1({}, form.controlsExample),
          controls = form.controls; //Добавить новую форму


      controls.push(formExample); //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены

      toggleSubmitBtnLockRelativeLockValidatorError(form);
    }
  });
};
/**
 * @description
 * Удалить экземпляр формы по индексу
 *
 * @param {number | null} formIndex - Индекс формы
 * @param {SetFormProps} setForm - Функция обрабатывающая глобальный объект формы
 *
 */

var removeFormByIndex = function removeFormByIndex() {
  var formIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var setForm = arguments.length > 1 ? arguments[1] : undefined;
  var isMultiform = formIndex != null;

  if (isMultiform) {
    setForm(function (form) {
      //Если группа форм
      if (Array.isArray(form.controls)) {
        //Удалить форму
        form.controls.splice(formIndex, 1); //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены

        toggleSubmitBtnLockRelativeLockValidatorError(form);
      }
    });
  }
}; //Добавить экземпляр переданного контрола

var addControlExample = function addControlExample(setForm, controlName) {
  var formIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  setForm(function (form) {
    var controls = form.controls,
        multiControlArray = getMultiControlArray(controls, controlName, formIndex),
        controlExample = _objectSpread$1({}, form.controlsExample[controlName][0]);

    multiControlArray.push(controlExample); //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены

    toggleSubmitBtnLockRelativeLockValidatorError(form);
  });
}; //Удалить контрол из списка контролов

var removeControlFromListByIndex = function removeControlFromListByIndex(setForm, controlName) {
  var formIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var controlIndex = arguments.length > 3 ? arguments[3] : undefined;

  //Проверка наличия индекса и имя контрола
  if (controlIndex !== null && controlName) {
    setForm(function (form) {
      var formControls = form.controls,
          multiControlArrayForRemove = getMultiControlArray(formControls, controlName, formIndex);
      multiControlArrayForRemove.splice(controlIndex, 1); //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены

      toggleSubmitBtnLockRelativeLockValidatorError(form);
    });
  }
}; // //Добавить новый контрол в список существующего
// export const addNewControlToControlList = (setForm: any, controlName: string, formIndex: null | number = null, newControlLayout: ControlProps) => {
//
//     setForm((form:FormProps) => {
//         const controls = form.controls,
//             controlArray = getMultiControlArray(controls, controlName, formIndex)
//
//             controlArray.push(newControlLayout)
//
//         const newControlIndex = controlArray.length - 1,
//             newControl = controlArray[newControlIndex]
//
//         //Наложить все настройки на новый контрол
//         addControlSetting(newControl, controlName, form, formIndex, newControlIndex, setForm)
//
//         //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
//         toggleSubmitBtnLockRelativeLockValidatorError(form)
//     })
//
// }
//
// //Добавить новый контрол в форму
// export const addNewControlToForm = (setForm: any, controlName: string, newFormControl: ControlProps | ControlProps[], formIndex: null | number = null) => {
//
//     setForm((form:FormProps) => {
//
//         let newControl = null,
//             newControlIndex = null
//
//         if (controlName) {
//
//             if (formIndex === null) {
//
//                 if (!Array.isArray(form.controls)) {
//
//                     form.controls[controlName] = newFormControl
//                     newControl = form.controls[controlName]
//                 }
//
//             } else {
//
//
//                 if (Array.isArray(form.controls)) {
//                     form.controls[formIndex][controlName] = newFormControl
//                     newControl = form.controls[formIndex][controlName]
//                 }
//
//             }
//
//             //Наложить все настройки на новый контрол
//             addControlSetting(newControl, controlName, form, formIndex, newControlIndex, setForm)
//
//             //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
//             toggleSubmitBtnLockRelativeLockValidatorError(form)
//         }
//
//     })
//
// }
//
// export const removeControlFromForm = (setForm: any, controlName: string, formIndex: number | null = null) => {
//
//     setForm((form: FormProps) => {
//         formIndex != null ? delete form.controls[formIndex][controlName] : delete form.controls[controlName]
//     })
//
// }
//
// //Добавить новую форму
// export const addNewForm = (setForm: any, addedNewForm: ControlsProps) => {
//
//     setForm((form:FormProps) => {
//
//         //Если список контролов массив
//         if (Array.isArray(form.controls)) {
//
//             //Добавить копию заиниченной формы, если ничего не передали
//             const controls = form.controls
//
//             //Добавить новую форму
//             controls.push(addedNewForm)
//
//             const newFormIndex = form.controls.length
//
//             //Прогнать все контролы новой формы через инит
//             controlsCycle(addControlSetting, addedNewForm, form, newFormIndex, setForm)
//
//             //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
//             toggleSubmitBtnLockRelativeLockValidatorError(form)
//
//             // //Провалидировать все контролы после добавления новой формы
//             // form.formParams.isAllFormsValid = isFormValid(controls)
//             //
//             // //Индекс добавленной формы
//             // const newFormIndex = controls.length - 1,
//             //     newFormControls = controls[newFormIndex]
//             //
//             // //Добавить все дефолтные настройки новой форме
//             // addLiveValidatorsLayersForControls(form, newForm, form.formSettings)
//             // addHandlersToUpdateState(newFormControls, setForm, form.formSettings.formName)
//         }
//
//     })
//
//
//
// }

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var classname = {exports: {}};

var classname_production_min = {};

function r(r){function e(e,i,a,o){var f=i?t+e+r.e+i:t+e,v=f;if(a){var u=' '+v+r.m;for(var s in a)if(a.hasOwnProperty(s)){var p=a[s];1==p?v+=u+s:p&&(v+=u+s+n+p);}}if(void 0!==o)for(var c=0,l=o.length;c<l;c++){var y=o[c];if(y&&'string'==typeof y.valueOf())for(var g=y.valueOf().split(' '),d=0;d<g.length;d++){var h=g[d];h!==f&&(v+=' '+h);}}return v}var t=r.n||'',n=r.v||r.m;return function(r,t){return function(n,i,a){return 'string'==typeof n?Array.isArray(i)?e(r,n,void 0,i):e(r,n,i,a):e(r,t,n,i)}}}Object.defineProperty(classname_production_min,'__esModule',{value:1});var e=r({e:'-',m:'_'});classname_production_min.cn=e,classname_production_min.withNaming=r;

var classname_development = {};

Object.defineProperty(classname_development, '__esModule', { value: true });

/**
 * BEM className configure function.
 *
 * @example
 * ``` ts
 *
 * import { withNaming } from '@bem-react/classname';
 *
 * const cn = withNaming({ n: 'ns-', e: '__', m: '_' });
 *
 * cn('block', 'elem'); // 'ns-block__elem'
 * ```
 *
 * @param preset settings for the naming convention
 */
function withNaming(preset) {
    var nameSpace = preset.n || '';
    var modValueDelimiter = preset.v || preset.m;
    function stringify(b, e, m, mix) {
        var entityName = e ? nameSpace + b + preset.e + e : nameSpace + b;
        var className = entityName;
        if (m) {
            var modPrefix = ' ' + className + preset.m;
            for (var k in m) {
                if (m.hasOwnProperty(k)) {
                    var modVal = m[k];
                    if (modVal === true) {
                        className += modPrefix + k;
                    }
                    else if (modVal) {
                        className += modPrefix + k + modValueDelimiter + modVal;
                    }
                }
            }
        }
        if (mix !== undefined) {
            for (var i = 0, len = mix.length; i < len; i++) {
                var value = mix[i];
                // Skipping non-string values and empty strings
                if (!value || typeof value.valueOf() !== 'string')
                    continue;
                var mixes = value.valueOf().split(' ');
                for (var j = 0; j < mixes.length; j++) {
                    var val = mixes[j];
                    if (val !== entityName) {
                        className += ' ' + val;
                    }
                }
            }
        }
        return className;
    }
    return function cnGenerator(b, e) {
        return function (elemOrMods, elemModsOrBlockMix, elemMix) {
            if (typeof elemOrMods === 'string') {
                if (Array.isArray(elemModsOrBlockMix)) {
                    return stringify(b, elemOrMods, undefined, elemModsOrBlockMix);
                }
                return stringify(b, elemOrMods, elemModsOrBlockMix, elemMix);
            }
            return stringify(b, e, elemOrMods, elemModsOrBlockMix);
        };
    };
}
/**
 * BEM Entity className initializer with React naming preset.
 *
 * @example
 * ``` ts
 *
 * import { cn } from '@bem-react/classname';
 *
 * const cat = cn('Cat');
 *
 * cat(); // Cat
 * cat({ size: 'm' }); // Cat_size_m
 * cat('Tail'); // Cat-Tail
 * cat('Tail', { length: 'small' }); // Cat-Tail_length_small
 *
 * const dogPaw = cn('Dog', 'Paw');
 *
 * dogPaw(); // Dog-Paw
 * dogPaw({ color: 'black', exists: true }); // Dog-Paw_color_black Dog-Paw_exists
 * ```
 *
 * @see https://en.bem.info/methodology/naming-convention/#react-style
 */
var cn = withNaming({
    e: '-',
    m: '_',
});

classname_development.cn = cn;
classname_development.withNaming = withNaming;

if (process.env.NODE_ENV === 'production') {
  classname.exports = classname_production_min;
} else {
  classname.exports = classname_development;
}

function camelToDash(stringForConvert) {
  var result = stringForConvert.replace(/[A-Z]/g, '-$&').toLowerCase();
  return result;
}

var bemClassName = classname.exports.withNaming({
  e: '__',
  m: '_',
  v: '-'
});

var camelCaseModifiersToDash = function camelCaseModifiersToDash(camelCaseModifiers) {
  var dashModifiers = {};
  Object.keys(camelCaseModifiers).forEach(function (camelCaseKey) {
    var dashKey = camelToDash(camelCaseKey);
    dashModifiers[dashKey] = camelCaseModifiers[camelCaseKey];
  });
  return dashModifiers;
};

var blockClassesConcat = function blockClassesConcat(blockName, modifiers) {
  var additionalClasses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var block = bemClassName(blockName),
      blockBemClasses = block(camelCaseModifiersToDash(modifiers)),
      blockClasses = "".concat(blockBemClasses, " ").concat(additionalClasses).trim();
  return blockClasses;
};

var elementClassesConcat = function elementClassesConcat(blockName, element, modifiers) {
  var additionalClasses = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var block = bemClassName(blockName),
      blockBemClasses = block(element, camelCaseModifiersToDash(modifiers)),
      blockClasses = "".concat(blockBemClasses, " ").concat(additionalClasses).trim();
  return blockClasses;
};

var t=function(t,e){setTimeout((function(){t.selectionStart=e,t.selectionEnd=e;}),0);};

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

/**
 * Checks if a given element has a CSS class.
 * 
 * @param element the element
 * @param className the CSS class name
 */
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

/**
 * Adds a CSS class to a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!hasClass(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}

function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}
/**
 * Removes a CSS class from a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */


function removeClass$1(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}

var config = {
  disabled: false
};

var timeoutsShape = process.env.NODE_ENV !== 'production' ? PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].shape({
  enter: PropTypes__default['default'].number,
  exit: PropTypes__default['default'].number,
  appear: PropTypes__default['default'].number
}).isRequired]) : null;
var classNamesShape = process.env.NODE_ENV !== 'production' ? PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].shape({
  enter: PropTypes__default['default'].string,
  exit: PropTypes__default['default'].string,
  active: PropTypes__default['default'].string
}), PropTypes__default['default'].shape({
  enter: PropTypes__default['default'].string,
  enterDone: PropTypes__default['default'].string,
  enterActive: PropTypes__default['default'].string,
  exit: PropTypes__default['default'].string,
  exitDone: PropTypes__default['default'].string,
  exitActive: PropTypes__default['default'].string
})]) : null;

var TransitionGroupContext = React__default['default'].createContext(null);

var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM__default['default'].findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : ReactDOM__default['default'].findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM__default['default'].findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children;
        _this$props.in;
        _this$props.mountOnEnter;
        _this$props.unmountOnExit;
        _this$props.appear;
        _this$props.enter;
        _this$props.exit;
        _this$props.timeout;
        _this$props.addEndListener;
        _this$props.onEnter;
        _this$props.onEntering;
        _this$props.onEntered;
        _this$props.onExit;
        _this$props.onExiting;
        _this$props.onExited;
        _this$props.nodeRef;
        var childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      React__default['default'].createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : React__default['default'].cloneElement(React__default['default'].Children.only(children), childProps))
    );
  };

  return Transition;
}(React__default['default'].Component);

Transition.contextType = TransitionGroupContext;
Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: PropTypes__default['default'].shape({
    current: typeof Element === 'undefined' ? PropTypes__default['default'].any : function (propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return PropTypes__default['default'].instanceOf(value && 'ownerDocument' in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),

  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func.isRequired, PropTypes__default['default'].element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes__default['default'].bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes__default['default'].bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes__default['default'].bool,

  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: PropTypes__default['default'].bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes__default['default'].bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes__default['default'].bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes__default['default'].func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes__default['default'].func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes__default['default'].func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes__default['default'].func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes__default['default'].func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes__default['default'].func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes__default['default'].func
} : {}; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition$1 = Transition;

var _addClass = function addClass$1(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return addClass(node, c);
  });
};

var removeClass = function removeClass(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return removeClass$1(node, c);
  });
};
/**
 * A transition component inspired by the excellent
 * [ng-animate](https://docs.angularjs.org/api/ngAnimate) library, you should
 * use it if you're using CSS transitions or animations. It's built upon the
 * [`Transition`](https://reactcommunity.org/react-transition-group/transition)
 * component, so it inherits all of its props.
 *
 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
 * and `exit` states of the transition. The first class is applied and then a
 * second `*-active` class in order to activate the CSS transition. After the
 * transition, matching `*-done` class names are applied to persist the
 * transition state.
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <CSSTransition in={inProp} timeout={200} classNames="my-node">
 *         <div>
 *           {"I'll receive my-node-* classes"}
 *         </div>
 *       </CSSTransition>
 *       <button type="button" onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the `in` prop is set to `true`, the child component will first receive
 * the class `example-enter`, then the `example-enter-active` will be added in
 * the next tick. `CSSTransition` [forces a
 * reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
 * between before adding the `example-enter-active`. This is an important trick
 * because it allows us to transition between `example-enter` and
 * `example-enter-active` even though they were added immediately one after
 * another. Most notably, this is what makes it possible for us to animate
 * _appearance_.
 *
 * ```css
 * .my-node-enter {
 *   opacity: 0;
 * }
 * .my-node-enter-active {
 *   opacity: 1;
 *   transition: opacity 200ms;
 * }
 * .my-node-exit {
 *   opacity: 1;
 * }
 * .my-node-exit-active {
 *   opacity: 0;
 *   transition: opacity 200ms;
 * }
 * ```
 *
 * `*-active` classes represent which styles you want to animate **to**, so it's
 * important to add `transition` declaration only to them, otherwise transitions
 * might not behave as intended! This might not be obvious when the transitions
 * are symmetrical, i.e. when `*-enter-active` is the same as `*-exit`, like in
 * the example above (minus `transition`), but it becomes apparent in more
 * complex transitions.
 *
 * **Note**: If you're using the
 * [`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear)
 * prop, make sure to define styles for `.appear-*` classes as well.
 */


var CSSTransition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CSSTransition, _React$Component);

  function CSSTransition() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    };

    _this.onEnter = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument[0],
          appearing = _this$resolveArgument[1];

      _this.removeClasses(node, 'exit');

      _this.addClass(node, appearing ? 'appear' : 'enter', 'base');

      if (_this.props.onEnter) {
        _this.props.onEnter(maybeNode, maybeAppearing);
      }
    };

    _this.onEntering = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument2[0],
          appearing = _this$resolveArgument2[1];

      var type = appearing ? 'appear' : 'enter';

      _this.addClass(node, type, 'active');

      if (_this.props.onEntering) {
        _this.props.onEntering(maybeNode, maybeAppearing);
      }
    };

    _this.onEntered = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument3[0],
          appearing = _this$resolveArgument3[1];

      var type = appearing ? 'appear' : 'enter';

      _this.removeClasses(node, type);

      _this.addClass(node, type, 'done');

      if (_this.props.onEntered) {
        _this.props.onEntered(maybeNode, maybeAppearing);
      }
    };

    _this.onExit = function (maybeNode) {
      var _this$resolveArgument4 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument4[0];

      _this.removeClasses(node, 'appear');

      _this.removeClasses(node, 'enter');

      _this.addClass(node, 'exit', 'base');

      if (_this.props.onExit) {
        _this.props.onExit(maybeNode);
      }
    };

    _this.onExiting = function (maybeNode) {
      var _this$resolveArgument5 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument5[0];

      _this.addClass(node, 'exit', 'active');

      if (_this.props.onExiting) {
        _this.props.onExiting(maybeNode);
      }
    };

    _this.onExited = function (maybeNode) {
      var _this$resolveArgument6 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument6[0];

      _this.removeClasses(node, 'exit');

      _this.addClass(node, 'exit', 'done');

      if (_this.props.onExited) {
        _this.props.onExited(maybeNode);
      }
    };

    _this.resolveArguments = function (maybeNode, maybeAppearing) {
      return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] // here `maybeNode` is actually `appearing`
      : [maybeNode, maybeAppearing];
    };

    _this.getClassNames = function (type) {
      var classNames = _this.props.classNames;
      var isStringClassNames = typeof classNames === 'string';
      var prefix = isStringClassNames && classNames ? classNames + "-" : '';
      var baseClassName = isStringClassNames ? "" + prefix + type : classNames[type];
      var activeClassName = isStringClassNames ? baseClassName + "-active" : classNames[type + "Active"];
      var doneClassName = isStringClassNames ? baseClassName + "-done" : classNames[type + "Done"];
      return {
        baseClassName: baseClassName,
        activeClassName: activeClassName,
        doneClassName: doneClassName
      };
    };

    return _this;
  }

  var _proto = CSSTransition.prototype;

  _proto.addClass = function addClass(node, type, phase) {
    var className = this.getClassNames(type)[phase + "ClassName"];

    var _this$getClassNames = this.getClassNames('enter'),
        doneClassName = _this$getClassNames.doneClassName;

    if (type === 'appear' && phase === 'done' && doneClassName) {
      className += " " + doneClassName;
    } // This is to force a repaint,
    // which is necessary in order to transition styles when adding a class name.


    if (phase === 'active') {
      /* eslint-disable no-unused-expressions */
      node && node.scrollTop;
    }

    if (className) {
      this.appliedClasses[type][phase] = className;

      _addClass(node, className);
    }
  };

  _proto.removeClasses = function removeClasses(node, type) {
    var _this$appliedClasses$ = this.appliedClasses[type],
        baseClassName = _this$appliedClasses$.base,
        activeClassName = _this$appliedClasses$.active,
        doneClassName = _this$appliedClasses$.done;
    this.appliedClasses[type] = {};

    if (baseClassName) {
      removeClass(node, baseClassName);
    }

    if (activeClassName) {
      removeClass(node, activeClassName);
    }

    if (doneClassName) {
      removeClass(node, doneClassName);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props;
        _this$props.classNames;
        var props = _objectWithoutPropertiesLoose(_this$props, ["classNames"]);

    return /*#__PURE__*/React__default['default'].createElement(Transition$1, _extends({}, props, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };

  return CSSTransition;
}(React__default['default'].Component);

CSSTransition.defaultProps = {
  classNames: ''
};
CSSTransition.propTypes = process.env.NODE_ENV !== "production" ? _extends({}, Transition$1.propTypes, {
  /**
   * The animation classNames applied to the component as it appears, enters,
   * exits or has finished the transition. A single name can be provided, which
   * will be suffixed for each stage, e.g. `classNames="fade"` applies:
   *
   * - `fade-appear`, `fade-appear-active`, `fade-appear-done`
   * - `fade-enter`, `fade-enter-active`, `fade-enter-done`
   * - `fade-exit`, `fade-exit-active`, `fade-exit-done`
   *
   * A few details to note about how these classes are applied:
   *
   * 1. They are _joined_ with the ones that are already defined on the child
   *    component, so if you want to add some base styles, you can use
   *    `className` without worrying that it will be overridden.
   *
   * 2. If the transition component mounts with `in={false}`, no classes are
   *    applied yet. You might be expecting `*-exit-done`, but if you think
   *    about it, a component cannot finish exiting if it hasn't entered yet.
   *
   * 2. `fade-appear-done` and `fade-enter-done` will _both_ be applied. This
   *    allows you to define different behavior for when appearing is done and
   *    when regular entering is done, using selectors like
   *    `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply
   *    an epic entrance animation when element first appears in the DOM using
   *    [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can
   *    simply use `fade-enter-done` for defining both cases.
   *
   * Each individual classNames can also be specified independently like:
   *
   * ```js
   * classNames={{
   *  appear: 'my-appear',
   *  appearActive: 'my-active-appear',
   *  appearDone: 'my-done-appear',
   *  enter: 'my-enter',
   *  enterActive: 'my-active-enter',
   *  enterDone: 'my-done-enter',
   *  exit: 'my-exit',
   *  exitActive: 'my-active-exit',
   *  exitDone: 'my-done-exit',
   * }}
   * ```
   *
   * If you want to set these classes using CSS Modules:
   *
   * ```js
   * import styles from './styles.css';
   * ```
   *
   * you might want to use camelCase in your CSS file, that way could simply
   * spread them instead of listing them one by one:
   *
   * ```js
   * classNames={{ ...styles }}
   * ```
   *
   * @type {string | {
   *  appear?: string,
   *  appearActive?: string,
   *  appearDone?: string,
   *  enter?: string,
   *  enterActive?: string,
   *  enterDone?: string,
   *  exit?: string,
   *  exitActive?: string,
   *  exitDone?: string,
   * }}
   */
  classNames: classNamesShape,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
   * applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEnter: PropTypes__default['default'].func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter-active' or
   * 'appear-active' class is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes__default['default'].func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or
   * 'appear' classes are **removed** and the `done` class is added to the DOM node.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntered: PropTypes__default['default'].func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' class is
   * applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExit: PropTypes__default['default'].func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit-active' is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExiting: PropTypes__default['default'].func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' classes
   * are **removed** and the `exit-done` class is added to the DOM node.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExited: PropTypes__default['default'].func
}) : {};
var CSSTransition$1 = CSSTransition;

var FlakyInput = function FlakyInput(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className;
      _ref.elementsClassName;
      var _ref$labelProps = _ref.labelProps,
      labelProps = _ref$labelProps === void 0 ? {} : _ref$labelProps,
      _ref$errorProps = _ref.errorProps,
      errorProps = _ref$errorProps === void 0 ? {} : _ref$errorProps,
      _ref$inputProps = _ref.inputProps,
      inputProps = _ref$inputProps === void 0 ? {} : _ref$inputProps,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type,
      _ref$havePasswordVisi = _ref.havePasswordVisibleSwitch,
      havePasswordVisibleSwitch = _ref$havePasswordVisi === void 0 ? false : _ref$havePasswordVisi,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? '' : _ref$label,
      _ref$error = _ref.error,
      error = _ref$error === void 0 ? '' : _ref$error,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? null : _ref$placeholder,
      _ref$hasError = _ref.hasError,
      hasError = _ref$hasError === void 0 ? false : _ref$hasError,
      _ref$inputName = _ref.inputName,
      inputName = _ref$inputName === void 0 ? null : _ref$inputName,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      _ref$setValue = _ref.setValue,
      setValue = _ref$setValue === void 0 ? function () {
    console.error('(Input-component) add handler to prop: setValue');
  } : _ref$setValue,
      _ref$controlIndex = _ref.controlIndex,
      controlIndex = _ref$controlIndex === void 0 ? null : _ref$controlIndex,
      _ref$formIndex = _ref.formIndex,
      formIndex = _ref$formIndex === void 0 ? null : _ref$formIndex,
      _ref$maskSetting = _ref.maskSetting,
      maskSetting = _ref$maskSetting === void 0 ? null : _ref$maskSetting,
      _ref$togglePasswordVi = _ref.togglePasswordVisibility,
      togglePasswordVisibility = _ref$togglePasswordVi === void 0 ? function () {
    return console.log('password visibility switch is empty');
  } : _ref$togglePasswordVi;

  var inputRef = React.useRef(null),
      _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      wasBackspaceClick = _useState2[0],
      setWasBackspaceClick = _useState2[1],
      $input = inputRef.current,
      block = bemClassName('entry-field'),
      blockClasses = blockClassesConcat(block(), {}, className),
      inputClasses = elementClassesConcat(block(), 'input', {}, ''),
      labelClasses = elementClassesConcat(block(), 'label', {}, ''),
      errorClasses = elementClassesConcat(block(), 'error', {}, ''),
      errorAnimatePrefix = block('error', {
    animate: true
  }),
      _ref2 = maskSetting || {},
      _ref2$eventWhenPlaceh = _ref2.eventWhenPlaceholderVisible,
      eventWhenPlaceholderVisible = _ref2$eventWhenPlaceh === void 0 ? null : _ref2$eventWhenPlaceh,
      maskPlaceholder = _ref2.maskPlaceholder,
      _maskWithPlaceholder = _ref2._maskWithPlaceholder,
      hasMaskWithPlaceholder = eventWhenPlaceholderVisible && eventWhenPlaceholderVisible !== 'write',
      hasHoverMask = eventWhenPlaceholderVisible === 'hover',
      hasMaskWithBlur = eventWhenPlaceholderVisible === 'hover' || eventWhenPlaceholderVisible === 'focus',
      passwordClasses = elementClassesConcat(block(), 'password-switch', {}, ''),
      setCaretForMask = function setCaretForMask() {
    if (maskPlaceholder) {
      var caretIndex = String(value).indexOf(maskPlaceholder),
          caretIndexForBackspace = String(_maskWithPlaceholder).lastIndexOf(maskPlaceholder, caretIndex),
          shouldPutCaretForBackspace = caretIndexForBackspace === -1 && wasBackspaceClick && _maskWithPlaceholder[caretIndexForBackspace - 2] === maskPlaceholder,
          shouldPutCaretForWrite = caretIndex != -1;

      if (shouldPutCaretForBackspace) {
        t($input, caretIndexForBackspace - 3);
      } else if (shouldPutCaretForWrite) {
        t($input, caretIndex);
      }
    }
  },
      wrapperClickHandler = function wrapperClickHandler(e) {
    if ($input) $input.focus();
  },
      clickHandler = function clickHandler(e) {
    if (hasMaskWithPlaceholder) setCaretForMask();
  },
      keyDownHandler = function keyDownHandler(e) {
    return setWasBackspaceClick(function () {
      return e.key === 'Backspace';
    });
  },
      inputChangeHandler = function inputChangeHandler(e) {
    var writeValue = $input.value;
    setValue(writeValue, controlIndex, formIndex, e.type);
    setCaretForMask();
  },
      hoverHandler = function hoverHandler(e) {
    if (hasHoverMask) setValue(value, controlIndex, formIndex, e.type);
  },
      mouseLeaveHandler = function mouseLeaveHandler(e) {
    if (hasHoverMask) setValue(value, controlIndex, formIndex, e.type);
  },
      focusHandler = function focusHandler(e) {
    if (hasMaskWithPlaceholder) {
      setValue(value, controlIndex, formIndex, e.type);
      setCaretForMask();
    }
  },
      blurHandler = function blurHandler(e) {
    if (hasMaskWithBlur) setValue(value, controlIndex, formIndex, e.type);
  },
      isInputNotEmpty = Boolean(value),
      isPasswordVisible = havePasswordVisibleSwitch && type === 'text',
      concatInputName = "".concat(inputName).concat(controlIndex !== null ? "[".concat(controlIndex, "]") : '').trim(); //Индекс для групповой формы


  if (formIndex !== null && concatInputName) {
    concatInputName = concatInputName.replace('[', "[".concat(formIndex, "]["));
  }

  React.useEffect(function () {
    if (hasMaskWithPlaceholder) setCaretForMask();
  }, [value]);
  type = type === 'number' || type === 'date' ? 'phone' : type;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    onClick: function onClick(e) {
      return wrapperClickHandler();
    },
    className: blockClasses,
    "data-element": "input-wrapper",
    style: style
  }, /*#__PURE__*/React__default['default'].createElement(CSSTransition$1, {
    in: hasError,
    timeout: 500,
    classNames: errorAnimatePrefix,
    mountOnEnter: true,
    unmountOnExit: true
  }, /*#__PURE__*/React__default['default'].createElement("p", _extends({
    className: errorClasses
  }, errorProps), error || '')), /*#__PURE__*/React__default['default'].createElement("label", _extends({
    className: labelClasses
  }, labelProps), label), /*#__PURE__*/React__default['default'].createElement("input", _extends({
    "data-is-not-empty": isInputNotEmpty,
    type: type,
    name: concatInputName,
    value: value || ''.trim(),
    className: inputClasses,
    onChange: inputChangeHandler,
    onKeyDown: keyDownHandler,
    onMouseOver: hoverHandler,
    onMouseLeave: mouseLeaveHandler,
    onFocus: focusHandler,
    onBlur: blurHandler,
    onClick: clickHandler,
    autoComplete: "off",
    placeholder: placeholder,
    ref: inputRef
  }, inputProps)), havePasswordVisibleSwitch ? /*#__PURE__*/React__default['default'].createElement("div", {
    "data-is-password-visible": isPasswordVisible,
    onClick: function onClick() {
      return togglePasswordVisibility(type);
    },
    className: passwordClasses
  }) : '');
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Хук инициализации формы
 *
 * @param {ControlsProps | ControlsProps[]} controls - массив контролы формы
 * @param {FormConfigProps} customFormConfig - объект с настройками поведения формы, передаваемый с наружи(хуки, тип валидации и тд)
 * @returns {[FormProps, any]} контролы с нужными настройками, функцию для изменения состояния формы
 *
 */

var useFlakyForm = function useFlakyForm(controls, customFormConfig) {
  var formParams = {
    loaded: false,
    isFormTriedSubmit: false,
    isSubmitBtnLocked: false,
    errorList: [],
    commonError: ''
  },
      formValidatorsSetting = combineValidatorsSettingsLayers(DEFAULT_FORM_SETTINGS.formValidatorsSetting, customFormConfig.formValidatorsSetting),
      _useState = React.useState({
    controls: controls,
    formParams: formParams,
    formSettings: _objectSpread(_objectSpread(_objectSpread({}, DEFAULT_FORM_SETTINGS), {}, {
      formName: FORM_NAME
    }, customFormConfig), {}, {
      formValidatorsSetting: formValidatorsSetting
    }),
    controlsExample: {}
  }),
      _useState2 = _slicedToArray(_useState, 2),
      flukyForm = _useState2[0],
      setForm = _useState2[1];

  React.useEffect(function () {
    (function () {
      var _asyncFunction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _customFormConfig$act, action, initAction, apiResponse;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _customFormConfig$act = customFormConfig.action;
                action = _customFormConfig$act === void 0 ? null : _customFormConfig$act;
                initAction = action ? _typeof(action) === 'object' && action.toInit ? action.toInit : String(action) : null;

                if (!initAction) {
                  _context.next = 9;
                  break;
                }

                _context.next = 6;
                return axios__default['default'].post(initAction);

              case 6:
                _context.t0 = _context.sent;
                _context.next = 10;
                break;

              case 9:
                _context.t0 = null;

              case 10:
                apiResponse = _context.t0;
                setForm(function (prevForm) {
                  var form = _objectSpread({}, prevForm);

                  initFlukyForm(form, apiResponse, customFormConfig, formParams, setForm);
                  return form;
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function asyncFunction() {
        return _asyncFunction.apply(this, arguments);
      }

      return asyncFunction;
    })()();
  }, []);
  return [flukyForm, setForm];
};

var FlakyForm = function FlakyForm(_ref) {
  var children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? 'form' : _ref$className;
      _ref.id;
      _ref.action;
      var formState = _ref.formState,
      setForm = _ref.setForm;

  formState.formParams.loaded;
      var currentFormName = formState.formSettings.formName,
      submitHandler = function submitHandler(e) {
    e.preventDefault();
    submitFlukyFormHandler(setForm);
  };

  return /*#__PURE__*/React__default['default'].createElement("form", {
    id: String(currentFormName),
    className: className,
    onSubmit: submitHandler
  }, children, /*#__PURE__*/React__default['default'].createElement("input", {
    "data-element": 'hidden-submit-trigger',
    type: 'submit',
    style: {
      opacity: 0,
      width: 0,
      height: 0,
      position: 'absolute',
      zIndex: -1
    }
  }));
};

var AddFormExample = function AddFormExample(_ref2) {
  var setForm = _ref2.setForm,
      _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? 'Добавить форму' : _ref2$value,
      children = _ref2.children;

  var clickHandler = function clickHandler(e) {
    return addFormExample(setForm);
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: 'add-form-clone',
    onClick: clickHandler
  }, value ? value : children);
};

var RemoveForm = function RemoveForm(_ref3) {
  var setForm = _ref3.setForm,
      formIndex = _ref3.formIndex,
      value = _ref3.value,
      children = _ref3.children;

  var clickHandler = function clickHandler(e) {
    return removeFormByIndex(formIndex, setForm);
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: 'remove-form-clone',
    onClick: clickHandler
  }, value ? value : children);
};

var AddControlExample = function AddControlExample(_ref4) {
  var setForm = _ref4.setForm,
      controlName = _ref4.controlName,
      _ref4$formIndex = _ref4.formIndex,
      formIndex = _ref4$formIndex === void 0 ? null : _ref4$formIndex;

  var clickHandler = function clickHandler(e) {
    return addControlExample(setForm, controlName, formIndex);
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: 'add-form-clone',
    onClick: clickHandler
  }, "+ c");
};

var RemoveControl = function RemoveControl(_ref5) {
  var setForm = _ref5.setForm,
      controlName = _ref5.controlName,
      controlIndex = _ref5.controlIndex,
      _ref5$formIndex = _ref5.formIndex,
      formIndex = _ref5$formIndex === void 0 ? null : _ref5$formIndex;

  var clickHandler = function clickHandler(e) {
    return removeControlFromListByIndex(setForm, controlName, formIndex, controlIndex);
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: 'remove-control',
    onClick: clickHandler
  }, "- c");
};

exports.AddControlExample = AddControlExample;
exports.AddFormExample = AddFormExample;
exports.FlakyForm = FlakyForm;
exports.FlakyInput = FlakyInput;
exports.RemoveControl = RemoveControl;
exports.RemoveForm = RemoveForm;
exports.useFlakyForm = useFlakyForm;
