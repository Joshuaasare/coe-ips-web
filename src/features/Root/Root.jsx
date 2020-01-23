/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-17 16:23:59
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-07 23:59:46
 *
 * @flow
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { routeType } from '../_shared/types';

const Root = () => {
  function renderRoutes(routes: routeType): Array<any> {
    return Object.keys(routes).map((routeKey: string, id: number): any => {
      const route = routes[routeKey];
      return (
        <Route
          exact={route.isExact}
          key={`route-${id}`}
          path={route.path}
          component={route.component}
        />
      );
    });
  }

  return (
    <div style={styles.container}>
      <div style={styles.container}>
        <Switch>{renderRoutes(routes)}</Switch>
      </div>
    </div>
  );
};

const styles = {
  container: {}
};

export default Root;
