/*
 * @Author: Joshua Asare
 * @Date: 2019-12-05 14:23:14
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-07 00:04:06
 */
import { wrapNavigation } from '../_shared/hocs';
import routes from './routes';
import { constants } from '../_shared/constants';

const studentLoginPath = '/start/students/login';
export default wrapNavigation(
  routes,
  studentLoginPath,
  constants.roles.STUDENT.id
);
