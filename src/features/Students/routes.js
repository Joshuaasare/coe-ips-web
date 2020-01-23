import { StudentDashboard } from './Dashboard';
import { StudentPlacement } from './Placement';
import { Guide } from './Guide';

export default () => {
  const routes = [
    {
      title: 'Dashboard',
      icon: '',
      isExact: true,
      path: '/student',
      component: StudentDashboard,
      showInMenu: true
    },
    {
      title: 'Placement Status',
      icon: '',
      isExact: true,
      path: '/student/placement-status',
      component: StudentPlacement,
      showInMenu: true
    },
    {
      title: 'Internship Guide',
      icon: '',
      isExact: true,
      path: '/student/internship-guide',
      component: Guide,
      showInMenu: true
    }
  ];

  return routes;
};
