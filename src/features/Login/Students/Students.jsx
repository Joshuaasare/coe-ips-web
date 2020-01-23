/*
 * @Author: Joshua Asare
 * @Date: 2019-12-18 22:38:00
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-12-30 15:34:09
 */
import { wrapLogin } from '../../_shared/hocs';
import { constants } from '../../_shared/constants';
// import { routes } from '../routes';

const registerPath = '/start/students/instructions';

export default wrapLogin('grad', registerPath, constants.roles.STUDENT.id);
