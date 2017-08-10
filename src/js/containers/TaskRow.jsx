import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Task} from '../components/Task.jsx';
import {deleteTask, setTaskAsDone} from '../actions/index';

class TaskRow extends React.Component {

  handleTaskDelete(id) {
    this.props.deleteTask(id);
  }

  handleTaskSetAsDone(id) {
    this.props.setTaskAsDone(id);
  }

  render() {
    return (
      <li className="item">
        <Task text={this.props.task.text} isDone={this.props.task.isDone}/>
        <span className="control-buttons pull-right">
          {this.props.task.isLoading ? (
            <span className="glyphicon glyphicon-refresh md-glyphicon"></span>
          ) : (
            <span>
              <span className="glyphicon glyphicon-remove md-glyphicon" onClick={() => this.handleTaskDelete(this.props.task.id)}></span>
              {!this.props.task.isDone &&
                <span className="glyphicon glyphicon-ok md-glyphicon" onClick={() => this.handleTaskSetAsDone(this.props.task.id)}></span>
              }
              <span className="md-glyphicon">
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
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
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTask: bindActionCreators(deleteTask, dispatch),
    setTaskAsDone: bindActionCreators(setTaskAsDone, dispatch)
  };
}

export default connect(
  state => {return {state}},
  mapDispatchToProps
)(TaskRow);
