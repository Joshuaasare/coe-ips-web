/*
 * @Author: Joshua
 * @Date: 2019-09-09 16:13:23
 * @Last Modified by: Joshua
 * @Last Modified time: 2019-09-10 01:37:06
 */

import React from 'react';
import PropTypes from 'prop-types';
import './css/Input.css';

const Input = (props) => {
  const {
 placeholder, value, onChange, type, required 
} = props;

  return (
    <div id="input">
      <input
        className="input"
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
};

Input.defaultProps = {
  onChange: () => {},
  value: null,
  type: 'text',
  required: false,
};

export default Input;
