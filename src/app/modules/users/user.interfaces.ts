import { Model } from 'mongoose';

export type TUser = {
  id: string;
  role: string;
  email: string;
  password: string;
};
export type UserModel = Model<TUser, Record<string, unknown>>;
