import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button as BootstrapButton,
} from 'reactstrap';
import {
  pauseSubscription,
} from '../../../actions/settings';

const SubmitPause = ({ onClose, pauseSubscription }) => (
  <div>
    <p className="text-center">
        Are you sure you want to pause the current subscription?
    </p>
    <div className="modal-actions">
      <BootstrapButton color="success btn-rounded" onClick={() => { pauseSubscription(); onClose(); }}>
        Yes
      </BootstrapButton>
      <BootstrapButton color="danger btn-rounded" onClick={onClose}>
        No
      </BootstrapButton>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  pauseSubscription: () => dispatch(pauseSubscription()),
});

SubmitPause.propTypes = {
  onClose: PropTypes.func.isRequired,
  pauseSubscription: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(SubmitPause);
