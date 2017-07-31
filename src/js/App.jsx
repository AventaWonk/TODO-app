import React from 'react';
import {TaskList} from './components/TaskList.jsx';
import {TaskForm} from './components/TaskForm.jsx';
import {_getTasks, _addTask, _setDoneTask, _deleteTask} from './actions/Actions.js'

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    }
    this.getTasks = this.getTasks.bind(this); 
    this.setTaskAsDone = this.setTaskAsDone.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleTaskAdded = this.handleTaskAdded.bind(this); //from callback
  }

  getTasks() {
    _getTasks.bind(this)();
  }

  addTask(text) {
    _addTask(text, this.handleTaskAdded);

    let newTasksState = this.state.tasks.slice();
    newTasksState.push({
      text: text,
      isDone: false,
      isLoading: true,
    });
    this.setState({
      tasks: newTasksState,
    });
  }

  handleTaskAdded(id) {
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

  setTaskAsDone(id) {
    _setDoneTask(id);

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

  deleteTask(id) {
    _deleteTask(id);

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

  render() {
    return (
      <div>
        <TaskList tasks={this.state.tasks} getTasks={this.getTasks}
          deleteTask={this.deleteTask}
          setTaskAsDone={this.setTaskAsDone}
        />
        <TaskForm addTask={text => this.addTask(text)}/>
      </div>
    );
  }
}
