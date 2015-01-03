var fs = require('fs');
var should = require('should');
var mocktopus = require('../index.js');

var template = fs.readFileSync('./test/fixtures/objects.json', 'utf8');
var mockData = mocktopus.mock(template);

describe('#mock:object', function() {
  describe('when given a empty object', function(){
    var data = mocktopus.mock('{}');

    it('should return an simple object', function() {
      data.should.be.an.Object;
    });
  });

  describe('when given a simple object', function() {
    var data = mockData.objectSimple;

    it('should return an simple object', function() {
      data.should.be.an.Object;
    });

    it('should return the same keys on that object', function() {
      data.should.have.keys('foo', 'bar', 'baz');
    });

    it('should return the same values on that object', function() {
      data.should.have.property('foo', true);
      data.should.have.property('bar', false);
      data.should.have.property('baz', 1);
    });
  });

  describe('when given nested objects', function() {
    var data = mockData.objectNested;

    it('should return similiar nesting', function() {
      var path;

      data.should.be.an.Object;
      data.should.have.propertyByPath('foo', 'bar');
      data.should.have.propertyByPath('foo', 'baz');

      data.foo.bar.should.have.keys('boo');
      data.foo.bar.should.have.property('boo', true);

      data.foo.baz.should.have.keys('far', 'faz');
      data.foo.baz.should.have.property('far', false);
      data.foo.baz.should.have.property('faz', 1);
    });

  });
});
