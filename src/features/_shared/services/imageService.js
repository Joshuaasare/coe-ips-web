/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-06 18:28:34
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-06 18:29:37
 */
export function pickRandomAvatarColor(id: ?number): string {
  const colors = [
    '#e53935',
    '#d81b60',
    '#8e24aa',
    '#5e35b1',
    '#1e88e5',
    '#43a047',
    '#fb8c00',
    '#f4511e',
    '#6d4c41',
    '#546e7a',
  ];
  return colors[id % 10];
}
