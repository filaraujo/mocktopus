var fs = require('fs');
var should = require('should');
var mocktopus = require('../index.js');

var template = fs.readFileSync('./test/fixtures/texts.json', 'utf8');
var mockData = mocktopus.mock(template);

describe('#mock:text', function() {
  describe('when given an text value', function() {
    it('should return an string', function() {
      mockData.stringSimple.should.be.instanceof(String)
        .and.a.String
        .and.eql('abc');
    });
  });

  describe('when given the "#paragraph" directive', function() {
    it('should return a paragraph', function() {
      var sentences = mockData.stringParagraph.split('.');

      mockData.stringParagraph.should.a.String;
      sentences.length.should.be.above(1);
    });

    describe('with a "sentence" params', function() {
      it('should return that many sentences', function() {
        var sentences = mockData.stringParagraphWithSentences.split(/\.\s/);
        sentences.length.should.be.exactly(10);
      });
    });
  });

  describe('when given the "#sentence" directive', function() {
    it('should return a sentence', function() {
      var sentence = mockData.stringSentence.match(/\.$/);
      mockData.stringSentence.should.a.String;
      sentence.length.should.be.exactly(1);
    });

    describe('with a "words" params', function() {
      it('should return that many words', function() {
        var words = mockData.stringSentenceWithWords.split(/\s/);
        words.length.should.be.exactly(8);
      });
    });
  });

  describe('when given the "#syllable" directive', function() {
    it('should return a syllable', function() {
      mockData.stringSyllable.should.a.String
        .and.match(/^\w+$/);
    });
  });

  describe('when given the "#word" directive', function() {
    it('should return a word', function() {
      mockData.stringWord.should.a.String
        .and.match(/^\w+$/);
    });
  });

  describe('when given the "#character" directive', function() {
    it('should return a character', function() {
      mockData.stringCharacter.should.a.String
        .and.match(/^\w|\W$/);
    });

    describe('with a "pool" params', function() {
      it('should return an character within that pool', function() {
        mockData.stringCharacterWithPool.should.match(/([abcd]{1})/);
      });
    });

    describe('with a "alpha" params', function() {
      it('should return an alphanumber character if set to true', function() {
        mockData.stringCharacterWithAlpha.should.match(/([A-Za-z0-9]{1})/);
      });

      it('should not return an alphanumber character if set to false', function() {
        mockData.stringCharacterWithoutAlpha.should.match(/([\w|\W]{1})/);
      });
    });

    describe('with a "casing" params', function() {
      it('should return a lower cased character when set to "lower"', function() {
        mockData.stringCharacterWithLowerCasing.should.match(/([a-z|\d|\W]{1})/);
      });

      it('should return an uppercase cased character when set to "upper"', function() {
        mockData.stringCharacterWithUpperCasing.should.match(/([A-Z|\d|\W]{1})/);
      });
    });

    describe('with a "symbols" params', function() {
      it('should return only symbols when set to true', function() {
        mockData.stringCharacterWithSymbols.should.match(/(\W{1})/);
      });
    });
  });
});
