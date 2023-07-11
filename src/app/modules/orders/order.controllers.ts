import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { JwtPayload } from 'jsonwebtoken';
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
//% get  all orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrders(req.user as JwtPayload);

  sendResponse<TOrder[] | TOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully !',
    data: result,
  });
});
//% get  single order
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.getSingleOrder(req.user as JwtPayload, id);

  sendResponse<TOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully !',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
