import express from 'express';

import { CowRoutes } from './modules/cows/cow.routes';
import { UserRoutes } from './modules/users/user.routes';
import { OrderRoutes } from './modules/orders/order.routes';

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
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
