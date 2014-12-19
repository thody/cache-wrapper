'use strict';

var cache = require('memory-cache');

var proxyWithCache = function (fn, ttl) {
  return function () {
    var key,
      cachedVal,
      args;

    args = Array.prototype.slice.call(arguments);
    key = fn.name + args.join();
    cachedVal  = cache.get(key);

    if (cachedVal === null) {
      var freshResult = fn.apply(this, arguments);

      if (ttl > -1) {
        cache.put(key, freshResult, ttl);
      } else {
        cache.put(key, freshResult);
      }

      return freshResult;

    } else {
      return cachedVal;
    }
  };
};

module.exports = {
  wrap: function (proxiable, options) {
    var options = options || { ttl: -1 },
        proxied = {};

    for (var prop in proxiable) {
      proxied[prop] = proxyWithCache(proxiable[prop], options.ttl);
    }

    return proxied;
  },

  clearCaches: function () {
    cache.clear();
  }
};
