import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, HomePage, Channel } from 'containers';


export default (
  <Route component={App}>
    <Route path="/" component={HomePage} >
      <IndexRoute component={Channel} />
    </Route>
  </Route>
);
