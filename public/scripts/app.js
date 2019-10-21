'use strict';

console.log('app is running');

var template = React.createElement(
  'p',
  null,
  'this is jsx!'
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
