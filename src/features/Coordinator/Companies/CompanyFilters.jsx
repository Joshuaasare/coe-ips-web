/*
 * @Author: Joshua Asare
 * @Date: 2020-01-28 00:45:17
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-03-04 12:08:44
 */
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { selectionOptions } from '../../_shared/selectionOptions';
import { useDidUpdateEffect } from '../../_shared/hooks';
import { getArchivedCompaniesWithFilters } from './_helpers';
import { svg } from '../../_shared/assets';

type Props = {
  refreshList: () => {}
};

const CompanyFilters = (props: Props) => {
  const [filterParams, setFilterParams] = useState({
    contactStatus: 0,
    contactInfoStatus: 0,
    region: 0
  });

  async function fetchFilteredData() {
    const resp = await getArchivedCompaniesWithFilters(filterParams);
    return props.refreshList(resp);
  }

  useDidUpdateEffect(fetchFilteredData, [filterParams]);

  const handleSelectChange = (e, { name, value }) => {
    setFilterParams({ ...filterParams, [name]: value });
  };

  const onParamsReset = () => {
    setFilterParams({
      contactInfoStatus: 0,
      contactStatus: 0,
      region: 0
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
          label="Email Address Status"
          fluid
          selection
          options={selectionOptions.COMPANY_CONTACTED}
          placeholder="Contact Made status"
          style={{ width: '35rem' }}
          onChange={handleSelectChange}
          name="contactStatus"
          className="stud-reg__select"
          value={filterParams.contactStatus}
        />
        <Form.Select
          label="Contact Infomation status"
          fluid
          selection
          options={selectionOptions.COMPANY_CONTACT_INFO_STATUS}
          placeholder="Company Contacted"
          style={{ width: '35rem' }}
          onChange={handleSelectChange}
          name="contactInfoStatus"
          className="stud-reg__select"
          value={filterParams.contactInfoStatus}
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

export default CompanyFilters;
