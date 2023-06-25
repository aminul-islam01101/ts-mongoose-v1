import { Model } from 'mongoose';
import { TUserShared } from '../traders/trader.interfaces';

export type AdminModel = {
  isAdminExist(phoneNumber: string): Promise<Pick<TUserShared, '_id' | 'password' | 'role'>>;
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<TUserShared>;
