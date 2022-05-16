import accountRoutes from './account';

const router = [
  {
    path: 'account',
    children: accountRoutes,
  },
];

export default router;
