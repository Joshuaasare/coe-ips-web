/*
 * @Author: Joshua Asare
 * @Date: 2020-02-22 16:28:26
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-11 05:34:35
 *
 * This component list out the companies with slots in the current page of the hoc
 * It also handles the placement logic
 */

import React, { Component } from 'react';
import { Table, Checkbox, Dropdown, Button, Icon } from 'semantic-ui-react';
import * as changeCase from 'change-case';
import { AnimatedModal, EmptyState } from '../../_shared/components';
import { arrayHasData } from '../../_shared/services';
import { uploadPlacementData, sendPlacementLetters } from './_helpers';
import { constants } from '../../_shared/constants';

type Props = {
  dataToShow: Array,
  refreshList: () => {},
  onItemClick: (company: Object) => {}
};

class PlacementList extends Component<Props> {
  state = {
    placementData: [],
    studentOptions: [],
    loading: false,
    itemsSelected: [],
    confirmPlacement: false,
    confirmEmail: false,
    confirmPlacementSave: false,
    error: null,
    showModal: false
  };

  componentDidMount() {
    this.initPageData();
  }

  componentDidUpdate(newProps) {
    if (newProps.dataToShow !== this.props.dataToShow) {
      this.resetState();
      this.initPageData();
    }
  }

  onCheckBoxChange = (data, companyId, companyName) => {
    if (data.checked) {
      if (!this.state.itemsSelected.find(item => item.id === companyId)) {
        this.state.itemsSelected.push({ name: companyName, id: companyId });
        this.setState(prevState => ({
          itemsSelected: [...prevState.itemsSelected]
        }));
      }
    } else {
      for (let i = 0; i < this.state.itemsSelected.length; i += 1) {
        if (this.state.itemsSelected[i].id === companyId) {
          this.state.itemsSelected.splice(i, 1);
          this.setState(prevState => ({
            itemsSelected: [...prevState.itemsSelected]
          }));
          break;
        }
      }
    }
  };

  onSelectAllItemsChecked = data => {
    if (data.checked) {
      this.setState(prevState => ({
        itemsSelected: prevState.placementData.map(company => {
          return {
            name: company.companyName,
            id: company.id
          };
        })
      }));
    } else {
      this.setState({
        itemsSelected: []
      });
    }
  };

  handleErrors(error) {
    if (error === constants.errors.UNAUTHENTICATED_USER) {
      return this.setState({
        error: {
          errorMessage:
            'Oops...You need to Login again before accessing this page',
          svgToUse: 'security'
        }
      });
    }

    if (error === constants.errors.NO_INTERNET_CONNECTION) {
      return this.setState({
        error: {
          errorMessage: 'No internet Connection',
          svgToUse: 'broadcast'
        }
      });
    }

    return this.setState({
      error: {
        errorMessage: 'An unexpected error occured. Please try again Later',
        svgToUse: 'robot'
      }
    });
  }

  savePlacement = async () => {
    this.setState({ loading: true });
    const { placementData } = this.state;
    const resp = await uploadPlacementData(placementData);
    if (!resp.error) {
      return this.props.refreshList();
    }

    this.setState({ confirmPlacementSave: false, loading: false });
    return this.handleErrors(resp.error);
  };

  runPlacement = async (ids, index) => {
    const { placementData } = this.state;

    if (ids[index]) {
      let currCompanyIndex = 0;
      const company = placementData.find((company, i) => {
        currCompanyIndex = i;
        return company.id === ids[index];
      });

      let students = company.students;
      let slots = company.numberNeeded - company.students.length;
      let slotIndex = 0;

      const candidateStudents = company.studentOptions.filter(
        student => student.distance < 6 && !student.companyId
      );

      while (slots !== 0 && candidateStudents[slotIndex]) {
        if (
          candidateStudents[slotIndex] &&
          !students.includes(candidateStudents[slotIndex].value)
        ) {
          students = [...students, candidateStudents[slotIndex].value];
          slotIndex += 1;
          slots -= 1;
        } else {
          slotIndex += 1;
        }
      }

      this.setState(
        prevState => ({
          placementData: [
            ...prevState.placementData.slice(0, currCompanyIndex),
            { ...prevState.placementData[currCompanyIndex], students },
            ...prevState.placementData.slice(currCompanyIndex + 1)
          ]
        }),
        this.handleStudentPlaced(students, currCompanyIndex, () =>
          this.runPlacement(ids, ++index)
        )
      );
    } else {
      this.setState({ showModal: false, loading: false });
    }
  };

  resetState = () => {
    this.setState({ placementData: [], studentOptions: [], loading: true });
  };

  showConfirmPlacementModal = () => {
    this.setState({ confirmPlacement: true, showModal: true });
  };

  showConfirmEmailModal = () => {
    this.setState({ confirmEmail: true, showModal: true });
  };

  onShowModal = () => {
    this.setState({ showModal: true });
  };

  onHideModal = () => {
    this.setState({ showModal: false, confirmPlacement: false, error: null });
  };

  initPageData() {
    const placementData = this.props.dataToShow.map(company => {
      const placedStudents = company.students.map(student => {
        return student.user_id;
      });

      const studentOptions = company.student_options.map(student => {
        return {
          key: student.user_id,
          value: student.user_id,
          distance: student.distance,
          text: `${student.surname.toUpperCase()},  ${changeCase.capitalCase(
            student.other_names
          )} - ${student.address} - ${parseInt(student.distance, 10)}km`,
          companyId: student.company_id
        };
      });

      return {
        id: company.id,
        companyId: company.company_id,
        companyName: company.name,
        email: company.email,
        phone: company.phone,
        placementLetterUrl: company.placement_letter_url,
        letterSent: company.placement_letter_sent,
        subDepartmentId: company.sub_department_id,
        subDepartmentName: company.sub_department_name,
        numberNeeded: company.number_needed,
        location: company.location_address,
        locationId: company.location_id,
        lat: company.lat,
        lng: company.lng,
        students: placedStudents,
        studentOptions
      };
    });

    this.setState({
      placementData,
      studentOptions: placementData.map(company => {
        return company.studentOptions;
      }),
      loading: false
    });
  }

  handleChange = (data, index) => {
    this.setState(
      prevState => ({
        placementData: [
          ...prevState.placementData.slice(0, index),
          { ...prevState.placementData[index], students: data.value },
          ...prevState.placementData.slice(index + 1)
        ]
      }),
      this.handleStudentPlaced(data.value, index)
    );
  };

  handleStudentPlaced = (students, companyIndex, callback) => {
    const { placementData, studentOptions } = this.state;
    let studs = [...students];
    const newPlacementData = placementData.map((company, index) => {
      if (
        index !== companyIndex &&
        company.subDepartmentId === placementData[companyIndex].subDepartmentId
      ) {
        const newCompany = {
          ...company,
          students: company.students.filter(
            student => !studs.includes(student)
          ),
          studentOptions: studentOptions[index].filter(
            student => !studs.includes(student.value)
          )
        };

        studs = [...studs, ...newCompany.students];
        return newCompany;
      }

      return company;
    });

    this.setState({ placementData: newPlacementData }, callback || (() => {}));
  };

  sendEmails = async ids => {
    this.setState({ loading: true });
    const resp = await sendPlacementLetters(ids);
    if (!resp.error) {
      return this.props.refreshList();
    }
    this.setState({ confirmEmail: false, loading: false });
    return this.handleErrors(resp.error);
  };

  renderAnimatedModal() {
    return (
      <AnimatedModal
        onClose={this.onHideModal}
        onShow={this.onShowModal}
        show={this.state.showModal}
        centeredContent
      >
        <AnimatedModal.Header>
          <AnimatedModal.Title>{}</AnimatedModal.Title>
        </AnimatedModal.Header>

        <AnimatedModal.Content>
          {this.renderAnimatedModalContent()}
        </AnimatedModal.Content>

        <AnimatedModal.Footer>{}</AnimatedModal.Footer>
      </AnimatedModal>
    );
  }

  renderAnimatedModalContent() {
    const {
      confirmPlacement,
      confirmPlacementSave,
      error,
      itemsSelected,
      loading,
      confirmEmail,
      placementData
    } = this.state;

    const ids = itemsSelected.map(item => item.id);
    const namesForPlacement = itemsSelected.map(item => item.name);

    const companyIds = [];
    const namesForEmail = [];

    placementData.map(company => {
      if (ids.includes(company.id) && !companyIds.includes(company.companyId)) {
        companyIds.push(company.companyId);
        namesForEmail.push(company.companyName);
        return company.companyId;
      }
      return null;
    });

    const displayNameForPlacement = namesForPlacement.join(', ');
    const displayNameForEmail = namesForEmail.join(', ');

    if (confirmPlacement && !error) {
      return (
        <EmptyState
          content={`Run placement for ${displayNameForPlacement}?  
          [Total: ${namesForPlacement.length}]`}
          svgToUse="begin"
          buttonText="run"
          buttonColor="teal"
          onClick={() => {
            this.setState({ loading: true });
            setTimeout(() => {
              this.runPlacement(ids, 0);
            }, 1);
          }}
          buttonLoading={loading}
        />
      );
    }

    if (confirmEmail && !error) {
      return (
        <EmptyState
          content={`Mail Placement List to ${displayNameForEmail}?  
          [Total: ${namesForEmail.length}]`}
          svgToUse="message"
          buttonText="Send"
          buttonColor="teal"
          onClick={() => {
            this.sendEmails(companyIds);
          }}
          buttonLoading={loading}
        />
      );
    }

    if (confirmPlacementSave && !error) {
      return (
        <EmptyState
          content="Are you sure you want to save this placement?"
          svgToUse="profile"
          buttonText="Save"
          buttonColor="teal"
          onClick={this.savePlacement}
          buttonLoading={loading}
        />
      );
    }

    if (error && !confirmPlacement) {
      return (
        <EmptyState content={error.errorMessage} svgToUse={error.svgToUse} />
      );
    }

    return null;
  }

  renderTableBody(data) {
    return data.map((company, index) => {
      const key = `company-${index}`;

      return (
        <Table.Row key={key}>
          <Table.Cell style={styles.boxStyle}>
            <Checkbox
              checked={
                !!this.state.itemsSelected.find(item => item.id === company.id)
              }
              onChange={(event, data) => {
                this.onCheckBoxChange(data, company.id, company.companyName);
              }}
            />
          </Table.Cell>

          <Table.Cell>{company.companyName}</Table.Cell>
          <Table.Cell>{company.location}</Table.Cell>
          <Table.Cell>{company.subDepartmentName}</Table.Cell>

          <Table.Cell>
            {company.numberNeeded - company.students.length}
          </Table.Cell>

          <Table.Cell>
            {company.placementLetterUrl ? (
              <Icon name="checkmark" color="teal" />
            ) : (
              <Icon name="delete" color="red" />
            )}
          </Table.Cell>

          <Table.Cell>
            {company.letterSent === 1 ? (
              <Icon name="checkmark" color="teal" />
            ) : (
              <Icon name="delete" color="red" />
            )}
          </Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              multiple
              selection
              search
              value={company.students}
              options={company.studentOptions}
              onChange={(e, data) => {
                if (
                  company.numberNeeded - company.students.length > 0 ||
                  data.value.length < company.students.length
                ) {
                  this.handleChange(data, index);
                }
              }}
            />
          </Table.Cell>

          <Table.Cell>
            <Button
              icon="eye"
              size="huge"
              onClick={() => this.props.onItemClick(company)}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { placementData, itemsSelected } = this.state;

    return (
      <div className="placement-list">
        <div className="list__table-container">
          <Table selectable sortable unstackable className="list__table" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1} style={styles.boxStyle}>
                  <Button
                    color="google plus"
                    disabled={!arrayHasData(this.state.itemsSelected)}
                    icon="rocket"
                    onClick={this.showConfirmPlacementModal}
                    size="huge"
                  />

                  <Button
                    color="teal"
                    disabled={!arrayHasData(this.state.itemsSelected)}
                    icon="mail"
                    onClick={this.showConfirmEmailModal}
                    size="huge"
                  />
                </Table.HeaderCell>

                <Table.HeaderCell width={1}>Company name</Table.HeaderCell>

                <Table.HeaderCell width={1}>Location</Table.HeaderCell>
                <Table.HeaderCell width={1}>Programme</Table.HeaderCell>
                <Table.HeaderCell width={1}>Slots</Table.HeaderCell>
                <Table.HeaderCell width={1}>Letter</Table.HeaderCell>
                <Table.HeaderCell width={1}>Mailed</Table.HeaderCell>

                <Table.HeaderCell width={15}>Students</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderTableBody(placementData)}</Table.Body>
          </Table>
          {this.renderAnimatedModal()}

          <div className="row-cell">
            <div className="select-all__checkbox">
              <Checkbox
                onChange={(event, data) => this.onSelectAllItemsChecked(data)}
                checked={itemsSelected.length === placementData.length}
              />
              <span>
                {itemsSelected.length === placementData.length
                  ? 'Unmark All'
                  : 'Mark All'}
              </span>
            </div>
          </div>
        </div>

        <div className="row-cell__button">
          <Button
            content="Save Placement"
            color="teal"
            icon="cloud upload"
            size="massive"
            width={8}
            onClick={() =>
              this.setState({ confirmPlacementSave: true, showModal: true })
            }
          />
        </div>
      </div>
    );
  }
}

const styles = {
  boxStyle: {}
};

export default PlacementList;
