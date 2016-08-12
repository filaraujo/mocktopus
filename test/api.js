var should = require('should');
var mocktopus = require('../index.js');

describe('mocktopus', function() {
  it('should return an api object', function() {
    mocktopus.should.be.an.Object;
    mocktopus.mock.should.be.a.Function;
  });

  describe('#mock', function(){
    it('should accept an json object', function() {
      (function() {
        mocktopus.mock('{ "test": "test" }');
      }).should.not.throw();
    });

    it('should accept an js object', function() {
      (function() {
        mocktopus.mock({'test': 'test'});
      }).should.not.throw();
    });

    it('should not accept anything other than an valid object or json string', function() {
      var invalidTypes = [false, true, '', 1, null, undefined];

      invalidTypes.forEach(function(type) {
        (function() {
          mocktopus.mock(type);
        }).should.throw();
      });
    });
  });
});
