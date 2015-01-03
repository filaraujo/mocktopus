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
    precision = rand.toString().indexOf('.') + precision;
    return Number(rand.toPrecision(precision));
  }

  return Math.round(rand);
}

/**
 *
 */
function arrayify(tmpl) {
  // var numbers = tmpl['#'].split('...').map(Number);
  // clone obj
  var obj = JSON.parse(JSON.stringify(tmpl));
  delete obj['#'];

  var numbers = randomNumber(tmpl['#']);

  return Array.apply(null, {length: numbers})
    .map(parse.bind(this, obj));
}

/**
 *
 */
function parseToken(token){
  var tokens;

  if (token.indexOf('...') >= 0) {
    return randomNumber(token);
  }

  if (/\d+(?:\.|)\d{1,}/.test(token)) {
    return Number(token);
  }

}

/**
 *
 */
function parse(tmpl) {
  var obj = {};

  if (tmpl.hasOwnProperty('#')) {
    return arrayify(tmpl);
  }

  Object.keys(tmpl).forEach(function(key) {
    var token = tmpl[key];
    var newToken;

    if (typeof token === 'string') {
      newToken = parseToken(token);
    }

    if (typeof token === 'object') {
      newToken = parse(tmpl[key]);
    }

    obj[key] = newToken || token;
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

  // console.log(parse(template));

  return parse(template);

};


module.exports = api;
