require('blanket');
var assert = require('assert');
var sinon = require('sinon');

var cachingProxy = require('../lib');

var resource = {
  getStuff: function (spy) {
    spy();

    // Do something resource intensive...
    return 1;
  }
};

describe('Caching Proxy', function () {
  describe('#proxy()', function () {
    it('should not call underlying method more than once', function () {
      var spy = sinon.spy();
      var proxiedResource = cachingProxy.proxy(resource);
      proxiedResource.getStuff(spy);
      proxiedResource.getStuff(spy);
      sinon.assert.calledOnce(spy);
    });
  });
});
