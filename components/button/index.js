import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.less';

const Button = ({
  name, clickEvent, rounded, uppercase, shadow, className = '',
}) => {
  const arrayClass = classnames(className, {
    'custom-btn': true,
    'rounded-btn': rounded === true,
    uppercase,
    shadow,
  });
  return (
    <button type="button" className={arrayClass} onClick={clickEvent}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  clickEvent: PropTypes.func.isRequired,
  rounded: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  uppercase: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
};

Button.defaultProps = {
  rounded: false,
  uppercase: false,
  className: '',
};

export default Button;
