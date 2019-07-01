import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { Elements } from 'react-stripe-elements';
import Switch from '../../components/switch-toggle';
import CardPlan from '../../components/card';
import FormPlan from '../../components/form-plans';
import CheckoutForm from '../../components/stripe-form';

import { PLANS } from '../../constants/fixtures';

import './styles.less';

class Plans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      isModalOpen: false,
    };
  }

  _onToggle = () => {
    this.setState(state => ({
      toggle: !state.toggle,
    }));
  };

  _toggleModal = () => {
    this.setState(state => ({
      isModalOpen: !state.isModalOpen,
    }));
  };

  render() {
    const { toggle, isModalOpen } = this.state;
    return (
      <div className="plans">
        <div className="plans-inner">
          <div className="caption">
            <h1 className="text-uppercase font-caption">choose your taxtoken accountant plan</h1>
            <p className="font-side-caption">Pay you go or save with a plan</p>
          </div>
          <div className="choose-wrapper">
            <p className="pay">Pay As You go</p>
            <Switch
              checked={toggle}
              activeColor="#2A3C59"
              inactiveColor="#63666A"
              onToggleChange={this._onToggle}
            />
            <div className="discount">
              <p>Plans for Firms</p>
              <span>Save 20%</span>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          {toggle ? (
            PLANS.map((plan, index) => (
              <CardPlan key={index} {...plan} buttonLabel="Upgrade now" onButtonClick={this._toggleModal} />
            ))
          ) : (
            <CardPlan
              title="Pay As You Go"
              subTitle="For each client account per year. Your first client is free!"
              Price={() => (
                <p className="price-text">
                  <span className="price-color">$40</span>
                </p>
              )}
              benefits={[
                'Manage & Access Up to 25 Client Accounts from a single dashboard',
                'Track clients&#39; capital gains & losses from all exchanges and gain insights into their individual performance.',
                'Download auto-filled tax forms for all clients.',
              ]}
              buttonLabel="Current Plan"
              onButtonClick={this._toggleModal}
            />
          )}
        </div>
        <FormPlan />

        <Modal isOpen={isModalOpen} toggle={this._toggleModal}>
          <Elements>
            <CheckoutForm />
          </Elements>
        </Modal>
      </div>
    );
  }
}

export default Plans;
