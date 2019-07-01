import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-toggle-button';

import './styles.less';

const TogglePoint = () => <div className="custom-toggle-point" />;

const SwitchToggle = ({
  checked,
  activeLabel = '',
  inactiveLabel = '',
  activeColor = '#147049',
  onToggleChange,
}) => (
  <Switch
    onToggle={onToggleChange}
    value={checked}
    colors={{
      active: activeColor,
      inactive: { base: '#EBEDED' },
    }}
    containerStyle={{
      width: '72px',
      height: '36px',
      alignItems: 'flex-start',
    }}
    trackStyle={{
      width: '72px',
      height: '36px',
      boxShadow: 'inset 0px 0px 5px 0px rgba(193,195,195,1)',
    }}
    thumbStyle={{
      height: '30px',
      width: '30px',
      marginLeft: '2px',
      boxShadow: '0px 0px 5px 0px rgba(193,195,195,1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    activeLabelStyle={{
      color: '#FFFFFF',
    }}
    inactiveLabelStyle={{
      color: '#FFFFFF',
    }}
    thumbIcon={<TogglePoint />}
    activeLabel={activeLabel}
    inactiveLabel={inactiveLabel}
  />
);

SwitchToggle.defaultProps = {
  activeLabel: '',
  inactiveLabel: '',
  activeColor: '#147049',
};

SwitchToggle.propTypes = {
  activeLabel: PropTypes.string,
  inactiveLabel: PropTypes.string,
  activeColor: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onToggleChange: PropTypes.func.isRequired,
};

export default SwitchToggle;
