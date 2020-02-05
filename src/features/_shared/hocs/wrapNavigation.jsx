import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Sidebar, Menu, Dimmer } from 'semantic-ui-react';
import { Toolbar, MainContent, Sidebar as NavBar } from '../components';
import { checkClientAuth, signUserOut, getUserTypeId } from '../services';
import { routes as loginRoutes } from '../../Login/routes';
import './css/wrapNavigation.css';

type Props = {
  replaceRoute: () => {},
  history: Object
};

function wrapNavigation(routes: Object, loginPath: string, userTypeId: number) {
  return (props: Props) => {
    const { history } = props;
    const [sidebarActive, setSidebarActive] = useState(false);
    const [authCheckComplete, setAuthCheckComplete] = useState(false);

    useEffect(() => {
      handleClientAuth();
    }, [useLocation()]);

    const onSidebarOpen = () => {
      setSidebarActive(true);
    };

    async function handleClientAuth() {
      setAuthCheckComplete(false);
      const isAuthenticated = await checkClientAuth();
      const storedUserTypeId = await getUserTypeId();
      if (isAuthenticated && Number(storedUserTypeId) === userTypeId) {
        return setAuthCheckComplete(true);
      }
      return props.replaceRoute(loginPath, { clientAuthFailed: true });
    }

    const onSidebarClose = () => {
      setSidebarActive(false);
    };

    const signOut = async () => {
      await signUserOut();
      return handleClientAuth();
    };

    function renderToolbar() {
      return (
        <div className="withNav__toolbar">
          <Toolbar
            onSidebarClose={onSidebarClose}
            onSidebarOpen={onSidebarOpen}
            sidebarActive={sidebarActive}
            signOut={signOut}
          />
        </div>
      );
    }

    const pushRoute = (nextPath?: string = '', state? = {}) => {
      history.push(nextPath, state);
    };

    const popRoute = (e?: Object) => {
      if (e) e.preventDefault();
      history.goBack();
    };

    const replaceRoute = (nextPath?: string = '', state? = {}) => {
      history.replace(nextPath, state);
    };

    const goToLogin = () => {
      return history.replace(loginRoutes.STUDENT_LOGIN.path);
    };

    function renderRoutes() {
      const allRoutes: Array<any> = Object.keys(routes()).map(
        (key: string, id: number) => {
          const route = routes()[key];
          const exact: boolean = route.isExact || false;
          const routeKey: string = `login-route-${id}`;

          const RenderedComponent = route.component;
          const render = () => (
            <RenderedComponent
              pushRoute={pushRoute}
              popRoute={popRoute}
              replaceRoute={replaceRoute}
              title={route.routeName}
              goToLogin={goToLogin}
              history={history}
            />
          );

          return (
            <Route
              key={routeKey}
              path={route.path}
              render={render}
              exact={exact}
            />
          );
        }
      );

      return <Switch location={history.location}>{allRoutes}</Switch>;
    }

    function renderContent() {
      if (authCheckComplete) {
        return (
          <div className={sidebarActive ? 'withNav__inactive' : 'withNav'}>
            <Sidebar.Pushable>
              <Sidebar.Pusher>
                <Dimmer.Dimmable dimmed={sidebarActive}>
                  <Dimmer
                    inverted
                    onClickOutside={onSidebarClose}
                    active={sidebarActive}
                  >
                    {}
                  </Dimmer>

                  <Switch>{renderRoutes()}</Switch>
                </Dimmer.Dimmable>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
            <Sidebar
              as={Menu}
              vertical
              className="withNav__sidebar"
              animation="push"
              visible={sidebarActive}
            >
              <NavBar routes={routes} sidebarActive />
            </Sidebar>
          </div>
        );
      }
      return <div>{}</div>;
    }

    return (
      <MainContent toolbar={renderToolbar()}>{renderContent()}</MainContent>
    );
  };
}

export default wrapNavigation;
