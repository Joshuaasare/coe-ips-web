/*
 * @Author: Joshua Asare
 * @Date: 2019-12-18 22:29:44
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-12-30 15:44:05
 */

import { wrapLogin } from '../../_shared/hocs';
import { constants } from '../../_shared/constants';

export default wrapLogin('eng', null, constants.roles.COMPANY.id);
