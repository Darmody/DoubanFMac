import React from 'react';

export default ({ loaded, children }) => (
  <div>
    {!loaded && (
      <div className={require('./styles.scss').spinner} >
        <img src={require('./spinner.gif')} />
        <div>loading...</div>
      </div>
    )}
    {loaded && children}
  </div>
);
