// @flow
import { Observable as Rx$ } from 'rxjs'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import { Body, Footer, Header } from 'components'
import { current as fetchMe } from 'actions/users'
import { auth } from 'actions/auth'
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
  auth: Function,
  fetchMe: Function,
}

class AppComponent extends PureComponent {
  static defaultProps = {
    userId: 0,
  }

  componentDidMount() {
    this.props.fetchMe()
    this.authSubscribtion = Rx$
      .interval(1000 * 60 * 4)
      .subscribe(() => this.props.auth())
  }

  componentWillUnmount() {
    if (this.authSubscribtion) {
      this.authSubscribtion.unsubscribe()
    }
  }

  authSubscribtion = undefined
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

export default connect(null, { fetchMe, auth })(AppComponent)
