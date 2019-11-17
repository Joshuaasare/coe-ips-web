/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-07-31 15:56:05
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-08 21:14:50
 */

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserReducer from './user_reducer';
import RefReducer from './ref_reducer';

export default combineReducers({
  user: UserReducer,
  refs: RefReducer,
  form: formReducer,
});

