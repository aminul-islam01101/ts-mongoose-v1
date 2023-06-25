import { Model, Schema } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TUserShared = {
  _id: Schema.Types.ObjectId;
  password: string;
  role: 'seller' | 'buyer' | 'admin';
  name: TUserName;
  phoneNumber: string;
  address: string;
};

export type TUser = TUserShared & {
  budget?: number;
  income?: number;
};
export type UserModel = Model<TUser, Record<string, unknown>>;
