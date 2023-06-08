import express from 'express';
import { booksRoutes } from './modules/books/book.routes';
import { UserRoutes } from './modules/users/user.routes';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: booksRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
