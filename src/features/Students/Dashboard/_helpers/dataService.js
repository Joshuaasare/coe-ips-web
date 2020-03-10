import * as changeCase from 'change-case';
import { getHumanReadableDate, apiPut } from '../../../_shared/services';

export async function convertToProfileAndTimelineData(data) {
  const profile = [
    {
      title: 'Email',
      subtitle: data.email,
      icon: 'paperplane'
    },
    { title: 'Index Number', subtitle: data.indexNumber, icon: 'profile' },
    { title: 'Phone Number', subtitle: data.phone, icon: 'phone' },
    {
      title: 'Address',
      subtitle: `${data.address}`,
      icon: 'home'
    },
    {
      title: 'Placement Type',
      subtitle: data.wantPlacement === 1 ? 'College Placed' : 'Self Placed',
      icon: 'tag'
    }
  ];

  const timeline = [
    {
      title: 'Registration Status',
      subtitle: 'Student Registered',
      time: getHumanReadableDate(data.registrationDate),
      status: true
    },
    {
      title: 'Placement Status',
      subtitle: data.companyName || 'Not Placed',
      time: getHumanReadableDate(data.internshipPlacementDate) || '',
      status: !!data.companyName
    },
    {
      title: 'Internship Commenced',
      subtitle: data.internshipStartDate ? 'Began Internship' : 'Not Began',
      time: getHumanReadableDate(data.internshipStartDate) || '',
      status: !!data.internshipStartDate
    },
    {
      title: 'Student Evaluation',
      subtitle: data.internshipEvaluationDate
        ? 'Student Evaluated'
        : 'Not Evaluated',
      time: getHumanReadableDate(data.internshipEvaluationDate) || '',
      status: !!data.internshipEvaluationDate
    },
    {
      title: 'Internship Completion',
      subtitle: data.internshipCompletionDate
        ? 'Internship Completed'
        : 'Not completed',
      time: getHumanReadableDate(data.internshipCompletionDate) || '',
      status: !!data.internshipCompletionDate
    }
  ];

  const wantPlacement = data.wantPlacement === 1;

  return {
    name: `${data.surname.toUpperCase()},  ${changeCase.capitalCase(
      data.otherNames
    )}`,
    programme: `${data.subDepartmentName.toUpperCase()} ENGINEERING`,
    profile,
    timeline,
    wantPlacement,
    data
  };
}

export async function setInternshipStartDate(indexNumber) {
  const resp = await apiPut('/student/update-internship-start', {
    data: indexNumber
  });
  return resp;
}
