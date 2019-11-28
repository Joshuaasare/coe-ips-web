/*
 * @Author: Joshua Asare
 * @Date: 2019-11-18 23:42:29
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-11-19 21:18:38
 *
 * @flow
 */
import React from 'react';
import { Form } from 'semantic-ui-react';
import { MainContent } from '../../_shared/components';

type Props = {
  surname: string,
  otherNames: string,
  indexNumber: number,
  onChange: () => void,
};

const PersonalInfoForm = (props: Props) => {
  const { surname, otherNames, indexNumber, onChange } = props;
  return (
    <MainContent>
      <div className="per-info">
        <Form.Input
          size="large"
          label="Enter Surname"
          type="text"
          name="surname"
          placeholder="Surname"
          width={16}
          className="stud-reg__input"
          onChange={onChange}
          value={surname}
          required
        />

        <Form.Input
          size="large"
          label="Enter Other Names"
          type="text"
          name="otherNames"
          placeholder="Other Names"
          width={16}
          className="stud-reg__input"
          onChange={onChange}
          value={otherNames}
          required
        />

        <Form.Input
          size="large"
          label="Enter Index Number"
          type="number"
          name="indexNumber"
          placeholder="Index Number"
          width={16}
          className="stud-reg__input"
          onChange={onChange}
          value={indexNumber}
          required
        />
      </div>
    </MainContent>
  );
};

export default PersonalInfoForm;
