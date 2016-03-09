import React, { Component, PropTypes } from 'react';
import './App.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
