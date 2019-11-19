/*
 * @Author: Joshua Asare
 * @Date: 2019-11-17 15:52:24
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-11-19 21:21:30
 */
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { MainContent, CircularButton, Icon } from '../../_shared/components';
import './css/studentRegistration.css';
import form from '../../_shared/assets/svg/list.svg';
import coeLogo from '../../_shared/assets/images/coe-logo.png';
import { PersonalInfoForm, AcademicForm } from '.';
import CredentialsForm from './CredentialsForm';

const StudentRegistration = props => {
  const {} = props;
  const [activeIndex, setActiveIndex] = useState(-1);
  const [studentData, setStudentData] = useState({
    surname: '',
    otherNames: '',
    indexNumber: '',
    department: '',
    programme: '',
    haveCompany: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  function renderToolbar() {
    return (
      <div className="student-registration__toolbar">
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

  function renderNextAndPrevious(): any {
    return (
      <div className="stud-reg__next-prev">
        <div>
          {activeIndex === -1 ? null : (
            <Button
              float="left"
              size="large"
              onClick={() => onPreviousClick()}
              className="stud-reg__buttons"
            >
              <span>Previous</span>
            </Button>
          )}
        </div>

        <Button
          color="teal"
          float="right"
          size="large"
          className="stud-reg__buttons"
          onClick={
            !(activeIndex === 3) ? () => onClickNext() : () => onFinish()
          }
          disabled={dataIsDirty()}
        >
          <span>{activeIndex === 3 ? 'Done' : 'Next'}</span>
        </Button>
      </div>
    );
  }

  const onChange = (e: any, { name, value }): void => {
    setStudentData({ ...studentData, [name]: value });
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
            haveCompany={haveCompany}
            onChange={onChange}
          />
        );
      default:
        return <PersonalInfoForm />;
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
      password,
      confirmPassword,
      phone,
    } = studentData;

    switch (activeIndex) {
      case -1:
        return !(surname && otherNames && indexNumber);
      case 0:
        return !(email && phone && password && confirmPassword);
      case 1:
        return !(department && programme && haveCompany);
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

  const onFinish = () => {};

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
