import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { CallbackWithoutResultAndOptionalError, Schema, model } from 'mongoose';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { TUserShared } from '../traders/trader.interfaces';
import { AdminModel } from './admin.interfaces';

export const adminSchema = new Schema<TUserShared>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin'],
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
adminSchema.statics.isAdminExist = async function (
  email: string
): Promise<Pick<TUserShared, '_id' | 'password' | 'role'> | null> {
  const Admin = this as AdminModel;

  const foundAdmin = await Admin.findOne({ email }, { password: 1, role: 1 }).lean();
  return foundAdmin;
};

adminSchema.statics.isPasswordMatched = async function isPasswordMatched(
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isMatched;
};
adminSchema.pre('save', async function preSaveHook(next: CallbackWithoutResultAndOptionalError) {
  const Admin = this.constructor as AdminModel;
  const admin = this as TUserShared;
  const isExist = (await Admin.findOne({
    email: this.email,
  })) as TUserShared;
  if (isExist) {
    throw new HandleApiError(httpStatus.CONFLICT, 'email is already exist!');
  }
  admin.password = await bcrypt.hash(this.password, 10);
  next();
});
export const Admin = model<TUserShared, AdminModel>('Admin', adminSchema);
