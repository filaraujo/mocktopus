var fs = require('fs');
var should = require('should');
var mocktopus = require('../index.js');

var template = fs.readFileSync('./test/fixtures/numbers.json', 'utf8');
var mockData = mocktopus.mock(template);

describe('#mock:number', function() {
  describe('when given an number value', function() {
    it('should return an number', function() {
      mockData.numberSimple.should.be.exactly(66).and.a.Number;
    });
  });

  describe('when given an number with a decimal', function() {
    it('should return that number', function() {
      mockData.numberWithDecimal.should.be.exactly(723.12312313).and.a.Number;
    });
  });

  describe('when given the "#integer" directive', function() {
    it('should return a number', function() {
      mockData.numberInteger.should.be.a.Number;
      mockData.numberIntegerWithRange.should.be.a.Number;
    });

    describe('with a "min" and "max" params', function() {
      it('should return an integer number within that range', function() {
        mockData.numberIntegerWithRange.should.be.within(1001, 2000);
      });
    });
  });

  describe('when given the "#natural" directive', function() {
    it('should return a natural number', function() {
      mockData.numberNatural.should.a.Number;
      mockData.numberNaturalWithRange.should.a.Number;
      mockData.numberNatural.should.be.greaterThan(0);
      mockData.numberNaturalWithRange.should.be.greaterThan(0);
    });

    describe('with a "min" and "max" params', function() {
      it('should return an natural number within that range', function() {
        mockData.numberNaturalWithRange.should.be.within(1, 1000);
      });
    });
  });

  describe('when given the "#floating" directive', function() {
    it('should return a float number', function() {
      [
        mockData.numberFloating,
        mockData.numberFloatingWithRange,
        mockData.numberFloatingWithFixed
      ]
        .forEach(function(num) {
          var decimal = num.toString().split('.')[1];

          num.should.a.Number;
          decimal.length.should.be.greaterThan(0);
        });
    });

    describe('with a "min" and "max" params', function() {
      it('should return an floating number within that range', function() {
        mockData.numberFloatingWithRange.should.be.within(2000, 3000);
      });
    });

    describe('with a "fixed" param', function() {
      it('should return an floating number with that precision', function() {
        var decimal = mockData.numberFloatingWithFixed.toString().split('.')[1];

        decimal.length.should.exactly(6);
      });
    });
  });
});
