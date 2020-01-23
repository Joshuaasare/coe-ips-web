/*
 * @Author: Joshua Asare
 * @Date: 2019-11-19 04:54:03
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-01-07 16:46:00
 *
 * @flow
 */
import React from 'react';
import { Form } from 'semantic-ui-react';
import { MainContent } from '../../_shared/components';

type Props = {
  email: string,
  password: string,
  confirmPassword: string,
  phone: number,
  onChange: () => void
};

const CredentialsForm = (props: Props) => {
  const { onChange, email, password, confirmPassword, phone } = props;
  return (
    <MainContent>
      <div className="cred-info">
        <Form.Input
          size="large"
          label="Enter Email"
          type="email"
          name="email"
          placeholder="email"
          width={16}
          className="stud-reg__input"
          value={email}
          onChange={onChange}
          required
        />
        <Form.Input
          size="large"
          label="Enter Phone Number"
          type="text"
          name="phone"
          placeholder="Phone Number"
          width={16}
          className="stud-reg__input"
          value={phone}
          onChange={onChange}
          required
        />
        <Form.Input
          size="large"
          label="Enter password"
          type="password"
          name="password"
          placeholder="Password"
          width={16}
          className="stud-reg__input"
          value={password}
          onChange={onChange}
          required
        />
        <Form.Input
          size="large"
          label="Re-enter Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          width={16}
          className="stud-reg__input"
          value={confirmPassword}
          onChange={onChange}
          required
        />
      </div>
    </MainContent>
  );
};

export default CredentialsForm;
