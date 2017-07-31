import React from 'react';
import PropTypes from 'prop-types';
import {TaskRow} from './TaskRow.jsx'

export class TaskList extends React.Component{

  componentDidMount() {
    this.props.getTasks();
  };

  render() {
    let tasks = this.props.tasks.map((task, i) =>
      <TaskRow task={task} key={i}
        deleteTask={this.props.deleteTask}
        setTaskAsDone={this.props.setTaskAsDone}
      />
    );

    return (
      <ul className="md-list">
        {tasks}
      </ul>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  getTasks: PropTypes.func,
  deleteTask: PropTypes.func,
  setTaskAsDone: PropTypes.func,
}
