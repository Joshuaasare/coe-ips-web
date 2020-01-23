/*
 * @Author: Joshua Asare
 * @Date: 2019-11-18 10:09:09
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-06 04:39:48
 *
 * @flow
 */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes as Routes } from './routes';

type Props = {
  history: Object
};

const Login = (props: Props) => {
  const { history } = props;
  const [path, setPath] = useState(history.location.pathname);

  let unlisten;

  useEffect(() => {
    unlisten = history.listen(location => {
      const { pathname: path } = location;

      const pathSplit: Array<string> = path
        .split('/')
        .filter(elem => elem.trim() !== '');
      if (pathSplit.length === 0 || pathSplit[0] === 'start') {
        setLocationPath(path);
      }
    });

    return () => {
      unlisten();
    };
  });

  function setLocationPath(path) {
    setPath(path);
  }

  const renderTransitionReplace = () => (
    <div key={history.location.pathname}>{renderRoutes()}</div>
  );

  const pushRoute = (nextPath?: string = '') => {
    if (nextPath !== path) {
      history.push(nextPath);
    }
  };

  const popRoute = (e?: Object) => {
    if (e) e.preventDefault();
    history.goBack();
  };

  const replaceRoute = (nextPath?: string = '') => {
    history.replace(nextPath);
  };

  function renderRoutes() {
    const routes: Array<any> = Object.keys(Routes).map(
      (key: string, id: number) => {
        const route = Routes[key];
        const exact: boolean = route.isExact || false;
        const routeKey: string = `login-route-${id}`;

        const RenderedComponent = route.component;
        const render = () => (
          <RenderedComponent
            pushRoute={pushRoute}
            popRoute={popRoute}
            replaceRoute={replaceRoute}
            title={route.routeName}
            path={path}
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

    return <Switch location={history.location}>{routes}</Switch>;
  }

  return (
    <div id="login">
      <Route render={renderTransitionReplace} />
    </div>
  );
};

export { Login };
