import React from 'react';
import { Loader as Loading, Dimmer } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const Loader = props =>
  props.coverEverything ? (
    <Dimmer
      active={props.active}
      inverted={props.inverted}
      style={props.style}
      className={props.className}
    >
      <Loading
        size={props.size}
        active={props.active}
        content={props.content}
      />
    </Dimmer>
  ) : (
    <Loading
      active={props.active}
      content={props.content}
      style={props.style}
      className={props.className}
    />
  );

Loader.propTypes = {
  active: PropTypes.bool,
  inverted: PropTypes.bool,
  coverEverything: PropTypes.bool,
  content: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  size: PropTypes.string
};

Loader.defaultProps = {
  active: false,
  inverted: false,
  coverEverything: true,
  content: null,
  style: null,
  className: null,
  size: 'large'
};
