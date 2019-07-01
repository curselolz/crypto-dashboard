/* global COGNITO_CLIENT_ID, COGNITO_AUTHORIZE_URL, COGNITO_LOGOUT_URL, REDIRECT_URL */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OauthSender } from 'react-oauth-flow';
import { Button } from 'reactstrap';
import { makeSelectUserId } from '../../selectors/user';
import { loginWithToken as loginWithTokenAction, setUser } from '../../actions/auth';

import './styles.less';

class LoginPage extends Component {
  componentDidMount() {
    const { loginWithToken, resetUser, userId } = this.props;

    resetUser();

    const onLogin = (grant, serviceType) => {
      loginWithToken(grant, serviceType);
      this.window.close();
    };

    window.onGrantReceived = window.onGrantReceived || onLogin;

    window.onGrantReceived = window.onGrantReceived.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      window.location.href = '/';
    }

    if (!nextProps.userId && this.props.userId !== nextProps.userId) {
      window.location.href = COGNITO_LOGOUT_URL.replace(
        '{ORIGIN}',
        `${window.location.origin}/login`,
      );
    }
  }

  componentWillUnmount() {
    window.onGrantReceived = null;
  }

  _openOAuthWindow = (url) => {
    const width = 400;
    const height = 550;

    const top = window.top.outerHeight / 2 + window.top.screenY - height / 2;
    const left = window.top.outerWidth / 2 + window.top.screenX - width / 2;

    this.window = window.open(
      url,
      'OAuth Login',
      `toolbar=no,
        location=no,
        status=no,
        menubar=no,
        scrollbars=yes,
        resizable=yes,
        top=${top},
        left=${left},
        width=${width},
        height=${height}`,
    );

    if (window.focus) {
      this.window.focus();
    }
  };

  render() {
    return (
      <div className="auth-page">
        <div>
          <img src="img/taxtoken.png" alt="TaxToken" />
          <span>CPA Management</span>
          <OauthSender
            authorizeUrl={COGNITO_AUTHORIZE_URL}
            clientId={COGNITO_CLIENT_ID}
            redirectUri={REDIRECT_URL.replace('{ORIGIN}', window.location.origin)}
            args={{
              response_type: 'code',
              scope: 'email openid',
            }}
            render={({ url }) => (
              <Button
                color="success"
                onClick={(e) => {
                  e.preventDefault();
                  this._openOAuthWindow(url);
                }}
              >
                Sign In
              </Button>
            )}
          />
        </div>
      </div>
    );
  }
}

LoginPage.defaultProps = {
  userId: null,
};

LoginPage.propTypes = {
  loginWithToken: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  resetUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
});

const mapDispatchToProps = dispatch => ({
  loginWithToken: (token, service) => dispatch(loginWithTokenAction(token, service)),
  resetUser: () => dispatch(setUser({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
