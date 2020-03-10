/*
 * @Author: Joshua Asare
 * @Date: 2020-01-26 17:57:43
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-03 13:33:20
 */

import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { Table, Button, Checkbox, Icon, TableRow } from 'semantic-ui-react';
import { deleteFromCompanyArchive, sendPlacementRequests } from './_helpers';
import { AnimatedModal, EmptyState } from '../../_shared/components';
import { constants } from '../../_shared/constants';
import { arrayHasData, isEmpty } from '../../_shared/services';
import {
  GeneralPlacementRequest,
  SpecialRequestLetter
} from '../../_shared/letters';

type Props = {
  dataToShow: Array<{}>,
  refreshList: () => {},
  onItemClick: () => {}
};

class CompanyList extends Component<Props> {
  state = {
    loading: false,
    itemsSelected: [],
    confirmDelete: false,
    confirmEmail: false,
    error: null,
    showModal: false,
    checkedItems: [],
    selectAllChecked: false,
    generalLetterLoading: false
  };

  constructor(props) {
    super(props);
    this.generalLetterRef = React.createRef();
  }

  componentDidUpdate(newProps) {
    if (newProps.dataToShow !== this.props.dataToShow) {
      this.resetState();
    }
  }

  deleteCompanies = async ids => {
    this.setState({ loading: true });
    const resp = await deleteFromCompanyArchive(ids);
    if (!resp.error) {
      return this.props.refreshList();
    }
    this.setState({ confirmDelete: false, loading: false });
    return this.handleErrors(resp.error);
  };

  sendEmails = async ids => {
    this.setState({ loading: true });
    const resp = await sendPlacementRequests(ids);
    if (!resp.error) {
      return this.props.refreshList();
    }
    this.setState({ confirmEmail: false, loading: false });
    return this.handleErrors(resp.error);
  };

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

  renderLetter() {
    return (
      <div className="letter-hidden">
        <SpecialRequestLetter ref={this.generalLetterRef} />
      </div>
    );
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
    return data.map((company, index) => {
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
                    this.onCheckBoxChange(data, company.id, company.name);
                  }
                );
              }}
            />
          </Table.Cell>
          <Table.Cell>{company.name}</Table.Cell>
          <Table.Cell>{company.postal_address}</Table.Cell>

          <Table.Cell>{company.location_address}</Table.Cell>
          <Table.Cell>{company.email}</Table.Cell>
          <Table.Cell>{company.phone}</Table.Cell>
          <Table.Cell>
            <div
              style={{
                ...styles.boxStyle
              }}
            >
              {!isEmpty(company.request_letter_url) ? (
                <Icon name="checkmark" color="teal" />
              ) : (
                <Icon name="delete" color="red" />
              )}
            </div>
          </Table.Cell>
          <Table.Cell>
            <div
              style={{
                ...styles.boxStyle
              }}
            >
              {company.contact_made === 1 ? (
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
              onClick={() => this.props.onItemClick(company)}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <div className="company-list">
        <div className="list__table-container">
          <Table selectable sortable unstackable className="list__table" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ width: '6rem' }}>
                  <Button
                    color="google plus"
                    disabled={!arrayHasData(this.state.itemsSelected)}
                    icon="trash"
                    onClick={this.showConfirmDeleteModal}
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
                <Table.HeaderCell style={{ width: '4rem !important' }}>
                  Company Name
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '3rem !important' }}>
                  Postal Address
                </Table.HeaderCell>

                <Table.HeaderCell style={{ width: '3rem !important' }}>
                  Company Location
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '2rem !important' }}>
                  Email Address
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '2rem !important' }}>
                  Phone
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '.5rem !important' }}>
                  Request Letter Uploaded
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: '.5rem !important' }}>
                  Contact Status
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
          {this.renderLetter()}

          <ReactToPrint
            trigger={() => (
              <Button
                content="General Letter"
                size="massive"
                icon="cloud download"
                loading={this.state.generalLetterLoading}
              />
            )}
            copyStyles
            content={() => this.generalLetterRef.current}
            onBeforeGetContent={() => {
              this.setState({ generalLetterLoading: true });
              this.generalLetterRef.current.setDocumentTitle();
            }}
            onBeforePrint={() => {
              this.setState({ generalLetterLoading: false });
            }}
            onAfterPrint={() =>
              this.generalLetterRef.current.removeDocumentTitle()
            }
          />
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

export default CompanyList;
