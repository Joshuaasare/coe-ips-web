/*
 * @Author: Joshua Asare
 * @Date: 2019-11-17 06:42:51
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-23 17:37:23
 */
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { MainContent, Icon as IKon } from '../../_shared/components';
import coeLogo from '../../_shared/assets/images/coe-logo.png';
import note from '../../_shared/assets/svg/grad.svg';
import './css/studentInstructions.css';
import { instructions } from '../_helpers/instructions';
import { routes } from '../routes';

type Props = {
  pushRoute: () => void
};

const StudentInstructions = (props: Props) => {
  const { pushRoute } = props;

  function renderToolbar() {
    return (
      <div className="student-registration__toolbar">
        <div onClick={() => props.pushRoute(routes.LANDING.path)}>
          <img src={coeLogo} alt="" className="toolbar-logo" />
        </div>
      </div>
    );
  }

  function renderInstructions(ins: Array<string>) {
    return ins.map((instruction, i) => {
      const key = `ins-${i}`;
      return (
        <div key={key} className="student-registration__instruction-group">
          <div>
            <IKon
              name="check-circle"
              className="student-registration__instruction-group-icon"
            />
          </div>

          <span>{instruction}</span>
        </div>
      );
    });
  }
  return (
    <MainContent toolbar={renderToolbar()}>
      <div className="student-registration">
        <div className="info">
          <div className="row">
            <div className="col-1-of-3">
              <div className="note_image-container">
                <img src={note} className="note_image" alt="" />
              </div>
            </div>

            <div className="col-2-of-3">
              <div className="student-registration__welcome">
                <span className="student-registration__welcome--main">
                  Welcome to the Student Registration Page
                </span>

                {/* <span className="student-registration__welcome--sub">
                  To begin, Please read the instruction below carefully and
                  proceed
                </span> */}
              </div>
            </div>
          </div>
        </div>

        <div className="student-registration__instructions">
          {renderInstructions(instructions.STUDENT_REGISTRATION_INSTRUCTIONS)}
        </div>

        <div className="student-registration__button-container">
          <Button
            size="massive"
            color="teal"
            onClick={() => pushRoute(routes.STUDENT_REGISTRATION_FORM.path)}
          >
            Proceed
            <Icon name="arrow right" />
          </Button>
        </div>
      </div>
    </MainContent>
  );
};

export { StudentInstructions };
