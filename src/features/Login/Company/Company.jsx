/* eslint-disable react/jsx-props-no-spreading */
/*
 * @Author: Joshua Asare
 * @Date: 2019-12-18 22:29:44
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-05 17:40:46
 */

import React from 'react';
// import { wrapLogin } from '../../_shared/hocs';
// import { constants } from '../../_shared/constants';
import { CompanyInstructions } from '.';

// const registerPath = '/start/company/instructions';

// export default wrapLogin('eng', registerPath, constants.roles.COMPANY.id);
const Company = props => {
  return <CompanyInstructions {...props} />;
};

export default Company;
