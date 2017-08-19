import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index';

class EditRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInputText: props.task.text,
    }
    this.handleTaskInputTextChanging = this.handleTaskInputTextChanging.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCancelEditeClick = this.handleCancelEditeClick.bind(this);
    this.handleConfirmEditeClick = this.handleConfirmEditeClick.bind(this);
  }

  handleConfirmEditeClick() {
    this.props.confirmEdit(this.props.task.id, this.state.taskInputText);
  }

  handleCancelEditeClick() {
    this.props.cancelEdit(this.props.task.id);
  }

  handleTaskInputTextChanging(input) {
    this.setState({
      taskInputText: input.target.value,
    });
  }

  handleKeyPress(key) {
    if (key == 'Enter') {
      this.handleConfirmEditeClick();
    }
  }

  render() {
    return (
      <li className="item">
        <input className="md-input" type="text" value={this.state.taskInputText} onChange={this.handleTaskInputTextChanging} onKeyPress={event => this.handleKeyPress(event.key)}/>
        <span className="control-buttons pull-right">
          <span className="md-glyphicon" onClick={this.handleCancelEditeClick}>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
            </svg>
          </span>
          <span className="md-glyphicon" onClick={this.handleConfirmEditeClick}>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
          </span>
        </span>
      </li>
    );
  }
}

EditRow.propTypes = {
  task: PropTypes.object,
  confirmEdit: PropTypes.func,
  cancelEdit: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  return {
    ownProps
  };
}

function mapDispatchToProps(dispatch) {
  return {
    confirmEdit: bindActionCreators(actions.changeTaskText, dispatch),
    cancelEdit: bindActionCreators(actions.editTaskCancel, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRow);
