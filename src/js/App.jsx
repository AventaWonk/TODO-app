import React from 'react';
import {TaskList} from './components/TaskList.jsx';
import {TaskForm} from './components/TaskForm.jsx';
import {_getTasks, _addTask, _setDoneTask, _deleteTask} from './actions/Actions.js'
import TaskShell from './lib/TaskShell'

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    }
    this.addTask = this.addTask.bind(this);
    this.setTaskAsDone = this.setTaskAsDone.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onFailed = this.onFailed.bind(this);
  }

  componentDidMount() {
    let onResponseGot = (tasks) => {
      this.setState({
        tasks: tasks,
      });
    }
    _getTasks(onResponseGot);
  }

  addTask(text) {
    let onTaskLoaded = (id) => {
      let newTasksState = this.state.tasks.slice();
      let i = TaskShell.getLoadingTask(id, newTasksState);
      newTasksState[i].id = id;
      delete newTasksState[i].isLoading;
      this.setState({
        tasks: newTasksState,
      });
    }

    _addTask(text, onTaskLoaded, this.onFailed);

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

  setTaskAsDone(id) {
    _setDoneTask(id);

    let newTasksState = this.state.tasks.slice();
    let i = TaskShell.getTaskIndexById(id, newTasksState);
    newTasksState[i].isDone = true;
    this.setState({
      tasks: newTasksState,
    });
  }

  deleteTask(id) {
    _deleteTask(id);

    let newTasksState = this.state.tasks.slice();
    let i = TaskShell.getTaskIndexById(id, newTasksState);
    newTasksState.splice(i, 1);
    this.setState({
      tasks: newTasksState,
    });
  }

  onFailed() {
    let newTasksState = TaskShell.deleteFailedTask(this.state.tasks);
    this.setState({
      tasks: newTasksState,
    });
  }

  render() {
    return (
      <div>
        <TaskList tasks={this.state.tasks}
          deleteTask={this.deleteTask}
          setTaskAsDone={this.setTaskAsDone}
        />
        <TaskForm addTask={this.addTask}/>
      </div>
    );
  }
}
