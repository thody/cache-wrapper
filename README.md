[![Build Status](https://img.shields.io/travis/thody/cache-wrapper.svg)](https://travis-ci.org/thody/cache-wrapper)
[![Dependency Status](https://gemnasium.com/thody/cache-wrapper.svg)](https://gemnasium.com/thody/cache-wrapper)
[![npm version](https://img.shields.io/npm/v/cache-wrapper.svg)](https://www.npmjs.com/package/cache-wrapper)

## Installation

```
npm install cache-wrapper
```

## Usage 

The example below shows how you can use cache-wrapper to wrap a resource intensive/slow data store object, so that
repeat calls to its methods with the same arguments will use a cached response from the first call.

```
var cacheWrapper = require('cache-wrapper');
var dataStore = {
    getThing: function (id) {
        // Do something resource intensive
    }
};

var proxiedDataStore = cacheWrapper.wrap(dataStore);
var thing = proxiedDataStore.getThing(1);
```

### Cache Expiration

A TTL can be set on caches to ensure that cached data doesn't go stale.

```
var proxiedDataStore = cacheWrapper.wrap(dataStore, { ttl: 5000 }); // Keep for 5000ms
```
