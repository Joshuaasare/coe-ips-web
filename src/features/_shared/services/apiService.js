/*
 * @Author: Joshua Asare
 * @Date: 2019-07-19 09:59:00
 * @Last Modified by:   Joshua Asare
 * @Last Modified time: 2020-04-19 09:59:00
 */
import { getSecureAxiosInstance } from '.';
import { constants } from '../constants';
import { processErrorResponse } from './errorService';

export async function apiPost(
  url: string,
  data?: Object,
  description?: string,
  returnDataExpected?: boolean = false,
  service?: string = constants.services.MAIN
) {
  try {
    const axiosSecure = await getSecureAxiosInstance(service);
    const response = await axiosSecure.post(url, { data });
    if (returnDataExpected)
      return {
        data: response.data.data
      };
    return { success: true };
  } catch (err) {
    return processErrorResponse(err, description);
  }
}

export async function apiGet(
  url: string,
  description: string,
  service?: string = constants.services.MAIN
) {
  try {
    const axiosSecure = await getSecureAxiosInstance(service);

    const response = await axiosSecure.get(url);
    return { data: response.data.data };
  } catch (err) {
    return processErrorResponse(err, description);
  }
}

export async function apiPut(
  url: string,
  data?: Object,
  description?: string,
  returnDataExpected?: boolean = false,
  service?: string = constants.services.MAIN
) {
  try {
    const axiosSecure = await getSecureAxiosInstance(service);
    const response = await axiosSecure.put(url, { data });
    if (returnDataExpected)
      return {
        data: response.data.data
      };
    return { success: true };
  } catch (err) {
    return processErrorResponse(err, description);
  }
}

export async function apiDelete(
  url: string,
  description: string,
  service?: string = constants.services.MAIN
) {
  try {
    const axiosSecure = await getSecureAxiosInstance(service);
    await axiosSecure.delete(url);
    return { success: true };
  } catch (err) {
    return processErrorResponse(err, description);
  }
}
