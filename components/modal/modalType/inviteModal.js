import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
} from 'reactstrap';
import Button from '../../button';
import { addTeamMember } from '../../../actions/settings';

class ModalTypeInvite extends React.Component {
  constructor(props) {
    super(props);
    this.inputName = React.createRef();
    this.inputLastName = React.createRef();
    this.inputEmail = React.createRef();
    this.state = {
      status: 'active',
    };
  }

  _collectData = () => {
    const { addTeamMember, onClose, onSendInvite } = this.props;
    const { inputName, inputLastName, inputEmail } = this;
    const firstName = inputName.current.value;
    const lastName = inputLastName.current.value;
    const email = inputEmail.current.value;
    const { status } = this.state;
    addTeamMember({
      firstName, lastName, email, status,
    });
    onClose();
    onSendInvite();
  }


  _handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { onClose, addTeamMember } = this.props;
    return (
      <div className="invite-team-members">
        <Container>
          <Row className="justify-content-center invite-inner-row">
            <Col md={12} className="d-flex justify-content-center align-items-center flex-column">
              <p className="text-center invite-caption">Invite Team Members</p>
              <button type="button" aria-label="Close" onClick={onClose} className="close-icon">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="bottom-line" />
            </Col>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  placeholder="First name..."
                  className="input-invite-bg"
                  innerRef={this.inputName}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last name..."
                  className="input-invite-bg"
                  innerRef={this.inputLastName}
                />
              </FormGroup>
            </Col>
            <Col md={12} className="mb-3">
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  className="input-invite-bg"
                  innerRef={this.inputEmail}
                />
              </FormGroup>
            </Col>
            <Button
              name="send invitation"
              uppercase
              rounded
              clickEvent={this._collectData}
              shadow
            />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addTeamMember: data => dispatch(addTeamMember(data)),
});

ModalTypeInvite.propTypes = {
  onClose: PropTypes.func.isRequired,
  addTeamMember: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(ModalTypeInvite);
