/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-09-07 22:11:19
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-07 23:59:32
 */

import React, { lazy, Suspense } from 'react';
import { Loader } from 'semantic-ui-react';

const withLazyLoad = component => (props) => {
  const { ...passThroughProps } = props;
  const WrappedComponent = lazy(component);
  return (
    <Suspense fallback={<Loader active size="massive" />}>
      <WrappedComponent {...passThroughProps} />
    </Suspense>
  );
};

export default withLazyLoad;
