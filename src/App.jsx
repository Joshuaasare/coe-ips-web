import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './features/_shared/history';
import configureStore from './features/store';
import 'semantic-ui-css/semantic.min.css';
import './features/_shared/css/main.css';
import './features/_shared/css/grid.css';
// import 'rheostat/initialize';
import {} from './features/_shared/components';
import { Root } from './features/Root';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Root />
    </Router>
  </Provider>
);

export default App;
