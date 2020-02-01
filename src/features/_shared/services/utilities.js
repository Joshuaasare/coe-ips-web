/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-17 11:25:58
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-29 12:08:08
 */
import isObject from 'lodash/isObject';
import format from 'date-fns/format';

export function getRandomInt(minimum, maximum) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getHumanReadableDate(date: number) {
  if (!date) return null;
  return format(date, ['iii, do MMM yyyy']);
}

export function generateRandomString(
  length,
  chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) {
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export function getDocumentsDateFormat(date: number) {
  if (!date) return null;
  return format(date, ['EEEE, LLLL d, yyyy']);
}

export function getMidnightDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const currDay = date.getDate();
  const currDate = new Date(year, month, currDay);
  return currDate;
}

export function arrayHasData(data?: ?Array<any>) {
  return data && data.length;
}

/**
 * isEmpty function that will return false for primitive values
 * like numbers and strings, unlike the lodash version
 */
export function isEmpty(val: any) {
  return (
    val === null ||
    val === '' ||
    (Array.isArray(val) && !val.length) ||
    (isObject(val) && !Object.keys(val).length)
  );
}
