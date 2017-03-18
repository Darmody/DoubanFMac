import React, { PureComponent } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Body, Header, Footer } from 'components'
import 'normalize.css'
import './app.css'

const theme = {
}

const App = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export default class AppContainer extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <App>
          <Header />
          <Body />
          <Footer />
        </App>
      </ThemeProvider>
    )
  }
}
