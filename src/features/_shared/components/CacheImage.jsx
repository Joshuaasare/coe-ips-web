import React from 'react';
import PropTypes from 'prop-types';
import { pickRandomAvatarColor } from '../services';

export class CacheImage extends React.PureComponent {
  state = {
    urlToUse: null,
    couldNotDownload: false
  };

  componentDidMount() {
    this.renderImage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) this.renderImage(nextProps);
  }

  render() {
    if (!this.props.src || this.state.couldNotDownload)
      return (
        <div
          style={{
            ...styles.letterAvatar,
            ...this.props.style,
            backgroundColor: pickRandomAvatarColor(this.props.id)
          }}
          className={this.props.containerClassName}
        >
          {this.props.name.substr(0, 1).toUpperCase()}
        </div>
      );
    if (this.state.urlToUse) {
      return (
        <div className={this.props.containerClassName} style={this.props.style}>
          <img
            src={this.state.urlToUse}
            alt=""
            className={this.props.imageClassName}
            style={this.props.style}
          />
        </div>
      );
    }
    return (
      <div
        className={this.props.containerClassName}
        style={{ background: '#eee', ...this.props.style }}
      />
    );
  }

  renderImage = async props => {
    if (props.src) {
      this.setState({ urlToUse: props.src });
    }
  };
}

const styles = {
  letterAvatar: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#666'
  }
};

CacheImage.propTypes = {
  src: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string,
  containerClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any)
};

CacheImage.defaultProps = {
  src: null,
  name: 'xoxo',
  containerClassName: '',
  imageClassName: '',
  style: {}
};
