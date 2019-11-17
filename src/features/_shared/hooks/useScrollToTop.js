/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-09-07 20:46:37
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-07 20:54:07
 */
import { useEffect } from 'react';

const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;
