import { apiGet, apiPut } from '../../../_shared/services';
import {} from '../../../_shared/selectionOptions';

// eslint-disable-next-line no-undef
const google = window.google;

export async function getCompaniesWithSlots() {
  const resp = await apiGet('/coordinator/companies-with-slots');
  if (resp.error) {
    return resp;
  }
  const data = resp.data.map(company => {
    const companyLoc = new google.maps.LatLng(
      parseFloat(company.lat),
      parseFloat(company.lng)
    );
    return {
      ...company,
      student_options: company.student_options.map(student => {
        const studentLoc = new google.maps.LatLng(
          parseFloat(student.lat),
          parseFloat(student.lng)
        );
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          companyLoc,
          studentLoc
        );

        return {
          ...student,
          distance: distance / 1000
        };
      })
    };
  });
  return { data };
}

export async function getCompanySlotsWithFilters(filterParams, data) {
  const { geometry, fallback } = filterParams;

  const filteredData = data.map(company => {
    return {
      ...company,
      student_options: company.student_options.filter(
        student =>
          geometryCondition(geometry, student) ||
          fallbackCondition(fallback, student, company)
      )
    };
  });

  return filteredData;
}

export function geometryCondition(geometry, student) {
  if (geometry === 0) {
    return false;
  }
  return student.distance < geometry;
}

export function fallbackCondition(fallback, student, company) {
  if (fallback === 1) {
    return student.district === company.district;
  }

  if (fallback === 2) {
    return student.region === company.region;
  }

  return false;
}

export async function uploadPlacementData(placementData) {
  const data = placementData.map(company => {
    return {
      companyId: company.companyId,
      companyName: company.companyName,
      companyLocation: company.location,
      subDepartmentId: company.subDepartmentId,
      students: company.students
    };
  });
  const resp = await apiPut('/coordinator/update-placement', data);
  console.log('pl', data);
  return resp;
}

export async function uploadCompanyPlacementData(companyDetails) {
  console.log('compD', companyDetails);
  const resp = await apiPut('/coordinator/update-company', companyDetails);
  return resp;
}

export async function uploadCompanyPlacementDataWithLocation(
  companyDetails,
  locationDetails
) {
  const resp = await apiPut('/coordinator/update-company-location', {
    companyDetails,
    locationDetails
  });
  return resp;
}

export async function getCompanyStudents(companyId) {
  const resp = await apiGet(`/coordinator/company-students/?id=${companyId}`);
  return resp;
}
