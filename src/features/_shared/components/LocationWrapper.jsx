/*
 * @Author: Joshua Asare
 * @Date: 2020-02-10 10:52:03
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-14 10:38:26
 */
import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { LocationSelection } from '.';
import { constants } from '../constants';
import {
  getPlacesFromSearchKey,
  getLocationDetails,
  isEmpty
} from '../services';
import './css/locationWrapper.css';

type Props = {
  onLocationSelectChange?: () => {},
  locationName: string
};

const LocationWrapper = (props: Props) => {
  const [searchKey, setSearchKey] = useState('');
  const [places, setPlaces] = useState([]);
  const [locationDetails, setLocationDetails] = useState({});
  const [locationId, setLocationId] = useState('');

  useEffect(() => {
    fetchPlaces();
  }, [searchKey]);

  console.log(props);

  async function fetchPlaces() {
    const resp = await getPlacesFromSearchKey(searchKey);
    if (!resp.error) {
      setPlaces(resp);
    } else {
      // setPlaces[]
    }
  }

  const onSearchChange = (e: any, { searchQuery }): void => {
    setSearchKey(searchQuery);
  };

  const onLocationChange = async (e: any, data): void => {
    // setCompanyDetails({ ...companyDetails, [name]: value });
    const locationDetails = await getLocationDetails(data.value);
    setLocationId(data.value);
    setLocationDetails({ ...locationDetails });
    return props.onLocationSelectChange({
      locationDetails,
      locationId: data.value
    });
  };

  return (
    <>
      <div className="location-wrapper">
        <Form>
          <Form.Select
            label={
              !isEmpty(props.locationName)
                ? props.locationName
                : 'Search Location'
            }
            size="large"
            search
            className="stud-reg__select"
            onSearchChange={onSearchChange}
            placeholder="Search Location"
            options={places}
            loading={!places && places !== []}
            onChange={onLocationChange}
            name="locationId"
          />
        </Form>
      </div>

      <LocationSelection
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${constants.maps.API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: '350px' }} />}
        locationDetails={locationDetails}
        locationId={locationId}
      />
    </>
  );
};

LocationWrapper.defaultProps = {
  onLocationSelectChange: () => {}
};

export default LocationWrapper;
