import express from 'express';
import { EmailPassAuthRoutes } from './email-password/email-pass.auth.routes';
import { GoogleAuthRoutes } from './google/google.auth.route';

const AuthRoutes = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: EmailPassAuthRoutes,
  },

  {
    path: '/google',
    route: GoogleAuthRoutes,
  },
];

moduleRoutes.forEach((route) => AuthRoutes.use(route.path, route.route));

export default AuthRoutes;
