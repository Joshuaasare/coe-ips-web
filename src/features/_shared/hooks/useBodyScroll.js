/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-31 20:00:37
 * @Last modified by:
 * @Last modified time: 2019-09-01T02:16:21+00:00
 */
import { useEffect } from 'react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const useBodyScroll = (isElementActive, targetRef) => {
  useEffect(
    () => {
      isElementActive
        ? disableBodyScroll(targetRef.current)
        : enableBodyScroll(targetRef.current);
      return () => {
        clearAllBodyScrollLocks();
      };
    },
    [isElementActive],
  );
  return [];
};

export default useBodyScroll;
