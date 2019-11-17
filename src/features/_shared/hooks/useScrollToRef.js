/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-09-08 19:04:27
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-08 20:43:56
 */

const useScrollToRef = () => {
  function onClick(targetRef) {
    window.scrollTo(0, targetRef.current.offsetTop - 60);
  }
  return [onClick];
};

export default useScrollToRef;
