import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Task} from '../components/Task.jsx';
import Loading from '../components/Loading.jsx';
import {deleteTask, setTaskAsDone, editTaskText, changeTaskText} from '../actions/index';

class TaskRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInputText: props.task.text,
    }
    this.handleTaskInputTextChanging = this.handleTaskInputTextChanging.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleTaskDeleteClick(id) {
    this.props.deleteTask(id);
  }

  handleTaskSetAsDoneClick(id) {
    this.props.setTaskAsDone(id);
  }

  handleEditTaskClick(id) {
    this.props.editTaskText(id);
  }

  handleTaskInputTextChanging(input) {
    this.setState({
      taskInputText: input.target.value,
    });
  }

  handleKeyPress(key) {
    if (key == 'Enter') {
      this.props.changeTaskText(this.props.task.id, this.state.taskInputText);
    }
  }

  render() {
    let task = <Task text={this.props.task.text} isDone={this.props.task.isDone}/>;
    if (this.props.task.isChanging) {
      task = <input className="md-input" type="text" value={this.state.taskInputText} onChange={this.handleTaskInputTextChanging} onKeyPress={event => this.handleKeyPress(event.key)}/>;
    }

    return (
      <li className="item">
        {task}
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
              <span className="md-glyphicon" onClick={() => this.handleTaskDeleteClick(this.props.task.id)}>
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
              </span>
              <span className="md-glyphicon" onClick={() => this.handleEditTaskClick(this.props.task.id)}>
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
  changeTask: PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTask: bindActionCreators(deleteTask, dispatch),
    setTaskAsDone: bindActionCreators(setTaskAsDone, dispatch),
    editTaskText: bindActionCreators(editTaskText, dispatch),
    changeTaskText: bindActionCreators(changeTaskText, dispatch),
  };
}

export default connect(
  state => {return {state}},
  mapDispatchToProps
)(TaskRow);
