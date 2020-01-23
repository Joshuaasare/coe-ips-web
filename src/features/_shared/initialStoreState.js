/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-07-11 23:40:36
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-08 21:01:22
 */

export const studentData = {
  indexNumber: null,
  yearOfStudy: '',
  acadYear: null,
  address: '',
  mainDepartment: '',
  subDepartment: ''
};

export default {
  user: {
    currentUser: {
      lastName: '',
      otherNames: '',
      userId: 0,
      userTypeId: null,
      userTypeName: '',
      ...studentData
    }
  },

  refs: {
    qualityRef: null
  }
};

export const coordinatorData = {};
