/*
 * @Author: Joshua Asare
 * @Date: 2020-02-14 03:16:48
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-14 04:24:59
 */
import React from 'react';
import { LocationWrapper } from '../../_shared/components';
import './css/companyAddition.css';

const CompanyAdditionTest = () => {
  const onLocationSelectChange = (locationDetails, locationId) => {
    console.log('det', locationDetails);
  };

  return (
    <div className="comp-add">
      <LocationWrapper onLocationSelectChange={onLocationSelectChange} />
    </div>
  );
};

export default CompanyAdditionTest;
