/*
 * @Author: Joshua Asare
 * @Date: 2020-03-09 10:23:07
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-10 07:55:00
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import ReactToPrint from 'react-to-print';
import {
  CenterPage,
  Loader,
  CacheImage,
  Ikon,
  EmptyState
} from '../../_shared/components';
import { PlacementAdditionForm } from '.';
import { PlacementLetter } from '../../_shared/letters';
import { getCompanyStudents } from './_helpers';
import { constants } from '../../_shared/constants';

type Props = {
  activeItem: Object,
  reload: () => {}
};

const PlacementDetails = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestPrintLoading, setRequestPrintLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({});

  const placementLetterRef = useRef(null);

  function renderLetter() {
    return (
      <div className="letter-hidden">
        <PlacementLetter
          ref={placementLetterRef}
          companyDetails={companyDetails}
        />
      </div>
    );
  }

  useEffect(() => {
    initPageData();
  }, [props.activeItem]);

  async function initPageData() {
    if (props.activeItem) {
      resetState();
      const resp = await getCompanyStudents(props.activeItem.companyId);
      if (resp.error) {
        setLoading(false);
        return handleErrors(resp.error);
      }
      setCompanyDetails({ ...props.activeItem, placedStudents: resp.data });
      setLoading(false);
    }
    return null;
  }

  function handleErrors(error) {
    if (error === constants.errors.UNAUTHENTICATED_USER) {
      setError({
        errorMessage:
          'Oops...You need to Login again before making this request',
        svgToUse: 'security',
        buttonText: 'Login'
      });
    }
    if (error === constants.errors.NO_INTERNET_CONNECTION) {
      setError({
        errorMessage: 'No internet Connection',
        svgToUse: 'broadcast',
        buttonText: 'Reconnect'
      });
    }

    if (error === constants.errors.UNPROCCESSABLE_REQUEST) {
      setError({
        errorMessage: 'An unexpected error occured. Please try again Later',
        svgToUse: 'robot',
        buttonText: 'retry'
      });
    }
    setError({
      errorMessage: 'An unexpected error occured. Please try again Later',
      svgToUse: 'robot',
      buttonText: 'retry'
    });
  }

  function resetState() {
    setEditMode(false);
    setLoading(true);
    setError(null);
    setRequestPrintLoading(false);
  }

  function renderContent() {
    if (error && !loading) {
      return (
        <CenterPage>
          <EmptyState
            svgToUse={error.svgToUse}
            content={error.errorMessage}
            buttonColor="red"
            buttonText={error.buttonText}
            onClick={() => initPageData()}
          />
        </CenterPage>
      );
    }
    if (loading) {
      return (
        <CenterPage>
          <Loader active coverEverything inverted />
        </CenterPage>
      );
    }

    if (editMode) {
      return (
        <PlacementAdditionForm
          companyDetails={companyDetails}
          cancelEdit={() => setEditMode(false)}
          reload={props.reload}
        />
      );
    }

    return (
      <>
        <div className="details-box">
          <span className="details-box__header">
            {companyDetails.companyName}
          </span>

          <div className="details-box__body">
            <div className="logo">
              <CacheImage
                name={companyDetails.companyName}
                id={companyDetails.companyId}
                containerClassName="profile__avatar-container"
                imageClassName="profile__avatar-image"
              />
            </div>

            <div className="row">
              <div className="col-1-of-3">
                <div className="info-box">
                  <div className="icon-container">
                    <Ikon name="location2" color="#ffd25a" size={1.5} />
                  </div>

                  <span className="text">{companyDetails.location}</span>
                </div>
              </div>

              <div className="col-1-of-3">
                <div className="info-box">
                  <div className="icon-container">
                    <Ikon name="phone" color="#ffd25a" size={1.5} />
                  </div>

                  <span className="text">{companyDetails.phone}</span>
                </div>
              </div>

              <div className="col-1-of-3">
                <div className="info-box">
                  <div className="icon-container">
                    <Ikon name="paperplane" color="#ffd25a" size={1.5} />
                  </div>

                  <span className="text">{companyDetails.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="details-box__footer">
            <Button
              content="Edit"
              color="google plus"
              icon="pencil"
              size="massive"
              fluid
              onClick={() => setEditMode(true)}
            />

            <ReactToPrint
              trigger={() => (
                <Button
                  content="Letter"
                  color="teal"
                  icon="cloud download"
                  size="massive"
                  fluid
                  loading={requestPrintLoading}
                />
              )}
              copyStyles
              content={() => placementLetterRef.current}
              onBeforeGetContent={() => {
                setRequestPrintLoading(true);
                placementLetterRef.current.setDocumentTitle();
              }}
              onBeforePrint={() => {
                setRequestPrintLoading(false);
              }}
              onAfterPrint={() =>
                placementLetterRef.current.removeDocumentTitle()
              }
            />
          </div>
        </div>

        {renderLetter()}
      </>
    );
  }

  return <div className="">{renderContent()}</div>;
};

export default PlacementDetails;
