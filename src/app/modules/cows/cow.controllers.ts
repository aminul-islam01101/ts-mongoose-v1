import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { TCow } from './cow.interfaces';
import { CowServices } from './cow.services';

//% create user
const createCow = catchAsync(async (req: Request, res: Response) => {
  const cowData = req.body as TCow;
  const result = await CowServices.createCow(cowData);

  sendResponse<TCow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'cow created successfully!',
    data: result,
  });
});
//% get  all users
// const getAllUsers = catchAsync(async (req: Request, res: Response) => {
//   const result = await CowServices.getAllUsers();

//   sendResponse<TCow[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Users retrieved successfully !',
//     data: result,
//   });
// });
// //% get  single user
// const getSingleUser = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await CowServices.getSingleUser(id);

//   sendResponse<TCow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User retrieved successfully !',
//     data: result,
//   });
// });
// //% update  single user
// const updateUser = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const updatedData = req.body as Partial<TCow>;

//   const result = await CowServices.updateUser(id, updatedData);

//   sendResponse<TCow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User updated successfully !',
//     data: result,
//   });
// });

// //% delete  single user
// const deleteUser = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await CowServices.deleteUser(id);

//   sendResponse<TCow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: `${!result ? 'Nothing to delete' : 'User deleted successfully !'}`,
//     data: result,
//   });
// });

export const CowControllers = {
  createCow,
  // getAllUsers,
  // getSingleUser,
  // updateUser,
  // deleteUser,
};
