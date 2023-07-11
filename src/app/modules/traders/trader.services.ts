/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import httpStatus from 'http-status';

import { JwtPayload } from 'jsonwebtoken';
import { TUser, TUserProfile } from './trader.interfaces';
import { User } from './trader.models';

import { HandleApiError } from '../../../utils/shared/errors/handleApiError';

//# create a user
const createUser = async (user: TUser): Promise<TUser | null> => {
  const createdUser = (await User.create(user)).toObject();

  if (!createdUser) {
    throw new HandleApiError(400, 'Failed to create user');
  }

  return createdUser;
};
//# get all users
const getAllUsers = async (): Promise<TUser[] | null> => {
  const allUsers = await User.find({});

  return allUsers;
};
//# get a user
const getSingleUser = async (id: string): Promise<TUser | null> => {
  const SingleUser = await User.findById(id);

  return SingleUser;
};

//# update a user
const updateUser = async (id: string, payload: Partial<TUser>): Promise<TUser | null> => {
  const isExist = await User.findOne({ id });

  if (!isExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<TUser> = { ...userData };

  if (updatedUserData.email !== undefined) {
    const isEmailExist = await User.findOne({ email: updatedUserData.email });
    if (isEmailExist) {
      throw new HandleApiError(httpStatus.BAD_REQUEST, 'This phone number is already exist !');
    }
  }

  // dynamically handling

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<TUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ id }, updatedUserData, {
    new: true,
  });
  return result;
};
//# delete a user
const deleteUser = async (id: string): Promise<TUser | null> => {
  const SingleUser = await User.findByIdAndDelete(id);

  return SingleUser;
};

//# get my profile
//# get a user
const getMyProfile = async (user: JwtPayload): Promise<TUserProfile | null> => {
  const myProfileInfo = await User.findById(user.id, {
    name: 1,
    email: 1,
    address: 1,
    _id: 0,
  });

  return myProfileInfo;
};
const updateMyProfile = async (
  user: JwtPayload,
  payload: Partial<TUserProfile>
): Promise<TUserProfile | null> => {
  const isExist = await User.findOne({ id: user.id as string });

  if (!isExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<TUserProfile> = { ...userData };

  if (updatedUserData.email !== undefined) {
    const isEmailExist = await User.findOne({ email: updatedUserData.email });
    if (isEmailExist) {
      throw new HandleApiError(httpStatus.BAD_REQUEST, 'This phone number is already exist !');
    }
  }
  // dynamically handling

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<TUserProfile>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ id: user.id as string }, updatedUserData, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
