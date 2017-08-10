import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TaskRow from './TaskRow.jsx'
import {fetchTasks} from '../actions/index'

class TaskList extends React.Component{

  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    let tasks = this.props.tasks.map((task, i) =>
      <TaskRow task={task} key={i}/>
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
}

function mapStateToProps(state) {
  return {
    tasks: state.task
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTasks: bindActionCreators(fetchTasks, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
