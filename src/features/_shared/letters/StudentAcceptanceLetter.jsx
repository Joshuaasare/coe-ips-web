/*
 * @Author: Joshua Asare
 * @Date: 2020-03-09 07:10:35
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-09 08:13:40
 */
import React, { Component } from 'react';
import * as changeCase from 'change-case';
import { getDocumentsDateFormat, getStudentYearOfStudy } from '../services';
import { images } from '../assets';
import './css/introductory.css';

type Props = {
  currentStudentData: Object
};

class StudentAcceptanceLetter extends Component<Props> {
  state = {
    // eslint-disable-next-line no-undef
    title: document.title
  };

  setDocumentTitle() {
    // eslint-disable-next-line no-undef
    document.title = `${this.props.currentStudentData.indexNumber} Introductory Letter`;
  }

  removeDocumentTitle() {
    // eslint-disable-next-line no-undef
    document.title = this.state.title;
  }

  renderContent() {
    const { currentStudentData } = this.props;
    const {
      acadYear,
      surname,
      otherNames,
      yearOfStudy,
      subDepartmentName,
      indexNumber,
      companyName,
      companyLocationName,
      companyLocationAddress
    } = currentStudentData;

    const studentYear = getStudentYearOfStudy(parseInt(yearOfStudy, 10));
    return (
      <div>
        <div id="introductory">
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
            <br />
            <br />

            <h5>Office of the Provost</h5>

            <div className="senders-address">
              <address className="return-address">
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

            <div className="recipient-address">
              <address className="return-address">
                <p align="left">
                  <b>
                    {`${changeCase.capitalCase(
                      surname
                    )} ${changeCase.capitalCase(otherNames)}`}
                  </b>
                  <br />
                  {indexNumber}
                  <br />
                  {`${studentYear} Year`}
                  <br />
                  {`Bsc. ${changeCase.capitalCase(subDepartmentName)} `}
                  Engineering.
                </p>
              </address>
            </div>
            <div className="letter-date">
              <p>{getDocumentsDateFormat(Date.parse(`${new Date()}`))}</p>
            </div>

            <br />
          </div>
          <p className="salutation">
            {`Dear ${changeCase.capitalCase(surname)} ${changeCase.capitalCase(
              otherNames
            )},`}
          </p>
          <div className="letter-intro">
            <b>
              <div className="margin-bottom-tiny">
                {`VACATION TRAINING FOR ${acadYear}/${acadYear +
                  1} ACADEMIC YEAR`}
              </div>
            </b>
          </div>
          <div className="letter-content">
            {`You have been placed at ${companyName}, ${companyLocationName} for the Vacation Training course.
            You are therefore to present this letter to the company
            representative for further instructions. In the meantime we wish to
            remind you that:`}
            <br />
            1.
            {`The vacation training course is an integral part of the BSc
            ${subDepartmentName} Engineering Programme and you must pass the course in
            order to graduate.`}
            <br />
            2.
            {`The duration of the programme is from the 3rd of June ${acadYear +
              1} to the
            26th of July ${acadYear + 1}.`}
            <br />
            3. There is no financial obligation on the host trainer
            organization. Any assistance your hosts may offer is at their own
            discretion.
            <br />
            4. You are required to obey all the rules and regulations affecting
            regular employees at the host organization.
            <br />
            5. The hosts will assign you a trainer who will organize and
            supervise your activities at the host trainer organization.
            <br />
            6. During the training, you must keep a daily log sheet of
            activities which you must compile into weekly progress sheets and
            finally into an industrial training report.
            <br />
            7. Please make sure that your host trainer signs your log sheets.
            <br />
            8. At the end of the training the trainer will grade your
            performance.
            <br />
            9. Faculty members from College of Engineering, KNUST will visit you
            during the training to monitor and also grade your performance.
            <br />
            10. Your Vacation Training Report should be submitted to your
            department's internship coordinator by 5:00 p.m. on 5th September
            2020.
            <br />
            11. If you have any difficulties, your first point of call is your
            host trainer, but do not hesitate to contact your coordinator for
            assistance.
            <br />
            We wish you a fruitful vacation training.
          </div>
          <br />

          <div>
            <div className="closing-sign">
              <div className="closing-coordinator">
                <p>Yours sincerely,</p>
                <img src={images.profAndohSignature} alt="" />
                <br />
                <p>
                  Ing. Prof. P.Y. Andoh
                  <br />
                  (College Internship Coordinator/industrial Liaison Officer)
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

            <hr />
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

export default StudentAcceptanceLetter;
