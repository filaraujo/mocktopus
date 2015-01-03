var api = {};

/**
 *
 */
function randomNumber(min, max) {
  if (!max) {
    return min;
  }

  var rand = (Math.random() * (max - min)) + min;
  return Math.round(rand);
}

/**
 *
 */
function arrayify(tmpl) {
  var numbers = tmpl['#'].split('...').map(Number);
  // clone obj
  var obj = JSON.parse(JSON.stringify(tmpl));
  delete obj['#'];

  numbers = randomNumber.apply(this, numbers);

  return Array.apply(null, {length: numbers})
    .map(parse.bind(this, obj));
}

/**
 *
 */
function parseToken(token){
  var tokens;

  if (token.indexOf('...') >= 0){
    tokens = token.split('...').map(Number);
    return randomNumber.apply(this, tokens);
  }

  if (/\d+(?:\.|)\d{1,}/.test(token)){
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
