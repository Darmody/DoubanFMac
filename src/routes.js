import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { show as showModal } from 'redux-modal';
import { App, HomePage, Channel, Favorite, Daily } from 'containers';

export default (store) => {
  const requireAuth = () => {
    const { auth } = store.getState();
    if (auth.user.id === 0) {
      store.dispatch(showModal('signin'));
    }
  };

  return (
    <Route component={App}>
      <Route path="/" component={HomePage} >
        <IndexRoute component={Channel} />
        <Route path="channels/:id" component={Channel} />
        <Route path="favorite" component={Favorite} onEnter={requireAuth} />
        <Route path="daily" component={Daily} onEnter={requireAuth} />
      </Route>
    </Route>
  );
};
