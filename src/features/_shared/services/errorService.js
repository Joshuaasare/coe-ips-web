import { constants } from '../constants';

export function processErrorResponse(error: Object, errorDescription): Object {
  if (error.message && error.message.indexOf('Network Error') !== -1) {
    return {
      error: constants.errors.NO_INTERNET_CONNECTION
    };
  }

  return processUnknownError(error, errorDescription, error.response || null);
}

export function processUnknownError(
  error: Object,
  extraInfo?: string,
  response?: ?Object
): Object {
  // eslint-disable-next-line no-unused-vars
  let err = `error: ${error} `;
  if (response && response.data && response.data.error)
    err = `${err} CODE: ${response.status}, MESSAGE: ${response.data.error.message}`;

  // log error to the server unless its a server error
  if (
    !response ||
    (response &&
      (response.status.toString().substring(0, 1) !== '4' &&
        response.status.toString().substring(0, 1)) !== '5')
  )
    if (response)
      if (response.status === 401)
        return { error: constants.errors.UNAUTHENTICATED_USER };
      else if (response.status === 403)
        return { error: constants.errors.UNAUTHORIZED_USER };
      else if (response.status === 404)
        return { error: constants.errors.RESOURCE_NOT_FOUND };
      else if (response.status === 409)
        return { error: constants.errors.USER_EXISTS };
      else if (response.status === 422)
        return { error: constants.errors.UNPROCCESSABLE_REQUEST };

  return {
    error: constants.errors.GENERIC_ERROR,
    status: response ? response.status : null
  };
}
