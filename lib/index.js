'use strict';

var cache = require('memory-cache');

var proxyWithCache = function (fn) {
  return function () {
    var key,
      cachedVal,
      args;

    args = Array.prototype.slice.call(arguments);
    key = fn.name + args.join();
    cachedVal  = cache.get(key);

    if (cachedVal === null) {
      var freshResult = fn.apply(this, arguments);
      cache.put(key, freshResult);
      return freshResult;

    } else {
      return cachedVal;
    }
  };
};

module.exports = {
  proxy: function (proxiable) {
    var proxied = {};

    for (var prop in proxiable) {
      proxied[prop] = proxyWithCache(proxiable[prop]);
    }

    return proxied;
  }
};
