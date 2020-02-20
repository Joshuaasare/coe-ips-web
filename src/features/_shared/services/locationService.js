/* eslint-disable no-undef */
import axios from 'axios';
import { constants } from '../constants';

export async function getPlacesFromSearchKey(searchKey: string): Array<Object> {
  try {
    const proxyUrl = 'https://coe-cors-anywhere.herokuapp.com/';
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchKey}&key=${constants.maps.API_KEY}&components=country:gh|country:ng|country:ke|country:ci|country:gm`;
    const resp = await axios.get(`${proxyUrl}${url}`);
    const options = await convertPlacesToOptionsForUi(resp.data.predictions);
    return options;
  } catch (error) {
    console.log(error);
    return { error: { msg: 'A problem occured' } };
  }
}

export async function convertPlacesToOptionsForUi(data: Array) {
  return data.map(item => {
    return { text: item.description, value: item.place_id };
  });
}

export async function getLocationDetails(locationId) {
  try {
    const proxyUrl = 'https://coe-cors-anywhere.herokuapp.com/';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${locationId}&key=${constants.maps.API_KEY}`;
    const resp = await axios.get(`${proxyUrl}${url}`);
    const result = resp.data.result;
    const ac = result.address_components;

    const routeObject = ac.find(c => c.types.includes('route'));
    const localityObject = ac.find(c => c.types.includes('locality'));
    const subLocalityObject = ac.find(c => c.types.includes('sub_locality'));
    const metropolisObject = ac.find(c =>
      c.types.includes('administrative_area_level_2')
    );
    const regionObject = ac.find(c =>
      c.types.includes('administrative_area_level_1')
    );
    const countryObject = ac.find(c => c.types.includes('country'));

    return {
      name: `${result.name}`,
      coords: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng
      },
      google_place_id: locationId,
      address: result.formatted_address,
      route: routeObject ? routeObject.long_name : '',
      locality: localityObject ? localityObject.long_name : '',
      subLocality: subLocalityObject ? subLocalityObject.long_name : '',
      district: metropolisObject ? metropolisObject.long_name : '',
      region: regionObject ? regionObject.long_name : '',
      country: countryObject ? countryObject.long_name : ''
    };
  } catch (error) {
    return { error, msg: '' };
  }
}
