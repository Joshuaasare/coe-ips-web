/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-03 01:22:19
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-03 01:23:12
 *
 * @flow
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GenericButton } from '../_shared/components';
import './css/landing.css';

import sync from '../_shared/assets/svg/sync-2.svg';
import logo from '../_shared/assets/images/favicon.png';
import { routes } from '../Root/routes';
// import PropTypes from 'prop-types';

class Landing extends Component {
  state = {};

  render() {
    return (
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

                  <div className="landing__body--sub">
                    <span>
                      A single Application to co-ordinate all the activities of
                      the internship process in the College of Engineering KNUST
                    </span>
                  </div>

                  <div className="landing__body-buttons">
                    <Link to={routes.STUDENT_REGISTRATION.path}>
                      <GenericButton
                        text="Student"
                        height={4}
                        width={13}
                        borderColor="#ffd25a"
                        textColor="#ffd25a"
                        icon="student"
                      />
                    </Link>

                    <Link to="/">
                      <GenericButton
                        text="Co-ordinator"
                        height={4}
                        width={13}
                        borderColor="#ffd25a"
                        textColor="#ffd25a"
                        icon="professor"
                      />
                    </Link>

                    <Link to="/">
                      <GenericButton
                        text="Company"
                        height={4}
                        width={13}
                        borderColor="#ffd25a"
                        textColor="#ffd25a"
                        icon="desktop"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-1-of-2">
              <div className="landing__image-container">
                <img src={sync} className="landing__body-image" alt="sync" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
