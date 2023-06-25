import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';

import { configs } from '../../../utils/configs/envConfigs';
import {
  TLoginUser,
  TLoginUserResponse,
  TRefreshToken,
  TRefreshTokenResponse,
} from '../auth/auth.interfaces';
import { TUserShared } from '../traders/trader.interfaces';
import { AdminServices } from './admin.services';

//% create admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminData = req.body as TUserShared;
  const result = await AdminServices.createAdmin(adminData);

  sendResponse<TUserShared>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

//% login admin

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body as TLoginUser;
  const result = await AdminServices.loginAdmin(loginData);
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
// refresh token
const getAccessTokenByRefreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies as TRefreshToken;
  const result = await AdminServices.getAccessTokenByRefreshToken(refreshToken);

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

export const AdminControllers = {
  createAdmin,
  loginAdmin,
  getAccessTokenByRefreshToken,
};
