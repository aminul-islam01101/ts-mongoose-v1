/* eslint-disable no-param-reassign */

import path from 'path';
import { configs } from '../../../utils/configs/envConfigs';
import { logger } from '../../../utils/shared/logger';
// import HandleApiError from '../../../utils/shared/errors/handleApiError';

import { TUser } from './user.interfaces';
import { User } from './user.models';
import { generateUserId } from './user.utils';

const createUser = async (user: TUser): Promise<TUser | null> => {
  const id = await generateUserId();

  user.id = id;

  if (!user.password) {
    user.password = configs.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  // if (!createdUser) {
  //   throw new HandleApiError(400, 'Failed to create user');
  // }

  return createdUser;
};

export const UserServices = {
  createUser,
};
