import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Container,
  FormGroup,
  Input,
  Button as BootstrapButton,
} from 'reactstrap';
import {
  resetUserPassword,
} from '../../../actions/auth';

const SubmitReset = ({ onClose, resetUserPassword }) => (
  <>
    <p>
        Are you sure you want to reset current password?
    </p>
    <div className="modal-actions">
      <BootstrapButton color="success" onClick={() => { resetUserPassword(); onClose(); }}>
        Yes
      </BootstrapButton>
      <BootstrapButton color="danger" onClick={onClose}>
        No
      </BootstrapButton>
    </div>
  </>
);

const mapDispatchToProps = dispatch => ({
  resetUserPassword: email => dispatch(resetUserPassword(email)),
});

SubmitReset.propTypes = {
  onClose: PropTypes.func.isRequired,
  resetUserPassword: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(SubmitReset);
