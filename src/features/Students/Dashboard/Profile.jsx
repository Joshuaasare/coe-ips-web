/*
 * @Author: Joshua Asare
 * @Date: 2019-12-05 18:18:07
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-23 16:27:24
 */
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from 'semantic-ui-react';
import { Ikon } from '../../_shared/components';
import { svg } from '../../_shared/assets';
import { Introductory } from '../../_shared/letters';
import './css/profile.css';

type Props = {
  id?: number,
  profileData: Array,
  name: string,
  programme: string,
  pushRoute: () => {},
  currentStudentData: Object
};

const Profile = (props: Props) => {
  const { profileData, name, programme, currentStudentData } = props;
  const introductoryLetterRef = useRef();

  return (
    <div className="profile">
      <div className="profile__avatar">
        <img src={svg.teach} alt="" className="profile__svg" />
        <span className="profile__name">{name}</span>
        <span className="profile__programme">{programme}</span>
      </div>

      <div className="profile__info">
        {profileData.map((item, index) => {
          const key = `refprofile-info-${index}`;
          return (
            <div className="info__group" key={key} style={{}}>
              <div className="info__icon-title">
                <Ikon name={item.icon} className="info__icon" />
                <span className="info__icon-text">{item.title}</span>
              </div>
              <span className="info__text">{item.subtitle}</span>
            </div>
          );
        })}
      </div>

      <div className="profile__button-container">
        <ReactToPrint
          trigger={() => (
            <Button
              content="Introductory Letter"
              color="google plus"
              fluid
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
          content="Acceptance Letter"
          color="teal"
          fluid
          size="massive"
          icon="download"
          disabled={!currentStudentData.companyId}
        />
      </div>

      <div className="profile__introductory-letter">
        <Introductory
          currentStudentData={currentStudentData}
          ref={introductoryLetterRef}
        />
      </div>
    </div>
  );
};

Profile.defaultProps = {
  id: 2
};

export default Profile;
