/* global COGNITO_LOGOUT_URL */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.less';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { LogoIcon, CogIcon, ConnectionIcon } from '../icons';

class Header extends Component {
  componentWillReceiveProps(nextProps) {
    // congito logout redirect after the user successfully removed from store
    // with attempt to login redirecting
    const { isLoggedOutUser, userId } = this.props;

    if (
      nextProps.isLoggedOutUser === true
      && !nextProps.userId
      && (isLoggedOutUser !== nextProps.isLoggedOutUser || userId !== nextProps.userId)
    ) {
      window.location.href = COGNITO_LOGOUT_URL.replace(
        '{ORIGIN}',
        `${window.location.origin}/login`,
      );
    }
  }

  render() {
    const {
      currentUrl, changeUrl, firstName, lastName, email,
    } = this.props;

    return (
      <div className="header">
        <div className="logo-block">
          <Link to="/">
            <LogoIcon />
          </Link>
        </div>
        <div className="header-container">
          <div className="page-title">
            <ConnectionIcon />
            <span>CPA Client Management</span>
          </div>
          <div className="tabs-link">
            <Nav tabs>
              <NavItem>
                <Link
                  to="/"
                  className={classnames({
                    active: currentUrl === '/' || currentUrl === '/invite',
                  })}
                  onClick={() => changeUrl('/')}
                >
                  <p>Dashboard</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/plans"
                  className={classnames({
                    active: currentUrl === '/plans',
                  })}
                  onClick={() => changeUrl('/plans')}
                >
                  <p>Plans</p>
                </Link>
              </NavItem>
            </Nav>
          </div>
          <div className="user-container">
            <Link to="/account" onClick={() => changeUrl('/account')}>
              <div className="header-name">
                <CogIcon wrapperClass="header-text-color" />
                <span>
                  {firstName}
                  {' '}
                  {lastName}
                </span>
              </div>
              <div className="header-email">{email}</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  userId: null,
  isLoggedOutUser: false,
};

Header.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  changeUrl: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  isLoggedOutUser: PropTypes.bool,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Header;
