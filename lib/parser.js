var helpers = require('../lib/helpers');
var chance = require('chance').Chance(Math.random);

function parseToken(token, key) {
  var tokens;

  if (/^\#/.test(token)) {
    tokens = token.split(/\?/);

    var directive = tokens[0].split('#')[1];
    var params = helpers.paramify(tokens[1]);

    if (directive === 'function') {
      return helpers.functionize(params, key);
    }

    if (!chance[directive]) {
      console.error('Directive "' + directive + '" not found');
    }
    return chance[directive].call(chance, params);
  }

  if (token.indexOf('...') >= 0) {
    return helpers.randomNumberFromToken(token);
  }

  if (/^\d{0,}(?:\.|)\d{1,}$/.test(token)) {
    return Number(token);
  }

  return token;
}

/**
 *
 */
function parse(tmpl) {
  var obj = {};

  if (typeof tmpl === 'function') {
    return tmpl.call({});
  }

  if (typeof tmpl !== 'object') {
    return tmpl;
  }

  if (typeof tmpl === undefined) {
    return tmpl;
  }

  if (Array.isArray(tmpl)) {
    return tmpl.map(function(item) {
      return parse(item);
    });
  }

  // if length directive, convert to array
  if (tmpl.hasOwnProperty('@length')) {
    return helpers.arrayify(tmpl, parse);
  }

  // if choose directive, choose and item
  if (tmpl.hasOwnProperty('@choose')) {
    return helpers.choosify(tmpl['@choose'], parse);
  }

  // if value directive, return value instead of an {}
  if (tmpl.hasOwnProperty('@value')) {
    return parseToken(tmpl['@value']);
  }

  Object.keys(tmpl).forEach(function(key) {
    var token = tmpl[key];
    var newToken = token;

    if (typeof token === 'string') {
      newToken = parseToken(token, key);
    }

    if (typeof token === 'object') {
      newToken = parse(tmpl[key]);
    }

    obj[key] = newToken;
  });

  return obj;
}

module.exports = {
  parse: parse
};
