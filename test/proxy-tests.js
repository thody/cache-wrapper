require('blanket');
var assert = require('assert');
var sinon = require('sinon');

var cacheWrapper = require('../lib');

var fakeResource = {
  getStuff: function (spy) {
    spy();

    // Do something resource intensive...
    return 1;
  }
};

var clock;

before(function (done) {
  clock = sinon.useFakeTimers();
  done();
});

beforeEach(function (done) {
  // Clear caches between tests or cache will carry over
  cacheWrapper.clearCaches();
  done();
});

afterEach(function (done) {
  clock.reset();
  done();
});

describe('Cache Wrapper', function () {
  describe('#wrap()', function () {
    it('should not call underlying method more than once', function () {
      var spy = sinon.spy();
      var proxiedResource = cacheWrapper.wrap(fakeResource);

      proxiedResource.getStuff(spy); // Call underlying method
      proxiedResource.getStuff(spy); // Hit cache

      sinon.assert.calledOnce(spy);
    });

    it('should be able to wrap an individual function', function () {
      var spy = sinon.spy();
      var proxiedFunction = cacheWrapper.wrap(fakeResource.getStuff);

      proxiedFunction(spy); // Call underlying method
      proxiedFunction(spy); // Hit cache

      sinon.assert.calledOnce(spy);
    });

    it('should not hit the cache after the ttl has passed', function () {
      var spy = sinon.spy();
      var options = {ttl: 10};
      var proxiedResource = cacheWrapper.wrap(fakeResource, options);

      // Call method twice before ttl expires
      proxiedResource.getStuff(spy); // Call underlying method
      proxiedResource.getStuff(spy); // Hit cache

      // Wait for ttl to expire
      clock.tick(options.ttl + 1);

      // Try again
      proxiedResource.getStuff(spy); // Call underlying method again

      sinon.assert.calledTwice(spy);
    });
  });
});
