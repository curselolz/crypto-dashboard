import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Row,
  Col,
  Container,
  Table,
} from 'reactstrap';
import './styles.less';
import Button from '../../components/button';
import { resetUser } from '../../actions/auth';
import { Context } from '../../utils/context';
import {
  makeSelectCurrentPlan,
  makeSelectTeamMembers,
  makeSelectResetPassword,
} from '../../selectors/settings';

const AccountSettings = ({
  resetUser, resetPassword, currentPlan, teamMembers,
}) => {
  const value = useContext(Context);
  return (
    <div className="account-settings">
      <Container>
        <Row>
          <Col md={8}>
            <div className="account-inner">
              <ul className="list-settings">
                <li>
                  <div>
                    <p className="account-caption">Account Settings</p>
                    <Button
                      uppercase
                      name="Reset password"
                      clickEvent={() => value('submitPassword')}
                    />
                    <Table borderless>
                      <thead>
                        <tr>
                          <th scope="row">Email</th>
                          <th scope="row">Account type</th>
                          <th scope="row">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{resetPassword.email}</td>
                          <td>{resetPassword.accType}</td>
                          <td>{resetPassword.status}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </li>
                <li>
                  <div>
                    <p className="account-caption">Current plan</p>
                    <Button
                      uppercase
                      name="pause subscription"
                      clickEvent={() => value('submitPlan')}
                    />
                    <Table borderless>
                      <thead>
                        <tr>
                          <th>Plan type</th>
                          <th>Expiration Date</th>
                          <th>Price</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{currentPlan.planType}</td>
                          <td>{currentPlan.expirationDate}</td>
                          <td>{currentPlan.price}</td>
                          <td>{currentPlan.status}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </li>
                <li>
                  <div>
                    <p className="account-caption">Team Members</p>
                    <Button
                      uppercase
                      name="Add a team member"
                      clickEvent={() => value('invite')}
                    />
                    <Table borderless>
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          teamMembers.map((el, index) => (
                            <tr key={index}>
                              <td>{el.firstName}</td>
                              <td>{el.lastName}</td>
                              <td>{el.email}</td>
                              <td>{el.status}</td>
                            </tr>
                          ))
                      }
                      </tbody>
                    </Table>
                  </div>
                </li>
              </ul>
              <button type="button" className="simple-button text-uppercase">
            remove access
              </button>
              <Button
                uppercase
                name="LogOut"
                className="btn-danger"
                clickEvent={() => value('logout')}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentPlan: makeSelectCurrentPlan(),
  teamMembers: makeSelectTeamMembers(),
  resetPassword: makeSelectResetPassword(),
});

const mapDispatchToProps = dispatch => ({
  resetUser: isLoggedOutUser => dispatch(resetUser(isLoggedOutUser)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountSettings);
