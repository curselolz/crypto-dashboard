import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Button from '../../components/button';
import { addDataInviteUser as addDataInviteUserAction } from '../../actions/clients';
import { showErrorMessage } from '../../utils/notification-manager';
import { Context } from '../../utils/context';
import { makeSelectClients } from '../../selectors/client';
import 'react-toastify/dist/ReactToastify.css';
import './styles.less';

class Invite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { clients } = this.props;

    // TODO: improve this. Client array has changed means the invite has been successfully sent
    if (!_isEqual(nextProps.clients, clients)) {
      this.setState({
        name: '',
        lastName: '',
        email: '',
      });
      this.context('InviteInside');
    }
  }

  _collectData = () => {
    const { name, lastName, email } = this.state;
    const { addDataInviteUser } = this.props;
    const arr = [name, lastName, email];

    if (arr.includes('')) {
      showErrorMessage('Data is empty. Please check your input!');
      return;
    }

    addDataInviteUser({
      name,
      lastName,
      email,
    });
  };

  _handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      name, lastName, email,
    } = this.state;
    return (
      <div className="invite">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md={7}>
              <Row className="page-header">
                <Col className="text-center" md={6}>
                  <h1 className="custom-text text-left caption">Invite Your Client</h1>
                </Col>
                <Col className="text-right" md={6}>
                  <Link to="/">
                    <p className="text-underline go-back">Go Back</p>
                  </Link>
                </Col>
              </Row>
              <Row className="justify-content-start">
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleState">First name</Label>
                    <Input
                      onChange={this._handleChange}
                      className="input-bg"
                      type="text"
                      name="name"
                      value={name}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleZip">Last Name</Label>
                    <Input
                      onChange={this._handleChange}
                      className="input-bg"
                      type="text"
                      name="lastName"
                      value={lastName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      onChange={this._handleChange}
                      className="input-bg"
                      type="email"
                      name="email"
                      value={email}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button type="submit" name="Send invite" uppercase clickEvent={this._collectData} />
              <p className="invite-description">
                Your client will be sent an email to confirm that you can access their account. If
                they have not registered yet,they will prompted to create a TaxToken account. Once
                you are approved, you will be able to access their Capital Asset Manager from your
                dashboard. To remove their account,please go to your client managment dashboard.
              </p>
            </Col>
          </Row>
        </Container>
        <ToastContainer className="notification" />
      </div>
    );
  }
}

Invite.contextType = Context;

Invite.defaultProps = {
  clients: [],
};

Invite.propTypes = {
  addDataInviteUser: PropTypes.func.isRequired,
  clients: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectClients(),
});

const mapDispatchToProps = dispatch => ({
  addDataInviteUser: ({ name, lastName, email }) => dispatch(
    addDataInviteUserAction({
      name,
      lastName,
      email,
    }),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Invite);
