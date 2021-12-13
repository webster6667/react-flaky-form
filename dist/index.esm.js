import r,{useState as t,useEffect as e}from"react";import n from"axios";function o(r,t,e,n,o,i,a){try{var u=r[i](a),c=u.value}catch(r){return void e(r)}u.done?t(c):Promise.resolve(c).then(n,o)}function i(r){return function(){var t=this,e=arguments;return new Promise((function(n,i){var a=r.apply(t,e);function u(r){o(a,n,i,u,c,"next",r)}function c(r){o(a,n,i,u,c,"throw",r)}u(void 0)}))}}function a(r,t,e){return t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r}function u(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}function c(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=e){var n,o,i=[],a=!0,u=!1;try{for(e=e.call(r);!(a=(n=e.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(r){u=!0,o=r}finally{try{a||null==e.return||e.return()}finally{if(u)throw o}}return i}}(r,t)||function(r,t){if(r){if("string"==typeof r)return u(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?u(r,t):void 0}}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var l=Object.prototype,s=l.hasOwnProperty,f="function"==typeof Symbol?Symbol:{},h=f.iterator||"@@iterator",p=f.asyncIterator||"@@asyncIterator",m=f.toStringTag||"@@toStringTag";function v(r,t,e,n){var o=t&&t.prototype instanceof d?t:d,i=Object.create(o.prototype),a=new D(n||[]);return i._invoke=function(r,t,e){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return V()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var u=N(a,e);if(u){if(u===b)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var c=y(r,t,e);if("normal"===c.type){if(n=e.done?"completed":"suspendedYield",c.arg===b)continue;return{value:c.arg,done:e.done}}"throw"===c.type&&(n="completed",e.method="throw",e.arg=c.arg)}}}(r,e,a),i}function y(r,t,e){try{return{type:"normal",arg:r.call(t,e)}}catch(r){return{type:"throw",arg:r}}}var b={};function d(){}function g(){}function w(){}var O={};O[h]=function(){return this};var E=Object.getPrototypeOf,S=E&&E(E(A([])));S&&S!==l&&s.call(S,h)&&(O=S);var j=w.prototype=d.prototype=Object.create(O);function L(r){["next","throw","return"].forEach((function(t){r[t]=function(r){return this._invoke(t,r)}}))}function k(r){var t="function"==typeof r&&r.constructor;return!!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))}function P(r,t){function e(n,o,i,a){var u=y(r[n],r,o);if("throw"!==u.type){var c=u.arg,l=c.value;return l&&"object"==typeof l&&s.call(l,"__await")?t.resolve(l.__await).then((function(r){e("next",r,i,a)}),(function(r){e("throw",r,i,a)})):t.resolve(l).then((function(r){c.value=r,i(c)}),(function(r){return e("throw",r,i,a)}))}a(u.arg)}var n;this._invoke=function(r,o){function i(){return new t((function(t,n){e(r,o,t,n)}))}return n=n?n.then(i,i):i()}}function N(r,t){var e=r.iterator[t.method];if(undefined===e){if(t.delegate=null,"throw"===t.method){if(r.iterator.return&&(t.method="return",t.arg=undefined,N(r,t),"throw"===t.method))return b;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return b}var n=y(e,r.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,b;var o=n.arg;return o?o.done?(t[r.resultName]=o.value,t.next=r.nextLoc,"return"!==t.method&&(t.method="next",t.arg=undefined),t.delegate=null,b):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,b)}function x(r){var t={tryLoc:r[0]};1 in r&&(t.catchLoc=r[1]),2 in r&&(t.finallyLoc=r[2],t.afterLoc=r[3]),this.tryEntries.push(t)}function T(r){var t=r.completion||{};t.type="normal",delete t.arg,r.completion=t}function D(r){this.tryEntries=[{tryLoc:"root"}],r.forEach(x,this),this.reset(!0)}function A(r){if(r){var t=r[h];if(t)return t.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var e=-1,n=function t(){for(;++e<r.length;)if(s.call(r,e))return t.value=r[e],t.done=!1,t;return t.value=undefined,t.done=!0,t};return n.next=n}}return{next:V}}function V(){return{value:undefined,done:!0}}g.prototype=j.constructor=w,w.constructor=g,w[m]=g.displayName="GeneratorFunction",L(P.prototype),P.prototype[p]=function(){return this},L(j),j[m]="Generator",j[h]=function(){return this},j.toString=function(){return"[object Generator]"},D.prototype={constructor:D,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=undefined,this.done=!1,this.delegate=null,this.method="next",this.arg=undefined,this.tryEntries.forEach(T),!r)for(var t in this)"t"===t.charAt(0)&&s.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=undefined)},stop:function(){this.done=!0;var r=this.tryEntries[0].completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var t=this;function e(e,n){return i.type="throw",i.arg=r,t.next=e,n&&(t.method="next",t.arg=undefined),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return e("end");if(o.tryLoc<=this.prev){var a=s.call(o,"catchLoc"),u=s.call(o,"finallyLoc");if(a&&u){if(this.prev<o.catchLoc)return e(o.catchLoc,!0);if(this.prev<o.finallyLoc)return e(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return e(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return e(o.finallyLoc)}}}},abrupt:function(r,t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&s.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===r||"continue"===r)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=r,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,b):this.complete(i)},complete:function(r,t){if("throw"===r.type)throw r.arg;return"break"===r.type||"continue"===r.type?this.next=r.arg:"return"===r.type?(this.rval=this.arg=r.arg,this.method="return",this.next="end"):"normal"===r.type&&t&&(this.next=t),b},finish:function(r){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.finallyLoc===r)return this.complete(e.completion,e.afterLoc),T(e),b}},catch:function(r){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.tryLoc===r){var n=e.completion;if("throw"===n.type){var o=n.arg;T(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(r,t,e){return this.delegate={iterator:A(r),resultName:t,nextLoc:e},"next"===this.method&&(this.arg=undefined),b}};var B={wrap:v,isGeneratorFunction:k,AsyncIterator:P,mark:function(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,w):(r.__proto__=w,m in r||(r[m]="GeneratorFunction")),r.prototype=Object.create(j),r},awrap:function(r){return{__await:r}},async:function(r,t,e,n,o){void 0===o&&(o=Promise);var i=new P(v(r,t,e,n),o);return k(t)?i:i.next().then((function(r){return r.done?r.value:i.next()}))},keys:function(r){var t=[];for(var e in r)t.push(e);return t.reverse(),function e(){for(;t.length;){var n=t.pop();if(n in r)return e.value=n,e.done=!1,e}return e.done=!0,e}},values:A},C={formName:"form",formValidatorsRules:{minLength:{limit:0,liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null},maxLength:{limit:100,liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!0,showErrorTimeout:0,hideErrorTimeout:null},minValue:{limit:0,liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null},maxValue:{limit:1e3,liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null},required:{liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null},number:{liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!0,showErrorTimeout:0,hideErrorTimeout:null},email:{liveEnable:!1,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null}}};function I(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function _(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?I(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):I(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var R=function(r,t){var e=_({},r);return Object.keys(e).forEach((function(n){var o=r[n],i=t?t[n]:{};e[n]=_(_({},o),i)})),e};var F={exports:{}};!function(r){function t(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(r.exports=t=function(r){return typeof r},r.exports.default=r.exports,r.exports.__esModule=!0):(r.exports=t=function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},r.exports.default=r.exports,r.exports.__esModule=!0),t(e)}r.exports=t,r.exports.default=r.exports,r.exports.__esModule=!0}(F);var W=function(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}(F.exports),q=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.limit,n=void 0===e?null:e,o="string"==typeof n?Number(n):n,i=!Array.isArray(r)&&!["string","number"].includes(W(r)),a="number"!=typeof o&&null!==o||null!==o&&isNaN(o),u=Array.isArray(r)?r.length:String(r).length,c="number"==typeof o&&u<o;if(a)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value must be only string, number or array");return c},G=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.limit,n=void 0===e?null:e,o="string"==typeof n?Number(n):n,i=!Array.isArray(r)&&!["string","number"].includes(W(r)),a="number"!=typeof o&&null!==o||null!==o&&isNaN(o),u=Array.isArray(r)?r.length:String(r).length,c="number"==typeof o&&u>o;if(a)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value must be only string, number or array");return c},$=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.limit,n=void 0===e?null:e,o="string"==typeof n?Number(n):n,i=isNaN(Number(r))||null===r,a="number"!=typeof o&&null!==o||null!==o&&isNaN(o),u="number"==typeof o&&Number(r)>o;if(a)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value can be only number");return u},M=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.limit,n=void 0===e?null:e,o="string"==typeof n?Number(n):n,i=isNaN(Number(r))||null===r,a="number"!=typeof o&&null!==o||null!==o&&isNaN(o),u="number"==typeof o&&Number(r)<o;if(a)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value can be only number");return u},z=function(r){var t=!Array.isArray(r)&&!["string","number"].includes(W(r)),e=0===(Array.isArray(r)?r.length:String(r).length);if(t)throw new TypeError("written value can be only string or number");return e},Z=function(r,t){Object.keys(r).forEach((function(e){var n=t[e];n&&(r[e]=n)}))},Y=function(r){return!0===r.liveEnable};function H(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function U(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?H(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):H(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var J=function(r){var t=r.currentControl,e=r.newValue,n=t.validateRules||{},o=n.minValue,i=n.maxValue,a=n.minLength,u=n.maxLength,c=n.required,l=n.number,s=n.email,f={hasError:!1,hasErrorLockingSubmitBtn:!1,shouldLockNotValidWrite:!1,message:null,limit:null,showLiveErrorAfterFirstSubmit:!1,hideErrorTimeout:null,showErrorTimeout:null};if("string"==typeof e||"number"==typeof e){var h=l||{};h.dot,h.negative;var p=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=!["string","number"].includes(W(r))||null===r;r=String(r);var n=t||{},o=n.shouldLockNegativeNumber,i=void 0!==o&&o,a=n.shouldLockFloatNumber,u=void 0!==a&&a,c=n.allowableSymbols,l=void 0===c?[]:c,s=n.customRegExp,f=void 0===s?null:s,h=n.isLiveValidator,p=void 0!==h&&h,m=l.includes("-")?l.join("").replace(/-/g,"\\-"):l.join(""),v="".concat(m,"0-9"),y=new RegExp("^[-]?([".concat(v,"]+)?[.]?([").concat(v,"]+)?$")),b=(p?["-.",".",".-"]:["-.",".",".-","-"]).includes(r),d=!0;if(r){var g=y;i&&(g=u?new RegExp("^[".concat(v,"]+$")):new RegExp("^([".concat(v,"]+)?[.]?([").concat(v,"]+)?$"))),u&&(g=i?new RegExp("^[".concat(v,"]+$")):new RegExp("^[-]?([".concat(v,"]+)?$"))),d=g.test(r),b&&(d=!1),f&&(d=f.test(r))}if(e)throw new TypeError("written value can be only number or string");return d}(e,{shouldLockFloatNumber:!0,shouldLockNegativeNumber:!1}),m=!p,v=!0;if(!z(e)){if(p&&M(e,o)&&Y(o)){var y=o.shouldLockSubmitBtnWhenControlInvalid;Z(f,U(U({},o),{},{hasErrorLockingSubmitBtn:y,hasError:v}))}if(p&&$(e,i)&&Y(i)){var b=i.shouldLockSubmitBtnWhenControlInvalid;Z(f,U(U({},i),{},{hasErrorLockingSubmitBtn:b,hasError:v}))}if(q(e,a)&&Y(a)){var d=a.shouldLockSubmitBtnWhenControlInvalid;Z(f,U(U({},a),{},{hasErrorLockingSubmitBtn:d,hasError:v}))}if(G(e,u)&&Y(u)){var g=u.shouldLockSubmitBtnWhenControlInvalid;Z(f,U(U({},u),{},{hasErrorLockingSubmitBtn:g,hasError:v}))}if(s&&function(r){var t=!["string","number"].includes(W(r)),e=!/.+@.+\..+/i.test(String(r));if(t)throw new TypeError("written value can be only string or number");return e}(e)&&Y(s)){var w=s.shouldLockSubmitBtnWhenControlInvalid;Z(f,U(U({},s),{},{hasErrorLockingSubmitBtn:w,hasError:v}))}}if(c&&z(e)&&Y(c)){var O=c.shouldLockSubmitBtnWhenControlInvalid;Z(f,U(U({},c),{},{hasErrorLockingSubmitBtn:O,hasError:v}))}if(l&&m){var E=l.shouldLockSubmitBtnWhenControlInvalid;Z(f,U(U({},l),{},{hasErrorLockingSubmitBtn:E,hasError:v}))}}return{errorData:f}};function K(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function Q(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?K(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):K(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var X=function(r){var t=r.currentControl,e=r.newValue,n=t.validateRules||{},o=n.required,i=n.minValue,a=n.maxValue,u=n.minLength,c=n.maxLength,l={hasError:!1,hasErrorLockingSubmitBtn:!1,shouldLockNotValidWrite:!1,message:null,limit:null,showLiveErrorAfterFirstSubmit:null,hideErrorTimeout:null,showErrorTimeout:null},s=Array.isArray(e)?function(r){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r.reduce((function(r,e){return t&&isNaN(+e)?+r:+r+ +e}),0)}(e):null,f=!isNaN(s),h=!0;if(o&&z(e)&&Y(o)){var p=o.shouldLockSubmitBtnWhenControlInvalid;Z(l,Q(Q({},o),{},{hasError:h,hasErrorLockingSubmitBtn:p}))}if(i&&f&&M(s,i)&&Y(i)){var m=i.shouldLockSubmitBtnWhenControlInvalid;Z(l,Q(Q({},i),{},{hasError:h,hasErrorLockingSubmitBtn:m}))}if(a&&f&&$(s,a)&&Y(a)){var v=a.shouldLockSubmitBtnWhenControlInvalid;Z(l,Q(Q({},a),{},{hasError:h,hasErrorLockingSubmitBtn:v}))}if(u&&q(e,u)&&Y(u)){var y=u.shouldLockSubmitBtnWhenControlInvalid;Z(l,Q(Q({},u),{},{hasError:h,hasErrorLockingSubmitBtn:y}))}if(c&&G(e,c)&&Y(c)){var b=c.shouldLockSubmitBtnWhenControlInvalid;Z(l,Q(Q({},c),{},{hasError:h,hasErrorLockingSubmitBtn:b}))}return{errorData:l}};function rr(r,t){var e;return function(){for(var n=this,o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];var u=function(){r.apply(n,i)};return clearTimeout(e),e=setTimeout(u,t)}}var tr=function(r,t){r((function(r){var e=t.controlName;r.controls[e].hasError=!1}))};function er(r,t){if(r=+r,2===t.length&&t.push(t[1]),isNaN(r))throw new Error("type of quantity expect only number");return t[r%100>4&&r%100<20?2:[2,0,1,1,1,2][r%10<5?r%10:5]]}var nr=function(r,t){var e=t.limit;return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,e=!("string"==typeof r||"number"==typeof r||null===r);if(null===r)return"";if(e)throw new Error("message for replace has invalid type");var n=r;return n&&t.forEach((function(t){var e=t.searchLayout,o=t.valueToReplace,i=t.shouldClearSearchLayoutIfReplaceValueIsArray,a=void 0===i||i;if(null===o)return"";var u=new RegExp("".concat(e,"['[a-zA-Zа-яА-я]+', '[a-zA-Zа-яА-я]+'(, '[a-zA-Zа-яА-я]+')?]"),"g");if(u.test(n))n=n.replace(u,(function(r){var t=r.replace(new RegExp(e),"").replace(/[\[\]'"]/g,"").split(", "),n=isNaN(+o)?null:er(+o,t);return isNaN(+o)?o.toString():"".concat(o," ").concat(n)}));else{var c=a?"":o.toString(),l=Array.isArray(o)?c:String(o),s=""===l&&new RegExp(e+" ","g").test(r)?e+" ":e;n=n.replace(new RegExp(s,"g"),l)}})),n}(r,[{searchLayout:"{limit}",valueToReplace:e},{searchLayout:"limitForDecline",valueToReplace:e},{searchLayout:"{label}",valueToReplace:t.controlLabel},{searchLayout:"{writeValue}",valueToReplace:t.writeToControlValue}])},or=function(r,t,e,n){var o=t.controlName,i=t.newValue,a=e.controls[o],u=a.label,c=r||{},l=c.message,s=void 0===l?null:l,f=c.limit,h=void 0===f?null:f,p=c.hideErrorTimeout,m=void 0===p?null:p,v=a.beforeLiveValidatorError||e.formSettings.beforeLiveValidatorError||null,y=a.afterLiveValidatorError||e.formSettings.afterLiveValidatorError||null;if("function"==typeof v&&v(t),r&&(a.error=nr(s,{limit:h,controlLabel:u,writeToControlValue:i})),a.hasError=!0,m){var b=function(r,t,e){return rr(tr,e)(t,r)}(t,n,m);a._hideErrorTimeoutId=b}"function"==typeof y&&y(t)};function ir(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function ar(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?ir(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):ir(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var ur=function(r,t,e,n,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,a=Boolean(i),u=a?function(){return n((function(e){var o=ar({},e);return or(r,t,o,n),o}))}:function(){return or(r,t,e,n)},c=rr(u,i),l=r.hasError,s=null;return a?l?(o&&clearTimeout(o),s=c()):o&&clearTimeout(o):l&&u(),s},cr=function(r,t,e){var n=r(t,e.errorDataForControl),o=n.errorData,i=void 0===o?null:o,a=n.modifiedValueToWrite,u=void 0===a?null:a,c=i||{},l=c.shouldLockNotValidWrite,s=void 0!==l&&l,f=c.hasError,h=void 0!==f&&f,p=c.hasErrorLockingSubmitBtn,m=void 0!==p&&p;s&&(e.isWriteInputEnable=!1),h&&(e.hasAnyError=!0),m&&(e.hasAnyLockingSubmitBtnError=!0),u&&(e.writeToControlValue=u),i&&(e.errorDataForControl=i)};function lr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}var sr=function(r,t,e){var o=(0,r.liveSearch.request)(t),i=o.url,u=o.method,c=void 0===u?"get":u,l=o.data,s=void 0===l?{}:l;i&&(r.liveSearch.isLoading=!0,n({method:c,url:i,data:s}).then((function(r){var n=t.controlName;e((function(e){var o=function(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?lr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):lr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}({},e),i=o.controls[n];i.liveSearch.isLoading=!1;var u=i.liveSearch.response(t,r);return i.liveSearch.foundedData=u||r,o}))})))};function fr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}var hr=function(r,t,e){var n=r.liveSearch,o=r._liveSearchRequestTimeoutId,i=n.debounceTime,u=void 0===i?0:i,c=u?function(){return e((function(n){var o=function(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?fr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):fr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}({},n);return sr(r,t,e),o}))}:function(){sr(r,t,e)};u?(o&&clearTimeout(o),r._liveSearchRequestTimeoutId=rr(c,u)()):c()},pr=function(r,t,e,n,o){var i=r.type,a=r._hideErrorTimeoutId,u=void 0===a?null:a,c=r._showErrorTimeoutId,l=r.liveSearch,s=["phone","number","text","password","date"].includes(i)?J:X,f=r.customLiveValidator||s,h=r.additionalLiveValidator||null,p=e.newValue,m=t.formState.isFormTriedSubmit,v="function"==typeof h,y={writeToControlValue:p,errorDataForControl:null,hasAnyError:!1,isWriteInputEnable:!0,hasAnyLockingSubmitBtnError:!1};"function"==typeof f&&cr(f,e,y),v&&cr(h,e,y);var b=y.errorDataForControl,d=y.hasAnyError,g=y.hasAnyLockingSubmitBtnError,w=y.writeToControlValue,O=y.isWriteInputEnable,E=b||{},S=E.showLiveErrorAfterFirstSubmit,j=void 0!==S&&S,L=E.showErrorTimeout,k=void 0===L?0:L,P=!j;O&&(r.value=w,l&&hr(r,e,o)),d||(r.hasError=!1,u&&r._hideErrorTimeoutId&&clearTimeout(r._hideErrorTimeoutId)),r.hasErrorLockingSubmitBtn=g,(j&&m||P)&&(r._showErrorTimeoutId=ur(b,e,t,o,c,k))};function mr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function vr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?mr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):mr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var yr=function(r,t,e){var n=arguments.length>4?arguments[4]:void 0;e((function(o){var i=vr({},o),a=i.controls[t],u={currentControl:a,controlName:t,newValue:r,form:i,selectedValue:n},c=a.beforeChange||null,l=a.afterChange||null;"function"==typeof c&&c(u),pr(a,i,u,0,e),"function"==typeof l&&l(u);var s=!1,f=i.controls;return Object.keys(f).forEach((function(r){f[r].hasErrorLockingSubmitBtn&&(s=!0)})),i.formState.isSubmitBtnLocked=s,i}))};function br(r){return(br="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function dr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function gr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?dr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):dr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var wr=function(r,t,e){var n,o,i,a=r.currentControl,u=r.controlName,c=a.type,l=void 0===c?null:c;if(a.value,l){!function(r){var t=r.currentControl,e=r.controlName,n=r.formName;t.type,t.error="",t.hasError=!1,t.hasErrorLockingSubmitBtn=!1,t.controlName=e,t.inputName="".concat(n,"[").concat(e,"]"),t.value||(t.value="")}(r),n=a,o=t.formSettings.formValidatorsRules,i=n.validateRules||{},Object.keys(o).forEach((function(r){var t=i[r],e=o[r],n="boolean"==typeof t;"object"===br(t)?i[r]=gr(gr({},e),t):n&&(i[r]=gr({},e))})),a.setValue=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return yr(r,u,e,t,n)};var s=function(r,t){var e=r.currentControl,n=r.controlName,o=e.type,i=["phone","number","text","password","date"].includes(o)?J:X;return(e.customLiveValidator||i)({form:t,currentControl:e,controlName:n,newValue:e.value}).errorData.hasErrorLockingSubmitBtn}(r,t);a.hasErrorLockingSubmitBtn=s,!1===t.formState.isSubmitBtnLocked&&s&&(t.formState.isSubmitBtnLocked=!0)}else console.error("type is require control prop");return!0},Or=function(r,t,e){!function(r,t,e){var n=r.controls,o=!0;Object.keys(n).forEach((function(i){var a,u={currentControl:n[i],controlName:i,formName:(null===(a=r.formSettings)||void 0===a?void 0:a.formName)||""};!0!==t(u,r,e)&&(o=!1)}))}(r,wr,e)},Er=function(){var r=i(B.mark((function r(t,e,n){return B.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:t(function(){var r=i(B.mark((function r(o){var i;return B.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(o.formState.isFormTriedSubmit=!0,!n||"function"!=typeof n){r.next=8;break}return r.next=4,n();case 4:i=r.sent,t((function(r){"function"==typeof e&&e(r,i)})),r.next=9;break;case 8:"function"==typeof e&&e(o);case 9:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})));return function(t,e,n){return r.apply(this,arguments)}}(),Sr=function(r){var t=new FormData;return Object.keys(r).map((function(e){var n=r[e].value;Array.isArray(n)?n.map((function(r,o){t.set("".concat(String(e)).concat(o),String(n))})):t.set(String(e),String(n))})),t};function jr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function Lr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?jr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):jr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var kr=function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o={loaded:!1,isSubmitBtnLocked:!1,isFormTriedSubmit:!1},a=R(C.formValidatorsRules,n.formValidatorsRules),u=t({controls:r,formState:o,formSettings:Lr(Lr(Lr({},C),{},{formName:"form"},n),{},{formValidatorsRules:a})}),l=c(u,2),s=l[0],f=l[1],h=function(r){f((function(t){var e=Lr({},t);return r(e),e}))};return e((function(){var r;(r=i(B.mark((function r(){return B.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:f((function(r){var t=Lr({},r);return Or(t,0,f),t}));case 1:case"end":return r.stop()}}),r)}))),function(){return r.apply(this,arguments)})()}),[]),[s,h]},Pr=function(t){var e=t.children,n=t.className,o=void 0===n?"form":n,i=t.id,a=void 0===i?null:i,u=t.formStateProps,l=t.submitRequestFn,s=t.submitHandler,f=c(u,2),h=f[0],p=f[1];h.formState.loaded;var m=h.formSettings.formName;return r.createElement("form",{id:a||String(m),className:o,onSubmit:function(r){r.preventDefault(),Er(p,s,l)}},e,r.createElement("input",{"data-element":"hidden-submit-trigger",type:"submit",style:{opacity:0,width:0,height:0,position:"absolute",zIndex:-1}}))};export{Pr as FlakyForm,Sr as controlsToFormData,kr as useFlakyForm};
