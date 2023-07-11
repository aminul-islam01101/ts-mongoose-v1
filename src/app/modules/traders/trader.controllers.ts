import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { TUser, TUserProfile } from './trader.interfaces';
import { UserServices } from './trader.services';

//% create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body as TUser;
  const result = await UserServices.createUser(userData);
  const { password, ...rest } = result as TUser;

  sendResponse<Partial<TUser>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: rest,
  });
});
//% get  all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();

  sendResponse<TUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${!result?.length ? 'No User found' : 'Users retrieved successfully !'}`,
    data: result,
  });
});
//% get  single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUser(id);

  sendResponse<TUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${!result ? 'No User found' : 'User retrieved successfully !'}`,
    data: result,
  });
});
//% update  single user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body as Partial<TUser>;

  const result = await UserServices.updateUser(id, updatedData);

  sendResponse<TUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

//% delete  single user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);

  sendResponse<TUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${!result ? 'Nothing to delete' : 'User deleted successfully !'}`,
    data: result,
  });
});
//% get  single user
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getMyProfile(req.user as JwtPayload);

  sendResponse<Partial<TUserProfile>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${!result ? 'No User found' : 'User retrieved successfully !'}`,
    data: result,
  });
});

//%  update MyProfile
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body as Partial<TUserProfile>;

  const result = await UserServices.updateMyProfile(req.user as JwtPayload, updatedData);

  sendResponse<TUserProfile>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
