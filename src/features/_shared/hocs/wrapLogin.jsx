/*
 * @Author: Joshua Asare
 * @Date: 2019-12-18 21:40:16
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-16 19:59:33
 *
 *This hoc contains the entire logic for login of both coordinators and
 *students. When a user visits the login page, we check if he is currently logged in,
 *and we navigate to the appropriate page, if he/she is not logged in, we proceed with
 *the login process.
 */
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setUser } from '../actions/user_action';
import {
  MainContent,
  CustomMessage,
  CenterPage,
  AnimatedModal
} from '../components';
import { images, svg } from '../assets';
import {
  verifyUser,
  checkClientAuth,
  verifyUserWithToken,
  resetPassword,
  getUserTypeId
} from '../services';
import { constants } from '../constants';
import { getErrorMessages } from '../errorMessages';
import { routes } from '../../Login/routes';
import './css/wrapLogin.css';

type Props = {
  pushRoute: () => void,
  setUser: () => {},
  history: Object
};

function wrapLogin(svgType: string, registerPath: string, userTypeId: number) {
  const WrapLogin = (props: Props) => {
    const [credentials, setCredentials] = useState({
      email: '',
      password: ''
    });
    const [passwordRecoveryData, setPasswordRecoveryData] = useState({
      email: '',
      newPassword: '',
      newPasswordConfirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [pageLoader, setPageLoader] = useState(true);
    const [error, setError] = useState(null);
    const [passwordRecoveryError, setPasswordRecoveryError] = useState(null);
    const [passwordRecoveryActive, setPasswordRecoveryActive] = useState(false);
    const [passwordRecoveryLoading, setPasswordRecoveryLoading] = useState(
      false
    );

    useEffect(() => {
      checkCurrentUser();
    }, []);

    async function checkCurrentUser() {
      const isAuthenticated = await checkClientAuth();

      if (!isAuthenticated) {
        return setPageLoader(false);
      }

      const resp = await verifyUserWithToken();
      if (resp.error) {
        return setPageLoader(false);
      }

      const storedUserId = await getUserTypeId();

      if (
        props.history.location.state &&
        props.history.location.state.clientAuthFailed
      ) {
        return setPageLoader(false);
      }

      if (!storedUserId && resp.data && resp.data.userTypeId === userTypeId) {
        return handleLoginSuccess(resp.data);
      }

      if (storedUserId && resp.data && resp.data.userTypeId === storedUserId) {
        return handleLoginSuccess(resp.data);
      }

      return setPageLoader(false);
    }

    function renderToolbar() {
      return (
        <div className="wrapLogin__toolbar">
          <div onClick={() => props.pushRoute(routes.LANDING.path)}>
            <img
              src={images.coeLogo}
              alt=""
              className="wrapLogin__toolbar-logo"
            />
          </div>
        </div>
      );
    }

    function renderRegister() {
      return (
        <div className="wrapLogin__reg">
          <div className="wrapLogin__reg-left" onClick={onModalOpen}>
            Forgot Password?
          </div>

          {registerPath ? (
            <div
              className="wrapLogin__reg-right"
              onClick={() => props.pushRoute(registerPath)}
            >
              New Here ? Register Now
            </div>
          ) : null}
        </div>
      );
    }

    const onChange = (e, { name, value }) => {
      setCredentials({ ...credentials, [name]: value });
    };

    const onPasswordRecoveryDataChanged = (e, { name, value }) => {
      setPasswordRecoveryData({ ...passwordRecoveryData, [name]: value });
    };

    const handleErrors = (error: string) => {
      if (error === constants.errors.NO_INTERNET_CONNECTION) {
        return setError(
          getErrorMessages()[constants.errors.NO_INTERNET_CONNECTION]
        );
      }
      if (
        error === constants.errors.UNAUTHENTICATED_USER ||
        error === constants.errors.RESOURCE_NOT_FOUND
      ) {
        return setError(
          getErrorMessages()[constants.errors.AUTHENTICATION_FAILED]
        );
      }
      return setError(getErrorMessages()[constants.errors.GENERIC_ERROR]);
    };

    function handleLoginSuccess(response: Object) {
      switch (response.userTypeId) {
        case constants.roles.STUDENT.id:
          props.pushRoute(routes.STUDENT.path);
          break;
        case constants.roles.COORDINATOR.id:
          props.pushRoute(routes.COORDINATOR.path);
          break;
        default:
          break;
      }
    }

    const onPasswordRecoverySubmit = async () => {
      setPasswordRecoveryLoading(true);
      setPasswordRecoveryError(null);
      setError(null);
      const { newPassword, email } = passwordRecoveryData;
      const resp = await resetPassword(email, newPassword);
      setPasswordRecoveryLoading(false);
      if (resp.error) {
        return setPasswordRecoveryError({
          message: 'An error occured! Please try again'
        });
      }
      return onModalClose();
    };

    const onSubmit = async () => {
      setLoading(true);
      setError(null);
      const { email, password } = credentials;
      const response = await verifyUser(email, password, userTypeId);
      if (response.error) {
        setLoading(false);
        handleErrors(response.error);
      }
      props.setUser(response);
      setLoading(false);
      return handleLoginSuccess(response);
    };

    const onModalClose = () => {
      setPasswordRecoveryActive(false);
    };

    const onModalOpen = () => {
      setPasswordRecoveryActive(true);
    };

    const renderErrors = () => {
      if (error && !loading) {
        return (
          <div className="wrapLogin__error-container">
            <CustomMessage
              content={error}
              header="Authentication failed"
              negative
            />
          </div>
        );
      }
      return null;
    };

    function renderContent() {
      if (pageLoader) {
        return <CenterPage>{}</CenterPage>;
      }

      function renderPasswordRecovery() {
        const {
          newPassword,
          newPasswordConfirmation,
          email
        } = passwordRecoveryData;
        return (
          <AnimatedModal
            onClose={onModalClose}
            onShow={onModalOpen}
            show={passwordRecoveryActive}
            centeredContent
          >
            <AnimatedModal.Header>
              <AnimatedModal.Title>
                <div className="wrapLogin__svg-container2">
                  <img src={svg.auth} className="wrapLogin__svg2" alt="" />
                </div>
              </AnimatedModal.Title>
            </AnimatedModal.Header>
            <AnimatedModal.Content>
              <div className="wrapLogin__password">
                <Form>
                  <Form.Input
                    size="large"
                    label="Enter Email Address"
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    className="wrapLogin__input"
                    onChange={onPasswordRecoveryDataChanged}
                    value={email}
                    required
                    fluid
                  />

                  <Form.Input
                    size="large"
                    label="Enter new Password"
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className="wrapLogin__input"
                    onChange={onPasswordRecoveryDataChanged}
                    value={newPassword}
                    required
                    fluid
                  />

                  <Form.Input
                    size="large"
                    label="Confirm New Password"
                    type="password"
                    name="newPasswordConfirmation"
                    placeholder="New Password Confirmation"
                    className="wrapLogin__input"
                    onChange={onPasswordRecoveryDataChanged}
                    value={newPasswordConfirmation}
                    required
                    fluid
                  />
                </Form>
                <CustomMessage
                  negative
                  content={
                    passwordRecoveryError && passwordRecoveryError.message
                  }
                  hidden={!passwordRecoveryError}
                />
              </div>
            </AnimatedModal.Content>

            <AnimatedModal.Footer>
              <Button
                size="massive"
                color="google plus"
                content="Recover Password"
                disabled={
                  !(
                    email &&
                    newPassword &&
                    newPasswordConfirmation &&
                    newPassword === newPasswordConfirmation
                  )
                }
                loading={passwordRecoveryLoading}
                onClick={onPasswordRecoverySubmit}
                className="wrapLogin__password-button"
              />
            </AnimatedModal.Footer>
          </AnimatedModal>
        );
      }

      return (
        <div className="wrapLogin">
          {renderPasswordRecovery()}
          <div className="wrapLogin__svg-container">
            <img src={svg[svgType]} className="wrapLogin__svg" alt="" />
          </div>

          <div className="wrapLogin__forms">
            <Form>
              <Form.Input
                size="large"
                label="Enter Email Address"
                type="text"
                name="email"
                placeholder="Email Address"
                width={16}
                className="wrapLogin__input"
                onChange={onChange}
                value={credentials.username}
                required
              />

              <Form.Input
                size="large"
                label="Enter Password"
                type="password"
                name="password"
                placeholder="Password"
                width={16}
                className="wrapLogin__input"
                onChange={onChange}
                value={credentials.password}
                required
              />
            </Form>

            {renderRegister()}
            {renderErrors()}

            <Button
              fluid
              loading={loading}
              size="huge"
              color="teal"
              style={styles.button}
              disabled={!(credentials.email && credentials.password)}
              onClick={onSubmit}
            >
              <span className="wrapLogin__buttons">Login</span>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <MainContent toolbar={renderToolbar()}>{renderContent()}</MainContent>
    );

    /** ***HELPER FUNCTIONS***** */
  };

  return connect(null, { setUser })(WrapLogin);
}

const styles = {
  button: {
    height: '45px',
    marginTop: '2rem'
  }
};

export default wrapLogin;
