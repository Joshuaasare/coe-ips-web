import React from 'react';
import PropTypes from 'prop-types';
import './css/legendDivider.css';
import { Ikon } from '.';

export const LegendDivider = props => (
  <div className={`legend-divider ${props.className}`}>
    <span
      style={{ backgroundColor: props.backgroundColor }}
      className={`legend-divider-content ${props.contentClassName}`}
    >
      {props.icon && (
        <Ikon
          name={props.icon}
          color={props.color}
          size={1.2}
          style={{ marginRight: '15px' }}
        />
      )}
      <span className={`legend-divider-text ${props.textClassName}`}>
        {props.title}
      </span>
    </span>
  </div>
);

LegendDivider.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  backgroundColor: PropTypes.string
};
LegendDivider.defaultProps = {
  icon: null,
  color: 'teal',
  className: '',
  textClassName: '',
  contentClassName: '',
  backgroundColor: 'transparent'
};
