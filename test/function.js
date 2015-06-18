var fs = require('fs');
var should = require('should');
var mocktopus = require('../index.js');
var sinon = require('sinon');

var template = fs.readFileSync('./test/fixtures/functions.json', 'utf8');
var mockData = mocktopus.mock(template);
var scope = (global || window);

describe('#mock:function', function() {
  describe('when given an function directive', function() {
    it('should return a function', function() {
      mockData.functionAlert.should.be.Function;
      mockData.functionConsole.should.be.Function;
    });

    describe('with a "type" of alert', function() {
      it('should return a mocked alert function', function() {
        scope.alert = scope.alert || function(){};
        var spy = sinon.spy(scope, 'alert');

        mockData.functionAlert();
        scope.alert.called.should.be.ok;
      });
    });

    describe('with a "type" of console', function() {
      it('should return a console alert function', function() {
        var spy = sinon.spy(scope.console, 'log');

        mockData.functionConsole();
        scope.console.log.called.should.be.ok;
      });
    });
  });
});
