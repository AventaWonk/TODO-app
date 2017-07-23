import React from 'react';
import ReactDOM from 'react-dom';

export class Task extends React.Component{

  render() {
    return(
      <div className="task">
        <span>{this.props.text}</span>
      </div>
    );
  }
}
