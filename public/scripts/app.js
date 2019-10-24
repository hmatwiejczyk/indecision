'use strict';

var app = {
  title: 'Indecision App',
  subtitle: 'some info',
  options: []
};
var appRoot = document.getElementById('app');

var onFormSubmit = function onFormSubmit(e) {
  e.preventDefault();
  var option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
};

var onRemoveAll = function onRemoveAll() {
  app.options = [];
  render();
};

var onMakeDecision = function onMakeDecision() {
  var randomNum = Math.floor(Math.random() * app.options.length);
  var option = app.options[randomNum];
  if (option) alert(option);
};

var render = function render() {
  var template = React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      app.title
    ),
    app.subtitle && React.createElement(
      'p',
      null,
      'Age: ',
      app.subtitle
    ),
    React.createElement(
      'p',
      null,
      app.options.length > 0 ? 'here your options' : 'No options'
    ),
    React.createElement(
      'button',
      { disabled: !app.options.length, onClick: onMakeDecision },
      'What should I do?'
    ),
    React.createElement(
      'button',
      { onClick: onRemoveAll },
      'Remove All'
    ),
    React.createElement('br', null),
    React.createElement(
      'ol',
      null,
      app.options.map(function (p, i) {
        return React.createElement(
          'li',
          { key: i },
          p
        );
      })
    ),
    React.createElement(
      'form',
      { onSubmit: onFormSubmit },
      React.createElement('input', { text: 'text', name: 'option' }),
      React.createElement(
        'button',
        null,
        'Add Option'
      )
    )
  );

  ReactDOM.render(template, appRoot);
};

render();
