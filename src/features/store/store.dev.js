import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../_shared/reducers';

const configureStore = () => {
  const middleware = [];
  const enhancers = [];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  const store = createStore(reducers, enhancer);
  return store;
};

export default configureStore;
