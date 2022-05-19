import React from 'react';
import Authenticated from 'src/components/Authenticated';
import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
import accountRoutes from './account';

const router = [
  {
    path: 'account',
    children: accountRoutes,
  },
  {
    path: '/',
    element: (
      <Authenticated>
        <AccentHeaderLayout />
      </Authenticated>
    ),
  },
];

export default router;
