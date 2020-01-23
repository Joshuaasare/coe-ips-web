import React from 'react';
import PropTypes from 'prop-types';
import './css/mainContent.css';

export const MainContent = props => (
  <div className={`main-content ${props.wrapperClass}`}>
    {props.toolbar || null}
    <div className="main-child" style={props.style}>
      {props.children}
    </div>
    {props.footer || null}
  </div>
);

MainContent.propTypes = {
  toolbar: PropTypes.element,
  footer: PropTypes.element,
  wrapperClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  centerContent: PropTypes.bool
};

MainContent.defaultProps = {
  toolbar: null,
  footer: null,
  centerContent: false,
  style: null,
  wrapperClass: null
};
