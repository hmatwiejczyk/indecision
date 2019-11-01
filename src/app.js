import React from 'react';
import ReactDOM from 'react-dom';


class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.deleteOptionsHandler = this.deleteOptionsHandler.bind(this);
    this.pickOptionHandler = this.pickOptionHandler.bind(this);
    this.addOptionHandler = this.addOptionHandler.bind(this);
    this.removeOptionHandler = this.removeOptionHandler.bind(this);
    this.state = {
      options: props.options
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  deleteOptionsHandler() {
    this.setState(() => ({
      options: []
    }));
  }
  addOptionHandler(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'this option already exist';
    }
    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
  }
  pickOptionHandler() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    if (option) alert(option);
  }
  removeOptionHandler(option) {
    this.setState(prevState => ({
      options: prevState.options.filter(item => item !== option)
    }));
  }
  render() {
    const subtitle = 'Put your life in the hands of computer';
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length}
          pickOptionHandler={this.pickOptionHandler}
        />
        <Options
          options={this.state.options}
          removeOptionHandler={this.removeOptionHandler}
          deleteOptionsHandler={this.deleteOptionsHandler}
        />
        <AddOption addOptionHandler={this.addOptionHandler} />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Options = props => {
  return (
    <div>
      {props.options.length === 0 && <p>no data</p>}
      <ol>
        {props.options.map((o, i) => {
          return (
            <Option
              removeOptionHandler={props.removeOptionHandler}
              key={i}
              optionText={o}
            />
          );
        })}
      </ol>
      <button onClick={props.deleteOptionsHandler}>Remove All</button>
    </div>
  );
};

const Option = props => {
  return (
    <li>
      {props.optionText}{' '}
      <button
        onClick={() => {
          props.removeOptionHandler(props.optionText);
        }}
      >
        X
      </button>
    </li>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = {
      error: null
    };
  }
  onSubmitForm(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.addOptionHandler(option);
    this.setState(() => ({
      error
    }));
    if (!error) {
      e.target.elements.option.value = '';
    }
  }
  render() {
    return (
      <form onSubmit={this.onSubmitForm}>
        {this.state.error && <p>{this.state.error}</p>}
        <input type="text" name="option" />
        <button type="submit">Add Option</button>
      </form>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision App'
};

const Action = props => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.pickOptionHandler}>
        What should I do?
      </button>
    </div>
  );
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
