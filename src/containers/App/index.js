// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import { Header } from 'containers'
import { Body, Footer } from 'components'
import { current as fetchMe } from 'actions/users'
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

type Props = {
  fetchMe: Function,
}

class AppContainer extends PureComponent {
  static defaultProps = {
    userId: 0,
  }

  componentDidMount() {
    this.props.fetchMe()
  }

  props: Props

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

export default connect(null, { fetchMe })(AppContainer)
