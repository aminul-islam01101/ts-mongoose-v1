/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import httpStatus from 'http-status';
import mongoose, { Schema } from 'mongoose';

import { JwtPayload } from 'jsonwebtoken';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TCow } from '../cows/cow.interfaces';
import { Cow } from '../cows/cow.models';

import { TUser } from '../traders/trader.interfaces';
import { User } from '../traders/trader.models';
import { TOrder, TOrderRequest } from './order.interfaces';
import { Order } from './order.models';

//# create a Order
const createOrder = async (order: TOrderRequest): Promise<TOrder | null> => {
  const cow = (await Cow.findById(order.cow)) as TCow;
  const buyer = (await User.findById(order.buyer)) as TUser;

  if (!cow) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Cow is not found !');
  }
  if (!buyer) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Buyer is not found !');
  }
  if (cow.label === 'sold out') {
    throw new HandleApiError(httpStatus.BAD_REQUEST, 'Cow is sold !');
  }

  if (cow.price > buyer.budget) {
    throw new HandleApiError(
      httpStatus.BAD_REQUEST,
      `You don't have enough budget to buy this cow! need ${
        cow.price - buyer.budget
      } to buy this cow`
    );
  }

  const session = await mongoose.startSession();
  let updatedData = null;
  try {
    session.startTransaction();

    const updatedCow = await Cow.updateOne(
      { _id: order.cow },
      { label: 'sold out' },
      { new: true, session, timestamps: false }
    );
    if (updatedCow.modifiedCount === 0) {
      throw new HandleApiError(400, 'Failed to Update Cow Status');
    }

    const updatedBuyerBudget = await User.updateOne(
      { _id: order.buyer as TUser },
      [
        {
          $set: {
            budget: {
              $subtract: ['$budget', cow.price],
            },
          },
        },
      ],
      { new: true, session, timestamps: false }
    );
    if (updatedBuyerBudget.modifiedCount === 0) {
      throw new HandleApiError(400, 'Failed to Update budget');
    }
    const updatedSellerIncome = await User.updateOne(
      { id: cow.seller as TUser },
      [
        {
          $set: {
            income: {
              $add: ['$income', cow.price],
            },
          },
        },
      ],
      { new: true, session, timestamps: false }
    );
    if (updatedSellerIncome.modifiedCount === 0) {
      throw new HandleApiError(400, 'Failed to Update income');
    }
    const copiedOrder = { ...order } as TOrder;
    copiedOrder.seller = cow.seller as TUser;
    const [createOrderForSale] = await Order.create([copiedOrder], { session });
    if (!createOrderForSale) {
      throw new HandleApiError(400, 'Failed to create order');
    }

    updatedData = createOrderForSale;

    //
    // const seller = (await User.findById(cow.seller)) as TUser;

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (updatedData) {
    updatedData = await Order.findOne({ id: updatedData.id as string })
      .populate('seller')
      .populate('buyer')
      .populate('cow');
  }

  return updatedData;
};
// //# get all orders
const getAllOrders = async (user: JwtPayload): Promise<TOrder[] | TOrder | null> => {
  let allOrders = null;
  if (user.role === 'admin') {
    allOrders = await Order.find({}).populate('seller').populate('buyer').populate('cow');
  }
  if (user.role === 'buyer') {
    allOrders = await Order.find({ buyer: user.id as Schema.Types.ObjectId })
      .populate('seller')
      .populate('buyer')
      .populate('cow');
  }
  if (user.role === 'seller') {
    allOrders = await Order.findOne({ seller: user.id as Schema.Types.ObjectId })
      .populate('seller')
      .populate('buyer')
      .populate('cow');
  }

  return allOrders;
};
// //# get single orders
const getSingleOrder = async (user: JwtPayload, id: string): Promise<TOrder | null> => {
  const order = await Order.findById(id)
    .populate('seller')
    .populate('buyer')
    .populate('cow')
    .lean();
  console.log('🚀 ~ file: order.services.ts:135 ~ getSingleOrder ~ order:', order);
  if (!order) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'NO order found');
  }

  if (user.role === 'admin') {
    return order;
  }

  if (user.role === 'buyer') {
    if (user.id !== order.buyer._id.toString()) {
      throw new HandleApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this order'
      );
    } else return order;
  }
  if (user.role === 'seller') {
    if (user.id !== order.seller._id.toString()) {
      throw new HandleApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this order'
      );
    } else return order;
  }
  return null;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
