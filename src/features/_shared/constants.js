export const constants = {
  ui: {
    colors: {}
  },

  app: {
    ENCRYPTED_API_TOKEN: 'encrypted_api_token',
    USER_TYPE_ID: 'user_type_id',
    BASE_API_URL: 'http://localhost:3001',
    JEST_TEST_KEY: '12h.93u.77#@',
    TOKEN_IS_ENCRYPTED: true,
    ACAD_YEAR: 2019
  },

  maps: {
    API_KEY: 'AIzaSyCRA9Ea7Llszsd4aTwP-ipbLd8gSfuPB2U'
  },
  email: {
    USER_ID: 'user_IthvegI82GXXBWlqLEHJS',
    ACCESS_TOKEN: '6904ee41036e8a396f0df4089a38afcc',
    ADDRESS: 'bediako29@gmail.com'
  },
  services:
    process.env.NODE_ENV === 'production'
      ? {
          MAIN: 'https://coe-ips-backend.appspot.com'
        }
      : {
          MAIN: 'http://localhost:3001'
          // MAIN: 'http://10.10.3.100:3001'
          // MAIN: 'http://192.168.43.135:3001'
        },
  errors: {
    UNAUTHORIZED_USER: 'unauthorized_user',
    UNAUTHENTICATED_USER: 'unauthenticated_user',
    AUTHENTICATION_FAILED: 'authentication_failed',
    RESOURCE_NOT_FOUND: 'resource_not_found',
    USER_EXISTS: 'user_exists',
    GENERIC_ERROR: 'generic_error',
    NO_INTERNET_CONNECTION: 'no_internet',
    UNPROCCESSABLE_REQUEST: 'unprocessable_request'
  },
  roles: {
    STUDENT: { id: 1, name: 'student' },
    COMPANY: { id: 2, name: 'company' },
    COORDINATOR: { id: 3, name: 'coordinator' },
    ADMIN: { id: 4, name: 'admin' },
    SUPER_ADMIN: { id: 5, name: 'super_admin' }
  },
  documentPaths: {
    INTRODUCTORY: '/student/introductory-letter'
  },
  firebaseConfig: {
    API_KEY: 'AIzaSyAFovcOCeS_i8K6stZrriFmcZzT8iUDVis',
    AUTH_DOMAIN: 'model-journal-260203.firebaseapp.com',
    DATABASE_URL: 'https://model-journal-260203.firebaseio.com',
    PROJECT_ID: 'model-journal-260203',
    STORAGE_BUCKET: 'model-journal-260203.appspot.com',
    MESSAGING_SENDER_ID: '885485601418',
    APP_ID: '1:885485601418:web:fe85bc8df031ca475da373',
    MEASURENT_ID: 'G-X3G5B84PL6'
  },
  paths: {
    DASHBOARD: '/student',
    PLACEMENT_STATUS: '/student/placement-status',
    INTERNSHIP_GUIDE: '/student/internship-guide'
  },
  misc: {
    RANDOM_IMAGE_URL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
  }
};
