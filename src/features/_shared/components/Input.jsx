/*
 * @Author: Joshua
 * @Date: 2019-09-09 16:13:23
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-11-19 09:35:09
 */

import React from 'react';
import PropTypes from 'prop-types';
import './css/Input.css';

const Input = props => {
  const { placeholder, value, className, onChange, type, required } = props;

  return (
    <div id="input">
      <input
        className={`input ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
      />
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  onChange: () => {},
  value: null,
  type: 'text',
  required: false,
  className: '',
};

export default Input;
