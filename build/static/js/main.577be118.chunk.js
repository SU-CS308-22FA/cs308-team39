(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(t,e,r){"use strict";r.r(e);var n=r(1),a=r.n(n),o=r(49),i=r.n(o),c=(r(83),r(27)),u=r(35),l=r(45),s=r(6),f=(r(84),r(63)),h=r.n(f),p=r(41);r(102),r(85),r(103);p.a.initializeApp({apiKey:"AIzaSyBaG_OLuX6_bkc6dCBVxYW1T6nJMvYITfM",authDomain:"cs308group39.firebaseapp.com",projectId:"cs308group39",storageBucket:"cs308group39.appspot.com",messagingSenderId:"886850757668",appId:"1:886850757668:web:19c513f027e341d81c24b1",measurementId:"G-RZS36L9L9B"});var m=p.a.firestore(),d=p.a.auth();p.a.storage(),p.a.firestore.Timestamp;function v(t){var e=t.merchs;return a.a.createElement("div",{className:"merch-list"},e.map(function(t){return a.a.createElement("div",{key:t.id,className:"card"},a.a.createElement("h3",null,t.title),a.a.createElement("div",null,t.description.substring(0,50),"..."),a.a.createElement("p",null,"Quantity: ",t.rating),a.a.createElement("p",null,t.price," TL"),a.a.createElement(c.b,{to:"/merch/".concat(t.id)},"More"),a.a.createElement("img",{alt:"x",className:"delete",src:h.a,onClick:function(){return e=t.id,void m.collection("merchandises").doc(e).delete();var e}}))}))}var g=r(65),y=r.n(g);function b(){var t=Object(n.useState)(null),e=Object(s.a)(t,2),r=e[0],o=e[1],i=Object(n.useState)(!1),c=Object(s.a)(i,2),u=c[0],f=c[1],h=Object(n.useState)(null),p=Object(s.a)(h,2),d=p[0],g=p[1];return Object(n.useEffect)(function(){f(!0);var t=m.collection("merchandises").onSnapshot(function(t){if(t.empty)g("No merchandise to load"),f(!1);else{var e=[];t.docs.forEach(function(t){e.push(Object(l.a)({},t.data(),{id:t.id}))}),o(e),f(!1)}},function(t){g(t.message),f(!1)});return function(){return t()}},[]),a.a.createElement("div",{className:y.a.home},d&&a.a.createElement("p",{classname:"error"},d),u&&a.a.createElement("p",{classname:"loading"},u),r&&!d&&a.a.createElement(v,{merchs:r}))}var E=r(40),w=Object(n.createContext)(),x=function(t,e){switch(e.type){case"LOGIN":return Object(l.a)({},t,{user:e.payload});default:return t}},O=function(t){var e=t.children,r=Object(n.useReducer)(x,{user:null}),o=Object(s.a)(r,2),i=o[0],c=o[1];return console.log("Auth context state: ",i),a.a.createElement(w.Provider,{value:Object(l.a)({},i,{dispatch:c})},e)};function L(){L=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(k){u=function(t,e,r){return t[e]=r}}function l(t,e,r,a){var o=e&&e.prototype instanceof h?e:h,i=Object.create(o.prototype),c=new _(a||[]);return n(i,"_invoke",{value:w(t,r,c)}),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(k){return{type:"throw",arg:k}}}t.wrap=l;var f={};function h(){}function p(){}function m(){}var d={};u(d,o,function(){return this});var v=Object.getPrototypeOf,g=v&&v(v(N([])));g&&g!==e&&r.call(g,o)&&(d=g);var y=m.prototype=h.prototype=Object.create(d);function b(t){["next","throw","return"].forEach(function(e){u(t,e,function(t){return this._invoke(e,t)})})}function E(t,e){var a;n(this,"_invoke",{value:function(n,o){function i(){return new e(function(a,i){!function n(a,o,i,c){var u=s(t[a],t,o);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then(function(t){n("next",t,i,c)},function(t){n("throw",t,i,c)}):e.resolve(f).then(function(t){l.value=t,i(l)},function(t){return n("throw",t,i,c)})}c(u.arg)}(n,o,a,i)})}return a=a?a.then(i,i):i()}})}function w(t,e,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return S()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var c=x(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var a=n.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function N(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:S}}function S(){return{value:void 0,done:!0}}return p.prototype=m,n(y,"constructor",{value:m,configurable:!0}),n(m,"constructor",{value:p,configurable:!0}),p.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},b(E.prototype),u(E.prototype,i,function(){return this}),t.AsyncIterator=E,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new E(l(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then(function(t){return t.done?t.value:i.next()})},b(y),u(y,c,"Generator"),u(y,o,function(){return this}),u(y,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=N,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;j(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:N(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}var j=function(){var t=Object(n.useState)(null),e=Object(s.a)(t,2),r=e[0],a=e[1],o=Object(n.useState)(!1),i=Object(s.a)(o,2),c=i[0],u=i[1],l=Object(n.useState)(0),f=Object(s.a)(l,2),h=f[0],p=f[1],m=function(){var t=Object(n.useContext)(w);if(!t)throw Error("useAuthContext is not in AuthContextProvider.");return t}().dispatch;return{signin:function(){var t=Object(E.a)(L().mark(function t(e,r){var n;return L().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a(null),u(!0),t.prev=2,t.next=5,d.signInWithEmailAndPassword(e,r);case 5:if(n=t.sent,console.log(n.user),p(1),n){t.next=10;break}throw new Error("Could not login");case 10:m({type:"LOGIN",payload:n.user}),u(!1),a(null),t.next=21;break;case 15:t.prev=15,t.t0=t.catch(2),p(0),console.log(t.t0.message),a(t.t0.message),u(!1);case 21:case"end":return t.stop()}},t,null,[[2,15]])}));return function(e,r){return t.apply(this,arguments)}}(),error:r,isPending:c,flag:h}},_=r(66),N=r.n(_);function S(){var t=Object(n.useState)(""),e=Object(s.a)(t,2),r=e[0],o=e[1],i=Object(n.useState)(""),c=Object(s.a)(i,2),u=c[0],l=c[1],f=j(),h=f.signin,p=f.isPending,m=f.error,d=f.flag;return a.a.createElement("form",{onSubmit:function(t){t.preventDefault(),console.log(r,u),h(r,u)},className:N.a["login-form"]},a.a.createElement("h2",null,"login"),a.a.createElement("label",null,a.a.createElement("span",null,"email:"),a.a.createElement("input",{type:"email",onChange:function(t){return o(t.target.value)},value:r})),a.a.createElement("label",null,a.a.createElement("span",null,"password:"),a.a.createElement("input",{type:"password",onChange:function(t){return l(t.target.value)},value:u})),!p&&a.a.createElement("button",{className:"btn"},"Login"),1===p&&a.a.createElement("button",{className:"btn"},"Waiting"),1===d&&a.a.createElement("p",null,"Login successfull"),0===d&&a.a.createElement("p",null,m))}function k(){k=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(S){u=function(t,e,r){return t[e]=r}}function l(t,e,r,a){var o=e&&e.prototype instanceof h?e:h,i=Object.create(o.prototype),c=new j(a||[]);return n(i,"_invoke",{value:w(t,r,c)}),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=l;var f={};function h(){}function p(){}function m(){}var d={};u(d,o,function(){return this});var v=Object.getPrototypeOf,g=v&&v(v(_([])));g&&g!==e&&r.call(g,o)&&(d=g);var y=m.prototype=h.prototype=Object.create(d);function b(t){["next","throw","return"].forEach(function(e){u(t,e,function(t){return this._invoke(e,t)})})}function E(t,e){var a;n(this,"_invoke",{value:function(n,o){function i(){return new e(function(a,i){!function n(a,o,i,c){var u=s(t[a],t,o);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then(function(t){n("next",t,i,c)},function(t){n("throw",t,i,c)}):e.resolve(f).then(function(t){l.value=t,i(l)},function(t){return n("throw",t,i,c)})}c(u.arg)}(n,o,a,i)})}return a=a?a.then(i,i):i()}})}function w(t,e,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return N()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var c=x(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var a=n.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function _(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:N}}function N(){return{value:void 0,done:!0}}return p.prototype=m,n(y,"constructor",{value:m,configurable:!0}),n(m,"constructor",{value:p,configurable:!0}),p.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},b(E.prototype),u(E.prototype,i,function(){return this}),t.AsyncIterator=E,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new E(l(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then(function(t){return t.done?t.value:i.next()})},b(y),u(y,c,"Generator"),u(y,o,function(){return this}),u(y,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=_,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;L(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}var P=function(){var t=Object(n.useState)(null),e=Object(s.a)(t,2),r=e[0],a=e[1],o=Object(n.useState)(!1),i=Object(s.a)(o,2),c=i[0],u=i[1],l=Object(n.useState)(0),f=Object(s.a)(l,2),h=f[0],p=f[1];return{signup:function(){var t=Object(E.a)(k().mark(function t(e,r,n){var o;return k().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a(null),u(!0),t.prev=2,t.next=5,d.createUserWithEmailAndPassword(e,r);case 5:return o=t.sent,m.collection("users").add({email:e,password:r,username:n}),t.next=9,o.user.updateProfile({username:n});case 9:if(console.log(o.user),p(1),o){t.next=13;break}throw new Error("Could not complete signup");case 13:u(!1),a(null),t.next=23;break;case 17:t.prev=17,t.t0=t.catch(2),p(0),console.log(t.t0.message),a(t.t0.message),u(!1);case 23:case"end":return t.stop()}},t,null,[[2,17]])}));return function(e,r,n){return t.apply(this,arguments)}}(),error:r,isPending:c,flag:h}},G=r(67),C=r.n(G);function T(){var t=Object(n.useState)(""),e=Object(s.a)(t,2),r=e[0],o=e[1],i=Object(n.useState)(""),c=Object(s.a)(i,2),u=c[0],l=c[1],f=Object(n.useState)(""),h=Object(s.a)(f,2),p=h[0],m=h[1],d=P(),v=d.signup,g=d.isPending,y=d.error,b=d.flag;return a.a.createElement("form",{onSubmit:function(t){t.preventDefault(),console.log(r,u,p),v(r,u,p)},className:C.a["signup-form"]},a.a.createElement("h2",null,"sign up"),a.a.createElement("label",null,a.a.createElement("span",null,"email:"),a.a.createElement("input",{type:"email",onChange:function(t){return o(t.target.value)},value:r})),a.a.createElement("label",null,a.a.createElement("span",null,"password:"),a.a.createElement("input",{type:"password",onChange:function(t){return l(t.target.value)},value:u})),a.a.createElement("label",null,a.a.createElement("span",null,"username:"),a.a.createElement("input",{type:"text",onChange:function(t){return m(t.target.value)},value:p})),!g&&a.a.createElement("button",{className:"btn"},"Signup"),1===g&&a.a.createElement("button",{className:"btn"},"Waiting"),1===b&&a.a.createElement("p",null,"User Added"),0===b&&a.a.createElement("p",null,y))}r(94);var I=r(130),A=r(128),F=r(127),B=r(126),M=r(70),D=r.n(M);var Y=function(){return a.a.createElement("div",{className:"Nav"},a.a.createElement("div",{className:"Heading"},a.a.createElement("img",{className:"Logo",alt:"Site Logo",src:"/logo-social.png"}),a.a.createElement(I.a,{className:"SearchBar",component:"form",sx:{p:"2px 4px",display:"flex",alignItems:"center",width:400}},a.a.createElement(F.a,{sx:{ml:1,flex:1},placeholder:"Search",inputProps:{"aria-label":"search google maps"}}),a.a.createElement(B.a,{type:"button",sx:{p:"10px"},"aria-label":"search"},a.a.createElement(D.a,null))),a.a.createElement("li",null,a.a.createElement(c.b,{to:"/login"},"Login"),a.a.createElement("br",null)),a.a.createElement("li",null,a.a.createElement(c.b,{to:"/signup"},"Signup"))),a.a.createElement(A.a,{className:"MenuBar",justifyContent:"Center",container:!0,spacing:0},a.a.createElement(A.a,{item:!0,xs:2},a.a.createElement(c.b,{to:"/"},a.a.createElement("button",{className:"Home_Button"},"Home"))),a.a.createElement(A.a,{item:!0,xs:2},a.a.createElement(c.b,{to:"/create"},a.a.createElement("button",{className:"Create_Button"},"Add Merch"))),a.a.createElement(A.a,{item:!0,xs:2},a.a.createElement("button",{className:"Teams_DropDown"},"Teams")),a.a.createElement(A.a,{item:!0,xs:2},a.a.createElement("button",{className:"Category_DropDown"},"Categories")),a.a.createElement(A.a,{item:!0,xs:3},a.a.createElement("button",{className:"Contact_Button"},"Contact Us"))))};r(98);function U(){U=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(S){u=function(t,e,r){return t[e]=r}}function l(t,e,r,a){var o=e&&e.prototype instanceof h?e:h,i=Object.create(o.prototype),c=new j(a||[]);return n(i,"_invoke",{value:w(t,r,c)}),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=l;var f={};function h(){}function p(){}function m(){}var d={};u(d,o,function(){return this});var v=Object.getPrototypeOf,g=v&&v(v(_([])));g&&g!==e&&r.call(g,o)&&(d=g);var y=m.prototype=h.prototype=Object.create(d);function b(t){["next","throw","return"].forEach(function(e){u(t,e,function(t){return this._invoke(e,t)})})}function E(t,e){var a;n(this,"_invoke",{value:function(n,o){function i(){return new e(function(a,i){!function n(a,o,i,c){var u=s(t[a],t,o);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then(function(t){n("next",t,i,c)},function(t){n("throw",t,i,c)}):e.resolve(f).then(function(t){l.value=t,i(l)},function(t){return n("throw",t,i,c)})}c(u.arg)}(n,o,a,i)})}return a=a?a.then(i,i):i()}})}function w(t,e,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return N()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var c=x(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var a=n.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function _(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:N}}function N(){return{value:void 0,done:!0}}return p.prototype=m,n(y,"constructor",{value:m,configurable:!0}),n(m,"constructor",{value:p,configurable:!0}),p.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},b(E.prototype),u(E.prototype,i,function(){return this}),t.AsyncIterator=E,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new E(l(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then(function(t){return t.done?t.value:i.next()})},b(y),u(y,c,"Generator"),u(y,o,function(){return this}),u(y,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=_,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;L(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function W(){var t=Object(n.useState)(""),e=Object(s.a)(t,2),r=e[0],o=e[1],i=Object(n.useState)(""),c=Object(s.a)(i,2),l=c[0],f=c[1],h=Object(n.useState)(""),p=Object(s.a)(h,2),d=p[0],v=p[1],g=Object(n.useState)(""),y=Object(s.a)(g,2),b=y[0],w=y[1],x=Object(u.f)(),O=function(){var t=Object(E.a)(U().mark(function t(e){var n;return U().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),n={title:r,description:l,price:b,rating:d},t.prev=2,t.next=5,m.collection("merchandises").add(n);case 5:x.push("/"),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),console.log(t.t0);case 11:case"end":return t.stop()}},t,null,[[2,8]])}));return function(e){return t.apply(this,arguments)}}();return a.a.createElement("div",{className:"create"},a.a.createElement("h2",{className:"page-title"},"Add a New Merchandise"),a.a.createElement("form",{onSubmit:O},a.a.createElement("label",null,a.a.createElement("span",null,"Merchandise title:"),a.a.createElement("input",{type:"text",onChange:function(t){return o(t.target.value)},value:r,required:!0})),a.a.createElement("label",null,a.a.createElement("span",null,"Merchandise Description:"),a.a.createElement("textarea",{onChange:function(t){return f(t.target.value)},value:l,required:!0})),a.a.createElement("label",null,a.a.createElement("span",null,"Price (TL):"),a.a.createElement("input",{type:"number",onChange:function(t){return w(t.target.value)},value:b,required:!0})),a.a.createElement("label",null,a.a.createElement("span",null,"Quantity:"),a.a.createElement("input",{type:"number",onChange:function(t){return v(t.target.value)},value:d,required:!0})),a.a.createElement("button",{className:"btn"},"submit")))}r(99);function q(){var t=Object(u.g)().id,e=Object(n.useState)(null),r=Object(s.a)(e,2),o=r[0],i=r[1],c=Object(n.useState)(!1),l=Object(s.a)(c,2),f=l[0],h=l[1],p=Object(n.useState)(null),d=Object(s.a)(p,2),v=d[0],g=d[1];Object(n.useEffect)(function(){h(!0);var e=m.collection("merchandises").doc(t).onSnapshot(function(t){t.exists?(h(!1),i(t.data())):(h(!1),g("Could not find the merchandise"))});return function(){return e}},[t]);return a.a.createElement("div",{className:"merch"},v&&a.a.createElement("p",{className:"error"},v),f&&a.a.createElement("p",{className:"loading"},"Loading..."),o&&a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",{className:"page-title"},o.title),a.a.createElement("p",null,o.description),a.a.createElement("p",null,"Quantity: ",o.rating),a.a.createElement("p",null,o.price," TL"),a.a.createElement("button",{onClick:function(){m.collection("merchandises").doc(t).update({title:"Title updated"})}},"Update")))}var H=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(c.a,null,a.a.createElement(Y,null),a.a.createElement(u.c,null,a.a.createElement(u.a,{exact:!0,path:"/"},a.a.createElement(b,null)),a.a.createElement(u.a,{path:"/login"},a.a.createElement(S,null)),a.a.createElement(u.a,{path:"/signup"},a.a.createElement(T,null)),a.a.createElement(u.a,{path:"/create"},a.a.createElement(W,null)),a.a.createElement(u.a,{path:"/merch/:id"},a.a.createElement(q,null)))))};i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(O,null,a.a.createElement(H,null))),document.getElementById("root"))},63:function(t,e,r){t.exports=r.p+"static/media/delete.37c8a274.svg"},65:function(t,e,r){t.exports={home:"Home_home__2N0Zl"}},66:function(t,e,r){t.exports={"login-form":"Login_login-form__3dnNt"}},67:function(t,e,r){t.exports={"signup-form":"Signup_signup-form__1UwM4"}},76:function(t,e,r){t.exports=r(101)},83:function(t,e,r){},84:function(t,e,r){},94:function(t,e,r){},98:function(t,e,r){},99:function(t,e,r){}},[[76,1,2]]]);
//# sourceMappingURL=main.577be118.chunk.js.map