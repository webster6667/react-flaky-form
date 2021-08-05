import r,{useEffect as t}from"react";import e from"axios";import{useImmer as n}from"use-immer";function o(r){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function i(r,t,e,n,o,i,a){try{var l=r[i](a),u=l.value}catch(r){return void e(r)}l.done?t(u):Promise.resolve(u).then(n,o)}function a(r,t,e){return t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r}function l(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}function u(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=e){var n,o,i=[],a=!0,l=!1;try{for(e=e.call(r);!(a=(n=e.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(r){l=!0,o=r}finally{try{a||null==e.return||e.return()}finally{if(l)throw o}}return i}}(r,t)||function(r,t){if(r){if("string"==typeof r)return l(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(r,t):void 0}}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var c=Object.prototype,s=c.hasOwnProperty,f="function"==typeof Symbol?Symbol:{},m=f.iterator||"@@iterator",p=f.asyncIterator||"@@asyncIterator",h=f.toStringTag||"@@toStringTag";function d(r,t,e,n){var o=t&&t.prototype instanceof b?t:b,i=Object.create(o.prototype),a=new A(n||[]);return i._invoke=function(r,t,e){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return D()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var l=V(a,e);if(l){if(l===y)continue;return l}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var u=v(r,t,e);if("normal"===u.type){if(n=e.done?"completed":"suspendedYield",u.arg===y)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n="completed",e.method="throw",e.arg=u.arg)}}}(r,e,a),i}function v(r,t,e){try{return{type:"normal",arg:r.call(t,e)}}catch(r){return{type:"throw",arg:r}}}var y={};function b(){}function g(){}function O(){}var w={};w[m]=function(){return this};var E=Object.getPrototypeOf,j=E&&E(E(T([])));j&&j!==c&&s.call(j,m)&&(w=j);var S=O.prototype=b.prototype=Object.create(w);function P(r){["next","throw","return"].forEach((function(t){r[t]=function(r){return this._invoke(t,r)}}))}function L(r){var t="function"==typeof r&&r.constructor;return!!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))}function x(r,t){function e(n,o,i,a){var l=v(r[n],r,o);if("throw"!==l.type){var u=l.arg,c=u.value;return c&&"object"==typeof c&&s.call(c,"__await")?t.resolve(c.__await).then((function(r){e("next",r,i,a)}),(function(r){e("throw",r,i,a)})):t.resolve(c).then((function(r){u.value=r,i(u)}),(function(r){return e("throw",r,i,a)}))}a(l.arg)}var n;this._invoke=function(r,o){function i(){return new t((function(t,n){e(r,o,t,n)}))}return n=n?n.then(i,i):i()}}function V(r,t){var e=r.iterator[t.method];if(undefined===e){if(t.delegate=null,"throw"===t.method){if(r.iterator.return&&(t.method="return",t.arg=undefined,V(r,t),"throw"===t.method))return y;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var n=v(e,r.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,y;var o=n.arg;return o?o.done?(t[r.resultName]=o.value,t.next=r.nextLoc,"return"!==t.method&&(t.method="next",t.arg=undefined),t.delegate=null,y):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,y)}function N(r){var t={tryLoc:r[0]};1 in r&&(t.catchLoc=r[1]),2 in r&&(t.finallyLoc=r[2],t.afterLoc=r[3]),this.tryEntries.push(t)}function k(r){var t=r.completion||{};t.type="normal",delete t.arg,r.completion=t}function A(r){this.tryEntries=[{tryLoc:"root"}],r.forEach(N,this),this.reset(!0)}function T(r){if(r){var t=r[m];if(t)return t.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var e=-1,n=function t(){for(;++e<r.length;)if(s.call(r,e))return t.value=r[e],t.done=!1,t;return t.value=undefined,t.done=!0,t};return n.next=n}}return{next:D}}function D(){return{value:undefined,done:!0}}g.prototype=S.constructor=O,O.constructor=g,O[h]=g.displayName="GeneratorFunction",P(x.prototype),x.prototype[p]=function(){return this},P(S),S[h]="Generator",S[m]=function(){return this},S.toString=function(){return"[object Generator]"},A.prototype={constructor:A,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=undefined,this.done=!1,this.delegate=null,this.method="next",this.arg=undefined,this.tryEntries.forEach(k),!r)for(var t in this)"t"===t.charAt(0)&&s.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=undefined)},stop:function(){this.done=!0;var r=this.tryEntries[0].completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var t=this;function e(e,n){return i.type="throw",i.arg=r,t.next=e,n&&(t.method="next",t.arg=undefined),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return e("end");if(o.tryLoc<=this.prev){var a=s.call(o,"catchLoc"),l=s.call(o,"finallyLoc");if(a&&l){if(this.prev<o.catchLoc)return e(o.catchLoc,!0);if(this.prev<o.finallyLoc)return e(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return e(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return e(o.finallyLoc)}}}},abrupt:function(r,t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&s.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===r||"continue"===r)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=r,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,y):this.complete(i)},complete:function(r,t){if("throw"===r.type)throw r.arg;return"break"===r.type||"continue"===r.type?this.next=r.arg:"return"===r.type?(this.rval=this.arg=r.arg,this.method="return",this.next="end"):"normal"===r.type&&t&&(this.next=t),y},finish:function(r){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.finallyLoc===r)return this.complete(e.completion,e.afterLoc),k(e),y}},catch:function(r){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.tryLoc===r){var n=e.completion;if("throw"===n.type){var o=n.arg;k(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(r,t,e){return this.delegate={iterator:T(r),resultName:t,nextLoc:e},"next"===this.method&&(this.arg=undefined),y}};var C={wrap:d,isGeneratorFunction:L,AsyncIterator:x,mark:function(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,O):(r.__proto__=O,h in r||(r[h]="GeneratorFunction")),r.prototype=Object.create(S),r},awrap:function(r){return{__await:r}},async:function(r,t,e,n,o){void 0===o&&(o=Promise);var i=new x(d(r,t,e,n),o);return L(t)?i:i.next().then((function(r){return r.done?r.value:i.next()}))},keys:function(r){var t=[];for(var e in r)t.push(e);return t.reverse(),function e(){for(;t.length;){var n=t.pop();if(n in r)return e.value=n,e.done=!1,e}return e.done=!0,e}},values:T};function I(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function F(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?I(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):I(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var _=global,W=_.activeForm?_.activeForm:{},B=W.formValidatorsSetting,R=void 0===B?{}:B,q=F(F({action:null,formName:"form"},W),{},{formValidatorsSetting:F({minLength:{liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null},maxLength:{liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!0,showErrorTimeout:0,hideErrorTimeout:null},minValue:{liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null},maxValue:{liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null},required:{liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null},number:{liveEnable:!0,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!0,showErrorTimeout:0,hideErrorTimeout:null},email:{liveEnable:!1,showLiveErrorAfterFirstSubmit:!1,shouldLockNotValidWrite:!1,showErrorTimeout:0,hideErrorTimeout:null}},R)});function M(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function G(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?M(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):M(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var z=function(r,t){var e=r.validatorsSetting;Object.keys(t).forEach((function(r){var n=e[r],i=t[r],a="boolean"==typeof i;if("object"===o(i))e[r]=G(G({},n),i);else{if(!a)throw new Error("invalid params type, need boolean or object");e[r]=G(G({},n),{},{liveEnable:i})}}))},$=function(r,t,e){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i=!0;return Object.keys(t).forEach((function(a){var l=t[a];if(Array.isArray(l))l.forEach((function(t,l){var u={currentControl:t,controlName:a,controlIndex:l,formIndex:n,formName:e.formSettings.formName};!0!==r(u,e,o)&&(i=!1)}));else{var u={currentControl:l,controlName:a,controlIndex:null,formIndex:n,formName:e.formSettings.formName};!0!==r(u,e,o)&&(i=!1)}})),i},Z=function(r,t,e){var n=r.controls,o=!0;Array.isArray(n)?n.forEach((function(n,i){!1===$(t,n,r,i,e)&&(o=!1)})):!1===$(t,n,r,null,e)&&(o=!1);return o},Y=function(r){return null!==r},U=function(r){return null!==r};function H(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function J(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?H(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):H(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var K=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=U(e)?r.controls[e]:r.controls,i=Y(n)?o[t][n]:o[t];return i},Q=function(r,t){var e,n=function(r,t,e){for(;t<r.length;t++)"9"!==r[t]&&"A"!==r[t]&&"S"!==r[t]||(r[t]=e);return r},i="object"===o(t)?t.pattern:t,a=i.replace(/\W/g,""),l=i.split(""),u=r.toString().replace(/\W/g,""),c=u.replace(/\W/g,""),s=0,f=l.length,m="object"===o(t)?t.placeholder:void 0;for(e=0;e<f;e++){if(s>=u.length){if(a.length==c.length)return l.join("");if(void 0!==m&&a.length>c.length)return n(l,e,m).join("");break}if("9"===l[e]&&u[s].match(/[0-9]/)||"A"===l[e]&&u[s].match(/[a-zA-Z]/)||"S"===l[e]&&u[s].match(/[0-9a-zA-Z]/))l[e]=u[s++];else if("9"===l[e]||"A"===l[e]||"S"===l[e])return void 0!==m?n(l,e,m).join(""):l.slice(0,e).join("")}return l.join("").substr(0,e)},X=function(r,t,e,n){var o=r.maskPattern,i=r.eventWhenPlaceholderVisible,a=r.maskPlaceholder,l=void 0===a?void 0:a,u=function(r,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=r.replace(/[9|A]/gi,"").split(""),o=r.replace(/[9|A]/gi,"⌀"),i=String(t),a=i.split(""),l=1===i.length,u="";return l?i:(a.map((function(r,t){var e=r===o[t],i=n.includes(r),a=!e;if(e&&i){var l=n.indexOf(r);n.splice(l,1)}else a&&(u+=r)})),u=u.replace(new RegExp(e,"g"),""))}(o,e,l),c="write"!==i,s="write"===i;c&&!l&&(l="_"),s&&(l=void 0),!t.maskSetting._maskWithPlaceholder&&(t.maskSetting._maskWithPlaceholder=Q("",{pattern:o,placeholder:l||"_"})),t.maskSetting.clearValue=u;var f=Q(u,{pattern:o,placeholder:l}),m=!1,p=t.maskSetting._maskWithPlaceholder,h=f===p,d=f.includes(l);(c&&["mouseleave","blur"].includes(n)&&h&&(f=""),s)?f.length!==p.length&&(m=!0):d&&(m=!0);t.hasError=m,t.value=f};var rr={exports:{}};!function(r){function t(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(r.exports=t=function(r){return typeof r},r.exports.default=r.exports,r.exports.__esModule=!0):(r.exports=t=function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},r.exports.default=r.exports,r.exports.__esModule=!0),t(e)}r.exports=t,r.exports.default=r.exports,r.exports.__esModule=!0}(rr);var tr=function(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}(rr.exports),er=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.limit,n=void 0===e?null:e,o="string"==typeof n?Number(n):n,i=!Array.isArray(r)&&!["string","number"].includes(tr(r)),a="number"!=typeof o&&null!==o||null!==o&&isNaN(o),l=Array.isArray(r)?r.length:String(r).length,u="number"==typeof o&&l<o;if(a)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value must be only string, number or array");return u},nr=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.limit,n=void 0===e?null:e,o="string"==typeof n?Number(n):n,i=!Array.isArray(r)&&!["string","number"].includes(tr(r)),a="number"!=typeof o&&null!==o||null!==o&&isNaN(o),l=Array.isArray(r)?r.length:String(r).length,u="number"==typeof o&&l>o;if(a)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value must be only string, number or array");return u},or=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.limit,n=void 0===e?null:e,o="string"==typeof n?Number(n):n,i=isNaN(Number(r))||null===r,a="number"!=typeof o&&null!==o||null!==o&&isNaN(o),l="number"==typeof o&&Number(r)>o;if(a)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value can be only number");return l},ir=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.limit,n=void 0===e?null:e,o="string"==typeof n?Number(n):n,i=isNaN(Number(r))||null===r,a="number"!=typeof o&&null!==o||null!==o&&isNaN(o),l="number"==typeof o&&Number(r)<o;if(a)throw new TypeError("limit value must be only number or number in string like '1'");if(i)throw new TypeError("written value can be only number");return l},ar=function(r){var t=!Array.isArray(r)&&!["string","number"].includes(tr(r)),e=0===(Array.isArray(r)?r.length:String(r).length);if(t)throw new TypeError("written value can be only string or number");return e},lr=function(r){var t=!["string","number"].includes(tr(r)),e=!/.+@.+\..+/i.test(String(r));if(t)throw new TypeError("written value can be only string or number");return e},ur=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=!["string","number"].includes(tr(r))||null===r;r=String(r);var n=t||{},o=n.shouldLockNegativeNumber,i=void 0!==o&&o,a=n.shouldLockFloatNumber,l=void 0!==a&&a,u=n.allowableSymbols,c=void 0===u?[]:u,s=n.customRegExp,f=void 0===s?null:s,m=n.isLiveValidator,p=void 0!==m&&m,h=c.includes("-")?c.join("").replace(/-/g,"\\-"):c.join(""),d="".concat(h,"1-9"),v=new RegExp("^[-]?([".concat(d,"]+)?[.]?([").concat(d,"]+)?$")),y=p?["-.",".",".-"]:["-.",".",".-","-"],b=y.includes(r),g=!0;if(r){var O=v;i&&(O=l?new RegExp("^[".concat(d,"]+$")):new RegExp("^([".concat(d,"]+)?[.]?([").concat(d,"]+)?$"))),l&&(O=i?new RegExp("^[".concat(d,"]+$")):new RegExp("^[-]?([".concat(d,"]+)?$"))),g=O.test(r),b&&(g=!1),f&&(g=f.test(r))}if(e)throw new TypeError("written value can be only number or string");return g},cr=function(r,t){Object.keys(r).forEach((function(e){var n=t[e];n&&(r[e]=n)}))},sr=function(r){return!0===r.liveEnable};function fr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function mr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?fr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):fr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var pr=function(r){var t=r.currentControl,e=r.newValue,n=t.validateRules||{},o=t.validatorsSetting||{},i=n.minValue,a=n.maxValue,l=n.minLength,u=n.maxLength,c=n.required,s=n.number,f=n.email,m=o.minValue,p=o.maxValue,h=o.minLength,d=o.maxLength,v=o.required,y=o.number,b=o.email,g={hasError:!1,shouldLockNotValidWrite:!1,message:null,limit:null,showLiveErrorAfterFirstSubmit:!1,hideErrorTimeout:null,showErrorTimeout:null};if("string"==typeof e||"number"==typeof e){var O=ur(e,s),w=!O,E=!0;!ar(e)&&(O&&ir(e,i)&&sr(m)&&cr(g,mr(mr(mr({},i),m),{},{hasError:E})),O&&or(e,a)&&sr(p)&&cr(g,mr(mr(mr({},a),p),{},{hasError:E})),er(e,l)&&sr(h)&&cr(g,mr(mr(mr({},l),h),{},{hasError:E})),nr(e,u)&&sr(d)&&cr(g,mr(mr(mr({},u),d),{},{hasError:E})),f&&lr(e)&&sr(b)&&cr(g,mr(mr(mr({},f),b),{},{hasError:E}))),c&&ar(e)&&sr(v)&&cr(g,mr(mr(mr({},c),v),{},{hasError:E})),s&&w&&cr(g,mr(mr(mr({},s),y),{},{hasError:E}))}return{errorData:g}};function hr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function dr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?hr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):hr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var vr=function(r){var t=r.currentControl,e=r.newValue,n=t.validatorsSetting||{},o=t.validateRules||{},i=o.required,a=o.minValue,l=o.maxValue,u=o.minLength,c=o.maxLength,s=n.required,f=n.minValue,m=n.maxValue,p=n.minLength,h=n.maxLength,d={hasError:!1,shouldLockNotValidWrite:!1,message:null,limit:null,showLiveErrorAfterFirstSubmit:null,hideErrorTimeout:null,showErrorTimeout:null},v=Array.isArray(e)?function(r){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r.reduce((function(r,e){return t&&isNaN(+e)?+r:+r+ +e}),0)}(e):null,y=!isNaN(v),b=!0;return i&&ar(e)&&sr(s)&&cr(d,dr(dr(dr({},i),s),{},{hasError:b})),a&&y&&ir(v,a)&&sr(f)&&cr(d,dr(dr(dr({},a),f),{},{hasError:b})),l&&y&&or(v,l)&&sr(m)&&cr(d,dr(dr(dr({},l),m),{},{hasError:b})),u&&er(e,u)&&sr(p)&&cr(d,dr(dr(dr({},u),p),{},{hasError:b})),c&&nr(e,c)&&sr(h)&&cr(d,dr(dr(dr({},c),h),{},{hasError:b})),{errorData:d}};function yr(r,t){var e;return function(){for(var n=this,o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];var l=function(){r.apply(n,i)};return clearTimeout(e),e=setTimeout(l,t)}}var br=function(r,t){r((function(r){var e=t.controlName,n=t.formIndex,o=t.controlIndex;K(r,e,n,o).hasError=!1}))};function gr(r,t){if(r=+r,2===t.length&&t.push(t[1]),isNaN(r))throw new Error("type of quantity expect only number");return t[r%100>4&&r%100<20?2:[2,0,1,1,1,2][r%10<5?r%10:5]]}var Or=function(r,t){var e=t.limit;return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,e=!("string"==typeof r||"number"==typeof r||null===r);if(null===r)return"";if(e)throw new Error("message for replace has invalid type");var n=r;return n&&t.forEach((function(t){var e=t.searchLayout,o=t.valueToReplace,i=t.shouldClearSearchLayoutIfReplaceValueIsArray,a=void 0===i||i;if(null===o)return"";var l=new RegExp("".concat(e,"['[a-zA-Zа-яА-я]+', '[a-zA-Zа-яА-я]+'(, '[a-zA-Zа-яА-я]+')?]"),"g");if(l.test(n))n=n.replace(l,(function(r){var t=r.replace(new RegExp(e),"").replace(/[\[\]'"]/g,"").split(", "),n=isNaN(+o)?null:gr(+o,t);return isNaN(+o)?o.toString():"".concat(o," ").concat(n)}));else{var u=a?"":o.toString(),c=Array.isArray(o)?u:String(o),s=""===c&&new RegExp(e+" ","g").test(r)?e+" ":e;n=n.replace(new RegExp(s,"g"),c)}})),n}(r,[{searchLayout:"{limit}",valueToReplace:e},{searchLayout:"limitForDecline",valueToReplace:e},{searchLayout:"{label}",valueToReplace:t.controlLabel},{searchLayout:"{writeValue}",valueToReplace:t.writeToControlValue}])},wr=function(r,t,e){e((function(n){var o=t.controlName,i=t.formIndex,a=t.controlIndex,l=t.newValue,u=K(n,o,i,a),c=u.label,s=r||{},f=s.message,m=void 0===f?null:f,p=s.limit,h=void 0===p?null:p,d=s.hideErrorTimeout,v=void 0===d?null:d,y=u.beforeLiveValidatorError||n.formSettings.beforeLiveValidatorError||null,b=u.afterLiveValidatorError||n.formSettings.afterLiveValidatorError||null;if("function"==typeof y&&y(t),r&&(u.error=Or(m,{limit:h,controlLabel:c,writeToControlValue:l})),u.hasError=!0,v){var g=function(r,t,e){return yr(br,e)(t,r)}(t,e,v);u._hideErrorTimeoutId=g}"function"==typeof b&&b(t)}))},Er=function(r,t,e,n,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,a=wr,l=yr(a,i),u=r.hasError,c=i,s=null;return c?u?(clearTimeout(o),s=l(r,t,n)):o&&clearTimeout(o):u&&a(r,t,n),s},jr=function(r,t,e){var n=r(t),o=n.errorData,i=void 0===o?null:o,a=n.modifiedValueToWrite,l=void 0===a?null:a,u=i.shouldLockNotValidWrite,c=i.hasError;u&&(e.isWriteInputEnable=!1),c&&(e.hasAnyError=!0),l&&(e.writeToControlValue=l),i&&(e.errorDataForControl=i)},Sr=function(r,t,e,n,o){var i=r.type,a=r._hideErrorTimeoutId,l=void 0===a?null:a,u=r._showErrorTimeoutId,c=["phone","number","text","password","date"].includes(i)?pr:vr,s=r.customLiveValidator||t.formSettings.customLiveValidator||c,f=r.additionalLiveValidator||t.formSettings.additionalLiveValidator||null,m=r.maskSetting||null,p=r.customMask,h=e.newValue,d=t.formParams.isFormTriedSubmit,v=m,y="function"==typeof s,b="function"==typeof f,g={writeToControlValue:h,errorDataForControl:null,hasAnyError:!1,isWriteInputEnable:!0};if("function"==typeof p)p(Q,e);else if(v&&!Array.isArray(h))X(m,r,h,n);else{y&&jr(s,e,g),b&&jr(f,e,g);var O=g.errorDataForControl,w=g.hasAnyError,E=g.writeToControlValue,j=g.isWriteInputEnable,S=O||{},P=S.showLiveErrorAfterFirstSubmit,L=void 0!==P&&P,x=S.showErrorTimeout,V=void 0===x?0:x,N=!L;j&&(r.value=E),w||(r.hasError=!1,l&&clearTimeout(r._hideErrorTimeoutId)),(L&&d||N)&&(r._showErrorTimeoutId=Er(O,e,t,o,u,V))}};function Pr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function Lr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?Pr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):Pr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var xr=function(r,t){var e=t.shouldLockSubmitBtnWhenControlInvalid,n=void 0!==e&&e,o=!!r.shouldLockSubmitBtn||n;cr(r,Lr(Lr({},t),{},{hasError:!0,shouldLockSubmitBtn:o}))};function Vr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function Nr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?Vr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):Vr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var kr=function(r){var t=r.currentControl,e=t.value,n=t.validateRules||{},o=t.validatorsSetting||{},i=n.minValue,a=n.maxValue,l=n.minLength,u=n.maxLength,c=n.required,s=n.number,f=n.email,m=o.minValue,p=o.maxValue,h=o.minLength,d=o.maxLength,v=o.required,y=o.number,b=o.email,g={hasError:!1,shouldLockNotValidWrite:!1,message:null,limit:null,showLiveErrorAfterFirstSubmit:!1,hideErrorTimeout:null,shouldLockSubmitBtnWhenControlInvalid:!1,shouldLockSubmitBtn:!1};if("string"==typeof e||"number"==typeof e){var O=ur(e,s),w=!O;!ar(e)&&(O&&ir(e,i)&&xr(g,Nr(Nr({},i),m)),O&&or(e,a)&&xr(g,Nr(Nr({},a),p)),er(e,l)&&xr(g,Nr(Nr({},l),h)),nr(e,u)&&xr(g,Nr(Nr({},u),d)),f&&lr(e)&&xr(g,Nr(Nr({},f),b))),c&&ar(e)&&xr(g,Nr(Nr({},c),v)),s&&w&&xr(g,Nr(Nr({},s),y))}return g},Ar=function(r,t,e){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=r(t),i=o.hasError,a=void 0!==i&&i,l=o.shouldLockSubmitBtn,u=void 0!==l&&l;a&&(n&&u||!0!==n)&&(e.shouldLockSubmitBtn=!0)};function Tr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function Dr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?Tr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):Tr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var Cr=function(r,t){var e=r.currentControl,n=Dr(Dr({},r),{},{newValue:e.value,selectedValue:null,form:t}),o=e.customLockSubmitBtnValidator||t.formSettings.customLockSubmitBtnValidator||kr,i=e.additionalLockSubmitBtnValidator||t.formSettings.additionalLockSubmitBtnValidator||null,a="function"==typeof i,l={shouldLockSubmitBtn:!1};return"function"==typeof o&&Ar(o,n,l,!0),a&&Ar(i,n,l),l.shouldLockSubmitBtn},Ir=function(r){return Z(r,Cr)},Fr=function(r,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=arguments.length>4?arguments[4]:void 0,i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,a=arguments.length>6?arguments[6]:void 0;o((function(l){var u=K(l,t,n,e),c={currentControl:u,controlIndex:e,formIndex:n,controlName:t,newValue:r,form:l,selectedValue:a},s=u.beforeChange||l.formSettings.beforeChange||null,f=u.afterChange||l.formSettings.afterChange||null;"function"==typeof s&&s(c),Sr(u,l,c,i,o),"function"==typeof f&&f(c),l.formParams.isSubmitBtnLocked=Ir(l)}))},_r=function(r,t,e){var n=r.currentControl,o=r.controlName,i=n.type,a=void 0===i?null:i,l=t.controlsExample;return a?(!function(r){var t=r.currentControl,e=r.controlName,n=r.formName,o="select"===t.type;if(t.error="",t.hasError=!1,t.controlName=e,t.inputName="".concat(n,"[").concat(e,"]"),t.value||(t.value=""),o){t.isMultiple=!0===t.isMultiple;var i=t.options,a=t.value,l=t.selectPlaceholder,u=Array.isArray(a)?a.length>0:Boolean(a);i.length&&!l&&!1===t.isMultiple&&!u&&(t.value=i[0].value)}}(r),function(r,t){var e=r.validatorsSetting||{},n=t.formSettings.formValidatorsSetting||{};r.validatorsSetting=t.formSettings.formValidatorsSetting,z(r,n),z(r,e)}(n,t),n.setValue=function(r,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;return Fr(r,o,t,n,e,i,a)},function(r,t){var e=t.controlIndex,n=t.controlName,o=t.currentControl;Y(e)&&(r[n]=[J({},o)]),function(r){return null===r}(e)&&(r[n]=J({},o))}(l,r),t.formParams.isSubmitBtnLocked=Cr(r,t)):console.error("type is require control prop"),!0};function Wr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function Br(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?Wr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):Wr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var Rr=function(r,t){var e=t.currentControl,n=t.form,o=e.label,i=e.value,l=r||{},u=l.message,c=void 0===u?null:u,s=l.limit,f=void 0===s?null:s,m=e.beforeSubmitValidatorError||n.formSettings.beforeSubmitValidatorError||null,p=e.afterSubmitValidatorError||n.formSettings.afterSubmitValidatorError||null;if("function"==typeof m&&m(t),r){var h=Or(c,{limit:f,controlLabel:o,writeToControlValue:i});e.error=h,function(r,t,e){var n=e.formIndex,o=void 0===n?null:n,i=e.controlName,l=null!==o,u=a({},i,r);if(l){var c=t.formParams.errorList[o];t.formParams.errorList[o]=Br(Br({},c),u)}else Array.isArray(t.formParams.errorList)&&i&&t.formParams.errorList.push(u)}(h,n,t),e.hasError=!0}"function"==typeof p&&p(t)},qr=function(r,t,e){var n=r(t).errorData,o=void 0===n?null:n;o.hasError&&(e.isControlBeforeSubmitValidationSuccess=!1,e.hasControlError=!0),o&&(e.errorDataForControl=o)};function Mr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function Gr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?Mr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):Mr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var zr=function(r,t){var e=r.currentControl,n=Gr(Gr({},r),{},{newValue:e.value,selectedValue:null,form:t}),o=e.customSubmitValidator||t.formSettings.customSubmitValidator||kr,i=e.additionalSubmitValidator||t.formSettings.additionalSubmitValidator||null,a=e.beforeSubmitValidator||t.formSettings.beforeSubmitValidator||null,l=e.afterSubmitValidator||t.formSettings.afterSubmitValidator||null,u="function"==typeof o,c="function"==typeof i,s={isControlBeforeSubmitValidationSuccess:!0,errorDataForControl:null,hasControlError:!1};"function"==typeof a&&a(n),u&&qr(o,n,s),c&&qr(i,n,s);var f=s.isControlBeforeSubmitValidationSuccess;return s.hasControlError&&Rr(s.errorDataForControl,n),"function"==typeof l&&l(n),f},$r=function(r,t,e,n,o){Z(r,_r,o)},Zr=function(r){r.formParams.isSubmitBtnLocked=Ir(r)},Yr=function(r,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=[];return Array.isArray(r)?null!==e&&(n=r[e][t]):n=r[t],n};function Ur(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function Hr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?Ur(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):Ur(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}function Jr(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function Kr(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?Jr(Object(e),!0).forEach((function(t){a(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):Jr(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var Qr=function(r,a){var l,c,s,f={loaded:!1,isFormTriedSubmit:!1,isSubmitBtnLocked:!1,errorList:[],commonError:""},m=(l=q.formValidatorsSetting,c=a.formValidatorsSetting,s=G({},l),Object.keys(s).forEach((function(r){var t=l[r],e=c[r];s[r]=G(G({},t),e)})),s),p=u(n({controls:r,formParams:f,formSettings:Kr(Kr(Kr({},q),{},{formName:"form"},a),{},{formValidatorsSetting:m}),controlsExample:{}}),2),h=p[0],d=p[1];return t((function(){var r,t;(r=C.mark((function r(){var t,n,i;return C.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t=a.action,!(i=(n=void 0===t?null:t)?"object"===o(n)&&n.toInit?n.toInit:String(n):null)){r.next=9;break}return r.next=6,e.post(i);case 6:r.t0=r.sent,r.next=10;break;case 9:r.t0=null;case 10:r.t0,d((function(r){$r(r,0,0,0,d)}));case 12:case"end":return r.stop()}}),r)})),t=function(){var t=this,e=arguments;return new Promise((function(n,o){var a=r.apply(t,e);function l(r){i(a,n,o,l,u,"next",r)}function u(r){i(a,n,o,l,u,"throw",r)}l(void 0)}))},function(){return t.apply(this,arguments)})()}),[]),[h,d]},Xr=function(t){var n=t.children,i=t.className,a=void 0===i?"form":i;t.id,t.action;var l=t.formState,u=t.setForm;l.formParams.loaded;var c=l.formSettings.formName;return r.createElement("form",{id:String(c),className:a,onSubmit:function(r){r.preventDefault(),function(r){r((function(r){if(r.formParams.errorList=[],r.formParams.isFormTriedSubmit=!0,Z(r,zr)){var t=r.formSettings,n=t.action,i=void 0===n?null:n,a=t.afterSuccessSubmit,l=void 0===a?null:a,u=t.afterErrorSubmit,c=void 0===u?null:u,s=t.afterSubmit,f=void 0===s?null:s,m=i?"object"===o(i)&&i.toSubmit?i.toSubmit:String(i):null;m&&e.post(m).then((function(r){var t=r.status;200===t&&"function"==typeof l&&l(r),500===t&&"function"==typeof c&&c(r),"function"==typeof f&&f(r)})).catch((function(r){500===r.status&&"function"==typeof c&&c(r),"function"==typeof f&&f(r)}))}}))}(u)}},n,r.createElement("input",{"data-element":"hidden-submit-trigger",type:"submit",style:{opacity:0,width:0,height:0,position:"absolute",zIndex:-1}}))},rt=function(t){var e=t.setForm,n=t.value,o=void 0===n?"Добавить форму":n,i=t.children;return r.createElement("div",{className:"add-form-clone",onClick:function(r){return function(r){r((function(r){if(Array.isArray(r.controls)){var t=Hr({},r.controlsExample);r.controls.push(t),Zr(r)}}))}(e)}},o||i)},tt=function(t){var e=t.setForm,n=t.formIndex,o=t.value,i=t.children;return r.createElement("div",{className:"remove-form-clone",onClick:function(r){return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;null!=r&&t((function(t){Array.isArray(t.controls)&&(t.controls.splice(r,1),Zr(t))}))}(n,e)}},o||i)},et=function(t){var e=t.setForm,n=t.controlName,o=t.formIndex,i=void 0===o?null:o;return r.createElement("div",{className:"add-form-clone",onClick:function(r){return function(r,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;r((function(r){var n=r.controls,o=Yr(n,t,e),i=Hr({},r.controlsExample[t][0]);o.push(i),Zr(r)}))}(e,n,i)}},"+ c")},nt=function(t){var e=t.setForm,n=t.controlName,o=t.controlIndex,i=t.formIndex,a=void 0===i?null:i;return r.createElement("div",{className:"remove-control",onClick:function(r){return function(r,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3?arguments[3]:void 0;null!==n&&t&&r((function(r){var o=r.controls;Yr(o,t,e).splice(n,1),Zr(r)}))}(e,n,a,o)}},"- c")};export{et as AddControlExample,rt as AddFormExample,Xr as FlukyForm,nt as RemoveControl,tt as RemoveForm,Qr as useFlukyForm};
