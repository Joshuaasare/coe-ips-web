/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-06 18:28:34
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-06 18:29:37
 */

export function pickRandomAvatarColor(id: ?number): string {
  const colors = [
    '#dcedc8',
    '#ffecb3',
    '#c5cae9',
    '#b3e5fc',
    '#b2dfdb',
    '#ffccbc',
    '#f0f4c3',
    '#d7ccc8',
    '#cfd8dc',
    '#e3dbba',
    '#d8e6b3',
    '#d3e7ea',
    '#d3c8f0',
    'lavender',
    '#FFE7E7',
    'rgb(220, 196, 165)',
    'wheat',
    'paleturquoise',
    'rgb(184, 255, 255)',
    'peachpuff',
    'rgb(169, 251, 169)',
    'papayawhip',
    'rgba(255, 182, 193, 0.79)'
  ];
  return colors[id % 23] || 'black';
}
