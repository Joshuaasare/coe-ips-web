/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-03 01:22:19
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-03 01:23:12
 *
 * @flow
 */
import React from 'react';
import {} from 'react-router-dom';
import { Ikon } from '../_shared/components';
import './css/landing.css';
import sync from '../_shared/assets/svg/sync-2.svg';
import logo from '../_shared/assets/images/favicon.png';

import { routes } from '../Login/routes';
// import PropTypes from 'prop-types';

type Props = {
  pushRoute: () => void
};

const Landing = (props: Props) => (
  <div className="landing">
    <div className="landing__navigation">
      <img src={logo} className="landing__logo" alt="" />
    </div>

    <div className="landing__body">
      <div className="row">
        <div className="col-1-of-2">
          <div>
            <div className="landing__text-container">
              <div className="landing__body--main">
                <span>
                  Welcome to the College of Engineering Internship Placement
                  Platform
                </span>
              </div>

              <div className="landing__body--sub" />

              <div className="landing__body-buttons">
                <div
                  className="landing__icon-text"
                  onClick={() => props.pushRoute(routes.STUDENT_LOGIN.path)}
                >
                  <Ikon
                    name="school"
                    className="landing__icon"
                    color="#ffd25a"
                  />
                  <span>Student</span>
                </div>

                <div
                  className="landing__icon-text"
                  onClick={() => props.pushRoute(routes.COORDINATOR_LOGIN.path)}
                >
                  <Ikon
                    name="graduate-student"
                    className="landing__icon"
                    color="#ffd25a"
                  />
                  <span>Coordinator</span>
                </div>

                <div
                  className="landing__icon-text"
                  onClick={() => props.pushRoute(routes.COMPANY_LOGIN.path)}
                >
                  <Ikon name="gear" className="landing__icon" color="#ffd25a" />
                  <span>Company</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-1-of-2 landing__image-col">
          <div className="landing__image-container">
            <img src={sync} className="landing__body-image" alt="sync" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
