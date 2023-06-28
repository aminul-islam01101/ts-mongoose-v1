import axios from 'axios';
import { Request, Response } from 'express';

import { google } from 'googleapis';
import httpStatus from 'http-status';
import { HandleApiError } from '../shared/errors/handleApiError';
import { configs } from './envConfigs';

const { OAuth2 } = google.auth;

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];
const oauth2Client = new OAuth2(
  configs.googleClientId,
  configs.googleClientSecret,
  configs.googleLoginCallback
);
const getAccess = (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    include_granted_scopes: true,
    scope: scopes,
    prompt: 'consent',
    // state: JSON.stringify({ email }),
  });

  // res.redirect(url)
  res.json({ url });
};
export const GoogleConfigs2 = { getAccess };
