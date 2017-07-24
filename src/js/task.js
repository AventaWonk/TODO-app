import React from 'react';
import ReactDOM from 'react-dom';

export class Task extends React.Component{

  render() {
    return(
      <span className="task">
        <span className="text">{this.props.text}</span>
      </span>
    );
  }
}
