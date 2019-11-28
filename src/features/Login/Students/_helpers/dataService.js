import axios from 'axios';
import { getLocationDetails } from '../../_helpers';
import { constants } from '../../../_shared/constants';

export async function registerStudents(studentData) {
  try {
    const locationDetails = await getLocationDetails(studentData.locationId);
    const data = { ...studentData, locationDetails };
    console.log(data);
    const resp = await axios.post(
      `${constants.app.BASE_API_URL}/register/student`,
      data,
    );
    return resp;
  } catch (error) {
    return { error, msg: '' };
  }
}
