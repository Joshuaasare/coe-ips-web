import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../_shared/reducers';

const configureStore = () => {
  const middleware = [];
  const enhancers = [];

  enhancers.push(applyMiddleware(...middleware));
  const enhancer = compose(...enhancers);

  const store = createStore(reducers, enhancer);
  return store;
};

export default configureStore;
