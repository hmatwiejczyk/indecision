class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.deleteOptionsHandler = this.deleteOptionsHandler.bind(this);
    this.pickOptionHandler = this.pickOptionHandler.bind(this);
    this.addOptionHandler = this.addOptionHandler.bind(this);
    this.state = {
      options: []
    };
  }
  deleteOptionsHandler() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }
  addOptionHandler(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'this option already exist';
    }
    this.setState(prevState => {
      return {
        options: prevState.options.concat(option)
      };
    });
  }
  pickOptionHandler() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    if (option) alert(option);
  }
  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of computer';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length}
          pickOptionHandler={this.pickOptionHandler}
        />
        <Options
          options={this.state.options}
          deleteOptionsHandler={this.deleteOptionsHandler}
        />
        <AddOption addOptionHandler={this.addOptionHandler} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button
          disabled={!this.props.hasOptions}
          onClick={this.props.pickOptionHandler}
        >
          What should I do?
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <ol>
          {this.props.options.map((o, i) => {
            return <Option key={i} optionText={o} />;
          })}
        </ol>
        <button onClick={this.props.deleteOptionsHandler}>Remove All</button>
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <li>{this.props.optionText}</li>;
  }
}

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
    this.setState(() => {
      return {
        error
      };
    });
    e.target.elements.option.value = '';
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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
