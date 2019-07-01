import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FormGroup, Label, Input,
} from 'reactstrap';
import {
  injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement,
} from 'react-stripe-elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomCheckbox from '../custom-checkbox';
import { showErrorMessage } from '../../utils/notification-manager';
import './styles.less';


class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = {
      promoCode: '',
      nameOnCard: '',
      isTermsChecked: false,
      modal: false,
      modal2: false,
    };
  }

    _toggleTerms = () => {
      this.setState(state => ({
        ...state,
        isTermsChecked: !state.isTermsChecked,
      }));
    };

    _onInputChange = (e) => {
      const { value, name } = e.target;

      this.setState(state => ({
        ...state,
        [name]: value,
      }));
    };

    _proceedPayment = () => {
      this.toggle();
      if (!this.state.nameOnCard) {
        showErrorMessage('Please enter a name on card');
      }
    };

    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal,
      }));
    }

    render() {
      const {
        promoCode,
        nameOnCard,
        isTermsChecked,
      } = this.state;

      return (
        <div className="stripe-form">
          <h3>Payment Details</h3>
          <span className="amount">$99.99</span>
          <FormGroup className="bordered">
            <Label for="promoCode">Enter your coupon or promo code here</Label>
            <Input
              value={promoCode}
              onChange={this._onInputChange}
              placeholder="Promo Code"
              name="promoCode"
            />
          </FormGroup>
          <FormGroup>
            <Label for="nameOnCard">Name on card</Label>
            <Input
              placeholder="Name on card"
              value={nameOnCard}
              onChange={this._onInputChange}
              name="nameOnCard"
            />
          </FormGroup>
          <FormGroup>
            <Label for="creditCardNumber">Credit card number</Label>
            <CardNumberElement className="form-control" />
          </FormGroup>
          <div className="cvv-details">
            <FormGroup>
              <Label for="cvvCode">CVC Code</Label>
              <CardCVCElement className="form-control" />
              <FontAwesomeIcon icon="credit-card" />
            </FormGroup>
            <FormGroup>
              <Label for="expirationDate">Expiration date</Label>
              <CardExpiryElement className="form-control" />
            </FormGroup>
          </div>
          <div className="terms-container">
            <CustomCheckbox checked={isTermsChecked} onChange={this._toggleTerms} />
            <span>
                By checking this box, you agree to
              {' '}
              <p>our terms of service.</p>
            </span>
          </div>
          <Button disabled={!isTermsChecked} color="success" onClick={() => {}}>Order Now</Button>
        </div>
      );
    }
}

CheckoutForm.propTypes = {
  proceedStripePayment: PropTypes.func,
};


export default injectStripe(CheckoutForm);
