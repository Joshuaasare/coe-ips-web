/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Author: Joshua Asare
 * @Date: 2020-02-08 11:33:06
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-16 19:54:10
 */
import React from 'react';
import './css/students.css';
import { StudentList, StudentDetails, StudentFilter } from '.';
import { wrapAdvancedList } from '../../_shared/hocs';
import { getAllStudents } from '../../_shared/services';
import { studentSearchFunction } from './_helpers';
import { MultiLocation } from '../../_shared/components';
import { constants } from '../../_shared/constants';

type Props = {
  data: Array
};

export const StudentListView = props => {
  return <StudentList {...props} />;
};

export const StudentDetailView = props => {
  return <StudentDetails {...props} />;
};

export const StudentFilterView = props => {
  return <StudentFilter {...props} />;
};

export const MapDistributionView = (props: Props) => {
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
  StudentListView,
  StudentDetailView,
  StudentFilterView,
  MapDistributionView,
  getAllStudents,
  studentSearchFunction
);
