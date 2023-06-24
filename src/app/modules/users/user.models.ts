import httpStatus from 'http-status';
import { CallbackWithoutResultAndOptionalError, Schema, model } from 'mongoose';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TUser, UserModel } from './user.interfaces';

export const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.pre('save', async function preSaveHook(next: CallbackWithoutResultAndOptionalError) {
//   const User = this.constructor as UserModel;
//   const isExist = await User.findOne({
//     email: this.email,
//   });
//   if (isExist) {
//     throw new HandleApiError(httpStatus.CONFLICT, 'email is already exist!');
//   }
//   next();
// });
export const User = model<TUser, UserModel>('User', userSchema);
