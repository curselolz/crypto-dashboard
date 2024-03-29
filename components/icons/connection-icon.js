import React from 'react';
import PropTypes from 'prop-types';

const ConnectionIcon = ({ wrapperClass = '' }) => (
  <svg x="0px" y="0px" viewBox="0 0 256 256" className={`menu-text-color ${wrapperClass}`}>
    <g>
      <path
        d="M248.34,211.82c-6.04-9.36-18.06-22.95-34.93-25.71v-7.24c5.07-3.93,13.5-13.05,13.5-23.68
                c0-14.22-10.34-25.75-23.09-25.75s-23.09,11.53-23.09,25.75c0,10.91,8.03,20.18,14.24,23.93v6.99
                c-17.61,2.76-29.63,16.36-35.67,25.71c-3.28,5.07-1.54,11.97,3.84,14.7c7.7,3.91,20.85,8.37,40.68,8.37s32.98-4.46,40.68-8.37
                C249.89,223.79,251.62,216.89,248.34,211.82z"
      />
      <polygon
        points="135.79,165.88 135.79,133.21 121.69,133.21 121.69,166.13 89.93,188.84 98.14,200.31 128.89,178.32
                157.57,199.41 165.93,188.04"
      />
      <path
        d="M98.1,211.82c-6.04-9.36-18.06-22.95-34.93-25.71v-7.24c5.07-3.93,13.5-13.05,13.5-23.68
                c0-14.22-10.34-25.75-23.09-25.75s-23.09,11.53-23.09,25.75c0,10.91,8.03,20.18,14.24,23.93v6.99
                c-17.61,2.76-29.63,16.36-35.67,25.71c-3.28,5.07-1.54,11.97,3.84,14.7c7.7,3.91,20.85,8.37,40.68,8.37s32.98-4.46,40.68-8.37
                C99.65,223.79,101.38,216.89,98.1,211.82z"
      />
      <path
        d="M172.69,104.85c-6.04-9.36-18.06-22.95-34.93-25.71V71.9c5.07-3.93,13.5-13.05,13.5-23.68
                c0-14.22-10.34-25.75-23.09-25.75S105.08,34,105.08,48.22c0,10.91,8.03,20.18,14.24,23.93v6.99C101.7,81.9,89.68,95.5,83.64,104.85
                c-3.28,5.07-1.54,11.97,3.84,14.7c7.7,3.91,20.85,8.37,40.68,8.37s32.98-4.46,40.68-8.37
                C174.24,116.82,175.97,109.92,172.69,104.85z"
      />
    </g>
  </svg>
);

ConnectionIcon.defaultProps = {
  wrapperClass: '',
};

ConnectionIcon.propTypes = {
  wrapperClass: PropTypes.string,
};

export default ConnectionIcon;
