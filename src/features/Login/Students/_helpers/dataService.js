import axios from 'axios';
import { getLocationDetails } from '../../../_shared/services';
import { constants } from '../../../_shared/constants';
import { processErrorResponse } from '../../../_shared/services/errorService';

export async function registerStudents(studentData) {
  try {
    const locationDetails = await getLocationDetails(studentData.locationId);
    const data = { ...studentData, locationDetails };
    const resp = await axios.post(
      `${constants.services.MAIN}/student/register`,
      { data }
    );
    return resp.data.data;
  } catch (error) {
    return processErrorResponse(error, 'registration error');
  }
}
