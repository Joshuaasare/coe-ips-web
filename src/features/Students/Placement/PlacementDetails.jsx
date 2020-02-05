/*
 * @Author: Joshua Asare
 * @Date: 2020-01-12 21:03:20
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-05 17:52:26
 */
import React from 'react';
import { Message, Button, Dropdown } from 'semantic-ui-react';
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
        <div className="placement-details__company">
          <div className="placement-details__option-container">
            <div className="placement-details__company-item">
              <CircularButton
                iconSize={1.4}
                iconName="profile"
                backgroundColor="#1f2a39"
                iconColor="#ffd25a"
                iconClassName="company__icon"
                containerClassName="company__icon-container"
              />
              <div className="placement-details__company-text">
                <span className="item__header">Company</span>
                <span className="item__content">
                  {studentData.companyName || ''}
                </span>
              </div>
            </div>

            <div className="placement-details__option">
              <Dropdown icon="ellipsis vertical" floating direction="left">
                <Dropdown.Menu className="cursor-pointer">
                  <Dropdown.Item
                    icon="cancel"
                    text="Reject Placement"
                    className="placement-details__dropdown"
                    disabled={studentData.wantPlacement === 0}
                    onClick={() => {}}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="placement-details__company-item">
            <CircularButton
              iconName="paperplane"
              iconColor="#ffd25a"
              backgroundColor="#1f2a39"
              iconClassName="company__icon"
              containerClassName="company__icon-container"
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
              iconName="location2"
              iconColor="#ffd25a"
              backgroundColor="#1f2a39"
              iconClassName="company__icon"
              containerClassName="company__icon-container"
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
              backgroundColor="#1f2a39"
              iconName="mobile"
              iconColor="#ffd25a"
              iconClassName="company__icon"
              containerClassName="company__icon-container"
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
