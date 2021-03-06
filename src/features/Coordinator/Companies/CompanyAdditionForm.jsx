/*
 * @Author: Joshua Asare
 * @Date: 2020-01-31 18:43:13
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-10 02:44:18
 */

import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Form, Button } from 'semantic-ui-react';
import {
  CenterPage,
  EmptyState,
  LocationWrapper
} from '../../_shared/components';
import { useDidUpdateEffect } from '../../_shared/hooks';
import { constants } from '../../_shared/constants';
import { uploadCompanyData, uploadCompanyDataWithLocation } from './_helpers';
import { isEmpty } from '../../_shared/services';

type Props = {
  companyDetails: Object,
  reload: () => {},
  cancelEdit: () => {}
};

const CompanyAdditionForm = (props: Props) => {
  const [companyDetails, setCompanyDetails] = useState({
    id: props.companyDetails.id,
    name: props.companyDetails.name || '',
    email: props.companyDetails.email || '',
    phone: props.companyDetails.phone || '',
    locationId: props.companyDetails.location_id,
    postalAddress: props.companyDetails.postal_address || '',
    requestLetterUrl: props.companyDetails.request_letter_url || ''
  });

  const [companyLocationDetails, setCompanyLocationDetails] = useState({});
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const uploadObserver = useRef(null);

  useEffect(() => {
    return () => {
      if (uploadObserver.current) {
        uploadObserver.current();
      }
    };
  }, []);

  const [requestLetter, setRequestLetter] = useState(null);
  const [loading, setLoading] = useState(false);

  const onRequestLetterChange = event => {
    const file = event.target.files[0];
    if (file) {
      setRequestLetter(file);
    }
  };

  const onLocationSelectChange = location => {
    setCompanyLocationDetails(location.locationDetails);
  };

  const uploadData = async () => {
    setLoading(true);
    const resp = !isEmpty(companyLocationDetails)
      ? await uploadCompanyDataWithLocation(
          companyDetails,
          companyLocationDetails
        )
      : await uploadCompanyData(companyDetails);
    if (resp.error) {
      return handleErrors(resp.error);
    }
    return setUploadSuccess(true);
  };

  useDidUpdateEffect(uploadData, [companyDetails.requestLetterUrl]);

  const onChange = (e: any, { name, value }): void => {
    if (e) e.preventDefault();
    setCompanyDetails({ ...companyDetails, [name]: value });
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

  const handleFileUploadSuccess = () => {
    firebase
      .storage()
      .ref('placement-request-letters')
      .child(`${companyDetails.name} request letter`)
      .getDownloadURL()
      .then(url => {
        setCompanyDetails({ ...companyDetails, requestLetterUrl: url });
      });
  };

  const handleFileUpload = () => {
    if (!companyDetails.requestLetterUrl && requestLetter) {
      const uploadTask = firebase
        .storage()
        .ref(`placement-request-letters/${companyDetails.name} request letter`)
        .put(requestLetter);
      uploadObserver.current = uploadTask.on(
        'state_changed',
        uploadFileListenerSuccess,
        handleFileUploadError,
        handleFileUploadSuccess
      );
    } else {
      uploadData();
    }
  };

  function handleErrors(error) {
    if (error === constants.errors.UNAUTHENTICATED_USER) {
      setError({
        errorMessage:
          'Oops...You need to Login again before making this request',
        svgToUse: 'security',
        buttonText: 'Login'
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

  const onReload = () => {
    setError(null);
  };

  function renderPageData() {
    const {
      name,
      email,
      phone,
      postalAddress,
      requestLetterUrl
    } = companyDetails;
    return (
      <>
        <Form.Input
          label="Enter Company Name"
          fluid
          placeholder="Company Name"
          name="name"
          className="stud-reg__input"
          value={name}
          onChange={onChange}
        />

        <Form.Input
          label="Enter Postal Address"
          fluid
          placeholder="Postal Address"
          name="postalAddress"
          className="stud-reg__input"
          value={postalAddress}
          onChange={onChange}
        />

        <Form.Input
          label="Enter Phone Number"
          fluid
          placeholder="Phone Number"
          name="phone"
          className="stud-reg__input"
          value={phone}
          onChange={onChange}
        />

        <Form.Input
          label="Enter Email Address"
          fluid
          placeholder="Email Address"
          name="email"
          className="stud-reg__input"
          value={email}
          onChange={onChange}
        />

        <Form.Input
          size="large"
          label={
            requestLetter || requestLetterUrl
              ? 'File Uploaded. Click to change'
              : 'No File Uploaded. Upload request letter Now (PDF)'
          }
          type="file"
          name="requestLetter"
          placeholder="Request Letter"
          width={16}
          className="stud-reg__input file-input"
          onChange={onRequestLetterChange}
          accept="application/pdf"
        />

        <LocationWrapper
          locationName={
            companyLocationDetails.address
              ? companyLocationDetails.address
              : props.companyDetails.location_address
          }
          onLocationSelectChange={onLocationSelectChange}
          initialRegion={{
            lat: parseFloat(props.companyDetails.latitude),
            lng: parseFloat(props.companyDetails.longitude)
          }}
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
            content="Company Info Updated"
            buttonColor="teal"
            buttonText="Go back"
            onClick={props.reload}
          />
        </CenterPage>
      );
    }

    return (
      <div className="details-addition">
        <div className="details-addition__form">
          <Form>{renderPageData()}</Form>

          <div className="button-container">
            <div className="button">
              <Button
                content="upload"
                icon="cloud upload"
                color="teal"
                size="massive"
                onClick={onSaveClick}
                loading={loading}
                disabled={!companyDetails.name}
              />
            </div>

            <div className="button">
              <Button
                content="cancel"
                icon="close"
                color="google plus"
                size="massive"
                onClick={props.cancelEdit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{renderContent()}</div>;
};

export default CompanyAdditionForm;
