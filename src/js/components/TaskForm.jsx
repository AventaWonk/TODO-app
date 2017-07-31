import React from 'react';
import PropTypes from 'prop-types';

export class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInput: "",
      isButtonDisabled: true,
    };
    this.handleTaskInputTextChange = this.handleTaskInputTextChange.bind(this);
    this.handleTaskAdding = this.handleTaskAdding.bind(this);
  }

  handleTaskInputTextChange(input) {
    this.setState({
      taskInput: input.target.value,
      isButtonDisabled: input.target.value ? false : true,
    });
  }

  handleTaskAdding() {
    if (this.state.taskInput) {
      this.props.addTask(this.state.taskInput);
      this.setState({
        taskInput: "",
        isButtonDisabled: true,
      });
    }
  }

  handleKeyPress(key) {
    if (key == 'Enter') {
      this.handleTaskAdding();
    }
  }

  render() {
    return (
      <div onKeyPress={event => this.handleKeyPress(event.key)} className="md-form">
        <input className="md-input" type="text" placeholder="Input task here..." value={this.state.taskInput} onChange={this.handleTaskInputTextChange}  />
        <button className="md-button" disabled={this.state.isButtonDisabled} onClick={this.handleTaskAdding}>Add</button>
      </div>
    );
  }
}

TaskForm.propTypes = {
  addTask: PropTypes.func,
}
