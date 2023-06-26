/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import passport from 'passport';
import { GoogleControllers } from './google.controller';
import { GoogleConfigs } from '../../../../utils/configs/googleConfigs';

const router = express.Router();

router.get('/google', GoogleConfigs.getAccess);

router.get('/google/callback', GoogleConfigs.getRedirect);
// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: [
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email',
//     ],
//     accessType: 'offline',
//   })
// );

// router.get(
//   '/google/callback',
//   passport.authenticate('google', { session: false, failureRedirect: '/' }),
//   GoogleControllers.handleSuccessfulAuth
// );

export const GoogleRoutes = router;
