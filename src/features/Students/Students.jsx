/*
 * @Author: Joshua Asare
 * @Date: 2019-12-05 14:23:14
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-12-30 21:09:34
 */
import { wrapNavigation } from '../_shared/hocs';
import routes from './routes';

const studentLoginPath = '/start/students/login';
export default wrapNavigation(routes, studentLoginPath);
