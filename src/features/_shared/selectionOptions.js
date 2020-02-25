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
    { text: 'No filter', value: 0 },
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
    // { text: '2nd Year', value: '2' },
    { text: '3rd Year', value: '3' },
    // { text: '4th Year', value: '4' },
    // { text: '5th Year', value: '5' },
    // { text: '6th Year', value: '6' },
    { text: 'Post Graduate', value: 'pg' }
  ],

  COMPANY_CONTACTED: [
    { text: 'No Filter', value: 0 },
    { text: 'Companies Emailed', value: 1 },
    { text: 'Companies Not Emailed', value: 0 }
  ],

  COMPANY_CONTACT_INFO_STATUS: [
    { text: 'No Filter', value: 0 },
    { text: 'Companies with Email', value: 1 },
    { text: 'Companies with Phone Numbers', value: 2 },
    { text: 'Companies without Phone Numbers', value: 3 },
    { text: 'Companies without Email', value: 4 },
    { text: 'Companies without Phone or Email Address', value: 5 },
    { text: 'Companies with Both Phone and Email Address', value: 6 }
  ],

  REGIONS: [
    { text: 'No Filter', value: 0 },
    { text: 'Western Region', value: 1 },
    { text: 'Eastern Region', value: 2 },
    { text: 'Central', value: 3 },
    { text: 'Ashanti Region', value: 4 },
    { text: 'Northern Region', value: 5 },
    { text: 'Volta Region', value: 6 },
    { text: 'Greater Accra Region', value: 7 },
    { text: 'Brong Ahafo Region', value: 8 },
    { text: 'Upper West Region', value: 9 },
    { text: 'Upper East Region', value: 10 }
  ],

  DISTRICTS: {
    'Western Region': [
      { text: 'No Filter', value: 0 },
      { text: 'Ahanta West', value: 1 },
      { text: 'Aowin/Suaman', value: 2 },
      { text: 'Bia West', value: 3 },
      { text: 'Bia East', value: 4 },
      { text: 'Bibiani/Anhwiaso/Bekwai', value: 5 },
      { text: 'Bodi', value: 6 },
      { text: 'Ellembele', value: 7 },
      { text: 'Jomoro', value: 8 },
      { text: 'Juaboso', value: 9 },
      { text: 'Mpohor', value: 10 },
      { text: 'Nzema East', value: 11 },
      { text: 'Prestea-Huni', value: 12 },
      { text: 'Sefwi Akontombra', value: 13 },
      { text: 'Sefwi - Wiawso', value: 14 },
      { text: 'Sekondi-Takoradi Metropolitan', value: 15 },
      { text: 'Shama', value: 16 },
      { text: 'Wassa East', value: 17 },
      { text: 'Wassa West', value: 18 },
      { text: 'Asankragua', value: 19 }
    ],
    'Greater Accra Region': [],
    'No Filter': [{ text: 'No Filter', value: 0 }]
  }
};
