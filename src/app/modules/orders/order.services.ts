/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import httpStatus from 'http-status';
import mongoose from 'mongoose';

import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TCow } from '../cows/cow.interfaces';
import { Cow } from '../cows/cow.models';
import { TUser } from '../users/user.interfaces';
import { User } from '../users/user.models';
import { TOrder, TOrderRequest } from './order.interfaces';
import { Order } from './order.models';

//# create a Order
const createOrder = async (order: TOrderRequest): Promise<TOrder | null> => {
  const cow = (await Cow.findById(order.cow)) as TCow;
  const buyer = (await User.findById(order.buyer)) as TUser;

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
      { _id: order.buyer },
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
      { id: cow.seller },
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
    copiedOrder.seller = cow.seller;
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
const getAllOrders = async (): Promise<TOrder[] | null> => {
  const allOrders = await Order.find({});

  return allOrders;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
};
