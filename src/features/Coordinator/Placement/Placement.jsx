/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Author: Joshua Asare
 * @Date: 2020-02-22 12:16:48
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-29 22:05:55
 */

import React from 'react';
import './css/placement.css';
import { wrapAdvancedList } from '../../_shared/hocs';
import { PlacementFilter, PlacementList } from '.';
import { getCompaniesWithSlots } from './_helpers/dataService';

export const PlacementFilterView = props => {
  return <PlacementFilter {...props} />;
};

export const PlacementListView = props => {
  return <PlacementList {...props} />;
};

export const PlacementDetailView = props => {
  return <div></div>;
};

export const MapDistributionView = props => {
  return <div></div>;
};

export default wrapAdvancedList(
  PlacementListView,
  PlacementDetailView,
  PlacementFilterView,
  MapDistributionView,
  getCompaniesWithSlots
);
