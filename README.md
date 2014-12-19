[![Build Status](https://img.shields.io/travis/thody/cache-wrapper.svg)](https://travis-ci.org/thody/cache-wrapper)
[![Dependency Status](https://gemnasium.com/thody/cache-wrapper.svg)](https://gemnasium.com/thody/cache-wrapper)

## Installation

`npm install cache-wrapper`

## Usage 

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
