/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-09-08 20:53:01
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-09 09:01:59
 */
import { Actions } from '../actions/ref_action';
import initialStoreState from '../initialStoreState';

export default (state = initialStoreState.refs, action) => {
  switch (action.type) {
    case Actions.SET_REF:
      return { ...state, [action.payload.refName]: action.payload.refValue };

    default:
      return state;
  }
};
