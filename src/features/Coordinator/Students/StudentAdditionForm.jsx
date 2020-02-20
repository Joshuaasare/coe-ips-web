/*
 * @Author: Joshua Asare
 * @Date: 2020-02-20 03:30:36
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-20 16:23:33
 */

import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { constants } from '../../_shared/constants';
import {
  EmptyState,
  CenterPage,
  Ikon,
  LocationWrapper
} from '../../_shared/components';
import { isEmpty } from '../../_shared/services';
import { uploadStudentData, uploadStudentDataWithLocation } from './_helpers';

type Props = {
  studentInfo: Object,
  reload: () => {},
  cancelEdit: () => {}
};

const StudentAdditionForm = (props: Props) => {
  const { studentInfo } = props;
  const [studentDetails, setStudentDetails] = useState({
    id: studentInfo.user_id,
    locationId: studentInfo.location_id,
    surname: studentInfo.surname,
    otherNames: studentInfo.other_names,
    email: studentInfo.email,
    indexNumber: studentInfo.index_number,
    phone: studentInfo.phone,
    address: studentInfo.address
  });

  const [studentLocationDetails, setStudentLocationDetails] = useState({});
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [loading, setLoading] = useState(false);

  const onLocationSelectChange = location => {
    setStudentLocationDetails(location.locationDetails);
  };

  const onChange = (e: any, { name, value }): void => {
    if (e) e.preventDefault();
    setStudentDetails({ ...studentDetails, [name]: value });
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

  const OnUploadData = async () => {
    setLoading(true);
    const resp = !isEmpty(studentLocationDetails)
      ? await uploadStudentDataWithLocation(
          studentDetails,
          studentLocationDetails
        )
      : await uploadStudentData(studentDetails);

    if (resp.error) {
      return handleErrors(resp.error);
    }
    return setUploadSuccess(true);
  };

  function dataIsDirty() {
    const {
      surname,
      otherNames,
      phone,
      email,
      indexNumber,
      address
    } = studentDetails;
    return !(surname && otherNames && phone && email && indexNumber && address);
  }

  function renderPageData(activePage) {
    const { email, surname, otherNames, phone, indexNumber } = studentDetails;
    if (activePage === 0) {
      return (
        <>
          <Form.Input
            label="Enter Surname"
            fluid
            placeholder="Surname"
            name="surname"
            className="stud-reg__input"
            value={surname}
            onChange={onChange}
          />

          <Form.Input
            label="Enter Other Names"
            fluid
            placeholder="Other Names"
            name="otherNames"
            className="stud-reg__input"
            value={otherNames}
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
            label="Enter Index Number"
            fluid
            placeholder="Index Number"
            name="indexNumber"
            className="stud-reg__input"
            value={indexNumber}
            onChange={onChange}
          />
        </>
      );
    }

    if (activePage === 1) {
      return (
        <LocationWrapper
          onLocationSelectChange={onLocationSelectChange}
          locationName={studentLocationDetails.address || studentInfo.address}
        />
      );
    }
    return null;
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
          <div className="nav-buttons-container">
            <div className="backwards">
              {activePage !== 0 && (
                <div
                  className="nav-buttons backward-button"
                  onClick={() => setActivePage(activePage - 1)}
                >
                  <Ikon name="chevron-left2" size={1.5} color="teal" />
                </div>
              )}
            </div>
            <span>{`Page ${activePage + 1}`}</span>
            <div className="forward">
              {activePage !== 1 && (
                <div
                  className="nav-buttons forward-button"
                  onClick={() => setActivePage(activePage + 1)}
                >
                  <Ikon name="chevron-right2" size={1.5} color="teal" />
                </div>
              )}
            </div>
          </div>

          <Form>{renderPageData(activePage)}</Form>

          <div className="button-container">
            <div className="button">
              <Button
                content="upload"
                icon="cloud upload"
                color="teal"
                size="massive"
                loading={loading}
                disabled={dataIsDirty()}
                onClick={OnUploadData}
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

export default StudentAdditionForm;
