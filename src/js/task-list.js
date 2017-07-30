import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';
import 'es6-promise/auto';
import {Task} from './task'

export class TaskList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: true,
      taskInput: "",
      tasks: [],
    };
    this.handleTaskInputTextChange = this.handleTaskInputTextChange.bind(this);
    this.handleTaskAdding = this.handleTaskAdding.bind(this);
    this.handleTaskAddingDone = this.handleTaskAddingDone.bind(this);
  }

  _getTasks() {
    fetch('http://localhost:8000/task/get')
      .then(response => response.json())
      .then(responseData => {
        if (responseData.response) {
          this.setState({
            tasks: responseData.response,
          });
        } else {
          alert('The server is temporarily unavailable')
        }
      });
  }

  _addTask(text, callback) {
    fetch(`http://localhost:8000/task/add/${text}`)
      .then(response => response.json())
      .then(result => {
        if (!result.response) {
          //TODO
        }
        return result.response
      })
      .then(addedTaskId => callback(addedTaskId));
  }

  _deleteTask(id) {
    fetch(`http://localhost:8000/task/delete/${id}`)
      .then(response => response.json())
      .then(result => {
        if (!result.response) {
          //TODO
        }
      });
  }

  _setDoneTask(id) {
    fetch(`http://localhost:8000/task/setdone/${id}`)
      .then(response => response.json())
      .then(result => {
        if (!result.response) {
          //TODO
        }
      });
  }

  componentDidMount() {
    this._getTasks();
  };

  handleTaskAddingDone(id) {
    let newTasksState = this.state.tasks.slice();
    for (var i = 0; i < newTasksState.length; i++) {
      if (newTasksState[i].isLoading) {
        newTasksState[i].id = id;
        delete newTasksState[i].isLoading;
        break;
      }
    }
    this.setState({
      tasks: newTasksState,
    });
  }

  handleTaskAdding() {
    if (this.state.taskInput) {
      this._addTask(this.state.taskInput, this.handleTaskAddingDone);
      let newTasksState = this.state.tasks.slice();
      newTasksState.push({
        text: this.state.taskInput,
        isDone: false,
        isLoading: true,
      });
      this.setState({
        tasks: newTasksState,
        taskInput: "",
        isButtonDisabled: true,
      });
    }
  }

  handleTaskDeleting(id) {
    this._deleteTask(id);
    let newTasksState = this.state.tasks.slice();
    for (var i = 0; i < newTasksState.length; i++) {
      if (newTasksState[i].id == id) {
        newTasksState.splice(i, 1);
        break;
      }
    }
    this.setState({
      tasks: newTasksState,
    });
  }

  handleTaskDone(id) {
    this._setDoneTask(id);
    let newTasksState = this.state.tasks.slice();
    for (var i = 0; i < newTasksState.length; i++) {
      if (newTasksState[i].id == id) {
        newTasksState[i].isDone = true;
        break;
      }
    }
    this.setState({
      tasks: newTasksState,
    });
  }

  handleTaskInputTextChange(input) {
    this.setState({
      taskInput: input.target.value,
      isButtonDisabled: input.target.value ? false : true,
    });
  }

  handleKeyPress(key) {
    if (key == 'Enter') {
      this.handleTaskAdding();
    }
  }

  render() {
    let tasks = this.state.tasks.map((task, i) => {

      return (
        <li className="item" key={i}>
          <Task text={task.text} isDone={task.isDone}/>
          <span className="control-buttons pull-right">
          {task.isLoading ? (
            <span className="glyphicon glyphicon-refresh md-glyphicon"></span>
          ) : (
            <span><span className="glyphicon glyphicon-remove md-glyphicon" onClick={() => this.handleTaskDeleting(task.id)}></span>
            {!task.isDone &&
              <span className="glyphicon glyphicon-ok md-glyphicon" onClick={() => this.handleTaskDone(task.id)}></span>
            }
            <span className="md-glyphicon">
              <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </span></span>
          )}

          </span>
        </li>
      );
    });

    return (
      <div onKeyPress={event => this.handleKeyPress(event.key)}>
        <ul className="md-list">{tasks}</ul>
        <div className="md-form">
          <input className="md-input" type="text" placeholder="Input task here..." value={this.state.taskInput} onChange={this.handleTaskInputTextChange}  />
          <button className="md-button" disabled={this.state.isButtonDisabled} onClick={this.handleTaskAdding}>Add</button>
        </div>
      </div>
    );
  }
}
