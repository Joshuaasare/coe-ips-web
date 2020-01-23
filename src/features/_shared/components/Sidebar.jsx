/*
 * @Author: Joshua Asare
 * @Date: 2019-12-05 17:50:13
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-06 11:40:49
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {} from './MainContent';
import { svg } from '../assets';
import './css/sidebar.css';

type Props = {
  routes: Array,
  onSidebarClose: () => void,
  user: Object<{ lastName: string, otherNames: string }>
};

const Sidebar = (props: Props) => {
  const { routes, onSidebarClose } = props;

  function renderNavLinks() {
    return routes().map((link, index) => {
      const key = `navlink-route-${index}`;
      const showInMenu = link.showInMenu;
      if (!showInMenu) {
        return null;
      }
      return (
        <div className="navlink__container" key={key} onClick={onSidebarClose}>
          <NavLink
            className="navlink__inner"
            exact={link.isExact}
            to={link.path}
            activeClassName="navlink__inner--active"
          >
            <span>{link.title}</span>
          </NavLink>
        </div>
      );
    });
  }

  return (
    <div className="custom__sidebar">
      <div className="custom__sidebar-avatar">
        <img src={svg.grad} alt="" className="custom__sidebar-svg" />
        <span className="avatar__name">STUDENT</span>
      </div>

      <div className="navlinks">{renderNavLinks()}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.currentUser
});

export default connect(mapStateToProps)(Sidebar);
