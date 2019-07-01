import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.less';

const CheckBox = ({ checked = true, onChange }) => (
  <button type="button" className="large-checkbox" onClick={onChange}>
    {
            checked ? <FontAwesomeIcon icon="check" /> : null
        }
  </button>
);

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckBox;
