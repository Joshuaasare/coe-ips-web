import { constants } from './constants';

export const getErrorMessages = () => ({
  [constants.errors.GENERIC_ERROR]:
    'An unexpected error occured, Please try again Later',
  [constants.errors.NO_INTERNET_CONNECTION]: 'No Internet Connection',
  [constants.errors.RESOURCE_NOT_FOUND]:
    'The requested resource could not be found',
  [constants.errors.AUTHENTICATION_FAILED]: 'Invalid email or password',
  [constants.errors.UNAUTHENTICATED_USER]: 'User not authenticated',
  [constants.errors.UNAUTHORIZED_USER]:
    'User is unauthorized. Possibly token has expired',
  [constants.errors.USER_EXISTS]: 'User already registered',
  [constants.errors.UNPROCCESSABLE_REQUEST]:
    'An unexpected problem occured. Please try again later'
});
