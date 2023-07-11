import { Model, Schema } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};
export type TUserProfile = {
  password: string;
  name: TUserName;
  email: string;
  address: string;
};

export type TUserShared = TUserProfile & {
  _id: Schema.Types.ObjectId;
  role: 'seller' | 'buyer' | 'admin';
  confirmationToken?: string;
  confirmationTokenExpires?: Date;
};

export type TUser = TUserShared & {
  budget: number;
  income: number;
};
export type TUserMethods = { generateConfirmationToken(): string };
export type UserModel = Model<TUser, Record<string, unknown>, TUserMethods> & {
  isUserExist(email: string): Promise<Pick<TUserShared, '_id' | 'password' | 'role'>>;
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<TUser>;
