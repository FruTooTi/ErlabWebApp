var ns = ns || {};
ns.func = {};
(function () {
    this.write = function () { console.log("Hello World"); }
}).apply(ns.func);
console.log(ns.func.write);