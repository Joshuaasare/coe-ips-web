/*
 * @Author: Joshua Asare
 * @Date: 2019-12-26 21:03:41
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-12-27 09:44:33
 */

import React from 'react';
import './css/centerPage.css';

type Props = {
  children: any
};

const CenterPage = (props: Props) => (
  <div className="center-page">{props.children}</div>
);

export { CenterPage };
