import bcrypt from 'bcrypt';
import crypto from 'crypto';
import httpStatus from 'http-status';

import { CallbackWithoutResultAndOptionalError, Schema, UpdateQuery, model } from 'mongoose';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TUser, TUserMethods, TUserProfile, TUserShared, UserModel } from './trader.interfaces';

export const userSchema = new Schema<TUser, Record<string, unknown>, TUserMethods>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer', 'admin'],
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      // required: true,
    },
    income: {
      type: Number,
      // required: true,
      // default: 0,
    },
    confirmationToken: { type: String },
    confirmationTokenExpires: { type: Date },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<TUserShared, '_id' | 'password' | 'role'> | null> {
  const Trader = this as unknown as UserModel;

  const foundTrader = await Trader.findOne({ email }, { password: 1, role: 1 }).lean();
  return foundTrader;
};

userSchema.statics.isPasswordMatched = async function isPasswordMatched(
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isMatched;
};
userSchema.methods.generateConfirmationToken = function generateConfirmationToken(): string {
  const token = crypto.randomBytes(32).toString('hex');

  // this.confirmationToken = token;
  // this.confirmationTokenExpires = date;
  return token;
};
userSchema.pre('save', async function preSaveHook(next: CallbackWithoutResultAndOptionalError) {
  const trader = this as TUser;
  const User = this.constructor as UserModel;
  const isExist = await User.findOne({
    email: this.email,
  });
  if (isExist) {
    throw new HandleApiError(httpStatus.CONFLICT, 'email is already exist!');
  }
  if (trader.email) {
    trader.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.pre(
  'findOneAndUpdate',
  async function preUpdateHook(next: CallbackWithoutResultAndOptionalError) {
    const updatedUserData = this.getUpdate() as UpdateQuery<Pick<TUserProfile, 'password'>>;

    if (updatedUserData && updatedUserData.password) {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password as string, 10);
    }

    next();
  }
);
export const User = model<TUser, UserModel>('User', userSchema);
