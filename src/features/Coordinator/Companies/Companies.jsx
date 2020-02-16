/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Author: Joshua Asare
 * @Date: 2020-01-25 10:00:37
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-16 20:35:29
 */

import React from 'react';
import { CompanyList, CompanyDetails, CompanyFilters, CompanyMapView } from '.';
import { wrapAdvancedList } from '../../_shared/hocs';
import { getArchivedCompaniesWithContactMade } from '../../_shared/services';
import './css/companies.css';

type MapViewProps = {
  data: Array
};

export const CompanyListView = props => {
  return <CompanyList {...props} />;
};

export const CompanyDetailView = props => {
  return <CompanyDetails {...props} />;
};

export const CompanyFilterView = props => {
  return <CompanyFilters {...props} />;
};

export const MapDistributionView = (props: MapViewProps) => {
  return <CompanyMapView {...props} />;
};

export default wrapAdvancedList(
  CompanyListView,
  CompanyDetailView,
  CompanyFilterView,
  MapDistributionView,
  getArchivedCompaniesWithContactMade
);
