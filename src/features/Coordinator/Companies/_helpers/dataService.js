import {
  apiDelete,
  isEmpty,
  apiPut,
  getArchivedCompaniesWithContactMade
} from '../../../_shared/services';

export async function getArchivedCompaniesWithFilters(data) {
  const { contactStatus, contactInfoStatus } = data;
  const resp = await getArchivedCompaniesWithContactMade();
  if (resp.error) {
    return resp;
  }
  const companies = resp.data;

  const filteredData = companies.filter(
    company =>
      (contactStatus !== 10 ? contactStatus === company.contact_made : true) &&
      contactInfoCondition(contactInfoStatus, company)
  );
  return filteredData;
}

export async function deleteFromCompanyArchive(ids: Array<number>) {
  const resp = await apiDelete(
    `/coordinator/delete-company-archive/?ids=${ids}`,
    'deleting a company from the archives'
  );
  return resp;
}

export async function sendPlacementRequests(ids: Array<number>) {
  const resp = await apiPut(`/coordinator/placement-request`, { ids });
  return resp;
}

export function contactInfoCondition(contactInfoStatus, company) {
  if (contactInfoStatus === 1) return !isEmpty(company.email);
  if (contactInfoStatus === 2) return !isEmpty(company.phone);
  if (contactInfoStatus === 3) return isEmpty(company.phone);
  if (contactInfoStatus === 4) return isEmpty(company.email);
  if (contactInfoStatus === 5)
    return isEmpty(company.email) && isEmpty(company.phone);
  if (contactInfoStatus === 6)
    return !isEmpty(company.phone) && !isEmpty(company.email);
  return true;
}

export async function uploadCompanyData(data) {
  const resp = await apiPut('/coordinator/update-company-archive', data);
  return resp;
}
