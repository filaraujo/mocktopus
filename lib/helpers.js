var func = require('../lib/functions');

/**
 *
 */
function arrayify(tmpl, cb) {
  // clone obj
  var obj = JSON.parse(JSON.stringify(tmpl));
  var arrayLength = obj['@length'];

  if (typeof obj['@length'] === 'string') {
    arrayLength = randomNumberFromToken(obj['@length']);
  }

  var array = Array.apply(null, {
    length: arrayLength
  });

  delete obj['@length'];

  if (Object.keys(obj).length) {
    return array.map(cb.bind(this, obj));
  }

  return array;
}

function choosify(token, cb) {
  var index = Math.floor(Math.random() * token.length);
  return cb(token[index]);
}

function functionize(params, key) {
  var method = func[params.type];
  return method.bind(method, key);
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

function randomNumberFromToken(token) {
  var tokens = token.split(/\.{3}|\:/).map(Number);
  var min = tokens[0];
  var max = tokens[1];
  var rand;

  if (!max) {
    return min;
  }

  rand = (Math.random() * (max - min)) + min;
  return Math.round(rand);
}

module.exports = {
  arrayify: arrayify,
  choosify: choosify,
  functionize: functionize,
  paramify: paramify,
  randomNumberFromToken: randomNumberFromToken
};
