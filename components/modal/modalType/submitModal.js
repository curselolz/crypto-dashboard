import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button as BootstrapButton,
} from 'reactstrap';
import {
  removeClient,
} from '../../../actions/clients';

const SubmitRemove = ({
  onClose, firstName, removeClient, email,
}) => (
  <div className="wrap">
    <div className="wrap-inside">
      <p>
          Are you sure you want to remove the
        {' '}
        {firstName}
        {' '}
          account from the accounts you manage?
      </p>
      <div className="modal-actions">
        <BootstrapButton
          color="success"
          onClick={() => {
            removeClient(email);
            onClose();
          }}
        >
              Yes
        </BootstrapButton>
        <BootstrapButton color="danger" onClick={onClose}>
              No
        </BootstrapButton>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  removeClient: email => dispatch(removeClient(email)),
});

SubmitRemove.propTypes = {
  onClose: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  removeClient: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(SubmitRemove);
