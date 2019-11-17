/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-06 07:26:53
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-06 08:01:35
 */

import React from 'react';
import { Icon } from '../components';

export function renderStars(name, type, rating) {
  // rating will come from api and the logic below will render the stars based on them
  //  const rating = 2; // asumming the average star rating is 2
  const stars = [];
  for (let i = 0; i < 5; i += 1) {
    const colorType = rating >= i + 1 ? `${type}` : `${type}-inactive`;
    const star = <Icon name={name} type={colorType} />;
    stars.push(star);
  }
  return stars;
}
