import express from 'express';

import { CowRoutes } from './modules/cows/cow.routes';
import { OrderRoutes } from './modules/orders/order.routes';
import { UserRoutes } from './modules/traders/trader.routes';
import { AdminRoutes } from './modules/admins/admin.routes';
import { GoogleRoutes } from './modules/auth/google/google.routes';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: GoogleRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
