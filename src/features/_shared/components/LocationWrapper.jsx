/*
 * @Author: Joshua Asare
 * @Date: 2020-02-10 10:52:03
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-10 11:36:33
 */
import React from 'react';
import { Form } from 'semantic-ui-react';
import { LocationSelection } from '.';
import { constants } from '../constants';
import './css/locationWrapper.css';

type Props = {};

const LocationWrapper = (props: Props) => {
  return (
    <>
      <div>
        <Form>
          <Form.Select />
        </Form>
      </div>
      <LocationSelection
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${constants.maps.API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: '400px' }} />}
      />
    </>
  );
};

export default LocationWrapper;
