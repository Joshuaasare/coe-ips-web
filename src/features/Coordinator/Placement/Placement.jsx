/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Author: Joshua Asare
 * @Date: 2020-02-22 12:16:48
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-09 10:36:59
 */

import React from 'react';
import './css/placement.css';
import { wrapAdvancedList } from '../../_shared/hocs';
import { PlacementFilter, PlacementList, PlacementDetails } from '.';
import { getCompaniesWithSlots } from './_helpers/dataService';

export const PlacementFilterView = props => {
  return <PlacementFilter {...props} />;
};

export const PlacementListView = props => {
  return <PlacementList {...props} />;
};

export const PlacementDetailView = props => {
  return <PlacementDetails {...props} />;
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
