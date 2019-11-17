/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-09-08 20:50:40
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-09 08:58:12
 */
export const Actions = {
  SET_REF: 'set_ref',
};

export const setRef = ref => ({
  type: Actions.SET_REF,
  payload: ref,
});
