/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { configs } from '../../../../utils/configs/env.configs';
import { googleConfigs } from '../../../../utils/configs/google.configs';
import { HandleApiError } from '../../../../utils/shared/errors/handleApiError';
import { AccountInfo } from './google.auth.interfaces';
import { cookieOptions } from '../../../../utils/shared/helpers/cookieOptions';

const { oauth2Client, authScopes, getTokens, userInfoUrl, getAccountInfo } = googleConfigs;

// Callback handler function for successful authentication
const handleSuccessfulAuth = (req: Request, res: Response) => {
  console.log(req.user);

  // res.cookie('email', req.user.refreshToken, cookieOptions);

  res.redirect('http://localhost:3000');
};
const getAuthAccess = (req: Request, res: Response) => {
  res.set({
    'Access-Control-Allow-Origin': ['http://localhost:3000'], // Replace with your React application's domain
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.header('Access-Control-Allow-Credentials', 'true');
  // res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    include_granted_scopes: true,
    scope: authScopes,
    prompt: 'consent',
    // state: JSON.stringify({ email }),
  });

  // res.redirect(url)
  res.json({ url });
};
const getAuthRedirect = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.query;

  const { accessToken, refreshToken } = await getTokens(code as string);

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  // const at = await refreshAccessToken(refreshToken as string);

  // try {
  //   const data = await oauth2Client.refreshAccessToken();
  // } catch (error: any) {
  //   if (error?.code === 'invalid_grant') {
  //     // Refresh token expired
  //     res.redirect(
  //       'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&include_granted_scopes=true&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=376922281242-mo54dmqkva2hkbfb4rq7tlsk4rmlg45b.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fcallback&service=lso&o2v=2&flowName=GeneralOAuthFlow'
  //     );
  //   } else {
  //     throw new HandleApiError(httpStatus.BAD_REQUEST, 'Error refreshing access token');
  //   }
  // }

  let accountInfo: AccountInfo | null = null;
  if (accessToken) {
    accountInfo = await getAccountInfo(accessToken);
  }

  console.log('Account Info:', accountInfo);

  res.cookie('refreshToken', refreshToken, cookieOptions);

  res.redirect(`http://localhost:3000?accessToken=${accessToken as string}`);
};

export const GoogleControllers = {
  getAuthAccess,
  handleSuccessfulAuth,
  getAuthRedirect,
};
