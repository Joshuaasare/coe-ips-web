/*
 * @Author: Joshua Asare
 * @Date: 2020-03-09 12:01:22
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-10 03:09:50
 */
import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Form, Button } from 'semantic-ui-react';
import {
  EmptyState,
  CenterPage,
  LocationWrapper
} from '../../_shared/components';
import { constants } from '../../_shared/constants';
import {
  uploadCompanyPlacementData,
  uploadCompanyPlacementDataWithLocation
} from './_helpers';
import { useDidUpdateEffect } from '../../_shared/hooks';
import { isEmpty } from '../../_shared/services';

type Props = {
  companyDetails: Object,
  cancelEdit: () => {},
  reload: () => {}
};

const PlacementAdditionForm = (props: Props) => {
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    id: props.companyDetails.companyId,
    name: props.companyDetails.companyName,
    placementLetterUrl: props.companyDetails.placementLetterUrl,
    locationId: props.companyDetails.locationId
  });

  const [companyLocationDetails, setCompanyLocationDetails] = useState({});

  const [placementLetter, setPlacementLetter] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadObserver = useRef(null);

  useEffect(() => {
    return () => {
      if (uploadObserver.current) {
        uploadObserver.current();
      }
    };
  }, []);

  const uploadData = async () => {
    setLoading(true);
    const resp = !isEmpty(companyLocationDetails)
      ? await uploadCompanyPlacementDataWithLocation(
          companyDetails,
          companyLocationDetails
        )
      : await uploadCompanyPlacementData(companyDetails);
    if (resp.error) {
      return handleErrors(resp.error);
    }
    return setUploadSuccess(true);
  };

  useDidUpdateEffect(uploadData, [companyDetails.placementLetterUrl]);

  const onPlacementLetterChange = event => {
    const file = event.target.files[0];
    if (file) {
      setPlacementLetter(file);
    }
  };

  const onLocationSelectChange = location => {
    setCompanyLocationDetails(location.locationDetails);
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
      .ref('company-placement-letters')
      .child(`${companyDetails.name} placement letter`)
      .getDownloadURL()
      .then(url => {
        setCompanyDetails({ ...companyDetails, placementLetterUrl: url });
      });
  };

  const onReload = () => {
    setError(null);
  };

  const onSaveClick = async () => {
    setLoading(true);
    handleFileUpload();
  };

  const handleFileUpload = () => {
    if (!companyDetails.placementLetterUrl && placementLetter) {
      const uploadTask = firebase
        .storage()
        .ref(
          `company-placement-letters/${companyDetails.name} placement letter`
        )
        .put(placementLetter);
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

  function renderContent() {
    const { placementLetterUrl } = companyDetails;
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
          <Form>
            <Form.Input
              size="large"
              label={
                placementLetter || placementLetterUrl
                  ? 'File Uploaded. Click to change'
                  : 'No File Uploaded. Upload request letter Now (PDF)'
              }
              type="file"
              name="requestLetter"
              placeholder="Request Letter"
              width={16}
              className="stud-reg__input file-input"
              onChange={onPlacementLetterChange}
              accept="application/pdf"
            />

            <LocationWrapper
              locationName={
                companyLocationDetails.address
                  ? companyLocationDetails.address
                  : props.companyDetails.location
              }
              onLocationSelectChange={onLocationSelectChange}
              initialRegion={{
                lat: parseFloat(props.companyDetails.lat),
                lng: parseFloat(props.companyDetails.lng)
              }}
            />
          </Form>

          <div className="button-container">
            <div className="button">
              <Button
                content="upload"
                icon="cloud upload"
                color="teal"
                size="massive"
                onClick={onSaveClick}
                loading={loading}
                disabled={
                  !(placementLetter || !isEmpty(companyLocationDetails))
                }
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

export default PlacementAdditionForm;
