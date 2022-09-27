(function () {
    this.Cache = {};
    this.Cache.Set = function Set(property, data) {
        Cache[property] = data;
    }
    this.Cache.Get = function Get(property) {
        return Cache[property];
    }
}).apply(App);