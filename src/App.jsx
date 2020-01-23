import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as firebase from 'firebase/app';
import history from './features/_shared/history';
import configureStore from './features/store';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'semantic-ui-css/semantic.min.css';
import './features/_shared/css/main.css';
import './features/_shared/css/grid.css';
// import 'rheostat/initialize';
import {} from './features/_shared/components';
import { Root } from './features/Root';
import { constants } from './features/_shared/constants';

const store = configureStore();

const firebaseConfig = {
  apiKey: constants.firebaseConfig.API_KEY,
  authDomain: constants.firebaseConfig.AUTH_DOMAIN,
  databaseURL: constants.firebaseConfig.DATABASE_URL,
  projectId: constants.firebaseConfig.PROJECT_ID,
  storageBucket: constants.firebaseConfig.STORAGE_BUCKET,
  messagingSenderId: constants.firebaseConfig.MESSAGING_SENDER_ID,
  appId: constants.firebaseConfig.APP_ID,
  measurementId: constants.firebaseConfig.MEASURENT_ID
};

firebase.initializeApp(firebaseConfig);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Root />
    </Router>
  </Provider>
);

export default App;
