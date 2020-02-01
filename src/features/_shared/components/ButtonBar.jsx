/*
 * @Author: joshuaasare
 * @Date: 2019-10-08 12:34:31
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-27 13:31:36
 */
import React from 'react';
import PropTypes from 'prop-types';
import './css/buttonBar.css';

const ButtonBar = props => {
  return (
    <div className="button-bar">
      <div className="button-bar__left-buttons">{props.leftButtons}</div>

      <div className="button-bar__right-buttons">{props.rightButtons}</div>
    </div>
  );
};

ButtonBar.propTypes = {
  leftButtons: PropTypes.element,
  rightButtons: PropTypes.element
};

ButtonBar.defaultProps = {
  leftButtons: null,
  rightButtons: null
};

export { ButtonBar };
