import { getRandomInt } from './services/utilities';

export const selectionOptions = {
  PROGRAMMES: [
    { text: 'Aerospace Engineering', value: 17, key: 0 },
    { text: 'Agricultural and Biosystems Engineering', value: 20, key: 1 },
    { text: 'Automobile Engineering', value: 21, key: 2 },
    { text: 'Geomatic Engineering', value: 14, key: 3 },
    { text: 'Biomedical Engineering', value: 4, key: 4 },
    { text: 'Chemical Engineering', value: 2, key: 5 },
    { text: 'Civil Engineering', value: getRandomInt(6, 10), key: 6 },
    { text: 'Computer Engineering', value: 5, key: 7 },
    { text: 'Electrical/Electronic Eng', value: 11, key: 8 },
    { text: 'Geological Engineering', value: 13, key: 9 },
    { text: 'Industrial Engineering', value: 22, key: 10 },
    { text: 'Mechanical Engineering', value: 18, key: 11 },
    { text: 'Materials Engineering', value: 15, key: 12 },
    { text: 'Marine Engineering', value: 9, key: 13 },
    { text: 'Metallurgical Engineering', value: 16, key: 14 },
    { text: 'Petroleum Engineering', value: 19, key: 15 },
    { text: 'Petrochemical Engineering', value: 3, key: 16 },
    { text: 'Telecommunications Engineering', value: 12, key: 17 }
  ],
  DEPARTMENTS: [
    { text: 'Agricultural And Biosystems Engineering Department.', value: 1 },
    { text: 'Chemical Engineering Dept.', value: 2 },
    { text: 'Computer Engineering Department', value: 3 },
    { text: 'Civil Engineering Department', value: 4 },
    {
      text: 'Electrical/Electronic Engineering Department',
      value: 5
    },
    { text: 'Geological Engineering Department', value: 6 },
    { text: 'Geomatic Engineering Department', value: 7 },
    { text: 'Materials Engineering Department', value: 8 },
    { text: 'Mechanical Engineering Department', value: 9 },
    { text: 'Petroleum Engineering Department', value: 10 }
  ],
  YESORNO: [
    { text: 'Yes', value: 1 },
    { text: 'No', value: 0 }
  ],
  YEAR_OF_STUDY: [
    // { text: '1st Year', value: '1' },
    { text: '2nd Year', value: '2' },
    { text: '3rd Year', value: '3' },
    // { text: '4th Year', value: '4' },
    // { text: '5th Year', value: '5' },
    // { text: '6th Year', value: '6' },
    { text: 'Post Graduate', value: 'pg' }
  ],

  COMPANY_CONTACTED: [
    { text: 'Companies Emailed', value: 1 },
    { text: 'Companies Not Emailed', value: 0 },
    { text: 'No Filter', value: 10 }
  ],

  COMPANY_CONTACT_INFO_STATUS: [
    { text: 'Companies with Email', value: 1 },
    { text: 'Companies with Phone Numbers', value: 2 },
    { text: 'Companies without Phone Numbers', value: 3 },
    { text: 'Companies without Email', value: 4 },
    { text: 'Companies without Phone or Email Address', value: 5 },
    { text: 'Companies with Both Phone and Email Address', value: 6 },
    { text: 'No Filter', value: 10 }
  ]
};
