import { apiGet } from '../../../_shared/services';

export async function getCompaniesWithSlots() {
  const resp = await apiGet('/coordinator/companies-with-slots');
  return resp;
}
