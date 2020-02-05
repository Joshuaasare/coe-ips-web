/*
 * @Author: Joshua Asare
 * @Date: 2019-11-17 06:42:51
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-04 10:24:53
 */
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { MainContent, Icon as IKon } from '../../_shared/components';
import { instructions } from '../_helpers/instructions';
import { routes } from '../routes';
import { images, svg } from '../../_shared/assets';

type Props = {
  pushRoute: () => void
};

const StudentInstructions = (props: Props) => {
  const { pushRoute } = props;

  function renderToolbar() {
    return (
      <div className="registration__toolbar">
        <div onClick={() => props.pushRoute(routes.LANDING.path)}>
          <img src={images.coeLogo} alt="" className="toolbar-logo" />
        </div>
      </div>
    );
  }

  function renderInstructions(ins: Array<string>) {
    return ins.map((instruction, i) => {
      const key = `ins-${i}`;
      return (
        <div key={key} className="registration__instruction-group">
          <div>
            <IKon
              name="check-circle"
              className="registration__instruction-group-icon"
            />
          </div>

          <span>{instruction}</span>
        </div>
      );
    });
  }
  return (
    <MainContent toolbar={renderToolbar()}>
      <div className="registration">
        <div className="info">
          <div className="row">
            <div className="col-1-of-3">
              <div className="note_image-container">
                <img src={svg.grad} className="note_image" alt="" />
              </div>
            </div>

            <div className="col-2-of-3">
              <div className="registration__welcome">
                <span className="registration__welcome--main">
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

        <div className="registration__instructions">
          {renderInstructions(instructions.STUDENT_REGISTRATION_INSTRUCTIONS)}
        </div>

        <div className="registration__button-container">
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
