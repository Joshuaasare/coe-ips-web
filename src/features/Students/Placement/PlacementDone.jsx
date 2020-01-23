/*
 * @Author: Joshua Asare
 * @Date: 2020-01-10 10:13:01
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-23 10:06:13
 */
import React, { useState } from 'react';
import {} from '../../_shared/components';
import { MapContainer } from './css/styles';
import { PlacementMap, PlacementDetails } from '.';
import { constants } from '../../_shared/constants';
import CompanyForm from './CompanyForm';

type Props = {
  currentStudentData: Object,
  goToLogin: () => {},
  onCompanyStatusChange: () => {}
};

const PlacementDone = (props: Props) => {
  const { currentStudentData, goToLogin, onCompanyStatusChange } = props;

  const [updateCompany, setUpdateCompany] = useState(false);

  const companyDetails = {
    companyId: currentStudentData.companyId,
    name: currentStudentData.companyName,
    email: currentStudentData.companyEmail,
    contact: currentStudentData.companyContact,
    website: currentStudentData.companyWebsite,
    address: currentStudentData.companyAddress,
    repName: currentStudentData.companyRepName,
    repContact: currentStudentData.companyRepContact,
    repEmail: currentStudentData.companyRepEmail,
    locationId: '',
    acceptanceLetterUrl: currentStudentData.acceptanceLetterUrl,
    acceptanceLetter: null,
    supervisorName: currentStudentData.supervisorName || '',
    supervisorEmail: currentStudentData.supervisorEmail || '',
    supervisorContact: currentStudentData.supervisorContact || '',
    studentUserId: currentStudentData.userId
  };

  const companyLocationDetails = {
    id: currentStudentData.companyLocationId,
    displayName: `${currentStudentData.companyLocationName}, ${currentStudentData.companyLocationAddress}`,
    name: currentStudentData.companyLocationName,
    address: currentStudentData.companyLocationAddress,
    coords: {
      lat: Number(currentStudentData.companyLocationLatitude),
      lng: Number(currentStudentData.companyLocationLongitude)
    }
  };

  function renderPlacementDetails() {
    return (
      <PlacementDetails
        setCompanyUpdateTrue={setCompanyUpdateTrue}
        studentData={currentStudentData}
      />
    );
  }

  const setCompanyUpdateTrue = () => {
    setUpdateCompany(true);
  };

  const setCompanyUpdateFalse = () => {
    setUpdateCompany(false);
  };

  function renderPlacementMap() {
    return (
      <div className="placement-done">
        <PlacementMap
          studentData={currentStudentData}
          goToLogin={goToLogin}
          onCompanyStatusChange={onCompanyStatusChange}
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${constants.maps.API_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<MapContainer />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }

  function renderContent() {
    if (updateCompany) {
      return (
        <CompanyForm
          studentData={currentStudentData}
          initialCompanyState={companyDetails}
          editing
          onCompanyStatusChange={onCompanyStatusChange}
          onBackButtonClick={setCompanyUpdateFalse}
          companyLocationDetails={companyLocationDetails}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-1-of-2">{renderPlacementDetails()}</div>

        <div className="col-1-of-2">{renderPlacementMap()}</div>
      </div>
    );
  }

  return <div className="placement-done">{renderContent()}</div>;
};

export default PlacementDone;
