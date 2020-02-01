/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Author: Joshua Asare
 * @Date: 2020-01-25 10:00:37
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-29 13:45:49
 */

import React from 'react';
import { CompanyList, CompanyDetails, CompanyFilters } from '.';
import { wrapAdvancedList } from '../../_shared/hocs';
import { getArchivedCompaniesWithContactMade } from './_helpers';
import './css/companies.css';

export const CompanyListView = props => {
  return <CompanyList {...props} />;
};

export const CompanyDetailView = props => {
  return <CompanyDetails {...props} />;
};

export const CompanyFilterView = props => {
  return <CompanyFilters {...props} />;
};

export default wrapAdvancedList(
  CompanyListView,
  CompanyDetailView,
  CompanyFilterView,
  getArchivedCompaniesWithContactMade
);
