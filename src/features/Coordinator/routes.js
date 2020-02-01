import { PlacementRequest } from './PlacementRequest';
import { Companies } from './Companies';

export default () => {
  const routes = [
    {
      title: 'Placement Request',
      icon: '',
      isExact: true,
      showInMenu: true,
      component: PlacementRequest,
      path: '/coordinator/placement-request'
    },
    {
      title: 'Companies',
      icon: '',
      isExact: true,
      showInMenu: true,
      component: Companies,
      path: '/coordinator'
    }
  ];
  return routes;
};
