/*
 * @Author: Joshua Asare
 * @Date: 2020-01-23 02:42:51
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-23 14:49:43
 */
import React, { Component } from 'react';
import * as changeCase from 'change-case';
import { getDocumentsDateFormat } from '../services';
import { images } from '../assets';
import './css/introductory.css';

type Props = {
  currentStudentData: Object
};

class Introductory extends Component<Props> {
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
      mainDepartmentName
    } = currentStudentData;
    return (
      <div>
        <div id="introductory-letter">
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
                    <i>provost.coe@knust.edu.gh</i>
                  </font>
                </p>
              </address>
            </div>
            <hr className="address__hr" />
            <br />

            <div className="our-reference">
              <p>
                Our Ref:CoE-VACT/
                {acadYear + 1}
              </p>
            </div>

            <div className="letter-date">
              <p>{getDocumentsDateFormat(Date.parse(`${new Date()}`))}</p>
            </div>
            <br />
          </div>
          <p>Dear Sir/Madam,</p>
          <div className="letter-intro">
            <p>
              {`VACATION TRAINING FOR ${acadYear}/${acadYear +
                1} ACADEMIC YEAR`}
            </p>
            <p>LETTER OF INTRODUCTION</p>
          </div>
          <div className="letter-content">
            The College of Engineering of the Kwame Nkrumah University of
            Science and Technology seeks to become a global college of
            engineering focused on national industrial development. This means
            among other things that the need for students to have exposure to
            industrial practice early in their engineering education is one of
            the important pillars of their training. Therefore as part of our
            requirements for graduation in the B.Sc Engineering Degree
            programmes, students must complete a minimum of 8-week industrial
            attachment programme with a local or an overseas industrial
            establishment between May and August. The purpose of the vacation
            training among other things is to enable students to translate the
            theories they have learnt in the classroom into tasks in a real work
            environment. The purpose of this letter is first of all to thank you
            for the support you have been offering us in previous years in the
            training of our young engineers and also the monitoring and
            evaluation of our students during the vacation training period. The
            College of Engineering, KNUST, would like to seek for vacation
            training placement in your company for
            <b>
              {' '}
              {`${changeCase.capitalCase(surname)} ${changeCase.capitalCase(
                otherNames
              )}`}
              ,{' '}
            </b>
            a 3rd Year student from the
            <b>
              {` ${changeCase.capitalCase(mainDepartmentName)} `}
              Engineering Department.{' '}
            </b>
            We would be most grateful, if you could offer him/her a vacation
            training position in your company. Thank you in anticipation of your
            cooperation.
          </div>
          <br />
          <div>
            <div className="closing-coordinator">
              <p>Yours sincerely,</p>
              <img src={images.profAndohSignature} alt="" />
              <br />
              <p>
                Prof. P.Y. Andoh
                <br />
                (College Internship Coordinator)
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
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

export default Introductory;
