/*
 * @Author: Joshua Asare
 * @Date: 2020-02-11 23:43:26
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-19 11:22:57
 */
import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { CenterPage, Loader, Ikon, CacheImage } from '../../_shared/components';

type Props = {
  activeItem: Object
};

const StudentDetails = (props: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentDetails, setStudentDetails] = useState({});

  useEffect(() => {
    initPageData();
  }, [props.activeItem]);

  function initPageData() {
    if (props.activeItem) {
      resetState();
      setStudentDetails(props.activeItem);
      setLoading(false);
    }
  }

  function resetState() {
    setEditMode(false);
    setLoading(true);
  }

  function renderContent() {
    if (loading) {
      return (
        <CenterPage>
          <Loader active coverEverything inverted content="Loading" />
        </CenterPage>
      );
    }

    if (editMode) {
      return null;
    }

    return (
      <div className="details-box">
        <span className="details-box__header">{studentDetails.name}</span>

        <div className="details-box__body">
          <div className="logo">
            <CacheImage
              name={studentDetails.name}
              id={studentDetails.id}
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

                <span className="text">{studentDetails.postal_address}</span>
              </div>
            </div>

            <div className="col-1-of-3">
              <div className="info-box">
                <div className="icon-container">
                  <Ikon name="phone" color="#ffd25a" size={1.5} />
                </div>

                <span className="text">{studentDetails.phone}</span>
              </div>
            </div>

            <div className="col-1-of-3">
              <div className="info-box">
                <div className="icon-container">
                  <Ikon name="paperplane" color="#ffd25a" size={1.5} />
                </div>

                <span className="text">{StudentDetails.email}</span>
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
        </div>
      </div>
    );
  }
  return <div className="student-details">{renderContent()}</div>;
};

export default StudentDetails;
