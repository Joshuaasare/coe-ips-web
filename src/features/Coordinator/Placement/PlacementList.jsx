/*
 * @Author: Joshua Asare
 * @Date: 2020-02-22 16:28:26
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-02 10:25:13
 */

import React, { Component } from 'react';
import { Table, Checkbox, Dropdown } from 'semantic-ui-react';
import * as changeCase from 'change-case';
import { CenterPage, Loader } from '../../_shared/components';

type Props = {
  dataToShow: Array
};

class PlacementList extends Component<Props> {
  state = {
    placementData: [],
    loading: true
  };

  componentDidMount() {
    const placementData = this.props.dataToShow.map((company, index) => {
      return {
        companyId: company.company_id,
        companyName: company.name,
        subDepartmentId: company.company_sub_department_id,
        subDepartmentName: company.sub_department_name,
        numberNeeded: company.number_needed,
        location: company.location_address,
        students: company.students.map(student => {
          return {
            key: student.user_id,
            value: student.user_id,
            text: `${student.surname.toUpperCase()},  ${changeCase.capitalCase(
              student.other_names
            )}`
          };
        })
      };
    });

    this.setState({ placementData, loading: false });
  }

  renderTableBody(data) {
    return data.map((company, index) => {
      const key = `company-${index}`;

      return (
        <Table.Row key={key}>
          <Table.Cell style={styles.boxStyle}>
            <Checkbox />
          </Table.Cell>

          <Table.Cell>{company.companyName}</Table.Cell>
          <Table.Cell>{company.location}</Table.Cell>
          <Table.Cell>{company.subDepartmentName}</Table.Cell>

          <Table.Cell>
            {company.numberNeeded - company.students.length}
          </Table.Cell>

          <Table.Cell>
            <Dropdown fluid multiple selection />
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { loading, placementData } = this.state;
    if (loading) {
      return (
        <CenterPage>
          <Loader coverEverything inverted active />
        </CenterPage>
      );
    }

    console.log('placed', placementData);

    return (
      <div className="placement-list">
        <div className="list__table-container">
          <Table selectable sortable unstackable className="list__table" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1} style={styles.boxStyle}>
                  {}
                </Table.HeaderCell>

                <Table.HeaderCell width={3}>Company name</Table.HeaderCell>

                <Table.HeaderCell width={3}>Company Location</Table.HeaderCell>
                <Table.HeaderCell width={3}>Programme</Table.HeaderCell>
                <Table.HeaderCell width={2}>Slots Available</Table.HeaderCell>

                <Table.HeaderCell>Students</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderTableBody(placementData)}</Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const styles = {
  boxStyle: {}
};

export default PlacementList;
