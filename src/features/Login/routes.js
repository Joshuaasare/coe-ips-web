import { Students, StudentRegistration } from './Students';
import Landing from './Landing';

export const routes = {
  LANDING: {
    routeName: 'Landing',
    isExact: true,
    path: '/',
    component: Landing,
  },
  STUDENT_REGISTRATION_INSTRUCTIONS: {
    routeName: 'Instructions',
    isExact: true,
    path: '/start/students/instructions',
    component: Students,
  },

  STUDENT_REGISTRATION_FORM: {
    routeName: 'Form',
    isExact: true,
    path: '/start/students/form',
    component: StudentRegistration,
  },
};
