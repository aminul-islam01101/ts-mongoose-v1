/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import { GoogleControllers } from './google.auth.controller';

const router = express.Router();

router.post('/', GoogleControllers.getAuthAccess);
router.get('/callback', GoogleControllers.getAuthRedirect);
/*
router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    accessType: 'offline',
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  GoogleControllers.handleSuccessfulAuth
);*/

export const GoogleAuthRoutes = router;
