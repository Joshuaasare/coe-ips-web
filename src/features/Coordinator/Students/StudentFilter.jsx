/*
 * @Author: Joshua Asare
 * @Date: 2020-02-11 23:43:49
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-04 12:06:35
 */
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { selectionOptions } from '../../_shared/selectionOptions';
import { useDidUpdateEffect } from '../../_shared/hooks';
import { getStudentWithFilters } from './_helpers';
import { svg } from '../../_shared/assets';

type Props = {
  refreshList: () => {}
};

const StudentFilters = (props: Props) => {
  const [filterParams, setFilterParams] = useState({
    region: 0,
    department: 0,
    district: 0
  });

  async function fetchFilteredData() {
    const resp = await getStudentWithFilters(filterParams);
    return props.refreshList(resp);
  }

  useDidUpdateEffect(fetchFilteredData, [filterParams]);

  const handleSelectChange = (e, { name, value }) => {
    setFilterParams({ ...filterParams, [name]: value });
  };

  const onParamsReset = () => {
    setFilterParams({
      region: 0,
      department: 0,
      district: 0
    });
  };

  return (
    <div className="filters">
      <div className="filters__svg-container">
        <img alt="" className="filters__svg" src={svg.logs} />
      </div>

      <Form>
        <Form.Select
          label="Region"
          fluid
          selection
          options={selectionOptions.REGIONS}
          placeholder="Region"
          style={{ width: '35rem' }}
          onChange={handleSelectChange}
          name="region"
          className="stud-reg__select"
          value={filterParams.region}
        />

        <Form.Select
          label="Department"
          fluid
          selection
          options={selectionOptions.DEPARTMENTS2}
          placeholder="Department"
          style={{ width: '35rem' }}
          onChange={handleSelectChange}
          name="department"
          className="stud-reg__select"
          value={filterParams.department}
        />

        <Form.Select
          label="District"
          fluid
          selection
          options={
            selectionOptions.DISTRICTS[
              selectionOptions.REGIONS[filterParams.region].text
            ]
          }
          placeholder="District"
          style={{ width: '35rem' }}
          onChange={handleSelectChange}
          name="district"
          className="stud-reg__select"
          value={filterParams.district}
        />
      </Form>

      <Button
        content="reset"
        fluid
        size="massive"
        color="teal"
        onClick={onParamsReset}
      />
    </div>
  );
};

export default StudentFilters;
