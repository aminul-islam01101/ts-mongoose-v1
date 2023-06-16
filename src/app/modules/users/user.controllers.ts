import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { TUser } from './user.interfaces';
import { UserServices } from './user.services';

//% create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body as TUser;
  const result = await UserServices.createUser(userData);

  sendResponse<TUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  });
});
//% get  all users

export const UserControllers = {
  createUser,
};
