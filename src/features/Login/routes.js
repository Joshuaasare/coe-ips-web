import {
  Students as StudentsLogin,
  StudentRegistration,
  StudentInstructions
} from './Students';
import { Landing } from '../Start';
import { Coordinator as CoordinatorLogin } from './Coordinator';
import { Company as CompanyLogin, CompanyRegistration } from './Company';
// import { StudentDashboard } from '../Students/Dashboard';

import { StudentWrapper } from '../Students';
import { CoordinatorWrapper } from '../Coordinator';

export const routes = {
  LANDING: {
    routeName: 'Landing',
    isExact: true,
    path: '/',
    component: Landing
  },

  STUDENT_LOGIN: {
    routeName: 'Student Login',
    isExact: true,
    path: '/start/students/login',
    component: StudentsLogin
  },

  STUDENT_REGISTRATION_INSTRUCTIONS: {
    routeName: 'Instructions',
    isExact: true,
    path: '/start/students/instructions',
    component: StudentInstructions
  },

  COMPANY_REGISTRATION_INSTRUCTIONS: {
    routeName: 'Instructions',
    isExact: true,
    path: '/start/company/instructions'
  },

  STUDENT_REGISTRATION_FORM: {
    routeName: 'Student Registation',
    isExact: true,
    path: '/start/students/register',
    component: StudentRegistration
  },

  COMPANY_REGISTRATION_FORM: {
    routeName: 'Company Registration',
    isExact: true,
    path: '/start/company/register',
    component: CompanyRegistration
  },

  COORDINATOR_LOGIN: {
    routeName: 'Coordinator Login',
    isExact: true,
    path: '/start/coordinator/login',
    component: CoordinatorLogin
  },

  COMPANY_LOGIN: {
    routeName: 'Company',
    isExact: true,
    path: '/start/company/login',
    component: CompanyLogin
  },

  STUDENT: {
    routeName: 'Undecided',
    path: '/student',
    component: StudentWrapper
  },
  COORDINATOR: {
    routeName: 'Undecided',
    path: '/coordinator',
    component: CoordinatorWrapper
  }
};
