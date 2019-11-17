/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-07-11 23:39:33
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-03 00:27:42
 */

import { Actions } from '../actions/user_action';
import initialStoreState from '../initialStoreState';

export default (state = initialStoreState.user, action) => {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case Actions.CLEAR_USER:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
