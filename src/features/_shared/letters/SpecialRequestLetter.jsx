/*
 * @Author: Joshua Asare
 * @Date: 2020-02-28 10:43:12
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-04 12:01:17
 */

import React, { Component } from 'react';
import * as changeCase from 'change-case';
// import { getDocumentsDateFormat } from '../services';
import { images } from '../assets';
import './css/placementRequest.css';

import { constants } from '../constants';
import { getDocumentsDateFormat } from '../services';

type Props = {
  companyDetails: Object,
  acadYear?: number
};

class SpecialRequestLetter extends Component<Props> {
  state = {
    // eslint-disable-next-line no-undef
    title: document.title
  };

  setDocumentTitle() {
    // eslint-disable-next-line no-undef
    document.title = `Telecom Letter ECG`;
    // document.title = `${this.props.companyDetails.name &&
    //   `${changeCase.capitalCase(
    //     this.props.companyDetails.name
    //   )} request letter`}`;
  }

  removeDocumentTitle() {
    // eslint-disable-next-line no-undef
    document.title = this.state.title;
  }

  renderContent() {
    const { companyDetails } = this.props;
    return (
      <div>
        <div id="request-letter">
          <div className="shift-down-one-break-for-firefox" />
          <div className="letter-head">
            <div className="coe-heading" style={{}}>
              <img className="knust-logo" src={images.knustLogo} alt="" />
              <h3 className="coe-heading__text">COLLEGE OF ENGINEERING</h3>
              <img className="coe-logo" src={images.coeLogo} alt="" />
            </div>
            <div className="knust-heading">
              <h5 className="knust-in-full">
                KWAME NKRUMAH UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </h5>
            </div>

            <h5>Office of the Provost</h5>
            <br />

            <div className="senders-address">
              <address className="senders-address">
                <p align="right">
                  University Post Office
                  <br />
                  Kumasi-Ghana West Africa
                  <br />
                  Direct Line: 233-3220-60240
                  <br />
                  Tel/Fax: 233-3220-60317
                  <br />
                  Email:
                  <font color="blue">
                    {' '}
                    <i>provost.coe@knust.edu.gh</i>
                  </font>
                </p>
              </address>
            </div>
            <br />
            <div className="letter-date">
              <p>{getDocumentsDateFormat(Date.parse(`${new Date()}`))}</p>
            </div>

            <br />

            <address className="return-address">
              <p align="left">
                The Director of Human Resource
                <br />
                <span>Electricity Company of Ghana</span>
                <br />
                <span>Electro-Volta House</span>
                <br />
              </p>
            </address>
            <br />
            <span className="bold__text">Our Ref:CoE-VACT/2020</span>
            <br />
            <br />
          </div>
          <p>Dear Sir/Madam,</p>
          <div className="letter-intro">
            <b>
              <p>VACATION TRAINING PLACEMENT REQUEST</p>
            </b>
          </div>
          <div className="letter-content">
            <br />
            The College of Engineering of the Kwame Nkrumah University of
            Science and Technology seeks to become a global college of
            engineering focused on national industrial development. Therefore as
            part of our requirements for graduation in the B.Sc Degree
            programmes students must complete a minimum of 8-week industrial
            attachment programme.
            <br />
            <br />
            The Telecommunication Engineering Department of the College of
            Engineering, KNUST, would like to seek placements for vacation
            training in your company for our third year students at the
            <br />
            <br />
            <span className="bulleted-bold">
              i. Metering and Technical Services Division
            </span>
            <br />
            <span className="bulleted-bold">
              ii. Network and Security Division
            </span>
            <br />
            <br />
            We would seek to have your commitment in the number of students you
            would be willing to offer places to. We look forward to a favourable
            response and future collaborations with your company. Thank you in
            anticipation of your cooperation.
          </div>
          <br />
          <div>
            <div className="closing">
              <div className="closing-coordinator">
                <p>Yours sincerely,</p>
                <img src={images.profAndohSignature} alt="" />
                <br />
                <p>
                  Ing. Prof. Prince Yaw Andoh
                  <br />
                  (Industrial Liaison Officer/College Internship Coordinator)
                </p>
              </div>
              <div className="closing-provost">
                <br />
                <img src={images.provostSignature} alt="" />
                <br />
                <p>
                  Ing. Prof. Mark Adom-Asamoah
                  <br />
                  (Provost, College of Engineering)
                </p>
              </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="letter-footer">
              <font color="blue">
                <i>Departments</i>
              </font>
              : Aerospace Engineering, Agricultural Engineering, Biomedical
              Engineering, Chemical Engineering, Civil Engineering, Computer
              Engineering, Electrical and Electronic Engineering, Geological
              Engineering, Geomatic Engineering, Materials Engineering,
              Mechanical Engineering, Metallurgical Engineering, Petrochemical
              Engineering, Petroleum Engineering, Telecommunication Engineering.
              <br className="footer-br" />
              <div className="energy-centres">
                <font color="blue">
                  <i>Research Centres</i>
                </font>
                : Technology Consultancy Centre, The Energy Centre.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }

  componentWillUnmount() {
    document.title = this.state.title;
  }
}

SpecialRequestLetter.defaultProps = {
  acadYear: constants.app.ACAD_YEAR
};

export default SpecialRequestLetter;
