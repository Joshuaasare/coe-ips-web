/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Author: Joshua Asare
 * @Date: 2020-02-08 11:33:06
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-11 23:48:28
 */
import React from 'react';
import './css/students.css';
import { StudentList, StudentDetails, StudentFilter } from '.';
import { wrapAdvancedList } from '../../_shared/hocs';

export const StudentListView = props => {
  return <StudentList {...props} />;
};

export const StudentDetailView = props => {
  return <StudentDetails {...props} />;
};

export const StudentFilterView = props => {
  return <StudentFilter {...props} />;
};

export default wrapAdvancedList(
  StudentListView,
  StudentDetailView,
  StudentFilterView,
  () => []
);
