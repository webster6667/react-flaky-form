import { useState, useEffect } from 'react';
import axios from 'axios';

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

//Дефолтное имя формы
var FORM_NAME = 'form'; //Слои настроек формы (из библиотеки + из global проекта)

var DEFAULT_FORM_SETTINGS = {
  formName: FORM_NAME,
  formValidatorsRules: {
    minLength: {
      limit: 0,
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    },
    maxLength: {
      limit: 100,
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: true,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    },
    minValue: {
      limit: 0,
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null
    },
    maxValue: {
      limit: 1000,
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
  }
};

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @description
 * Функция накладывает на слой валидатора, свойства из нового слоя, возвращая комбинированный слой валидаторов
 *
 * @param {ValidatorsRulesList} bottomLayer - Основной слой валидаторов
 * @param {ValidatorsRulesList} upperLayer - Слой который накладывается сверху
 *
 * @returns {ValidatorsRulesList}
 *
 */
var combineRulesLayers = function combineRulesLayers(bottomLayer, upperLayer) {
  var combineLayer = _objectSpread$7({}, bottomLayer);

  Object.keys(combineLayer).forEach(function (validatorName) {
    var validator = bottomLayer[validatorName],
        newValidatorLayer = upperLayer ? upperLayer[validatorName] : {};
    combineLayer[validatorName] = _objectSpread$7(_objectSpread$7({}, validator), newValidatorLayer);
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
 * @param {ControlsList} formControls - Список контролов по которым пройдется функция
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {SetForm} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
 *
 */
var controlsCycle = function controlsCycle(form, controlsCycleHandler, setForm) {
  var formControls = form.controls;
  var isAllControlsReturnTrue = true;
  /**
   * Перебор контролов одной формы
   */

  Object.keys(formControls).forEach(function (controlName) {
    var _form$formSettings;

    var control = formControls[controlName];
    var currentControlData = {
      currentControl: control,
      controlName: controlName,
      formName: ((_form$formSettings = form.formSettings) === null || _form$formSettings === void 0 ? void 0 : _form$formSettings.formName) || ''
    },
        isControlReturnTrue = controlsCycleHandler(currentControlData, form, setForm);
    if (isControlReturnTrue !== true) isAllControlsReturnTrue = false;
  });
  return isAllControlsReturnTrue;
};

/**
 * @description
 * Добавить обязательные поля для функционирования контролов
 *
 * @param {CurrentControlData} singleControlData - Все данные переданного контрола
 *
 * @returns {void}
 */
var addRequireControlFields = function addRequireControlFields(singleControlData) {
  var control = singleControlData.currentControl,
      controlName = singleControlData.controlName,
      formName = singleControlData.formName;
      control.type === 'select';
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
  // if (isSelectInput) {
  //
  //     /**
  //      * Обязательное isMultiply
  //      */
  //     control.isMultiple = control.isMultiple === true
  //
  //     let {options, value, selectPlaceholder} = control,
  //         hasSelectedValue = Array.isArray(value) ? value.length > 0: Boolean(value),
  //         isSingletonSelectHasEmptyActiveItem = options.length && !selectPlaceholder && control.isMultiple === false && !hasSelectedValue
  //
  //     /**
  //      * Если не определенно активное поле или плейсхолдер, сделать активным первое значение по дефолту
  //      */
  //     if (isSingletonSelectHasEmptyActiveItem) {
  //         control.value = options[0].value
  //     }
  //
  // }
};

function r(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var e$1={exports:{}};!function(r){function e(n){return "function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(r.exports=e=function(r){return typeof r},r.exports.default=r.exports,r.exports.__esModule=!0):(r.exports=e=function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},r.exports.default=r.exports,r.exports.__esModule=!0),e(n)}r.exports=e,r.exports.default=r.exports,r.exports.__esModule=!0;}(e$1);var n=r(e$1.exports),t=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.limit,o=void 0===t?null:t,i="string"==typeof o?Number(o):o,u=!Array.isArray(r)&&!["string","number"].includes(n(r)),l="number"!=typeof i&&null!==i||null!==i&&isNaN(i),a=Array.isArray(r)?r.length:String(r).length,s="number"==typeof i&&a<i;if(l)throw new TypeError("limit value must be only number or number in string like '1'");if(u)throw new TypeError("written value must be only string, number or array");return s},o=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.limit,o=void 0===t?null:t,i="string"==typeof o?Number(o):o,u=!Array.isArray(r)&&!["string","number"].includes(n(r)),l="number"!=typeof i&&null!==i||null!==i&&isNaN(i),a=Array.isArray(r)?r.length:String(r).length,s="number"==typeof i&&a>i;if(l)throw new TypeError("limit value must be only number or number in string like '1'");if(u)throw new TypeError("written value must be only string, number or array");return s},i=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.limit,t=void 0===n?null:n,o="string"==typeof t?Number(t):t,i=isNaN(Number(r))||null===r,u="number"!=typeof o&&null!==o||null!==o&&isNaN(o),l="number"==typeof o&&Number(r)>o;if(u)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value can be only number");return l},u=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.limit,t=void 0===n?null:n,o="string"==typeof t?Number(t):t,i=isNaN(Number(r))||null===r,u="number"!=typeof o&&null!==o||null!==o&&isNaN(o),l="number"==typeof o&&Number(r)<o;if(u)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value can be only number");return l},l=function(r){var e=!Array.isArray(r)&&!["string","number"].includes(n(r)),t=0===(Array.isArray(r)?r.length:String(r).length);if(e)throw new TypeError("written value can be only string or number");return t},a=function(r){var e=!["string","number"].includes(n(r)),t=!/.+@.+\..+/i.test(String(r));if(e)throw new TypeError("written value can be only string or number");return t},s=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=!["string","number"].includes(n(r))||null===r;r=String(r);var o=e||{},i=o.shouldLockNegativeNumber,u=void 0!==i&&i,l=o.shouldLockFloatNumber,a=void 0!==l&&l,s=o.allowableSymbols,y=void 0===s?[]:s,m=o.customRegExp,b=void 0===m?null:m,p=o.isLiveValidator,c=void 0!==p&&p,f=y.includes("-")?y.join("").replace(/-/g,"\\-"):y.join(""),g="".concat(f,"1-9"),v=new RegExp("^[-]?([".concat(g,"]+)?[.]?([").concat(g,"]+)?$")),w=c?["-.",".",".-"]:["-.",".",".-","-"],d=w.includes(r),h=!0;if(r){var N=v;u&&(N=a?new RegExp("^[".concat(g,"]+$")):new RegExp("^([".concat(g,"]+)?[.]?([").concat(g,"]+)?$"))),a&&(N=u?new RegExp("^[".concat(g,"]+$")):new RegExp("^[-]?([".concat(g,"]+)?$"))),h=N.test(r),d&&(h=!1),b&&(h=b.test(r));}if(t)throw new TypeError("written value can be only number or string");return h},y=function(r,e){Object.keys(r).forEach((function(n){var t=e[n];t&&(r[n]=t);}));};

/**
 * @description
 * Функция проверяет и возвращает, включен ли живой валидатор в переданных настройках валидатора
 *
 * @param {ValidatorRulesProps} controlValidatorsRules - обьект настройки валидатора
 *
 * @returns {boolean}
 */
var isLiveValidatorEnable = function isLiveValidatorEnable(controlValidatorsRules) {
  return controlValidatorsRules.liveEnable === true;
};

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
      minValueRules = controlValidatorsRules.minValue,
      maxValueRules = controlValidatorsRules.maxValue,
      minLengthRules = controlValidatorsRules.minLength,
      maxLengthRules = controlValidatorsRules.maxLength,
      requiredRules = controlValidatorsRules.required,
      numberRules = controlValidatorsRules.number,
      emailRules = controlValidatorsRules.email,
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

  if (typeof newValue === 'string' || typeof newValue === 'number') {
    var _ref = numberRules || {},
        _ref$dot = _ref.dot,
        dot = _ref$dot === void 0 ? false : _ref$dot,
        _ref$negative = _ref.negative,
        negative = _ref$negative === void 0 ? false : _ref$negative,
        isInputNumberValid = s(newValue, {
      shouldLockFloatNumber: !dot,
      shouldLockNegativeNumber: !negative
    }),
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
      if (isInputNumberValid && u(newValue, minValueRules) && isLiveValidatorEnable(minValueRules)) {
        y(errorData, _objectSpread$6(_objectSpread$6({}, minValueRules), {}, {
          hasError: hasError
        }));
      }
      /**
       * Live validator for greater limit
       */


      if (isInputNumberValid && i(newValue, maxValueRules) && isLiveValidatorEnable(maxValueRules)) {
        y(errorData, _objectSpread$6(_objectSpread$6({}, maxValueRules), {}, {
          hasError: hasError
        }));
      }
      /**
       * Live validator for shorter limit
       */


      if (t(newValue, minLengthRules) && isLiveValidatorEnable(minLengthRules)) {
        y(errorData, _objectSpread$6(_objectSpread$6({}, minLengthRules), {}, {
          hasError: hasError
        }));
      }
      /**
       * Live validator for longer limit
       */


      if (o(newValue, maxLengthRules) && isLiveValidatorEnable(maxLengthRules)) {
        y(errorData, _objectSpread$6(_objectSpread$6({}, maxLengthRules), {}, {
          hasError: hasError
        }));
      }
      /**
       * Live validator for valid email
       */


      if (emailRules && a(newValue) && isLiveValidatorEnable(emailRules)) {
        y(errorData, _objectSpread$6(_objectSpread$6({}, emailRules), {}, {
          hasError: hasError
        }));
      }
    }
    /**
     * Live validator for required field
     */


    if (requiredRules && l(newValue) && isLiveValidatorEnable(requiredRules)) {
      y(errorData, _objectSpread$6(_objectSpread$6(_objectSpread$6({}, requiredRules), requiredRules), {}, {
        hasError: hasError
      }));
    }
    /**
     * Live validator for valid number
     */


    if (numberRules && isInputNumberInvalid) {
      y(errorData, _objectSpread$6(_objectSpread$6(_objectSpread$6({}, numberRules), numberRules), {}, {
        hasError: hasError
      }));
    }
  }

  return {
    errorData: errorData
  };
};

function getArraySum(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.reduce((function(e,r){return n&&isNaN(+r)?+e:+e+ +r}),0);return r}

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
      controlValidatorsRules = currentControl.validateRules || {},
      requiredRules = controlValidatorsRules.required,
      minValueRules = controlValidatorsRules.minValue,
      maxValueRules = controlValidatorsRules.maxValue,
      minLengthRules = controlValidatorsRules.minLength,
      maxLengthRules = controlValidatorsRules.maxLength,
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

  if (requiredRules && l(newValue) && isLiveValidatorEnable(requiredRules)) {
    y(errorData, _objectSpread$5(_objectSpread$5(_objectSpread$5({}, requiredRules), requiredRules), {}, {
      hasError: hasError
    }));
  }
  /**
   * Минимальная сумма элементов
   */


  if (minValueRules && shouldValidateArraySumValue && u(newValueArraySum, minValueRules) && isLiveValidatorEnable(minValueRules)) {
    y(errorData, _objectSpread$5(_objectSpread$5(_objectSpread$5({}, minValueRules), minValueRules), {}, {
      hasError: hasError
    }));
  }
  /**
   * Максимальная сумма элементов
   */


  if (maxValueRules && shouldValidateArraySumValue && i(newValueArraySum, maxValueRules) && isLiveValidatorEnable(maxValueRules)) {
    y(errorData, _objectSpread$5(_objectSpread$5(_objectSpread$5({}, maxValueRules), maxValueRules), {}, {
      hasError: hasError
    }));
  }
  /**
   * Минимальное кол-во элементов
   */


  if (minLengthRules && t(newValue, minLengthRules) && isLiveValidatorEnable(minLengthRules)) {
    y(errorData, _objectSpread$5(_objectSpread$5(_objectSpread$5({}, minLengthRules), minLengthRules), {}, {
      hasError: hasError
    }));
  }
  /**
   * Максимальное кол-во элементов
   */


  if (maxLengthRules && o(newValue, maxLengthRules) && isLiveValidatorEnable(maxLengthRules)) {
    y(errorData, _objectSpread$5(_objectSpread$5(_objectSpread$5({}, maxLengthRules), maxLengthRules), {}, {
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
 * @param {SetForm} setForm - Функция изменяющая глобальный объект формы
 *
 * @returns {void}
 */

var hideLiveErrorHandler = function hideLiveErrorHandler(setForm, hooksData) {
  setForm(function (form) {
    var controlName = hooksData.controlName,
        currentControl = form.controls[controlName];
    currentControl.hasError = false;
  });
};

var hideError = function hideError(hooksData, setForm, ms) {
  var callHideError = debounce(hideLiveErrorHandler, ms),
      timeoutId = callHideError(setForm, hooksData);
  return timeoutId;
}; //
// /**
//  * @description
//  * Функция вызывающая скрытие ошибки через таймаут
//  *
//  * @param {HookProps} hooksData - Данные хука
//  * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
//  * @param {number} ms - время через которое нужно скрыть ошибку
//  *
//  * @returns {void}
//  *
//  */
// export const hideLiveErrorAfterTimeout: HideLiveErrorAfterTimeout = (
//   hooksData,
//   setForm,
//   ms,
// ) => {
//   const callHideError = debounce(hideLiveErrorHandler, ms),
//     timeoutId = callHideError(setForm, hooksData);
//
//   return timeoutId;
// };

function e(t,e){if(t=+t,2===e.length&&e.push(e[1]),isNaN(t))throw new Error("type of quantity expect only number");return e[t%100>4&&t%100<20?2:[2,0,1,1,1,2][t%10<5?t%10:5]]}

function messageLayoutsReplacer(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1?arguments[1]:void 0,n="string"==typeof r||"number"==typeof r||null===r,t=!n;if(null===r)return "";if(t)throw new Error("message for replace has invalid type");var l=r;return l&&a.forEach((function(a){var n=a.searchLayout,t=a.valueToReplace,o=a.shouldClearSearchLayoutIfReplaceValueIsArray,i=void 0===o||o;if(null===t)return "";var c=new RegExp("".concat(n,"['[a-zA-Zа-яА-я]+', '[a-zA-Zа-яА-я]+'(, '[a-zA-Zа-яА-я]+')?]"),"g");if(c.test(l))l=l.replace(c,(function(r){var a=r.replace(new RegExp(n),"").replace(/[\[\]'"]/g,"").split(", "),l=isNaN(+t)?null:e(+t,a);return isNaN(+t)?t.toString():"".concat(t," ").concat(l)}));else {var u=i?"":t.toString(),p=Array.isArray(t)?u:String(t),f=""===p&&new RegExp(n+" ","g").test(r)?n+" ":n;l=l.replace(new RegExp(f,"g"),p);}})),l}

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
 * @param {SetForm} setForm - Функция изменяющая глобальный объект формы
 *
 * @returns {void}
 *
 */

var defaultLiveErrorHandler = function defaultLiveErrorHandler(errorDataForControl, hooksData, form, setForm) {
  var controlName = hooksData.controlName,
      writeToControlValue = hooksData.newValue,
      currentControl = form.controls[controlName],
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


  if (typeof beforeError === 'function') {
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
    var hideErrorTimeoutId = hideError(hooksData, setForm, hideErrorTimeout);
    currentControl._hideErrorTimeoutId = hideErrorTimeoutId;
  }
  /**
   * Хук после всплытием ошибки
   */


  if (typeof afterError === 'function') {
    afterError(hooksData);
  }
};

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
      form = _objectSpread$4({}, prevForm);
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
      prevShowErrorTimeoutId && clearTimeout(prevShowErrorTimeoutId);
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
      _ref = errorData || {},
      _ref$shouldLockNotVal = _ref.shouldLockNotValidWrite,
      shouldLockNotValidWrite = _ref$shouldLockNotVal === void 0 ? false : _ref$shouldLockNotVal,
      _ref$hasError = _ref.hasError,
      hasError = _ref$hasError === void 0 ? false : _ref$hasError;

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

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Обработчик всех видов входных данных при вводе
 *
 * @param {ControlProps} currentControl - Контрол в который ввели данные и происходит обработка
 * @param {FormProps} form - Глобальный объект формы
 * @param {HookProps} hooksData - Данные для хуков
 * @param {typeof inputEvents} eventType - Тип сработающего события
 * @param {SetForm} setForm - Функция изменяющая главный объект формы
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
      hasLiveSearch = currentControl.liveSearch,
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
      liveValidator = currentControl.customLiveValidator || defaultValidateFunction;
      currentControl.additionalLiveValidator || null;
      var newValue = hooksData.newValue,
      isFormTriedSubmit = form.formState.isFormTriedSubmit;
  /**
   * Проверка наличия всех валидаторов
   */

  var hasLiveValidator = typeof liveValidator === 'function';
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
   * Записать результаты живого валидатора в объект вывода
   */

  if (hasLiveValidator) setLiveValidatorResult(liveValidator, hooksData, controlOutputData); // /**
  //  * Записать результаты дополнительного живого валидатора в объект вывода
  //  */
  // if (hasAdditionalLiveValidator) setLiveValidatorResult(additionalLiveValidator, hooksData, controlOutputData);

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
    /**
     * Живой ввод
     */

    if (hasLiveSearch) {
      var _currentControl$liveS = currentControl.liveSearch.request(hooksData),
          url = _currentControl$liveS.url,
          _currentControl$liveS2 = _currentControl$liveS.method,
          method = _currentControl$liveS2 === void 0 ? 'get' : _currentControl$liveS2,
          _currentControl$liveS3 = _currentControl$liveS.data,
          data = _currentControl$liveS3 === void 0 ? {} : _currentControl$liveS3;

      if (url) {
        currentControl.liveSearch.isLoading = true;
        axios({
          method: method,
          url: url,
          data: data
        }).then(function (requestResult) {
          var controlName = hooksData.controlName;
          setForm(function (prevForm) {
            var form = _objectSpread$3({}, prevForm),
                control = form.controls[controlName];
            /**
             * Выключить режим ожидания
             */


            control.liveSearch.isLoading = false;
            /**
             * Результат живого запроса
             */

            var foundedData = control.liveSearch.response(hooksData, requestResult);
            control.liveSearch.foundedData = foundedData || requestResult;
            return form;
          });
        });
      }
    }
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

    if (hasControlHideErrorTimeout) currentControl._hideErrorTimeoutId && clearTimeout(currentControl._hideErrorTimeoutId);
  }
  /**
   * Отобразить ошибки в живом времени, только после первой попытки отправки формы
   */


  if (showLiveErrorAfterFirstSubmit && isFormTriedSubmit) {
    currentControl._showErrorTimeoutId = liveValidatorShowErrorHandler(errorDataForControl, hooksData, form, setForm, showErrorTimeoutId, showErrorTimeout);
  } else if (showLiveErrorAlways) {
    currentControl._showErrorTimeoutId = liveValidatorShowErrorHandler(errorDataForControl, hooksData, form, setForm, showErrorTimeoutId, showErrorTimeout);
  }
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * @description
 * Функция добавить обработку входных данных, для всех типов контролов,
 * Обработчики работают для всех типов контролов, даже если их типы меняются динамически
 *
 * @param {string | number} newValue - Новое значение которое выбирают или вводят
 * @param {string} controlName - Имя контрола (username or password)
 * @param {SetForm} setForm - Функция изменяющая главный объект формы
 * @param {typeof inputEvents} eventType - Тип события который произошел на контроле
 * @param {string | number} selectedValue - Выбранное значение если это кликабильный контрол
 *
 * @returns {void}
 */

var addControlHandler = function addControlHandler(newValue, controlName, setForm) {
  var eventType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var selectedValue = arguments.length > 4 ? arguments[4] : undefined;
  //@todo: async/await хуки, добавить снаружи от setForm, и все сделать async
  setForm(function (prevForm) {
    var form = _objectSpread$2({}, prevForm);
    /**
     * 1.Получить контрол на который будет повешен обработчик
     * 2.Собрать все данные для хуков обработчика
     */


    var currentControl = form.controls[controlName],
        hookData = {
      currentControl: currentControl,
      controlName: controlName,
      newValue: newValue,
      form: form,
      selectedValue: selectedValue
    };
    /**
     * Получить хуки контрола
     */

    var beforeChange = currentControl.beforeChange || null,
        afterChange = currentControl.afterChange || null;
    /**
     * @description
     * Хук срабатывающий до изменения значения инпута
     * В нем можно менять весь объект формы, но исходящие данные из инпута и ошибки
     * Будут перезатерты после изменения значения инпута
     */

    if (typeof beforeChange === 'function') {
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

    if (typeof afterChange === 'function') {
      afterChange(hookData);
    }
    /**
     * После каждого ввода проверять по всем контролам формы(так как текущий контрол может влиять на другие)
     * Блокировать ли кнопку отправки
     */
    // form.formState.isSubmitBtnLocked = shouldLockSubmitBtnByForm(form);


    return form;
  });
};

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

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @description
 * Функция накладывающая слой настроек валидатора на контрол, из переданного ей объекта config, объединяя с слоем валидатора из формы
 *
 * @param {ControlProps} control - Контрол на который переданный слой настроек валидатора
 * @param {ValidatorsSettingList} validatorsSettingsList - Слой настроек валидатора
 *
 * @returns {void}
 *
 */
var addValidatorRulesToControl = function addValidatorRulesToControl(control, validatorsRulesList) {
  /**
   * Слой настроек валидатора лежащий самом контроле(если он есть)
   */
  var controlValidatorRulesList = control.validateRules || {};
  /**
   * Перебрать переданный слой настроек валидатора, и наложить на слой самого контрола
   */

  Object.keys(validatorsRulesList).forEach(function (validatorName) {
    /**
     * 1.Текущие настройки перебираемого валидатора у контрола(нужны для склейки с передаваемым слоем)
     * 2.Настройки перебираемого валидатора из переданного слоя(нужны для склейки с сущесвтвующими настройками валидатора контрола)
     * 3.Проверка типа перебираемого валидатора
     * (isObject ? добавить настройки объекта к валидатору : isBoolean ? ) : null
     */
    var controlValidatorRules = controlValidatorRulesList[validatorName],
        formValidatorRulesLayer = validatorsRulesList[validatorName],
        isObject = _typeof(controlValidatorRules) === 'object',
        isBoolean = typeof controlValidatorRules === "boolean";
    /**
     * Если передали объект, наложить его свойсва на текущие настройки валидатора контрола
     */

    if (isObject) {
      controlValidatorRulesList[validatorName] = _objectSpread$1(_objectSpread$1({}, formValidatorRulesLayer), controlValidatorRules);
    } else if (isBoolean) {
      /**
       * Если boolean, добавить к текущим настройкам валидатора контрола только включение режима живой валидации
       */
      controlValidatorRulesList[validatorName] = _objectSpread$1({}, formValidatorRulesLayer);
    }
  });
};

/**
 * @description
 * Добавить все настройки контролу (валидаторы, экземпляры и тд)
 *
 * @param {CurrentControlData} currentControlData - Все данные по перебираемому контролу
 * @param {FormProps} form - главный объект формы
 * @param {SetForm} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean}
 */

var addControlSetting = function addControlSetting(currentControlData, form, setForm) {
  var currentControl = currentControlData.currentControl,
      controlName = currentControlData.controlName,
      _currentControl$type = currentControl.type,
      type = _currentControl$type === void 0 ? null : _currentControl$type;
      currentControl.value;

  if (!type) {
    console.error("type is require control prop");
  } else {
    /**
     * Добавить обязательные поля
     */
    addRequireControlFields(currentControlData);
    /**
     * Наложить все слои настроек валидатора для контрола
     */

    addValidatorRulesToControl(currentControl, form.formSettings.formValidatorsRules); // combineFormsWithControlsRulesLayers(currentControl, form);

    /**
     * Обработчик входных данных
     */

    currentControl.setValue = function () {
      var newValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var eventType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var selectedValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return addControlHandler(newValue, controlName, setForm, eventType, selectedValue);
    }; // console.log('блок', isControlLockSubmit(currentControlData, form));

    /**
     * Проверить при инициализации контрола, блокировать ли кнопку
     */
    // form.formState.isSubmitBtnLocked = isControlLockSubmit(
    //   currentControlData,
    //   form,
    // );

  }

  return true;
};

/**
 * @description
 * 1.Подгрузка данных с бекенда(валидаторы, данные)
 * 2.Применение описанных конфигов ко всем контролам
 *
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {AxiosResponse} apiResponse - Ответ от API(валидаторы, данные)
 * @param {FormConfigProps} formConfig - объект с настройками поведения формы, передаваемый с наружи(хуки, тип валидации и тд)
 * @param {SetForm} setForm - функция изменяющая главный объект формы
 */

var initForm = function initForm(form, formConfig, setForm) {
  //Добавить значения и валидаторы с бека
  // initActiveValues(apiResponse, form.controls)

  /**
   * @description
   * Заинитить настройки для каждого контрола
   *
   * @param {FormProps} form - Главная форма содержащая все контролы
   * @param {AddControlSetting} addControlSetting - функция принимающая данный, функция которая добирается до каждого контрола
   * @param {SetForm} setForm - функция изменяющая главный объект формы
   */
  controlsCycle(form, addControlSetting, setForm);
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useFlakyForm = function useFlakyForm(controls) {
  var customFormConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var formState = {
    loaded: false,
    isSubmitBtnLocked: false,
    isFormTriedSubmit: false
  },
      formValidatorsRules = combineRulesLayers(DEFAULT_FORM_SETTINGS.formValidatorsRules, customFormConfig.formValidatorsRules),
      _useState = useState({
    controls: controls,
    formState: formState,
    formSettings: _objectSpread(_objectSpread(_objectSpread({}, DEFAULT_FORM_SETTINGS), {}, {
      formName: FORM_NAME
    }, customFormConfig), {}, {
      formValidatorsRules: formValidatorsRules
    })
  }),
      _useState2 = _slicedToArray(_useState, 2),
      flukyForm = _useState2[0],
      setForm = _useState2[1];

  useEffect(function () {
    (function () {
      var _asyncFunction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setForm(function (prevForm) {
                  var form = _objectSpread({}, prevForm);

                  initForm(form, customFormConfig, setForm);
                  return form;
                });

              case 1:
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

export { useFlakyForm };
