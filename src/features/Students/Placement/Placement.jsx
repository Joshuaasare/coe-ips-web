/*
 * @Author: Joshua Asare
 * @Date: 2019-12-10 20:12:27
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-23 18:05:37
 */
import React, { useState, useEffect } from 'react';
import { Loader, CenterPage, EmptyState } from '../../_shared/components';
import { PlacementNotDone, PlacementDone } from '.';
import { constants } from '../../_shared/constants';
import { getCurrentStudentData } from '../../_shared/services';
import {} from '../../_shared/hooks';
import './css/placement.css';

type Props = {
  goToLogin: () => {},
  replaceRoute: () => {}
};

const Placement = (props: Props) => {
  const { goToLogin, replaceRoute } = props;
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStudentData, setCurrentStudentData] = useState(null);

  useEffect(() => {
    initPageData();
  }, []);

  async function initPageData() {
    setPageLoading(true);
    const resp = await getCurrentStudentData();
    if (resp.error) {
      return handleErrors(resp.error);
    }
    const studentData = resp.data;
    setCurrentStudentData(studentData);
    return setPageLoading(false);
  }

  const onReload = () => {
    setError(null);
    setPageLoading(true);
    return initPageData();
  };

  const onCompanyStatusChange = () => {
    onReload();
  };

  function handleErrors(error) {
    if (error === constants.errors.UNAUTHENTICATED_USER) {
      setError({
        errorMessage:
          'Oops...You need to Login again before accessing this page',
        svgToUse: 'security',
        buttonText: 'Login',
        onClick: goToLogin
      });
      return setPageLoading(false);
    }
    if (error === constants.errors.NO_INTERNET_CONNECTION) {
      setError({
        errorMessage: 'No internet Connection',
        svgToUse: 'broadcast',
        buttonText: 'Reconnect',
        onClick: onReload
      });

      return setPageLoading(false);
    }
    return null;
  }

  function renderContent() {
    if (error && !pageLoading) {
      return (
        <CenterPage>
          <EmptyState
            svgToUse={error.svgToUse}
            content={error.errorMessage}
            buttonColor="red"
            buttonText={error.buttonText}
            onClick={error.onClick}
          />
        </CenterPage>
      );
    }
    if (pageLoading) {
      return (
        <CenterPage>
          <Loader coverEverything content="Please wait" active inverted />
        </CenterPage>
      );
    }

    if (currentStudentData.companyId) {
      return (
        <div>
          <PlacementDone
            currentStudentData={currentStudentData}
            goToLogin={goToLogin}
            onCompanyStatusChange={onCompanyStatusChange}
          />
        </div>
      );
    }
    return (
      <div className="row">
        <PlacementNotDone
          noPlacement={!currentStudentData.companyId}
          studentData={currentStudentData}
          goToLogin={goToLogin}
          replaceRoute={replaceRoute}
          onCompanyStatusChange={onCompanyStatusChange}
        />
      </div>
    );
  }
  return <div className="placement">{renderContent()}</div>;
};

export default Placement;
