import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../button';

import './styles.less';

const CardPlan = ({
  title = '',
  subTitle = '',
  Price,
  benefits = [],
  buttonLabel = '',
  onButtonClick,
}) => (
  <div>
    <Card>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>
          <Price />
          <p className="text-center">{subTitle}</p>
        </CardSubtitle>
        <div>
          <ul className="ul-list-format">
            {benefits.map((benefit, index) => (
              <li key={index}>
                <FontAwesomeIcon icon="check-circle" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <Button name={buttonLabel} clickEvent={onButtonClick} />
      </CardBody>
    </Card>
  </div>
);

CardPlan.defaultProps = {
  title: '',
  subTitle: '',
  benefits: [],
  buttonLabel: '',
};

CardPlan.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  Price: PropTypes.any.isRequired,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  benefits: PropTypes.arrayOf(PropTypes.string),
};

export default CardPlan;
