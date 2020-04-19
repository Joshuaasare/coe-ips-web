export const constants = {
  ui: {
    colors: {},
    sidebarOptions: [
      { name: 'STUDENT', svg: 'grad' },
      { name: 'COMPANY', svg: 'eng' },
      { name: 'COORDINATOR', svg: 'cordi' }
    ]
  },

  app: {
    ENCRYPTED_API_TOKEN: 'encrypted_api_token',
    USER_TYPE_ID: 'user_type_id',
    BASE_API_URL: 'http://localhost:3001',
    JEST_TEST_KEY: process.env.REACT_APP_JEST_TEST_KEY,
    TOKEN_IS_ENCRYPTED: true,
    ACAD_YEAR: 2019
  },

  maps: {
    API_KEY: process.env.REACT_APP_MAPS_API_KEY,
    API_KEY_2: process.env.REACT_APP_MAPS_API_KEY_2
  },

  services:
    process.env.NODE_ENV === 'production'
      ? {
          MAIN: process.env.REACT_APP_MAIN_BACKEND_URL
        }
      : {
          MAIN: process.env.REACT_APP_LOCAL_BACKEND_URL
          // MAIN: 'http://10.10.3.102:3001'
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
    API_KEY: process.env.REACT_APP_FIREBSE_API_KEY,
    AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    DATABASE_URL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
    MEASURENT_ID: process.env.REACT_APP_FIREBASE_MEASURENT_ID
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
