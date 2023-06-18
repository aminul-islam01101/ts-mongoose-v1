import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../utils/shared/helpers/catchAsync';

import sendResponse from '../../../utils/shared/helpers/sendResponse';

import { TOrder, TOrderRequest } from './order.interfaces';
import { OrderServices } from './order.services';

//% create cow
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body as TOrderRequest;
  const result = await OrderServices.createOrder(orderData);

  sendResponse<TOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});
//% get  all cows
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrders();

  sendResponse<TOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully !',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
