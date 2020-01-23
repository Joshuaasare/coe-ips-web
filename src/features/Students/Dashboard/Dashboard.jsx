/*
 * @Author: Joshua Asare
 * @Date: 2019-12-05 13:38:43
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-12-06 05:31:35{
 */
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import {
  Loader,
  CenterPage,
  EmptyState,
  AnimatedModal,
  CustomMessage
} from '../../_shared/components';
import { Profile, Timeline } from '.';
import {
  convertToProfileAndTimelineData,
  setInternshipStartDate
} from './_helpers';
import { constants } from '../../_shared/constants';
import { getCurrentStudentData } from '../../_shared/services';
import './css/dashboard.css';

type Props = {
  history: Object,
  goToLogin: () => {},
  pushRoute: () => {},
  popRoute: () => {},
  replaceRoute: () => {}
};

const Dashboard = (props: Props) => {
  const { goToLogin, pushRoute, popRoute, replaceRoute } = props;
  const [indexNumber, setIndexNumber] = useState('');
  const [internshipStartLoading, setInternshipStartLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [indexNumberError, setIndexNumberError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStudentData, setCurrentStudentData] = useState(null);

  useEffect(() => {
    initPageData();
  }, []);

  function handleErrors(error) {
    if (error === constants.errors.UNAUTHENTICATED_USER) {
      setError({
        errorMessage:
          'Oops...You need to Login again before accessing this page',
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

    setError({
      errorMessage: 'An unexpected error occured. Please try again Later',
      svgToUse: 'robot',
      buttonText: 'retry',
      onClick: onReload
    });

    return setLoading(false);
  }

  async function initPageData() {
    const resp = await getCurrentStudentData();
    if (resp.error) {
      return handleErrors(resp.error);
    }
    const studentData = await convertToProfileAndTimelineData(resp.data);
    setCurrentStudentData(studentData);
    return setLoading(false);
  }

  const onReload = () => {
    setError(null);
    setLoading(true);
    return initPageData();
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  const onModalOpen = () => {
    setModalOpen(true);
  };

  const onIndexNumberChange = (e: any, data): void => {
    if (e) e.preventDefault();
    setIndexNumber(data.value);
  };

  const onConfirmClick = async () => {
    setInternshipStartLoading(true);
    setIndexNumberError(null);
    if (Number(indexNumber) === currentStudentData.data.indexNumber) {
      const resp = await setInternshipStartDate(
        currentStudentData.data.indexNumber
      );
      if (resp.error) {
        setInternshipStartLoading(false);
        return setIndexNumberError({
          message: 'An unexpected Problem occured. Please try again'
        });
      }
      setInternshipStartLoading(false);
      setIndexNumberError(null);
      onModalClose();
      return onReload();
    }
    setIndexNumberError({ message: 'Wrong index number' });
    return setInternshipStartLoading(false);
  };

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
    if (loading) {
      return (
        <CenterPage>
          <Loader active coverEverything inverted content="Loading data...." />
        </CenterPage>
      );
    }

    return (
      <div className="row">
        <div className="col-1-of-2">
          <Profile
            name={currentStudentData.name}
            programme={currentStudentData.programme}
            profileData={currentStudentData.profile}
            popRoute={popRoute}
            pushRoute={pushRoute}
            replaceRoute={replaceRoute}
            currentStudentData={currentStudentData.data}
          />
        </div>

        <div className="col-1-of-2">
          <Timeline
            onModalOpen={onModalOpen}
            onModalClose={onModalClose}
            currentStudentData={currentStudentData.data}
            timeline={currentStudentData.timeline}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {renderContent()}

      <AnimatedModal
        onClose={onModalClose}
        onShow={onModalOpen}
        show={modalOpen}
        centeredContent
      >
        <AnimatedModal.Header>
          <AnimatedModal.Title>
            Please Enter Your Index Number to Confirm that you have began
            Internship
          </AnimatedModal.Title>
        </AnimatedModal.Header>

        <AnimatedModal.Content>
          <div className="wrapLogin__password">
            <Form>
              <Form.Input
                fluid
                size="large"
                label="This action cannot be reversed"
                type="number"
                name="indexNumber"
                placeholder="Index Number"
                width={16}
                className="stud-reg__input"
                value={indexNumber}
                onChange={onIndexNumberChange}
                required
              />
              <CustomMessage
                content={indexNumberError && indexNumberError.message}
                negative
                hidden={!indexNumberError}
              />
            </Form>
          </div>
        </AnimatedModal.Content>

        <AnimatedModal.Footer>
          <div className="dashboard__button">
            <Button
              size="massive"
              content="Confirm"
              color="google plus"
              onClick={onConfirmClick}
              loading={internshipStartLoading}
            />
          </div>
        </AnimatedModal.Footer>
      </AnimatedModal>
    </div>
  );
};

export default Dashboard;
