/*
 * @Author: Joshua Asare
 * @Date: 2020-01-04 09:03:55
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-31 16:53:25
 */
import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from 'semantic-ui-react';
import { EmptyState, CenterPage } from '../../_shared/components';
import { Introductory } from '../../_shared/letters';
import { CompanyForm } from '.';
import {} from '../../_shared/services';

type Props = {
  studentData: Object,
  goToLogin: () => {},
  replaceRoute: () => {},
  onCompanyStatusChange: () => {}
};

const PlacementNotDone = (props: Props) => {
  const { studentData, goToLogin, replaceRoute, onCompanyStatusChange } = props;
  const introductoryLetterRef = useRef(null);
  const [foundCompany, setFoundCompany] = useState(false);

  const initialCompanyState = {
    name: '',
    email: '',
    contact: '',
    website: '',
    address: '',
    repName: '',
    repContact: '',
    repEmail: '',
    locationId: '',
    acceptanceLetter: null,
    acceptanceLetterUrl: '',
    studentUserId: studentData.userId
    // supervisorName: '',
    // supervisorEmail: '',
    // supervisorContact: ''
  };

  const onBackButtonClick = () => {
    setFoundCompany(false);
  };

  const onFoundCompanyClick = () => {
    setFoundCompany(true);
  };

  function renderContent() {
    if (foundCompany) {
      return <div>{renderUpdateCompany()}</div>;
    }

    if (!studentData.companyId) {
      return (
        <CenterPage>
          <EmptyState
            content="Sorry, You have not been placed to any company yet."
            svgToUse="noPlacement"
          />

          <div className="placement__info-buttons">
            <ReactToPrint
              trigger={() => (
                <Button
                  content="Introductory Letter"
                  color="teal"
                  size="massive"
                  icon="download"
                />
              )}
              copyStyles
              content={() => introductoryLetterRef.current}
              onBeforeGetContent={() =>
                introductoryLetterRef.current.setDocumentTitle()
              }
              onAfterPrint={() =>
                introductoryLetterRef.current.removeDocumentTitle()
              }
            />

            <Button
              content="Found Company"
              size="massive"
              color="blue"
              icon="find"
              onClick={onFoundCompanyClick}
            />
          </div>
        </CenterPage>
      );
    }
    return null;
  }

  function renderUpdateCompany() {
    return (
      <CompanyForm
        initialCompanyState={initialCompanyState}
        isMarkerShown
        onBackButtonClick={onBackButtonClick}
        studentData={studentData}
        goToLogin={goToLogin}
        replaceRoute={replaceRoute}
        onCompanyStatusChange={onCompanyStatusChange}
      />
    );
  }

  function renderLetters() {
    return (
      <div className="letter-hidden">
        <Introductory
          currentStudentData={studentData}
          ref={introductoryLetterRef}
        />
      </div>
    );
  }

  return (
    <div className="placement__info">
      {renderContent()}
      {renderLetters()}
    </div>
  );
};

export default PlacementNotDone;
