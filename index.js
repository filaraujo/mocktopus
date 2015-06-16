var chance = require('chance').Chance(Math.random);
var api = {};

/**
 *
 */
function randomNumber(token) {
  var tokens = token.split(/\.{3}|\:/).map(Number);
  var min = tokens[0];
  var max = tokens[1];
  var precision = tokens[2];
  var rand;

  if (!max) {
    return min;
  }

  rand = (Math.random() * (max - min)) + min;

  if (precision) {
    // toFixed does rounding, this prevents it
    precision = rand.toString().indexOf('.') + precision;
    return Number(rand.toPrecision(precision));
  }

  return Math.round(rand);
}

/**
 *
 */
function arrayify(tmpl) {
  // clone obj
  var obj = JSON.parse(JSON.stringify(tmpl));
  var array = Array.apply(null, {
    length: randomNumber(obj['@length'])
  });

  delete obj['@length'];

  if (Object.keys(obj).length) {
    return array.map(parse.bind(this, obj));
  }

  return array;
}

function paramify(token) {
  'use strict';

  if (!token) {
    return {};
  }

  var params = token.split(',').map(function(t) {
    t = t.split(':');
    var key = t[0];
    var val = t[1];

    this[key] = val;

    // if should be number, convert it
    if (/\d{0,}(?:\.|)\d{1,}/.test(val)) {
      this[key] =  Number(val);
    }

    // if should be boolea, convert it
    if (/^(false|true)$/.test(val)) {
      this[key] = eval(val);
    }

    return this;
  }, {})[0];

  return params;
}

/**
 *
 */
function parseToken(token) {
  var tokens;

  if (/^\#/.test(token)) {
    tokens = token.split(/\?/);

    var directive = tokens[0].split('#')[1];
    var params = paramify(tokens[1]);

    return chance[directive].call(chance, params);
  }

  if (token.indexOf('...') >= 0) {
    return randomNumber(token);
  }

  if (/\d{0,}(?:\.|)\d{1,}/.test(token)) {
    return Number(token);
  }

  return token;
}

/**
 *
 */
function parse(tmpl) {
  var obj = {};

  if (typeof tmpl === undefined) {
    return tmpl;
  }

  // if length directive, convert to array
  if (tmpl.hasOwnProperty('@length')) {
    return arrayify(tmpl);
  }

  // if value directive, return value instead of an {}
  if (tmpl.hasOwnProperty('@value')) {
    return parseToken(tmpl['@value']);
  }

  Object.keys(tmpl).forEach(function(key) {
    var token = tmpl[key];
    var newToken = token;

    if (typeof token === 'string') {
      newToken = parseToken(token);
    }

    if (typeof token === 'object') {
      newToken = parse(tmpl[key]);
    }

    obj[key] = newToken;
  });

  return obj;
}

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

  return parse(template);
};

module.exports = api;
