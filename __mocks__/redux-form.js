/* eslint-disable */
import React from 'react'

const reduxForm = {}

reduxForm.reduxForm = ({ onSubmit }) => WrappedComponent =>
  class TestComponent extends React.PureComponent {
    render () {
      return (
        <WrappedComponent {...this.props} handleSubmit={onSubmit} />
      )
    }
  }

reduxForm.Field = ({ name }) => <div className="redux-form-field-mock">{name}</div>

module.exports = reduxForm
