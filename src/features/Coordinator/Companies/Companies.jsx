/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Author: Joshua Asare
 * @Date: 2020-01-25 10:00:37
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-16 19:56:55
 */

import React from 'react';
import { CompanyList, CompanyDetails, CompanyFilters } from '.';
import { wrapAdvancedList } from '../../_shared/hocs';
import { getArchivedCompaniesWithContactMade } from '../../_shared/services';
import './css/companies.css';
import { MultiLocation } from '../../_shared/components';
import { constants } from '../../_shared/constants';

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
  return (
    <div className="distribution__map">
      <MultiLocation
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${constants.maps.API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: '500px' }} />}
        data={props.data}
      />
    </div>
  );
};

export default wrapAdvancedList(
  CompanyListView,
  CompanyDetailView,
  CompanyFilterView,
  MapDistributionView,
  getArchivedCompaniesWithContactMade
);
