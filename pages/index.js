/**
 * App
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import QueryString from 'query-string';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles.less';

import MainContainer from './main-container';
import DashboardPage from './dashboard';
import Header from '../components/header';
import Plans from './plans';

import LoginPage from './login';
import Invite from './invite';
import AccountSettings from './account-settings';
import { makeSelectUserId } from '../selectors/user';
import { makeSelectIsLoggedOutUser } from '../selectors/global';

const AuthRedirectPage = () => {
  const { code } = QueryString.parse(window.location.search);

  if (code && window.opener) {
    const scriptTag = document.createElement('script');
    scriptTag.async = false;
    const inlineScript = document.createTextNode(
      `window.opener.onGrantReceived("${code}","cognito"); window.opener = null;`,
    );
    scriptTag.appendChild(inlineScript);
    document.body.appendChild(scriptTag);
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: window.location.pathname,
    };
  }

  _changeCurrentUrl = (currentUrl) => {
    this.setState({
      currentUrl,
    });
  };

  _tryRenderPage = (ComponentToRender) => {
    let redirectUrl = '';
    const { userId, isLoggedOutUser } = this.props;

    if (window.location.pathname !== '/') {
      redirectUrl = `?redirectUrl=${window.location.href}`;
    }

    if (!userId && !isLoggedOutUser) {
      return <Redirect to={`/login${redirectUrl}`} />;
    }
    return <ComponentToRender />;
  };


  render() {
    const { currentUrl } = this.state;
    return (
      <Router>
        <Switch>
          <Route exact path="/login" render={() => <LoginPage />} />
          <Route path="/oauth/cognito/authgrant_redirect" render={() => <AuthRedirectPage />} />
          <MainContainer>
            <Header currentUrl={currentUrl} changeUrl={this._changeCurrentUrl} />
            <Route
              exact
              path="/"
              changeUrl={this._changeCurrentUrl}
              render={() => this._tryRenderPage(DashboardPage)}
            />
            <Route
              exact
              path="/plans"
              changeUrl={this._changeCurrentUrl}
              render={() => this._tryRenderPage(Plans)}
            />
            <Route
              exact
              path="/invite"
              changeUrl={this._changeCurrentUrl}
              component={() => this._tryRenderPage(Invite)}
            />
            <Route
              exact
              path="/account"
              changeUrl={this._changeCurrentUrl}
              component={() => this._tryRenderPage(AccountSettings)}
            />
          </MainContainer>
        </Switch>
      </Router>
    );
  }
}

App.defaultProps = {
  userId: null,
  isLoggedOutUser: false,
};

App.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isLoggedOutUser: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
  isLoggedOutUser: makeSelectIsLoggedOutUser(),
});

export default connect(mapStateToProps)(App);
