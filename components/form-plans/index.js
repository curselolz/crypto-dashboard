import React, { useState } from 'react';
import {
  Row, Col, Form, FormGroup, Input,
} from 'reactstrap';

import Button from '../button';
import './style.less';
import DropDown from '../dropdown/index';

const FormPlan = () => {
  const [valueDropDown, setDropDownValue] = useState('123');
  const arr = [
    '123',
    '456',
    '789',
  ];
  return (
    <div className="form-plan">
      <Form className="form">
        <p className="caption">Enterprise Solutions</p>
        <p className="form-caption-text">Need Something More Custom? Contact us</p>
        <div className="hr-line" />
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input type="email" className="form-plan-input" name="email" placeholder="Your Name..." />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input type="password" className="form-plan-input" name="password" placeholder="Last Name..." />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input type="email" className="form-plan-input" name="email" placeholder="Email..." />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <DropDown
                value={valueDropDown}
                items={arr}
                onClick={value => setDropDownValue(value)}
              />
              {/* <Input type="password" name="password" placeholder="Number of client accounts..." /> */}
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Input type="textarea" name="text" className="textarea form-plan-input" id="exampleText" placeholder="Your message..." />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button name="Contact us" clickEvent={() => console.log('contact')} />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormPlan;
