import * as React from 'react';

interface IndecisionState {
  error: string;
}

export class AddOption extends React.Component<
  { addOptionHandler },
  IndecisionState
> {
  state = {
    error: null
  };
  onSubmitForm = e => {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.addOptionHandler(option);
    this.setState(() => ({
      error
    }));
    if (!error) {
      e.target.elements.option.value = '';
    }
  };
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
