import React from 'react';
import ReactDOM from 'react-dom';
import {Task} from './task'

export class TaskList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          text: "Task #1",
          isDone: true
        },
        {
          text: "Task #2",
          isDone: false
        },
      ],
    };
    this.handleTaskAdding = this.handleTaskAdding.bind(this);
  }

  handleTaskAdding() {
    let newTasksState = this.state.tasks.slice();
    newTasksState.push(
      {
        text: this.input.value,
        isDone: false
      }
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

  handleTaskDone(index) {
    let newTasksState = this.state.tasks.slice();
    for (var i = 0; i < newTasksState.length; i++) {
      if (i == index) {
        newTasksState[i].isDone = true;
        break;
      }
    }
    this.setState({
      tasks: newTasksState,
    });
  }

  render() {
    let tasks = this.state.tasks.map((task, i) => {

      return (
        <li className="item" key={i}>
          <Task text={task.text} isDone={task.isDone}/>
          <span className="control-buttons">
            <span className="glyphicon glyphicon-remove pull-right md-glyphicon" onClick={() => this.handleTaskDeleting(i)}></span>
            {!task.isDone &&
              <span className="glyphicon glyphicon-ok pull-right md-glyphicon" onClick={() => this.handleTaskDone(i)}></span>
            }
          </span>
        </li>
      );
    });

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
