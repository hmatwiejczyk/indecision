import * as React from 'react';
import { AddOption } from './AddOption';
import { Options } from './Options';
import { Header } from './Header';
import { Action } from './Action';
import { OptionModal } from './OptionModal';

interface IIndecisionAppProps {
  options: string[];
}

interface IIndecisionAppState {
  options: string[];
  selectedOption: string;
}

export class IndecisionApp extends React.Component<
  IIndecisionAppProps,
  IIndecisionAppState
> {
  state = {
    options: this.props.options ? this.props.options : [],
    selectedOption: null
  };

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

  deleteOptionsHandler = () => {
    this.setState(() => ({
      options: []
    }));
  };

  addOptionHandler = option => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'this option already exist';
    }
    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
  };

  optionClearHandler = () => {
    this.setState(prevState => ({
      selectedOption: null
    }));
  };

  pickOptionHandler = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    if (option) {
      this.setState(() => ({
        selectedOption: option
      }));
    }
  };

  removeOptionHandler = option => {
    this.setState(prevState => ({
      options: prevState.options.filter(item => item !== option)
    }));
  };

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
        <OptionModal
          optionClearHandler={this.optionClearHandler}
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  }
}

// IndecisionApp.defaultProps = {
//   options: []
// };
