import { PlacementRequest } from './PlacementRequest';
import { Companies } from './Companies';
import { CompanyAddition } from './CompanyAddition';
import { Students } from './Students';

export default () => {
  const routes = [
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
    },
    {
      title: 'Students',
      icon: '',
      isExact: true,
      showInMenu: true,
      component: Students,
      path: '/coordinator/students'
    }
  ];
  return routes;
};
