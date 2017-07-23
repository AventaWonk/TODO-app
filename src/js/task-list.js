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
      <li key={i}>
        {task}
        <span onClick={() => this.handleTaskDeleting(i)}>Del</span>
      </li>
    );

    return (
      <div>
        <div>{tasks}</div>
        <div>
          <label>
            Task:
            <input type="text" ref={(input) => this.input = input} />
          </label>
          <button onClick={this.handleTaskAdding}>Add</button>
        </div>
      </div>
    );
  }
}
