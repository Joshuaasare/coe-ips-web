/*
 * @Author: Joshua Asare
 * @Date: 2020-01-12 21:03:20
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-23 18:05:48
 */
import React from 'react';
import { Message, Button } from 'semantic-ui-react';
import { CircularButton } from '../../_shared/components';

const items = [
  'You can find the acceptance letter which you would send to the company on your dashboard',
  "Click on the 'Edit' button below to update your company details including supervisor details",
  'Self placed students who did not upload their acceptance letter from their companies should do so by clicking the edit button'
];

type Props = {
  studentData: Object,
  setCompanyUpdateTrue: () => {}
};
const PlacementDetails = (props: Props) => {
  const { studentData, setCompanyUpdateTrue } = props;
  function renderContent() {
    return (
      <div className="placement-details__container">
        {/* <div className="placement-details__header">
          <span> Your placement has been completed!</span>
        </div> */}

        <div className="placement-details__company">
          <div className="placement-details__company-item">
            <CircularButton
              iconClassName=""
              iconSize={1.4}
              size={4}
              iconName="profile"
              shadowed
            />
            <div className="placement-details__company-text">
              <span className="item__header">Name of Company</span>
              <span className="item__content">
                {studentData.companyName || ''}
              </span>
            </div>
          </div>

          <div className="placement-details__company-item">
            <CircularButton
              iconClassName=""
              iconSize={1.4}
              size={4}
              iconName="paperplane"
              shadowed
            />
            <div className="placement-details__company-text">
              <span className="item__header">Address</span>
              <span className="item__content">
                {studentData.companyAddress || ''}
              </span>
            </div>
          </div>

          <div className="placement-details__company-item">
            <CircularButton
              iconClassName=""
              iconSize={1.4}
              size={4}
              iconName="location2"
              shadowed
            />
            <div className="placement-details__company-text">
              <span className="item__header">Location</span>
              <span className="item__content">
                {studentData.companyLocationAddress || ''}
              </span>
            </div>
          </div>

          <div className="placement-details__company-item">
            <CircularButton
              iconClassName=""
              iconSize={1.4}
              size={4}
              iconName="mobile"
              shadowed
            />
            <div className="placement-details__company-text">
              <span className="item__header">Contact</span>
              <span className="item__content">
                {studentData.companyContact || ''}
              </span>
            </div>
          </div>

          <div className="placement-details__message-container">
            <Message warning>
              <Message.Header>Important Notice</Message.Header>
              <Message.List items={items} />
            </Message>
          </div>

          <div className="placement-details__buttons">
            <Button
              size="massive"
              content="Update"
              fluid
              icon="pencil"
              color="teal"
              onClick={setCompanyUpdateTrue}
            />
            <Button
              size="massive"
              content="Log Book"
              fluid
              icon="download"
              disabled
            />
          </div>
        </div>
      </div>
    );
  }

  return <div className="placement-details">{renderContent()}</div>;
};

export default PlacementDetails;
