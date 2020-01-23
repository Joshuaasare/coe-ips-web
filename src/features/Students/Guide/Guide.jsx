/*
 * @Author: Joshua Asare
 * @Date: 2020-01-01 16:11:46
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-09 10:30:38
 */
import React, { useState } from 'react';
import {} from '../../_shared/components';
import { Accordion, Icon } from 'semantic-ui-react';
import { guidelines, faqs } from './_helpers';
import './css/guide.css';
import { svg } from '../../_shared/assets';

const Guide = () => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  function renderContent() {
    return (
      <div className="guide">
        <div className="guideline__header">
          <span>Internship Guide Lines</span>
        </div>
        <div className="row">{renderGuidelines()}</div>
        <div className="guide__faqs">
          <div className="guideline__header">
            <span>FAQs</span>
          </div>
          <div className="guide__faqs-body">{renderFaqs()}</div>
        </div>
      </div>
    );
  }

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeAccordionIndex === index ? -1 : index;
    setActiveAccordionIndex(newIndex);
  };

  function renderFaqs() {
    return (
      <Accordion styled fluid>
        {faqs.map((faq, index) => {
          const key = `faq-${index}`;
          return (
            <React.Fragment key={key}>
              <Accordion.Title
                active={activeAccordionIndex === index}
                index={index}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                {faq.title}
              </Accordion.Title>
              <Accordion.Content active={activeAccordionIndex === index}>
                <p>{faq.content}</p>
              </Accordion.Content>
            </React.Fragment>
          );
        })}
      </Accordion>
    );
  }

  function renderGuidelines() {
    return guidelines.map((item, index) => {
      const key = `guideline-${index}`;
      return (
        <div className="col-1-of-2" key={key}>
          <div className="guideline-cover">
            <div className="guideline-cover__image-container">
              {/* <div className="guide__circular">{}</div> */}
              <img
                src={svg[item.svg]}
                className="guideline-cover__image"
                alt=""
              />
            </div>

            <div className="guideline-cover__text-container">
              <span className="guide-text__header">{item.header}</span>
              <span className="guide-text__content">{item.content}</span>
            </div>
          </div>
        </div>
      );
    });
  }
  return <div>{renderContent()}</div>;
};

export default Guide;
