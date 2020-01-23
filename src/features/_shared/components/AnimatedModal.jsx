/**
 * @flow
 */

import React from 'react';
import { generateRandomString } from '../services';
import { Ikon } from '.';
import './css/animatedModal.css';

type Props = {
  show: boolean,
  onClose: () => void,
  onShow?: () => void,
  children: any,
  className?: string,
  style?: Object,
  hideExitButton: boolean,
  centeredContent?: boolean
};

class AnimatedModal extends React.PureComponent<Props> {
  modal: HTMLElement;
  id: string;

  static defaultProps = {
    className: '',
    style: {},
    hideExitButton: false,
    centeredContent: false
  };

  static Header = ({ children, style }: any) => (
    <div className="animated-modal__header" style={style || {}}>
      {children}
    </div>
  );

  static Title = ({ children, style }: any) => (
    <div className="animated-modal__header__title" style={style || {}}>
      {children}
    </div>
  );

  static Content = ({ children, style }: any) => (
    <div className="animated-modal__content" style={style || {}}>
      {children}
    </div>
  );

  static Footer = ({ children, style }: any) => (
    <div className="animated-modal__footer" style={style || {}}>
      {children}
    </div>
  );

  constructor() {
    super();
    this.id = generateRandomString(4);
  }

  componentDidMount() {
    // $FlowFixMe
    const rootElement: HTMLElement = document.getElementById('root');
    // $FlowFixMe
    this.modal = document.getElementById(this.id);
    if (this.modal) rootElement.appendChild(this.modal);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.show !== this.props.show)
      if (nextProps.show) this.showModal();
      else this.hideModal();
  }

  render() {
    return (
      <div>
        <div
          id={this.id}
          className={`animated-modal ${this.props.className || ''}`}
          style={this.props.style || ''}
        >
          {!this.props.hideExitButton && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div className="animated-modal__exit-btn" onClick={this.hideModal}>
              <Ikon name="android-close" size={2} />
            </div>
          )}
          <div
            style={{
              ...styles.defaultContent,
              ...(this.props.centeredContent ? styles.centeredContent : {})
            }}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    // $FlowFixMe
    const rootElement: HTMLElement = document.getElementById('root');
    if (this.modal) rootElement.removeChild(this.modal);
  }

  showModal = () => {
    // this.modal.style.visibility = 'visible';
    this.modal.style.opacity = '1';
    this.modal.style.transform = 'scale(1)';
    if (this.props.onShow) this.props.onShow();
  };

  hideModal = () => {
    this.modal.style.transform = 'scale(0)';
    this.modal.style.opacity = '0';
    // this.modal.style.visibility = 'hidden';
    this.props.onClose();
  };
}

const styles = {
  defaultContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  centeredContent: {
    justifyContent: 'center'
  }
};

export default AnimatedModal;
