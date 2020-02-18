/*
 * @Author: Joshua Asare
 * @Date: 2020-02-17 09:25:06
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-18 11:07:18
 */
import React, { Component } from 'react';
import * as changeCase from 'change-case';
// import { getDocumentsDateFormat } from '../services';
import { images } from '../assets';
import './css/placementRequest.css';

import { constants } from '../constants';

type Props = {
  companyDetails: Object,
  acadYear?: number
};

class PlacementRequestNoLetterHead extends Component<Props> {
  state = {
    // eslint-disable-next-line no-undef
    title: document.title
  };

  setDocumentTitle() {
    // eslint-disable-next-line no-undef
    document.title = `${this.props.companyDetails.name &&
      `${changeCase.capitalCase(
        this.props.companyDetails.name
      )} request letter`}`;
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
          <div className="empty-letter-head">
            <div className="empty-senders-address">{}</div>
            <br />
            {/* <div className="letter-date">
              <p>{getDocumentsDateFormat(Date.parse(`${new Date()}`))}</p>
            </div> */}

            <br />

            <address className="return-address">
              <p align="left">
                The Human Resource Manager,
                <br />
                {`${companyDetails.name &&
                  changeCase.capitalCase(companyDetails.name)}`}
                <br />
                <span>
                  {companyDetails.phone ? (
                    <span>
                      {`Phone: ${companyDetails.phone}`}
                      <br />
                    </span>
                  ) : null}
                </span>
                <span>
                  {companyDetails.email && (
                    <span>
                      Email:
                      <font color="blue">
                        <i>{` ${companyDetails.email}`}</i>
                      </font>
                    </span>
                  )}
                </span>
              </p>
            </address>
            <br />
            <span>Our Ref:CoE-VACT/2020</span>
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
            attachment programme with a local or an overseas industrial
            establishment between May and August to gain valuable industrial
            experience.
            <br />
            <br />
            The purpose of this letter is first of all to thank you for the
            continous support in the training of our young engineers and the
            monitoring and evaluation of our students during the vacation
            training period. The College of Engineering, KNUST, would like to
            seek placements for vacation training in your company for our Third
            Year students. We would seek to have your commitment both in the
            number of students you would be willing to offer places to and the
            areas of engineering discipline to enable us respond accordingly as
            per attached. We would also like you to follow this link
            "https://coeips.netlify.com" to register and choose the number of
            students you need for each discipline.
            <br />
            <br />
            We look forward to a favourable response and future collaborations
            with your company. Thank you in anticipation of your cooperation.
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

PlacementRequestNoLetterHead.defaultProps = {
  acadYear: constants.app.ACAD_YEAR
};

export default PlacementRequestNoLetterHead;
