/*
 * @Author: Joshua Asare
 * @Date: 2019-11-27 14:17:24
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-20 13:50:13
 */
import React, { memo } from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';
import { MainContent } from '../../_shared/components';

type Props = {
  locationDetails: Object
};

const LocationSelection = memo((props: Props) => {
  function renderToolbar() {}

  return (
    <MainContent toolbar={renderToolbar()}>
      <GoogleMap
        key={new Date().getTime()}
        defaultZoom={12}
        defaultCenter={
          props.locationDetails.coords || { lat: -34.397, lng: 150.644 }
        }
      >
        <Marker
          position={
            props.locationDetails.coords || { lat: -34.397, lng: 150.644 }
          }
        />
      </GoogleMap>
    </MainContent>
  );
});

export default withScriptjs(withGoogleMap(LocationSelection));
