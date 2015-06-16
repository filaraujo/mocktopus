var fs = require('fs');
var should = require('should');
var mocktopus = require('../index.js');

var template = fs.readFileSync('./test/fixtures/arrays.json', 'utf8');
var mockData = mocktopus.mock(template);

describe('#mock:arrays', function() {
  describe('when given an "@length" directive', function() {

    it('should create an array', function() {
      Object.keys(mockData).forEach(function(array) {
        mockData[array].should.be.an.Array;
      });
    });

    it('should create an empty array if no properties or values are defined', function() {
      mockData.arraySingleEmpty.should.matchEach(undefined);
      mockData.arrayManyEmpty.should.matchEach(undefined);
    });

    it('should create an array based on the "@length" specified', function() {
      mockData.arrayEmpty.should.have.a.lengthOf(0);
      mockData.arraySingleEmpty.should.have.a.lengthOf(1);
      mockData.arrayManyEmpty.should.have.a.lengthOf(10);
      mockData.arraySingleObject.should.have.a.lengthOf(1);
      mockData.arrayManyObjects.should.have.a.lengthOf(3);
      mockData.arraySingleValue.should.have.a.lengthOf(1);
      mockData.arrayManyValues.should.have.a.lengthOf(4);
    });

    it('should populate that array based on the "@value" specified', function() {
      mockData.arraySingleValue.should.matchEach(111);
      mockData.arrayManyValues.should.matchEach(444);
    });


    it('should include any properties within the object', function() {
      mockData.arraySingleObject.forEach(function(array) {
        array.should.containEql({'someProperty': true});
      });

      mockData.arrayManyObjects.forEach(function(array) {
        array.should.containEql({'someProperty': true});
      });
    });

    it('should allow for array ranges', function() {
      mockData.arrayWithRange.length.should.be.within(1, 5);
    });

    it('should allow for nested array ', function() {
      mockData.arrayWithNestArray.length.should.be.within(1, 5);
      mockData.arrayWithNestArray.should.matchEach(function(array) {
        array.foo.length.should.be.within(1, 3);
        array.foo[0].bar.should.be.ok;
        return true;
      });
    });
  });
});
