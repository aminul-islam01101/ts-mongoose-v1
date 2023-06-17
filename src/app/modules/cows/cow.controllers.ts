import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../utils/shared/helpers/catchAsync';
import pick from '../../../utils/shared/helpers/pick';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { paginationFields } from '../../../utils/shared/paginations/pagination.constants';
import { cowFilterableFields } from './cow.constant';
import { TCow } from './cow.interfaces';
import { CowServices } from './cow.services';

//% create cow
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
//% get  all cows
const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowServices.getAllCows(filters, paginationOptions);

  sendResponse<TCow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
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
  getAllCows,
  // getSingleUser,
  // updateUser,
  // deleteUser,
};
