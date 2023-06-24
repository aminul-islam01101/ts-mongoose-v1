import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../utils/shared/helpers/catchAsync';
import pick from '../../../utils/shared/helpers/pick';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { paginationFields } from '../../../utils/shared/pagination/pagination.constants';
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
    message: `${!result.data.length ? 'No Cow found' : 'Cow retrieved successfully !'}`,
    meta: result.meta,
    data: result.data,
  });
});
// //% get  single cow
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowServices.getSingleCow(id);

  sendResponse<TCow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${!result ? 'No Cow found' : 'Cow retrieved successfully !'}`,
    data: result,
  });
});
// //% update  single Cow
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body as Partial<TCow>;

  const result = await CowServices.updateCow(id, updatedData);

  sendResponse<TCow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully !',
    data: result,
  });
});

// //% delete  single cow
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowServices.deleteCow(id);

  sendResponse<TCow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${!result ? 'Nothing to delete' : 'Cow deleted successfully !'}`,
    data: result,
  });
});

export const CowControllers = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
