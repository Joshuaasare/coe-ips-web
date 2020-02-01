/*
 * @Author: Joshua Asare
 * @Date: 2020-01-26 17:56:25
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-01 06:06:40
 */

import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from 'semantic-ui-react';
import { CenterPage, Loader, Ikon, CacheImage } from '../../_shared/components';
import { PlacementRequest } from '../../_shared/letters';
import { CompanyAdditionForm } from '.';

type Props = {
  activeItem: Object,
  reload: () => {}
};

const CompanyDetails = (props: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState({});
  const [requestPrintLoading, setRequestPrintLoading] = useState(false);

  const placementRequestRef = useRef(null);

  useEffect(() => {
    initPageData();
  }, [props.activeItem]);

  function initPageData() {
    if (props.activeItem) {
      resetState();
      setCompanyDetails(props.activeItem);
      setLoading(false);
    }
  }

  function resetState() {
    setEditMode(false);
    setLoading(true);
    setRequestPrintLoading(false);
  }

  const cancelEdit = () => {
    setEditMode(false);
  };

  function renderLetter() {
    return (
      <div className="letter-hidden">
        <PlacementRequest
          ref={placementRequestRef}
          companyDetails={companyDetails}
        />
      </div>
    );
  }

  function renderContent() {
    if (loading) {
      return (
        <CenterPage>
          <Loader active coverEverything />
        </CenterPage>
      );
    }

    if (editMode) {
      return (
        <CompanyAdditionForm
          reload={props.reload}
          companyDetails={companyDetails}
          cancelEdit={cancelEdit}
        />
      );
    }

    return (
      <div className="details-box">
        <span className="details-box__header">{companyDetails.name}</span>
        <div className="details-box__body">
          <div className="logo">
            <CacheImage
              name={companyDetails.name}
              id={companyDetails.id}
              containerClassName="profile__avatar-container"
              imageClassName="profile__avatar-image"
            />
          </div>

          <div className="row">
            <div className="col-1-of-3">
              <div className="info-box">
                <div className="icon-container">
                  <Ikon name="mode_edit" color="#ffd25a" size={1.5} />
                </div>

                <span className="text">{companyDetails.postal_address}</span>
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
          <div className="button-container">
            <Button
              content="Edit"
              color="google plus"
              icon="pencil"
              size="massive"
              fluid
              onClick={() => setEditMode(true)}
            />
          </div>

          <div className="button-container">
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
              content={() => placementRequestRef.current}
              onBeforeGetContent={() => {
                setRequestPrintLoading(true);
                placementRequestRef.current.setDocumentTitle();
              }}
              onBeforePrint={() => {
                setRequestPrintLoading(false);
              }}
              onAfterPrint={() =>
                placementRequestRef.current.removeDocumentTitle()
              }
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="company-details">
      {renderContent()}
      {renderLetter()}
    </div>
  );
};

export default CompanyDetails;
