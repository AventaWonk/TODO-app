import React from 'react';
import ReactDOM from 'react-dom';
import {Task} from './task'

export class TaskList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
    this.handleTaskAdding = this.handleTaskAdding.bind(this);
  }

  handleTaskAdding() {
    let newTasksState = this.state.tasks.slice();
    newTasksState.push(
      <Task text={this.input.value}/>
    );
    this.setState({
      tasks: newTasksState,
    });
    this.input.value = "";
  }

  handleTaskDeleting(index) {
    let newTasksState = this.state.tasks.slice();
    for (var i = 0; i < newTasksState.length; i++) {
      if (i == index) {
        newTasksState.splice(i, 1);
        break;
      }
    }
    this.setState({
      tasks: newTasksState,
    });
  }

  render() {
    let tasks = this.state.tasks.map((task, i) =>
      <li className="item" key={i}>
        {task}
        <span className="glyphicon glyphicon-remove pull-right" onClick={() => this.handleTaskDeleting(i)}></span>
      </li>
    );

    return (
      <div>
        <ul className="md-list">{tasks}</ul>
        <div className="md-form">
          <input className="md-input" type="text" placeholder="Input task here..." ref={(input) => this.input = input} />
          <button className="md-button" onClick={this.handleTaskAdding}>Add</button>
        </div>
      </div>
    );
  }
}
