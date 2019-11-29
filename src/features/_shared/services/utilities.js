/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-17 11:25:58
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-29 12:08:08
 */

export function getRandomInt(minimum, maximum) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
