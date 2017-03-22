import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { App, Lyrics } from 'components'

export default ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route excat path="/app" component={App} />
        <Route excat path="/lyrics" component={Lyrics} />
      </div>
    </Router>
  </Provider>
)
