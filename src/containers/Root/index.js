// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import type { Store as ReduxStore } from 'constants/types/Redux'
import { App } from 'containers'
import { Lyrics } from 'components'

type RootPropTypes = {
  store: ReduxStore,
}

export default ({ store }: RootPropTypes) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route excat path="/app" component={App} />
        <Route excat path="/lyrics" component={Lyrics} />
      </div>
    </Router>
  </Provider>
)
