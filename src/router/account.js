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

const Register = Loader(lazy(() => import('src/views/Register')));

const Login = Loader(lazy(() => import('src/views/Auth')));

const accountRoutes = [
  {
    path: 'login',
    element: (
      <Guest>
        <Login />
      </Guest>
    ),
  },
  {
    path: 'register',
    element: <Register />,
  },
];

export default accountRoutes;
