import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';

const AnimatedFloatingButton = props => {
  return (
    <div className="animated-floating-btn" style={{ bottom: props.bottom }}>
      <Button
        disabled={props.disabled}
        onClick={props.onClick}
        size="small"
        color="red"
        style={{ width: props.width }}
      >
        <Icon name={props.iconName} />
        {props.text}
      </Button>
    </div>
  );
};

AnimatedFloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  bottom: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  iconName: PropTypes.string,
  width: PropTypes.string
};
AnimatedFloatingButton.defaultProps = {
  disabled: false,
  bottom: '5rem',
  width: '17rem',
  iconName: 'cloud upload',
  text: 'Save'
};

export default AnimatedFloatingButton;
