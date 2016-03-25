import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, HomePage, Channel, Favorite } from 'containers';


export default (
  <Route component={App}>
    <Route path="/" component={HomePage} >
      <IndexRoute component={Channel} />
      <Route path="channels/:id" component={Channel} />
      <Route path="favorite" component={Favorite} />
    </Route>
  </Route>
);
