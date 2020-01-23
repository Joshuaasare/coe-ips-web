/*
 * @Author: Joshua Asare
 * @Date: 2019-12-05 14:25:59
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-23 18:10:23
 */
import React from 'react';
import './css/toolbar.css';
import { images } from '../assets/index';
import { Ikon } from '.';

type Props = {
  active?: boolean,
  sidebarActive: boolean,
  onSidebarOpen: () => void,
  onSidebarClose: () => void,
  signOut: () => void
};

const Toolbar = (props: Props) => {
  const { onSidebarClose, onSidebarOpen, sidebarActive, signOut } = props;

  const handleMenuClick = () => {
    sidebarActive ? onSidebarClose() : onSidebarOpen();
  };

  return (
    <div className="toolbar">
      <div className="toolbar__left">
        <img className="logo__image" src={images.coeLogo} alt="coe-logo" />
        <div onClick={handleMenuClick} className="toolbar__menu-icon-container">
          <span>{sidebarActive ? 'Close Menu' : 'Open Menu'}</span>
          <Ikon
            name={sidebarActive ? 'chevrons-left' : 'chevrons-right'}
            className="toolbar__menu-icon"
          />
        </div>
      </div>

      <div className="toolbar__right">
        {/* <div className="toolbar__notif-icon">started Internship?</div> */}
        <div className="toolbar__menu-icon-container" onClick={signOut}>
          <span>Sign Out</span>
          <Ikon name="exit" className="toolbar__menu-icon" />
        </div>
      </div>
    </div>
  );
};

Toolbar.defaultProps = {
  active: true
};

export default Toolbar;
