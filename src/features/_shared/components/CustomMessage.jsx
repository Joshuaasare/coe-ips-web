/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Author: Joshua Asare
 * @Date: 2019-12-20 21:37:30
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-12-21 01:52:50
 */
import React, { useState } from 'react';
import { Message } from 'semantic-ui-react';

type Props = {
  showClose: boolean
};
const CustomMessage = (props: Props) => {
  const { showClose, ...rest } = props;
  const [showMessage, setShowMessage] = useState(true);
  const onDismiss = () => {
    setShowMessage(false);
  };

  if (showMessage) {
    return <Message {...rest} onDismiss={showClose ? onDismiss : null} />;
  }
  return null;
};

export { CustomMessage };
