import React from 'react';
import {
  Button as BootstrapButton,
} from 'reactstrap';
import Button from '../../button';
import SuccessIcon from '../../icons/success-icon';
import './styles.less';

export const ModalTypeReset = ({ onClose }) => (
  <div className="d-flex justify-content-center flex-column align-items-center modal-padding">
    <SuccessIcon />
    <p className="text-center">We've just sent a password resent link to your email address.</p>
    <Button rounded name="Close" clickEvent={onClose} />
  </div>
);

export const ModalTypePaused = ({ onClose }) => (
  <div className="d-flex justify-content-center flex-column align-items-center modal-padding">
    <SuccessIcon />
    <p className="text-center">
      Your subscription was successfully paused. You'll have access until the subscription
      expiration and you can restart it at anytime.
    </p>
    <Button rounded name="Close" clickEvent={onClose} />
  </div>
);


export const ModalTypeInviteInside = ({ onClose }) => (
  <div className="team-members-invite d-flex justify-content-center align-items-center flex-column">
    <SuccessIcon />
    <p className="text-center">
      Your invitation has been sent! As soon as it's accepted, your team member will have access to
      all clients and be able to add new clients.
    </p>
    <Button rounded name="close" uppercase clickEvent={onClose} />
  </div>
);

export const ModalTypeSuccessInvite = ({ onClose }) => (
  <div>
    <p>
  Your invitation email has been sent! As soon as your client has clicked the confirmation
  link,you will have access to their account in your dashboard
    </p>
    <Button rounded name="close" uppercase clickEvent={onClose} />
  </div>
);

export const LogoutModal = ({ onLogout, onCancel }) => (
  <>
    <p>Are you sure you want to logout?</p>
    <div className="modal-actions">
      <BootstrapButton color="danger" onClick={onLogout}>
        Logout
      </BootstrapButton>
      <BootstrapButton color="secondary" onClick={onCancel}>
        Cancel
      </BootstrapButton>
    </div>
  </>
);
