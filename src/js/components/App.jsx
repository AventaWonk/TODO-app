import React from 'react';
import TaskList from '../containers/TaskList.jsx';
import TaskForm from '../containers/TaskForm.jsx';

export default class App extends React.Component{

  render() {
    return (
      <div>
        <TaskList />
        <TaskForm />
      </div>
    );
  }
}
