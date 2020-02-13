import { apiGet, apiPost } from './apiService';

export async function getCurrentStudentData() {
  const response = await apiGet('/student/current-student', 'current student');
  return response;
}

export async function getArchivedCompanies() {
  const resp = await apiGet('/coordinator/archived-companies');
  return resp;
}

export async function getArchivedCompaniesWithContactMade() {
  const resp = await apiGet('/coordinator/archived-companies-contact-made');
  return resp;
}

export async function getSubDepartmentsList() {
  const resp = await apiGet('/coordinator/sub-departments');
  return resp;
}

export async function getArchivedCompanyList() {
  const resp = await getArchivedCompaniesWithContactMade();
  if (resp.error) {
    return resp;
  }

  const options = await convertCompaniesToOptionsForUi(resp.data);
  return { data: resp.data, options };
}

export async function convertCompaniesToOptionsForUi(data: Array) {
  return data.map(item => {
    return { text: item.name, value: item.id };
  });
}

export async function addNewCompany(data) {
  const resp = await apiPost('/coordinator/add-company-archive', data);
  return resp;
}

export async function getAllStudents() {
  const resp = await apiGet('/coordinator/students');
  return resp;
}
