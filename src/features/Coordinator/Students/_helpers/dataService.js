import { getAllStudents } from '../../../_shared/services';
import { selectionOptions } from '../../../_shared/selectionOptions';

export async function studentSearchFunction(searchTerm, originalData) {
  return originalData.filter(item => {
    return (
      item.surname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      item.other_names.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      item.index_number
        .toString()
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase()) > -1
    );
  });
}

export async function getStudentWithFilters(data) {
  const { region, department, district } = data;
  const resp = await getAllStudents();
  if (resp.error) {
    return resp;
  }
  const students = resp.data;

  const filteredData = students.filter(
    student =>
      (region !== 0
        ? selectionOptions.REGIONS[region].text === student.region
        : true) &&
      (department !== 0 ? department === student.main_department_id : true) &&
      (district !== 0
        ? selectionOptions.DISTRICTS[selectionOptions.REGIONS[region].text][
            district
          ].text === student.district
        : true)
  );
  return filteredData;
}
