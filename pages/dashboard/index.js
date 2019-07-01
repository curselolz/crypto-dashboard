/* global TAXTOKENWEB_URL */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Table,
  Button,
} from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getUserClients as getUserClientsAction,
  resendInvite as resendInviteAction,
  removeClient,
} from '../../actions/clients';
import { makeSelectClients } from '../../selectors/client';
import { showErrorMessage } from '../../utils/notification-manager';
import { makeSelectIsLoading } from '../../selectors/global';
import { Context } from '../../utils/context';
import './styles.less';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0,
    };
  }

  componentDidMount() {
    this._refreshUserClients();
  }

  _selectClient = (activeKey) => {
    this.setState(state => ({
      activeKey: state.activeKey === activeKey ? null : activeKey,
    }));
  };

  _refreshUserClients = (e) => {
    if (e) {
      e.preventDefault();
    }

    const { getUserClients } = this.props;
    getUserClients();
  };

  _renderRow = ({
    email, firstName, lastName, active,
  }) => {
    const { activeKey } = this.state;
    const { resendInvite } = this.props;
    return (
      <tr
        key={email}
        onClick={() => this._selectClient(email, firstName)}
        className={activeKey === email ? 'active' : 'non-active'}
      >
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{active ? 'Active' : 'Pending'}</td>
        <td className="d-flex justify-content-center">
          <Button
            className="action-button mr-3"
            onClick={(e) => {
              e.stopPropagation();
              resendInvite(email);
            }}
          >
            <FontAwesomeIcon icon="redo" />
          </Button>
          <Button
            className="action-button"
            onClick={() => this.context('remove', { firstName, email })}
          >
            <FontAwesomeIcon icon="trash" />
          </Button>
        </td>
      </tr>
    );
  };

  _tryAccessTheAccount = () => {
    const { activeKey } = this.state;
    const { clients } = this.props;

    if (!activeKey) {
      showErrorMessage('Please select the client account!');
      return;
    }

    const foundClient = clients.find(client => client.email === activeKey);

    if (!foundClient || !foundClient.customerId) {
      showErrorMessage("You don't have an access to this account yet!");
      return;
    }

    window.open(`${TAXTOKENWEB_URL}/?customerId=${foundClient.customerId}`, '_blank');
  };

  render() {
    const { clients, isLoading } = this.props;
    return (
      <div className="dashboard">
        <div>
          <Row className="page-header">
            <Col sm="6">
              <p className="ml-2 clients-caption">Clients</p>
            </Col>
            <Col className="text-right d-flex justify-content-end" sm="6">
              <button
                type="button"
                disabled={isLoading}
                className="custom-btn d-block rounded-btn uppercase small-btn"
                onClick={this._refreshUserClients}
              >
                {
                  isLoading
                    ? <FontAwesomeIcon icon="sync" /> : null
                }
                Refresh
              </button>
              <Link to="/invite" className="custom-btn d-block rounded-btn uppercase small-btn">
                <p>Add a client</p>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Table borderless>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                    clients && clients.length > 0 ? (
                      clients.map(this._renderRow)
                    ) : (
                      <tr>
                        <td className="no-data-row" colSpan="4">
                        No data
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
          <button
            type="button"
            onClick={this._tryAccessTheAccount}
            className="simple-button text-uppercase"
          >
            access account
          </button>
          <ToastContainer className="notification" />
        </div>
      </div>
    );
  }
}

Dashboard.contextType = Context;

Dashboard.defaultProps = {
  clients: [],
  isLoading: false,
};

Dashboard.propTypes = {
  getUserClients: PropTypes.func.isRequired,
  clients: PropTypes.array,
  isLoading: PropTypes.bool,
  resendInvite: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  clients: makeSelectClients(),
  isLoading: makeSelectIsLoading(),
});

const mapDispatchToProps = dispatch => ({
  getUserClients: () => dispatch(getUserClientsAction()),
  resendInvite: email => dispatch(resendInviteAction(email)),
  removeClient: email => dispatch(removeClient(email)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
