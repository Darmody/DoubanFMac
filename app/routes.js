import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, HomePage, SignIn } from 'containers';


export default (
  <Route component={App}>
    <Route path="/" component={HomePage} >
      <Route path="/signin" component={SignIn} />
    </Route>
  </Route>
);
