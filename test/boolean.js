var fs = require('fs');
var should = require('should');
var mocktopus = require('../index.js');

var template = fs.readFileSync('./test/fixtures/booleans.json', 'utf8');
var mockData = mocktopus.mock(template);

describe('#mock:boolean', function() {
  describe('when given an boolean value', function() {
    it('should return that boolean', function() {
      mockData.booleanTrue.should.be.ok;
      mockData.booleanFalse.should.be.not.ok;
    });
  });

  describe('when given an "#boolean" directive', function() {
    it('should return a boolean', function() {
      console.log('bool', mockData.booleanDirective);
      mockData.booleanDirective.should.be.a.Boolean;
    });

    describe('with a "likelihood" params', function() {
      it('should return boolean with that likelihood', function() {
        // 100% likelihood
        mockData.booleanDirectiveWithLikelihood.should.be.ok;
      });
    });
  });
});
