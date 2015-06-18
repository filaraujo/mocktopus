var chance = require('chance').Chance(Math.random);
var parser = require('./lib/parser');

var api = {};

api.mock = function(tmpl) {
  var template = tmpl;

  // if not a string, stringify it
  if (typeof tmpl !== 'string') {
    template = JSON.stringify(tmpl);
  }

  try {
    // convert to object
    template = JSON.parse(template);
  } catch (e) {}

  // if is not an object when parsed, throw error
  if (!Object.keys(template)) {
    throw new Error('invalid template');
  }

  return parser.parse(template);
};

(global || window).mocktopus = api;
module.exports = api;
