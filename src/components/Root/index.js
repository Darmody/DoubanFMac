import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { App, Lyrics } from 'components'

export default () => (
  <Router>
    <div>
      <Route excat path="/app" component={App} />
      <Route excat path="/lyrics" component={Lyrics} />
    </div>
  </Router>
)
