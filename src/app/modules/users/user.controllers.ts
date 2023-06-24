import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import catchAsync from '../../../utils/shared/catchAsync';
import sendResponse from '../../../utils/shared/sendResponse';
import { TUser } from './user.interfaces';
import { UserServices } from './user.services';

const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body as { user: TUser };

  const result = await UserServices.createUser(user);

  sendResponse<TUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
