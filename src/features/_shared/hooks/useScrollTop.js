/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-08-27 03:08:01
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-08-31 20:21:17
 */
import { useEffect, useRef, useState } from 'react';

const useScrollTop = () => {
  const [distance, setDistance] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const initialScrollPosition = document.documentElement.scrollTop;
    if (mounted.current) {
      setDistance(initialScrollPosition);
    }
    const onScroll = () => {
      const { scrollTop } = document.documentElement;
      console.log(scrollTop);
      if (mounted.current) {
        setDistance(scrollTop);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      mounted.current = false;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return distance;
};

export default useScrollTop;
