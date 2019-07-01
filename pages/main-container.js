import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody,
} from 'reactstrap';
import {
  ModalTypeReset,
  ModalTypePaused,
  ModalTypeInviteInside,
  LogoutModal,
  ModalTypeSuccessInvite,
} from '../components/modal/modalType';
import SubmitRemove from '../components/modal/modalType/submitModal';
import SubmitPause from '../components/modal/modalType/pauseModal';
import ModalTypeInvite from '../components/modal/modalType/inviteModal';
import SubmitReset from '../components/modal/modalType/submitResetModal';
import { Context } from '../utils/context';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      option: null,
    };
  }

  _renderModalData = (modalType) => {
    const { option } = this.state;
    switch (modalType) {
      case 'reset':
        return <ModalTypeReset onClose={() => this._setModalType(null)} />;
      case 'pause':
        return <ModalTypePaused onClose={() => this._setModalType(null)} />;
      case 'invite':
        return (
          <ModalTypeInvite
            onClose={() => this._setModalType(null)}
            onSendInvite={() => this._setModalType('inviteInside')}
          />
        );
      case 'inviteInside':
        return <ModalTypeInviteInside onClose={() => this._setModalType(null)} />;
      case 'logout':
        return <LogoutModal onLogout={this._logout} onCancel={() => this._setModalType(null)} />;
      case 'remove':
        return (
          <SubmitRemove
            onClose={() => this._setModalType(null)}
            {...option}
          />
        );
      case 'successInvite':
        return <ModalTypeSuccessInvite onClose={() => this._setModalType(null)} />;
      case 'submitPassword':
        return (
          <SubmitReset
            onOpenNew={() => this._setModalType('reset')}
            onClose={() => this._setModalType(null)}
          />
        );
      case 'submitPlan':
        return (
          <SubmitPause
            onOpenNew={() => this._setModalType('pause')}
            onClose={() => this._setModalType(null)}
          />
        );
      default:
        return <div />;
    }
  };

  _setModalType = (modalType, option) => {
    this.setState({ modalType, option });
  }

  render() {
    const { children } = this.props;
    const { modalType } = this.state;
    return (
      <Context.Provider value={this._setModalType}>
        <div className="main-container">
          {children}
          <Modal
            isOpen={!!modalType}
            className="modal-dialog-centered"
            size={modalType === 'invite' ? 'md' : 'sm'}
            toggle={() => this._setModalType(null)}
          >
            <ModalBody>{this._renderModalData(modalType)}</ModalBody>
          </Modal>
        </div>
      </Context.Provider>
    );
  }
}

PropTypes.propTypes = {
  children: PropTypes.any,
};


export default MainContainer;
