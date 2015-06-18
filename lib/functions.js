var scope = (global || window);
var text = 'Function "{{signature}}" called';

module.exports = {
  alert: function(key) {
    var func = scope.alert || this.console;

    if (scope.alert) {
      func(text.replace('{{signature}}', key));
    }
  },

  console: function(key) {
    scope.console.log(text.replace('{{signature}}', key));
  }
};
