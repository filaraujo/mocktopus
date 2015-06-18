var fs = require('fs');
var should = require('should');
var mocktopus = require('../index.js');

var template = fs.readFileSync('./test/fixtures/choose.json', 'utf8');
var mockData = mocktopus.mock(template);

describe('#mock:choose', function() {
  describe('when given an "@choose" directive', function() {
    it('should choose one of the items', function() {
      mockData.chooseSimple.should.be.a.Boolean;
      mockData.chooseNumber.should.be.a.Number;
      mockData.chooseNumber.should.be.within(1, 3);
    });
  });

  describe('when given an "@choose" directive', function() {
    it('should choose one of the items', function() {
      mockData.chooseSimple.should.be.a.Boolean;
      mockData.chooseNumber.should.be.a.Number;
      mockData.chooseNumber.should.be.within(1, 3);
    });

    describe('with objects', function() {
      it('should return one of those objects', function() {
        mockData.chooseObject.should.have.any.properties('foo', 'bar', 'baz')
          .and.should.be.ok;
      });
    });

    describe('with objects with directives', function() {
      it('should return converted objects ', function() {
        mockData.chooseObjectWithDirectives.should.have.property('number');
        mockData.chooseObjectWithDirectives.number.should.be.a.Number;
      });
    });
  });
});
