/*
 * @Author: Joshua Asare
 * @Date: 2020-01-19 10:00:05
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-04-19 10:00:54
 *
 * Higher Order Component to wrap list of students, companies and placements
 */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import {
  CenterPage,
  EmptyState,
  Loader,
  Pagination,
  MainContainer,
  ButtonBar,
  AnimatedModal,
  Ikon
} from '../components';
import './css/wrapAdvancedList.css';
import { constants } from '../constants';
import { isEmpty } from '../services';

type Props = {};

export default function wrapAdvancedList(
  List: Component | Function,
  DetailsView: Component | Function,
  FilterView: Component | Function,
  MapView: Component | Function,
  getItems: Function,
  customSearchFunction?: Function,
  passThroughProps?: Object = {}
) {
  class AdvancedList extends Component<Props> {
    state = {
      showLoader: true,
      activeItem: null,
      showActiveItem: false,
      activePage: 1,
      pageSize: 12,
      data: null,
      dataSize: null,
      originalData: null,
      filteredData: null,
      dataToRender: null,
      error: null,
      searchTerm: '',
      showFilter: false,
      showMap: false
    };

    constructor(props) {
      super(props);
      if (customSearchFunction) this.searchFunction = customSearchFunction;
      else this.searchFunction = this.searchItems;
    }

    componentDidMount() {
      this.initPageData(this.props);
    }

    handleErrors(error) {
      if (error === constants.errors.UNAUTHENTICATED_USER) {
        return this.setState({
          error: {
            errorMessage:
              'Oops...You need to Login again before accessing this page',
            svgToUse: 'security',
            buttonText: 'Login',
            onClick: this.initPageData
          },
          showLoader: false
        });
      }

      if (error === constants.errors.NO_INTERNET_CONNECTION) {
        return this.setState({
          error: {
            errorMessage: 'No internet Connection',
            svgToUse: 'broadcast',
            buttonText: 'Reconnect',
            onClick: this.initPageData
          },
          showLoader: false
        });
      }

      return this.setState({
        error: {
          errorMessage: 'An unexpected error occured. Please try again Later',
          svgToUse: 'robot',
          buttonText: 'retry',
          onClick: this.initPageData
        },
        showLoader: false
      });
    }

    /**
     * !this function reloads the data whiles maintaining the active page
     */
    initPageData = async () => {
      this.setState({
        showLoader: true,
        showActiveItem: false,
        showFilter: false
      });

      setTimeout(async () => {
        const resp = await getItems();
        if (resp.error) {
          this.handleErrors(resp.error);
        } else {
          this.setState({ originalData: resp.data, data: resp.data });

          if (!isEmpty(this.state.searchTerm)) {
            const newData = await this.searchFunction(
              this.state.searchTerm,
              resp.data
            );
            this.setPageData(newData);
          } else {
            this.setPageData(resp.data);
          }
        }
      }, 500);
    };

    /** this function resets the page data whiles maintaining the active page */
    updatePageData = async () => {
      this.setState({
        showLoader: true,
        showActiveItem: false,
        showFilter: false,
        filteredData: null
      });

      setTimeout(async () => {
        const resp = await getItems();
        if (resp.error) {
          this.handleErrors(resp.error);
        } else {
          this.setState({ originalData: resp.data, data: resp.data });

          if (!isEmpty(this.state.searchTerm)) {
            const newData = await this.searchFunction(
              this.state.searchTerm,
              resp.data
            );
            this.setPageData(newData);
          } else {
            this.resetPageData(resp.data);
          }
        }
      }, 500);
    };

    showFilter = () => {
      this.setState({ showFilter: true });
    };

    hideFilter = () => {
      this.setState({ showFilter: false });
    };

    showActiveItem = () => {
      this.setState({ showActiveItem: true });
    };

    hideActiveItem = () => {
      this.setState({ showActiveItem: false });
    };

    showMap = () => {
      this.setState({ showMap: true });
    };

    hideMap = () => {
      this.setState({ showMap: false });
    };

    onItemClick = item => {
      this.setState({ activeItem: item, showActiveItem: true });
    };

    setPageData(data) {
      this.setState(prevState => ({
        activePage: 1,
        data,
        dataSize: data.length,
        dataToRender: data.slice(0, prevState.pageSize),
        showLoader: false
      }));
    }

    resetPageData(data) {
      this.setState(prevState => ({
        activePage: prevState.activePage,
        data,
        dataSize: data.length,
        dataToRender: data.slice(
          (prevState.activePage - 1) * prevState.pageSize,
          prevState.activePage * prevState.pageSize
        ),
        showLoader: false
      }));
    }

    onPaginationChange = pageNumber => {
      const { pageSize, data } = this.state;
      const start = (pageNumber - 1) * pageSize;
      const end = pageNumber * pageSize;
      this.setState({
        dataToRender: data.slice(start, end),
        activePage: pageNumber
      });
    };

    refreshList = async resp => {
      console.log('refresh', resp);
      if (resp.error) {
        return this.handleErrors(resp.error);
      }
      return this.setState(
        {
          filteredData: resp
        },
        async () => {
          if (!isEmpty(this.state.searchTerm)) {
            const newData = await this.searchFunction(
              this.state.searchTerm,
              resp
            );
            return this.setPageData(newData);
          }
          return this.setPageData(resp);
        }
      );
    };

    handleSearchInputChange = async (e, { value }) => {
      this.setState({ searchTerm: value });
      const dataToSearch = this.state.filteredData || this.state.originalData;
      const filteredData = await this.searchFunction(value, dataToSearch);
      return this.setPageData(filteredData);
    };

    searchItems(searchTerm, originalData) {
      return originalData.filter(item => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }

    renderRightButtons() {
      return (
        <div className="buttons-container">
          <Input
            onChange={this.handleSearchInputChange}
            icon="search"
            placeholder="Search"
            value={this.state.searchTerm}
          />
        </div>
      );
    }

    renderLeftButtons() {
      return (
        <div className="flex__row">
          <div
            className="buttons-container u-margin-right-standard"
            onClick={this.showFilter}
          >
            <Ikon
              name="filter_list"
              color="maroon"
              className="buttons-container__icon"
            />
            <span className="buttons-container__text">Open Filter</span>
          </div>

          <div className="buttons-container" onClick={this.showMap}>
            <Ikon
              name="location2"
              color="maroon"
              className="buttons-container__icon"
            />
            <span className="buttons-container__text">Open Map</span>
          </div>
        </div>
      );
    }

    renderToolbar() {
      return (
        <ButtonBar
          leftButtons={this.renderLeftButtons()}
          rightButtons={this.renderRightButtons()}
        />
      );
    }

    renderFooter() {
      const { activePage, pageSize, dataSize, showLoader } = this.state;
      if (!showLoader && dataSize > pageSize) {
        return (
          <Pagination
            activePage={activePage}
            itemsCountPerPage={pageSize}
            totalItemsCount={dataSize}
            onChange={this.onPaginationChange}
          />
        );
      }
      return null;
    }

    renderDetailsView() {
      return (
        <AnimatedModal
          onClose={this.hideActiveItem}
          onShow={this.showActiveItem}
          show={this.state.showActiveItem}
        >
          <AnimatedModal.Content>
            <DetailsView
              activeItem={this.state.activeItem}
              reload={this.updatePageData}
            />
          </AnimatedModal.Content>
          <AnimatedModal.Footer>{}</AnimatedModal.Footer>
        </AnimatedModal>
      );
    }

    renderFilterView() {
      return (
        <AnimatedModal
          onClose={this.hideFilter}
          onShow={this.showFilter}
          show={this.state.showFilter}
        >
          <AnimatedModal.Header>
            <AnimatedModal.Title>Filters</AnimatedModal.Title>
          </AnimatedModal.Header>
          <AnimatedModal.Content>
            <FilterView
              {...this.props}
              {...passThroughProps}
              originalData={this.state.originalData}
              refreshList={this.refreshList}
            />
          </AnimatedModal.Content>
          <AnimatedModal.Footer>{}</AnimatedModal.Footer>
        </AnimatedModal>
      );
    }

    renderMapView() {
      return (
        <AnimatedModal
          onClose={this.hideMap}
          onShow={this.showMap}
          show={this.state.showMap}
        >
          <AnimatedModal.Header>
            <AnimatedModal.Title>Distribution on Map</AnimatedModal.Title>
          </AnimatedModal.Header>
          <AnimatedModal.Content>
            <MapView
              {...this.props}
              {...passThroughProps}
              data={this.state.filteredData || this.state.data}
            />
          </AnimatedModal.Content>
          <AnimatedModal.Footer>{}</AnimatedModal.Footer>
        </AnimatedModal>
      );
    }

    renderContent() {
      const { error, showLoader } = this.state;
      if (error) {
        return (
          <CenterPage>
            <EmptyState
              svgToUse={error.svgToUse}
              content={error.errorMessage}
              buttonColor="red"
              buttonText={error.buttonText}
              onClick={error.onClick}
            />
          </CenterPage>
        );
      }

      if (showLoader) {
        return (
          <CenterPage>
            <Loader active coverEverything inverted content="loading data..." />
          </CenterPage>
        );
      }

      return (
        <MainContainer
          toolbar={this.renderToolbar()}
          footer={this.renderFooter()}
        >
          <List
            {...this.props}
            {...passThroughProps}
            pageSize={this.state.pageSize}
            activePage={this.state.activePage}
            dataToShow={this.state.dataToRender}
            refreshList={this.updatePageData}
            onItemClick={this.onItemClick}
          />
          {this.renderFilterView()}
          {this.renderDetailsView()}
          {this.renderMapView()}
        </MainContainer>
      );
    }

    render() {
      return <div className="advanced-list">{this.renderContent()}</div>;
    }
  }

  return AdvancedList;
}
