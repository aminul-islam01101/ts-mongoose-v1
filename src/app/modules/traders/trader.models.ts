import httpStatus from 'http-status';
import { CallbackWithoutResultAndOptionalError, Schema, model } from 'mongoose';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TUser, UserModel } from './trader.interfaces';

export const userSchema = new Schema<TUser>(
  {
    password: {
      type: String,
      required: true,
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
    phoneNumber: {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.pre('save', async function preSaveHook(next: CallbackWithoutResultAndOptionalError) {
  const User = this.constructor as UserModel;
  const isExist = await User.findOne({
    phoneNumber: this.phoneNumber,
    role: this.role,
  });
  if (isExist) {
    throw new HandleApiError(httpStatus.CONFLICT, 'phoneNumber is already exist!');
  }
  next();
});
export const User = model<TUser, UserModel>('User', userSchema);
