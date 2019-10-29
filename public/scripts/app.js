'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.deleteOptionsHandler = _this.deleteOptionsHandler.bind(_this);
    _this.pickOptionHandler = _this.pickOptionHandler.bind(_this);
    _this.addOptionHandler = _this.addOptionHandler.bind(_this);
    _this.removeOptionHandler = _this.removeOptionHandler.bind(_this);
    _this.state = {
      options: props.options
    };
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var json = localStorage.getItem('options');
      var options = JSON.parse(json);
      this.setState(function () {
        return { options: options };
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  }, {
    key: 'deleteOptionsHandler',
    value: function deleteOptionsHandler() {
      this.setState(function () {
        return {
          options: []
        };
      });
    }
  }, {
    key: 'addOptionHandler',
    value: function addOptionHandler(option) {
      if (!option) {
        return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'this option already exist';
      }
      this.setState(function (prevState) {
        return {
          options: prevState.options.concat(option)
        };
      });
    }
  }, {
    key: 'pickOptionHandler',
    value: function pickOptionHandler() {
      var randomNum = Math.floor(Math.random() * this.state.options.length);
      var option = this.state.options[randomNum];
      if (option) alert(option);
    }
  }, {
    key: 'removeOptionHandler',
    value: function removeOptionHandler(option) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (item) {
            return item !== option;
          })
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var subtitle = 'Put your life in the hands of computer';
      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length,
          pickOptionHandler: this.pickOptionHandler
        }),
        React.createElement(Options, {
          options: this.state.options,
          removeOptionHandler: this.removeOptionHandler,
          deleteOptionsHandler: this.deleteOptionsHandler
        }),
        React.createElement(AddOption, { addOptionHandler: this.addOptionHandler })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
  options: []
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'ol',
      null,
      props.options.map(function (o, i) {
        return React.createElement(Option, {
          removeOptionHandler: props.removeOptionHandler,
          key: i,
          optionText: o
        });
      })
    ),
    React.createElement(
      'button',
      { onClick: props.deleteOptionsHandler },
      'Remove All'
    )
  );
};

var Option = function Option(props) {
  return React.createElement(
    'li',
    null,
    props.optionText,
    ' ',
    React.createElement(
      'button',
      {
        onClick: function onClick() {
          props.removeOptionHandler(props.optionText);
        }
      },
      'X'
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.onSubmitForm = _this2.onSubmitForm.bind(_this2);
    _this2.state = {
      error: null
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'onSubmitForm',
    value: function onSubmitForm(e) {
      e.preventDefault();
      var option = e.target.elements.option.value.trim();
      var error = this.props.addOptionHandler(option);
      this.setState(function () {
        return {
          error: error
        };
      });
      e.target.elements.option.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { onSubmit: this.onSubmitForm },
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement('input', { type: 'text', name: 'option' }),
        React.createElement(
          'button',
          { type: 'submit' },
          'Add Option'
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: 'Indecision App'
};

var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { disabled: !props.hasOptions, onClick: props.pickOptionHandler },
      'What should I do?'
    )
  );
};

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
