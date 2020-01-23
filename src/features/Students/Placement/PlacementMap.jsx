/*
 * @Author: Joshua Asare
 * @Date: 2020-01-04 09:03:16
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-23 18:06:01
 */
import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  DirectionsRenderer
} from 'react-google-maps';

type Props = {
  studentData: Object<{
    latitude?: number,
    longitude?: number
  }>
};

// eslint-disable-next-line no-undef
const google = window.google;
const PlacementMap = (props: Props) => {
  const [directions, setDirections] = useState(null);
  const { studentData } = props;

  const {
    latitude,
    longitude,
    companyLocationLatitude,
    companyLocationLongitude
  } = studentData;

  useEffect(() => {
    fetchDirections();
  }, []);

  function fetchDirections() {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(latitude, longitude),
        destination: new google.maps.LatLng(
          companyLocationLatitude,
          companyLocationLongitude
        ),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  return (
    <div className="placement__map">
      {directions && (
        <GoogleMap
          defaultZoom={12}
          defaultCenter={new google.maps.LatLng(41.85073, -87.65126)}
        >
          <DirectionsRenderer directions={directions} />
        </GoogleMap>
      )}
    </div>
  );
};

export default withScriptjs(withGoogleMap(PlacementMap));
