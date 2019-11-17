import { Students } from '../../Login/Students';
import { Landing } from '../../Login';

export const routes = {
  LANDING: {
    routeName: 'Landing',
    isExact: true,
    path: '/',
    component: Landing,
  },
  STUDENT_REGISTRATION: {
    routeName: 'Students',
    isExact: true,
    path: '/start/students',
    component: Students,
  },
};
