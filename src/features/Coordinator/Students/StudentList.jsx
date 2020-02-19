/*
 * @Author: Joshua Asare
 * @Date: 2020-02-11 23:44:03
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-19 11:37:18
 */
import React, { Component } from 'react';
import * as changeCase from 'change-case';
import { Table, Checkbox, Icon, Button, TableRow } from 'semantic-ui-react';
import { constants } from '../../_shared/constants';
import { EmptyState, AnimatedModal } from '../../_shared/components';
import { isEmpty, arrayHasData } from '../../_shared/services';

type Props = {
  dataToShow: Array<{}>,
  refreshList: () => {},
  onItemClick: () => {}
};

class StudentList extends Component<Props> {
  state = {
    loading: false,
    itemsSelected: [],
    confirmDelete: false,
    confirmEmail: false,
    error: null,
    showModal: false,
    checkedItems: [],
    selectAllChecked: false
  };

  componentDidUpdate(newProps) {
    if (newProps.dataToShow !== this.props.dataToShow) {
      this.resetState();
    }
  }

  resetState = () => {
    this.setState({
      loading: false,
      itemsSelected: [],
      confirmDelete: false,
      confirmEmail: false,
      error: null,
      showModal: false,
      checkedItems: [],
      selectAllChecked: false
    });
  };

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
    const newCheckedItems = [];
    if (data.checked) {
      const newItemsSelected = this.props.dataToShow.map(company => {
        newCheckedItems.push(true);
        return {
          name: company.name,
          id: company.id
        };
      });
      this.setState({
        selectAllChecked: data.checked,
        checkedItems: newCheckedItems,
        itemsSelected: newItemsSelected
      });
    } else {
      this.setState({
        selectAllChecked: data.checked,
        checkedItems: newCheckedItems,
        itemsSelected: []
      });
    }
  };

  showConfirmDeleteModal = () => {
    this.setState({ confirmDelete: true, showModal: true });
  };

  showConfirmEmailModal = () => {
    this.setState({ confirmEmail: true, showModal: true });
  };

  onShowModal = () => {
    this.setState({ showModal: true });
  };

  onHideModal = () => {
    this.setState({ showModal: false, confirmDelete: false, error: null });
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
      confirmDelete,
      error,
      itemsSelected,
      loading,
      confirmEmail
    } = this.state;
    const names = itemsSelected.map(item => item.name);
    const ids = itemsSelected.map(item => item.id);

    const displayName = names.join(', ');
    if (confirmDelete && !error) {
      return (
        <EmptyState
          content={`Delete ${displayName} from companies?  
          [Total: ${names.length}]`}
          svgToUse="cancel"
          buttonText="delete"
          buttonColor="google plus"
          onClick={() => {
            this.deleteCompanies(ids);
          }}
          buttonLoading={loading}
        />
      );
    }

    if (confirmEmail && !error) {
      return (
        <EmptyState
          content={`Mail Placement requests to ${displayName}?  
          [Total: ${names.length}]`}
          svgToUse="message"
          buttonText="Send"
          buttonColor="teal"
          onClick={() => {
            this.sendEmails(ids);
          }}
          buttonLoading={loading}
        />
      );
    }

    if (error && !confirmDelete) {
      return (
        <EmptyState content={error.errorMessage} svgToUse={error.svgToUse} />
      );
    }

    return null;
  }

  renderTableBody(data) {
    return data.map((student, index) => {
      const key = `company-${index}`;

      return (
        <Table.Row key={key}>
          <Table.Cell style={styles.boxStyle}>
            <Checkbox
              checked={!!this.state.checkedItems[index]}
              onChange={(event, data) => {
                const updatedCheckedItems = this.state.checkedItems;
                updatedCheckedItems[index] = !this.state.checkedItems[index];
                this.setState(
                  {
                    checkedItems: [...updatedCheckedItems]
                  },
                  () => {
                    this.onCheckBoxChange(data, student.user_id, student.name);
                  }
                );
              }}
            />
          </Table.Cell>
          <Table.Cell>
            {`${student.surname.toUpperCase()},  ${changeCase.capitalCase(
              student.other_names
            )}`}
          </Table.Cell>
          <Table.Cell>{student.index_number}</Table.Cell>
          <Table.Cell>{student.main_department_name}</Table.Cell>
          <Table.Cell>{student.sub_department_name}</Table.Cell>
          <Table.Cell>{student.address}</Table.Cell>
          <Table.Cell>{student.district}</Table.Cell>
          <Table.Cell>
            <div
              style={{
                ...styles.boxStyle
              }}
            >
              {!isEmpty(student.company_id) ? (
                <Icon name="checkmark" color="teal" />
              ) : (
                <Icon name="delete" color="red" />
              )}
            </div>
          </Table.Cell>

          <Table.Cell>
            <Button
              icon="eye"
              size="huge"
              onClick={() => this.props.onItemClick(student)}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <div className="company-list">
        <div className="company-list__table-container">
          <Table
            selectable
            sortable
            unstackable
            className="company-list__table"
            celled
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ width: '6rem' }}>
                  <Button
                    color="teal"
                    disabled={!arrayHasData(this.state.itemsSelected)}
                    icon="mail"
                    onClick={this.showConfirmEmailModal}
                    size="huge"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '3rem !important' }}>
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '2rem !important' }}>
                  Index Number
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '2rem !important' }}>
                  Main Department
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '5rem' }}>
                  Sub Department
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '3rem !important' }}>
                  Address
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '3rem !important' }}>
                  District
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '5rem' }}>
                  Placement Status
                </Table.HeaderCell>

                <Table.HeaderCell style={{ width: '5rem' }}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderTableBody(this.props.dataToShow)}
              <TableRow>
                <Table.Cell>
                  <Checkbox
                    onChange={(event, data) =>
                      this.onSelectAllItemsChecked(data)
                    }
                    checked={this.state.selectAllChecked}
                  />
                  <span>Select All</span>
                </Table.Cell>
              </TableRow>
            </Table.Body>
          </Table>
          {this.renderAnimatedModal()}
        </div>
      </div>
    );
  }
}

const styles = {
  boxStyle: {
    padding: '5px 10px 5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default StudentList;
