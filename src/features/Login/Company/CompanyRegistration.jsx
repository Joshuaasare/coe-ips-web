/*
 * @Author: Joshua Asare
 * @Date: 2020-02-04 09:52:47
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-06 12:18:40
 */
import React, { useEffect, useState } from 'react';
import { Form, Table, Input, Button } from 'semantic-ui-react';
import {
  MainContent,
  AnimatedModal,
  EmptyState,
  CenterPage,
  CustomMessage,
  Loader
} from '../../_shared/components';
import { images, svg } from '../../_shared/assets';
import { routes } from '../routes';
import {
  getPlacesFromSearchKey,
  getArchivedCompanyList,
  getLocationDetails,
  getSubDepartmentsList,
  isEmpty
} from '../../_shared/services';
import './css/companyRegistration.css';
import { LocationSelection } from '../Students';
import { constants } from '../../_shared/constants';
import { registerCompany } from './_helpers/dataService';
import { useScrollToTop } from '../../_shared/hooks';

type Props = {
  pushRoute: () => {}
};

const CompanyRegistration = (props: Props) => {
  useScrollToTop();
  const [pageLoading, setPageLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [companies, setCompanies] = useState({ data: [], options: [] });
  const [error, setError] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subDepartments, setSubDepartments] = useState([]);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [locationDetails, setLocationDetails] = useState({});
  const [companyDetails, setCompanyDetails] = useState({
    id: null,
    name: '',
    email: '',
    contact: '',
    postal_address: '',
    website: '',
    repName: '',
    repContact: '',
    repEmail: '',
    locationId: '',
    code: ''
  });

  useEffect(() => {
    fetchPlaces();
  }, [searchKey]);

  useEffect(() => {
    fetchCompaniesAndDepartments();
  }, []);

  async function fetchPlaces() {
    const resp = await getPlacesFromSearchKey(searchKey);
    if (!resp.error) {
      setPlaces(resp);
    } else {
      // setPlaces[]
    }
  }

  async function fetchCompaniesAndDepartments() {
    setPageLoading(true);
    const companyData = await getArchivedCompanyList();
    const subDepartmentsData = await getSubDepartmentsList();
    if (companyData.error) {
      return handleErrors(companyData.error);
    }

    if (subDepartmentsData.error) {
      return handleErrors(subDepartmentsData.error);
    }

    setError(null);
    setPageLoading(false);
    const subDept = subDepartmentsData.data.map(dep => {
      return {
        name: dep.name,
        id: dep.id,
        number: 0
      };
    });
    setSubDepartments(subDept);
    return setCompanies(companyData);
  }

  const onLocationChange = async (e: any, { name, value }): void => {
    setCompanyDetails({ ...companyDetails, [name]: value });
    const locationDetails = await getLocationDetails(value);
    return setLocationDetails({ ...locationDetails });
  };

  const onChange = (e: any, { name, value }): void => {
    if (e) e.preventDefault();
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const onSearchChange = (e: any, { searchQuery }): void => {
    setSearchKey(searchQuery);
  };

  const onSubDepartmentNumberChange = (data, index): void => {
    const dep = subDepartments;
    dep[index].number = data.value;
    setSubDepartments(dep);
  };

  const onCompanyChange = async (e: any, data): void => {
    const company = companies.data.find(item => item.id === data.value);
    const newData = {
      id: data.value,
      name: company.name || '',
      postal_address: company.postal_address || '',
      contact: company.phone || '',
      website: company.website || '',
      email: company.email || ''
    };
    setCompanyDetails({ ...companyDetails, ...newData });
  };

  function dataIsDirty() {
    const { name, repName, repContact } = companyDetails;
    return !name && !repName && !repContact;
  }

  const onModalOpen = () => {
    setVerifyOpen(true);
  };

  const onModalClose = () => {
    setVerifyOpen(false);
  };

  const onUpload = async () => {
    setUploadError(null);
    setLoading(true);
    const updatedDepartments = subDepartments.filter(
      dep => dep.number > 1 || dep.number === 1
    );
    const resp = await registerCompany(
      companyDetails,
      locationDetails,
      updatedDepartments
    );
    if (resp.error) {
      setLoading(false);
      return handleUploadErrors(resp.error);
    }
    setVerifyOpen(false);
    return setUploadSuccess(true);
  };

  function handleErrors(error) {
    if (error === constants.errors.UNAUTHENTICATED_USER) {
      return setError({
        errorMessage:
          'Oops...You need to Login again before making this request',
        svgToUse: 'security',
        buttonText: 'Login'
      });
    }
    if (error === constants.errors.NO_INTERNET_CONNECTION) {
      return setError({
        errorMessage: 'No internet Connection',
        svgToUse: 'broadcast',
        buttonText: 'Reconnect',
        onClick: () => fetchCompaniesAndDepartments()
      });
    }

    if (error === constants.errors.UNPROCCESSABLE_REQUEST) {
      return setError({
        errorMessage: 'An unexpected error occured. Please try again Later',
        svgToUse: 'robot',
        buttonText: 'retry'
      });
    }

    return setError({
      errorMessage: 'An unexpected error occured. Please try again Later',
      svgToUse: 'robot',
      buttonText: 'retry'
    });
  }

  function handleUploadErrors(error) {
    if (error === constants.errors.NO_INTERNET_CONNECTION) {
      return setUploadError({
        header: 'Connection Failed',
        message: 'Please check your internet connection and try again'
      });
    }
    if (error === constants.errors.UNAUTHENTICATED_USER) {
      return setUploadError({
        header: 'Invalid Code',
        message: 'Your verification code is Invalid'
      });
    }
    if (error === constants.errors.RESOURCE_NOT_FOUND) {
      return setUploadError({
        header: 'Contact',
        message: 'Your company has not been contacted'
      });
    }
    if (error === constants.errors.USER_EXISTS) {
      return setUploadError({
        header: 'Response given',
        message: 'Your company has already placed its request'
      });
    }
    if (error === constants.errors.UNPROCCESSABLE_REQUEST) {
      return setUploadError({
        header: 'Try Again',
        message:
          'There was a problem uploading the data. Please try again later'
      });
    }
    return setUploadError({
      header: 'Try Again',
      message: 'There was a problem uploading the data. Please try again later'
    });
  }

  function renderLocation() {
    const { locationId } = companyDetails;
    return (
      <>
        <Form.Select
          size="large"
          label="Search your Company Location (Required)"
          search
          name="locationId"
          placeholder="Search Company Location"
          width={16}
          className="stud-reg__select"
          onChange={onLocationChange}
          value={locationId}
          onSearchChange={onSearchChange}
          loading={!places && places !== []}
          options={places}
          required
        />

        <LocationSelection
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${constants.maps.API_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          locationId={locationId}
          locationDetails={locationDetails}
        />
      </>
    );
  }

  function renderTableBody() {
    return subDepartments.map((dep, index) => {
      const key = `sub-department-${index}`;
      return (
        <Table.Row key={key}>
          <Table.Cell style={styles.boxStyle}>{dep.name}</Table.Cell>
          <Table.Cell>
            <Input
              name={dep.name}
              className="stud-reg__input"
              defaultValue={dep.number}
              onChange={(event, data) => {
                if (event) event.preventDefault();
                onSubDepartmentNumberChange(data, index);
              }}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  function renderDepartments() {
    return (
      <div className="comp__reg-table">
        <span>Please select the number of students you need for per field</span>
        <Table selectable unstackable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={styles.headerCell}>
                Department
              </Table.HeaderCell>
              <Table.HeaderCell style={styles.headerCell}>
                Number Needed
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{renderTableBody()}</Table.Body>
        </Table>
      </div>
    );
  }

  function renderAnimatedModal() {
    return (
      <AnimatedModal
        onClose={onModalClose}
        onShow={onModalOpen}
        show={verifyOpen}
        centeredContent
      >
        <AnimatedModal.Header>
          <AnimatedModal.Title>
            <div className="wrapLogin__svg-container">
              <img src={svg.auth} className="wrapLogin__svg2" alt="" />
            </div>
          </AnimatedModal.Title>
        </AnimatedModal.Header>

        <AnimatedModal.Content>
          <div className="wrapLogin__password">
            <Form.Input
              size="large"
              label="Enter Verification Code"
              type="number"
              name="code"
              placeholder="Verification Code"
              className="stud-reg__input"
              onChange={onChange}
              value={companyDetails.code}
              required
              fluid
            />
            {!isEmpty(uploadError) && (
              <div className="message-container">
                <CustomMessage
                  negative
                  content={uploadError.message}
                  header={uploadError.header}
                />
              </div>
            )}
            <Button
              fluid
              size="massive"
              content="Upload"
              icon="cloud upload"
              color="teal"
              className="wrapLogin__password-button"
              onClick={onUpload}
              loading={loading}
            />
          </div>
        </AnimatedModal.Content>

        <AnimatedModal.Footer>{}</AnimatedModal.Footer>
      </AnimatedModal>
    );
  }

  function renderContent() {
    const { repEmail, repContact, repName } = companyDetails;
    if (pageLoading) {
      return (
        <CenterPage>
          <Loader inverted coverEverything active content="Please wait" />
        </CenterPage>
      );
    }
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

    if (uploadSuccess) {
      return (
        <CenterPage>
          <EmptyState
            svgToUse="success"
            content="Data uploaded Successfully. Thank you"
            buttonColor="teal"
            buttonText="Go back"
          />
        </CenterPage>
      );
    }

    return (
      <div className="comp__reg-form">
        <Form>
          <Form.Select
            size="large"
            search
            label="Search Company (Required)"
            name="company"
            placeholder="Search your company"
            className="stud-reg__select company-select"
            required
            loading={!companies.options && companies.options !== []}
            options={companies.options}
            onChange={onCompanyChange}
          />

          <Form.Input
            size="large"
            label="Representative Name (Required)"
            type="text"
            name="repName"
            placeholder="Representative Name"
            width={16}
            className="stud-reg__input"
            value={repName}
            onChange={onChange}
            required
          />
          <Form.Input
            size="large"
            label="Representative Email"
            type="text"
            name="repEmail"
            placeholder="Representative Email"
            width={16}
            className="stud-reg__input"
            value={repEmail}
            onChange={onChange}
          />

          <Form.Input
            size="large"
            label="Representative Contact (Required)"
            type="text"
            name="repContact"
            placeholder="Representative Contact"
            width={16}
            className="stud-reg__input"
            value={repContact}
            onChange={onChange}
            required
          />

          {renderLocation()}
          {renderDepartments()}
          {renderAnimatedModal()}
        </Form>

        <Button
          content="Upload"
          icon="cloud upload"
          color="teal"
          fluid
          size="massive"
          className="upload-button"
          disabled={dataIsDirty()}
          onClick={onModalOpen}
        />
      </div>
    );
  }

  function renderToolbar() {
    return (
      <div className="registration__toolbar">
        <div onClick={() => props.pushRoute(routes.LANDING.path)}>
          <img src={images.coeLogo} alt="" className="toolbar-logo" />
        </div>
      </div>
    );
  }

  return <MainContent toolbar={renderToolbar()}>{renderContent()}</MainContent>;
};

const styles = {
  boxStyle: {
    padding: '5px 10px 5px 10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.4rem',
    fontWeight: '600'
  },
  headerCell: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'teal'
  }
};

export default CompanyRegistration;
