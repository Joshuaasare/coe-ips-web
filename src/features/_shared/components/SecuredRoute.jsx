/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-03 00:57:07
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-03 01:27:53
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = false;

type Props = {
  component: React.Component,
};

const SecuredRoute = ({ component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    ))
    }
  />
);

export default SecuredRoute;
