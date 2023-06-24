import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TUser = {
  password: string;
  role: 'seller' | 'buyer';
  name: TUserName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};
export type UserModel = Model<TUser, Record<string, unknown>>;
