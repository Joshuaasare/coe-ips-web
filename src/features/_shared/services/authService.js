import axios from 'axios';
import sjcl from 'sjcl';
import { constants } from '../constants';
import { readFromWebStorage, saveToWebStorage, deleteFromWebStorage } from '.';
import { processErrorResponse } from './errorService';
import { apiGet } from './apiService';

export async function getSecureAxiosInstance(service) {
  function instance(token) {
    return axios.create({
      baseURL: service,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  const apiToken = await getToken(
    constants.app.ENCRYPTED_API_TOKEN,
    constants.app.TOKEN_IS_ENCRYPTED
  );
  return instance(apiToken);
}

export async function verifyUser(
  email: string,
  password: string,
  userTypeId: number
) {
  try {
    const url = `${constants.services.MAIN}/auth/verify-user/`;
    const response = await axios.post(url, {
      data: {
        email,
        password,
        userTypeId
      }
    });
    saveApiTokenInMemory(response.data.data.authToken, true);
    return response.data.data;
  } catch (error) {
    return processErrorResponse(error, 'Auth error');
  }
}

export async function getToken(key: string, tokenIsEncrypted: boolean) {
  const token = readFromWebStorage(key);
  if (tokenIsEncrypted && token) {
    return sjcl.decrypt(constants.app.JEST_TEST_KEY, token);
  }
  return token;
}

export async function saveApiTokenInMemory(
  token: string,
  tokenIsEncrypted?: boolean = false
) {
  const newToken = tokenIsEncrypted
    ? sjcl.encrypt(constants.app.JEST_TEST_KEY, token)
    : token;

  saveToWebStorage(constants.app.ENCRYPTED_API_TOKEN, newToken);
}

export async function checkClientAuth() {
  const token = await getToken(
    constants.app.ENCRYPTED_API_TOKEN,
    constants.app.TOKEN_IS_ENCRYPTED
  );

  if (token) {
    return true;
  }

  return false;
}

export async function verifyUserWithToken() {
  const response = await apiGet('/auth/verify-with-token');
  return response;
}

export async function resetPassword(email, newPassword) {
  try {
    const url = `${constants.services.MAIN}/auth/reset-password/`;
    const response = await axios.put(url, {
      data: {
        email,
        newPassword
      }
    });
    return response.data.data;
  } catch (error) {
    return processErrorResponse(error, 'Auth error');
  }
}

export const removeApiToken = () => {
  return deleteFromWebStorage(constants.app.ENCRYPTED_API_TOKEN);
};
