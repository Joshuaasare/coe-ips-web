/*
 * @Author: Joshua Asare
 * @Date: 2019-11-19 05:54:15
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-11-19 21:18:58
 */
import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { MainContent } from '../../_shared/components';
import { selectionOptions } from '../../_shared/selectionOptions';

type Props = {};
const AcademicForm = (props: Props) => {
  const { department, programme, haveCompany, onChange } = props;
  return (
    <MainContent>
      <div className="acad-form">
        <Form.Select
          size="large"
          search
          label="Select Department"
          selection
          name="department"
          placeholder="Department"
          className="stud-reg__select"
          value={department}
          options={selectionOptions.DEPARTMENTS}
          onChange={onChange}
          required
        />

        <Form.Select
          size="large"
          search
          label="Select Programme of Study"
          selection
          name="programme"
          placeholder="Programme of Study"
          className="stud-reg__select"
          value={programme}
          options={selectionOptions.PROGRAMMES}
          onChange={onChange}
          required
        />

        <span className="stud-reg__yesno">
          Do you have a company to Intern with
        </span>
        <Form.Field>
          <Radio
            label="Yes"
            name="haveCompany"
            value="yes"
            checked={haveCompany === 'yes'}
            onChange={onChange}
            className="stud-reg__radio"
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="No"
            name="haveCompany"
            value="no"
            checked={haveCompany === 'no'}
            onChange={onChange}
            className="stud-reg__radio"
          />
        </Form.Field>
      </div>
    </MainContent>
  );
};

export default AcademicForm;
