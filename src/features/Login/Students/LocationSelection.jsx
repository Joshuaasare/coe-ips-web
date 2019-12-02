/*
 * @Author: Joshua Asare
 * @Date: 2019-11-27 14:17:24
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2019-12-02 12:20:54
 */
import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import { MainContent } from '../../_shared/components';

type Props = {
  locSearchResults: any,
  onChange: () => void,
  locationDetails: Object,
};

const LocationSelection = (props: Props) => {
  function renderToolbar() {}

  return (
    <MainContent toolbar={renderToolbar()}>
      <div className="loc-map">
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
      </div>
    </MainContent>
  );
};

export default withScriptjs(withGoogleMap(LocationSelection));
