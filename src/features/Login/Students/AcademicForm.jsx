/*
 * @Author: Joshua Asare
 * @Date: 2019-11-19 05:54:15
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-11-29 16:06:17
 */
import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { MainContent } from '../../_shared/components';
import { selectionOptions } from '../../_shared/selectionOptions';

type Props = {
  department: string,
  haveCompany: number,
  programme: string,
  onChange: () => void,
  yearOfStudy: string,
  foreignStudent: number,
  controlledProgramme: number,
};

const AcademicForm = (props: Props) => {
  const {
    department,
    haveCompany,
    onChange,
    yearOfStudy,
    foreignStudent,
    controlledProgramme,
  } = props;
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
          options={selectionOptions.DEPARTMENTS}
          value={department}
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
          options={selectionOptions.PROGRAMMES}
          onChange={onChange}
          required
          value={controlledProgramme}
        />

        <Form.Select
          size="large"
          search
          label="Select Year of Study"
          selection
          name="yearOfStudy"
          placeholder="Year of Study"
          className="stud-reg__select"
          value={yearOfStudy}
          options={selectionOptions.YEAR_OF_STUDY}
          onChange={onChange}
          required
        />
        <div className="stud-reg__yesno-container">
          <span className="stud-reg__yesno">Are you a foreign student</span>
          <Form.Field>
            <Radio
              label="Yes"
              name="foreignStudent"
              value={1}
              checked={foreignStudent === 1}
              onChange={onChange}
              className="stud-reg__radio"
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="No"
              name="foreignStudent"
              value={0}
              checked={foreignStudent === 0}
              onChange={onChange}
              className="stud-reg__radio"
            />
          </Form.Field>
        </div>

        <div className="stud-reg__yesno-container">
          <span className="stud-reg__yesno">
            Do you have a company to Intern with
          </span>
          <Form.Field>
            <Radio
              label="Yes"
              name="haveCompany"
              value={1}
              checked={haveCompany === 1}
              onChange={onChange}
              className="stud-reg__radio"
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="No"
              name="haveCompany"
              value={0}
              checked={haveCompany === 0}
              onChange={onChange}
              className="stud-reg__radio"
            />
          </Form.Field>
        </div>
      </div>
    </MainContent>
  );
};

export default AcademicForm;
