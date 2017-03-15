import React, { PureComponent } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import 'normalize.css'
import './app.css'

const theme = {
}

const App = styled.div`
`

export default class AppContainer extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <App>
          app
        </App>
      </ThemeProvider>
    )
  }
}
