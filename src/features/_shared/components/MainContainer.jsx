import React from 'react';
import PropTypes from 'prop-types';
import './css/mainContainer.css';

export const MainContainer = props => (
  <div className={`main-container ${props.wrapperClass}`}>
    {props.toolbar || null}
    <div className="main-child" style={props.style}>
      {props.children}
    </div>
    {props.footer || null}
  </div>
);

MainContainer.propTypes = {
  toolbar: PropTypes.element,
  footer: PropTypes.element,
  wrapperClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  centerContent: PropTypes.bool
};

MainContainer.defaultProps = {
  toolbar: null,
  footer: null,
  centerContent: false,
  style: null,
  wrapperClass: null
};
