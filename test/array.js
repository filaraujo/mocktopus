var fs = require('fs');
var should = require('should');
var mocktopus = require('../index.js');

var template = fs.readFileSync('./test/fixtures/arrays.json', 'utf8');
var mockData = mocktopus.mock(template);

describe('#mock:arrays', function() {
  describe('when given an "#" key', function() {

    it('should create an array', function() {
      data = mocktopus.mock('{ "#": "0" }');
      data.should.be.an.Array.with.lengthOf(0);
      data.should.be.empty;
    });

    it('should create an array with n items specified', function() {
      mocktopus.mock('{ "#": "2" }').should.be.an.Array.with.lengthOf(2);
      mocktopus.mock('{ "#": "10" }').should.be.an.Array.with.lengthOf(10);
    });

    it('should include any properties within the object', function() {
      mockData.arraySingle.should.be.an.Array.with.lengthOf(1);
      mockData.arrayMultiple.should.be.an.Array.with.lengthOf(3);

      mockData.arraySingle.forEach(function(array) {
        array.should.containEql({'property': true});
      });

      mockData.arrayMultiple.forEach(function(array) {
        array.should.containEql({'property': true});
      });
    });

    it('should allow for array ranges', function(){
      mockData.arrayWithRange.length.should.be.within(1, 5);
    });
  });
});
