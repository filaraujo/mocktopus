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

  describe('when given an number range as a value', function() {
    it('should return an number within that range', function() {
      mockData.numberWithRange.should.be.within(1, 1000).and.a.Number;
    });
  });

  describe('when given an number range and a decimal as a value', function() {
    it('should return an number within that range and precision', function() {
      var data = mockData.numberWithRangeAndDecimal;
      var decimals = data.toString().split('.')[1].length;

      data.should.be.within(1, 1000).and.a.Number;
      decimals.should.be.exactly(4);
    });
  });

  describe('when given an string with numbers and text', function() {
    it('should return value as text', function() {
      mockData.numbersWithLetters.should.be.eql('1000s').and.a.String;
    });
  });
});
