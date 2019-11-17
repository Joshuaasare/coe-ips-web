/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-20 08:12:53
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-03 18:50:51
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '.';
import './css/CircularButton.css';

const CircularButton = (props) => {
  const {
 size, backgroundColor, iconName, iconType, shadowed, fixed 
} = props;

  function renderSize(size, fixed) {
    if (fixed) {
      return {
        width: `${size}px`,
        height: `${size}px`,
      };
    }
    return {
      width: `${size}rem`,
      height: `${size}rem`,
      borderRadius: `${size}rem`,
    };
  }
  return (
    <div
      style={{
        ...renderSize(size, fixed),
        backgroundColor,
        ...styles.buttonContainer,
        boxShadow: shadowed ? '1px 3px 5px rgba(0, 0, 0, 0.3)' : null,
      }}
      className="circular-button"
      onClick={props.onClick}
    >
      <Icon name={iconName} type={iconType} />
    </div>
  );
};

CircularButton.propTypes = {
  size: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
  shadowed: PropTypes.bool,
  onClick: PropTypes.func,
  fixed: PropTypes.bool,
};

CircularButton.defaultProps = {
  backgroundColor: '#fff',
  shadowed: true,
  onClick: () => {},
  fixed: false,
};

const styles = {
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
export default CircularButton;
