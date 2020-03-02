/*
 * @Author: Joshua Asare
 * @Date: 2020-02-11 23:43:26
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-27 13:47:42
 *
 * @flow
 */
import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import * as changeCase from 'change-case';
import { CenterPage, Loader, Ikon, CacheImage } from '../../_shared/components';
import { StudentAdditionForm } from '.';

type Props = {
  activeItem: Object,
  reload: () => {}
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
    const {
      surname,
      other_names: otherNames,
      index_number: indexNumber,
      phone,
      email
    } = studentDetails;
    if (loading) {
      return (
        <CenterPage>
          <Loader active coverEverything inverted content="Loading" />
        </CenterPage>
      );
    }

    if (editMode) {
      return (
        <StudentAdditionForm
          studentInfo={studentDetails}
          reload={props.reload}
        />
      );
    }

    return (
      <div className="details-box">
        <span className="details-box__header">
          {`${surname.toUpperCase()},  ${changeCase.capitalCase(otherNames)}`}
        </span>

        <div className="details-box__body">
          <div className="logo">
            <CacheImage
              name={`${surname.toUpperCase()},  ${changeCase.capitalCase(
                otherNames
              )}`}
              id={studentDetails.user_id}
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

                <span className="text">{indexNumber}</span>
              </div>
            </div>

            <div className="col-1-of-3">
              <div className="info-box">
                <div className="icon-container">
                  <Ikon name="phone" color="#ffd25a" size={1.5} />
                </div>

                <span className="text">{phone}</span>
              </div>
            </div>

            <div className="col-1-of-3">
              <div className="info-box">
                <div className="icon-container">
                  <Ikon name="paperplane" color="#ffd25a" size={1.5} />
                </div>

                <span className="text">{email}</span>
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
