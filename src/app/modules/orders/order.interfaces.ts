import { Model, Types } from 'mongoose';
import { TCow } from '../cows/cow.interfaces';
import { TUser } from '../users/user.interfaces';

export type TOrderRequest = {
  buyer: Types.ObjectId | TUser;
  cow: Types.ObjectId | TCow;
};
export type TOrder = TOrderRequest & {
  seller: Types.ObjectId | TUser;
};
export type OrderModel = Model<TOrder, Record<string, unknown>>;
// export type TCowFilters = {
//   searchTerm?: string;
//   location?: string;
//   maxPrice?: number;
//   minPrice?: number;
// };
