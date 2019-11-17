/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-07-11 23:39:22
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-02 23:42:02
 */

export const Actions = {
  SET_USER: 'set_user',
  CLEAR_USER: 'clear_user',
};

export const setUser = user => ({
  type: Actions.SET_USER,
  payload: user,
});
