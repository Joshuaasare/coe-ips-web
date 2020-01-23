/*
 * @Author: Joshua Asare
 * @Date: 2019-12-05 18:19:04
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-22 13:32:57
 */
import React from 'react';
import { Button } from 'semantic-ui-react';
import { MainContent, CircularButton } from '../../_shared/components';
import {} from '../../_shared/services';
import './css/timeline.css';

type Props = {
  timeline: Array,
  currentStudentData: Object,
  onModalOpen: () => {}
};
const Timeline = (props: Props) => {
  const { timeline, currentStudentData, onModalOpen } = props;

  function renderTimeline(timeline) {
    return timeline.map((item, index, data) => {
      const key = `timeline-${index}`;
      return (
        <div className="timeline__box" key={key}>
          <div
            className={!(index === data.length - 1) ? 'timeline__inner' : ''}
          />
          <div className="timeline__group">
            <div className="timeline__icon-title">
              <CircularButton
                backgroundColor="#fff"
                border="#ffd25a solid 0.2rem"
                size={3}
                iconName={item.status ? 'check-symbol' : 'android-close'}
                iconSize={1.2}
                iconColor={item.status ? 'green' : 'maroon'}
              />
              <span>{item.title}</span>
            </div>

            <span className="timeline__time">{item.time}</span>
          </div>

          <div className={item.status ? 'timeline__info' : 'timeline__full'}>
            <span style={{ color: item.status ? 'green' : 'maroon' }}>
              {item.subtitle === 'Not Began' ? (
                <Button
                  size="massive"
                  content="Began Internship"
                  color="teal"
                  icon="rocket"
                  disabled={!currentStudentData.companyId}
                  fluid
                  onClick={onModalOpen}
                />
              ) : (
                <span style={{ color: item.status ? 'green' : 'maroon' }}>
                  {item.subtitle}
                </span>
              )}
            </span>
          </div>
        </div>
      );
    });
  }

  return (
    <MainContent>
      <div className="timeline">{renderTimeline(timeline)}</div>
    </MainContent>
  );
};

export default Timeline;
