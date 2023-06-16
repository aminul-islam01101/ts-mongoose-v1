import path from 'path';
import { logger } from '../../../utils/shared/logger';

import { TUser } from './user.interfaces';
import { User } from './user.models';

import { HandleApiError } from '../../../utils/shared/errors/handleApiError';

const createUser = async (user: TUser): Promise<TUser | null> => {
  logger.warn('rest', { f: path.basename(__filename), l: 0 });

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new HandleApiError(400, 'Failed to create user');
  }

  return createdUser;
};
const getAllUsers = async (): Promise<TUser[] | null> => {
  const allUsers = await User.find({});

  return allUsers;
};
const getSingleUser = async (id: string): Promise<TUser | null> => {
  const SingleUser = await User.findById(id);

  return SingleUser;
};
const deleteSingleUser = async (id: string): Promise<TUser | null> => {
  const SingleUser = await User.findByIdAndDelete(id);

  return SingleUser;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
};
