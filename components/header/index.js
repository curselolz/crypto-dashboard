import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from './header';
import {
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectUserId,
  makeSelectEmail,
} from '../../selectors/user';
import { resetUser } from '../../actions/auth';
import { makeSelectIsLoggedOutUser } from '../../selectors/global';

const mapStateToProps = createStructuredSelector({
  firstName: makeSelectFirstName(),
  lastName: makeSelectLastName(),
  email: makeSelectEmail(),
  userId: makeSelectUserId(),
  isLoggedOutUser: makeSelectIsLoggedOutUser(),
});

const mapDispatchToProps = dispatch => ({
  resetUser: isLoggedOutUser => dispatch(resetUser(isLoggedOutUser)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
