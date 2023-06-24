import { Schema, model } from 'mongoose';
import { OrderModel, TOrder } from './order.interfaces';

export const orderSchema = new Schema<TOrder>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
