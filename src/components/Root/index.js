// @flow
import React from 'react'
import { Provider } from 'react-redux'
import type { Store as ReduxStore } from 'constants/types/Redux'
import { App } from 'components'

type RootPropTypes = {
  store: ReduxStore,
}

export default ({ store }: RootPropTypes) => (
  <Provider store={store}>
    <App />
  </Provider>
)
