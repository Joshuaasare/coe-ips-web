import { PlacementRequest } from './PlacementRequest';
import { Companies } from './Companies';
import { CompanyAddition } from './CompanyAddition';

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
    },
    {
      title: 'New Company',
      icon: '',
      isExact: true,
      showInMenu: true,
      component: CompanyAddition,
      path: '/coordinator/company-addition'
    }
  ];
  return routes;
};
