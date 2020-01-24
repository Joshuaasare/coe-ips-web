/*
 * @Author: Joshua Asare
 * @Date: 2020-01-07 15:38:52
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-23 18:05:19
 */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Accordion, Icon } from 'semantic-ui-react';
import firebase from 'firebase/app';
import 'firebase/storage';
import {
  CenterPage,
  EmptyState,
  CircularButton
} from '../../_shared/components';
import { LocationSelection } from '../../Login/Students';
import { constants } from '../../_shared/constants';
import {
  getPlacesFromSearchKey,
  getLocationDetails,
  isEmpty
} from '../../_shared/services';
import { useDidUpdateEffect } from '../../_shared/hooks';
import {
  addStudenCompanyData,
  updateStudentCompanyData
} from './_helpers/dataService';
import './css/companyForm.css';

type Props = {
  initialCompanyState: Object,
  onBackButtonClick: () => {},
  studentData: Object,
  editing?: boolean,
  goToLogin: () => {},
  replaceRoute: () => {},
  onCompanyStatusChange: () => {},
  companyLocationDetails?: Object
};

const CompanyForm = (props: Props) => {
  const {
    initialCompanyState,
    studentData,
    onBackButtonClick,
    editing,
    goToLogin,
    onCompanyStatusChange,
    companyLocationDetails
  } = props;

  const uploadObserver = useRef(null);

  const [companyDetails, setCompanyDetails] = useState(initialCompanyState);
  const [error, setError] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [locationDetails, setLocationDetails] = useState({
    ...companyLocationDetails
  });
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);

  const {
    name,
    email,
    contact,
    website,
    address,
    repName,
    repContact,
    repEmail,
    locationId,
    acceptanceLetter,
    acceptanceLetterUrl,
    supervisorName,
    supervisorEmail,
    supervisorContact
  } = companyDetails;

  useEffect(() => {
    fetchPlaces();
  }, [searchKey]);

  useEffect(() => {
    return () => {
      if (uploadObserver.current) {
        uploadObserver.current();
      }
    };
  }, []);

  const upLoadCompanyData = async () => {
    const resp = editing
      ? await updateStudentCompanyData(
          { ...companyDetails, acceptanceLetter: null },
          locationDetails
        )
      : await addStudenCompanyData(
          { ...companyDetails, acceptanceLetter: null },
          locationDetails
        );
    if (resp.error) {
      return handleErrors(resp.error);
    }
    return onUploadCompanyDataSuccess();
  };

  useDidUpdateEffect(upLoadCompanyData, [acceptanceLetterUrl]);

  async function fetchPlaces() {
    const resp = await getPlacesFromSearchKey(searchKey);
    if (!resp.error) {
      setPlaces(resp);
    } else {
      // setPlaces([]);
    }
  }

  const onReload = () => {
    setError(null);
  };

  const onUploadCompanyDataSuccess = () => {
    setUploadSuccess(true);
  };

  function handleErrors(error) {
    if (error === constants.errors.UNAUTHENTICATED_USER) {
      setError({
        errorMessage:
          'Oops...You need to Login again before making this request',
        svgToUse: 'security',
        buttonText: 'Login',
        onClick: goToLogin
      });
      return setLoading(false);
    }
    if (error === constants.errors.NO_INTERNET_CONNECTION) {
      setError({
        errorMessage: 'No internet Connection',
        svgToUse: 'broadcast',
        buttonText: 'Reconnect',
        onClick: onReload
      });

      return setLoading(false);
    }

    if (error === constants.errors.UNPROCCESSABLE_REQUEST) {
      setError({
        errorMessage: 'An unexpected error occured. Please try again Later',
        svgToUse: 'robot',
        buttonText: 'retry',
        onClick: onReload
      });

      return setLoading(false);
    }
    setError({
      errorMessage: 'An unexpected error occured. Please try again Later',
      svgToUse: 'robot',
      buttonText: 'retry',
      onClick: onReload
    });

    return setLoading(false);
  }

  const onChange = (e: any, { name, value }): void => {
    if (e) e.preventDefault();
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const onLocationChange = async (e: any, { name, value }): void => {
    setCompanyDetails({ ...companyDetails, [name]: value });
    const locationDetails = await getLocationDetails(value);

    if (editing) {
      return setLocationDetails({
        ...locationDetails,
        id: companyLocationDetails.id
      });
    }
    return setLocationDetails({ ...locationDetails });
  };

  const onSearchChange = (e: any, { searchQuery }): void => {
    setSearchKey(searchQuery);
  };

  const onAcceptanceLetterChange = event => {
    const file = event.target.files[0];
    if (file) {
      setCompanyDetails({ ...companyDetails, acceptanceLetter: file });
    }
  };

  const onSaveClick = async () => {
    setLoading(true);
    handleFileUpload();
  };

  const uploadFileListenerSuccess = snapshot => {
    // const progress = Math.round(
    //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    // );
    // setUploadProgress(progress);
  };

  const handleFileUploadError = error => {};

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeAccordionIndex === index ? -1 : index;
    setActiveAccordionIndex(newIndex);
  };

  const handleFileUploadSuccess = () => {
    firebase
      .storage()
      .ref('acceptance-letters')
      .child(`${studentData.indexNumber}_acceptance-letter`)
      .getDownloadURL()
      .then(url => {
        setCompanyDetails({ ...companyDetails, acceptanceLetterUrl: url });
      });
  };

  const handleFileUpload = () => {
    if (!acceptanceLetterUrl && acceptanceLetter) {
      const uploadTask = firebase
        .storage()
        .ref(`acceptance-letters/${studentData.indexNumber}_acceptance-letter`)
        .put(acceptanceLetter);
      uploadObserver.current = uploadTask.on(
        'state_changed',
        uploadFileListenerSuccess,
        handleFileUploadError,
        handleFileUploadSuccess
      );
    } else {
      upLoadCompanyData();
    }
  };

  const dataIsDirty = () =>
    editing
      ? !(name && email && contact && contact.trim().length === 10)
      : !(
          name &&
          email &&
          contact &&
          contact.trim().length === 10 &&
          locationId
        );

  function renderEditingLocation() {
    return (
      <>
        <Form.Select
          size="large"
          label={
            isEmpty(companyLocationDetails.displayName)
              ? 'Search company Location'
              : companyLocationDetails.displayName
          }
          search
          name="locationId"
          placeholder="Search to change location"
          width={16}
          className="stud-reg__select"
          onChange={onLocationChange}
          value={locationId}
          onSearchChange={onSearchChange}
          loading={!places && places !== []}
          options={places}
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

  function renderLocation() {
    return (
      <>
        <Form.Select
          size="large"
          label="Enter your Company Location (Required)"
          search
          // type="text"
          name="locationId"
          placeholder="Search Company Location"
          width={16}
          className="stud-reg__select"
          onChange={onLocationChange}
          value={locationId}
          onSearchChange={onSearchChange}
          loading={!places && places !== []}
          options={places}
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

  function renderContent() {
    if (error && !loading) {
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
            content={
              editing
                ? 'Company Info Updated Successfully'
                : 'Company Registered Successfuly'
            }
            buttonColor="teal"
            buttonText="Go back"
            onClick={onCompanyStatusChange}
          />
        </CenterPage>
      );
    }

    return (
      <div className="company-form">
        <div className="company-form__back" onClick={onBackButtonClick}>
          <CircularButton size={6} iconName="arrow_back" iconSize={2} />
        </div>

        <div className="stud-reg">
          <div className="stud-reg__forms-modified">
            <Form>
              <Accordion styled fluid>
                <Accordion.Title
                  active={activeAccordionIndex === 0}
                  index={0}
                  onClick={handleClick}
                >
                  <Icon name="dropdown" color="teal" />
                  <span className="accordion__title">
                    Fill Basic Company Information
                  </span>
                </Accordion.Title>

                <Accordion.Content active={activeAccordionIndex === 0}>
                  <Form.Input
                    size="large"
                    label="Company Name (Required)"
                    type="text"
                    name="name"
                    placeholder="Company Name"
                    width={16}
                    className="stud-reg__input"
                    value={name}
                    onChange={onChange}
                    required
                  />
                  <Form.Input
                    size="large"
                    label="Company Email (Required)"
                    type="email"
                    name="email"
                    placeholder="Company Email"
                    width={16}
                    className="stud-reg__input"
                    value={email}
                    onChange={onChange}
                    required
                  />

                  <Form.Input
                    size="large"
                    label="Company Contact (Required)"
                    type="text"
                    name="contact"
                    placeholder="Company Contact"
                    width={16}
                    className="stud-reg__input"
                    value={contact}
                    onChange={onChange}
                    required
                  />
                  <Form.Input
                    size="large"
                    label="Company Website"
                    type="text"
                    name="website"
                    placeholder="Company Website"
                    width={16}
                    className="stud-reg__input"
                    value={website}
                    onChange={onChange}
                  />

                  <Form.Input
                    size="large"
                    label="Company Address"
                    type="text"
                    name="address"
                    placeholder="Company Address"
                    width={16}
                    className="stud-reg__input"
                    value={address}
                    onChange={onChange}
                    required
                  />

                  <Form.Input
                    size="large"
                    label="Company Representative Name"
                    type="text"
                    name="repName"
                    placeholder="Company Rep Name"
                    width={16}
                    className="stud-reg__input"
                    value={repName}
                    onChange={onChange}
                  />
                  <Form.Input
                    size="large"
                    label="Company Representative Contact"
                    type="text"
                    name="repContact"
                    placeholder="Company Rep Contact"
                    width={16}
                    className="stud-reg__input"
                    value={repContact}
                    onChange={onChange}
                  />
                  <Form.Input
                    size="large"
                    label="Company Representative Email"
                    type="text"
                    name="repEmail"
                    placeholder="Company Rep Email"
                    width={16}
                    className="stud-reg__input"
                    value={repEmail}
                    onChange={onChange}
                  />

                  <Form.Input
                    size="large"
                    label={
                      acceptanceLetterUrl || acceptanceLetter
                        ? 'File Uploaded. Click to change'
                        : 'No File Uploaded. Upload Acceptance letter Now (PDF)'
                    }
                    type="file"
                    name="acceptanceLetter"
                    placeholder="Acceptance Letter"
                    width={16}
                    className="stud-reg__input"
                    onChange={onAcceptanceLetterChange}
                    accept="application/pdf"
                  />
                </Accordion.Content>

                <Accordion.Title
                  active={activeAccordionIndex === 1}
                  index={1}
                  onClick={handleClick}
                >
                  <Icon name="dropdown" color="teal" />
                  <span className="accordion__title">
                    Fill Location of Company
                  </span>
                </Accordion.Title>

                <Accordion.Content active={activeAccordionIndex === 1}>
                  {editing ? renderEditingLocation() : renderLocation()}
                </Accordion.Content>

                {editing ? (
                  <>
                    <Accordion.Title
                      active={activeAccordionIndex === 2}
                      index={2}
                      onClick={handleClick}
                    >
                      <Icon name="dropdown" color="teal" />
                      <span className="accordion__title">
                        Update Supervisor Details
                      </span>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccordionIndex === 2}>
                      <Form.Input
                        size="large"
                        label="Supervisor Name"
                        type="text"
                        name="supervisorName"
                        placeholder="Supervisor Name"
                        width={16}
                        className="stud-reg__input"
                        value={supervisorName}
                        onChange={onChange}
                        required
                      />

                      <Form.Input
                        size="large"
                        label="Supervisor Contact"
                        type="text"
                        name="supervisorContact"
                        placeholder="Supervisor Contact"
                        width={16}
                        className="stud-reg__input"
                        value={supervisorContact}
                        onChange={onChange}
                        required
                      />

                      <Form.Input
                        size="large"
                        label="Supervisor Email"
                        type="text"
                        name="supervisorEmail"
                        placeholder="Supervisor Email"
                        width={16}
                        className="stud-reg__input"
                        value={supervisorEmail}
                        onChange={onChange}
                        required
                      />
                    </Accordion.Content>
                  </>
                ) : null}
              </Accordion>
            </Form>

            <div className="company-form__btns">
              <Button
                content="Upload"
                icon="cloud upload"
                fluid
                color="google plus"
                size="massive"
                onClick={onSaveClick}
                loading={loading}
                disabled={dataIsDirty()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{renderContent()}</div>;
};

CompanyForm.defaultProps = {
  editing: false,
  companyLocationDetails: {}
};

export default CompanyForm;
