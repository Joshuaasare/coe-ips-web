import { apiPost } from '../../../_shared/services';

export async function registerCompany(
  companyDetails,
  locationDetails,
  departments
) {
  const data = { ...companyDetails, locationDetails, departments };
  const resp = await apiPost('/company/register-company', data);
  return resp;
}
