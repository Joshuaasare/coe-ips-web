/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-20 08:12:53
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-03 18:50:51
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Ikon } from '.';
import './css/CircularButton.css';

const CircularButton = props => {
  const {
    size,
    backgroundColor,
    iconName,
    shadowed,
    fixed,
    children,
    iconClassName,
    border,
    iconSize,
    iconColor
  } = props;

  function renderSize(size, fixed) {
    if (fixed) {
      return {
        width: `${size}px`,
        height: `${size}px`
      };
    }
    return {
      width: `${size}rem`,
      height: `${size}rem`,
      borderRadius: `${size}rem`
    };
  }
  return (
    <div
      style={{
        ...renderSize(size, fixed),
        backgroundColor,
        ...styles.buttonContainer,
        boxShadow: shadowed ? '1px 3px 5px rgba(0, 0, 0, 0.3)' : null,
        border: border || null
      }}
      className="circular-button"
      onClick={props.onClick}
    >
      <Ikon
        name={iconName}
        className={iconClassName}
        size={iconSize}
        color={iconColor}
      />
      {children}
    </div>
  );
};

CircularButton.propTypes = {
  size: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  shadowed: PropTypes.bool,
  onClick: PropTypes.func,
  fixed: PropTypes.bool,
  children: PropTypes.element,
  border: PropTypes.string,
  iconSize: PropTypes.number.isRequired,
  iconColor: PropTypes.string,
  iconClassName: PropTypes.string
};

CircularButton.defaultProps = {
  backgroundColor: '#fff',
  shadowed: false,
  onClick: () => {},
  fixed: false,
  children: null,
  border: '',
  iconColor: '#000',
  iconClassName: ''
};

const styles = {
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
export default CircularButton;
