import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

@reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, state => ({
  logged: state.auth.logged
}))
export default class Form extends Component {
  static propTypes = {
    error: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    logged: PropTypes.bool,
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.logged && nextProps.logged) {
      this.props.hideModal('signin');
    }
  }

  renderErrorMessage = () => {
    if (this.props.error) {
      return (
        <span className="errorMessage">
          {this.props.error}
        </span>
      );
    }

    return null;
  }

  render() {
    const {
      fields: { email, password, },
      handleSubmit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <h2 className="header"> 登录 </h2>
        <div className="field">
          <input type="text" placeholder="邮箱" {...email} />
        </div>
        <div className="field">
          <input type="password" placeholder="密码" {...password} />
        </div>
        <div className="toolbar">
          { this.renderErrorMessage() }
          <button type="submit" className="button">登&nbsp;录</button>
        </div>
      </form>
    );
  }
}
