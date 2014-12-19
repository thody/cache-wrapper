require('blanket');
var assert = require('assert');
var sinon = require('sinon');

var cacheWrapper = require('../lib');

var resource = {
  getStuff: function (spy) {
    spy();

    // Do something resource intensive...
    return 1;
  }
};

describe('Cache Wrapper', function () {
  describe('#wrap()', function () {
    it('should not call underlying method more than once', function () {
      var spy = sinon.spy();
      var proxiedResource = cacheWrapper.wrap(resource);
      proxiedResource.getStuff(spy);
      proxiedResource.getStuff(spy);
      sinon.assert.calledOnce(spy);
    });
  });
});
