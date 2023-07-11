import express from 'express';

import { AdminRoutes } from './modules/admins/admin.routes';
import { CowRoutes } from './modules/cows/cow.routes';
import { OrderRoutes } from './modules/orders/order.routes';
import { UserRoutes } from './modules/traders/trader.routes';
import AuthRoutes from './modules/auth/auth.routes';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
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
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
