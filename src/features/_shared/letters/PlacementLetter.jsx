/*
 * @Author: Joshua Asare
 * @Date: 2020-03-09 08:27:54
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-10 12:11:28
 */

import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import * as changeCase from 'change-case';
import { getDocumentsDateFormat } from '../services';
import { images } from '../assets';
import './css/placementRequest.css';

import { constants } from '../constants';

type Props = {
  companyDetails: Object,
  acadYear?: number
};

class PlacementLetter extends Component<Props> {
  state = {
    // eslint-disable-next-line no-undef
    title: document.title
  };

  setDocumentTitle() {
    // eslint-disable-next-line no-undef
    document.title = `${this.props.companyDetails.companyName &&
      `${changeCase.capitalCase(
        this.props.companyDetails.companyName
      )} placement list letter`}`;
  }

  removeDocumentTitle() {
    // eslint-disable-next-line no-undef
    document.title = this.state.title;
  }

  renderTableBody(data) {
    return data.map((student, index) => {
      const key = `company-${index}`;

      return (
        <Table.Row key={key}>
          <Table.Cell>
            {`${student.surname.toUpperCase()},  ${changeCase.capitalCase(
              student.other_names
            )}`}
          </Table.Cell>
          <Table.Cell>{student.phone}</Table.Cell>
          <Table.Cell>{student.sub_department_name}</Table.Cell>
          <Table.Cell>{student.location_name}</Table.Cell>
        </Table.Row>
      );
    });
  }

  renderContent() {
    const { companyDetails } = this.props;
    console.log('comp2', companyDetails);
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
                The Human Resource Manager,
                <br />
                {`${companyDetails.companyName &&
                  changeCase.capitalCase(companyDetails.companyName)}`}
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
          </div>
          <p>Dear Sir/Madam,</p>
          <div className="letter-intro">
            <b>
              <p>VACATION TRAINING PLACEMENT LIST</p>
            </b>
          </div>
          <div className="letter-content">
            <br />
            The College of Engineering of the Kwame Nkrumah University of
            Science and Technology writes to first of all, thank you for the
            support you have been offering us in the training of our young
            engineers and also monitoring and evaluating our students during the
            vacation training period and to inform you of the Students we have
            posted to your institution for the vacation training program.
            <br />
            <br />
          </div>

          <Table selectable sortable unstackable className="list__table" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                <Table.HeaderCell width={4}>Contact</Table.HeaderCell>
                <Table.HeaderCell width={5}>Programme</Table.HeaderCell>

                <Table.HeaderCell width={5}>Address</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderTableBody(companyDetails.placedStudents)}
            </Table.Body>
          </Table>
          <br />
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

PlacementLetter.defaultProps = {
  acadYear: constants.app.ACAD_YEAR
};

export default PlacementLetter;
