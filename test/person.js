var fs = require('fs');
var should = require('should');
var mocktopus = require('../index.js');

var template = fs.readFileSync('./test/fixtures/persons.json', 'utf8');
var mockData = mocktopus.mock(template);

describe('#mock:person', function() {
  describe('when given the "#age" directive', function() {
    it('should return a age', function() {
      mockData.personAge.should.a.Number;
    });

    describe('with a "type" params', function() {
      it('should return an typed age', function() {
        mockData.personAgeChild.should.a.Number
          .and.within(0, 12);
        mockData.personAgeTeen.should.a.Number
          .and.within(13, 19);
      });
    });
  });

  describe('when given the "#birthday" directive', function() {
    it('should return a birthday', function() {
      mockData.personBirthday.should.a.Date;
    });

    describe('with a "string" params set to true', function() {
      it('should return a stringed date', function() {
        mockData.personBirthdayString.should.a.String
          .and.match(/\d+\/\d+\/\d+/);
      });
    });

    describe('with a "year" params', function() {
      it('should return a date set to that year', function() {
        mockData.personBirthdayWithYear.should.a.Date;
        mockData.personBirthdayWithYear.getFullYear().should.be.exactly(1983);
      });
    });
  });

  describe('when given the "#first" directive', function() {
    it('should return a first name', function() {
      mockData.personFirst.should.a.String;
      mockData.personFirst[0].should.match(/[A-Z]/); // assumption
    });

    describe('with a "gender" params', function() {
      it('should return a gendered name', function() {
        mockData.personFirstWithGender.should.a.String;
        mockData.personFirstWithGender[0].should.match(/[A-Z]/); // assumption
      });
    });
  });

  describe('with given the "last" directive', function() {
    it('should return a last name', function() {
      mockData.personLast.should.a.String;
      mockData.personLast[0].should.match(/[A-Z]/); // assumption
    });
  });

  describe('with given the "name" directive', function() {
    it('should return a full name', function() {
      mockData.personName.should.a.String;
      mockData.personName.should.match(/[A-Za-z]+\s[A-Za-z]/);
    });

    describe('with a "middle" params set to true', function() {
      it('should return a middle name', function() {
        mockData.personNameWithMiddle.should.a.String;
        mockData.personNameWithMiddle.split(/\s/).should.matchEach(function(name) {
          return name.should.match(/^[A-Z][a-z]+/);
        });
      });
    });

    describe('with a "middle_initial" params set to true', function() {
      it('should return a middle initial', function() {
        mockData.personNameWithMiddleInitial.should.a.String;
        mockData.personNameWithMiddleInitial.split(/\s/)[1].should.match(/^[A-Z]\./);
      });
    });

    describe('with a "prefix" params set to true', function() {
      it('should return a prefixed name', function() {
        mockData.personNameWithPrefix.should.a.String;
        mockData.personNameWithPrefix.split(/\s/).length.should.be.exactly(3);
      });
    });

    describe('with a "suffix" params set to true', function() {
      it('should return a suffixed name', function() {
        mockData.personNameWithSuffix.should.a.String;
        mockData.personNameWithSuffix.split(/\s/).length.should.be.exactly(3);
      });
    });

    describe('with a "gender" params set to true', function() {
      it('should return a gendered name', function() {
        mockData.personNameWithGender.should.a.String;
      });
    });
  });

  describe('with given the "prefix" directive', function() {
    it('should return a name prefix', function() {
      mockData.personPrefix.should.a.String;
    });

    describe('with a "full" params set to true', function() {
      it('should return a full prefixed name', function() {
        mockData.personPrefixFull.should.a.String;
      });
    });

    describe('with a "gender" params', function() {
      it('should return a full prefixed name', function() {
        mockData.personPrefixWithGender.should.a.String;
      });
    });
  });

  describe('with given the "ssn" directive', function() {
    it('should return a social security', function() {
      mockData.personSocial.should.a.String
        .and.match(/\d{3}\-\d{2}\-\d{4}/);
    });

    describe('with a "ssnFour" params', function() {
      it('should return only four digits', function() {
        mockData.personSocialOnlyFour.should.a.String
          .and.match(/\d{4}/)
      });
    });

    describe('with a "dashes" params ', function() {
      it('should return only four digits', function() {
        mockData.personSocialOnlyFour.should.a.String
          .and.match(/\d{4}/);
      });
    });
  });

  describe('with given the "suffix" directive', function() {
    it('should return a name prefix', function() {
      mockData.personSuffix.should.a.String;
    });

    describe('with a "full" params set to true', function() {
      it('should return a full prefixed name', function() {
        mockData.personSuffixFull.should.a.String;
      });
    });
  });

});
