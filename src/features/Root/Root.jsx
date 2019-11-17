/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-17 16:23:59
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-07 23:59:46
 *
 * @flow
 */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { routeType } from '../_shared/types';

type Props = {
  history: Object
};

type State = {};

class Root extends Component<Props, State> {
  state = {};

  componentDidMount() {}

  renderRoutes(routes: routeType): Array<any> {
    return Object.keys(routes).map((routeKey: string, id: number): any => {
      const route = routes[routeKey];
      console.log(route);
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

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.container}>
          <Switch>{this.renderRoutes(routes)}</Switch>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {},
};

export default Root;
