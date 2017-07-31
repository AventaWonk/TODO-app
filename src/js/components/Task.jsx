import React from 'react';
import PropTypes from 'prop-types';

export class Task extends React.Component{

  render() {
    return(
      <span className={this.props.isDone ? 'task done' : 'task'}>
        <span className="text">{this.props.text}</span>
      </span>
    );
  }
}

Task.propTypes = {
  text: PropTypes.string,
  isDone: PropTypes.bool
}
