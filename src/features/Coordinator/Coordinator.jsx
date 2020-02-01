import { wrapNavigation } from '../_shared/hocs';
import routes from './routes';
import { constants } from '../_shared/constants';

/*
 * @Author: Joshua Asare
 * @Date: 2020-01-25 00:35:37
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-25 12:00:11
 */

const coordinatorLoginPath = '/start/coordinator/login';
export default wrapNavigation(
  routes,
  coordinatorLoginPath,
  constants.roles.COORDINATOR.id
);
