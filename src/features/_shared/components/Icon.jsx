/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-20 09:18:55
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-03 18:52:52
 */
import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../assets/svg/symbol-defs.svg';
import './css/Icon.css';

const Icon = ({ name, type, active }) => (
  <svg
    className={
      active
        ? `icomoon-icon icomoon-icon-${type}-active`
        : `icomoon-icon icomoon-icon-${type}`
    }
  >
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

Icon.defaultProps = {
  active: false,
};

export { Icon };
