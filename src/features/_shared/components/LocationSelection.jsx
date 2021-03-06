/*
 * @Author: Joshua Asare
 * @Date: 2020-02-10 10:18:08
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-10 11:23:27
 */

import React, { memo } from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';
import { MainContent } from '.';
import './css/locationSelection.css';

type Props = {
  locationDetails?: Object,
  region: Object,
  initialRegion: Object
};

// eslint-disable-next-line no-undef

const LocationSelection = memo((props: Props) => {
  function renderToolbar() {}

  console.log('sele', props);

  // function renderDefaultCenter() {}

  return (
    <MainContent toolbar={renderToolbar()}>
      <GoogleMap
        key={new Date().getTime()}
        defaultZoom={12}
        defaultCenter={
          props.region || props.initialRegion || { lat: -34.397, lng: 150.644 }
        }
      >
        <Marker
          position={
            props.region ||
            props.initialRegion || { lat: -34.397, lng: 150.644 }
          }
        />
      </GoogleMap>
    </MainContent>
  );
});

LocationSelection.defaultProps = {
  locationDetails: {}
};

export default withScriptjs(withGoogleMap(LocationSelection));
