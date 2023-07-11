import { Request, Response } from 'express';
import { configs } from '../../../../utils/configs/env.configs';
import {
  sendMailWithGmail,
  sendMailWithNodeMailer,
} from '../../../../utils/configs/nodemailer.configs';
import catchAsync from '../../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../../utils/shared/helpers/sendResponse';
import { emailBody } from '../../../../utils/shared/views/emailBody';
import {
  TLoginEmail,
  TLoginUser,
  TLoginUserResponse,
  TRefreshToken,
  TRefreshTokenResponse,
  TResetMailData,
} from './auth.interfaces';
import { AuthServices } from './email-pass.auth.services';

const loginTrader = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body as TLoginUser;
  const result = await AuthServices.loginTrader(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: configs.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<TLoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: others,
  });
});
const getAccessTokenByRefreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies as TRefreshToken;
  const result = await AuthServices.getAccessTokenByRefreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: configs.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<TRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body as TLoginEmail;
  const { token } = await AuthServices.resetPassword({ email });
  const url = `${configs.clientUrl as string}/reset-pass/${token}`;
  const mailData: TResetMailData = {
    to: ['aminul.islam01101@gmail.com'],
    subject: 'Reset Your Password',
    text: `Thank you for creating your account. Please confirm your account here: ${
      req.protocol
    }://${configs.clientUrl as string}/reset-pass/${token}`,
    html: emailBody(url),
  };

  const message = await sendMailWithNodeMailer(mailData);
  console.log(
    '🌼 ------------------------------------------------------------------------------------------🌼'
  );
  console.log(
    '🌼 🔥🔥 file: email-pass.auth.controllers.ts:72 🔥🔥 resetPassword 🔥🔥 message🌼',
    message
  );
  console.log(
    '🌼 ------------------------------------------------------------------------------------------🌼'
  );

  // set refresh token into cookie

  sendResponse<null>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: null,
  });
});

export const AuthControllers = {
  loginTrader,
  getAccessTokenByRefreshToken,
  resetPassword,
};
