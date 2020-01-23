export type routeType = {
  routeName: string,
  exact: boolean,
  component: ?any,
  path: string,
  subcomponents: ?Array<Object<routeType>>,
  privileges: ?Array<string>,
};
