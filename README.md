[![Build Status](https://travis-ci.org/thody/caching-proxy.svg?branch=master)](https://travis-ci.org/thody/caching-proxy)
[![Dependency Status](https://gemnasium.com/thody/caching-proxy.svg)](https://gemnasium.com/thody/caching-proxy)

## Usage 

```
var cachingProxy = require('caching-proxy');
var dataStore = {
    getThing: function (id) {
        // Do something resource intensive
    }
};

var proxiedDataStore = cachingProxy.proxy(dataStore);
var thing = proxiedDataStore.getThing(1);
```
