import React, { Suspense, lazy } from 'react';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Guest from 'src/components/Guest';

const Loader = (Component) =>
  function (props) {
    return (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };

const LoginBasic = Loader(lazy(() => import('src/views/Auth')));

const accountRoutes = [
  {
    path: 'login',
    element: (
      <Guest>
        <LoginBasic />
      </Guest>
    ),
  },
];

export default accountRoutes;
