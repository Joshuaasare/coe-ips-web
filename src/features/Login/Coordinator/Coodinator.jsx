/*
 * @Author: Joshua Asare
 * @Date: 2019-12-04 11:23:05
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-12-30 15:44:26
 */

import { wrapLogin } from '../../_shared/hocs';
import { constants } from '../../_shared/constants';

export default wrapLogin('cordi', null, constants.roles.COORDINATOR.id);
