import { Companies } from './Companies';
import { CompanyAddition } from './CompanyAddition';
import { Students } from './Students';
import { Placement } from './Placement';

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
    },
    {
      title: 'Placement',
      icon: '',
      isExact: true,
      showInMenu: true,
      component: Placement,
      path: '/coordinator/placement'
    }
  ];
  return routes;
};
