import React from 'react';
import PropTypes from 'prop-types';
import {
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.less';

const CustomDropdown = ({
  value, items = [], onClick, transformFunction,
}) => (
  <UncontrolledDropdown>
    <DropdownToggle className="custom-dropdown">
      <input type="text" value={typeof transformFunction === 'function' ? transformFunction(value) : value} disabled />
      <div className="arrows">
        <FontAwesomeIcon icon="caret-up" />
        <FontAwesomeIcon icon="caret-down" />
      </div>
    </DropdownToggle>
    <DropdownMenu>
      {
        items.map(item => (
          <DropdownItem key={item.toString().replace(' ', '')} onClick={() => onClick(item)}>
            {item}
          </DropdownItem>
        ))
      }
    </DropdownMenu>
  </UncontrolledDropdown>
);

CustomDropdown.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  items: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  transformFunction: PropTypes.func,
};

export default CustomDropdown;
