/*
 * @Author: Joshua Asare
 * @Date: 2019-11-17 15:52:24
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-27 14:31:07
 *
 *
 * @flow
 */
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import {
  MainContent,
  CircularButton,
  Icon,
  CustomMessage
} from '../../_shared/components';
import form from '../../_shared/assets/svg/list.svg';
import coeLogo from '../../_shared/assets/images/coe-logo.png';
import { PersonalInfoForm, AcademicForm, LocationSelection } from '.';
import CredentialsForm from './CredentialsForm';
import {
  getPlacesFromSearchKey,
  getLocationDetails
} from '../../_shared/services';
import { constants } from '../../_shared/constants';
import { registerStudents } from './_helpers';
import { routes } from '../routes';
import { getErrorMessages } from '../../_shared/errorMessages';
import './css/studentRegistration.css';

type Props = {
  pushRoute: () => {}
};

const StudentRegistration = (props: Props) => {
  const { pushRoute } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [locationDetails, setLocationDetails] = useState({});
  const [places, setPlaces] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [studentData, setStudentData] = useState({
    surname: '',
    otherNames: '',
    indexNumber: null,
    department: '',
    programme: '',
    haveCompany: null,
    acadYear: null,
    foreignStudent: null,
    yearOfStudy: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    locationId: null,
    controlledProgramme: ''
  });

  useEffect(() => {
    fetchPlaces();
  }, [searchKey]);

  async function fetchPlaces() {
    const resp = await getPlacesFromSearchKey(searchKey);
    if (!resp.error) {
      setPlaces(resp);
    } else {
      // setPlaces([]);
    }
  }

  function renderToolbar() {
    return (
      <div
        className="registration__toolbar"
        onClick={() => props.pushRoute(routes.LANDING.path)}
      >
        <img src={coeLogo} alt="" className="toolbar-logo" />
      </div>
    );
  }

  function renderFormControlItem(active, last) {
    return (
      <>
        <CircularButton
          size={3}
          backgroundColor={active ? 'teal' : '#eee'}
          iconName="checkmark3"
          iconClassName="stud-reg__icon"
          iconColor="#fff"
        />
        {!last ? (
          <div className="stud-reg__line-container">
            <div
              className={active ? 'stud-reg__line-active' : 'stud-reg__line'}
            />
          </div>
        ) : null}
      </>
    );
  }

  const renderErrors = () => {
    if (error && !loading) {
      return (
        <div className="stud-reg__error">
          <CustomMessage
            content={error}
            showClose
            header="Registration Failed"
            negative
          />
        </div>
      );
    }
    return null;
  };

  function renderNextAndPrevious(): any {
    return (
      <div>
        {renderErrors()}
        <div className="stud-reg__next-prev">
          <div>
            {activeIndex === -1 || activeIndex === 3 ? null : (
              <Button
                float="left"
                size="large"
                onClick={() => onPreviousClick()}
                className="stud-reg__buttons"
                disabled={loading}
              >
                <span>Previous</span>
              </Button>
            )}
          </div>

          {activeIndex === 3 ? (
            <Button
              color="teal"
              size="massive"
              onClick={() => pushRoute(routes.LANDING.path)}
            >
              Done
            </Button>
          ) : (
            <Button
              color="teal"
              float="right"
              size="large"
              className="stud-reg__buttons"
              onClick={
                !(activeIndex === 2) ? () => onClickNext() : () => onSave()
              }
              disabled={dataIsDirty()}
              loading={loading}
            >
              <span>{activeIndex === 2 ? 'Save' : 'Next'}</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  const onChange = (e: any, { name, value }): void => {
    if (name === 'phone') {
      setStudentData({ ...studentData, [name]: value.trim() });
    } else {
      setStudentData({ ...studentData, [name]: value });
    }
  };

  const onLocationChange = async (e: any, { name, value }): void => {
    setStudentData({ ...studentData, [name]: value });
    const locationDetails = await getLocationDetails(value);
    setLocationDetails(locationDetails);
  };

  const onSearchChange = (e: any, { searchQuery }): void => {
    setSearchKey(searchQuery);
  };

  function renderForm(activeIndex: ?number = -1): any {
    const {
      surname,
      otherNames,
      indexNumber,
      department,
      programme,
      haveCompany,
      email,
      password,
      confirmPassword,
      phone,
      foreignStudent,
      yearOfStudy,
      locationId,
      controlledProgramme
    } = studentData;

    switch (activeIndex) {
      case -1:
        return (
          <PersonalInfoForm
            surname={surname}
            otherNames={otherNames}
            indexNumber={indexNumber}
            onChange={onChange}
          />
        );
      case 0:
        return (
          <CredentialsForm
            email={email}
            phone={phone}
            password={password}
            confirmPassword={confirmPassword}
            onChange={onChange}
          />
        );
      case 1:
        return (
          <AcademicForm
            department={department}
            programme={programme}
            controlledProgramme={controlledProgramme}
            haveCompany={haveCompany}
            foreignStudent={foreignStudent}
            onChange={onChange}
            yearOfStudy={yearOfStudy}
          />
        );
      case 2:
        return (
          <>
            <Form.Select
              size="large"
              label="Enter your Residence"
              search
              // type="text"
              name="locationId"
              placeholder="Search residence"
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
              onChange={onChange}
              locationDetails={locationDetails}
            />
          </>
        );
      default:
        return (
          <div className="stud-reg__complete">
            <Icon name="thumb-up" className="stud-reg__complete--icon" />
            <span className="stud-reg__complete--text">
              {`Congrats! You're done.`}
            </span>
          </div>
        );
    }
  }

  function validateAllFields() {}

  function dataIsDirty(): boolean {
    const {
      surname,
      otherNames,
      indexNumber,
      department,
      programme,
      haveCompany,
      email,
      foreignStudent,
      password,
      confirmPassword,
      phone,
      yearOfStudy,
      locationId
    } = studentData;

    switch (activeIndex) {
      case -1:
        return !(surname && otherNames && indexNumber);
      case 0:
        return !(
          email &&
          phone &&
          phone.trim().length === 10 &&
          password &&
          confirmPassword &&
          password === confirmPassword
        );
      case 1:
        return !(
          department &&
          programme &&
          (haveCompany === 0 || haveCompany === 1) &&
          (foreignStudent === 0 || foreignStudent === 1) &&
          yearOfStudy
        );

      case 2:
        return !locationId;
      default:
        return null;
    }
  }

  const onClickNext = (): void => {
    validateAllFields();
    if (activeIndex !== 3) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const onPreviousClick = (): void => {
    if (activeIndex !== -1) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleErrors = error => {
    if (error === constants.errors.USER_EXISTS) {
      console.log(error);
      setError(getErrorMessages()[constants.errors.USER_EXISTS]);
    } else if (error === constants.errors.NO_INTERNET_CONNECTION) {
      setError(getErrorMessages()[constants.errors.NO_INTERNET_CONNECTION]);
    } else {
      setError(getErrorMessages()[constants.errors.GENERIC_ERROR]);
    }
  };

  const onSave = async () => {
    setLoading(true);
    setError(null);
    const resp = await registerStudents(studentData);
    if (!resp.error) {
      setLoading(false);
      return setActiveIndex(activeIndex + 1);
    }

    setLoading(false);
    return handleErrors(resp.error);
  };

  return (
    <MainContent toolbar={renderToolbar()}>
      <div className="stud-reg">
        <div className="stud-reg__svg-container">
          <img src={form} className="stud-reg__svg" alt="" />
        </div>
        <div className="stud-reg__form-control">
          {renderFormControlItem(Boolean(activeIndex > -1), false)}
          {renderFormControlItem(Boolean(activeIndex > 0), false)}
          {renderFormControlItem(Boolean(activeIndex > 1), false)}
          {renderFormControlItem(Boolean(activeIndex > 2), true)}
        </div>

        <div className="stud-reg__forms">
          <Form>{renderForm(activeIndex)}</Form>

          {renderNextAndPrevious()}
        </div>
      </div>
    </MainContent>
  );
};

export { StudentRegistration };
