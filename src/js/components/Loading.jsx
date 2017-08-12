import React from 'react';

export default class Loading extends React.Component {
  render() {
    let style = `loading-indicator-${this.props.size}`;
    return (
      <div className={style}></div>
    );
  }
}
