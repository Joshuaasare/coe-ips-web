/*
 * @Author: Joshua Asare
 * @Date: 2020-02-22 12:16:48
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-22 17:34:20
 *
 */

/**
 * !ok so better comments is now working
 * *important comment
 * TODO: todo comment
 * ?question
 * @param parameter in the buildingi
 */

import React from 'react';
import './css/placement.css';
import { wrapAdvancedList } from '../../_shared/hocs';
import { getAllStudents } from '../../_shared/services';

export const PlacementFilterView = props => {
  return <div></div>;
};

export const PlacementListView = props => {
  return <PlacementListView />;
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
  getAllStudents
);
