import { apiPost, apiPut } from '../../../_shared/services';

export async function fetchPlacementData() {}

export async function addStudenCompanyData(companyDetails, locationDetails) {
  const data = { ...companyDetails, locationDetails };
  const resp = await apiPost('/student/add-student-company', data);
  return resp;
}

export async function updateStudentCompanyData(
  companyDetails,
  locationDetails
) {
  const data = { ...companyDetails, locationDetails };
  const resp = await apiPut('/student/update-student-company', data);
  return resp;
}
