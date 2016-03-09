import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, HomePage } from 'containers';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
  </Route>
);
