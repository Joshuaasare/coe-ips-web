/*
 * @Author: Joshua Asare
 * @Date: 2020-02-07 00:26:07
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-12 09:27:48
 */
import React, { useState } from 'react';
import { Form, Radio, Button } from 'semantic-ui-react';
import {
  LegendDivider,
  AnimatedModal,
  CenterPage,
  EmptyState
} from '../../_shared/components';
import './css/companyAddition.css';
import { addNewCompany } from '../../_shared/services';
import { constants } from '../../_shared/constants';

const CompanyAddition = () => {
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    email: '',
    phone: '',
    postalAddress: '',
    website: '',
    repName: '',
    repContact: '',
    repEmail: '',
    hasRequestedPlacement: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const onChange = (e: any, { name, value }): void => {
    if (e) e.preventDefault();
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const resetState = () => {
    setCompanyDetails({
      name: '',
      email: '',
      phone: '',
      postalAddress: '',
      website: '',
      repName: '',
      repContact: '',
      repEmail: '',
      hasRequestedPlacement: null
    });
  };

  const onSave = async () => {
    setLoading(true);
    setError(null);
    const resp = await addNewCompany(companyDetails);
    setLoading(false);
    setModalActive(true);
    if (resp.error) {
      return handleErrors(resp.error);
    }
    resetState();
    return setUploadSuccess(true);
  };

  function handleErrors(error) {
    if (error === constants.errors.UNAUTHENTICATED_USER) {
      setError({
        errorMessage:
          'Oops...You need to Login again before making this request',
        svgToUse: 'security',
        buttonText: 'Login'
      });
    }
    if (error === constants.errors.NO_INTERNET_CONNECTION) {
      setError({
        errorMessage: 'No internet Connection',
        svgToUse: 'broadcast',
        buttonText: 'Reconnect'
      });
    }

    if (error === constants.errors.UNPROCCESSABLE_REQUEST) {
      setError({
        errorMessage: 'An unexpected error occured. Please try again Later',
        svgToUse: 'robot',
        buttonText: 'retry'
      });
    }
    setError({
      errorMessage: 'An unexpected error occured. Please try again Later',
      svgToUse: 'robot',
      buttonText: 'retry'
    });
  }

  function dataIsDirty() {
    const { name, hasRequestedPlacement } = companyDetails;
    return !(
      name &&
      // email &&
      (hasRequestedPlacement === 0 || hasRequestedPlacement === 1)
    );
  }

  const onHideModal = () => {
    setModalActive(false);
  };

  const onShowModal = () => {
    setModalActive(true);
  };

  function renderModalContent() {
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
            content="Company Added"
            buttonColor="teal"
            buttonText="Go back"
            onClick={onHideModal}
          />
        </CenterPage>
      );
    }
    return null;
  }

  function renderAnimatedModal() {
    return (
      <AnimatedModal
        onClose={onHideModal}
        onShow={onShowModal}
        show={modalActive}
        centeredContent
      >
        <AnimatedModal.Header>
          <AnimatedModal.Title>{}</AnimatedModal.Title>
        </AnimatedModal.Header>

        <AnimatedModal.Content>{renderModalContent()}</AnimatedModal.Content>
      </AnimatedModal>
    );
  }

  function renderContent() {
    const {
      name,
      email,
      phone,
      postalAddress,
      website,
      repName,
      repEmail,
      repContact,
      hasRequestedPlacement
    } = companyDetails;

    return (
      <div className="comp-add">
        <LegendDivider
          icon="user-plus"
          title="Add Company"
          backgroundColor="#fff"
          color="#1f2a39"
        />
        <div className="comp-add__form">
          <Form>
            <Form.Input
              label="Enter Company Name (Required)"
              placeholder="Company Name"
              name="name"
              className="stud-reg__input"
              value={name}
              onChange={onChange}
              required
            />

            <Form.Input
              label="Enter Postal Address"
              placeholder="Postal Address"
              name="postalAddress"
              className="stud-reg__input"
              value={postalAddress}
              onChange={onChange}
            />

            <Form.Input
              label="Enter Phone Number"
              placeholder="Phone Number"
              name="phone"
              className="stud-reg__input"
              value={phone}
              onChange={onChange}
            />

            <Form.Input
              label="Enter Email Address"
              placeholder="Email Address"
              name="email"
              className="stud-reg__input"
              value={email}
              onChange={onChange}
            />

            <Form.Input
              label="Enter website"
              placeholder="website"
              name="website"
              className="stud-reg__input"
              value={website}
              onChange={onChange}
            />

            <Form.Input
              label="Enter Representative name"
              placeholder="Representative name"
              name="repName"
              className="stud-reg__input"
              value={repName}
              onChange={onChange}
            />

            <Form.Input
              label="Enter Representative Email"
              placeholder="Representative email"
              name="repEmail"
              className="stud-reg__input"
              value={repEmail}
              onChange={onChange}
            />
            <Form.Input
              label="Enter Representative Contact"
              placeholder="Representative contact"
              name="repContact"
              className="stud-reg__input"
              value={repContact}
              onChange={onChange}
            />

            <div className="stud-reg__yesno-container">
              <span className="stud-reg__yesno">
                Has this company requested Placement ?
              </span>
              <Form.Field>
                <Radio
                  label="Yes"
                  name="hasRequestedPlacement"
                  value={1}
                  checked={hasRequestedPlacement === 1}
                  onChange={onChange}
                  className="stud-reg__radio"
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="No"
                  name="hasRequestedPlacement"
                  value={0}
                  checked={hasRequestedPlacement === 0}
                  onChange={onChange}
                  className="stud-reg__radio"
                />
              </Form.Field>
            </div>
          </Form>

          <div className="button-container">
            <Button
              content="upload"
              icon="cloud upload"
              color="google plus"
              size="massive"
              fluid
              disabled={dataIsDirty()}
              onClick={onSave}
              loading={loading}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {renderContent()}
      {renderAnimatedModal()}
    </div>
  );
};

export default CompanyAddition;
