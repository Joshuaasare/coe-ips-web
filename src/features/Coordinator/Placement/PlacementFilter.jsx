/*
 * @Author: Joshua Asare
 * @Date: 2020-02-22 16:29:06
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-06 11:35:28
 *
 * @flow
 */
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { svg } from '../../_shared/assets';
import { selectionOptions } from '../../_shared/selectionOptions';
import { useDidUpdateEffect } from '../../_shared/hooks';
import { getCompanySlotsWithFilters } from './_helpers/dataService';

type Props = {
  refreshList: () => {},
  originalData: Array
};

const PlacementFilter = (props: Props) => {
  const [filterParams, setFilterParams] = useState({
    geometry: 0,
    fallback: 0
  });

  async function fetchFilteredData() {
    const resp = await getCompanySlotsWithFilters(
      filterParams,
      props.originalData
    );
    return props.refreshList(resp);
  }

  useDidUpdateEffect(fetchFilteredData, [filterParams]);

  const handleSelectChange = (e, { name, value }) => {
    setFilterParams({ ...filterParams, [name]: value });
  };

  const onParamsReset = () => {
    setFilterParams({
      geometry: 0,
      fallback: 0
    });
  };

  return (
    <div className="filters">
      <div className="filters__svg-container">
        <img alt="" className="filters__svg" src={svg.logs} />
      </div>

      <Form>
        <Form.Select
          label="Select Maximum Geometric Radius"
          fluid
          selection
          options={selectionOptions.GEOMETRY_OPTIONS}
          placeholder="Radius"
          style={{ width: '35rem' }}
          onChange={handleSelectChange}
          name="geometry"
          className="stud-reg__select"
          value={filterParams.geometry}
        />

        <Form.Select
          label="Select Fallback Filter"
          fluid
          selection
          options={selectionOptions.PLACEMENT_FALLBACK_OPTION}
          placeholder="Fallback"
          style={{ width: '35rem' }}
          onChange={handleSelectChange}
          name="fallback"
          className="stud-reg__select"
          value={filterParams.fallback}
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

export default PlacementFilter;
