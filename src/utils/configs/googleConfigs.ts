import axios from 'axios';
import { Request, Response } from 'express';

import { google } from 'googleapis';
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

//# Function to refresh the access token
const refreshAccessToken = async (refreshToken: string) => {
  const data = {
    client_id: configs.googleClientId as string,
    client_secret: configs.googleClientSecret as string,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data as object;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};
// const getAccountInfo = async (accessToken: string) => {
//   oauth2Client.setCredentials({ access_token: accessToken });

//   const people = google.people({
//     version: 'v1',
//     auth: oauth2Client,
//   });

//   const res = await people.people.get({
//     resourceName: 'people/me',
//     personFields: 'names,emailAddresses,photos,phoneNumbers',
//   });

//   const { names, emailAddresses } = res.data;
//   const name = names && names.length > 0 ? names[0].displayName : '';
//   const email = emailAddresses && emailAddresses.length > 0 ? emailAddresses[0].value : '';

//   return { name, email };
// };
type AccountInfo = {
  sub?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  locale?: string;
};
const getAccountInfo: (accessToken: string) => Promise<AccountInfo> = async (
  accessToken: string
) => {
  const userInfoEndpoint = 'https://www.googleapis.com/oauth2/v3/userinfo';

  const response = await axios.get(userInfoEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data as AccountInfo;
};
type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
// https://oauth2.googleapis.com/token
async function isAccessTokenExpired(accessToken: string) {
  try {
    const response: { data: TokenResponse } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
    );

    const expirationTime = Date.now() + response.data.expires_in * 1000;
    return Date.now() >= expirationTime;
  } catch (error) {
    console.error('Invalid token');
    return true;
  }
}

const getRedirect = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials({ access_token: tokens.access_token });

  const accessToken: string | null | undefined = tokens.access_token;
  const refreshToken: string | null | undefined = tokens.refresh_token;

  const at = await refreshAccessToken(refreshToken as string);

  console.log({ accessToken }, { at });

  let accountInfo: AccountInfo | null = null;
  if (accessToken) {
    accountInfo = await getAccountInfo(accessToken);
  }

  console.log('Account Info:', accountInfo);

  const cookieOptions = {
    secure: configs.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);
  res.redirect('http://localhost:3000');
};

// create event
// const createEvent = async (req, res) => {
//   const { startTime, endTime, timeZone, email } = req.body;

//   const startupUser = await Startup.findOne({ email });
//   let { accessToken } = startupUser.calenderTokens;
//   const { refreshToken } = startupUser.calenderTokens;

//   const isExpired = await isAccessTokenExpired(accessToken);

//   if (!accessToken || isExpired) {
//     accessToken = await refreshAccessToken(refreshToken);
//     startupUser.calenderTokens.accessToken = accessToken;
//     await startupUser.save();
//   }

//   oauth2Client.setCredentials({ access_token: accessToken });

//   // oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// };

const getAccess = (req: Request, res: Response) => {
  // const email = req.originalUrl.split('/').pop();

  // console.log({reqUrl});

  // const email ='something'
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    include_granted_scopes: true,
    scope: scopes,
    // state: JSON.stringify({ email }),
  });

  res.redirect(url);
};
export const GoogleConfigs = { getAccess, getRedirect };
