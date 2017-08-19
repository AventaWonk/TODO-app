import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Task} from '../components/Task.jsx';
import Loading from '../components/Loading.jsx';
import {deleteTask, setTaskAsDone, editTask} from '../actions/index';

class TaskRow extends React.Component {

  handleTaskDeleteClick(id) {
    this.props.deleteTask(id);
  }

  handleTaskSetAsDoneClick(id) {
    this.props.setTaskAsDone(id);
  }

  handleEditTaskClick(id) {
    this.props.editTaskText(id);
  }

  render() {
    return (
      <li className="item">
        <Task text={this.props.task.text} isDone={this.props.task.isDone}/>
        <span className="control-buttons pull-right">
          {this.props.task.isLoading ? (
            <Loading size="small"/>
          ) : (
            <span>
              {!this.props.task.isDone &&
                <span className="md-glyphicon" onClick={() => this.handleTaskSetAsDoneClick(this.props.task.id)}>
                  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                </span>
              }
              <span className="md-glyphicon" onClick={() => this.handleEditTaskClick(this.props.task.id)}>
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
              </span>
              <span className="md-glyphicon" onClick={() => this.handleTaskDeleteClick(this.props.task.id)}>
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
              </span>
            </span>
          )}
        </span>
      </li>
    );
  }
}

TaskRow.propTypes = {
  task: PropTypes.object,
  deleteTask: PropTypes.func,
  setTaskAsDone: PropTypes.func,
  changeTask: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  return {
    ownProps
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTask: bindActionCreators(deleteTask, dispatch),
    setTaskAsDone: bindActionCreators(setTaskAsDone, dispatch),
    editTaskText: bindActionCreators(editTask, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskRow);
