import React, { Component, PropTypes } from 'react';

export default class Spinner extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    children: PropTypes.any
  }

  render() {
    const { loaded, children } = this.props;
    return (
      <div>
        {!loaded && (
          <div className={require('./Spinner.scss').spinner} >
            <img src={require('./spinner.gif')} />
            <div>loading...</div>
          </div>
        )}
        {loaded && children}
      </div>
    );
  }
}
