/*
 * @Author: Joshua Asare
 * @Date: 2019-12-27 11:28:24
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-12-27 19:10:20
 */
import React from 'react';
import { Button } from 'semantic-ui-react';
import { MainContent } from './MainContent';
import { svg } from '../assets';
import './css/emptyState.css';

type Props = {
  buttonColor?: string,
  onClick?: () => {},
  svgToUse: string,
  content: string,
  buttonText?: string
};

const EmptyState = (props: Props) => {
  const { buttonColor, onClick, svgToUse, content, buttonText } = props;
  function renderButton() {
    return (
      <div className="empty-state__button-container">
        <Button color={buttonColor} onClick={onClick} size="massive" fluid>
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
  buttonText: null
};

export { EmptyState };
