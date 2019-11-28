import axios from 'axios';
import { constants } from '../../_shared/constants';

export async function getPlacesFromSearchKey(searchKey: string): Array<Object> {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchKey}&key=${constants.maps.API_KEY}&components=country:gh`;
    const resp = await axios.get(url);
    const options = await convertPlacesToOptionsForUi(resp.data.predictions);
    return options;
  } catch (error) {
    // console.log(error);
    return { error, msg: '' };
  }
}

export async function convertPlacesToOptionsForUi(data: Array) {
  return data.map(item => {
    return { text: item.description, value: item.place_id };
  });
}

export async function getLocationDetails(locationId) {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${locationId}&key=${constants.maps.API_KEY}`;
    const resp = await axios.get(url);
    const result = resp.data.result;
    return {
      name: `${result.name}`,
      coords: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      },
      address: result.formatted_address,
    };
  } catch (error) {
    console.log(error);
    return { error, msg: '' };
  }
}
