/*
 * @Author: Joshua Asare
 * @Date: 2019-12-27 11:28:24
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-29 03:48:17
 */
import React from 'react';
import { Button } from 'semantic-ui-react';
import {} from './MainContent';
import { svg } from '../assets';
import './css/emptyState.css';

type Props = {
  buttonColor?: string,
  onClick?: () => {},
  svgToUse: string,
  content: string,
  buttonText?: string,
  buttonDisabled?: boolean,
  buttonLoading?: boolean
};

const EmptyState = (props: Props) => {
  const {
    buttonColor,
    onClick,
    svgToUse,
    content,
    buttonText,
    buttonLoading,
    buttonDisabled
  } = props;
  function renderButton() {
    return (
      <div className="empty-state__button-container">
        <Button
          color={buttonColor}
          onClick={onClick}
          size="massive"
          fluid
          loading={buttonLoading}
          disabled={buttonDisabled}
        >
          {buttonText}
        </Button>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <img src={svg[svgToUse]} alt="empty state" className="empty-state__svg" />
      <span>{content}</span>
      {buttonColor && onClick && buttonText ? renderButton() : null}
    </div>
  );
};

EmptyState.defaultProps = {
  buttonColor: null,
  onClick: null,
  buttonText: null,
  buttonLoading: false,
  buttonDisabled: false
};

export { EmptyState };
